"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Loader2, Maximize2, Minimize2 } from "lucide-react";

/**
 * Sunumun içinde çalışan araç.
 *
 * NEDEN GÖMÜLÜ: Bir aracı anlatıp "sitede var" demek ile slaydın üstünde
 * çalıştırıp göstermek arasında büyük fark var. Okuyan kişi sunumdan
 * çıkmadan deneyebiliyor, ürettiği dosyayı da oradan indirebiliyor.
 *
 * NEDEN IFRAME: Araçlar kendi sayfalarında zaten çalışıyor. Bileşenleri
 * doğrudan içe aktarmak sunum paketine on iki aracın tamamını yüklerdi;
 * iframe yalnızca açıldığında yükleniyor ve araç sayfası tek kaynak olarak
 * kalıyor — bir düzeltme her iki yerde birden geçerli oluyor.
 *
 * Yazdırma kipinde iframe basılmıyor; onun yerine adres ve kısa açıklama
 * çıkıyor, çünkü kâğıtta çalışan bir araç yok.
 */
export function EmbeddedTool({
  slug,
  title,
  hint,
}: {
  slug: string;
  title: string;
  hint?: string;
}) {
  const [acik, setAcik] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [tamEkran, setTamEkran] = useState(false);
  const kapsayici = useRef<HTMLDivElement>(null);

  // Esc ile tam ekrandan çık — sunum kabuğunun Esc'i devralmasını engelle.
  useEffect(() => {
    if (!tamEkran) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setTamEkran(false);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [tamEkran]);

  const adres = `/araclar/${slug}`;
  // Gömülü kipte araç sayfası kendi site kabuğunu gizliyor (bkz. EmbedMode).
  const iframeAdres = `${adres}?gomulu=1`;

  return (
    <div ref={kapsayici} className="w-full">
      {/* Yazdırma kipinde iframe yerine adres */}
      <div className="hidden print:block ai-card px-5 py-4">
        <div className="text-white font-semibold mb-1">{title}</div>
        <div className="font-mono text-sm" style={{ color: "var(--deck-accent)" }}>
          osmancancetlenbik.com{adres}
        </div>
      </div>

      <div className="print:hidden">
        {!acik ? (
          <button
            onClick={() => setAcik(true)}
            className="w-full ai-card px-6 py-8 text-center group hover:border-[color-mix(in_srgb,var(--deck-accent)_50%,transparent)] transition-colors"
          >
            <div className="text-white text-lg font-semibold mb-1.5">
              {title}
            </div>
            <div className="text-sm text-white/50 mb-4">
              {hint ?? "Slayttan çıkmadan burada deneyin."}
            </div>
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold"
              style={{ background: "var(--deck-accent)", color: "#000" }}
            >
              Aracı burada aç
            </span>
          </button>
        ) : (
          <div
            className={
              tamEkran
                ? "fixed inset-0 z-[200] bg-black p-4 flex flex-col"
                : "relative"
            }
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
                {title} · canlı
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTamEkran((v) => !v)}
                  aria-label={tamEkran ? "Küçült" : "Tam ekran"}
                  className="p-1.5 text-white/45 hover:text-white transition-colors"
                >
                  {tamEkran ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={adres}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Aracı yeni sekmede aç"
                  className="p-1.5 text-white/45 hover:text-white transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div
              className={`relative rounded-lg overflow-hidden border border-white/12 bg-black ${
                tamEkran ? "flex-1" : "h-[26rem]"
              }`}
            >
              {yukleniyor && (
                <div className="absolute inset-0 grid place-items-center">
                  <Loader2
                    className="w-6 h-6 animate-spin"
                    style={{ color: "var(--deck-accent)" }}
                  />
                </div>
              )}
              <iframe
                src={iframeAdres}
                title={title}
                onLoad={() => setYukleniyor(false)}
                className="w-full h-full"
                /* Araç kendi indirmesini yapabilmeli; sunumu yönlendirmesin. */
                sandbox="allow-scripts allow-same-origin allow-downloads allow-forms allow-popups"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
