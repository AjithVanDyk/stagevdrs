# Form Flow Documentation

**Van Dyk Recycling Solutions - Form Submission Flows**

This document provides step-by-step flow explanations for all form routes in the application.

---

## Table of Contents

1. [Contact Form Flow](#contact-form-flow)
2. [Quote Request Flow](#quote-request-flow)
3. [Job Application Flow](#job-application-flow)
4. [Test Center Request Flow](#test-center-request-flow)
5. [Newsletter Subscription Flow](#newsletter-subscription-flow)
6. [Catalogue Request Flow](#catalogue-request-flow)
7. [GDPR Request Flows](#gdpr-request-flows)

---

## Contact Form Flow

**Route**: `/contact` or `/en/contact`, `/fr/contact`, `/es/contact`  
**API Endpoint**: `POST /api/contact`

### Step-by-Step Flow

1. **User Access**
   - User navigates to Contact page
   - Form displays with fields: Name, Company, Email, Phone, Message
   - Optional reCAPTCHA widget loads (if configured)

2. **Form Filling**
   - User fills in required fields
   - Real-time validation provides feedback
   - Optional: User completes reCAPTCHA challenge

3. **Form Submission**
   - User clicks "Submit" button
   - Client-side validation runs:
     - Name: min 2 characters
     - Company: min 1 character
     - Email: valid email format
     - Phone: min 10 digits
     - Message: min 10 characters
   - If validation fails, errors displayed inline

4. **API Request**
   - Form data + reCAPTCHA token sent to `/api/contact`
   - Request includes:
     - Form data (name, company, email, phone, message)
     - Optional `recaptchaToken`
     - Optional `applicationType` (for training requests)

5. **Server Processing**
   - **Rate Limiting Check**: IP address checked (10 requests per 10 seconds)
   - **Validation**: Zod schema validates all fields
   - **reCAPTCHA Verification**: Token verified with Google (if provided)
   - **Email Routing**:
     - If `applicationType === 'training_request'` → Email to `TRAINING_EMAIL`
     - Otherwise → Email to `CONTACT_EMAIL`
   - **Email Sending**:
     - Notification email sent to recipient
     - Confirmation email sent to user's email

6. **Response Handling**
   - **Success (200)**: Success message displayed, form optionally reset
   - **Error (400)**: Validation errors displayed to user
   - **Error (429)**: Rate limit message shown, form disabled temporarily
   - **Error (500)**: Generic error message displayed

7. **User Feedback**
   - Success: "Thank you for your message! We will get back to you within 24 hours."
   - User receives confirmation email
   - Form can be reset or user can navigate away

### Special Cases

- **Training Request**: If form is on Van Dyk University page, `applicationType: 'training_request'` is included, routing email to training department
- **Email Failure**: If email sending fails, request still succeeds (logged for admin review)

---

## Quote Request Flow

**Route**: `/equipment/*` (equipment pages) or dedicated quote page  
**API Endpoint**: `POST /api/quote`

### Step-by-Step Flow

1. **User Access**
   - User browses equipment or solutions
   - Clicks "Get Quote" button on equipment/solution card
   - Quote form modal opens (or navigates to quote page)

2. **Form Initialization**
   - Form pre-populated with:
     - Selected equipment IDs (if from equipment page)
     - Selected solution IDs (if from solutions page)
   - Required fields: First Name, Email, Phone, Company
   - Optional fields: Last Name, City, State, Country, Additional Details

3. **Form Filling**
   - User fills required information
   - Can select/deselect equipment and solutions
   - Can add additional details about their needs

4. **Form Submission**
   - Client-side validation:
     - First Name: 2-50 characters
     - Email: valid format
     - Phone: 10-16 digits, valid format
     - Company: 2-100 characters
   - Validation ensures at least one equipment or solution selected

5. **API Request**
   - Form data sent to `/api/quote`
   - Includes:
     - Personal information
     - Selected equipment array
     - Selected solution IDs array
     - Additional details

6. **Server Processing**
   - **Rate Limiting**: IP checked
   - **Validation**: Zod schema validates all fields
   - **Solution Mapping**: Solution IDs mapped to solution names
   - **Email Sending**:
     - Notification email to `QUOTE_EMAIL` (info@vdrs.com)
     - Includes all selected equipment and solutions
     - Confirmation email to user

7. **Response Handling**
   - **Success**: "Thank you for your quote request! Our sales team will contact you within 24 hours."
   - Form resets after 3 seconds
   - User can continue browsing

8. **Follow-up**
   - Sales team receives email with all quote details
   - User receives confirmation email
   - Sales team contacts user within 24 hours (business process)

---

## Job Application Flow

**Route**: `/careers` or `/en/careers`, `/fr/careers`, `/es/careers`  
**API Endpoint**: `POST /api/application`

### Step-by-Step Flow

1. **User Access**
   - User navigates to Careers page
   - Views available positions
   - Clicks "Apply Now" on a position

2. **Application Form**
   - Form displays with fields:
     - Full Name (required)
     - Email (required)
     - Phone (required)
     - Position (pre-filled from job listing)
     - Resume (optional, file upload or URL)
     - Cover Letter (optional)
     - Experience (optional)

3. **Form Filling**
   - User fills required information
   - Uploads resume (if available)
   - Writes cover letter
   - Describes relevant experience

4. **Form Submission**
   - Client-side validation:
     - Full Name: min 2 characters
     - Email: valid format
     - Phone: min 10 digits
     - Position: required
   - Resume can be base64 encoded or URL

5. **API Request**
   - Application data sent to `/api/application`
   - Includes all form fields

6. **Server Processing**
   - **Rate Limiting**: IP checked
   - **Validation**: All fields validated
   - **Email Sending**:
     - Notification email to HR: `AChirca@vdrs.com`
     - Email includes all application details
     - Resume attached or linked

7. **Response Handling**
   - **Success**: "Thank you for your application! We will review your information and contact you if there's a match."
   - Form can be reset
   - User receives confirmation

8. **HR Process**
   - HR receives application email
   - Application reviewed
   - Candidate contacted if selected (business process)

---

## Test Center Request Flow

**Route**: `/test-center` or `/en/test-center`  
**API Endpoint**: `POST /api/test-center`

### Step-by-Step Flow

1. **User Access**
   - User navigates to Test Center page
   - Learns about testing services
   - Clicks "Request Test" or similar CTA

2. **Form Display**
   - Form with fields:
     - Full Name (required)
     - Email (required)
     - Phone (required)
     - Company (required)
     - Material Type (required)
     - Quantity (optional)
     - Preferred Date (optional)
     - Additional Notes (optional)

3. **Form Filling**
   - User provides contact information
   - Specifies material to test
   - Indicates quantity and preferred date

4. **Form Submission**
   - Validation runs
   - Data sent to `/api/test-center`

5. **Server Processing**
   - Rate limiting checked
   - Validation performed
   - Email sent to `TEST_CENTER_EMAIL` (info@vdrs.com)
   - Confirmation email sent to user

6. **Response**
   - Success message: "Thank you for your test center request! We will contact you to schedule your test."
   - User receives confirmation email

7. **Scheduling**
   - Test center team reviews request
   - Contacts user to schedule test (business process)

---

## Newsletter Subscription Flow

**Route**: Newsletter popup (appears on site) or dedicated subscription page  
**API Endpoint**: `POST /api/newsletter/subscribe`

### Step-by-Step Flow

1. **User Trigger**
   - Newsletter popup appears (after delay or exit intent)
   - OR user navigates to subscription page
   - OR user clicks newsletter link in footer

2. **Form Display**
   - Simple form with:
     - Email (required)
     - Name (optional)

3. **Form Filling**
   - User enters email address
   - Optionally provides name

4. **Form Submission**
   - Email validation
   - Data sent to `/api/newsletter/subscribe`

5. **Server Processing**
   - Rate limiting checked
   - Email validated
   - Subscription recorded (implementation depends on newsletter service)
   - Welcome email sent (if configured)

6. **Response**
   - Success: "Thank you for subscribing to our newsletter!"
   - Popup closes (if applicable)
   - User receives welcome email

---

## Catalogue Request Flow

**Route**: Equipment pages (when user requests catalogue)  
**API Endpoint**: `POST /api/catalogue`

### Step-by-Step Flow

1. **User Trigger**
   - User views equipment page
   - Clicks "Download Catalogue" or "Request Catalogue"
   - Catalogue request modal/form appears

2. **Form Display**
   - Simple form:
     - Email (required)
     - Equipment Name (pre-filled from page)
     - Equipment ID (optional, pre-filled)

3. **Form Filling**
   - User confirms email address
   - Equipment information pre-filled

4. **Form Submission**
   - Email validation
   - Data sent to `/api/catalogue`

5. **Server Processing**
   - Rate limiting checked
   - Validation performed
   - Catalogue email sent to user
   - Notification logged (if configured)

6. **Response**
   - Success: "Thank you for your catalogue request! We will send the equipment catalogue to your email shortly."
   - User receives catalogue via email

---

## GDPR Request Flows

### Data Access Request

**Route**: `/gdpr-rights` or privacy policy page  
**API Endpoint**: `POST /api/gdpr/access`

### Step-by-Step Flow

1. **User Access**
   - User navigates to GDPR Rights page
   - Reads about data access rights
   - Clicks "Request My Data" or similar

2. **Form Display**
   - Simple form:
     - Email (required)
     - Request Type: "access" (pre-filled)

3. **Form Submission**
   - Email validation
   - Request sent to `/api/gdpr/access`

4. **Server Processing**
   - Rate limiting checked
   - Email validated
   - Data retrieval (implementation depends on data storage)
   - Response includes user data (if available)

5. **Response**
   - Success with data (if available)
   - OR: "Your data access request has been received. We will process it within 30 days."

6. **Follow-up**
   - Data provided to user within 30 days (GDPR requirement)
   - User can download data in JSON or CSV format

### Data Deletion Request

**Route**: `/gdpr-rights`  
**API Endpoint**: `POST /api/gdpr/delete`

### Step-by-Step Flow

1. **User Access**
   - User navigates to GDPR Rights page
   - Requests data deletion

2. **Form Submission**
   - Email + request type "delete" sent to `/api/gdpr/delete`

3. **Server Processing**
   - Request validated
   - Deletion request logged
   - Data marked for deletion (or deleted immediately)

4. **Response**
   - "Your data deletion request has been received. We will process it within 30 days."

5. **Follow-up**
   - Data deleted within 30 days (GDPR requirement)
   - Confirmation sent to user

### Data Export Request

**Route**: `/gdpr-rights`  
**API Endpoint**: `POST /api/gdpr/export`

### Step-by-Step Flow

1. **User Access**
   - User requests data export
   - Chooses format (JSON or CSV)

2. **Form Submission**
   - Email + request type "export" + format sent to `/api/gdpr/export`

3. **Server Processing**
   - Request validated
   - Data retrieved
   - Formatted according to requested format

4. **Response**
   - **JSON**: Returns JSON object with user data
   - **CSV**: Returns CSV file download

5. **User Action**
   - User downloads or saves exported data
   - Can use data to transfer to another service

---

## Common Patterns

### Error Handling

All forms follow consistent error handling:
1. **Client-side validation** before submission
2. **Server-side validation** for security
3. **User-friendly error messages** displayed inline
4. **Rate limiting** handled gracefully
5. **Network errors** caught and displayed

### Email Confirmation

Most forms send:
1. **Notification email** to business (info@vdrs.com, etc.)
2. **Confirmation email** to user
3. **Email failures** logged but don't fail the request

### Rate Limiting

All forms protected by:
- **10 requests per 10 seconds** per IP
- **429 status** returned when exceeded
- **User-friendly message** displayed
- **Temporary form disable** recommended

---

## Testing Forms

### Manual Testing Checklist

- [ ] Fill form with valid data → Should succeed
- [ ] Submit with invalid email → Should show validation error
- [ ] Submit with missing required field → Should show field error
- [ ] Submit 11 times quickly → Should show rate limit error
- [ ] Submit with network offline → Should show network error
- [ ] Check email inbox → Should receive confirmation email
- [ ] Check business email → Should receive notification email

### Automated Testing

Consider testing:
- Form validation (client and server)
- Rate limiting behavior
- Email sending (mock email service)
- Error handling
- Success flows

---

**Last Updated**: January 2025
