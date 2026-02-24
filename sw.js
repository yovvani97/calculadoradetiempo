const CACHE_NAME = 'tonalpohualli-v4'; // Subimos a v4 para forzar limpieza
const assets = [
  './',
  './index.html',
  './nemontemi.html',
  './js/lucide.min.js',
  './logo.png',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Intentamos cachear uno por uno para que si uno falla, no detenga a los demás
      return Promise.all(
        assets.map(url => {
          return cache.add(url).catch(err => console.log('Error cargando:', url, err));
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Esto borra la versión vieja (v2/v3) y activa la nueva de inmediato
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
