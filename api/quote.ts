/**
 * @fileoverview Quote request API endpoint handler.
 * Handles quote form submissions with validation, rate limiting, and email notifications.
 * Supports equipment and solution selections for comprehensive quote requests.
 * @author Van Dyk Recycling Solutions
 * @module api/quote
 */

import { z } from 'zod';

/**
 * Vercel serverless function request type.
 * 
 * @typedef {Object} VercelRequest
 * @property {string} [method] - HTTP method
 * @property {any} [body] - Request body
 * @property {Record<string, string | string[] | undefined>} [headers] - Request headers
 */
type VercelRequest = {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
};

/**
 * Vercel serverless function response type.
 * 
 * @typedef {Object} VercelResponse
 * @property {Function} status - Set HTTP status code
 * @property {Function} json - Send JSON response
 */
type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
};

/**
 * Quote form validation schema using Zod.
 * Requires: firstName, email, phone, company.
 * Optional: lastName, city, state, country, additionalDetails, selectedEquipment, selectedSolutions.
 */
const quoteFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^[+]?[\d]{10,16}$/, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(100, 'Company name must be less than 100 characters'),
  lastName: z.string().max(50, 'Last name must be less than 50 characters').optional(),
  city: z.string().max(50, 'City must be less than 50 characters').optional(),
  state: z.string().max(50, 'State must be less than 50 characters').optional(),
  country: z.string().max(50, 'Country must be less than 50 characters').optional(),
  additionalDetails: z.string().max(1000, 'Additional details must be less than 1000 characters').optional(),
  selectedEquipment: z.array(z.string()).optional(),
  selectedSolutions: z.array(z.number()).optional(),
});

/**
 * Rate limiting configuration and storage.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // Maximum requests per window
const RATE_LIMIT_WINDOW = 10 * 1000; // 10 seconds window

/**
 * Checks if an IP address has exceeded the rate limit.
 * 
 * @param {string} ip - Client IP address
 * @returns {boolean} True if request is allowed, false if rate limited
 * @private
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Main handler for quote form submissions.
 * 
 * Flow:
 * 1. Validates HTTP method (POST only)
 * 2. Checks rate limiting
 * 3. Validates request body with Zod schema
 * 4. Maps solution IDs to solution names
 * 5. Sends notification email to quote email address
 * 6. Sends confirmation email to form submitter
 * 7. Returns success/error response
 * 
 * @param {VercelRequest} req - Vercel request object
 * @param {VercelResponse} res - Vercel response object
 * @returns {Promise<void>}
 * 
 * @example
 * POST /api/quote
 * Body: {
 *   firstName: "John",
 *   lastName: "Doe",
 *   email: "john@example.com",
 *   phone: "1234567890",
 *   company: "Acme Corp",
 *   selectedEquipment: ["bollegraaf-balers"],
 *   selectedSolutions: [1, 2, 3]
 * }
 * 
 * Response: {
 *   success: true,
 *   message: "Thank you for your quote request! Our sales team will contact you within 24 hours."
 * }
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Extract client IP from headers (Vercel provides x-forwarded-for with multiple IPs)
    // Take first IP in chain (original client), fallback to x-real-ip, then 'unknown'
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
               (req.headers['x-real-ip'] as string) || 
               'unknown';

    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        success: false, 
        message: 'Too many requests. Please try again later.' 
      });
    }

    const body = req.body;
    const validationResult = quoteFormSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.errors
      });
    }

    const formData = validationResult.data;

    // Business logic: Map numeric solution IDs to human-readable names
    // This mapping must stay in sync with frontend solution selection
    // IDs correspond to solutionTypes array indices in solutionsData.ts
    const solutionIdToName: Record<number, string> = {
      1: 'Single Stream Recycling',
      2: 'Plastics Recycling',
      3: 'Organics Processing',
      4: 'Food Waste Depackaging',
      5: 'MSW Processing',
      6: 'Commercial Waste',
      7: 'C&D Recycling',
      8: 'Multi-MRF Systems',
      9: 'Waste to Energy',
      10: 'E-Scrap Recycling',
      11: 'Glass Cleanup',
      12: 'Composting',
      13: 'Bollegraaf Balers',
      14: 'AI-Based Waste Analytics',
      15: 'Odor Control',
      16: 'EV Battery Recycling',
    };

    // Convert solution IDs to names, with fallback for unknown IDs
    // Fallback ensures email always has readable text even if ID mapping is missing
    const solutionNames = formData.selectedSolutions?.map(id => solutionIdToName[id] || `Solution #${id}`) || [];

    // Send email notification to info@vdrs.com
    const quoteEmail = process.env.QUOTE_EMAIL || 'info@vdrs.com';
    if (quoteEmail) {
      try {
        const { sendEmail, formatQuoteFormEmail, formatQuoteConfirmationEmail } = await import('./email');
        
        // Send notification email with solution names
        const emailResult = await sendEmail({
          to: quoteEmail,
          subject: `New Quote Request from ${formData.firstName} ${formData.lastName} - ${formData.company}`,
          html: formatQuoteFormEmail({
            ...formData,
            selectedSolutionNames: solutionNames,
          }),
          replyTo: formData.email,
        });

        // Send confirmation email to sender
        const confirmationResult = await sendEmail({
          to: formData.email,
          subject: 'Thank You for Your Quote Request - Van Dyk Recycling Solutions',
          html: formatQuoteConfirmationEmail(formData),
        });

        if (!emailResult.success) {
          console.error('Failed to send notification email:', emailResult.error);
          console.error('Notification email details:', {
            to: quoteEmail,
            subject: `New Quote Request from ${formData.firstName} ${formData.lastName} - ${formData.company}`,
          });
        }
        if (!confirmationResult.success) {
          console.error('Failed to send confirmation email:', confirmationResult.error);
          console.error('Confirmation email details:', {
            to: formData.email,
            subject: 'Thank You for Your Quote Request - Van Dyk Recycling Solutions',
          });
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        console.error('Email error stack:', emailError instanceof Error ? emailError.stack : 'No stack trace');
        // Continue even if email fails
      }
    } else {
      console.warn('QUOTE_EMAIL not configured, skipping email notification');
    }

    // Log the submission
    console.log('Quote form submission:', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      selectedEquipment: formData.selectedEquipment,
      selectedSolutions: formData.selectedSolutions,
      additionalDetails: formData.additionalDetails,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for your quote request! Our sales team will contact you within 24 hours.',
    });

  } catch (error) {
    console.error('Quote form submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
}

