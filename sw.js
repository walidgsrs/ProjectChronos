// Aethesi Supremacy Protocol: Service Worker (Purged)
const CACHE_NAME = 'aethesi-dashboard-final-v1'; // Increment version to force update
const assetsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './time-bomb.png' // Note: Ensure this path is correct
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assetsToCache)));
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            ).then(() => self.clients.claim());
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});


