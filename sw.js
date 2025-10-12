// Aethesi Supremacy Protocol: Service Worker (v2 - Self-Purging)
const CACHE_NAME = 'aethesi-dashboard-v3'; // The version number is the key.

// This list must contain every file our app needs to function offline.
const assetsToCache = [
    './', // Caches the root, which is often index.html
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './time-bomb.png'
];

// On install, cache the new assets.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(assetsToCache);
            })
    );
});

// On activate, purge all old, obsolete caches.
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName); // Purge the old fortress.
                    }
                })
            );
        })
    );
});

// On fetch, serve from cache first (standard procedure).
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// --- NEW: The Activation Protocol ---
// This gives the new version the authority to take command immediately.
self.addEventListener('message', event => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});





