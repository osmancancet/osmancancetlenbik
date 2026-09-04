"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Combine,
  Download,
  FileText,
  LoaderCircle,
  Upload,
  X,
} from "lucide-react";
import { araliklariCoz } from "../pdf-bolucu/araliklar";

/**
 * PDF birleştirici.
 *
 * pdf-lib tamamen tarayıcıda çalışıyor; dosyalar hiçbir sunucuya gitmiyor.
 * Bu önemli, çünkü birleştirilen belgeler çoğunlukla atama-yükseltme ya da
 * proje başvurusu dosyaları oluyor.
 *
 * Sayfa aralığı çözümlemesi bölücüden içe aktarılıyor (`araliklariCoz`):
 * "1-40, 55" gibi bir ifadenin hangi sayfalara karşılık geldiği tek bir yerde
 * tanımlı olsun ki iki araç aynı biçimde davransın. `tekDosya` bayrağı burada
 * her zaman açık: birleştirmede her dosyadan tek bir sayfa dizisi çıkar,
 * sıralama korunur ve aynı sayfa iki kez eklenmez.
 */

type Kayit = {
  /** Aynı adlı dosyalar seçilebildiği için liste anahtarı olarak ad kullanılamaz. */
  id: number;
  dosya: File;
  /** Okunamayan dosyada null kalır. */
  sayfaSayisi: number | null;
  /** Dosyaya özel sorun (şifreli, bozuk); listede adının yanında gösterilir. */
  hata: string | null;
  /** Boşsa dosyanın tamamı alınır. */
  aralik: string;
};

type Cikti = { url: string; ad: string; sayfaSayisi: number; bayt: number };

function boyut(bayt: number): string {
  if (bayt < 1024) return `${bayt} B`;
  if (bayt < 1024 * 1024) return `${(bayt / 1024).toFixed(0)} KB`;
  return `${(bayt / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * pdf-lib'in hataları İngilizce ve teknik. En sık iki durumu (şifreli ve
 * bozuk dosya) ayırıp Türkçe karşılık veriyoruz; hangi dosyanın sorunlu
 * olduğu her zaman adıyla söyleniyor.
 */
function hataMesaji(sorun: unknown): string {
  const metin =
    sorun instanceof Error ? sorun.message : typeof sorun === "string" ? sorun : "";
  if (/encrypt/i.test(metin)) {
    return "şifre korumalı. Parolayı kaldırıp (PDF okuyucunuzda “parolasız kopya olarak kaydet”) yeniden ekleyin.";
  }
  if (/password/i.test(metin)) {
    return "parola istiyor. Parolasız bir kopyasını hazırlayıp yeniden ekleyin.";
  }
  return "okunamadı. Bozuk ya da PDF olmayan bir dosya olabilir.";
}

/** Çıktı adı: kullanıcı uzantıyı yazmayı unutursa biz tamamlıyoruz. */
function ciktiAdiDuzelt(ham: string): string {
  const temiz = ham.trim().replace(/[\\/:*?"<>|]/g, "-");
  if (temiz.length === 0) return "birlesik.pdf";
  return /\.pdf$/i.test(temiz) ? temiz : `${temiz}.pdf`;
}

export function PdfBirlestiriciClient() {
  const [kayitlar, setKayitlar] = useState<Kayit[]>([]);
  const [ciktiAdi, setCiktiAdi] = useState("birlesik.pdf");
  const [cikti, setCikti] = useState<Cikti | null>(null);
  const [hata, setHata] = useState<string | null>(null);
  const [calisiyor, setCalisiyor] = useState(false);
  const [okunuyor, setOkunuyor] = useState(false);
  const [surukleniyor, setSurukleniyor] = useState(false);

  // Sökülürken temizleyebilmek için açık bağlantı durumun dışında da tutuluyor:
  // temizleme işlevi kapanışta eski durumu görüyor, ref güncel kalıyor.
  const urlRef = useRef<string | null>(null);
  const sonId = useRef(0);
  const girdiRef = useRef<HTMLInputElement>(null);

  const ciktiyiBirak = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    setCikti(null);
  }, []);

  useEffect(() => {
    // Bileşen sökülürken bağlantı geri verilmezse blob bellekte kalır.
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    };
  }, []);

  const dosyalariEkle = useCallback(
    async (secilenler: FileList | null) => {
      if (!secilenler || secilenler.length === 0) return;
      // Liste değiştiğinde eski çıktı artık bu sıralamayı yansıtmıyor.
      ciktiyiBirak();
      setHata(null);
      setOkunuyor(true);

      const yeniler: Kayit[] = [];
      for (const dosya of Array.from(secilenler)) {
        const id = ++sonId.current;

        if (!/\.pdf$/i.test(dosya.name) && dosya.type !== "application/pdf") {
          yeniler.push({
            id,
            dosya,
            sayfaSayisi: null,
            hata: "PDF değil.",
            aralik: "",
          });
          continue;
        }

        try {
          const bayt = new Uint8Array(await dosya.arrayBuffer());
          const belge = await PDFDocument.load(bayt);
          yeniler.push({
            id,
            dosya,
            sayfaSayisi: belge.getPageCount(),
            hata: null,
            aralik: "",
          });
        } catch (sorun) {
          // Bir dosyanın bozuk olması bütün seçimi çöpe atmamalı; sorunlu
          // dosya listede kalıp adıyla işaretleniyor.
          yeniler.push({
            id,
            dosya,
            sayfaSayisi: null,
            hata: hataMesaji(sorun),
            aralik: "",
          });
        }
      }

      setKayitlar((onceki) => [...onceki, ...yeniler]);
      setOkunuyor(false);
    },
    [ciktiyiBirak]
  );

  function kayitDegistir(id: number, aralik: string) {
    ciktiyiBirak();
    setKayitlar((onceki) =>
      onceki.map((k) => (k.id === id ? { ...k, aralik } : k))
    );
  }

  function kaldir(id: number) {
    ciktiyiBirak();
    setHata(null);
    setKayitlar((onceki) => onceki.filter((k) => k.id !== id));
  }

  function tasi(sira: number, yon: -1 | 1) {
    const hedef = sira + yon;
    if (hedef < 0 || hedef >= kayitlar.length) return;
    ciktiyiBirak();
    setKayitlar((onceki) => {
      const kopya = [...onceki];
      const gecici = kopya[sira];
      kopya[sira] = kopya[hedef];
      kopya[hedef] = gecici;
      return kopya;
    });
  }

  /**
   * Bir kaydın sayfa aralığını çözer. Arayüz bunu her tuş vuruşunda çağırıp
   * hatayı alanın altında gösteriyor; birleştirme düğmesine basmadan önce
   * yanlışın görülmesi, sonradan yanlış PDF indirmekten iyi.
   */
  function indisleriCoz(
    kayit: Kayit
  ): { tamam: true; indisler: number[] } | { tamam: false; hata: string } {
    if (kayit.sayfaSayisi === null) {
      return { tamam: false, hata: kayit.hata ?? "Dosya okunamadı." };
    }
    if (kayit.aralik.trim() === "") {
      const hepsi: number[] = [];
      for (let i = 0; i < kayit.sayfaSayisi; i++) hepsi.push(i);
      return { tamam: true, indisler: hepsi };
    }
    const cozum = araliklariCoz(kayit.aralik, kayit.sayfaSayisi, true);
    if (!cozum.tamam) return { tamam: false, hata: cozum.hata };
    return { tamam: true, indisler: cozum.parcalar[0].indisler };
  }

  // Önizleme için toplam sayfa: hatalı satırlar sayılmıyor.
  let toplamSayfa = 0;
  let hataliVar = false;
  for (const kayit of kayitlar) {
    const cozum = indisleriCoz(kayit);
    if (cozum.tamam) toplamSayfa += cozum.indisler.length;
    else hataliVar = true;
  }

  async function birlestir() {
    if (kayitlar.length === 0) return;
    setHata(null);
    setCalisiyor(true);
    ciktiyiBirak();

    try {
      const hedef = await PDFDocument.create();
      let sayfaToplami = 0;

      for (const kayit of kayitlar) {
        const cozum = indisleriCoz(kayit);
        if (!cozum.tamam) {
          setHata(`“${kayit.dosya.name}” ${cozum.hata}`);
          return;
        }

        try {
          const bayt = new Uint8Array(await kayit.dosya.arrayBuffer());
          const kaynak = await PDFDocument.load(bayt);
          const sayfalar = await hedef.copyPages(kaynak, cozum.indisler);
          for (const sayfa of sayfalar) hedef.addPage(sayfa);
          sayfaToplami += sayfalar.length;
        } catch (sorun) {
          // Hangi dosyanın sorun çıkardığı adıyla söyleniyor; yoksa kullanıcı
          // yirmi dosyalık listede aramak zorunda kalıyor.
          setHata(`“${kayit.dosya.name}” ${hataMesaji(sorun)}`);
          return;
        }
      }

      if (sayfaToplami === 0) {
        setHata("Birleştirilecek sayfa kalmadı. Sayfa aralıklarını gözden geçirin.");
        return;
      }

      const veri = await hedef.save();
      // pdf-lib'in döndürdüğü dizi paylaşımlı bir arabellek üzerinde
      // olabiliyor; Blob yalnızca sıradan ArrayBuffer kabul ettiği için
      // veriyi kendi arabelleğimize kopyalıyoruz.
      const govde = new Uint8Array(veri.length);
      govde.set(veri);
      const blob = new Blob([govde], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      urlRef.current = url;
      setCikti({
        url,
        ad: ciktiAdiDuzelt(ciktiAdi),
        sayfaSayisi: sayfaToplami,
        bayt: blob.size,
      });
    } catch (sorun) {
      setHata(`Birleştirme tamamlanamadı: ${hataMesaji(sorun)}`);
    } finally {
      setCalisiyor(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Dosya seçimi */}
      <div>
        <label
          htmlFor="pdf-dosyalar"
          className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
        >
          PDF dosyaları
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
            void dosyalariEkle(e.dataTransfer.files);
          }}
          className={`rounded-lg border border-dashed px-6 py-8 text-center transition-colors ${
            surukleniyor
              ? "border-[var(--accent)] bg-[var(--accent-soft)]"
              : "border-[var(--border-strong)] bg-[var(--bg-card)]"
          }`}
        >
          <Upload className="w-5 h-5 mx-auto text-[var(--fg-subtle)]" />
          <p className="mt-3 text-sm text-[var(--fg-muted)]">
            PDF&apos;leri buraya sürükleyin ya da{" "}
            <button
              type="button"
              onClick={() => girdiRef.current?.click()}
              className="text-[var(--accent)] underline underline-offset-2"
            >
              dosya seçin
            </button>
            . Birden çok dosya seçebilirsiniz.
          </p>
          <input
            ref={girdiRef}
            id="pdf-dosyalar"
            type="file"
            accept="application/pdf,.pdf"
            multiple
            onChange={(e) => {
              void dosyalariEkle(e.target.files);
              // Aynı dosyayı ikinci kez seçebilmek için alanı sıfırla.
              e.target.value = "";
            }}
            className="sr-only"
          />
        </div>
        {okunuyor && (
          <p className="mt-2 text-xs text-[var(--fg-muted)] flex items-center gap-2">
            <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
            Dosyalar okunuyor…
          </p>
        )}
      </div>

      {hata && (
        <div className="border-s-[3px] border-red-400 bg-red-500/10 rounded-e-md px-5 py-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{hata}</p>
        </div>
      )}

      {/* Dosya listesi */}
      {kayitlar.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
              Birleştirme sırası
            </h2>
            <button
              type="button"
              onClick={() => {
                ciktiyiBirak();
                setHata(null);
                setKayitlar([]);
              }}
              className="text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
            >
              Listeyi boşalt
            </button>
          </div>

          <ul className="space-y-2">
            {kayitlar.map((kayit, sira) => {
              const cozum = indisleriCoz(kayit);
              return (
                <li key={kayit.id} className="card rounded-lg px-4 py-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 shrink-0 rounded-md border border-[var(--border-strong)] text-xs flex items-center justify-center text-[var(--fg-muted)] tabular-nums">
                      {sira + 1}
                    </span>
                    <FileText className="w-4 h-4 mt-1 shrink-0 text-[var(--accent)]" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-[var(--fg)] truncate">
                        {kayit.dosya.name}
                      </div>
                      <div className="text-xs mt-0.5">
                        {kayit.hata ? (
                          <span className="text-red-400">{kayit.hata}</span>
                        ) : (
                          <span className="text-[var(--fg-muted)]">
                            {kayit.sayfaSayisi} sayfa · {boyut(kayit.dosya.size)}
                            {cozum.tamam &&
                              kayit.aralik.trim() !== "" &&
                              ` · ${cozum.indisler.length} sayfa alınacak`}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => tasi(sira, -1)}
                        disabled={sira === 0}
                        aria-label={`${kayit.dosya.name} dosyasını yukarı taşı`}
                        className="p-1.5 rounded-md text-[var(--fg-muted)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => tasi(sira, 1)}
                        disabled={sira === kayitlar.length - 1}
                        aria-label={`${kayit.dosya.name} dosyasını aşağı taşı`}
                        className="p-1.5 rounded-md text-[var(--fg-muted)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => kaldir(kayit.id)}
                        aria-label={`${kayit.dosya.name} dosyasını listeden çıkar`}
                        className="p-1.5 rounded-md text-[var(--fg-muted)] hover:text-red-400 border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {kayit.sayfaSayisi !== null && (
                    <div className="mt-3 ps-9">
                      <label
                        htmlFor={`aralik-${kayit.id}`}
                        className="block text-xs text-[var(--fg-subtle)] mb-1.5"
                      >
                        Sayfa aralığı — boş bırakırsanız tamamı alınır
                      </label>
                      <input
                        id={`aralik-${kayit.id}`}
                        type="text"
                        value={kayit.aralik}
                        onChange={(e) => kayitDegistir(kayit.id, e.target.value)}
                        placeholder={`1-${kayit.sayfaSayisi}`}
                        className="w-full sm:w-64 px-3 py-2 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono focus:outline-none focus:border-[var(--accent)]"
                      />
                      {!cozum.tamam && kayit.aralik.trim() !== "" && (
                        <p className="mt-1.5 text-xs text-red-400">{cozum.hata}</p>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="text-xs text-[var(--fg-subtle)]">
            {hataliVar
              ? "Kırmızı satırlar düzeltilmeden birleştirme yapılmaz."
              : `Toplam ${toplamSayfa} sayfa birleştirilecek.`}
          </p>
        </div>
      )}

      {/* Çıktı ayarı ve düğme */}
      {kayitlar.length > 0 && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="cikti-adi"
              className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
            >
              Çıktı dosya adı
            </label>
            <input
              id="cikti-adi"
              type="text"
              value={ciktiAdi}
              onChange={(e) => setCiktiAdi(e.target.value)}
              placeholder="birlesik.pdf"
              className="w-full sm:w-80 px-4 py-2.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono focus:outline-none focus:border-[var(--accent)]"
            />
            <p className="mt-2 text-xs text-[var(--fg-subtle)]">
              Uzantıyı yazmazsanız <code className="text-[var(--accent)]">.pdf</code>{" "}
              eklenir.
            </p>
          </div>

          <button
            onClick={birlestir}
            disabled={calisiyor || okunuyor || hataliVar || kayitlar.length === 0}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {calisiyor ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              <Combine className="w-4 h-4" />
            )}
            {calisiyor ? "Birleştiriliyor…" : "Birleştir"}
          </button>
        </div>
      )}

      {/* Sonuç */}
      {cikti && (
        <div className="space-y-2">
          <div className="card rounded-lg px-4 py-3 flex items-center gap-3">
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
          </div>
          <p className="text-xs text-[var(--fg-subtle)]">
            Bağlantı yalnızca bu sekme açıkken geçerli — sayfayı kapatmadan önce
            indirin. Listeyi değiştirirseniz sonuç sıfırlanır, yeniden
            birleştirmeniz gerekir.
          </p>
        </div>
      )}
    </div>
  );
}
