"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Download, ExternalLink, Share2 } from "lucide-react";
import type { YazarAdayi } from "@/lib/openalex";
import {
  gonderiMetni,
  kartGorselYolu,
  linkedinPaylasUrl,
  paylasimYolu,
} from "./paylasim";

/**
 * Seçilen yazarın kartı + paylaşım düğmeleri.
 *
 * Görsel sunucuda üretiliyor (/api/akademisyen-karti); burada sadece
 * gösterilip indiriliyor. LinkedIn'e "görsel yükle" API'si olmadığı için
 * paylaşım iki adımlı: kartı indir → gönderiye ekle. Bağlantı paylaşımı ise
 * OG görseli sayesinde tek tık; iki yol da sunuluyor.
 */
export function KartPaneli({ yazar }: { yazar: YazarAdayi }) {
  const [yuklendi, setYuklendi] = useState(false);
  const [gorselHata, setGorselHata] = useState(false);
  const [kopya, setKopya] = useState<"metin" | "baglanti" | null>(null);
  const [indiriliyor, setIndiriliyor] = useState(false);

  const gorsel = kartGorselYolu(yazar.id);
  const mutlakPaylasim =
    typeof window === "undefined"
      ? paylasimYolu(yazar.id)
      : window.location.origin + paylasimYolu(yazar.id);
  const metin = gonderiMetni(yazar, mutlakPaylasim);

  useEffect(() => {
    setYuklendi(false);
    setGorselHata(false);
  }, [yazar.id]);

  async function kopyala(ne: "metin" | "baglanti") {
    try {
      await navigator.clipboard.writeText(ne === "metin" ? metin : mutlakPaylasim);
      setKopya(ne);
      window.setTimeout(() => setKopya(null), 2500);
    } catch {
      // Pano izni yoksa kullanıcı metni elle seçip kopyalar.
    }
  }

  async function indir() {
    setIndiriliyor(true);
    try {
      const res = await fetch(gorsel);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `akademisyen-karti-${yazar.ad
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIndiriliyor(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* Kart */}
        <div className="relative rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] overflow-hidden aspect-[4/5]">
          {!yuklendi && !gorselHata && (
            <div className="absolute inset-0 grid place-items-center text-sm text-[var(--fg-muted)]">
              Kart hazırlanıyor…
            </div>
          )}
          {gorselHata ? (
            <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-yellow-500">
              Kart üretilemedi. OpenAlex geçici olarak yanıt vermiyor olabilir;
              biraz sonra yeniden deneyin.
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={yazar.id}
              src={gorsel}
              alt={`${yazar.ad} akademisyen kartı`}
              onLoad={() => setYuklendi(true)}
              onError={() => setGorselHata(true)}
              className={`w-full h-full object-cover transition-opacity ${
                yuklendi ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>

        {/* Paylaşım */}
        <div className="space-y-5">
          <div>
            <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-3">
              Paylaş
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={indir}
                disabled={!yuklendi || indiriliyor}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-40 text-sm"
              >
                <Download className="w-4 h-4" />
                {indiriliyor ? "İndiriliyor…" : "PNG indir"}
              </button>
              <a
                href={linkedinPaylasUrl(mutlakPaylasim)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--border-strong)] rounded-md hover:border-[var(--accent)] text-[var(--fg)] text-sm transition-colors"
              >
                <Share2 className="w-4 h-4" />
                LinkedIn&apos;de paylaş
              </a>
              <button
                onClick={() => kopyala("baglanti")}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--border-strong)] rounded-md hover:border-[var(--accent)] text-[var(--fg)] text-sm transition-colors"
              >
                {kopya === "baglanti" ? (
                  <Check className="w-4 h-4 text-[var(--accent)]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                Bağlantıyı kopyala
              </button>
            </div>
            <p className="mt-3 text-xs text-[var(--fg-subtle)] leading-relaxed">
              En çok etkileşim için: PNG&apos;yi indirip LinkedIn gönderisine
              görsel olarak ekleyin, aşağıdaki metni yapıştırın. Bağlantı
              paylaşımında kart otomatik önizleme olarak çıkar.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
                Hazır gönderi metni
              </h2>
              <button
                onClick={() => kopyala("metin")}
                className="inline-flex items-center gap-1.5 text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
              >
                {kopya === "metin" ? (
                  <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {kopya === "metin" ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
            <textarea
              readOnly
              value={metin}
              rows={11}
              onFocus={(e) => e.currentTarget.select()}
              className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm leading-relaxed focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <p className="text-xs text-[var(--fg-subtle)]">
            Sayılar yanlış görünüyorsa kaynak OpenAlex kaydıdır:{" "}
            <a
              href={`https://openalex.org/${yazar.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[var(--fg-muted)] hover:text-[var(--accent)]"
            >
              openalex.org/{yazar.id}
              <ExternalLink className="w-3 h-3" />
            </a>
            . ORCID&apos;inizi yayınlarınıza bağlamak sayıları düzeltir.
          </p>
        </div>
      </div>
    </section>
  );
}
