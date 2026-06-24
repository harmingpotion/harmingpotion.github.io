
self.addEventListener('install', (event) => {
  console.log('Service Worker: Geïnstalleerd');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Geactiveerd');
});