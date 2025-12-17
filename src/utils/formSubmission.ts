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

// API endpoints for form submissions
// Note: API keys and secrets should be stored in Vercel environment variables (server-side only)
// Never use VITE_ prefix for sensitive data as it becomes public in the client bundle
const API_ENDPOINTS = {
  contact: '/api/contact',
  quote: '/api/quote',
  application: '/api/application',
  catalogue: '/api/catalogue',
};

/**
 * Submit contact form data to API endpoint
 */
export async function submitContactForm(formData: ContactFormData & { recaptchaToken?: string }): Promise<FormSubmissionResult> {
  try {
    // Call API endpoint
    const response = await fetch(API_ENDPOINTS.contact, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        recaptchaToken: formData.recaptchaToken,
        applicationType: formData.applicationType,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle API errors
      if (response.status === 429) {
        return {
          success: false,
          message: 'Too many requests. Please wait a moment and try again.',
          error: 'Rate limit exceeded'
        };
      }

      return {
        success: false,
        message: data.message || 'An error occurred while submitting your form. Please try again.',
        error: data.errors ? JSON.stringify(data.errors) : 'API error'
      };
    }

    // Track successful submission in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'contact',
        event_label: 'contact_form',
        value: 1
      });
    }

    return {
      success: true,
      message: data.message || 'Thank you for your message! We will get back to you within 24 hours.'
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
 * Submit quote request form to API endpoint
 */
export async function submitQuoteForm(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  state: string;
  country: string;
  additionalDetails?: string;
  selectedEquipment?: string[];
  selectedSolutions?: number[];
}): Promise<FormSubmissionResult> {
  try {
    const response = await fetch(API_ENDPOINTS.quote, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        return {
          success: false,
          message: 'Too many requests. Please wait a moment and try again.',
          error: 'Rate limit exceeded'
        };
      }

      return {
        success: false,
        message: data.message || 'An error occurred while submitting your quote request. Please try again.',
        error: data.errors ? JSON.stringify(data.errors) : 'API error'
      };
    }

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
      message: data.message || 'Thank you for your quote request! Our sales team will contact you within 24 hours.'
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
 * Submit job application form to API endpoint
 */
export async function submitApplicationForm(formData: {
  name: string;
  email: string;
  phone: string;
  position: string;
  company?: string;
  resume?: string; // Base64 encoded or URL
  coverLetter?: string;
  experience?: string;
}): Promise<FormSubmissionResult> {
  try {
    const response = await fetch(API_ENDPOINTS.application, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        return {
          success: false,
          message: 'Too many requests. Please wait a moment and try again.',
          error: 'Rate limit exceeded'
        };
      }

      return {
        success: false,
        message: data.message || 'An error occurred while submitting your application. Please try again.',
        error: data.errors ? JSON.stringify(data.errors) : 'API error'
      };
    }

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
      message: data.message || 'Thank you for your application! We will review your information and contact you if there\'s a match.'
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

/**
 * Submit catalogue request form to API endpoint
 */
export async function submitCatalogueRequest(formData: {
  email: string;
  equipmentName: string;
  equipmentId?: string;
}): Promise<FormSubmissionResult> {
  try {
    const response = await fetch(API_ENDPOINTS.catalogue, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        return {
          success: false,
          message: 'Too many requests. Please wait a moment and try again.',
          error: 'Rate limit exceeded'
        };
      }

      return {
        success: false,
        message: data.message || 'An error occurred while submitting your catalogue request. Please try again.',
        error: data.errors ? JSON.stringify(data.errors) : 'API error'
      };
    }

    // Track catalogue request in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'catalogue_request', {
        event_category: 'equipment',
        event_label: formData.equipmentName,
        value: 1
      });
    }

    return {
      success: true,
      message: data.message || 'Thank you for your catalogue request! We will send the equipment catalogue to your email shortly.'
    };

  } catch (error) {
    console.error('Catalogue request submission error:', error);
    
    return {
      success: false,
      message: 'Sorry, there was an error submitting your catalogue request. Please try again or contact us directly.',
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
