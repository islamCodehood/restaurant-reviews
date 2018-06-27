
var currentCache = 'restaurantsCache-v1';
self.addEventListener('install', function(event) {
    //urls to be cached
    const urlsToCache = [
        './',
        './css/styles.css',
        './data/restaurants.json',
        './js/main.js',
        './js/restaurant_info.js',
        './js/dbhelper.js'
    ];
    event.waitUntil(
        caches.open(currentCache).then(function(cache) {
        return cache.addAll(urlsToCache);
        }).catch(function (error) {
            console.log(error);
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
