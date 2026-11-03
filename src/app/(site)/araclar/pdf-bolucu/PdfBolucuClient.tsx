"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import {
  AlertTriangle,
  Download,
  FileText,
  LoaderCircle,
  Scissors,
  Upload,
  X,
} from "lucide-react";
import { araliklariCoz, esitBol, tabanAd, type Parca } from "./araliklar";

/**
 * PDF bölücü.
 *
 * pdf-lib tamamen tarayıcıda çalışıyor; dosya hiçbir sunucuya gitmiyor. Bu
 * araç var çünkü yapay zekâ araçlarının çoğu 100 sayfadan büyük PDF'lerde
 * görselleri okumuyor — akademisyen makalesini elle bölmek zorunda kalıyor.
 *
 * Üretilen her parça için `URL.createObjectURL` ile bir indirme bağlantısı
 * açılıyor. Bu bağlantılar sayfa kapanana kadar belleği tuttuğu için yeni bir
 * bölme işleminde ve bileşen sökülürken tek tek geri veriliyor.
 */

type Kip = "aralik" | "esit";

type Cikti = {
  ad: string;
  url: string;
  sayfaSayisi: number;
  bayt: number;
};

/** Kullanıcıya boyutu okunur biçimde göstermek listeyi anlamlı kılıyor. */
function boyut(bayt: number): string {
  if (bayt < 1024) return `${bayt} B`;
  if (bayt < 1024 * 1024) return `${(bayt / 1024).toFixed(0)} KB`;
  return `${(bayt / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * pdf-lib'in hataları İngilizce ve teknik; akademisyene bir şey anlatmıyor.
 * En sık iki durumu (şifreli ve bozuk dosya) ayırıp Türkçe karşılık veriyoruz.
 */
function hataMesaji(sorun: unknown): string {
  const metin =
    sorun instanceof Error ? sorun.message : typeof sorun === "string" ? sorun : "";
  if (/encrypt/i.test(metin)) {
    return "Bu PDF şifre korumalı. Önce parolayı kaldırıp (PDF okuyucunuzda “parolasız kopya olarak kaydet”) yeniden deneyin.";
  }
  if (/password/i.test(metin)) {
    return "Bu PDF parola istiyor. Parolasız bir kopyasını hazırlayıp yeniden deneyin.";
  }
  return "Dosya okunamadı. Bozuk ya da PDF olmayan bir dosya olabilir; başka bir kopyayla deneyin.";
}

export function PdfBolucuClient() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [sayfaSayisi, setSayfaSayisi] = useState<number | null>(null);
  const [kip, setKip] = useState<Kip>("esit");
  const [ifade, setIfade] = useState("");
  const [adim, setAdim] = useState("100");
  const [tekDosya, setTekDosya] = useState(false);
  const [ciktilar, setCiktilar] = useState<Cikti[]>([]);
  const [hata, setHata] = useState<string | null>(null);
  const [calisiyor, setCalisiyor] = useState(false);
  const [surukleniyor, setSurukleniyor] = useState(false);

  // Sökülürken temizleyebilmek için açık bağlantıları durum dışında da tut:
  // temizleme işlevi kapanışta eski durumu görüyor, ref güncel kalıyor.
  const urlRef = useRef<string[]>([]);
  const girdiRef = useRef<HTMLInputElement>(null);

  const baglantilariBirak = useCallback(() => {
    for (const url of urlRef.current) URL.revokeObjectURL(url);
    urlRef.current = [];
  }, []);

  useEffect(() => baglantilariBirak, [baglantilariBirak]);

  const dosyaSec = useCallback(
    async (yeni: File | null) => {
      baglantilariBirak();
      setCiktilar([]);
      setHata(null);
      setSayfaSayisi(null);
      setDosya(yeni);
      if (!yeni) return;

      if (!/\.pdf$/i.test(yeni.name) && yeni.type !== "application/pdf") {
        setHata("Yalnızca PDF dosyası seçebilirsiniz.");
        setDosya(null);
        return;
      }

      try {
        const bayt = new Uint8Array(await yeni.arrayBuffer());
        const belge = await PDFDocument.load(bayt);
        setSayfaSayisi(belge.getPageCount());
      } catch (sorun) {
        setHata(hataMesaji(sorun));
        setDosya(null);
      }
    },
    [baglantilariBirak]
  );

  async function bol() {
    if (!dosya || sayfaSayisi === null) return;

    const cozum =
      kip === "aralik"
        ? araliklariCoz(ifade, sayfaSayisi, tekDosya)
        : esitBol(sayfaSayisi, Number(adim));

    if (!cozum.tamam) {
      setHata(cozum.hata);
      return;
    }

    setHata(null);
    setCalisiyor(true);
    baglantilariBirak();
    setCiktilar([]);

    try {
      const kaynakBayt = new Uint8Array(await dosya.arrayBuffer());
      const kaynak = await PDFDocument.load(kaynakBayt);
      const taban = tabanAd(dosya.name);
      const yeniler: Cikti[] = [];

      for (let i = 0; i < cozum.parcalar.length; i++) {
        const parca: Parca = cozum.parcalar[i];
        const hedef = await PDFDocument.create();
        const sayfalar = await hedef.copyPages(kaynak, parca.indisler);
        for (const sayfa of sayfalar) hedef.addPage(sayfa);
        const veri = await hedef.save();
        // pdf-lib'in döndürdüğü dizi paylaşımlı bir arabellek üzerinde
        // olabiliyor; Blob yalnızca sıradan ArrayBuffer kabul ettiği için
        // veriyi kendi arabelleğimize kopyalıyoruz.
        const govde = new Uint8Array(veri.length);
        govde.set(veri);
        const blob = new Blob([govde], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        urlRef.current.push(url);
        yeniler.push({
          ad: `${taban}-${i + 1}.pdf`,
          url,
          sayfaSayisi: parca.indisler.length,
          bayt: blob.size,
        });
      }

      setCiktilar(yeniler);
    } catch (sorun) {
      setHata(hataMesaji(sorun));
    } finally {
      setCalisiyor(false);
    }
  }

  /**
   * Tarayıcılar arka arkaya gelen indirmeleri engelleyebiliyor; aralarına kısa
   * bir bekleme koymak çoğu tarayıcıda hepsinin inmesini sağlıyor.
   */
  function hepsiniIndir() {
    ciktilar.forEach((cikti, sira) => {
      window.setTimeout(() => {
        const bag = document.createElement("a");
        bag.href = cikti.url;
        bag.download = cikti.ad;
        document.body.appendChild(bag);
        bag.click();
        document.body.removeChild(bag);
      }, sira * 350);
    });
  }

  return (
    <div className="space-y-6">
      {/* Dosya seçimi */}
      <div>
        <label
          htmlFor="pdf-dosya"
          className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
        >
          PDF dosyası
        </label>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setSurukleniyor(true);
          }}
          onDragLeave={() => setSurukleniyor(false)}
          onDrop={(e) => {
            e.preventDefault();
            setSurukleniyor(false);
            void dosyaSec(e.dataTransfer.files[0] ?? null);
          }}
          className={`rounded-lg border border-dashed px-6 py-8 text-center transition-colors ${
            surukleniyor
              ? "border-[var(--accent)] bg-[var(--accent-soft)]"
              : "border-[var(--border-strong)] bg-[var(--bg-card)]"
          }`}
        >
          <Upload className="w-5 h-5 mx-auto text-[var(--fg-subtle)]" />
          <p className="mt-3 text-sm text-[var(--fg-muted)]">
            PDF&apos;i buraya sürükleyin ya da{" "}
            <button
              type="button"
              onClick={() => girdiRef.current?.click()}
              className="text-[var(--accent)] underline underline-offset-2"
            >
              dosya seçin
            </button>
            .
          </p>
          <input
            ref={girdiRef}
            id="pdf-dosya"
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => void dosyaSec(e.target.files?.[0] ?? null)}
            className="sr-only"
          />
        </div>
      </div>

      {hata && (
        <div className="border-s-[3px] border-red-400 bg-red-500/10 rounded-e-md px-5 py-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{hata}</p>
        </div>
      )}

      {dosya && sayfaSayisi !== null && (
        <>
          <div className="card rounded-lg px-4 py-3 flex items-center gap-3">
            <FileText className="w-4 h-4 shrink-0 text-[var(--accent)]" />
            <div className="min-w-0 flex-1">
              <div className="text-sm text-[var(--fg)] truncate">{dosya.name}</div>
              <div className="text-xs text-[var(--fg-muted)] mt-0.5">
                {sayfaSayisi} sayfa · {boyut(dosya.size)}
              </div>
            </div>
            <button
              type="button"
              onClick={() => void dosyaSec(null)}
              aria-label="Seçili PDF'i kaldır"
              className="p-1.5 rounded-md text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Kip seçimi */}
          <fieldset>
            <legend className="text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2">
              Bölme kipi
            </legend>
            <div className="grid sm:grid-cols-2 gap-3">
              <label
                htmlFor="kip-esit"
                className={`card rounded-lg px-4 py-3 cursor-pointer flex items-start gap-2.5 ${
                  kip === "esit" ? "border-[var(--accent)]" : ""
                }`}
              >
                <input
                  type="radio"
                  id="kip-esit"
                  name="kip"
                  checked={kip === "esit"}
                  onChange={() => setKip("esit")}
                  className="mt-0.5 w-4 h-4 shrink-0 accent-[var(--accent)]"
                />
                <span className="text-sm text-[var(--fg)] leading-snug">
                  Eşit parçalar
                  <span className="block text-xs text-[var(--fg-subtle)] mt-0.5">
                    Her N sayfada bir böl
                  </span>
                </span>
              </label>
              <label
                htmlFor="kip-aralik"
                className={`card rounded-lg px-4 py-3 cursor-pointer flex items-start gap-2.5 ${
                  kip === "aralik" ? "border-[var(--accent)]" : ""
                }`}
              >
                <input
                  type="radio"
                  id="kip-aralik"
                  name="kip"
                  checked={kip === "aralik"}
                  onChange={() => setKip("aralik")}
                  className="mt-0.5 w-4 h-4 shrink-0 accent-[var(--accent)]"
                />
                <span className="text-sm text-[var(--fg)] leading-snug">
                  Sayfa aralığı
                  <span className="block text-xs text-[var(--fg-subtle)] mt-0.5">
                    Belirli sayfaları çıkar
                  </span>
                </span>
              </label>
            </div>
          </fieldset>

          {kip === "esit" ? (
            <div>
              <label
                htmlFor="parca-boyu"
                className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
              >
                Parça başına sayfa
              </label>
              <input
                id="parca-boyu"
                type="number"
                min={1}
                max={sayfaSayisi}
                value={adim}
                onChange={(e) => setAdim(e.target.value)}
                className="w-40 px-4 py-2.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono focus:outline-none focus:border-[var(--accent)]"
              />
              <p className="mt-2 text-xs text-[var(--fg-subtle)]">
                Varsayılan 100 — yapay zekâ araçlarının çoğu bundan büyük
                PDF&apos;lerde görselleri okumuyor.{" "}
                {Number(adim) >= 1 &&
                  `Bu ayarla ${Math.ceil(sayfaSayisi / Math.max(1, Number(adim)))} parça çıkar.`}
              </p>
            </div>
          ) : (
            <div>
              <label
                htmlFor="aralik-ifadesi"
                className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
              >
                Sayfa aralıkları
              </label>
              <input
                id="aralik-ifadesi"
                type="text"
                value={ifade}
                onChange={(e) => setIfade(e.target.value)}
                placeholder="1-40, 55, 60-80"
                className="w-full px-4 py-2.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono focus:outline-none focus:border-[var(--accent)]"
              />
              <div className="mt-3 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="tek-dosya"
                  checked={tekDosya}
                  onChange={(e) => setTekDosya(e.target.checked)}
                  className="mt-0.5 w-4 h-4 shrink-0 accent-[var(--accent)]"
                />
                <label
                  htmlFor="tek-dosya"
                  className="text-sm text-[var(--fg-muted)] leading-snug cursor-pointer"
                >
                  Tüm aralıkları tek dosyada birleştir
                  <span className="block text-xs text-[var(--fg-subtle)] mt-0.5">
                    Kapalıyken virgülle ayrılan her aralık ayrı bir PDF olur.
                  </span>
                </label>
              </div>
            </div>
          )}

          <button
            onClick={bol}
            disabled={calisiyor}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {calisiyor ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              <Scissors className="w-4 h-4" />
            )}
            {calisiyor ? "Bölünüyor…" : "Böl"}
          </button>
        </>
      )}

      {ciktilar.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[var(--fg-muted)]">
              <strong className="text-[var(--fg)]">{ciktilar.length} dosya</strong>{" "}
              hazır.
            </p>
            {ciktilar.length > 1 && (
              <button
                type="button"
                onClick={hepsiniIndir}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--border-strong)] text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Hepsini indir
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {ciktilar.map((cikti) => (
              <li
                key={cikti.ad}
                className="card rounded-lg px-4 py-3 flex items-center gap-3"
              >
                <FileText className="w-4 h-4 shrink-0 text-[var(--accent)]" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-[var(--fg)] truncate font-mono">
                    {cikti.ad}
                  </div>
                  <div className="text-xs text-[var(--fg-muted)] mt-0.5">
                    {cikti.sayfaSayisi} sayfa · {boyut(cikti.bayt)}
                  </div>
                </div>
                <a
                  href={cikti.url}
                  download={cikti.ad}
                  aria-label={`${cikti.ad} dosyasını indir`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border-strong)] text-xs text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  İndir
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--fg-subtle)]">
            Bağlantılar yalnızca bu sekme açıkken geçerli — sayfayı kapatmadan
            önce indirin.
          </p>
        </div>
      )}
    </div>
  );
}
