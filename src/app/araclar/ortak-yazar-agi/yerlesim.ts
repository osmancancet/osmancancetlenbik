import type { AgVerisi } from "@/lib/openalex";

/**
 * Ortak yazar ağının görsel yerleşimi (saf hesap, çizim yok).
 *
 * Tek halkalı ego ağı: ortada kişi, çevrede en sık birlikte yazdığı N kişi.
 * Kuvvet yönelimli yerleşim yerine halka seçildi, çünkü görsel sunucuda tek
 * seferde üretiliyor ve etiketlerin çakışmaması halkada garanti. Halkadaki
 * sıra rastgele değil: birbiriyle de yazmış kişiler yan yana dizilsin diye
 * açgözlü bir zincir kuruluyor — böylece araştırma grupları görselde kendi
 * kümesini oluşturuyor.
 */

export type YerlesikDugum = {
  ad: string;
  kisaAd: string;
  sayi: number;
  x: number;
  y: number;
  r: number;
  /** Etiketin düğüme göre yönü. */
  hiza: "sol" | "sag" | "ust" | "alt";
};

export type YerlesikBag = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  kalinlik: number;
  merkez: boolean;
};

export type Yerlesim = {
  dugumler: YerlesikDugum[];
  baglar: YerlesikBag[];
  merkez: { x: number; y: number; r: number };
  /** Halkaya sığmayan ortak yazar sayısı. */
  kalan: number;
};

/** "Melda Alkan Çakıroğlu" → sığmadıkça "M. A. Çakıroğlu" → "M. Çakıroğlu". */
export function kisaAd(ad: string, sinir: number) {
  if (ad.length <= sinir) return ad;
  const parcalar = ad.split(/\s+/).filter(Boolean);
  if (parcalar.length < 2) return ad.slice(0, sinir - 1) + "…";
  const soyad = parcalar[parcalar.length - 1];
  const bas = (p: string) => p[0].toLocaleUpperCase("tr-TR") + ".";
  const adaylar = [
    [...parcalar.slice(0, -1).map(bas), soyad].join(" "),
    `${bas(parcalar[0])} ${soyad}`,
  ];
  const sigan = adaylar.find((k) => k.length <= sinir);
  return sigan ?? adaylar[1].slice(0, sinir - 1) + "…";
}

/** Birbiriyle en güçlü bağı olanları art arda dizer. */
function halkaSirasi(n: number, agirlik: (a: number, b: number) => number) {
  if (n === 0) return [];
  const sira = [0];
  const kalan = new Set(Array.from({ length: n - 1 }, (_, i) => i + 1));
  while (kalan.size) {
    const son = sira[sira.length - 1];
    let en = -1;
    let enAgirlik = -1;
    // Eşitlikte küçük dizin (daha sık ortak yazar) kazanıyor.
    for (const i of kalan) {
      const w = agirlik(son, i);
      if (w > enAgirlik) {
        en = i;
        enAgirlik = w;
      }
    }
    sira.push(en);
    kalan.delete(en);
  }
  return sira;
}

export function yerlesimHesapla(
  v: AgVerisi,
  secenek: {
    cx: number;
    cy: number;
    yaricap: number;
    enFazla: number;
    merkezR: number;
    dugumMin: number;
    dugumMax: number;
    adSiniri: number;
  }
): Yerlesim {
  const { cx, cy, yaricap, enFazla, merkezR, dugumMin, dugumMax, adSiniri } =
    secenek;
  const secilen = v.ortakYazarlar.slice(0, enFazla);
  const n = secilen.length;
  const enCok = Math.max(1, ...secilen.map((d) => d.sayi));

  const agirliklar = new Map<string, number>();
  for (const b of v.baglar) {
    if (b.a < n && b.b < n) agirliklar.set(`${b.a}-${b.b}`, b.sayi);
  }
  const agirlik = (a: number, b: number) =>
    agirliklar.get(a < b ? `${a}-${b}` : `${b}-${a}`) ?? 0;

  const sira = halkaSirasi(n, agirlik);
  // İki kişilik ağda düğümler sağda-solda dursun; diğerlerinde ilk düğüm tepede.
  const baslangic = n === 2 ? 0 : -Math.PI / 2;

  const konum = new Map<number, { x: number; y: number; aci: number }>();
  sira.forEach((dizin, i) => {
    const aci = baslangic + (2 * Math.PI * i) / Math.max(n, 1);
    konum.set(dizin, {
      x: cx + yaricap * Math.cos(aci),
      y: cy + yaricap * Math.sin(aci),
      aci,
    });
  });

  const dugumler: YerlesikDugum[] = secilen.map((d, i) => {
    const k = konum.get(i)!;
    const cos = Math.cos(k.aci);
    const sin = Math.sin(k.aci);
    const hiza =
      Math.abs(cos) > 0.35 ? (cos > 0 ? "sag" : "sol") : sin < 0 ? "ust" : "alt";
    return {
      ad: d.ad,
      kisaAd: kisaAd(d.ad, adSiniri),
      sayi: d.sayi,
      x: k.x,
      y: k.y,
      r: dugumMin + (dugumMax - dugumMin) * Math.sqrt(d.sayi / enCok),
      hiza,
    };
  });

  const kalinlik = (sayi: number) => 2 + 7 * (sayi / enCok);
  const baglar: YerlesikBag[] = [];
  for (const b of v.baglar) {
    if (b.a >= n || b.b >= n) continue;
    const p = konum.get(b.a)!;
    const q = konum.get(b.b)!;
    baglar.push({
      x1: p.x,
      y1: p.y,
      x2: q.x,
      y2: q.y,
      kalinlik: Math.max(1.5, kalinlik(b.sayi) * 0.6),
      merkez: false,
    });
  }
  for (const d of dugumler) {
    baglar.push({
      x1: cx,
      y1: cy,
      x2: d.x,
      y2: d.y,
      kalinlik: kalinlik(d.sayi),
      merkez: true,
    });
  }

  return {
    dugumler,
    baglar,
    merkez: { x: cx, y: cy, r: merkezR },
    kalan: Math.max(0, v.ortakYazarSayisi - n),
  };
}

/** Merkez düğümün içine yazılan baş harfler. */
export function basHarfler(ad: string) {
  const p = ad.split(/\s+/).filter(Boolean);
  const harfler = p.length > 1 ? [p[0], p[p.length - 1]] : p;
  return harfler.map((s) => s[0].toLocaleUpperCase("tr-TR")).join("");
}
