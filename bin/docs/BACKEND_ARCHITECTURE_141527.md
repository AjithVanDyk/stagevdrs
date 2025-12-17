# Backend Architecture Documentation

**Van Dyk Recycling Solutions - Serverless Backend Architecture**

This document explains the backend architecture, including serverless functions, email system, rate limiting, validation, and security measures.

---

## Table of Contents

1. [Overview](#overview)
2. [Serverless Functions](#serverless-functions)
3. [Email System](#email-system)
4. [Rate Limiting](#rate-limiting)
5. [Validation System](#validation-system)
6. [Security Measures](#security-measures)
7. [Error Handling](#error-handling)
8. [Performance Considerations](#performance-considerations)

---

## Overview

The backend is built using **Vercel serverless functions**, which are Node.js functions that run on-demand in a serverless environment. This provides:

- **Automatic scaling**: Functions scale automatically with traffic
- **Pay-per-use**: Only pay for actual execution time
- **Global distribution**: Functions run close to users
- **Zero server management**: No servers to maintain

### Architecture Diagram

```
Client (Browser)
    ↓
React App (Frontend)
    ↓
API Routes (/api/*)
    ↓
Vercel Serverless Functions
    ↓
External Services (Email, reCAPTCHA, etc.)
```

---

## Serverless Functions

### Function Structure

All API endpoints are serverless functions in the `/api` directory:

```
api/
├── contact.ts          # Contact form handler
├── quote.ts            # Quote request handler
├── application.ts      # Job application handler
├── test-center.ts      # Test center request handler
├── catalogue.ts        # Catalogue request handler
├── email.ts            # Email service utilities
├── newsletter/
│   ├── subscribe.ts    # Newsletter subscription
│   └── send.ts         # Newsletter sending
└── gdpr/
    ├── access.ts       # GDPR data access
    ├── delete.ts       # GDPR data deletion
    └── export.ts       # GDPR data export
```

### Function Template

All functions follow this structure:

```typescript
import { z } from 'zod';

// Type definitions
type VercelRequest = {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
};

// Validation schema
const formSchema = z.object({
  // ... field definitions
});

// Rate limiting (shared across functions)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  // ... rate limiting logic
}

// Main handler
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // 1. Method validation
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // 2. Rate limiting
    const ip = getClientIP(req);
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ success: false, message: 'Too many requests' });
    }

    // 3. Validation
    const validationResult = formSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.errors
      });
    }

    // 4. Business logic
    // ... process request

    // 5. Success response
    return res.status(200).json({ success: true, message: 'Success' });

  } catch (error) {
    // 6. Error handling
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
```

### Function Execution Flow

1. **Request Received**: Vercel routes request to appropriate function
2. **Cold Start** (if needed): Function container initialized (first request)
3. **Execution**: Function code runs
4. **Response**: Function returns response
5. **Idle**: Function container kept warm for ~10 minutes

### Cold Start Considerations

- **First request** may be slower (~100-500ms)
- **Subsequent requests** are fast (~10-50ms)
- **Keep functions warm** by pinging them periodically (optional)

---

## Email System

### Multi-Service Support

The email system supports multiple email services:

1. **Resend** (Recommended)
   - Modern, simple API
   - Good deliverability
   - Easy setup

2. **SendGrid**
   - Enterprise-grade
   - Advanced features
   - Higher cost

3. **SMTP** (Nodemailer)
   - Generic SMTP support
   - Requires nodemailer package
   - More configuration needed

### Email Service Architecture

```
API Endpoint
    ↓
sendEmail() function
    ↓
Email Service Router
    ↓
┌──────────┬──────────┬──────────┐
│  Resend  │ SendGrid │   SMTP   │
└──────────┴──────────┴──────────┘
    ↓
Email Delivered
```

### Configuration

Email service is configured via environment variables:

```bash
EMAIL_SERVICE=resend                    # Service to use
RESEND_API_KEY=re_xxxxxxxxxxxxx         # Resend API key
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx       # SendGrid API key
FROM_EMAIL=noreply@vdrs.com            # Default sender
REPLY_TO_EMAIL=info@vdrs.com           # Default reply-to
```

### Email Templates

Email templates are HTML strings generated by formatting functions:

- `formatContactFormEmail()` - Contact form notification
- `formatQuoteFormEmail()` - Quote request notification
- `formatJobApplicationEmail()` - Job application notification
- `formatContactConfirmationEmail()` - User confirmation
- `formatQuoteConfirmationEmail()` - Quote confirmation
- etc.

### Email Flow

1. **Request Received**: API endpoint receives form submission
2. **Data Validation**: Form data validated
3. **Email Generation**: HTML email generated from template
4. **Email Sending**: Email sent via configured service
5. **Error Handling**: Email failures logged but don't fail request
6. **Confirmation**: Confirmation email sent to user

### Email Failure Handling

- **Email failures are logged** but don't cause request to fail
- **User still receives success response** (email sent asynchronously)
- **Admin can review logs** to see email failures
- **Retry logic** can be added in future versions

---

## Rate Limiting

### Implementation

Rate limiting uses an **in-memory Map** to track requests per IP address:

```typescript
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;              // Max requests
const RATE_LIMIT_WINDOW = 10 * 1000; // 10 seconds
```

### How It Works

1. **IP Extraction**: Client IP extracted from headers
   ```typescript
   const ip = req.headers['x-forwarded-for']?.split(',')[0] || 
              req.headers['x-real-ip'] || 
              'unknown';
   ```

2. **Check Rate Limit**: 
   - If IP not in map → Allow, add to map
   - If IP in map and window expired → Reset, allow
   - If IP in map and under limit → Increment count, allow
   - If IP in map and over limit → Deny (429)

3. **Response**: 
   - Allowed → Continue processing
   - Denied → Return 429 status

### Limitations

**Current Implementation**:
- **In-memory storage**: Lost on function restart
- **Single instance**: Doesn't work across multiple function instances
- **No persistence**: Rate limit resets on cold start

**Production Recommendations**:
- Use **Redis** or **Upstash** for distributed rate limiting
- Implement **sliding window** algorithm
- Add **rate limit headers** to responses
- Consider **per-endpoint** rate limits

### Future Improvements

```typescript
// Example: Redis-based rate limiting
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `rate_limit:${ip}`;
  const count = await redis.incr(key);
  
  if (count === 1) {
    await redis.expire(key, 10); // 10 second window
  }
  
  return count <= 10;
}
```

---

## Validation System

### Zod Schemas

All input validation uses **Zod** schemas:

```typescript
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
```

### Validation Flow

1. **Request Body Parsed**: JSON body parsed
2. **Schema Validation**: Zod schema validates data
3. **Error Handling**: 
   - Success → Continue processing
   - Failure → Return 400 with error details

### Validation Features

- **Type Safety**: Ensures correct data types
- **Format Validation**: Email, phone, URL formats
- **Length Validation**: Min/max character limits
- **Custom Messages**: User-friendly error messages
- **Nested Validation**: Complex object structures

### Example Validation

```typescript
const validationResult = contactFormSchema.safeParse(req.body);

if (!validationResult.success) {
  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: validationResult.error.errors
    // [
    //   { path: ['email'], message: 'Invalid email format' },
    //   { path: ['phone'], message: 'Phone must be at least 10 digits' }
    // ]
  });
}

const formData = validationResult.data; // Type-safe validated data
```

---

## Security Measures

### Input Sanitization

- **Zod validation** prevents invalid data
- **HTML escaping** in email templates prevents XSS
- **Type checking** prevents type confusion attacks

### reCAPTCHA

Optional reCAPTCHA verification:

```typescript
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) return true; // Skip in development
  
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: `secret=${secretKey}&response=${token}`,
  });
  
  const data = await response.json();
  return data.success === true;
}
```

### Security Headers

Configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; ..."
        }
      ]
    }
  ]
}
```

### Environment Variables

- **Never commit** `.env.local` or secrets
- **Server-side variables** in Vercel dashboard
- **VITE_ prefix** only for public config (exposed to client)

---

## Error Handling

### Error Response Format

All errors follow consistent format:

```typescript
{
  success: false,
  message: "Human-readable error message",
  errors?: [                    // Only for validation errors
    {
      path: ["fieldName"],
      message: "Field-specific error"
    }
  ]
}
```

### Error Types

1. **Validation Errors (400)**
   - Invalid input data
   - Includes field-specific errors

2. **Method Not Allowed (405)**
   - Wrong HTTP method
   - Only POST allowed for form submissions

3. **Rate Limit (429)**
   - Too many requests
   - User-friendly message

4. **Server Errors (500)**
   - Unexpected errors
   - Logged for debugging
   - Generic message to user

### Error Logging

```typescript
try {
  // ... processing
} catch (error) {
  console.error('Error details:', {
    endpoint: '/api/contact',
    error: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString()
  });
  
  return res.status(500).json({
    success: false,
    message: 'An error occurred. Please try again later.'
  });
}
```

---

## Performance Considerations

### Function Optimization

1. **Keep functions small**: Faster cold starts
2. **Minimize dependencies**: Reduce bundle size
3. **Use dynamic imports**: Load heavy modules on-demand
4. **Cache when possible**: Reduce external API calls

### Email Optimization

- **Async email sending**: Don't block response
- **Batch emails**: Send multiple emails in parallel
- **Email queue**: Consider queue system for high volume

### Database Considerations

Currently, the system doesn't use a database. For production scale:

- **Form submissions**: Store in database for analytics
- **Rate limiting**: Use Redis for distributed rate limiting
- **User data**: Store for GDPR compliance
- **Analytics**: Track form submissions and conversions

### Monitoring

Consider adding:
- **Function execution time** monitoring
- **Error rate** tracking
- **Rate limit** hit tracking
- **Email delivery** success rate
- **Cold start** frequency

---

## Deployment

### Vercel Deployment

Functions are automatically deployed with the frontend:

1. **Push to GitHub**: Triggers deployment
2. **Vercel Build**: Builds frontend and functions
3. **Function Deployment**: Functions deployed to edge network
4. **Global Distribution**: Functions available worldwide

### Environment Variables

Set in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add variables for each environment (Production, Preview, Development)
- Variables are encrypted and secure

### Function Logs

View logs in Vercel dashboard:
- Real-time function execution logs
- Error logs and stack traces
- Performance metrics

---

## Best Practices

1. **Always validate input** with Zod schemas
2. **Handle errors gracefully** with try-catch
3. **Log errors** for debugging but don't expose details to users
4. **Rate limit** all public endpoints
5. **Use environment variables** for configuration
6. **Test functions** before deploying
7. **Monitor function performance** in production
8. **Keep functions stateless** (use external storage for state)

---

## Future Improvements

1. **Database Integration**: Store form submissions
2. **Redis Rate Limiting**: Distributed rate limiting
3. **Email Queue**: Queue system for high volume
4. **Function Monitoring**: Enhanced monitoring and alerting
5. **Caching**: Cache frequently accessed data
6. **Webhooks**: Notify external systems on form submission
7. **Analytics**: Track form conversion rates
8. **A/B Testing**: Test different form variations

---

**Last Updated**: January 2025  
**Architecture Version**: 1.0.0
