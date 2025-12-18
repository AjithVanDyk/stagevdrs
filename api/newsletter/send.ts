type VercelRequest = {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
};

// This endpoint should be protected with authentication in production
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // In production, add authentication check here
    // const apiKey = req.headers['x-api-key'];
    // if (apiKey !== process.env.NEWSLETTER_API_KEY) {
    //   return res.status(401).json({ success: false, message: 'Unauthorized' });
    // }

    const { subject, content, articles } = req.body;

    if (!subject && !content) {
      return res.status(400).json({
        success: false,
        message: 'Subject or content is required'
      });
    }

    // Get subscribers (in production, fetch from database)
    // For now, we'll need to store them somewhere accessible
    // This is a placeholder - you'll need to implement subscriber storage
    // Note: In production, use Upstash Redis, Supabase, or similar database
    const subscribers: string[] = []; // Get from database

    if (subscribers.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No subscribers to send to',
        sent: 0
      });
    }

    // Send newsletter to all subscribers
    const { sendEmail, formatNewsletterEmail } = await import('../email.js');
    let successCount = 0;
    let failCount = 0;

    for (const subscriber of subscribers) {
      try {
        const result = await sendEmail({
          to: subscriber,
          subject: subject || 'This Week in Van Dyk Recycling Solutions',
          html: formatNewsletterEmail(content || '', articles),
        });

        if (result.success) {
          successCount++;
        } else {
          failCount++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to send to ${subscriber}:`, error);
        failCount++;
      }
    }

    return res.status(200).json({
      success: true,
      message: `Newsletter sent to ${successCount} subscribers`,
      sent: successCount,
      failed: failCount
    });

  } catch (error) {
    console.error('Newsletter sending error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while sending the newsletter.'
    });
  }
}
