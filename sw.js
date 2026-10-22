const CACHE_NAME = 'vix-3d-academy-v6.3-autosync';
const ASSETS = [
  './',
  './index.html',
  './vix_3d_options_academy.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fast-Timeout Network-First (800ms) + Offline Cache Fallback:
// 1. On Home Wi-Fi (<10ms response): Always fetches the latest modified HTML/JS and updates local cache automatically.
// 2. Outside Home Wi-Fi (5G/Subway/Offline): Aborts LAN wait after 800ms and serves the cached offline version immediately.
function fetchWithFastTimeout(request, timeoutMs = 800) {
  return new Promise((resolve, reject) => {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = setTimeout(() => {
      if (controller) controller.abort();
      reject(new Error('LAN timeout'));
    }, timeoutMs);

    fetch(request, {
      cache: 'no-cache',
      signal: controller ? controller.signal : undefined
    }).then((response) => {
      clearTimeout(timer);
      resolve(response);
    }).catch((err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Smart timeout: 800ms for private LAN IPs, 2500ms for Cloud HTTPS (GitHub Pages) on 4G/5G
  const isLan = /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.|localhost|127\.)/.test(self.location.hostname);
  const timeoutMs = isLan ? 800 : 2500;

  event.respondWith(
    fetchWithFastTimeout(event.request, timeoutMs)
      .then((networkResp) => {
        if (networkResp && networkResp.status === 200) {
          const clone = networkResp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return networkResp;
        }
        throw new Error('Bad network status');
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          return cached || caches.match('./index.html');
        });
      })
  );
});
