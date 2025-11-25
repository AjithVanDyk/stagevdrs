// Error monitoring and logging utility
interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  userId?: string;
}

class ErrorMonitor {
  private static instance: ErrorMonitor;
  private errorQueue: ErrorInfo[] = [];
  private maxQueueSize = 50;

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor();
    }
    return ErrorMonitor.instance;
  }

  private constructor() {
    // Set up global error handlers
    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers(): void {
    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });

    // Global JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });
  }

  logError(errorInfo: ErrorInfo): void {
    // Add to queue
    this.errorQueue.push(errorInfo);
    
    // Maintain queue size
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorInfo);
    }

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(errorInfo);
    }
  }

  private async sendToMonitoringService(errorInfo: ErrorInfo): Promise<void> {
    try {
      // In a real application, replace with actual monitoring service
      // Examples: Sentry, LogRocket, Bugsnag, DataDog
      
      // For now, we'll just store in localStorage for debugging
      const existingErrors = JSON.parse(localStorage.getItem('vdrs-errors') || '[]');
      existingErrors.push(errorInfo);
      
      // Keep only last 10 errors in localStorage
      if (existingErrors.length > 10) {
        existingErrors.splice(0, existingErrors.length - 10);
      }
      
      localStorage.setItem('vdrs-errors', JSON.stringify(existingErrors));
      
    } catch (error) {
      // Fallback: just log to console
      console.error('Failed to send error to monitoring service:', error);
    }
  }

  getErrorQueue(): ErrorInfo[] {
    return [...this.errorQueue];
  }

  clearErrorQueue(): void {
    this.errorQueue = [];
  }

  // Performance monitoring
  logPerformanceMetric(metric: {
    name: string;
    value: number;
    timestamp: string;
    url: string;
  }): void {
    if (process.env.NODE_ENV === 'development') {
      // Performance metric logged
    }

    // In production, send to analytics service
    if (process.env.NODE_ENV === 'production') {
      // Example: Google Analytics, Mixpanel, etc.
      this.sendToAnalyticsService(metric);
    }
  }

  private async sendToAnalyticsService(metric: any): Promise<void> {
    try {
      // In a real application, integrate with analytics service
      // Analytics metric logged
    } catch (error) {
      console.error('Failed to send analytics metric:', error);
    }
  }
}

// Export singleton instance
export const errorMonitor = ErrorMonitor.getInstance();

// Utility function for React error boundaries
export const logReactError = (error: Error, errorInfo: any): void => {
  errorMonitor.logError({
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href
  });
};

// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void): void => {
  const start = performance.now();
  fn();
  const end = performance.now();
  
  errorMonitor.logPerformanceMetric({
    name,
    value: end - start,
    timestamp: new Date().toISOString(),
    url: window.location.href
  });
};

export const measureAsyncPerformance = async (name: string, fn: () => Promise<any>): Promise<any> => {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  
  errorMonitor.logPerformanceMetric({
    name,
    value: end - start,
    timestamp: new Date().toISOString(),
    url: window.location.href
  });
  
  return result;
};













