/**
 * @fileoverview Contact form API endpoint handler.
 * Handles contact form submissions with validation, rate limiting, reCAPTCHA verification,
 * and email notifications. Supports both regular contact forms and training request forms.
 * @author Van Dyk Recycling Solutions
 * @module api/contact
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
 * Contact form validation schema using Zod.
 * Validates name, company, email, phone, message, and optional reCAPTCHA token.
 */
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  recaptchaToken: z.string().optional(),
  applicationType: z.string().optional(), // 'training_request' for Van Dyk University forms
});

/**
 * Rate limiting configuration and storage.
 * Uses in-memory Map (for production, consider Redis/Upstash for distributed rate limiting).
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
 * Verifies a reCAPTCHA token with Google's reCAPTCHA API.
 * Returns true if verification is skipped (development mode without secret key).
 * 
 * @param {string} token - reCAPTCHA token from client
 * @returns {Promise<boolean>} True if verification passes or is skipped, false if verification fails
 * @private
 */
async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!token) return false;
  
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.warn('RECAPTCHA_SECRET_KEY not set, skipping verification');
      return true; // Allow in development
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

/**
 * Main handler for contact form submissions.
 * 
 * Flow:
 * 1. Validates HTTP method (POST only)
 * 2. Checks rate limiting
 * 3. Validates request body with Zod schema
 * 4. Verifies reCAPTCHA token (if provided)
 * 5. Sends notification email to appropriate recipient
 * 6. Sends confirmation email to form submitter
 * 7. Returns success/error response
 * 
 * @param {VercelRequest} req - Vercel request object
 * @param {VercelResponse} res - Vercel response object
 * @returns {Promise<void>}
 * 
 * @example
 * POST /api/contact
 * Body: {
 *   name: "John Doe",
 *   company: "Acme Corp",
 *   email: "john@example.com",
 *   phone: "1234567890",
 *   message: "I'm interested in your equipment",
 *   recaptchaToken: "token...",
 *   applicationType: "contact" // or "training_request"
 * }
 * 
 * Response: {
 *   success: true,
 *   message: "Thank you for your message! We will get back to you within 24 hours."
 * }
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Extract client IP from headers (Vercel provides x-forwarded-for with multiple IPs)
    // Take first IP in chain (original client), fallback to x-real-ip, then 'unknown'
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
               (req.headers['x-real-ip'] as string) || 
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        success: false, 
        message: 'Too many requests. Please try again later.' 
      });
    }

    // Parse and validate request body
    const body = req.body;
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.errors
      });
    }

    const formData = validationResult.data;

    // Verify reCAPTCHA if token provided
    if (formData.recaptchaToken && !(await verifyRecaptcha(formData.recaptchaToken))) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed'
      });
    }

    // Send email notification
    const contactEmail = process.env.CONTACT_EMAIL || 'info@vdrs.com';
    const trainingEmail = process.env.TRAINING_EMAIL || 'training@vdrs.com';
    const formType = formData.applicationType || 'contact';

    // Business rule: Route emails based on form type
    // Training requests go to training department, regular contacts go to general inbox
    // This allows single endpoint to handle multiple form types
    let recipientEmail = contactEmail;
    if (formType === 'training_request') {
      recipientEmail = trainingEmail;
    }

    if (recipientEmail) {
      try {
        const { sendEmail, formatContactFormEmail, formatTrainingRequestEmail, formatContactConfirmationEmail, formatTrainingRequestConfirmationEmail } = await import('./email');
        
        // Send notification email
        const emailResult = await sendEmail({
          to: recipientEmail,
          subject: formType === 'training_request' 
            ? `New Training Request from ${formData.name}`
            : `New Contact Form Submission from ${formData.name}`,
          html: formType === 'training_request'
            ? formatTrainingRequestEmail(formData)
            : formatContactFormEmail(formData),
          replyTo: formData.email,
        });

        // Send confirmation email to sender
        const confirmationResult = await sendEmail({
          to: formData.email,
          subject: formType === 'training_request'
            ? 'Thank You for Your Training Request - Van Dyk Recycling Solutions'
            : 'Thank You for Contacting Us - Van Dyk Recycling Solutions',
          html: formType === 'training_request'
            ? formatTrainingRequestConfirmationEmail(formData)
            : formatContactConfirmationEmail(formData),
        });

        if (!emailResult.success) {
          console.error('Failed to send notification email:', emailResult.error);
          console.error('Notification email details:', {
            to: recipientEmail,
            subject: formType === 'training_request' 
              ? `New Training Request from ${formData.name}`
              : `New Contact Form Submission from ${formData.name}`,
          });
        }
        if (!confirmationResult.success) {
          console.error('Failed to send confirmation email:', confirmationResult.error);
          console.error('Confirmation email details:', {
            to: formData.email,
            subject: formType === 'training_request'
              ? 'Thank You for Your Training Request - Van Dyk Recycling Solutions'
              : 'Thank You for Contacting Us - Van Dyk Recycling Solutions',
          });
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        console.error('Email error stack:', emailError instanceof Error ? emailError.stack : 'No stack trace');
        // Continue even if email fails
      }
    } else {
      console.warn('CONTACT_EMAIL not configured, skipping email notification');
    }

    // Log the submission
    console.log('Contact form submission:', {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
}

