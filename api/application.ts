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

// Application form validation schema
const applicationFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  authorizedToWork: z.string().min(1, 'Please select an option'),
  requiresSponsorship: z.string().min(1, 'Please select an option'),
  position: z.string().min(1, 'Position is required'),
  availableStartDate: z.string().min(1, 'Please enter a start date'),
  desiredSalaryRange: z.string().regex(/^\d+$/, 'Salary range must be a number'),
  highestEducation: z.string().min(1, 'Please select education level'),
  workExperience: z.string().min(1, 'Please select work experience'),
  references: z.string().min(10, 'Please provide at least one reference'),
  resumeLink: z.string().optional(),
  resume: z.string().optional(), // Base64 encoded file or URL
  resumeFileName: z.string().optional(),
  howDidYouHear: z.string().min(1, 'Please select an option'),
  certification: z.string().min(1, 'Certification is required'),
  signature: z.string().min(2, 'Please enter your full name'),
  todaysDate: z.string().min(1, 'Please enter today\'s date'),
});

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Lower limit for applications
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
    const validationResult = applicationFormSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.errors
      });
    }

    const formData = validationResult.data;

    // Send email notification to achirca@vdrs.com
    const hrEmail = 'achirca@vdrs.com';
    try {
      const { sendEmail, formatJobApplicationEmail } = await import('./email');
      const emailResult = await sendEmail({
        to: hrEmail,
        subject: `New Job Application: ${formData.position} - ${formData.fullName}`,
        html: formatJobApplicationEmail(formData),
        replyTo: formData.email,
      });

      if (!emailResult.success) {
        console.error('Failed to send email:', emailResult.error);
        // Don't fail the request if email fails, just log it
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue even if email fails
    }

    // Log the submission
    console.log('Application form submission:', {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: 'Your application has been submitted to HR. You will hear from us soon!',
    });

  } catch (error) {
    console.error('Application form submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
}

