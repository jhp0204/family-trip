// 앱 화면과 부품을 기기에 보관해서 인터넷이 약해도 열리게 함 (항상 최신 버전을 먼저 시도)
const CACHE = "fjt-v48";
const CDN = ["esm.sh", "www.gstatic.com", "unpkg.com"];
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["./", "./index.html", "./manifest.webmanifest", "./app.js", "./icon.svg"]).catch(() => {})));
});
self.addEventListener("activate", (e) =>
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  )
);
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (u.origin !== location.origin && !CDN.includes(u.hostname)) return;
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        if (r.ok) {
          const copy = r.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return r;
      })
      .catch(() => caches.match(e.request).then((r) => r || (u.origin === location.origin ? caches.match("./index.html") : undefined)))
  );
});
