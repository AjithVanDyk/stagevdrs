/// <reference types="node" />
import { z } from 'zod';

type VercelRequest = {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
};

// Test Center form validation schema
const testCenterFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  materialStreams: z.string().min(10, 'Material streams description is required'),
  desiredOutcomes: z.string().min(10, 'Desired outcomes description is required'),
});

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_LIMIT_WINDOW = 10 * 1000;

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
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
    const validationResult = testCenterFormSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.errors
      });
    }

    const formData = validationResult.data;

    // Send email notification to info@vdrs.com
    const testCenterEmail = process.env.TEST_CENTER_EMAIL || 'info@vdrs.com';
    if (testCenterEmail) {
      try {
        const { sendEmail, formatTestCenterFormEmail, formatTestCenterConfirmationEmail } = await import('./email.js');
        
        // Send notification email
        const emailResult = await sendEmail({
          to: testCenterEmail,
          subject: `New Test Center Request from ${formData.fullName} - ${formData.companyName}`,
          html: formatTestCenterFormEmail(formData),
          replyTo: formData.email,
        });

        // Send confirmation email to sender
        const confirmationResult = await sendEmail({
          to: formData.email,
          subject: 'Thank You for Your Test Center Request - Van Dyk Recycling Solutions',
          html: formatTestCenterConfirmationEmail(formData),
        });

        if (!emailResult.success) {
          console.error('Failed to send notification email:', emailResult.error);
          console.error('Notification email details:', {
            to: testCenterEmail,
            subject: `New Test Center Request from ${formData.fullName} - ${formData.companyName}`,
          });
        }
        if (!confirmationResult.success) {
          console.error('Failed to send confirmation email:', confirmationResult.error);
          console.error('Confirmation email details:', {
            to: formData.email,
            subject: 'Thank You for Your Test Center Request - Van Dyk Recycling Solutions',
          });
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        console.error('Email error stack:', emailError instanceof Error ? emailError.stack : 'No stack trace');
        // Continue even if email fails
      }
    }

    // Log the submission
    console.log('Test Center form submission:', {
      fullName: formData.fullName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      materialStreams: formData.materialStreams,
      desiredOutcomes: formData.desiredOutcomes,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for your test center request! Our team will contact you shortly.',
    });

  } catch (error) {
    console.error('Test Center form submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
}
