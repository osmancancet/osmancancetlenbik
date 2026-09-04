/**
 * Not hesaplayıcının saf hesap katmanı.
 *
 * Arayüzden ayrı tutuldu — çünkü burada yapılan bir hata doğrudan öğrencinin
 * karnesine yansıyor. Saf fonksiyonlar React'siz olarak (node ile) test
 * edilebiliyor; hesap mantığını gözle doğrulamak istediğimizde bu dosya yeter.
 */

/** Bir değerlendirme bileşeni: adı ve yüzde ağırlığı. */
export type Bilesen = {
  id: string;
  ad: string;
  /** Yüzde olarak ağırlık. Toplamın 100 olması beklenir ama zorunlu değil. */
  agirlik: number;
};

/** Harf notu eşiği: bu puandan itibaren bu harf verilir. */
export type HarfKurali = {
  harf: string;
  /** Alt sınır — dahil. */
  min: number;
};

export type Ogrenci = {
  ad: string;
  /** Bileşen sırasıyla notlar. Boş/okunamayan hücre null. */
  notlar: (number | null)[];
};

export type AyristirmaSonucu = {
  ogrenciler: Ogrenci[];
  /** İlk satır başlık sayıldı mı? Kullanıcıya söylüyoruz. */
  baslikAtlandi: boolean;
  /** Kullanılan sütun ayracı — kullanıcıya gösteriliyor. */
  ayrac: "sekme" | "noktalı virgül" | "virgül";
  /** Engelleyici olmayan uyarılar (eksik hücre, fazla sütun...). */
  uyarilar: string[];
};

export type SatirSonucu = {
  ad: string;
  /** Ham (çan eğrisi öncesi) bileşen notları. */
  notlar: (number | null)[];
  /** Ağırlıklı ortalama — ham. */
  hamOrtalama: number;
  /** Çan eğrisi sonrası ortalama. Eğri kapalıysa ham ile aynı. */
  ortalama: number;
  harf: string;
};

export type Ozet = {
  sinifOrtalamasi: number;
  enYuksek: number;
  enDusuk: number;
  /** Harf → öğrenci sayısı. */
  dagilim: Record<string, number>;
};

/** YÖK'te yaygın kullanılan varsayılan ölçek. */
export const VARSAYILAN_OLCEK: HarfKurali[] = [
  { harf: "AA", min: 90 },
  { harf: "BA", min: 85 },
  { harf: "BB", min: 80 },
  { harf: "CB", min: 75 },
  { harf: "CC", min: 70 },
  { harf: "DC", min: 65 },
  { harf: "DD", min: 60 },
  { harf: "FD", min: 50 },
  { harf: "FF", min: 0 },
];

export const VARSAYILAN_BILESENLER: Bilesen[] = [
  { id: "b1", ad: "Vize", agirlik: 40 },
  { id: "b2", ad: "Final", agirlik: 60 },
];

/**
 * Ayracı tüm metne bakarak seçiyoruz, satır satır değil.
 *
 * Neden: virgül hem sütun ayracı hem de Türkçe ondalık ayracı olabiliyor
 * ("85,5"). Sekme veya noktalı virgül varsa onu tercih edip virgülü ondalık
 * ayracı olarak serbest bırakıyoruz; ancak hiçbiri yoksa virgül sütun ayracı
 * olur ve ondalıklar nokta ile yazılmak zorunda kalır.
 */
export function ayracSec(metin: string): {
  ayrac: "sekme" | "noktalı virgül" | "virgül";
  karakter: string;
} {
  if (metin.includes("\t")) return { ayrac: "sekme", karakter: "\t" };
  if (metin.includes(";")) return { ayrac: "noktalı virgül", karakter: ";" };
  return { ayrac: "virgül", karakter: "," };
}

/**
 * Hücreyi sayıya çevir. Virgül sütun ayracı DEĞİLSE ondalık ayracı sayılır.
 * Yüzde işareti ve boşluklar temizlenir. Okunamayan hücre null döner.
 */
export function sayiOku(ham: string, virgulOndalik: boolean): number | null {
  let s = ham.trim().replace(/%/g, "").replace(/\s+/g, "");
  if (s === "") return null;
  if (virgulOndalik) s = s.replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** Satırı hücrelere böl; baştaki/sondaki tırnakları at. */
function hucreler(satir: string, karakter: string): string[] {
  return satir
    .split(karakter)
    .map((h) => h.trim().replace(/^"(.*)"$/, "$1").trim());
}

/**
 * Yapıştırılan tabloyu öğrencilere çevir.
 *
 * Başlık satırı algılaması: ilk satırın ilk sütundan sonraki hücrelerinin
 * hiçbiri sayı değilse o satır başlıktır. "Ad, Vize, Final" başlığı böyle
 * yakalanıyor; "Ali, 70, 80" ise yakalanmıyor.
 */
export function ayristir(metin: string, bilesenSayisi: number): AyristirmaSonucu {
  const { ayrac, karakter } = ayracSec(metin);
  const virgulOndalik = karakter !== ",";
  const satirlar = metin
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const uyarilar: string[] = [];
  if (satirlar.length === 0) {
    return { ogrenciler: [], baslikAtlandi: false, ayrac, uyarilar };
  }

  const ilk = hucreler(satirlar[0], karakter);
  const baslikAtlandi =
    ilk.length > 1 &&
    ilk.slice(1).every((h) => sayiOku(h, virgulOndalik) === null);

  const veri = baslikAtlandi ? satirlar.slice(1) : satirlar;
  const ogrenciler: Ogrenci[] = [];

  veri.forEach((satir, i) => {
    // Kullanıcının gördüğü satır numarası: başlık atlandıysa bir kayıyor.
    const satirNo = i + 1 + (baslikAtlandi ? 1 : 0);
    const h = hucreler(satir, karakter);
    const ad = h[0] ?? "";
    if (ad === "") {
      uyarilar.push(`${satirNo}. satırda öğrenci adı boş — satır atlandı.`);
      return;
    }
    const ham = h.slice(1);
    if (ham.length > bilesenSayisi) {
      uyarilar.push(
        `${satirNo}. satırda (${ad}) ${ham.length} not var, ${bilesenSayisi} bileşen tanımlı — fazlası yok sayıldı.`
      );
    }
    const notlar: (number | null)[] = [];
    for (let k = 0; k < bilesenSayisi; k++) {
      const deger = ham[k] === undefined ? null : sayiOku(ham[k], virgulOndalik);
      if (deger === null) {
        uyarilar.push(
          `${satirNo}. satırda (${ad}) ${k + 1}. bileşen notu okunamadı — 0 sayıldı.`
        );
      }
      notlar.push(deger);
    }
    ogrenciler.push({ ad, notlar });
  });

  return { ogrenciler, baslikAtlandi, ayrac, uyarilar };
}

/**
 * Ağırlıklı ortalama.
 *
 * Payda tanımlı ağırlıkların toplamı — 100 olmasa bile mantıklı bir sonuç
 * çıksın diye. Boş not 0 sayılıyor (ayrıştırma sırasında uyarı veriliyor).
 */
export function agirlikliOrtalama(
  notlar: (number | null)[],
  bilesenler: Bilesen[]
): number {
  const toplamAgirlik = bilesenler.reduce((t, b) => t + b.agirlik, 0);
  if (toplamAgirlik === 0) return 0;
  let toplam = 0;
  bilesenler.forEach((b, i) => {
    toplam += (notlar[i] ?? 0) * b.agirlik;
  });
  return toplam / toplamAgirlik;
}

/** Ölçeği büyükten küçüğe tarayıp ilk eşiği tutturan harfi ver. */
export function harfNotu(puan: number, olcek: HarfKurali[]): string {
  const sirali = [...olcek].sort((a, b) => b.min - a.min);
  for (const k of sirali) if (puan >= k.min) return k.harf;
  return sirali.length > 0 ? sirali[sirali.length - 1].harf : "-";
}

export type CanSonucu = {
  /** Uygulanan doğrusal kaydırma (puan). Eğri kapalıysa 0. */
  kaydirma: number;
  /** Kaydırma öncesi sınıf ortalaması. */
  oncekiOrtalama: number;
  /** Kaydırma + 100 tavanı sonrası gerçekleşen ortalama. */
  sonrakiOrtalama: number;
  /** 100 tavanına takılan öğrenci sayısı — kaydırma neden hedefi tutturmayabilir. */
  tavanaTakilan: number;
};

/** 0–100 aralığına sıkıştır. Kaydırma sonrası 100 üstü notlar sabitlenir. */
function kirp(x: number): number {
  return Math.min(100, Math.max(0, x));
}

/**
 * Tüm hesabı tek yerden yürüt: ortalama → (isteğe bağlı çan) → harf → özet.
 *
 * Çan eğrisi doğrusal kaydırma: her nota (hedef - sınıf ortalaması) eklenir.
 * Dağılımın biçimi bozulmaz, yalnızca merkez taşınır. 100'ü aşanlar 100'e
 * sabitlendiği için gerçekleşen ortalama hedefin biraz altında kalabilir;
 * bunu `tavanaTakilan` ile açıkça bildiriyoruz.
 */
export function hesapla(
  ogrenciler: Ogrenci[],
  bilesenler: Bilesen[],
  olcek: HarfKurali[],
  can: { acik: boolean; hedef: number }
): { satirlar: SatirSonucu[]; ozet: Ozet | null; can: CanSonucu } {
  const hamlar = ogrenciler.map((o) => agirlikliOrtalama(o.notlar, bilesenler));
  const oncekiOrtalama =
    hamlar.length > 0 ? hamlar.reduce((t, x) => t + x, 0) / hamlar.length : 0;

  const kaydirma = can.acik && hamlar.length > 0 ? can.hedef - oncekiOrtalama : 0;
  const sonlar = hamlar.map((x) => (can.acik ? kirp(x + kaydirma) : x));
  const tavanaTakilan = can.acik
    ? hamlar.filter((x) => x + kaydirma > 100).length
    : 0;
  const sonrakiOrtalama =
    sonlar.length > 0 ? sonlar.reduce((t, x) => t + x, 0) / sonlar.length : 0;

  const satirlar: SatirSonucu[] = ogrenciler.map((o, i) => ({
    ad: o.ad,
    notlar: o.notlar,
    hamOrtalama: hamlar[i],
    ortalama: sonlar[i],
    harf: harfNotu(sonlar[i], olcek),
  }));

  let ozet: Ozet | null = null;
  if (satirlar.length > 0) {
    const dagilim: Record<string, number> = {};
    for (const k of olcek) dagilim[k.harf] = 0;
    for (const s of satirlar) dagilim[s.harf] = (dagilim[s.harf] ?? 0) + 1;
    ozet = {
      sinifOrtalamasi: sonrakiOrtalama,
      enYuksek: Math.max(...sonlar),
      enDusuk: Math.min(...sonlar),
      dagilim,
    };
  }

  return {
    satirlar,
    ozet,
    can: { kaydirma, oncekiOrtalama, sonrakiOrtalama, tavanaTakilan },
  };
}

/** Sayıyı Türkçe ondalık ayracıyla, iki basamakla yaz. */
export function bicimle(x: number, basamak = 2): string {
  return x.toFixed(basamak).replace(".", ",");
}

/** CSV hücresi: ayraç, tırnak veya satır sonu varsa tırnak içine al. */
function csvHucre(deger: string): string {
  return /[";\n]/.test(deger) ? `"${deger.replace(/"/g, '""')}"` : deger;
}

/**
 * Excel (Türkçe) uyumlu CSV üret.
 *
 * Ayraç noktalı virgül, ondalık virgül — Türkçe Windows Excel'in beklediği
 * biçim. Başa UTF-8 BOM konuyor; BOM olmadan Excel dosyayı ANSI sanıp
 * "Şükrü" gibi adları bozuyor.
 */
export function csvUret(
  satirlar: SatirSonucu[],
  bilesenler: Bilesen[],
  canAcik: boolean
): string {
  const baslik = [
    "Ad",
    ...bilesenler.map((b) => `${b.ad} (%${b.agirlik})`),
    "Ağırlıklı Ortalama",
    ...(canAcik ? ["Çan Sonrası"] : []),
    "Harf Notu",
  ];
  const govde = satirlar.map((s) => [
    s.ad,
    ...s.notlar.map((n) => (n === null ? "" : bicimle(n))),
    bicimle(s.hamOrtalama),
    ...(canAcik ? [bicimle(s.ortalama)] : []),
    s.harf,
  ]);
  const metin = [baslik, ...govde]
    .map((r) => r.map(csvHucre).join(";"))
    .join("\r\n");
  return `\uFEFF${metin}\r\n`;
}
