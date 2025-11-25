// Cache Management Utility
// Provides methods to inspect and manage service worker caches

class CacheManager {
  async getCacheInfo(): Promise<{
    cacheNames: string[];
    totalEntries: number;
    cacheDetails: { [key: string]: { entries: number; urls: string[] } };
  }> {
    try {
      const cacheNames = await caches.keys();
      const cacheDetails: { [key: string]: { entries: number; urls: string[] } } = {};
      let totalEntries = 0;

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        const urls = keys.map(request => request.url);
        
        cacheDetails[cacheName] = {
          entries: keys.length,
          urls: urls
        };
        totalEntries += keys.length;
      }

      return {
        cacheNames,
        totalEntries,
        cacheDetails
      };
    } catch (error) {
      console.error('Cache Manager: Failed to get cache info', error);
      return {
        cacheNames: [],
        totalEntries: 0,
        cacheDetails: {}
      };
    }
  }

  async clearAllCaches(): Promise<void> {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      if (process.env.NODE_ENV === 'development') {
        console.log('Cache Manager: All caches cleared');
      }
    } catch (error) {
      console.error('Cache Manager: Failed to clear caches', error);
    }
  }

  async clearCacheByName(cacheName: string): Promise<void> {
    try {
      await caches.delete(cacheName);
      if (process.env.NODE_ENV === 'development') {
        console.log(`Cache Manager: Cache '${cacheName}' cleared`);
      }
    } catch (error) {
      console.error(`Cache Manager: Failed to clear cache '${cacheName}'`, error);
    }
  }

  async precacheImages(imageUrls: string[]): Promise<void> {
    try {
      const cache = await caches.open('vandyk-static-v1.0.0');
      await cache.addAll(imageUrls);
      if (process.env.NODE_ENV === 'development') {
      console.log(`Cache Manager: Precached ${imageUrls.length} images`);
    }
    } catch (error) {
      console.error('Cache Manager: Failed to precache images', error);
    }
  }

  // Debug method to log cache contents
  async logCacheContents(): Promise<void> {
    const info = await this.getCacheInfo();
    console.group('Cache Manager: Cache Contents');
    if (process.env.NODE_ENV === 'development') {
      console.log(`Total caches: ${info.cacheNames.length}`);
      console.log(`Total entries: ${info.totalEntries}`);
    }
    
    for (const [cacheName, details] of Object.entries(info.cacheDetails)) {
      console.group(`Cache: ${cacheName}`);
      if (process.env.NODE_ENV === 'development') {
        console.log(`Entries: ${details.entries}`);
        console.log('URLs:', details.urls);
      }
      console.groupEnd();
    }
    console.groupEnd();
  }
}

// Create singleton instance
const cacheManager = new CacheManager();

// Expose to window for debugging
if (typeof window !== 'undefined') {
  (window as any).cacheManager = cacheManager;
}

export default cacheManager;




