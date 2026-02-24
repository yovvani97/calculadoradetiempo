const CACHE_NAME = 'tonalpohualli-v2';
const assets = [
  'https://yovvani97.github.io/calculadoradetiempo/',
  'https://yovvani97.github.io/calculadoradetiempo/index.html',
  'https://yovvani97.github.io/calculadoradetiempo/nemontemi.html',
  'https://yovvani97.github.io/calculadoradetiempo/js/lucide.min.js',
  'https://yovvani97.github.io/calculadoradetiempo/logo.png',
  'https://yovvani97.github.io/calculadoradetiempo/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets');
      return cache.addAll(assets);
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
