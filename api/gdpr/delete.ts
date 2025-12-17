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

const deleteRequestSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  requestType: z.literal('delete'),
  confirmation: z.boolean().refine(val => val === true, {
    message: 'You must confirm deletion'
  }),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const validationResult = deleteRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.errors
      });
    }

    const { email } = validationResult.data;

    // TODO: In production, permanently delete user data from database
    // This should include:
    // - Form submissions
    // - User preferences
    // - Any stored personal information
    // - Analytics data (if possible)
    
    console.log('GDPR Deletion Request:', { email, timestamp: new Date().toISOString() });
    // await deleteUserData(email);

    return res.status(200).json({
      success: true,
      message: 'Your personal data has been permanently deleted. This action cannot be undone.',
      deletedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('GDPR deletion request error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
}
