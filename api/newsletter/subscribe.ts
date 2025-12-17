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

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Simple in-memory store - in production, use a database (Upstash, Supabase, etc.)
// For now, we'll use a simple approach that can be migrated to a database later
// Note: This will reset on serverless function cold starts
// In production, use Upstash Redis, Supabase, or similar
const subscribers: string[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // Subscribe
    try {
      const body = req.body;
      const validationResult = subscribeSchema.safeParse(body);

      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email address',
          errors: validationResult.error.errors
        });
      }

      const { email } = validationResult.data;
      const normalizedEmail = email.toLowerCase().trim();

      // Check if already subscribed (in production, check database)
      if (subscribers.includes(normalizedEmail)) {
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed to our newsletter!',
        });
      }

      // Add subscriber (in production, save to database)
      subscribers.push(normalizedEmail);

      // Send welcome email
      try {
        const { sendEmail, formatNewsletterWelcomeEmail } = await import('../email');
        await sendEmail({
          to: normalizedEmail,
          subject: 'Welcome to Van Dyk Recycling Solutions Newsletter',
          html: formatNewsletterWelcomeEmail(),
        });
      } catch (emailError) {
        console.error('Welcome email error:', emailError);
        // Don't fail subscription if welcome email fails
      }

      return res.status(200).json({
        success: true,
        message: 'Successfully subscribed to our newsletter!',
      });

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
    }
  } else if (req.method === 'GET') {
    // Get all subscribers (for admin use - should be protected in production)
    // In production, add authentication check here
    return res.status(200).json({
      success: true,
      subscribers: subscribers,
      count: subscribers.length
    });
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
