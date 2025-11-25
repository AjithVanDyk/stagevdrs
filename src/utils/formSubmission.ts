// Form submission utility for ContactUs and other forms
import { reportFormError, reportApiError } from './sentry';

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  applicationType?: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  error?: string;
}

// Email service configuration
const EMAIL_SERVICE_CONFIG = {
  // Using EmailJS as a simple solution for client-side email sending
  serviceId: 'service_vdrs',
  templateId: 'template_contact',
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // This should be set in environment variables
};

// Alternative: Form submission to a backend API
const API_ENDPOINTS = {
  contact: '/api/contact',
  quote: '/api/quote',
  application: '/api/application',
};

/**
 * Submit contact form data
 * This is a placeholder implementation - in production, you would:
 * 1. Use a proper email service (SendGrid, Mailgun, etc.)
 * 2. Have a backend API endpoint
 * 3. Implement proper validation and sanitization
 * 4. Add rate limiting and spam protection
 */
export async function submitContactForm(formData: ContactFormData): Promise<FormSubmissionResult> {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
        error: 'Missing required fields'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.',
        error: 'Invalid email format'
      };
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real implementation, you would:
    // 1. Send data to your backend API
    // 2. Backend would send email using a service like SendGrid
    // 3. Return success/error response
    
    // For now, we'll simulate a successful submission
    // Form submission logged
    
    // Track form submission in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'contact',
        event_label: 'contact_form',
        value: 1
      });
    }

    return {
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.'
    };

  } catch (error) {
    console.error('Form submission error:', error);
    
    // Report error to Sentry
    reportFormError(error instanceof Error ? error : new Error('Unknown form submission error'), 'contact', formData);
    
    // Track form error in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_error', {
        event_category: 'contact',
        event_label: 'contact_form_error',
        value: 1
      });
    }

    return {
      success: false,
      message: 'Sorry, there was an error submitting your message. Please try again or contact us directly.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Submit quote request form
 */
export async function submitQuoteForm(formData: ContactFormData & {
  equipment?: string;
  budget?: string;
  timeline?: string;
  location?: string;
}): Promise<FormSubmissionResult> {
  try {
    // Similar validation and submission logic as contact form
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
        error: 'Missing required fields'
      };
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Quote form submission logged
    
    // Track quote request in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'quote',
        event_label: 'quote_request',
        value: 1
      });
    }

    return {
      success: true,
      message: 'Thank you for your quote request! Our sales team will contact you within 24 hours.'
    };

  } catch (error) {
    console.error('Quote form submission error:', error);
    
    return {
      success: false,
      message: 'Sorry, there was an error submitting your quote request. Please try again or contact us directly.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Submit job application form
 */
export async function submitApplicationForm(formData: ContactFormData & {
  position: string;
  resume?: File;
  coverLetter?: string;
  experience?: string;
}): Promise<FormSubmissionResult> {
  try {
    if (!formData.name || !formData.email || !formData.position) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
        error: 'Missing required fields'
      };
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Application form submission logged
    
    // Track job application in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'careers',
        event_label: 'job_application',
        value: 1
      });
    }

    return {
      success: true,
      message: 'Thank you for your application! We will review your information and contact you if there\'s a match.'
    };

  } catch (error) {
    console.error('Application form submission error:', error);
    
    return {
      success: false,
      message: 'Sorry, there was an error submitting your application. Please try again or contact us directly.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Type declarations for gtag (Google Analytics)
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}
