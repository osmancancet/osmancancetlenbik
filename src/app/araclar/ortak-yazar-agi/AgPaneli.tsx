"use client";

import { useEffect, useState } from "react";
import { AtSign, Check, Copy, Download, ExternalLink, Share2 } from "lucide-react";
import type { AgVerisi, YazarAdayi } from "@/lib/openalex";
import {
  ETIKET_SAYISI,
  agGorselYolu,
  agPaylasimYolu,
  gonderiMetni,
  ilkYorumMetni,
  linkedinPaylasUrl,
} from "./paylasim";

/**
 * Seçilen yazarın ağ görseli + paylaşım.
 *
 * Aracın yayılma mekanizması etiketleme: gönderide teşekkür edilen ortak
 * yazarlar etiketlenince bildirim alıyor, kendi ağını merak edip araca
 * geliyor. Bu yüzden ortak yazar listesi ve etiketleme ipucu görselin
 * hemen yanında.
 */

type Kopya = "metin" | "yorum" | `ad-${number}`;

function KopyaDugmesi({
  aktif,
  onClick,
  children,
}: {
  aktif: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
    >
      {aktif ? (
        <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
      {aktif ? "Kopyalandı" : children}
    </button>
  );
}

export function AgPaneli({ yazar }: { yazar: YazarAdayi }) {
  const [yuklendi, setYuklendi] = useState(false);
  const [gorselHata, setGorselHata] = useState(false);
  const [veri, setVeri] = useState<AgVerisi | null>(null);
  const [kopya, setKopya] = useState<Kopya | null>(null);
  const [indiriliyor, setIndiriliyor] = useState(false);

  const gorsel = agGorselYolu(yazar.id);
  const mutlakPaylasim =
    typeof window === "undefined"
      ? agPaylasimYolu(yazar.id)
      : window.location.origin + agPaylasimYolu(yazar.id);

  useEffect(() => {
    setYuklendi(false);
    setGorselHata(false);
    setVeri(null);
    let iptal = false;
    fetch(`/api/ortak-yazar-agi/veri?id=${encodeURIComponent(yazar.id)}`)
      .then((r) => (r.ok ? (r.json() as Promise<AgVerisi>) : null))
      .then((v) => {
        if (!iptal) setVeri(v);
      })
      .catch(() => {
        // Liste gelmezse görsel ve bağlantı paylaşımı yine çalışıyor.
      });
    return () => {
      iptal = true;
    };
  }, [yazar.id]);

  async function kopyala(ne: Kopya, metin: string) {
    try {
      await navigator.clipboard.writeText(metin);
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
      a.download = `ortak-yazar-agi-${yazar.ad
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIndiriliyor(false);
    }
  }

  const metin = veri ? gonderiMetni(veri) : "";
  const yorum = ilkYorumMetni(mutlakPaylasim);
  const etiketlenecek = veri?.ortakYazarlar.slice(0, 12) ?? [];

  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* Görsel */}
        <div className="relative rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] overflow-hidden aspect-[4/5]">
          {!yuklendi && !gorselHata && (
            <div className="absolute inset-0 grid place-items-center text-sm text-[var(--fg-muted)]">
              Ağ çiziliyor…
            </div>
          )}
          {gorselHata ? (
            <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-yellow-500">
              Ağ üretilemedi. OpenAlex geçici olarak yanıt vermiyor olabilir;
              biraz sonra yeniden deneyin.
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={yazar.id}
              src={gorsel}
              alt={`${yazar.ad} ortak yazar ağı`}
              onLoad={() => setYuklendi(true)}
              onError={() => setGorselHata(true)}
              className={`w-full h-full object-cover transition-opacity ${
                yuklendi ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>

        {/* Paylaşım */}
        <div className="space-y-6">
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
            </div>
            <ol className="mt-4 space-y-1.5 text-xs text-[var(--fg-muted)] leading-relaxed list-decimal list-inside">
              <li>PNG&apos;yi indirip LinkedIn gönderisine görsel olarak ekleyin.</li>
              <li>Aşağıdaki gönderi metnini yapıştırın, ortak yazarlarınızı etiketleyin.</li>
              <li>
                Bağlantıyı gönderiye değil <strong>ilk yoruma</strong> yazın —
                LinkedIn bağlantılı gönderilerin erişimini düşürüyor.
              </li>
            </ol>
          </div>

          {etiketlenecek.length > 0 && (
            <div>
              <h2 className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2">
                <AtSign className="w-3.5 h-3.5" />
                Etiketleyin
              </h2>
              <p className="text-xs text-[var(--fg-subtle)] mb-3 leading-relaxed">
                Gönderide adın başına <code>@</code> yazıp LinkedIn&apos;in önerdiği
                profili seçin. Etiketlenen herkes bildirim alır; ağınız da görür.
                İlk {ETIKET_SAYISI} isim gönderi metninde hazır.
              </p>
              <div className="flex flex-wrap gap-2">
                {etiketlenecek.map((o, i) => (
                  <button
                    key={o.ad}
                    onClick={() => kopyala(`ad-${i}`, o.ad)}
                    title={[o.kurum, o.ilkYil ? `ilk ortak yayın ${o.ilkYil}` : null]
                      .filter(Boolean)
                      .join(" · ")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-colors ${
                      i < ETIKET_SAYISI
                        ? "border-[var(--accent)]/50 bg-[var(--accent-soft)] text-[var(--fg)]"
                        : "border-[var(--border-strong)] text-[var(--fg-muted)]"
                    } hover:border-[var(--accent)]`}
                  >
                    {kopya === `ad-${i}` ? (
                      <Check className="w-3 h-3 text-[var(--accent)]" />
                    ) : (
                      <span className="text-[var(--fg-subtle)]">@</span>
                    )}
                    {o.ad}
                    <span className="text-[var(--fg-subtle)]">{o.sayi}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
                Gönderi metni
              </h2>
              <KopyaDugmesi aktif={kopya === "metin"} onClick={() => kopyala("metin", metin)}>
                Kopyala
              </KopyaDugmesi>
            </div>
            <textarea
              readOnly
              value={veri ? metin : "Hazırlanıyor…"}
              rows={11}
              onFocus={(e) => e.currentTarget.select()}
              className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm leading-relaxed focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
                İlk yorum
              </h2>
              <KopyaDugmesi aktif={kopya === "yorum"} onClick={() => kopyala("yorum", yorum)}>
                Kopyala
              </KopyaDugmesi>
            </div>
            <textarea
              readOnly
              value={yorum}
              rows={3}
              onFocus={(e) => e.currentTarget.select()}
              className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm leading-relaxed focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <p className="text-xs text-[var(--fg-subtle)] leading-relaxed">
            Aynı kişinin farklı yazılışları tek kişi sayılır; 25&apos;ten kalabalık
            yazarlı eserler ağa katılmaz.
            {veri?.kismi ? " Çok yayınınız olduğu için en güncel 200 yayın esas alındı." : ""}{" "}
            Eksik ya da hatalı görünüyorsa kaynak OpenAlex kaydıdır:{" "}
            <a
              href={`https://openalex.org/${yazar.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[var(--fg-muted)] hover:text-[var(--accent)]"
            >
              openalex.org/{yazar.id}
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
