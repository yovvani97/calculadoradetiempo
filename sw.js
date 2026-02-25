const CACHE_NAME = 'tonalpohualli-v6'; // Subimos a v6 para forzar la actualización
const assets = [
  './',
  './index.html',
  './nemontemi.html',
  './logo.png',
  './manifest.json',
  './signos/spinner-grecas.png', // IMPORTANTE: Añadimos la greca
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js'
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
