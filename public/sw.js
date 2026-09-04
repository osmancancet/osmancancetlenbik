/**
 * Araçlar için çevrimdışı önbellek.
 *
 * Amaç: akademisyen aracı bir kez açtıktan sonra uçakta, sınav salonunda ya
 * da internetsiz bir ortamda da kullanabilsin. Araçların çoğu zaten tamamen
 * tarayıcıda çalışıyor; eksik olan tek şey sayfanın kendisiydi.
 *
 * Strateji: gezinme isteklerinde önce ağ denenir (güncel sürüm gelsin), ağ
 * yoksa önbellekten verilir. Statik varlıklar önce önbellekten verilir.
 * Sürüm değiştiğinde eski önbellekler silinir.
 */

const VERSION = "occ-araclar-v1";
const OFFLINE_URL = "/araclar";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll([OFFLINE_URL]))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Yalnızca kendi kaynağımız — CrossRef gibi dış istekleri hiç ellemeyelim.
  if (new URL(request.url).origin !== self.location.origin) return;
  if (request.method !== "GET") return;

  // Araç sayfaları ve statik varlıklar dışında önbelleğe alma; veritabanına
  // bağlı sayfalar (dersler, yazılar) her zaman taze gelmeli.
  const path = new URL(request.url).pathname;
  const cacheable =
    path.startsWith("/araclar") || path.startsWith("/_next/static");
  if (!cacheable) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match(OFFLINE_URL)))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(request, copy));
          return res;
        })
    )
  );
});
