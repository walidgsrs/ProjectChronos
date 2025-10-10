// Aethesi Supremacy Protocol: The Sentinel
const CACHE_NAME = 'aethesi-dashboard-v4'; // Increment version to force update
const assetsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './icons/ios/512.png'
];

self.addEventListener('install', event => {
    self.skipWaiting(); // Force the new service worker to activate immediately
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assetsToCache)));
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            ).then(() => self.clients.claim()); // Take control of all open clients
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});

// --- RE-FORGED: The Sentinel's Command Core ---
self.addEventListener('message', event => {
    if (event.data && event.data.command === 'schedule-notification') {
        const { timeToNotification } = event.data;
        
        console.log(`Sentinel: Command received. Payload armed. Time to detonation: ${timeToNotification / 1000} seconds.`);

        // The Sentinel now owns the timer. It will execute even if the main app is closed.
        setTimeout(() => {
            checkSprintsAndNotify();
        }, timeToNotification);
    }
});

function checkSprintsAndNotify() {
    const request = indexedDB.open('AethesiDB', 1);
    request.onsuccess = event => {
        const db = event.target.result;
        try {
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
                        icon: './icons/ios/512.png',
                        badge: './icons/ios/512.png'
                    });
                }
            };
        } catch (error) {
            console.error("Sentinel: Failed to access IndexedDB.", error);
        }
    };
    request.onerror = event => {
        console.error("Sentinel: IndexedDB connection failed.", event.target.error);
    };
}


