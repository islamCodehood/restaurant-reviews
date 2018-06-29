//The recent cache
const currentCache = 'restaurantsCache-v1';

//service worker install event and caching while installing 
self.addEventListener('install', event => {
    //urls to be cached
    const urlsToCache = [
        './',
        './index.html',
        './restaurant.html',
        './restaurant.html?id=1',
        './restaurant.html?id=2',
        './restaurant.html?id=3',
        './restaurant.html?id=4',
        './restaurant.html?id=5',
        './restaurant.html?id=6',
        './restaurant.html?id=7',
        './restaurant.html?id=8',
        './restaurant.html?id=9',
        './restaurant.html?id=10',
        './css/styles.css',
        './data/restaurants.json',
        './js/main.js',
        './js/restaurant_info.js',
        './js/dbhelper.js',
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg',
        './img/404.png',
        './img/favicon.png',
        'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
    ];
    event.waitUntil(
        caches.open(currentCache).then(cache => cache.addAll(urlsToCache)).catch(error => {
            console.log(error);
        })
    );
    
});

//service worker activate event and deleting older caches while activating
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.filter(cacheName => cacheName !== currentCache).map(cacheName => caches.delete(cacheName))
        ))
    );
});

/*service worker fetch event and respond with cache if there is something in cache.
If not responding from network. If the response status is 404 then respond with 404 image*/
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request).then(response => {
                if (response.status === 404) {
                    //free download and personal use png from https://pngtree.com/freepng/404-error-vector_2871439.html
                    return fetch('./img/404.png');
                }
                return response;
            })
        })
    );

});
