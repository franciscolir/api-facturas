// Nombre del caché
const CACHE_NAME = 'mi-pwa-cache-v1';
// Archivos que queremos guardar en caché
const urlsToCache = [
  '/',
  '/index-pwa.html',
  '/appPwa.js',
  '/manifest.json'
];

// Evento de instalación: guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('📦 Cacheando archivos iniciales');
      return cache.addAll(urlsToCache);
    })
  );
});

// Evento de activación
self.addEventListener('activate', event => {
  console.log('✅ Service Worker activo');
});

// Interceptar peticiones y responder desde caché o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve caché si existe, si no, va a red
        return response || fetch(event.request);
      })
  );
});
