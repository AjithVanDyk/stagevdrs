/**
 * @fileoverview Email sending utility with multi-service support.
 * Supports Resend (recommended), SendGrid, and SMTP (Nodemailer).
 * Configure EMAIL_SERVICE and corresponding credentials in Vercel environment variables.
 * @author Van Dyk Recycling Solutions
 * @module api/email
 */

/**
 * Email sending options.
 * 
 * @interface EmailOptions
 * @property {string | string[]} to - Recipient email address(es)
 * @property {string} subject - Email subject line
 * @property {string} html - HTML email body
 * @property {string} [text] - Plain text email body (auto-generated from HTML if not provided)
 * @property {string} [from] - Sender email address (defaults to FROM_EMAIL env var)
 * @property {string} [replyTo] - Reply-to email address (defaults to REPLY_TO_EMAIL env var)
 */
interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send email using configured email service
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const emailService = process.env.EMAIL_SERVICE || 'resend';
  const fromEmail = options.from || process.env.FROM_EMAIL || 'onboarding@resend.dev';
  const replyTo = options.replyTo || process.env.REPLY_TO_EMAIL || fromEmail;

  try {
    switch (emailService.toLowerCase()) {
      case 'resend':
        return await sendEmailResend({ ...options, from: fromEmail, replyTo });
      case 'sendgrid':
        return await sendEmailSendGrid({ ...options, from: fromEmail, replyTo });
      case 'smtp':
        return await sendEmailSMTP({ ...options, from: fromEmail, replyTo });
      default:
        throw new Error(`Unsupported email service: ${emailService}`);
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Sends email using Resend service (recommended - modern, simple API).
 * Requires RESEND_API_KEY environment variable.
 * 
 * @param {EmailOptions} options - Email sending options
 * @returns {Promise<EmailResult>} Result of email sending operation
 * @throws {Error} If RESEND_API_KEY is not configured
 * @private
 */
async function sendEmailResend(options: EmailOptions): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not configured');
  }

  try {
    // Dynamic import to avoid bundling issues in Vercel serverless functions
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const recipients = Array.isArray(options.to) ? options.to : [options.to];

    // Build email payload - make reply_to optional
    const emailPayload: any = {
      from: options.from || 'onboarding@resend.dev',
      to: recipients,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    };

    // Only add reply_to if it's provided and valid
    if (options.replyTo && options.replyTo.trim()) {
      emailPayload.reply_to = options.replyTo;
    }

    console.log('Sending email via Resend:', {
      from: emailPayload.from,
      to: recipients,
      subject: emailPayload.subject,
      hasReplyTo: !!emailPayload.reply_to,
    });

    const data = await resend.emails.send(emailPayload);

    if (data.error) {
      console.error('Resend API error:', JSON.stringify(data.error, null, 2));
      throw new Error(data.error.message || 'Resend API error');
    }

    console.log('Email sent successfully:', {
      messageId: data.data?.id,
      to: recipients,
    });

    return {
      success: true,
      messageId: data.data?.id,
    };
  } catch (error) {
    console.error('Resend email sending error:', error);
    console.error('Error details:', {
      from: options.from,
      to: options.to,
      subject: options.subject,
      replyTo: options.replyTo,
      error: error instanceof Error ? error.message : String(error)
    });
    throw new Error(error instanceof Error ? error.message : 'Resend API error');
  }
}

/**
 * Send email using SendGrid
 * Get API key from: https://app.sendgrid.com/settings/api_keys
 */
async function sendEmailSendGrid(options: EmailOptions): Promise<EmailResult> {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey) {
    throw new Error('SENDGRID_API_KEY not configured');
  }

  const recipients = Array.isArray(options.to) ? options.to : [options.to];

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: recipients.map(email => ({ email })),
      }],
      from: { email: options.from },
      reply_to: { email: options.replyTo },
      subject: options.subject,
      content: [
        {
          type: 'text/html',
          value: options.html,
        },
        ...(options.text ? [{
          type: 'text/plain',
          value: options.text,
        }] : []),
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid API error: ${response.statusText} - ${errorText}`);
  }

  // SendGrid doesn't return message ID in the same way
  const messageId = response.headers.get('x-message-id') || undefined;

  return {
    success: true,
    messageId,
  };
}

/**
 * Send email using SMTP (Nodemailer)
 * Configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 */
async function sendEmailSMTP(options: EmailOptions): Promise<EmailResult> {
  // For SMTP, you would need to install nodemailer
  // This is a placeholder - you'd need to add nodemailer as a dependency
  throw new Error('SMTP email sending requires nodemailer package. Use Resend or SendGrid instead.');
}

/**
 * Format form submission as HTML email
 */
export function formatContactFormEmail(formData: {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
}): string {
  const name = formData.name ?? '';
  const company = formData.company ?? '';
  const email = formData.email ?? '';
  const phone = formData.phone ?? '';
  const message = formData.message ?? '';
  return `
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
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
                <div class="label">Name:</div>
              <div class="value">${escapeHtml(name)}</div>
            </div>
            <div class="field">
                <div class="label">Company:</div>
              <div class="value">${escapeHtml(company)}</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
              <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
            </div>
            <div class="field">
                <div class="label">Phone:</div>
              <div class="value"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></div>
            </div>
            <div class="field">
                <div class="label">Message:</div>
              <div class="value">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the Van Dyk Recycling Solutions contact form.</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function formatQuoteFormEmail(formData: {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  company: string;
  city?: string;
  state?: string;
  country?: string;
  additionalDetails?: string;
  selectedEquipment?: string[];
  selectedSolutions?: number[];
  selectedSolutionNames?: string[];
}): string {
  const safeLastName = formData.lastName ?? '';
  const city = formData.city ?? '';
  const state = formData.state ?? '';
  const country = formData.country ?? '';
  return `
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
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Quote Request</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${escapeHtml(formData.firstName)} ${escapeHtml(safeLastName)}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${escapeHtml(formData.email)}">${escapeHtml(formData.email)}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value"><a href="tel:${escapeHtml(formData.phone)}">${escapeHtml(formData.phone)}</a></div>
            </div>
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${escapeHtml(formData.company)}</div>
            </div>
            <div class="field">
              <div class="label">Location:</div>
              <div class="value">${escapeHtml(city)}, ${escapeHtml(state)}, ${escapeHtml(country)}</div>
            </div>
            ${formData.selectedEquipment && formData.selectedEquipment.length > 0 ? `
            <div class="field">
              <div class="label">Selected Equipment:</div>
              <div class="value">${formData.selectedEquipment.map(eq => escapeHtml(eq)).join(', ')}</div>
            </div>
            ` : ''}
            ${formData.selectedSolutionNames && formData.selectedSolutionNames.length > 0 ? `
            <div class="field">
              <div class="label">Selected Solutions:</div>
              <div class="value">${formData.selectedSolutionNames.map(sol => escapeHtml(sol)).join(', ')}</div>
            </div>
            ` : formData.selectedSolutions && formData.selectedSolutions.length > 0 ? `
            <div class="field">
              <div class="label">Selected Solutions:</div>
              <div class="value">${formData.selectedSolutions.map(sol => escapeHtml(`Solution #${sol}`)).join(', ')}</div>
            </div>
            ` : ''}
            ${formData.additionalDetails ? `
            <div class="field">
              <div class="label">Additional Details:</div>
              <div class="value">${escapeHtml(formData.additionalDetails).replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>This email was sent from the Van Dyk Recycling Solutions quote request form.</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function formatJobApplicationEmail(formData: {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  authorizedToWork?: string;
  requiresSponsorship?: string;
  position?: string;
  availableStartDate?: string;
  desiredSalaryRange?: string;
  highestEducation?: string;
  workExperience?: string;
  references?: string;
  resumeLink?: string;
  resume?: string;
  resumeFileName?: string;
  howDidYouHear?: string;
  certification?: string;
  signature?: string;
  todaysDate?: string;
}): string {
  const fullName = formData.fullName ?? '';
  const email = formData.email ?? '';
  const phone = formData.phone ?? '';
  const address = formData.address ?? '';
  const authorizedToWork = formData.authorizedToWork ?? '';
  const requiresSponsorship = formData.requiresSponsorship ?? '';
  const position = formData.position ?? '';
  const availableStartDate = formData.availableStartDate ?? '';
  const desiredSalaryRange = formData.desiredSalaryRange ?? '';
  const highestEducation = formData.highestEducation ?? '';
  const workExperience = formData.workExperience ?? '';
  const references = formData.references ?? '';
  const howDidYouHear = formData.howDidYouHear ?? '';
  const certification = formData.certification ?? '';
  const signature = formData.signature ?? '';
  const todaysDate = formData.todaysDate ?? '';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background-color: #154B7F; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #154B7F; }
          .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #E66538; }
          .section { margin-top: 25px; padding-top: 20px; border-top: 2px solid #E66538; }
          .section-title { font-size: 18px; font-weight: bold; color: #154B7F; margin-bottom: 15px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Job Application</h2>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Personal Information</div>
              <div class="field">
                <div class="label">Full Name:</div>
                <div class="value">${escapeHtml(formData.fullName)}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${escapeHtml(formData.email)}">${escapeHtml(formData.email)}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${escapeHtml(formData.phone)}">${escapeHtml(formData.phone)}</a></div>
              </div>
              <div class="field">
                <div class="label">Address:</div>
                <div class="value">${escapeHtml(formData.address).replace(/\n/g, '<br>')}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Employment Eligibility</div>
              <div class="field">
                <div class="label">Authorized to Work in US:</div>
                <div class="value">${escapeHtml(formData.authorizedToWork)}</div>
              </div>
              <div class="field">
                <div class="label">Requires Sponsorship:</div>
                <div class="value">${escapeHtml(formData.requiresSponsorship)}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Position & Availability</div>
              <div class="field">
                <div class="label">Position Applied For:</div>
                <div class="value">${escapeHtml(formData.position)}</div>
              </div>
              <div class="field">
                <div class="label">Available Start Date:</div>
                <div class="value">${escapeHtml(formData.availableStartDate)}</div>
              </div>
              <div class="field">
                <div class="label">Desired Salary Range:</div>
                <div class="value">$${escapeHtml(formData.desiredSalaryRange)}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Education & Experience</div>
              <div class="field">
                <div class="label">Highest Education:</div>
                <div class="value">${escapeHtml(formData.highestEducation)}</div>
              </div>
              <div class="field">
                <div class="label">Work Experience:</div>
                <div class="value">${escapeHtml(formData.workExperience)}</div>
              </div>
              <div class="field">
                <div class="label">References:</div>
                <div class="value">${escapeHtml(formData.references).replace(/\n/g, '<br>')}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Resume & Documents</div>
              ${formData.resume ? `
              <div class="field">
                <div class="label">Resume:</div>
                <div class="value">${formData.resumeFileName ? `File: ${escapeHtml(formData.resumeFileName)} (attached)` : 'Resume attached (base64)'}</div>
              </div>
              ` : ''}
              ${formData.resumeLink ? `
              <div class="field">
                <div class="label">Resume Link:</div>
                <div class="value"><a href="${escapeHtml(formData.resumeLink)}" target="_blank">${escapeHtml(formData.resumeLink)}</a></div>
              </div>
              ` : ''}
            </div>

            <div class="section">
              <div class="section-title">Additional Information</div>
              <div class="field">
                <div class="label">How did you hear about us:</div>
                <div class="value">${escapeHtml(formData.howDidYouHear)}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Certification</div>
              <div class="field">
                <div class="label">Certification:</div>
                <div class="value">${escapeHtml(formData.certification)}</div>
              </div>
              <div class="field">
                <div class="label">Signature:</div>
                <div class="value">${escapeHtml(formData.signature)}</div>
              </div>
              <div class="field">
                <div class="label">Date:</div>
                <div class="value">${escapeHtml(formData.todaysDate)}</div>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the Van Dyk Recycling Solutions job application form.</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function formatApplicationFormEmail(formData: {
  name: string;
  email: string;
  phone: string;
  position: string;
  company?: string;
  hasResume?: boolean;
  hasCoverLetter?: boolean;
  experience?: string;
}): string {
  return `
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
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Job Application</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${escapeHtml(formData.name)}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${escapeHtml(formData.email)}">${escapeHtml(formData.email)}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value"><a href="tel:${escapeHtml(formData.phone)}">${escapeHtml(formData.phone)}</a></div>
            </div>
            <div class="field">
              <div class="label">Position Applied For:</div>
              <div class="value">${escapeHtml(formData.position)}</div>
            </div>
            ${formData.company ? `
            <div class="field">
              <div class="label">Current Company:</div>
              <div class="value">${escapeHtml(formData.company)}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Attachments:</div>
              <div class="value">
                ${formData.hasResume ? '✓ Resume attached<br>' : ''}
                ${formData.hasCoverLetter ? '✓ Cover letter attached' : ''}
                ${!formData.hasResume && !formData.hasCoverLetter ? 'No attachments' : ''}
              </div>
            </div>
            ${formData.experience ? `
            <div class="field">
              <div class="label">Experience:</div>
              <div class="value">${escapeHtml(formData.experience).replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>This email was sent from the Van Dyk Recycling Solutions job application form.</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function formatTrainingRequestEmail(formData: {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
}): string {
  const name = formData.name ?? '';
  const company = formData.company ?? '';
  const email = formData.email ?? '';
  const phone = formData.phone ?? '';
  const message = formData.message ?? '';
  return `
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
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Training Request</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${escapeHtml(name)}</div>
            </div>
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${escapeHtml(company)}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></div>
            </div>
            <div class="field">
              <div class="label">Training Details:</div>
              <div class="value">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the Van Dyk University training request form.</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function formatTestCenterFormEmail(formData: {
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  materialStreams?: string;
  desiredOutcomes?: string;
}): string {
  const fullName = formData.fullName ?? '';
  const companyName = formData.companyName ?? '';
  const email = formData.email ?? '';
  const phone = formData.phone ?? '';
  const materialStreams = formData.materialStreams ?? '';
  const desiredOutcomes = formData.desiredOutcomes ?? '';
  return `
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
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Test Center Request</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Full Name:</div>
              <div class="value">${escapeHtml(fullName)}</div>
            </div>
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${escapeHtml(companyName)}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></div>
            </div>
            <div class="field">
              <div class="label">Material Streams:</div>
              <div class="value">${escapeHtml(materialStreams).replace(/\n/g, '<br>')}</div>
            </div>
            <div class="field">
              <div class="label">Desired Outcomes:</div>
              <div class="value">${escapeHtml(desiredOutcomes).replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the Van Dyk Test Center request form.</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Confirmation Email Templates
export function formatContactConfirmationEmail(formData: { name?: string }): string {
  const name = formData.name ?? '';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #154B7F; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Contacting Us!</h1>
          </div>
          <div class="content">
            <p>Dear ${escapeHtml(name)},</p>
            <p>Thank you for reaching out to Van Dyk Recycling Solutions. We have received your message and our team will get back to you within 24 hours.</p>
            <p>We appreciate your interest in our recycling solutions and look forward to assisting you.</p>
            <p>Best regards,<br>The Van Dyk Recycling Solutions Team</p>
          </div>
          <div class="footer">
            <p>Van Dyk Recycling Solutions | <a href="https://vdrs.com">vdrs.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function formatQuoteConfirmationEmail(formData: { firstName: string; lastName?: string }): string {
  const lastName = formData.lastName ?? '';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #154B7F; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Quote Request!</h1>
          </div>
          <div class="content">
            <p>Dear ${escapeHtml(formData.firstName)} ${escapeHtml(formData.lastName)},</p>
            <p>Thank you for requesting a quote from Van Dyk Recycling Solutions. Our sales team has received your request and will contact you within 24 hours to discuss your needs.</p>
            <p>We look forward to helping you find the perfect recycling solution for your facility.</p>
            <p>Best regards,<br>The Van Dyk Recycling Solutions Sales Team</p>
          </div>
          <div class="footer">
            <p>Van Dyk Recycling Solutions | <a href="https://vdrs.com">vdrs.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function formatTrainingRequestConfirmationEmail(formData: { name?: string }): string {
  const name = formData.name ?? '';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #154B7F; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Training Request!</h1>
          </div>
          <div class="content">
            <p>Dear ${escapeHtml(name)},</p>
            <p>Thank you for your interest in Van Dyk University training programs. We have received your training request and our team will review it and contact you shortly.</p>
            <p>Our training coordinators will work with you to schedule the best training program for your needs.</p>
            <p>Best regards,<br>The Van Dyk University Team</p>
          </div>
          <div class="footer">
            <p>Van Dyk Recycling Solutions | <a href="https://vdrs.com">vdrs.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function formatTestCenterConfirmationEmail(formData: { fullName: string }): string {
  const fullName = formData.fullName ?? '';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #154B7F; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Test Center Request!</h1>
          </div>
          <div class="content">
            <p>Dear ${escapeHtml(fullName)},</p>
            <p>Thank you for your interest in the Van Dyk Test Center. We have received your testing request and our team will review it and contact you shortly to discuss your testing needs.</p>
            <p>The Test Center team will work with you to schedule your material testing and help you achieve your recycling goals.</p>
            <p>Best regards,<br>The Van Dyk Test Center Team</p>
          </div>
          <div class="footer">
            <p>Van Dyk Recycling Solutions | <a href="https://vdrs.com">vdrs.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function formatNewsletterWelcomeEmail(): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #154B7F; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Our Newsletter!</h1>
          </div>
          <div class="content">
            <p>Thank you for subscribing to the Van Dyk Recycling Solutions newsletter!</p>
            <p>You'll now receive the latest updates on:</p>
            <ul>
              <li>Industry news and insights</li>
              <li>New equipment and solutions</li>
              <li>Company updates and announcements</li>
              <li>Training opportunities</li>
              <li>Case studies and success stories</li>
            </ul>
            <p>We're excited to share our journey in revolutionizing recycling technology with you.</p>
            <p>Best regards,<br>The Van Dyk Recycling Solutions Team</p>
          </div>
          <div class="footer">
            <p>Van Dyk Recycling Solutions | <a href="https://vdrs.com">vdrs.com</a></p>
            <p><a href="[UNSUBSCRIBE_URL]">Unsubscribe</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function formatNewsletterEmail(content: string, articles?: Array<{ title: string; link: string; excerpt?: string; image?: string }>): string {
  const articlesHtml = articles && articles.length > 0 ? `
    <div style="margin-top: 30px;">
      <h2 style="color: #154B7F; border-bottom: 2px solid #E66538; padding-bottom: 10px;">This Week's Highlights</h2>
      ${articles.map(article => `
        <div style="margin-bottom: 25px; padding: 15px; background-color: white; border-left: 3px solid #E66538;">
          ${article.image ? `<img src="${article.image}" alt="${escapeHtml(article.title)}" style="max-width: 100%; height: auto; margin-bottom: 10px;" />` : ''}
          <h3 style="color: #154B7F; margin-top: 0;"><a href="${article.link}" style="color: #154B7F; text-decoration: none;">${escapeHtml(article.title)}</a></h3>
          ${article.excerpt ? `<p style="color: #666;">${escapeHtml(article.excerpt)}</p>` : ''}
          <a href="${article.link}" style="color: #E66538; text-decoration: none; font-weight: bold;">Read More →</a>
        </div>
      `).join('')}
    </div>
  ` : '';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #154B7F; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>This Week in Van Dyk Recycling Solutions</h1>
          </div>
          <div class="content">
            ${content ? `<div>${content}</div>` : ''}
            ${articlesHtml}
          </div>
          <div class="footer">
            <p>Van Dyk Recycling Solutions | <a href="https://vdrs.com">vdrs.com</a></p>
            <p><a href="[UNSUBSCRIBE_URL]">Unsubscribe</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function formatCatalogueEmail(formData: {
  equipmentName: string;
  equipmentId?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #154B7F; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #E66538; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Interest!</h1>
          </div>
          <div class="content">
            <p>Thank you for requesting the equipment catalogue for <strong>${escapeHtml(formData.equipmentName)}</strong>.</p>
            <p>Our sales team is preparing your detailed equipment catalogue and will send it to you shortly. The catalogue includes:</p>
            <ul>
              <li>Complete technical specifications</li>
              <li>Detailed features and capabilities</li>
              <li>Application examples</li>
              <li>Performance data</li>
              <li>Pricing information</li>
            </ul>
            <p>In the meantime, if you have any questions or would like to speak with one of our experts, please don't hesitate to contact us.</p>
            <p style="text-align: center;">
              <a href="https://vdrs.com/contact" class="button">Contact Our Team</a>
            </p>
            <p>Best regards,<br>The Van Dyk Recycling Solutions Sales Team</p>
          </div>
          <div class="footer">
            <p>Van Dyk Recycling Solutions | <a href="https://vdrs.com">vdrs.com</a></p>
            <p>Phone: <a href="tel:203-967-1100">203-967-1100</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}



