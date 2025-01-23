const CACHE_NAME = 'swiftmail-cache-v1';

// Files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// Helper function to check if URL should be cached
const shouldCache = (url) => {
  // Only cache same-origin HTTP(S) requests
  return url.startsWith(self.location.origin) && 
         (url.startsWith('http://') || url.startsWith('https://'));
};

// Install event handler
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Activate new service worker immediately
  self.skipWaiting();
});

// Fetch event handler
self.addEventListener('fetch', event => {
  // Only handle HTTP(S) requests
  if (!shouldCache(event.request.url)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request.clone())
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cache the response
            if (shouldCache(event.request.url)) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          })
          .catch(() => {
            // Return cached response if fetch fails
            return caches.match(event.request);
          });
      })
  );
});

// Activate event handler
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Claim control immediately
  self.clients.claim();
});
