"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import type { YazarAdayi } from "@/lib/openalex";
import { KartPaneli } from "./KartPaneli";

/**
 * Akademisyen kartı arayüzü.
 *
 * Akış: ad/ORCID → aday listesi → seçim → kart. Aday listesi şart, çünkü
 * OpenAlex aynı adı taşıyan birden çok yazar kaydı döndürebiliyor (kurum
 * değişince yeni kayıt açılabiliyor); kullanıcı kurum ve yayın sayısına
 * bakıp doğrusunu seçiyor.
 */
export function AkademisyenKartiClient() {
  const [sorgu, setSorgu] = useState("");
  const [adaylar, setAdaylar] = useState<YazarAdayi[]>([]);
  const [araniyor, setAraniyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [secili, setSecili] = useState<YazarAdayi | null>(null);
  const sonSorgu = useRef("");

  async function ara(e?: React.FormEvent) {
    e?.preventDefault();
    const q = sorgu.trim();
    if (q.length < 3) return;
    sonSorgu.current = q;
    setAraniyor(true);
    setHata(null);
    setSecili(null);
    try {
      const res = await fetch(`/api/akademisyen-karti/ara?q=${encodeURIComponent(q)}`);
      const veri = (await res.json()) as { sonuclar: YazarAdayi[]; hata?: string };
      // Kullanıcı bu arada yeni bir arama başlattıysa eski sonucu basma.
      if (sonSorgu.current !== q) return;
      if (veri.hata) setHata(veri.hata);
      setAdaylar(veri.sonuclar);
      if (veri.sonuclar.length === 1) setSecili(veri.sonuclar[0]);
      if (veri.sonuclar.length === 0 && !veri.hata) {
        setHata(
          "Bu adla kayıt bulunamadı. Adın Türkçe karaktersiz hâlini ya da ORCID numaranızı deneyin."
        );
      }
    } catch {
      setHata("Aramada sorun çıktı, yeniden deneyin.");
    } finally {
      setAraniyor(false);
    }
  }

  // Seçim yapılınca kart paneline kaydır — mobilde liste uzun oluyor.
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (secili) panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [secili]);

  return (
    <div className="space-y-8">
      <form onSubmit={ara} className="space-y-3">
        <label
          htmlFor="yazar-sorgu"
          className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)]"
        >
          Ad soyad ya da ORCID
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="yazar-sorgu"
            value={sorgu}
            onChange={(e) => setSorgu(e.target.value)}
            placeholder="Örn. Ahmet Ali Süzen ya da 0000-0002-5871-1652"
            autoComplete="off"
            className="flex-1 px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={araniyor || sorgu.trim().length < 3}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Search className="w-4 h-4" />
            {araniyor ? "Aranıyor…" : "Ara"}
          </button>
        </div>
        <p className="text-xs text-[var(--fg-subtle)]">
          Veri OpenAlex&apos;ten gelir; Google Scholar&apos;dan farklı sayılar
          görmeniz normaldir. ORCID ile arama en kesin sonucu verir.
        </p>
        {hata && <p className="text-sm text-yellow-500">{hata}</p>}
      </form>

      {adaylar.length > 1 && (
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
            Hangisi siz? — {adaylar.length} kayıt bulundu
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {adaylar.map((a) => {
              const aktif = secili?.id === a.id;
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => setSecili(a)}
                    className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                      aktif
                        ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                        : "border-[var(--border-strong)] bg-[var(--bg-card)] hover:border-[var(--accent)]/60"
                    }`}
                  >
                    <div className="font-medium text-[var(--fg)]">{a.ad}</div>
                    <div className="text-xs text-[var(--fg-muted)] mt-0.5">
                      {a.kurum ?? "Kurum bilgisi yok"}
                    </div>
                    <div className="text-xs text-[var(--fg-subtle)] mt-1">
                      {a.yayin} yayın · {a.atif} atıf · h {a.hIndeks}
                      {a.orcid ? ` · ORCID ${a.orcid}` : ""}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div ref={panelRef}>{secili && <KartPaneli yazar={secili} />}</div>
    </div>
  );
}
