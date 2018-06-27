const currentCache = 'restaurantsCache-v2';
self.addEventListener('install', function(event) {
    //urls to be cached
    const urlsToCache = [
        'https://islam888.github.io/restaurant-reviews/',
        'https://islam888.github.io/restaurant-reviews/css/styles.css',
        'https://islam888.github.io/restaurant-reviews/data/restaurants.json',
        'https://islam888.github.io/restaurant-reviews/img/',
        'https://islam888.github.io/restaurant-reviews/js/main.js',
        'https://islam888.github.io/restaurant-reviews/js/restaurant_info.js',
        'https://islam888.github.io/restaurant-reviews/js/dbhelper.js',
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

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            return fetch(event.request).then(function(response) {
                if (response.status === 404) {
                    //free download and personal use png from https://pngtree.com/freepng/404-error-vector_2871439.html
                    return fetch('/img/404.png');
                }
                return response;
            })
        })
    );

});

