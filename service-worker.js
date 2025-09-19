const CACHE_NAME = 'gestor-v2-cache';
const urlsToCache = [
  './',
  './index.html',
  './offline.html',      // Fallback offline
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './final_v2.html'      // tu página principal real
];

// Instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activación
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si hay cache, lo devuelve
        if (response) return response;

        // Si no, intenta fetch normal
        return fetch(event.request).catch(() => {
          // Si falla fetch (offline), devuelve offline.html si es navegación
          if (event.request.mode === 'navigate') {
            return caches.match('./offline.html');
          }
        });
      })
  );
});
