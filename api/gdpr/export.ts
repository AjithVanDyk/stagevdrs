import { z } from 'zod';

type VercelRequest = {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => void;
};

const exportRequestSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  requestType: z.literal('export'),
  format: z.enum(['json', 'csv']).default('json'),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const validationResult = exportRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.errors
      });
    }

    const { email, format } = validationResult.data;

    // TODO: In production, retrieve and format actual user data
    const userData = {
      personalInformation: {
        name: 'User Name',
        email: email,
        phone: 'User Phone',
      },
      formSubmissions: [],
      cookiePreferences: {},
      analyticsData: {},
      exportedAt: new Date().toISOString(),
    };

    console.log('GDPR Export Request:', { email, format, timestamp: new Date().toISOString() });

    if (format === 'csv') {
      // Convert to CSV format
      const csv = `Email,Name,Phone,Exported At\n${email},User Name,User Phone,${userData.exportedAt}`;
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="gdpr-export-${Date.now()}.csv"`);
      return res.status(200).json({ success: true, data: csv });
    }

    // Return JSON format
    return res.status(200).json({
      success: true,
      message: 'Your data export is ready.',
      data: userData,
      format: 'json'
    });

  } catch (error) {
    console.error('GDPR export request error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
}
