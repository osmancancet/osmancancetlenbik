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

// v2: v1 hatalı yanıtları (ör. deploy sırasında 404 dönen CSS) önbelleğe yazıp
// sonsuza kadar veriyordu; sürüm değişince activate eski önbelleği siler.
const VERSION = "occ-araclar-v2";
const OFFLINE_URL = "/araclar";

/** Yalnızca başarılı, kendi kaynağımızdan gelen yanıtları sakla. */
function sakla(request, res) {
  if (!res || !res.ok || res.type !== "basic") return;
  const copy = res.clone();
  caches.open(VERSION).then((c) => c.put(request, copy));
}

/** Önce ağ; ağ yoksa önbellek (sayfa ise son çare çevrimdışı araç sayfası). */
function onceAg(request, sayfa) {
  return fetch(request)
    .then((res) => {
      sakla(request, res);
      return res;
    })
    .catch(() =>
      caches
        .match(request)
        .then((r) => r || (sayfa ? caches.match(OFFLINE_URL) : Response.error()))
    );
}

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

  // Araç sayfaları ve RSC verileri (?_rsc=…) güncel kalsın: önce ağ.
  if (path.startsWith("/araclar")) {
    event.respondWith(onceAg(request, request.mode === "navigate"));
    return;
  }

  // Hash'li statik dosyalar değişmez: önce önbellek. Hatalı kayıt varsa
  // (eski sürümden kalmış olabilir) yok sayılıp ağdan tazelenir.
  if (path.startsWith("/_next/static")) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached && cached.ok
          ? cached
          : fetch(request).then((res) => {
              sakla(request, res);
              return res;
            })
      )
    );
  }
});
