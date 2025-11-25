// Optimized Service Worker for Van Dyk Recycling Solutions
// Focused on performance and minimal overhead

const STATIC_CACHE_NAME = 'van-dyk-static-v3';
const DYNAMIC_CACHE_NAME = 'van-dyk-dynamic-v3';

// Critical assets only - optimized for LCP
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Images/van-dyk-logo-new.jpg',
  '/Images/image-1749759459073.png', // LCP image - critical for performance
  '/Images/spinner-loading-video.mp4' // Loading spinner video
];

// Install event - minimal caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Installing');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - optimized for performance
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip non-http requests
  if (!request.url.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version immediately
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Only cache successful responses
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              const responseToCache = networkResponse.clone();
              caches.open(DYNAMIC_CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
            }
            return networkResponse;
          })
          .catch(() => {
            // Return offline page for navigation
            if (request.mode === 'navigate') {
              return caches.match('/') || new Response(
                '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1></body></html>',
                { headers: { 'Content-Type': 'text/html' } }
              );
            }
            return new Response('Offline', { status: 503 });
          });
      })
  );
});