// Adris Jarvis – hält die App offline startbar. KI-Anfragen gehen immer live raus.
const CACHE = "adri-jarvis-v3";
const DATEIEN = ["./", "./index.html", "./v/1/index.html", "./v/2/index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;   // Gemini & Schriften: direkt ins Netz
  // Erst Netz (damit Updates sofort ankommen), sonst Cache
  e.respondWith(fetch(e.request).then(r => {
    const kopie = r.clone(); caches.open(CACHE).then(c => c.put(e.request, kopie)); return r;
  }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html"))));
});
