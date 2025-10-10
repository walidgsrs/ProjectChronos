// Aethesi Supremacy Protocol: The Sleeper Cell
const CACHE_NAME = 'aethesi-dashboard-v3'; // Increment version
const assetsToCache = [
    './', './index.html', './style.css', './script.js', './manifest.json',
    './icons/ios/192.png', './icons/ios/512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assetsToCache)));
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            );
        })
    );
});
// --- RE-FORGED: The Autonomous Notification Engine, now triggered by precision command ---
self.addEventListener('sync', event => {
    if (event.tag === 'aethesi-check-sprints-now') {
        event.waitUntil(checkSprintsAndNotify());
    }
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});

// The autonomous logic is purged. This worker now only delivers notifications when commanded.
// It is clean, efficient, and obedient.

