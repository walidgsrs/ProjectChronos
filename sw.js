// Aethesi Supremacy Protocol: Service Worker
const CACHE_NAME = 'aethesi-dashboard-v1';
// This list must contain every file our app needs to function offline.
const assetsToCache = [
    './index.html',
    './manifest.json',
    './icons/ios/192.png',
    './icons/ios/512.png'
];

// On install, cache the assets.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(assetsToCache);
            })
    );
});

// On fetch, serve from cache first.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // If the asset is in the cache, serve it. Otherwise, fetch from the network.
                return response || fetch(event.request);
            })
    );
});