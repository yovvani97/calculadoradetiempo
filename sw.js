const CACHE_NAME = 'tonalpohualli-v6'; // Subimos a v6 para forzar la actualización
const assets = [
  './',
  './index.html',
  './nemontemi.html',
  './logo.png', // <--- Verifica que esté aquí
  './manifest.json',
  './signos/spinner-grecas.png',
  // ... resto de links
];

// Instalación
self.addEventListener('install', event => {
  self.skipWaiting(); // Fuerza al SW nuevo a tomar el control de inmediato
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Activación
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Interceptor
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
