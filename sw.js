const CACHE_NAME = 'tonalpohualli-v5'; // Subimos a v5 por el cambio de dominio
const assets = [
  '/',
  '/index.html',
  '/nemontemi.html',
  '/js/lucide.min.js',
  '/logo.png',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

// Instalación: Guarda los archivos en el caché del celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        assets.map(url => {
          return cache.add(url).catch(err => console.log('Error cargando:', url, err));
        })
      );
    })
  );
});

// Activación: Limpia cachés antiguos de la dirección anterior
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Interceptor: Sirve los archivos desde el caché si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
