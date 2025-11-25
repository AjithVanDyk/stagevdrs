// Performance monitoring and optimization utilities
interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: string;
  url: string;
  userAgent: string;
}

interface WebVitals {
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  FCP?: number; // First Contentful Paint
  TTFB?: number; // Time to First Byte
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];
  private maxMetrics = 100;
  private webVitals: WebVitals = {};

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private constructor() {
    this.setupWebVitalsMonitoring();
    this.setupResourceTiming();
    this.setupNavigationTiming();
  }

  private setupWebVitalsMonitoring(): void {
    // Monitor Core Web Vitals
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();
  }

  private observeLCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.webVitals.LCP = lastEntry.startTime;
        this.logMetric('LCP', lastEntry.startTime);
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Fallback for browsers that don't support LCP
      }
    }
  }

  private observeFID(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.webVitals.FID = entry.processingStart - entry.startTime;
          this.logMetric('FID', this.webVitals.FID);
        });
      });
      
      try {
        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Fallback for browsers that don't support FID
      }
    }
  }

  private observeCLS(): void {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.webVitals.CLS = clsValue;
        this.logMetric('CLS', clsValue);
      });
      
      try {
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Fallback for browsers that don't support CLS
      }
    }
  }

  private observeFCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.webVitals.FCP = entry.startTime;
          this.logMetric('FCP', entry.startTime);
        });
      });
      
      try {
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        // Fallback for browsers that don't support FCP
      }
    }
  }

  private setupResourceTiming(): void {
    // Monitor resource loading performance
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'resource') {
            this.logMetric(`Resource-${entry.name}`, entry.duration);
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['resource'] });
      } catch (e) {
        // Fallback for browsers that don't support resource timing
      }
    }
  }

  private setupNavigationTiming(): void {
    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          this.logMetric('TTFB', navigation.responseStart - navigation.requestStart);
          this.logMetric('DOMContentLoaded', navigation.domContentLoadedEventEnd - navigation.navigationStart);
          this.logMetric('LoadComplete', navigation.loadEventEnd - navigation.navigationStart);
        }
      }, 0);
    });
  }

  logMetric(name: string, value: number): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.metrics.push(metric);

    // Maintain metrics size
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      // Performance metric logged
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(metric);
    }
  }

  private async sendToAnalytics(metric: PerformanceMetric): Promise<void> {
    try {
      // In a real application, integrate with analytics service
      // Examples: Google Analytics, Mixpanel, DataDog, etc.
      
      // For now, store in localStorage for debugging
      const existingMetrics = JSON.parse(localStorage.getItem('vdrs-performance') || '[]');
      existingMetrics.push(metric);
      
      // Keep only last 20 metrics in localStorage
      if (existingMetrics.length > 20) {
        existingMetrics.splice(0, existingMetrics.length - 20);
      }
      
      localStorage.setItem('vdrs-performance', JSON.stringify(existingMetrics));
      
    } catch (error) {
      console.error('Failed to send performance metric:', error);
    }
  }

  getWebVitals(): WebVitals {
    return { ...this.webVitals };
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  // Utility functions for measuring custom performance
  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    this.logMetric(name, end - start);
    return result;
  }

  async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    
    this.logMetric(name, end - start);
    return result;
  }

  // Image loading optimization
  optimizeImageLoading(): void {
    // Preload critical images
    const criticalImages = [
      '/Images/van-dyk-direct-logo.png',
      '/Images/image-1749759459073.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Lazy load non-critical images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Bundle size monitoring
  monitorBundleSize(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'resource' && entry.name.includes('.js')) {
            this.logMetric(`Bundle-${entry.name.split('/').pop()}`, entry.transferSize);
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['resource'] });
      } catch (e) {
        // Fallback for browsers that don't support resource timing
      }
    }
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// Utility functions
export const measurePerformance = <T>(name: string, fn: () => T): T => {
  return performanceMonitor.measureFunction(name, fn);
};

export const measureAsyncPerformance = async <T>(name: string, fn: () => Promise<T>): Promise<T> => {
  return performanceMonitor.measureAsyncFunction(name, fn);
};

// Initialize performance monitoring
export const initializePerformanceMonitoring = (): void => {
  performanceMonitor.optimizeImageLoading();
  performanceMonitor.monitorBundleSize();
};



