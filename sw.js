const currentCache = 'restaurantsCache-v2';
self.addEventListener('install', function(event) {
    //urls to be cached
    const urlsToCache = [
        '/',
        '/css/styles.css',
        '/data/restaurants.json',
        '/img/',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/dbhelper.js',
        'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
    ];
    event.waitUntil(
        caches.open(currentCache).then(function(cache) {
        return cache.addAll(urlsToCache);
        })
    );
    
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName !== currentCache;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


