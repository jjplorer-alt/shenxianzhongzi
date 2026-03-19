/* ── 神仙种子 · 道经入门学习资源 PWA Service Worker ── */

const CACHE_VERSION = '__CACHE_VERSION__';
const CACHE_NAME   = `sxzz-app-${CACHE_VERSION}`;
const STATIC_CACHE = `sxzz-app-static-${CACHE_VERSION}`;
const FONT_CACHE   = `sxzz-app-fonts-${CACHE_VERSION}`;

/* 安装时预缓存的核心路由 */
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/intro/',
  '/intro/beidou/',
  '/resources/',
  '/about/',
];

/* ── Install ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS.map(url => new Request(url, { cache: 'reload' }))))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

/* ── Activate ── */
self.addEventListener('activate', event => {
  const validCaches = [CACHE_NAME, STATIC_CACHE, FONT_CACHE];
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => !validCaches.includes(key))
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch ── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (!['http:', 'https:'].includes(url.protocol)) return;

  /* Google Fonts：Cache-First */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  /* 外部资源：Network-First */
  if (url.hostname !== self.location.hostname) {
    event.respondWith(networkFirst(request, CACHE_NAME));
    return;
  }

  /* 导航请求（HTML 页面）：Network-First，离线时回退根页面 */
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match('/index.html').then(r => r || caches.match('/')))
    );
    return;
  }

  /* Next.js 静态资源 (_next/static)：Cache-First */
  if (url.pathname.startsWith('/_next/static/') ||
      /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|pdf)(\?|$)/.test(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  /* 其余：Network-First */
  event.respondWith(networkFirst(request, CACHE_NAME));
});

/* ── 策略函数 ── */

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

/* ── Push Notifications (预留) ── */
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || '神仙种子', {
      body:    data.body  || '',
      icon:    '/icon-192.png',
      badge:   '/icon-192.png',
      vibrate: [100, 50, 100],
      data:    { url: data.url || '/' },
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
