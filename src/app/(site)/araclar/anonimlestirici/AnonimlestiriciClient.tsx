"use client";

import { useMemo, useRef, useState } from "react";
import { Check, Copy, Eraser, EyeOff, Trash2 } from "lucide-react";
import {
  KURALLAR,
  anonimlestir,
  type KuralAnahtari,
  type Rapor,
} from "./kurallar";

/**
 * Anonimleştirici arayüzü.
 *
 * Metin hiçbir yere gönderilmiyor; hepsi bu bileşenin içinde, tarayıcının
 * kendi düzenli ifade motoruyla yapılıyor. Amaç, katılımcı ya da öğrenci
 * verisini bir yapay zekâ aracına yapıştırmadan önce temizlemek.
 *
 * Her kuralın ayrı bir onay kutusu var: hangi desenin nerede yanlış eşleşeceği
 * belgeye göre değişiyor (ör. bir sınav listesindeki puanlar öğrenci numarası
 * sanılabilir), o yüzden karar kullanıcıya bırakıldı.
 */

const VARSAYILAN: Record<KuralAnahtari, boolean> = {
  eposta: true,
  telefon: true,
  tc: true,
  ogrenciNo: true,
  iban: true,
  baglanti: true,
  tarih: false, // Tarih çoğu akademik metinde kişisel veri değil; kapalı başlıyor.
};

const ORNEK = `Katılımcı: Mehmet Öztürk (TC 12345678901), öğrenci no 210401025.
İletişim: mehmet.ozturk@cbu.edu.tr, 0532 123 45 67 veya +90 212 555 00 00.
Görüşme 12.03.2024 tarihinde Manisa'da yapıldı.
Ödeme bilgisi: TR33 0006 1005 1978 6457 8413 26
Ayrıntılar: https://ornek.edu.tr/etik-kurul/2024`;

export function AnonimlestiriciClient() {
  const [girdi, setGirdi] = useState("");
  const [adListesi, setAdListesi] = useState("");
  const [acik, setAcik] = useState<Record<KuralAnahtari, boolean>>(VARSAYILAN);
  const [kopyaDurumu, setKopyaDurumu] = useState<"bos" | "oldu" | "olmadi">(
    "bos"
  );
  const ciktiRef = useRef<HTMLTextAreaElement>(null);

  // Her tuş vuruşunda yeniden hesaplamak yerine girdiler değiştikçe hesapla;
  // metin uzun olduğunda tarama maliyeti hissediliyor.
  const { metin: cikti, rapor } = useMemo(
    () => anonimlestir(girdi, acik, adListesi),
    [girdi, acik, adListesi]
  );

  const toplam = rapor.reduce((t: number, r: Rapor) => t + r.sayi, 0);
  const bulunanlar = rapor.filter((r) => r.sayi > 0);

  async function kopyala() {
    if (!cikti) return;
    try {
      // Pano izni reddedilebilir ya da güvensiz bağlamda hiç bulunmayabilir;
      // böyle bir durumda metni seçip kullanıcıya Ctrl+C bırakmak tek çare.
      await navigator.clipboard.writeText(cikti);
      setKopyaDurumu("oldu");
    } catch {
      setKopyaDurumu("olmadi");
      const alan = ciktiRef.current;
      if (alan) {
        alan.focus();
        alan.select();
      }
    }
    window.setTimeout(() => setKopyaDurumu("bos"), 2500);
  }

  return (
    <div className="space-y-6">
      {/* Kurallar */}
      <fieldset className="card rounded-lg px-5 py-4">
        <legend className="px-2 text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
          Temizlenecekler
        </legend>
        <div className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {KURALLAR.map((kural) => (
            <div key={kural.anahtar} className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id={`kural-${kural.anahtar}`}
                checked={acik[kural.anahtar]}
                onChange={(e) =>
                  setAcik((onceki) => ({
                    ...onceki,
                    [kural.anahtar]: e.target.checked,
                  }))
                }
                className="mt-0.5 w-4 h-4 shrink-0 accent-[var(--accent)]"
              />
              <label
                htmlFor={`kural-${kural.anahtar}`}
                className="text-sm text-[var(--fg)] leading-snug cursor-pointer"
              >
                {kural.etiket}{" "}
                <code className="text-[var(--accent)] text-xs">
                  {kural.jeton}
                </code>
                <span className="block text-xs text-[var(--fg-subtle)] mt-0.5 font-mono">
                  {kural.ipucu}
                </span>
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Ad listesi */}
      <div>
        <label
          htmlFor="ad-listesi"
          className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
        >
          Ad-soyad listesi — her satıra bir isim
        </label>
        <textarea
          id="ad-listesi"
          value={adListesi}
          onChange={(e) => setAdListesi(e.target.value)}
          rows={3}
          placeholder={"Mehmet Öztürk\nAyşe Yılmaz\nIşıl Çağlar"}
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono leading-relaxed focus:outline-none focus:border-[var(--accent)]"
        />
        <p className="mt-2 text-xs text-[var(--fg-subtle)]">
          Büyük/küçük harf ayrımı yapılmaz; Türkçe İ/ı ayrımı doğru işlenir.
          Bulunan isimler <code className="text-[var(--accent)]">[AD]</code> ile
          değiştirilir.
        </p>
      </div>

      {/* Girdi */}
      <div>
        <div className="flex items-end justify-between gap-3 mb-2">
          <label
            htmlFor="kaynak-metin"
            className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)]"
          >
            Metniniz
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setGirdi(ORNEK);
                setAdListesi("Mehmet Öztürk");
              }}
              className="text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
            >
              Örnek doldur
            </button>
            <button
              type="button"
              onClick={() => {
                setGirdi("");
                setAdListesi("");
              }}
              aria-label="Metni ve ad listesini temizle"
              className="p-1.5 rounded-md text-[var(--fg-muted)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <textarea
          id="kaynak-metin"
          value={girdi}
          onChange={(e) => setGirdi(e.target.value)}
          rows={12}
          placeholder="Temizlemek istediğiniz metni buraya yapıştırın. Yazdıkça sonuç aşağıda güncellenir."
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm font-mono leading-relaxed focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      {/* Sayaçlar */}
      {girdi.trim() && (
        <div className="border-s-[3px] border-[var(--accent)] bg-[var(--accent-soft)] rounded-e-md px-5 py-4">
          <div className="flex items-start gap-3">
            <EyeOff className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)]" />
            <div className="text-sm text-[var(--fg-muted)] leading-relaxed">
              {toplam === 0 ? (
                <span>
                  Hiçbir eşleşme bulunamadı. Açık kuralları ya da ad listesini
                  gözden geçirin — bu araç yalnızca tanıdığı kalıpları temizler,
                  serbest metindeki dolaylı bilgiyi (kurum, unvan, ders adı)
                  görmez.
                </span>
              ) : (
                <>
                  <strong className="text-[var(--fg)]">
                    {toplam} değişiklik yapıldı.
                  </strong>
                  <span className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                    {bulunanlar.map((r) => (
                      <span key={r.anahtar} className="text-xs">
                        {r.etiket}:{" "}
                        <strong className="text-[var(--accent)]">{r.sayi}</strong>
                      </span>
                    ))}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Çıktı */}
      <div>
        <div className="flex items-end justify-between gap-3 mb-2">
          <label
            htmlFor="sonuc-metin"
            className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)]"
          >
            Temizlenmiş metin
          </label>
          <button
            type="button"
            onClick={kopyala}
            disabled={!cikti}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--border-strong)] text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors disabled:opacity-40"
          >
            {kopyaDurumu === "oldu" ? (
              <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {kopyaDurumu === "oldu"
              ? "Kopyalandı"
              : kopyaDurumu === "olmadi"
                ? "Seçildi — Ctrl+C"
                : "Panoya kopyala"}
          </button>
        </div>
        <textarea
          id="sonuc-metin"
          ref={ciktiRef}
          value={cikti}
          readOnly
          rows={12}
          placeholder="Sonuç burada görünecek."
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border)] text-[var(--fg)] text-sm font-mono leading-relaxed focus:outline-none focus:border-[var(--accent)]"
        />
        {kopyaDurumu === "olmadi" && (
          <p className="mt-2 text-xs text-yellow-500">
            Tarayıcı pano iznini vermedi. Metin sizin için seçildi; Ctrl+C
            (Mac&apos;te ⌘+C) ile kopyalayabilirsiniz.
          </p>
        )}
      </div>

      <p className="text-xs text-[var(--fg-subtle)] leading-relaxed flex items-start gap-2">
        <Eraser className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <span>
          Bu araç yardımcıdır, güvence değil. Yayına ya da üçüncü tarafa
          göndermeden önce çıktıyı mutlaka gözden geçirin: adres, kurum, ders
          kodu ve az sayıdaki katılımcıyı tarif eden ifadeler kalıp tanımadığı
          için silinmez.
        </span>
      </p>
    </div>
  );
}
