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

const accessRequestSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  requestType: z.literal('access'),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const validationResult = accessRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.errors
      });
    }

    const { email } = validationResult.data;

    // TODO: In production, retrieve actual user data from database
    // For now, return a structured response
    const userData = {
      personalInformation: {
        name: 'User Name', // Would come from database
        email: email,
        phone: 'User Phone', // Would come from database
      },
      formSubmissions: [], // Would query database for this user's form submissions
      cookiePreferences: {}, // Would get from cookie storage
      analyticsData: {}, // Would aggregate from analytics service
      timestamp: new Date().toISOString(),
    };

    console.log('GDPR Access Request:', { email, timestamp: new Date().toISOString() });

    return res.status(200).json({
      success: true,
      message: 'Your data access request has been processed.',
      data: userData
    });

  } catch (error) {
    console.error('GDPR access request error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
}
