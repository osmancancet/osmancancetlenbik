"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  Copy,
  Download,
  ExternalLink,
  LoaderCircle,
  Quote,
  X,
} from "lucide-react";
import {
  BICIMLER,
  doiAyikla,
  kaynakcaUret,
  kunyeCozumle,
  type Bicim,
  type Kunye,
} from "./formatlar";

/**
 * Kaynakça biçimlendirici.
 *
 * Kullanıcı DOI'leri yapıştırıyor, her biri CrossRef'e sorulup künyesi
 * çekiliyor ve üç ayrı biçimde kaynakça üretiliyor. Elle biçim çevirmek en çok
 * zaman yiyen işlerden biri; künye zaten CrossRef'te dururken kimsenin bunu
 * elle yazması gerekmiyor.
 *
 * CrossRef'in genel API'si anahtar istemiyor ve tarayıcıdan çağrılabiliyor.
 * İstekler sıraya alınıp araya kısa bir bekleme konuyor — toplu sorguda
 * servisi zorlamak istemiyoruz.
 */

type Durum = "bekliyor" | "sorgulanıyor" | "bulundu" | "yok" | "hata";

type Satir = {
  doi: string;
  durum: Durum;
  kunye?: Kunye;
};

const bekle = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ORNEK = `DOI'lerinizi alt alta ya da metnin içinde yapıştırın; hepsi otomatik bulunur.

Örnek:
10.57120/yalvac.1437571
https://doi.org/10.1007/s42488-021-00063-1`;

export function KaynakcaBicimlendiriciClient() {
  const [girdi, setGirdi] = useState("");
  const [satirlar, setSatirlar] = useState<Satir[]>([]);
  const [calisiyor, setCalisiyor] = useState(false);
  const [bicim, setBicim] = useState<Bicim>("apa");
  const [vurgu, setVurgu] = useState(true);
  const [kopyaDurumu, setKopyaDurumu] = useState<"hazır" | "kopyalandı" | "hata">("hazır");

  const bulunanlar = satirlar.filter((s) => s.durum === "bulundu" && s.kunye);
  const bulunamayanlar = satirlar.filter((s) => s.durum === "yok" || s.durum === "hata");

  // Biçim ya da vurgu değişince yeniden istek atılmıyor: künyeler zaten
  // elimizde, yalnızca metin yeniden üretiliyor. Bu yüzden ucuz, her
  // render'da hesaplanabiliyor.
  const kaynakca = kaynakcaUret(
    bulunanlar.map((s) => s.kunye as Kunye),
    bicim,
    vurgu
  );

  const buyukHarfUyarisi = bulunanlar.some((s) => s.kunye?.baslikBuyukHarf);

  async function olustur() {
    const doiler = doiAyikla(girdi);
    if (doiler.length === 0) {
      setSatirlar([]);
      return;
    }
    setCalisiyor(true);
    setKopyaDurumu("hazır");
    setSatirlar(doiler.map((doi) => ({ doi, durum: "bekliyor" as const })));

    for (let i = 0; i < doiler.length; i++) {
      const doi = doiler[i];
      setSatirlar((önceki) =>
        önceki.map((s) => (s.doi === doi ? { ...s, durum: "sorgulanıyor" } : s))
      );
      let sonuc: Partial<Satir>;
      try {
        const yanit = await fetch(
          `https://api.crossref.org/works/${encodeURIComponent(doi)}`,
          { headers: { Accept: "application/json" } }
        );
        if (yanit.status === 404) {
          sonuc = { durum: "yok" };
        } else if (!yanit.ok) {
          sonuc = { durum: "hata" };
        } else {
          sonuc = { durum: "bulundu", kunye: kunyeCozumle(doi, await yanit.json()) };
        }
      } catch {
        sonuc = { durum: "hata" };
      }
      setSatirlar((önceki) =>
        önceki.map((s) => (s.doi === doi ? { ...s, ...sonuc } : s))
      );
      // CrossRef'i yormayalım.
      if (i < doiler.length - 1) await bekle(120);
    }
    setCalisiyor(false);
  }

  async function tumunuKopyala() {
    try {
      await navigator.clipboard.writeText(kaynakca.join("\n\n"));
      setKopyaDurumu("kopyalandı");
      setTimeout(() => setKopyaDurumu("hazır"), 2000);
    } catch {
      // Pano izni yoksa ya da güvensiz bağlamda çalışıyorsa buraya düşer.
      setKopyaDurumu("hata");
      setTimeout(() => setKopyaDurumu("hazır"), 3000);
    }
  }

  function indir() {
    try {
      const ad = BICIMLER.find((b) => b.anahtar === bicim)?.ad ?? bicim;
      const blob = new Blob([kaynakca.join("\n\n")], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kaynakca-${ad.toLowerCase().replace(/\s+/g, "-")}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setKopyaDurumu("hata");
      setTimeout(() => setKopyaDurumu("hazır"), 3000);
    }
  }

  const bitti = satirlar.length > 0 && !calisiyor;

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="doi-listesi"
          className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
        >
          DOI listesi
        </label>
        <textarea
          id="doi-listesi"
          value={girdi}
          onChange={(e) => setGirdi(e.target.value)}
          rows={9}
          placeholder={ORNEK}
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono leading-relaxed focus:outline-none focus:border-[var(--accent)]"
        />
        <p className="mt-2 text-xs text-[var(--fg-subtle)]">
          Yalnızca bulunan DOI numaraları CrossRef&apos;e sorulur; yapıştırdığınız
          metnin geri kalanı tarayıcınızdan çıkmaz.
        </p>
      </div>

      <button
        onClick={olustur}
        disabled={calisiyor || !girdi.trim()}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        {calisiyor ? (
          <LoaderCircle className="w-4 h-4 animate-spin" />
        ) : (
          <Quote className="w-4 h-4" />
        )}
        Kaynakça oluştur
      </button>

      {satirlar.length === 0 && girdi.trim() && !calisiyor && (
        <p className="text-sm text-[var(--fg-muted)] border border-[var(--border-strong)] rounded-md px-4 py-3">
          Metinde DOI bulunamadı. DOI&apos;ler <code>10.</code> ile başlar —
          örneğin <code>10.57120/yalvac.1437571</code>.
        </p>
      )}

      {calisiyor && (
        <p
          className="text-sm text-[var(--fg-muted)]"
          role="status"
          aria-live="polite"
        >
          {satirlar.filter((s) => s.durum !== "bekliyor" && s.durum !== "sorgulanıyor").length}
          {" / "}
          {satirlar.length} künye çekildi…
        </p>
      )}

      {bitti && bulunanlar.length > 0 && (
        <div className="space-y-4">
          {/* Biçim sekmeleri: künyeler elde olduğu için geçiş anında oluyor. */}
          <div
            role="tablist"
            aria-label="Kaynakça biçimi"
            className="flex flex-wrap gap-2"
          >
            {BICIMLER.map((b) => {
              const secili = b.anahtar === bicim;
              return (
                <button
                  key={b.anahtar}
                  role="tab"
                  id={`sekme-${b.anahtar}`}
                  aria-selected={secili}
                  aria-controls="kaynakca-cikti"
                  onClick={() => setBicim(b.anahtar)}
                  className={`px-4 py-2 rounded-md text-sm border transition-colors ${
                    secili
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--fg)]"
                      : "border-[var(--border-strong)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  <span className="font-semibold">{b.ad}</span>
                  <span className="hidden sm:inline text-[var(--fg-subtle)]">
                    {" "}
                    · {b.aciklama}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={tumunuKopyala}
              aria-label="Tüm kaynakçayı panoya kopyala"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--border-strong)] text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors"
            >
              {kopyaDurumu === "kopyalandı" ? (
                <Check className="w-4 h-4 text-[var(--accent)]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {kopyaDurumu === "kopyalandı" ? "Kopyalandı" : "Tümünü kopyala"}
            </button>

            <button
              onClick={indir}
              aria-label="Kaynakçayı metin dosyası olarak indir"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--border-strong)] text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors"
            >
              <Download className="w-4 h-4" />
              .txt indir
            </button>

            <label className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] cursor-pointer">
              <input
                type="checkbox"
                checked={vurgu}
                onChange={(e) => setVurgu(e.target.checked)}
                className="accent-[var(--accent)]"
              />
              İtalik alanları <code className="text-xs">*yıldız*</code> ile işaretle
            </label>
          </div>

          {kopyaDurumu === "hata" && (
            <p className="text-sm text-yellow-500">
              Pano erişimi engellendi. Metni aşağıdan elle seçip kopyalayabilirsiniz.
            </p>
          )}

          <div
            id="kaynakca-cikti"
            role="tabpanel"
            aria-labelledby={`sekme-${bicim}`}
            className="card rounded-lg p-5 space-y-4"
          >
            {kaynakca.map((satir, i) => (
              <p
                key={`${bicim}-${i}`}
                className="text-sm text-[var(--fg)] leading-relaxed break-words ps-6 -indent-6 font-mono"
              >
                {satir}
              </p>
            ))}
          </div>

          {buyukHarfUyarisi && (
            <p className="text-xs text-[var(--fg-subtle)] leading-relaxed">
              Bazı başlıklar CrossRef&apos;te tümü büyük harfle kayıtlı. Kısaltmaları
              bozmamak için olduğu gibi bırakıldı — derginizin istediği düzene göre
              elle küçültün.
            </p>
          )}
        </div>
      )}

      {bulunamayanlar.length > 0 && (
        <div className="border-s-[3px] border-red-400 bg-red-500/10 rounded-e-md px-5 py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
            <div className="min-w-0">
              <p className="text-sm text-[var(--fg)] font-semibold mb-2">
                {bulunamayanlar.length} DOI için künye alınamadı
              </p>
              <ul className="space-y-1.5">
                {bulunamayanlar.map((s) => (
                  <li key={s.doi} className="flex items-start gap-2 text-xs">
                    {s.durum === "yok" ? (
                      <X className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-yellow-500" />
                    )}
                    <a
                      href={`https://doi.org/${s.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[var(--accent)] hover:underline inline-flex items-center gap-1 break-all"
                    >
                      {s.doi}
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <span className="text-[var(--fg-muted)]">
                      {s.durum === "yok"
                        ? "— CrossRef kaydı yok"
                        : "— sorgulanamadı, tekrar deneyin"}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-[var(--fg-muted)] leading-relaxed">
                Kayıt bulunamaması DOI&apos;nin yanlış yazıldığı ya da yayıncının
                CrossRef&apos;e kayıt yapmadığı anlamına gelebilir. Bu kaynakları
                elle yazmanız gerekiyor.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
