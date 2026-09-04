"use client";

import { useMemo, useRef, useState } from "react";
import { Check, Copy, Download, ListOrdered, Trash2 } from "lucide-react";
import {
  TURLER,
  grupla,
  listeUret,
  satirlariAyristir,
  type Numaralandirma,
  type Tur,
  type Yayin,
} from "./duzenle";

/**
 * Yayın listesi düzenleyici arayüzü.
 *
 * İki adımlı: önce yapıştırılan metin satırlara ayrılıp tür/yıl tahmin
 * ediliyor, sonra kullanıcı yanlış tahminleri düzeltiyor. Ayrıştırma her tuş
 * vuruşunda değil, düğmeyle yapılıyor — aksi hâlde kullanıcının elle
 * düzelttiği türler her yazışta silinirdi.
 *
 * Metin hiçbir yere gönderilmiyor; hepsi tarayıcıda.
 */

const ORNEK = `Çetlenbik, O. C., Süzen, A. A., Duman, B. (2024). IoT Security and Software Testing. Yalvaç Akademi Dergisi, 9(1), 26-32. https://doi.org/10.57120/yalvac.1437571
Çetlenbik, O. C. (2022). Siber güvenlikte yapay zekâ. 5. Uluslararası Bilgisayar Bilimleri Kongresi, Ankara, s. 112-118.
Çetlenbik, O. C. (2021). Ağ güvenliği. In: Siber Güvenlik El Kitabı, Nobel Yayınları, ss. 45-70.
Çetlenbik, O. C. (2019). Endüstriyel Kontrol Sistemleri Güvenliği. Seçkin Yayıncılık. ISBN 978-975-02-5555-1
Çetlenbik, O. C. (2020). SCADA sistemlerinde saldırı tespiti. Yüksek lisans tezi, Isparta Uygulamalı Bilimler Üniversitesi.`;

export function YayinListesiClient() {
  const [girdi, setGirdi] = useState("");
  const [yayinlar, setYayinlar] = useState<Yayin[]>([]);
  const [bicim, setBicim] = useState<Numaralandirma>("grupIci");
  const [kopyaDurumu, setKopyaDurumu] = useState<"hazır" | "kopyalandı" | "hata">(
    "hazır"
  );
  const ciktiRef = useRef<HTMLTextAreaElement>(null);

  const gruplar = useMemo(() => grupla(yayinlar), [yayinlar]);
  const cikti = useMemo(() => listeUret(gruplar, bicim), [gruplar, bicim]);
  const yilsiz = yayinlar.filter((y) => y.yil === undefined).length;

  function olustur() {
    setYayinlar(satirlariAyristir(girdi));
  }

  function turDegistir(id: string, tur: Tur) {
    setYayinlar((önceki) =>
      önceki.map((y) => (y.id === id ? { ...y, tur, elle: true } : y))
    );
  }

  function yilDegistir(id: string, ham: string) {
    const yil = /^\d{4}$/.test(ham) ? Number(ham) : undefined;
    setYayinlar((önceki) =>
      önceki.map((y) => (y.id === id ? { ...y, yil } : y))
    );
  }

  function sil(id: string) {
    setYayinlar((önceki) => önceki.filter((y) => y.id !== id));
  }

  async function kopyala() {
    if (!cikti) return;
    try {
      await navigator.clipboard.writeText(cikti);
      setKopyaDurumu("kopyalandı");
    } catch {
      // Pano izni yoksa metni seçip kullanıcıya Ctrl+C bırakıyoruz.
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
    if (!cikti) return;
    const blob = new Blob([cikti + "\n"], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yayin-listesi.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      {/* 1 — Giriş */}
      <section className="space-y-3">
        <label
          htmlFor="yayin-metni"
          className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)]"
        >
          Yayınlarınız — her satıra bir yayın
        </label>
        <textarea
          id="yayin-metni"
          value={girdi}
          onChange={(e) => setGirdi(e.target.value)}
          rows={8}
          placeholder={`Yayınlarınızı olduğu gibi yapıştırın, her satıra bir tane.\n\nÖrnek:\n${ORNEK}`}
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm leading-relaxed focus:outline-none focus:border-[var(--accent)]"
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={olustur}
            disabled={!girdi.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <ListOrdered className="w-4 h-4" />
            Listeyi oluştur
          </button>
          <button
            onClick={() => setGirdi(ORNEK)}
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Örnek doldur
          </button>
        </div>
        {yayinlar.length > 0 && (
          <p className="text-xs text-[var(--fg-subtle)]">
            Listeyi yeniden oluşturduğunuzda elle yaptığınız tür düzeltmeleri
            sıfırlanır.
          </p>
        )}
      </section>

      {/* 2 — Düzeltme */}
      {yayinlar.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
            Tür ve yıl — tahminleri gözden geçirin
          </h2>
          <p className="text-sm text-[var(--fg-muted)]">
            Tür, satırdaki anahtar kelimelerden tahmin edildi. Yanlış olanları
            açılır menüden düzeltin.
            {yilsiz > 0 && (
              <>
                {" "}
                <strong className="text-yellow-500">
                  {yilsiz} satırda yıl bulunamadı
                </strong>{" "}
                — yılı olmayan yayınlar grubun sonuna konur.
              </>
            )}
          </p>

          <ul className="space-y-2">
            {yayinlar.map((y, i) => (
              <li key={y.id} className="card rounded-lg px-4 py-3">
                <p className="text-sm text-[var(--fg)] leading-snug">{y.metin}</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={`tur-${y.id}`}
                      className="text-xs text-[var(--fg-subtle)]"
                    >
                      Tür
                    </label>
                    <select
                      id={`tur-${y.id}`}
                      value={y.tur}
                      onChange={(e) => turDegistir(y.id, e.target.value as Tur)}
                      className="px-2 py-1 text-sm rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                    >
                      {TURLER.map((t) => (
                        <option key={t.anahtar} value={t.anahtar}>
                          {t.tekil}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={`yil-${y.id}`}
                      className="text-xs text-[var(--fg-subtle)]"
                    >
                      Yıl
                    </label>
                    <input
                      id={`yil-${y.id}`}
                      type="text"
                      inputMode="numeric"
                      defaultValue={y.yil !== undefined ? String(y.yil) : ""}
                      onChange={(e) => yilDegistir(y.id, e.target.value.trim())}
                      placeholder="—"
                      className={`w-20 px-2 py-1 text-sm rounded-md bg-[var(--bg-card)] border text-[var(--fg)] focus:outline-none focus:border-[var(--accent)] ${
                        y.yil === undefined
                          ? "border-yellow-500"
                          : "border-[var(--border-strong)]"
                      }`}
                    />
                  </div>

                  {!y.elle && (
                    <span className="text-[11px] uppercase tracking-wider text-[var(--fg-subtle)]">
                      tahmin
                    </span>
                  )}

                  <button
                    onClick={() => sil(y.id)}
                    aria-label={`${i + 1}. yayını listeden çıkar`}
                    className="ms-auto text-[var(--fg-subtle)] hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 3 — Çıktı */}
      {gruplar.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
            Numaralandırma
          </h2>
          <fieldset className="flex flex-wrap gap-4">
            <legend className="sr-only">Numaralandırma biçimi</legend>
            {(
              [
                {
                  deger: "grupIci" as Numaralandirma,
                  ad: "Grup içi (A1, A2 / B1, B2)",
                  ipucu: "Akademik başvuru dosyalarında yaygın",
                },
                {
                  deger: "surekli" as Numaralandirma,
                  ad: "Sürekli (1, 2, 3…)",
                  ipucu: "Tüm liste tek sayaçla numaralanır",
                },
              ]
            ).map((secenek) => (
              <div key={secenek.deger} className="flex items-start gap-2">
                <input
                  type="radio"
                  id={`bicim-${secenek.deger}`}
                  name="numaralandirma"
                  checked={bicim === secenek.deger}
                  onChange={() => setBicim(secenek.deger)}
                  className="mt-0.5 w-4 h-4 shrink-0 accent-[var(--accent)]"
                />
                <label
                  htmlFor={`bicim-${secenek.deger}`}
                  className="text-sm text-[var(--fg)] leading-snug cursor-pointer"
                >
                  {secenek.ad}
                  <span className="block text-xs text-[var(--fg-subtle)] mt-0.5">
                    {secenek.ipucu}
                  </span>
                </label>
              </div>
            ))}
          </fieldset>

          <div className="flex items-center justify-between pt-2">
            <label
              htmlFor="liste-cikti"
              className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]"
            >
              Liste
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={kopyala}
                aria-label="Yayın listesini kopyala"
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
                aria-label="Yayın listesini metin dosyası olarak indir"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-[var(--border-strong)] text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                .txt indir
              </button>
            </div>
          </div>

          <textarea
            id="liste-cikti"
            ref={ciktiRef}
            value={cikti}
            readOnly
            rows={Math.min(28, cikti.split("\n").length + 1)}
            className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border)] text-[var(--fg)] text-sm leading-relaxed focus:outline-none focus:border-[var(--accent)]"
          />
        </section>
      )}
    </div>
  );
}
