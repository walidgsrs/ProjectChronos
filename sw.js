// Aethesi Supremacy Protocol: Service Worker (v3)
const CACHE_NAME = 'aethesi-dashboard-v3'; // Version incremented to force update
const assetsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './time-bomb.png' // Corrected to the single, true asset
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

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});

self.addEventListener('sync', event => {
    if (event.tag === 'aethesi-check-sprints-now') {
        event.waitUntil(checkSprintsAndNotify());
    }
});

function checkSprintsAndNotify() {
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
                    return; 
                }
                self.registration.showNotification(title, {
                    body: body,
                    icon: './time-bomb.png',
                    badge: './time-bomb.png'
                });
            }
        };
    };
}


