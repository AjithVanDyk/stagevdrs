# API Documentation

**Van Dyk Recycling Solutions - API Endpoints**

This document provides comprehensive documentation for all API endpoints, including request/response formats, error handling, and usage examples.

**Base URL**: `https://stagevdrs.vercel.app/api`

---

## Table of Contents

1. [Contact Form](#contact-form)
2. [Quote Request](#quote-request)
3. [Job Application](#job-application)
4. [Test Center Request](#test-center-request)
5. [Newsletter Subscription](#newsletter-subscription)
6. [Catalogue Request](#catalogue-request)
7. [GDPR Requests](#gdpr-requests)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)
10. [Authentication & Security](#authentication--security)

---

## Contact Form

**Endpoint**: `POST /api/contact`

Handles contact form submissions and training requests.

### Request Body

```typescript
{
  name: string;              // Required, min 2 characters
  company: string;           // Required, min 1 character
  email: string;             // Required, valid email format
  phone: string;             // Required, min 10 digits
  message: string;           // Required, min 10 characters
  recaptchaToken?: string;   // Optional, reCAPTCHA token
  applicationType?: string;  // Optional, 'training_request' for Van Dyk University forms
}
```

### Example Request

```bash
curl -X POST https://stagevdrs.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "company": "Acme Corp",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "I am interested in your recycling equipment.",
    "recaptchaToken": "03AGdBq..."
  }'
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you within 24 hours."
}
```

### Error Responses

**400 Bad Request** - Validation failed
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "path": ["email"],
      "message": "Please enter a valid email address"
    }
  ]
}
```

**405 Method Not Allowed**
```json
{
  "success": false,
  "message": "Method not allowed"
}
```

**429 Too Many Requests** - Rate limit exceeded
```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "An error occurred while processing your request. Please try again later."
}
```

### Flow

1. **Validation**: Request body validated against Zod schema
2. **Rate Limiting**: IP address checked against rate limit (10 requests per 10 seconds)
3. **reCAPTCHA**: Token verified with Google reCAPTCHA API (if provided)
4. **Email Routing**: 
   - Regular contact forms → `CONTACT_EMAIL` (default: `info@vdrs.com`)
   - Training requests (`applicationType: 'training_request'`) → `TRAINING_EMAIL` (default: `training@vdrs.com`)
5. **Email Sending**:
   - Notification email sent to recipient
   - Confirmation email sent to form submitter
6. **Response**: Success or error response returned

### Notes

- Email sending failures are logged but don't fail the request
- Training requests are automatically routed to the training email address
- Rate limiting uses in-memory storage (consider Redis for production scale)

---

## Quote Request

**Endpoint**: `POST /api/quote`

Handles quote requests for equipment and solutions.

### Request Body

```typescript
{
  firstName: string;                    // Required, 2-50 characters
  lastName?: string;                    // Optional, max 50 characters
  email: string;                        // Required, valid email format
  phone: string;                        // Required, 10-16 digits, valid format
  company: string;                      // Required, 2-100 characters
  city?: string;                        // Optional, max 50 characters
  state?: string;                       // Optional, max 50 characters
  country?: string;                     // Optional, max 50 characters
  additionalDetails?: string;           // Optional, max 1000 characters
  selectedEquipment?: string[];         // Optional, array of equipment IDs
  selectedSolutions?: number[];         // Optional, array of solution IDs (1-16)
}
```

### Solution IDs

```typescript
{
  1: 'Single Stream Recycling',
  2: 'Plastics Recycling',
  3: 'Organics Processing',
  4: 'Food Waste Depackaging',
  5: 'MSW Processing',
  6: 'Commercial Waste',
  7: 'C&D Recycling',
  8: 'Multi-MRF Systems',
  9: 'Waste to Energy',
  10: 'E-Scrap Recycling',
  11: 'Glass Cleanup',
  12: 'Composting',
  13: 'Bollegraaf Balers',
  14: 'AI-Based Waste Analytics',
  15: 'Odor Control',
  16: 'EV Battery Recycling'
}
```

### Example Request

```bash
curl -X POST https://stagevdrs.vercel.app/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "company": "Green Solutions Inc",
    "city": "Boston",
    "state": "MA",
    "country": "USA",
    "selectedEquipment": ["bollegraaf-balers"],
    "selectedSolutions": [1, 2, 3],
    "additionalDetails": "Looking for a complete recycling solution."
  }'
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Thank you for your quote request! Our sales team will contact you within 24 hours."
}
```

### Error Responses

Same error format as Contact Form (400, 405, 429, 500).

### Flow

1. **Validation**: Request body validated against Zod schema
2. **Rate Limiting**: IP address checked (10 requests per 10 seconds)
3. **Solution Mapping**: Solution IDs mapped to solution names
4. **Email Sending**:
   - Notification email to `QUOTE_EMAIL` (default: `info@vdrs.com`)
   - Confirmation email to form submitter
5. **Response**: Success or error response returned

---

## Job Application

**Endpoint**: `POST /api/application`

Handles job application submissions.

### Request Body

```typescript
{
  fullName: string;          // Required, min 2 characters
  email: string;             // Required, valid email format
  phone: string;             // Required, min 10 digits
  position: string;          // Required, job position name
  resume?: string;           // Optional, base64 encoded or URL
  coverLetter?: string;      // Optional, cover letter text
  experience?: string;       // Optional, experience description
}
```

### Example Request

```bash
curl -X POST https://stagevdrs.vercel.app/api/application \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "position": "Field Service Technician",
    "coverLetter": "I am interested in this position...",
    "experience": "5 years in mechanical installation"
  }'
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Thank you for your application! We will review your information and contact you if there's a match."
}
```

### Flow

1. **Validation**: Request body validated
2. **Rate Limiting**: IP address checked
3. **Email Sending**: Notification email sent to `AChirca@vdrs.com` (HR email)
4. **Response**: Success or error response returned

---

## Test Center Request

**Endpoint**: `POST /api/test-center`

Handles test center booking requests.

### Request Body

```typescript
{
  fullName: string;          // Required
  email: string;             // Required, valid email
  phone: string;             // Required
  company: string;           // Required
  materialType: string;       // Required, type of material to test
  quantity?: string;         // Optional, quantity of material
  preferredDate?: string;    // Optional, preferred test date
  additionalNotes?: string;  // Optional, additional information
}
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Thank you for your test center request! We will contact you to schedule your test."
}
```

---

## Newsletter Subscription

**Endpoint**: `POST /api/newsletter/subscribe`

Handles newsletter subscription requests.

### Request Body

```typescript
{
  email: string;             // Required, valid email format
  name?: string;             // Optional, subscriber name
}
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Thank you for subscribing to our newsletter!"
}
```

---

## Catalogue Request

**Endpoint**: `POST /api/catalogue`

Handles equipment catalogue download requests.

### Request Body

```typescript
{
  email: string;             // Required, valid email format
  equipmentName: string;      // Required, name of equipment
  equipmentId?: string;       // Optional, equipment identifier
}
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Thank you for your catalogue request! We will send the equipment catalogue to your email shortly."
}
```

---

## GDPR Requests

### Data Access Request

**Endpoint**: `POST /api/gdpr/access`

Requests access to user's personal data.

### Request Body

```typescript
{
  email: string;             // Required, valid email format
  requestType: "access";      // Required, must be "access"
}
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Your data access request has been received. We will process it within 30 days.",
  "data": {
    "personalInformation": { ... },
    "formSubmissions": [ ... ],
    "cookiePreferences": { ... }
  }
}
```

### Data Deletion Request

**Endpoint**: `POST /api/gdpr/delete`

Requests deletion of user's personal data.

### Request Body

```typescript
{
  email: string;             // Required, valid email format
  requestType: "delete";      // Required, must be "delete"
}
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Your data deletion request has been received. We will process it within 30 days."
}
```

### Data Export Request

**Endpoint**: `POST /api/gdpr/export`

Requests export of user's personal data.

### Request Body

```typescript
{
  email: string;             // Required, valid email format
  requestType: "export";      // Required, must be "export"
  format?: "json" | "csv";    // Optional, default: "json"
}
```

### Success Response (200)

**JSON Format:**
```json
{
  "success": true,
  "message": "Your data export is ready.",
  "data": { ... },
  "format": "json"
}
```

**CSV Format:**
```json
{
  "success": true,
  "data": "Email,Name,Phone,Exported At\n..."
}
```

---

## Error Handling

All endpoints follow a consistent error response format:

### Error Response Structure

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": [                    // Only present for validation errors
    {
      "path": ["fieldName"],
      "message": "Validation error message"
    }
  ]
}
```

### HTTP Status Codes

- **200 OK**: Request successful
- **400 Bad Request**: Validation error or invalid input
- **405 Method Not Allowed**: Wrong HTTP method (only POST allowed)
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

### Error Handling Best Practices

1. **Always check `success` field** in response
2. **Handle rate limiting** (429) with user-friendly message and retry logic
3. **Display validation errors** (`errors` array) to users
4. **Log 500 errors** for debugging but show generic message to users
5. **Implement retry logic** for transient failures

### Example Error Handling

```typescript
try {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 429) {
      // Rate limited - show message and disable form temporarily
      setError('Too many requests. Please wait a moment and try again.');
      return;
    }
    
    if (data.errors) {
      // Validation errors - display field-specific errors
      setFieldErrors(data.errors);
      return;
    }
    
    // Generic error
    setError(data.message || 'An error occurred. Please try again.');
    return;
  }
  
  // Success
  setSuccess(data.message);
} catch (error) {
  // Network error or other exception
  setError('Network error. Please check your connection and try again.');
}
```

---

## Rate Limiting

All API endpoints implement rate limiting to prevent abuse.

### Rate Limit Configuration

- **Limit**: 10 requests per IP address
- **Window**: 10 seconds
- **Storage**: In-memory Map (consider Redis/Upstash for production scale)

### Rate Limit Headers

Currently, rate limit information is not included in response headers. This can be added in future versions.

### Handling Rate Limits

When rate limited (429 status), clients should:
1. Display user-friendly error message
2. Disable form submission temporarily
3. Implement exponential backoff for retries
4. Show countdown timer if possible

### Example Rate Limit Handling

```typescript
if (response.status === 429) {
  const retryAfter = 10; // seconds
  setRateLimited(true);
  setRetryAfter(retryAfter);
  
  // Auto-retry after delay
  setTimeout(() => {
    setRateLimited(false);
    // Retry submission
  }, retryAfter * 1000);
}
```

---

## Authentication & Security

### reCAPTCHA

Optional reCAPTCHA verification is available for forms:
- **Token**: Include `recaptchaToken` in request body
- **Verification**: Server verifies token with Google reCAPTCHA API
- **Development**: Verification skipped if `RECAPTCHA_SECRET_KEY` not configured

### Security Headers

All responses include security headers configured in `vercel.json`:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

### Input Validation

All inputs are validated using Zod schemas:
- **Type checking**: Ensures correct data types
- **Format validation**: Email, phone, URL formats
- **Length validation**: Min/max character limits
- **Sanitization**: XSS prevention through proper escaping

### Email Security

- **Reply-To**: Set to user's email for easy replies
- **From Address**: Configured via environment variables
- **HTML Escaping**: All user input escaped in email templates

---

## Environment Variables

### Required (Server-Side)

Add these to Vercel environment variables (not in `.env.local`):

```bash
# Email Configuration
EMAIL_SERVICE=resend                    # 'resend', 'sendgrid', or 'smtp'
RESEND_API_KEY=re_xxxxxxxxxxxxx         # Required if using Resend
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx       # Required if using SendGrid
FROM_EMAIL=noreply@vdrs.com
REPLY_TO_EMAIL=info@vdrs.com

# Recipient Emails
CONTACT_EMAIL=info@vdrs.com
QUOTE_EMAIL=info@vdrs.com
TRAINING_EMAIL=training@vdrs.com
TEST_CENTER_EMAIL=info@vdrs.com

# Security (Optional)
RECAPTCHA_SECRET_KEY=your_secret_key    # Optional, for reCAPTCHA verification
```

### Optional

```bash
# SMTP Configuration (if using SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=username
SMTP_PASS=password
```

---

## Testing

### Manual Testing

Use curl or Postman to test endpoints:

```bash
# Test contact form
curl -X POST https://stagevdrs.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","company":"Test Co","email":"test@example.com","phone":"1234567890","message":"Test message"}'
```

### Automated Testing

Consider adding automated tests for:
- Request validation
- Rate limiting
- Error handling
- Email sending (mock email service)

---

## Support

For API issues or questions:
- **Developer**: Ajith Srikanth
- **Email**: asrikanth@vdrs.com
- **Repository**: https://github.com/AjithVanDyk/stagevdrs.git

---

**Last Updated**: January 2025  
**API Version**: 1.0.0
