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

// Rate limiting - simple in-memory store
// In production, use Redis or similar for distributed rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = 5; // 5 requests
  const windowMs = 60 * 1000; // 1 minute

  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

const catalogueRequestSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  equipmentName: z.string().min(1, 'Equipment name is required'),
  equipmentId: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get client IP for rate limiting
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
    const validationResult = catalogueRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.errors
      });
    }

    const { email, equipmentName, equipmentId } = validationResult.data;

    // Send catalogue email to user
    const { sendEmail, formatCatalogueEmail } = await import('./email.js');
    
    try {
      // Send catalogue to user
      const result = await sendEmail({
        to: email,
        subject: `Equipment Catalogue: ${equipmentName}`,
        html: formatCatalogueEmail({
          equipmentName,
          equipmentId,
        }),
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to send email');
      }

      // Also notify internal team
      const contactEmail = process.env.CONTACT_EMAIL || 'info@vdrs.com';
      await sendEmail({
        to: contactEmail,
        subject: `Catalogue Request: ${equipmentName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #154B7F; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9f9f9; padding: 20px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #154B7F; }
                .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #E66538; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>New Catalogue Request</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="field">
                    <div class="label">Equipment:</div>
                    <div class="value">${equipmentName}</div>
                  </div>
                  ${equipmentId ? `
                  <div class="field">
                    <div class="label">Equipment ID:</div>
                    <div class="value">${equipmentId}</div>
                  </div>
                  ` : ''}
                </div>
              </div>
            </body>
          </html>
        `,
      });

      return res.status(200).json({
        success: true,
        message: 'Catalogue request received. We will send the equipment catalogue to your email shortly.'
      });

    } catch (emailError) {
      console.error('Catalogue email error:', emailError);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing your catalogue request. Please try again later.'
      });
    }

  } catch (error) {
    console.error('Catalogue request error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
}

