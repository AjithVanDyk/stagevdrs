import * as Sentry from '@sentry/react';
import React from 'react';

// Initialize Sentry
export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN || 'YOUR_SENTRY_DSN_HERE';
  
  // Only initialize Sentry if we have a valid DSN
  if (dsn === 'YOUR_SENTRY_DSN_HERE' || !dsn) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry not initialized - no valid DSN provided');
    }
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

// Error boundary component - use a proper div instead of Fragment
export const SentryErrorBoundary = Sentry.withErrorBoundary ? Sentry.withErrorBoundary('div') : React.Fragment;

// Performance monitoring utilities
export const captureException = Sentry.captureException;
export const captureMessage = Sentry.captureMessage;
export const addBreadcrumb = Sentry.addBreadcrumb;
export const setUser = Sentry.setUser;
export const setTag = Sentry.setTag;
export const setContext = Sentry.setContext;

// Performance monitoring
export const startSpan = Sentry.startSpan;

// Custom error reporting for forms
export const reportFormError = (error: Error, formName: string, formData?: any) => {
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

// Custom error reporting for API calls
export const reportApiError = (error: Error, endpoint: string, method: string) => {
  if (!Sentry.withErrorBoundary) return; // Sentry not initialized
  
  Sentry.withScope((scope) => {
    scope.setTag('errorType', 'api');
    scope.setTag('endpoint', endpoint);
    scope.setTag('method', method);
    Sentry.captureException(error);
  });
};

// Custom error reporting for navigation
export const reportNavigationError = (error: Error, route: string) => {
  if (!Sentry.withErrorBoundary) return; // Sentry not initialized
  
  Sentry.withScope((scope) => {
    scope.setTag('errorType', 'navigation');
    scope.setTag('route', route);
    Sentry.captureException(error);
  });
};

// Performance monitoring for page loads
export const trackPageLoad = (pageName: string) => {
  if (!Sentry.withErrorBoundary) return; // Sentry not initialized
  
  Sentry.addBreadcrumb({
    message: `Page loaded: ${pageName}`,
    category: 'navigation',
    level: 'info',
  });
};

// Performance monitoring for user interactions
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

// Performance monitoring for form submissions
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
