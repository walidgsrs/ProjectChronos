// Aethesi Supremacy Protocol: The Autonomous Agent
const CACHE_NAME = 'aethesi-dashboard-v2'; // Increment version to force update
const assetsToCache = [
    './', // Cache the root, which is index.html
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './icons/ios/192.png',
    './icons/ios/512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assetsToCache)));
});

// Purge old caches
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

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});

// --- NEW: The Autonomous Notification Engine ---
self.addEventListener('periodicsync', event => {
    if (event.tag === 'aethesi-check-sprints') {
        event.waitUntil(checkSprintsAndNotify());
    }
});

function checkSprintsAndNotify() {
    // Open the shared IndexedDB to retrieve intelligence
    const request = indexedDB.open('AethesiDB', 1);

    request.onsuccess = event => {
        const db = event.target.result;
        const transaction = db.transaction(['dashboardState'], 'readonly');
        const objectStore = transaction.objectStore('dashboardState');
        const getRequest = objectStore.get('currentState');

        getRequest.onsuccess = () => {
            const state = getRequest.result;
            if (state) {
                const { sprintGoal, sprintsCompleted } = state;
                let title = 'Aethesi Command';
                let body;

                if (sprintGoal > 0 && sprintsCompleted < sprintGoal) {
                    body = `You have ${sprintGoal - sprintsCompleted} of ${sprintGoal} daily sprints remaining. Engage.`;
                } else if (sprintGoal > 0 && sprintsCompleted >= sprintGoal) {
                    body = `Daily goal complete (${sprintsCompleted}/${sprintGoal}). Do you have the energy for another victory?`;
                } else {
                    // Do not notify if no goal is set. Silence is a valid strategic choice.
                    return; 
                }
                
                self.registration.showNotification(title, {
                    body: body,
                    icon: './icons/ios/192.png',
                    badge: './icons/ios/192.png' // For Android
                });
            }
        };
    };
}
