/**
 * Service Worker voor Voedzame Shakes PWA
 * v3: Network-first voor HTML/recipes, Cache-first voor static assets
 */

const CACHE_NAME = 'voedzame-shakes-v3';

// Static assets - cache-first (rarely change)
const STATIC_ASSETS = [
    './css/style.css',
    './js/app.js',
    './manifest.json',
    './favicon.png',
    './icons/icon-72.png',
    './icons/icon-96.png',
    './icons/icon-128.png',
    './icons/icon-144.png',
    './icons/icon-152.png',
    './icons/icon-192.png',
    './icons/icon-384.png',
    './icons/icon-512.png'
];

// Network-first patterns (HTML, recipes)
const NETWORK_FIRST_PATTERNS = [
    /\.html$/,
    /recipes\.json/,
    /app-v\d+\.html/,
    /index\.html/
];

// Check if URL should use network-first strategy
function isNetworkFirst(url) {
    return NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(url));
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing v3...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating v3...');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - different strategies based on resource type
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    const url = event.request.url;

    if (isNetworkFirst(url)) {
        // NETWORK-FIRST: For HTML and recipes
        // Try network first, fall back to cache
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (response.ok) {
                        // Clone and cache the fresh response
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Network failed, try cache
                    console.log('[SW] Network failed, trying cache for:', url);
                    return caches.match(event.request);
                })
        );
    } else {
        // CACHE-FIRST: For static assets (CSS, JS, icons)
        event.respondWith(
            caches.match(event.request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    // Not in cache, fetch from network
                    return fetch(event.request)
                        .then((response) => {
                            if (!response || response.status !== 200) {
                                return response;
                            }

                            // Clone and cache
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                            return response;
                        })
                        .catch(() => {
                            // Both failed - return offline fallback for navigation
                            if (event.request.mode === 'navigate') {
                                return caches.match('./app-v1.html');
                            }
                            return new Response('Offline', {
                                status: 503,
                                statusText: 'Service Unavailable'
                            });
                        });
                })
        );
    }
});

// Handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
