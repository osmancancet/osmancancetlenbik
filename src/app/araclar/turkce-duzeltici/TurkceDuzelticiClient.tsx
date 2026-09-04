"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  FileText,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { onar, type OnarimSonucu } from "./onarim";

/**
 * Türkçe karakter düzeltici.
 *
 * Dışa aktarılan CSV, rapor ve eski veri dosyalarında Türkçe harfler sık sık
 * "GÃ¶sterimler" gibi çıkıyor. Onarım tamamen tarayıcıda yapılıyor — dosya
 * hiçbir sunucuya gitmiyor, bu yüzden öğrenci ve katılımcı verisi içeren
 * dosyalarda da kullanılabiliyor.
 */

const ORNEK = `GÃ¶sterimler
KullanÄ±cÄ± tarafÄ±ndan seÃ§ilen
BaÅlatÄ±lmadÄ±
Ã–nemli sorunlar`;

/**
 * Dosyayı metne çevirir.
 *
 * Önce UTF-8 deneniyor; dosya gerçekten UTF-8 ise bozuk görünen harfler
 * metnin içinde olduğu gibi gelir ve onarım onları düzeltir. Dosya UTF-8
 * değilse (eski Excel çıktıları çoğu zaman değil) çözme hata veriyor;
 * o durumda Windows-1252 varsayıyoruz — bu okuma da bozuk görünse bile
 * onarım aşaması yaygın bozulmaları yakalıyor.
 */
async function dosyaMetni(dosya: File): Promise<string> {
  const tampon = new Uint8Array(await dosya.arrayBuffer());
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(tampon);
  } catch {
    return new TextDecoder("windows-1252").decode(tampon);
  }
}

export function TurkceDuzelticiClient() {
  const [girdi, setGirdi] = useState("");
  const [sonuc, setSonuc] = useState<OnarimSonucu | null>(null);
  const [dosyaAdi, setDosyaAdi] = useState<string | null>(null);
  const [kopyaDurumu, setKopyaDurumu] = useState<"hazır" | "kopyalandı" | "hata">("hazır");
  const dosyaGirisi = useRef<HTMLInputElement>(null);

  function duzelt(metin = girdi) {
    setKopyaDurumu("hazır");
    setSonuc(onar(metin));
  }

  async function dosyaSecildi(e: React.ChangeEvent<HTMLInputElement>) {
    const dosya = e.target.files?.[0];
    if (!dosya) return;
    const metin = await dosyaMetni(dosya);
    setDosyaAdi(dosya.name);
    setGirdi(metin);
    // Dosya yüklendiği anda onarımı çalıştırmak bir tıkı azaltıyor.
    duzelt(metin);
    // Aynı dosya yeniden seçilebilsin diye girişi sıfırla.
    e.target.value = "";
  }

  async function kopyala() {
    if (!sonuc) return;
    try {
      await navigator.clipboard.writeText(sonuc.metin);
      setKopyaDurumu("kopyalandı");
      setTimeout(() => setKopyaDurumu("hazır"), 2000);
    } catch {
      // Pano izni yoksa ya da güvensiz bağlamda çalışıyorsa buraya düşer.
      setKopyaDurumu("hata");
      setTimeout(() => setKopyaDurumu("hazır"), 3000);
    }
  }

  function indir() {
    if (!sonuc) return;
    try {
      // BOM ekleniyor: Excel BOM'suz UTF-8 CSV'yi yine Türkçe karakterleri
      // bozarak açıyor — düzelttiğimiz dosyanın orada tekrar bozulmaması için.
      const blob = new Blob(["﻿", sonuc.metin], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = dosyaAdi ? `duzeltilmis-${dosyaAdi}` : "duzeltilmis-metin.txt";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setKopyaDurumu("hata");
      setTimeout(() => setKopyaDurumu("hazır"), 3000);
    }
  }

  function temizle() {
    setGirdi("");
    setSonuc(null);
    setDosyaAdi(null);
    setKopyaDurumu("hazır");
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-end justify-between gap-3 mb-2">
          <label
            htmlFor="bozuk-metin"
            className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)]"
          >
            Bozuk metin
          </label>
          <div className="flex items-center gap-3">
            {girdi && (
              <button
                onClick={temizle}
                aria-label="Metni temizle"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Temizle
              </button>
            )}
            <button
              onClick={() => {
                setGirdi(ORNEK);
                setSonuc(null);
              }}
              className="text-xs text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
            >
              Örnek doldur
            </button>
          </div>
        </div>

        <textarea
          id="bozuk-metin"
          value={girdi}
          onChange={(e) => {
            setGirdi(e.target.value);
            setSonuc(null);
          }}
          rows={12}
          placeholder={`Bozuk metni buraya yapıştırın.\n\nÖrnek: ${ORNEK.split("\n")[0]} → Gösterimler`}
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono leading-relaxed focus:outline-none focus:border-[var(--accent)]"
        />

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            onClick={() => duzelt()}
            disabled={!girdi.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Sparkles className="w-4 h-4" />
            Düzelt
          </button>

          <button
            onClick={() => dosyaGirisi.current?.click()}
            aria-label="Metin ya da CSV dosyası yükle"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-md border border-[var(--border-strong)] text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors"
          >
            <Upload className="w-4 h-4" />
            Dosya yükle (.txt, .csv)
          </button>
          <input
            ref={dosyaGirisi}
            id="dosya-girisi"
            type="file"
            accept=".txt,.csv,text/plain,text/csv"
            onChange={dosyaSecildi}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
          />

          {dosyaAdi && (
            <span className="inline-flex items-center gap-1.5 text-xs text-[var(--fg-subtle)]">
              <FileText className="w-3.5 h-3.5" />
              {dosyaAdi}
            </span>
          )}
        </div>

        <p className="mt-3 text-xs text-[var(--fg-subtle)]">
          Metniniz ve dosyanız hiçbir yere gönderilmiyor; onarım tamamen
          tarayıcınızda yapılıyor.
        </p>
      </div>

      {sonuc && (
        <div className="space-y-5">
          <div
            className={`border-s-[3px] rounded-e-md px-5 py-4 ${
              sonuc.degisti
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--border-strong)] bg-[var(--bg-card)]"
            }`}
            role="status"
            aria-live="polite"
          >
            <p className="text-sm text-[var(--fg)] leading-relaxed">
              {sonuc.degisti ? (
                <>
                  <strong>{sonuc.duzeltilenKarakter} karakter</strong> düzeltildi
                  {" — "}
                  {sonuc.duzeltmeSayisi} bozuk parça onarıldı.
                </>
              ) : (
                <strong>Değişiklik yapılmadı.</strong>
              )}
            </p>
            <p className="mt-1 text-xs text-[var(--fg-muted)] leading-relaxed">
              {sonuc.not}
            </p>
          </div>

          {sonuc.degisiklikler.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2">
                Yapılan değişiklikler
              </h2>
              <ul className="flex flex-wrap gap-2">
                {sonuc.degisiklikler.map((d) => (
                  <li
                    key={`${d.kaynak}-${d.sonuc}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--bg-card)] text-xs font-mono"
                  >
                    <span className="text-red-400">{d.kaynak}</span>
                    <ArrowRight className="w-3 h-3 text-[var(--fg-subtle)]" />
                    <span className="text-[var(--accent)]">{d.sonuc}</span>
                    <span className="text-[var(--fg-subtle)]">×{d.adet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Önce/sonra yan yana: kullanıcı neyin değiştiğini gözle görebilsin. */}
          <div className="grid gap-4 md:grid-cols-2">
            <Panel baslik="Önce" metin={girdi} vurgu={false} />
            <Panel baslik="Sonra" metin={sonuc.metin} vurgu={sonuc.degisti} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={kopyala}
              aria-label="Düzeltilmiş metni panoya kopyala"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--border-strong)] text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors"
            >
              {kopyaDurumu === "kopyalandı" ? (
                <Check className="w-4 h-4 text-[var(--accent)]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {kopyaDurumu === "kopyalandı" ? "Kopyalandı" : "Panoya kopyala"}
            </button>

            <button
              onClick={indir}
              aria-label="Düzeltilmiş metni dosya olarak indir"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--border-strong)] text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors"
            >
              <Download className="w-4 h-4" />
              İndir
            </button>
          </div>

          {kopyaDurumu === "hata" && (
            <p className="text-sm text-yellow-500">
              Pano ya da indirme erişimi engellendi. Metni sağdaki kutudan elle
              seçip kopyalayabilirsiniz.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Panel({
  baslik,
  metin,
  vurgu,
}: {
  baslik: string;
  metin: string;
  vurgu: boolean;
}) {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2">
        {baslik}
      </h2>
      <pre
        className={`card rounded-lg p-4 text-sm font-mono leading-relaxed whitespace-pre-wrap break-words max-h-96 overflow-auto ${
          vurgu ? "text-[var(--fg)] border-[var(--accent)]/40" : "text-[var(--fg-muted)]"
        }`}
      >
        {metin}
      </pre>
    </div>
  );
}
