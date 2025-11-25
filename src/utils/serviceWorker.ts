// Service Worker Registration Utility
// Handles service worker registration and updates

interface ServiceWorkerConfig {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
}

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private config: ServiceWorkerConfig;

  constructor(config: ServiceWorkerConfig = {}) {
    this.config = config;
  }

  async register(): Promise<ServiceWorkerRegistration | null> {
    if (!('serviceWorker' in navigator)) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Service Worker: Not supported');
      }
      return null;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('Service Worker: Registered successfully');
      }

      // Handle updates
      this.registration.addEventListener('updatefound', () => {
        const newWorker = this.registration?.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New content is available
              if (process.env.NODE_ENV === 'development') {
                console.log('Service Worker: New content available');
              }
              this.config.onUpdate?.(this.registration!);
            } else {
              // Content is cached for the first time
              if (process.env.NODE_ENV === 'development') {
                console.log('Service Worker: Content cached');
              }
              this.config.onSuccess?.(this.registration!);
            }
          }
        });
      });

      this.config.onSuccess?.(this.registration);
      return this.registration;

    } catch (error) {
      console.error('Service Worker: Registration failed', error);
      this.config.onError?.(error as Error);
      return null;
    }
  }

  async unregister(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      const result = await this.registration.unregister();
      if (process.env.NODE_ENV === 'development') {
        console.log('Service Worker: Unregistered', result);
      }
      return result;
    } catch (error) {
      console.error('Service Worker: Unregistration failed', error);
      return false;
    }
  }

  async update(): Promise<void> {
    if (!this.registration) {
      return;
    }

    try {
      await this.registration.update();
      if (process.env.NODE_ENV === 'development') {
        console.log('Service Worker: Update triggered');
      }
    } catch (error) {
      console.error('Service Worker: Update failed', error);
    }
  }

  getRegistration(): ServiceWorkerRegistration | null {
    return this.registration;
  }

  isSupported(): boolean {
    return 'serviceWorker' in navigator;
  }

  async getCacheSize(): Promise<number> {
    if (!this.registration) {
      return 0;
    }

    try {
      const cacheNames = await caches.keys();
      let totalSize = 0;

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        totalSize += keys.length;
      }

      return totalSize;
    } catch (error) {
      console.error('Service Worker: Failed to get cache size', error);
      return 0;
    }
  }

  async clearCache(): Promise<void> {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      if (process.env.NODE_ENV === 'development') {
        console.log('Service Worker: Cache cleared');
      }
    } catch (error) {
      console.error('Service Worker: Failed to clear cache', error);
    }
  }
}

// Create a singleton instance
const serviceWorkerManager = new ServiceWorkerManager({
  onUpdate: (registration) => {
    // Force update without confirmation for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Service Worker: Forcing update to new version');
    }
    registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  },
  onSuccess: () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Service Worker: Ready for offline use');
    }
  },
  onError: (error) => {
    console.error('Service Worker: Error', error);
  }
});

export default serviceWorkerManager;




