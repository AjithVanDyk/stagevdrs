/**
 * @fileoverview Sentry error monitoring and performance tracking utilities.
 * Provides error boundaries, exception tracking, and performance monitoring
 * for production error tracking and debugging.
 * @author Van Dyk Recycling Solutions
 * @module utils/sentry
 */

import * as Sentry from '@sentry/react';
import React from 'react';

/**
 * Initializes Sentry error monitoring and performance tracking.
 * Only initializes if a valid DSN is provided via VITE_SENTRY_DSN environment variable.
 * Silently skips initialization in development if DSN is not configured.
 * 
 * @returns {void}
 * 
 * @example
 * ```typescript
 * // In main.tsx or App.tsx
 * initSentry();
 * ```
 */
export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN || 'YOUR_SENTRY_DSN_HERE';
  
  // Only initialize Sentry if we have a valid DSN
  if (dsn === 'YOUR_SENTRY_DSN_HERE' || !dsn) {
    // Silently skip initialization in development - no console warning
    return;
  }

  Sentry.init({
    dsn: dsn,
    environment: import.meta.env.MODE || 'development',
    integrations: [
      Sentry.browserTracingIntegration({
        // Set tracePropagationTargets to control which URLs are traced
        tracePropagationTargets: ['localhost', 'vdrs.com', /^\//],
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    // Error Sampling
    sampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    // Release tracking
    release: import.meta.env.VITE_APP_VERSION || '1.0.0',
    // User context
    beforeSend(event) {
      // Filter out non-critical errors in production
      if (import.meta.env.MODE === 'production') {
        // Don't send ResizeObserver errors
        if (event.exception?.values?.[0]?.type === 'ResizeObserver loop limit exceeded') {
          return null;
        }
        // Don't send network errors for external resources
        if (event.exception?.values?.[0]?.type === 'NetworkError') {
          return null;
        }
      }
      return event;
    },
    // Custom tags
    initialScope: {
      tags: {
        component: 'van-dyk-website',
        version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      },
    },
  });
};

/**
 * Error boundary component wrapper for React components.
 * Catches React errors and sends them to Sentry.
 * 
 * @constant {React.ComponentType} SentryErrorBoundary
 * 
 * @example
 * ```typescript
 * <SentryErrorBoundary>
 *   <YourComponent />
 * </SentryErrorBoundary>
 * ```
 */
export const SentryErrorBoundary = Sentry.withErrorBoundary ? Sentry.withErrorBoundary('div') : React.Fragment;

/**
 * Captures an exception and sends it to Sentry.
 * @type {typeof Sentry.captureException}
 */
export const captureException = Sentry.captureException;

/**
 * Captures a message and sends it to Sentry.
 * @type {typeof Sentry.captureMessage}
 */
export const captureMessage = Sentry.captureMessage;

/**
 * Adds a breadcrumb to the current Sentry scope.
 * @type {typeof Sentry.addBreadcrumb}
 */
export const addBreadcrumb = Sentry.addBreadcrumb;

/**
 * Sets user context for error tracking.
 * @type {typeof Sentry.setUser}
 */
export const setUser = Sentry.setUser;

/**
 * Sets a tag on the current Sentry scope.
 * @type {typeof Sentry.setTag}
 */
export const setTag = Sentry.setTag;

/**
 * Sets context data on the current Sentry scope.
 * @type {typeof Sentry.setContext}
 */
export const setContext = Sentry.setContext;

/**
 * Starts a performance monitoring span.
 * @type {typeof Sentry.startSpan}
 */
export const startSpan = Sentry.startSpan;

/**
 * Reports a form-related error to Sentry with additional context.
 * 
 * @param {Error} error - The error to report
 * @param {string} formName - Name/identifier of the form
 * @param {Record<string, unknown>} [formData] - Optional form data to include in context (sanitize sensitive data)
 * @returns {void}
 * 
 * @example
 * ```typescript
 * try {
 *   await submitForm(data);
 * } catch (error) {
 *   reportFormError(error, 'contact-form', { hasName: !!data.name });
 * }
 * ```
 */
export const reportFormError = (error: Error, formName: string, formData?: Record<string, unknown>) => {
  if (!Sentry.withErrorBoundary) return; // Sentry not initialized
  
  Sentry.withScope((scope) => {
    scope.setTag('errorType', 'form');
    scope.setTag('formName', formName);
    if (formData) {
      scope.setContext('formData', formData);
    }
    Sentry.captureException(error);
  });
};

/**
 * Reports an API-related error to Sentry with endpoint and method context.
 * 
 * @param {Error} error - The error to report
 * @param {string} endpoint - API endpoint that failed
 * @param {string} method - HTTP method used (GET, POST, etc.)
 * @returns {void}
 * 
 * @example
 * ```typescript
 * try {
 *   await fetch('/api/contact', { method: 'POST', body: data });
 * } catch (error) {
 *   reportApiError(error, '/api/contact', 'POST');
 * }
 * ```
 */
export const reportApiError = (error: Error, endpoint: string, method: string) => {
  if (!Sentry.withErrorBoundary) return; // Sentry not initialized
  
  Sentry.withScope((scope) => {
    scope.setTag('errorType', 'api');
    scope.setTag('endpoint', endpoint);
    scope.setTag('method', method);
    Sentry.captureException(error);
  });
};

/**
 * Reports a navigation-related error to Sentry with route context.
 * 
 * @param {Error} error - The error to report
 * @param {string} route - Route/path that caused the error
 * @returns {void}
 * 
 * @example
 * ```typescript
 * try {
 *   navigate('/equipment');
 * } catch (error) {
 *   reportNavigationError(error, '/equipment');
 * }
 * ```
 */
export const reportNavigationError = (error: Error, route: string) => {
  if (!Sentry.withErrorBoundary) return; // Sentry not initialized
  
  Sentry.withScope((scope) => {
    scope.setTag('errorType', 'navigation');
    scope.setTag('route', route);
    Sentry.captureException(error);
  });
};

/**
 * Tracks a page load event as a breadcrumb in Sentry.
 * Useful for understanding user navigation patterns when debugging errors.
 * 
 * @param {string} pageName - Name/identifier of the page loaded
 * @returns {void}
 * 
 * @example
 * ```typescript
 * useEffect(() => {
 *   trackPageLoad('equipment-page');
 * }, []);
 * ```
 */
export const trackPageLoad = (pageName: string) => {
  if (!Sentry.withErrorBoundary) return; // Sentry not initialized
  
  Sentry.addBreadcrumb({
    message: `Page loaded: ${pageName}`,
    category: 'navigation',
    level: 'info',
  });
};

/**
 * Tracks a user interaction event as a breadcrumb in Sentry.
 * Helps understand user actions leading up to errors.
 * 
 * @param {string} action - Type of action (e.g., 'click', 'submit', 'hover')
 * @param {string} element - Element identifier or description
 * @returns {void}
 * 
 * @example
 * ```typescript
 * <button onClick={() => {
 *   trackUserInteraction('click', 'quote-button');
 *   handleQuote();
 * }}>
 *   Get Quote
 * </button>
 * ```
 */
export const trackUserInteraction = (action: string, element: string) => {
  if (!Sentry.withErrorBoundary) return; // Sentry not initialized
  
  Sentry.addBreadcrumb({
    message: `User interaction: ${action}`,
    category: 'user',
    level: 'info',
    data: {
      action,
      element,
    },
  });
};

/**
 * Tracks a form submission event as a breadcrumb in Sentry.
 * Records both successful and failed submissions for debugging.
 * 
 * @param {string} formName - Name/identifier of the form
 * @param {boolean} success - Whether submission was successful
 * @returns {void}
 * 
 * @example
 * ```typescript
 * try {
 *   await submitForm(data);
 *   trackFormSubmission('contact-form', true);
 * } catch (error) {
 *   trackFormSubmission('contact-form', false);
 * }
 * ```
 */
export const trackFormSubmission = (formName: string, success: boolean) => {
  if (!Sentry.withErrorBoundary) return; // Sentry not initialized
  
  Sentry.addBreadcrumb({
    message: `Form submission: ${formName}`,
    category: 'form',
    level: success ? 'info' : 'error',
    data: {
      formName,
      success,
    },
  });
};

export default Sentry;
