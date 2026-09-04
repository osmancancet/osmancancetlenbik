"use client";

import { useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Braces,
  Check,
  Copy,
  Download,
  LoaderCircle,
  X,
} from "lucide-react";
import {
  baslikTumuBuyuk,
  bibDosyasiUret,
  doileriAyikla,
  kunyeCozumle,
  type BibKunye,
} from "./bibtex";

/**
 * BibTeX üretici arayüzü.
 *
 * Metin hiçbir yere gönderilmiyor; yalnızca içinden ayıklanan DOI numaraları
 * CrossRef'e soruluyor. İstekler sırayla ve aralarında kısa bir beklemeyle
 * gidiyor — toplu sorguda genel API'yi zorlamak istemiyoruz.
 *
 * Kayıtlar tek tek değil, sorgular bittikten sonra topluca üretiliyor: anahtar
 * çakışmasını (aynı yazar + yıl + ilk kelime) ancak bütün liste elde olunca
 * çözebiliyoruz.
 */

type Durum = "bekliyor" | "sorgulanıyor" | "bulundu" | "yok" | "hata";

type Satir = {
  doi: string;
  durum: Durum;
  kunye?: BibKunye;
};

const bekle = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ORNEK = `Çetlenbik, O. C., Süzen, A. A., Duman, B. (2024). IoT Security and Software Testing. Yalvaç Akademi Dergisi, 9(1), 26-32. https://doi.org/10.57120/yalvac.1437571
Vaswani, A. ve diğerleri (2017). Attention is all you need. doi:10.48550/arXiv.1706.03762`;

export function BibtexUreticiClient() {
  const [girdi, setGirdi] = useState("");
  const [satirlar, setSatirlar] = useState<Satir[]>([]);
  const [calisiyor, setCalisiyor] = useState(false);
  const [kopyaDurumu, setKopyaDurumu] = useState<"hazır" | "kopyalandı" | "hata">(
    "hazır"
  );
  const ciktiRef = useRef<HTMLTextAreaElement>(null);

  // Bulunan künyeler değiştikçe .bib metnini yeniden üret; anahtarlar tüm
  // listeye bağlı olduğu için kısmi üretim yapılmıyor.
  const { metin: bib, anahtarlar } = useMemo(() => {
    const kunyeler = satirlar
      .map((s) => s.kunye)
      .filter((k): k is BibKunye => Boolean(k));
    return bibDosyasiUret(kunyeler);
  }, [satirlar]);

  const bulunanlar = satirlar.filter((s) => s.kunye);
  const bulunamayanlar = satirlar.filter((s) => s.durum === "yok");
  const hatalilar = satirlar.filter((s) => s.durum === "hata");
  const buyukHarfliler = bulunanlar.filter(
    (s) => s.kunye?.baslik && baslikTumuBuyuk(s.kunye.baslik)
  );

  async function uret() {
    const doiler = doileriAyikla(girdi);
    if (doiler.length === 0) {
      setSatirlar([]);
      return;
    }
    setCalisiyor(true);
    setSatirlar(doiler.map((doi) => ({ doi, durum: "bekliyor" as Durum })));

    for (let i = 0; i < doiler.length; i++) {
      const doi = doiler[i];
      setSatirlar((önceki) =>
        önceki.map((s) => (s.doi === doi ? { ...s, durum: "sorgulanıyor" } : s))
      );
      let yama: Partial<Satir>;
      try {
        const yanit = await fetch(
          `https://api.crossref.org/works/${encodeURIComponent(doi)}`,
          { headers: { Accept: "application/json" } }
        );
        if (yanit.status === 404) {
          yama = { durum: "yok" };
        } else if (!yanit.ok) {
          yama = { durum: "hata" };
        } else {
          yama = { durum: "bulundu", kunye: kunyeCozumle(doi, await yanit.json()) };
        }
      } catch {
        yama = { durum: "hata" };
      }
      setSatirlar((önceki) =>
        önceki.map((s) => (s.doi === doi ? { ...s, ...yama } : s))
      );
      // CrossRef'i yormayalım.
      if (i < doiler.length - 1) await bekle(120);
    }
    setCalisiyor(false);
  }

  async function kopyala() {
    if (!bib) return;
    try {
      await navigator.clipboard.writeText(bib);
      setKopyaDurumu("kopyalandı");
    } catch {
      // Pano izni yoksa ya da güvensiz bağlamda çalışıyorsa metni seçip
      // kullanıcıya Ctrl+C bırakmaktan başka çare yok.
      setKopyaDurumu("hata");
      const alan = ciktiRef.current;
      if (alan) {
        alan.focus();
        alan.select();
      }
    }
    window.setTimeout(() => setKopyaDurumu("hazır"), 2500);
  }

  function indir() {
    if (!bib) return;
    const blob = new Blob([bib + "\n"], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kaynaklar.bib";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="doi-metni"
          className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
        >
          DOI listesi ya da kaynakça
        </label>
        <textarea
          id="doi-metni"
          value={girdi}
          onChange={(e) => setGirdi(e.target.value)}
          rows={8}
          placeholder={`DOI'leri ya da kaynakçanızı olduğu gibi yapıştırın.\n\nÖrnek:\n${ORNEK}`}
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono leading-relaxed focus:outline-none focus:border-[var(--accent)]"
        />
        <p className="mt-2 text-xs text-[var(--fg-subtle)]">
          Metniniz hiçbir yere gönderilmiyor. Yalnızca bulunan DOI numaraları
          CrossRef&apos;e sorulur.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={uret}
          disabled={calisiyor || !girdi.trim()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {calisiyor ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
          ) : (
            <Braces className="w-4 h-4" />
          )}
          BibTeX üret
        </button>
        <button
          onClick={() => setGirdi(ORNEK)}
          className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
        >
          Örnek doldur
        </button>
        {satirlar.length > 0 && (
          <span className="text-xs text-[var(--fg-subtle)]">
            {bulunanlar.length} / {satirlar.length} künye bulundu
          </span>
        )}
      </div>

      {satirlar.length === 0 && girdi.trim() && !calisiyor && (
        <p className="text-sm text-[var(--fg-muted)] border border-[var(--border-strong)] rounded-md px-4 py-3">
          Metinde DOI bulunamadı. DOI&apos;ler <code>10.</code> ile başlar —
          yayınınızın DOI&apos;si yoksa bu araç künye çekemez.
        </p>
      )}

      {/* Sorgu durumu */}
      {satirlar.length > 0 && (
        <ul className="space-y-1.5">
          {satirlar.map((s, i) => (
            <li
              key={s.doi}
              className="card rounded-lg px-4 py-2.5 flex items-start gap-3"
            >
              <span className="mt-0.5 shrink-0">
                {s.durum === "bulundu" && (
                  <Check className="w-4 h-4 text-[var(--accent)]" />
                )}
                {s.durum === "yok" && <X className="w-4 h-4 text-red-400" />}
                {s.durum === "hata" && (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                )}
                {(s.durum === "bekliyor" || s.durum === "sorgulanıyor") && (
                  <LoaderCircle
                    className={`w-4 h-4 text-[var(--fg-subtle)] ${
                      s.durum === "sorgulanıyor" ? "animate-spin" : "opacity-40"
                    }`}
                  />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-xs text-[var(--fg-muted)] break-all">
                  {s.doi}
                </span>
                {s.kunye && (
                  <div className="mt-1 text-sm text-[var(--fg)] leading-snug">
                    {s.kunye.baslik}
                    <div className="text-xs text-[var(--fg-subtle)] mt-0.5 font-mono">
                      {anahtarlar[bulunanlar.findIndex((b) => b.doi === s.doi)] ??
                        ""}
                    </div>
                  </div>
                )}
                {s.durum === "yok" && (
                  <div className="mt-0.5 text-sm text-red-400">
                    CrossRef kaydı yok
                  </div>
                )}
                {s.durum === "hata" && (
                  <div className="mt-0.5 text-sm text-yellow-500">
                    Sorgulanamadı — bağlantı sorunu olabilir
                  </div>
                )}
              </div>
              <span className="sr-only">{i + 1}. kaynak</span>
            </li>
          ))}
        </ul>
      )}

      {(bulunamayanlar.length > 0 || hatalilar.length > 0) && !calisiyor && (
        <div className="border-s-[3px] border-red-400 bg-red-500/10 rounded-e-md px-5 py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
            <div className="text-sm text-[var(--fg-muted)] leading-relaxed">
              <strong className="text-[var(--fg)]">
                {bulunamayanlar.length + hatalilar.length} DOI için künye
                alınamadı.
              </strong>{" "}
              Bu kayıtlar <code>.bib</code> dosyasına eklenmedi; elle
              yazmanız gerekiyor.
              <ul className="mt-2 space-y-1 font-mono text-xs">
                {[...bulunamayanlar, ...hatalilar].map((s) => (
                  <li key={s.doi} className="break-all">
                    {s.doi}{" "}
                    <span className="text-[var(--fg-subtle)]">
                      ({s.durum === "yok" ? "kayıt yok" : "sorgulanamadı"})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {buyukHarfliler.length > 0 && (
        <div className="border-s-[3px] border-yellow-500 bg-yellow-500/10 rounded-e-md px-5 py-4">
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
            <strong className="text-[var(--fg)]">
              {buyukHarfliler.length} kaydın başlığı CrossRef&apos;te tümü büyük
              harfle duruyor.
            </strong>{" "}
            Başlık, olduğu gibi kalsın diye tek parantezle korundu; yayına
            göndermeden önce büyük/küçük harfi elle düzeltin.
          </p>
        </div>
      )}

      {/* Çıktı */}
      {bib && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="bib-cikti"
              className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]"
            >
              kaynaklar.bib
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={kopyala}
                aria-label="BibTeX kayıtlarını kopyala"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-[var(--border-strong)] text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              >
                {kopyaDurumu === "kopyalandı" ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {kopyaDurumu === "kopyalandı"
                  ? "Kopyalandı"
                  : kopyaDurumu === "hata"
                    ? "Metni seçin"
                    : "Kopyala"}
              </button>
              <button
                onClick={indir}
                aria-label="BibTeX dosyasını indir"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-[var(--border-strong)] text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                .bib indir
              </button>
            </div>
          </div>
          <textarea
            id="bib-cikti"
            ref={ciktiRef}
            value={bib}
            readOnly
            rows={Math.min(24, bib.split("\n").length + 1)}
            className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border)] text-[var(--fg)] text-sm font-mono leading-relaxed focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      )}
    </div>
  );
}
