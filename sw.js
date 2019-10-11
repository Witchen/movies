var cacheName = 'movies-cache';
var filesToCache = [
	'/movies/',
	'/movies/index.html',
	'index.html',
];

self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	console.log('fetch event handler');
	event.respondWith(
		caches.match(event.request, {
			ignoreSearch: true
		}).then(response => {
			return response || fetch(event.request);
		})
	);
});