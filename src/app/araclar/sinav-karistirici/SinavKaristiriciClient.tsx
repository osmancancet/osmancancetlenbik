"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  Copy,
  Download,
  RefreshCw,
  Shuffle,
} from "lucide-react";
import {
  ayristir,
  cevapAnahtari,
  formlariUret,
  formMetni,
  SIK_HARFLERI,
  tumCikti,
} from "./karistir";

/**
 * Sınav karıştırıcı arayüzü.
 *
 * İki şey görünür olmak zorunda: tohum ve cevap anahtarı. Tohum görünür,
 * çünkü sınav yeniden basılmak istendiğinde tek referans o. Cevap anahtarı
 * form form ayrı, çünkü karıştırıldıktan sonra formlar arasında ortak bir
 * anahtar yok — bu, aracın en kolay hata yapılan yeri.
 */

const ORNEK = `1. Python'da liste hangi parantezle tanımlanır?
a) ( )
*b) [ ]
c) { }

2. HTTP'de "404" hangi durumu belirtir?
a) Sunucu hatası
*b) Kaynak bulunamadı
c) Yetkisiz erişim
d) Yönlendirme

S3. Aşağıdakilerden hangisi bir sürüm kontrol sistemidir?
A. Docker
B. Nginx
*C. Git
D. Redis`;

/** Rastgele, okunabilir bir tohum üret — kullanıcı elle de yazabilir. */
function yeniTohum(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function SinavKaristiriciClient() {
  const [metin, setMetin] = useState("");
  const [formSayisi, setFormSayisi] = useState(2);
  const [tohum, setTohum] = useState("SINAV1");
  const [kopyalanan, setKopyalanan] = useState<string | null>(null);

  const cozum = useMemo(
    () => (metin.trim() ? ayristir(metin) : null),
    [metin]
  );

  const formlar = useMemo(
    () =>
      cozum && cozum.basarili
        ? formlariUret(cozum.sorular, formSayisi, tohum)
        : [],
    [cozum, formSayisi, tohum]
  );

  async function kopyala(anahtar: string, icerik: string) {
    try {
      await navigator.clipboard.writeText(icerik);
      setKopyalanan(anahtar);
      // Geri bildirim kalıcı olmasın; iki saniye sonra eski haline dönsün.
      window.setTimeout(() => setKopyalanan(null), 2000);
    } catch {
      // Pano izni yoksa sessizce geçiyoruz — metin zaten ekranda seçilebilir.
      setKopyalanan(null);
    }
  }

  function txtIndir() {
    if (formlar.length === 0) return;
    const blob = new Blob([tumCikti(formlar, tohum)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sinav-formlari-${tohum}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      {/* 1 — Soru metni */}
      <section className="space-y-2">
        <label
          htmlFor="sorular"
          className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)]"
        >
          Sorular
        </label>
        <textarea
          id="sorular"
          value={metin}
          onChange={(e) => setMetin(e.target.value)}
          rows={12}
          placeholder={ORNEK}
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono leading-relaxed focus:outline-none focus:border-[var(--accent)]"
        />
        <div className="flex items-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => setMetin(ORNEK)}
            className="text-xs text-[var(--accent)] hover:underline"
          >
            Örnek soruları doldur
          </button>
          <p className="text-xs text-[var(--fg-subtle)]">
            Doğru şıkkın başına yıldız koyun:{" "}
            <code className="text-[var(--fg-muted)]">*b) [ ]</code>
          </p>
        </div>

        <details className="text-xs text-[var(--fg-subtle)]">
          <summary className="cursor-pointer hover:text-[var(--accent)] transition-colors">
            Kabul edilen biçim
          </summary>
          <div className="mt-2 space-y-1 leading-relaxed">
            <p>
              Soru satırı: <code>1.</code>, <code>1)</code>, <code>S1.</code>{" "}
              ya da <code>Soru 1:</code>
            </p>
            <p>
              Şık satırı: <code>a)</code>, <code>A)</code>, <code>a.</code> ya
              da <code>a -</code>
            </p>
            <p>
              Doğru şık: harfin önüne yıldız — <code>*b)</code>
            </p>
            <p>
              Sorular arasında boş satır bırakmak şart değil; satırı taşan soru
              metinleri bir sonraki satırdan devam edebilir.
            </p>
          </div>
        </details>
      </section>

      {/* Ayrıştırma hatası — sessizce yanlış sonuç üretmiyoruz. */}
      {cozum && !cozum.basarili && (
        <div className="border-s-[3px] border-red-400 bg-red-500/10 rounded-e-md px-5 py-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
            <strong className="text-[var(--fg)]">
              {cozum.hata.satir}. satırda takıldı.
            </strong>{" "}
            {cozum.hata.mesaj}
          </p>
        </div>
      )}

      {/* 2 — Ayarlar */}
      {cozum && cozum.basarili && (
        <section className="card rounded-lg p-4 space-y-4">
          <p className="text-sm text-[var(--fg-muted)]">
            <strong className="text-[var(--fg)]">
              {cozum.sorular.length} soru
            </strong>{" "}
            okundu.
          </p>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label
                htmlFor="form-sayisi"
                className="block text-xs text-[var(--fg-subtle)] mb-1.5"
              >
                Form sayısı
              </label>
              <input
                id="form-sayisi"
                type="number"
                min={1}
                max={8}
                value={formSayisi}
                onChange={(e) =>
                  setFormSayisi(
                    Math.min(8, Math.max(1, Number(e.target.value) || 1))
                  )
                }
                className="w-24 px-3 py-2 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm tabular-nums focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div className="flex-1 min-w-48">
              <label
                htmlFor="tohum"
                className="block text-xs text-[var(--fg-subtle)] mb-1.5"
              >
                Tohum
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="tohum"
                  value={tohum}
                  onChange={(e) => setTohum(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono focus:outline-none focus:border-[var(--accent)]"
                />
                <button
                  type="button"
                  onClick={() => setTohum(yeniTohum())}
                  aria-label="Yeni tohum üret"
                  className="p-2 rounded-md border border-[var(--border-strong)] text-[var(--fg-subtle)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-[var(--fg-subtle)] leading-relaxed">
            Karıştırma bu tohuma bağlı. Aynı tohum ve aynı soru metniyle
            formlar birebir aynı çıkar — sınavı yeniden basmanız gerekirse
            tohumu saklamanız yeter. Tohumu değiştirin, sıralama tamamen
            değişir.
          </p>
        </section>
      )}

      {/* 3 — Cevap anahtarları */}
      {formlar.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
              Cevap anahtarları
            </h2>
            <button
              type="button"
              onClick={() =>
                kopyala("anahtar", formlar.map(cevapAnahtari).join("\n"))
              }
              className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline"
            >
              {kopyalanan === "anahtar" ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {kopyalanan === "anahtar" ? "Kopyalandı" : "Hepsini kopyala"}
            </button>
          </div>
          <ul className="card rounded-lg p-4 space-y-1.5">
            {formlar.map((f) => (
              <li
                key={f.etiket}
                className="text-sm font-mono text-[var(--fg-muted)] break-words"
              >
                {cevapAnahtari(f)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 4 — Formlar */}
      {formlar.map((f) => (
        <section key={f.etiket} className="space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-sm font-semibold text-[var(--fg)]">
              Form {f.etiket}
              <span className="ms-2 text-xs font-normal text-[var(--fg-subtle)]">
                {f.sorular.length} soru
              </span>
            </h2>
            <button
              type="button"
              onClick={() => kopyala(f.etiket, formMetni(f))}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline"
            >
              {kopyalanan === f.etiket ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {kopyalanan === f.etiket ? "Kopyalandı" : "Formu kopyala"}
            </button>
          </div>

          <ol className="card rounded-lg p-5 space-y-4">
            {f.sorular.map((s, i) => (
              <li key={`${f.etiket}-${i}`} className="text-sm">
                <p className="text-[var(--fg)] leading-relaxed">
                  {i + 1}. {s.govde}
                </p>
                <ul className="mt-1.5 space-y-0.5 ps-4">
                  {s.siklar.map((sik, j) => (
                    <li
                      key={`${f.etiket}-${i}-${j}`}
                      className="text-[var(--fg-muted)] leading-relaxed"
                    >
                      <span className="font-mono text-[var(--fg-subtle)]">
                        {SIK_HARFLERI[j]})
                      </span>{" "}
                      {sik}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      ))}

      {/* 5 — İndirme */}
      {formlar.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={txtIndir}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" />
            Tüm formları .txt indir
          </button>
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--fg-subtle)]">
            <Shuffle className="w-3.5 h-3.5" />
            Dosyada formlar, cevap anahtarları ve tohum birlikte yer alır.
          </span>
        </div>
      )}
    </div>
  );
}
