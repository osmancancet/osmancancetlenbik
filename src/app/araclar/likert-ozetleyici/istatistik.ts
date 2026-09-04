/**
 * Likert özetleyicinin saf katmanı: ayrıştırma, betimsel istatistik, güvenirlik.
 *
 * Arayüzden ayrı duruyor; çünkü buradaki bir hata makalede yayımlanan sayıyı
 * bozar. Standart sapmanın n mi n-1 mi olduğu, ters kodlamanın alfaya doğru
 * yansıyıp yansımadığı, eksik hücrenin 0 sayılıp sayılmadığı — hepsi bu
 * modülde tek başına çalıştırılıp elle hesapla karşılaştırılabiliyor.
 *
 * İki kural bilinçli: (1) standart sapma örneklem formülüyle (n-1) hesaplanır,
 * çünkü anket verisi evrenin kendisi değil örneklemdir; (2) eksik ya da
 * geçersiz hücre asla 0 sayılmaz, sayılıp kullanıcıya bildirilir — sessizce
 * 0 saymak ortalamayı aşağı çeker ve kimse fark etmez.
 *
 * Derleme hedefi ES2017: gerilemeli bakış (lookbehind) ve `\p{...}` yok.
 */

export type Olcek = { min: number; max: number };

export const OLCEKLER: { anahtar: string; ad: string; olcek: Olcek }[] = [
  { anahtar: "1-5", ad: "1 – 5 (beşli Likert)", olcek: { min: 1, max: 5 } },
  { anahtar: "1-7", ad: "1 – 7 (yedili Likert)", olcek: { min: 1, max: 7 } },
];

/* -------------------------------------------------------------- ayrıştırma */

export type Ayrac = "," | ";" | "\t";

export type HucreSorunu = {
  /** Kullanıcıya gösterilen satır numarası — başlık satırı dahil, 1'den başlar. */
  satir: number;
  /** Madde numarası, 1'den başlar. */
  madde: number;
  ham: string;
  tur: "eksik" | "gecersiz";
};

export type Tablo = {
  basliklar: string[];
  /** Katılımcı × madde. Eksik ya da geçersiz hücreler `null`. */
  veri: (number | null)[][];
  ayrac: Ayrac;
  sorunlar: HucreSorunu[];
};

/**
 * Ayracı ilk dolu satırdan tahmin eder. Sekme ve noktalı virgül önce
 * sınanıyor: Türkçe Excel'in ürettiği dosyalarda ondalık ayracı virgül
 * olduğu için virgüle bakarak karar vermek yanıltıcı olurdu.
 */
export function ayracBul(metin: string): Ayrac {
  const satir = metin.split(/\r?\n/).find((s) => s.trim().length > 0) ?? "";
  const say = (a: string) => satir.split(a).length - 1;
  const adaylar: { ayrac: Ayrac; sayi: number }[] = [
    { ayrac: "\t", sayi: say("\t") },
    { ayrac: ";", sayi: say(";") },
    { ayrac: ",", sayi: say(",") },
  ];
  const en = adaylar.reduce((a, b) => (b.sayi > a.sayi ? b : a));
  return en.sayi > 0 ? en.ayrac : ",";
}

/** Hücredeki sayıyı okur. "3,5" gibi Türkçe ondalık da kabul ediliyor. */
function sayiOku(ham: string): number | null {
  const temiz = ham.trim().replace(",", ".");
  if (!/^[+-]?\d+(\.\d+)?$/.test(temiz)) return null;
  const sayi = Number(temiz);
  return Number.isFinite(sayi) ? sayi : null;
}

/**
 * Yapıştırılan metni tabloya çevirir.
 *
 * Satırların sütun sayısı eşit olmayabiliyor (Excel son boş sütunları
 * kırpıyor); madde sayısı en uzun satıra göre belirleniyor, eksik kalan
 * hücreler "eksik" olarak işaretleniyor.
 */
export function tabloAyristir(
  metin: string,
  basliklarVar: boolean,
  olcek: Olcek
): Tablo {
  const ayrac = ayracBul(metin);
  const satirlar = metin
    .split(/\r?\n/)
    .map((s, i) => ({ ham: s, no: i + 1 }))
    .filter((s) => s.ham.trim().length > 0);

  const baslikSatiri = basliklarVar ? satirlar[0] : undefined;
  const veriSatirlari = basliklarVar ? satirlar.slice(1) : satirlar;

  const sutunSayisi = Math.max(
    baslikSatiri ? baslikSatiri.ham.split(ayrac).length : 0,
    ...veriSatirlari.map((s) => s.ham.split(ayrac).length),
    0
  );

  const basliklar: string[] = [];
  for (let j = 0; j < sutunSayisi; j++) {
    const ad = baslikSatiri?.ham.split(ayrac)[j]?.trim();
    basliklar.push(ad || `Madde ${j + 1}`);
  }

  const sorunlar: HucreSorunu[] = [];
  const veri = veriSatirlari.map((satir) => {
    const hucreler = satir.ham.split(ayrac);
    const cikti: (number | null)[] = [];
    for (let j = 0; j < sutunSayisi; j++) {
      const ham = hucreler[j];
      if (ham === undefined || ham.trim() === "") {
        sorunlar.push({ satir: satir.no, madde: j + 1, ham: ham ?? "", tur: "eksik" });
        cikti.push(null);
        continue;
      }
      const sayi = sayiOku(ham);
      // Ölçek dışındaki değer de geçersiz: 5'lik ölçekte "7" ya çıktı hatası
      // ya da yanlış sütun demektir, ortalamaya katılmamalı.
      if (sayi === null || sayi < olcek.min || sayi > olcek.max) {
        sorunlar.push({ satir: satir.no, madde: j + 1, ham: ham.trim(), tur: "gecersiz" });
        cikti.push(null);
        continue;
      }
      cikti.push(sayi);
    }
    return cikti;
  });

  return { basliklar, veri, ayrac, sorunlar };
}

/* ------------------------------------------------------------- istatistik */

/** Ters kodlama: (min + max) - değer. */
export function tersKodla(deger: number, olcek: Olcek): number {
  return olcek.min + olcek.max - deger;
}

function ortalama(degerler: number[]): number {
  return degerler.reduce((t, d) => t + d, 0) / degerler.length;
}

/**
 * Örneklem varyansı (n-1). Tek gözlemde tanımsız olduğu için null dönüyor;
 * 0 döndürmek "hiç değişkenlik yok" anlamına gelir ve yanlış olur.
 */
function varyans(degerler: number[]): number | null {
  if (degerler.length < 2) return null;
  const ort = ortalama(degerler);
  const kareler = degerler.reduce((t, d) => t + (d - ort) * (d - ort), 0);
  return kareler / (degerler.length - 1);
}

function medyan(degerler: number[]): number {
  const s = degerler.slice().sort((a, b) => a - b);
  const orta = Math.floor(s.length / 2);
  return s.length % 2 === 1 ? s[orta] : (s[orta - 1] + s[orta]) / 2;
}

/** Mod birden çok olabilir; hepsi döndürülüyor (çok modlu dağılım gizlenmesin). */
function mod(degerler: number[]): number[] {
  const sayac = new Map<number, number>();
  for (const d of degerler) sayac.set(d, (sayac.get(d) ?? 0) + 1);
  let enCok = 0;
  sayac.forEach((v) => {
    if (v > enCok) enCok = v;
  });
  const cikti: number[] = [];
  sayac.forEach((v, k) => {
    if (v === enCok) cikti.push(k);
  });
  return cikti.sort((a, b) => a - b);
}

export type DagilimDilimi = { deger: number; sayi: number; yuzde: number };

export type MaddeOzeti = {
  indis: number;
  baslik: string;
  ters: boolean;
  n: number;
  eksik: number;
  ortalama: number | null;
  ss: number | null;
  medyan: number | null;
  mod: number[];
  dagilim: DagilimDilimi[];
};

export type Ozet = {
  maddeler: MaddeOzeti[];
  katilimci: number;
  maddeSayisi: number;
  /** Tüm geçerli yanıtların ortalaması. */
  olcekOrtalamasi: number | null;
  alfa: number | null;
  /** Alfanın hesaplandığı, hiçbir maddesi eksik olmayan satır sayısı. */
  alfaKatilimci: number;
  /** Alfa hesaplanamadıysa nedeni — arayüz bunu olduğu gibi gösteriyor. */
  alfaNotu?: string;
  eksikSayisi: number;
  gecersizSayisi: number;
  sorunlar: HucreSorunu[];
};

/**
 * Cronbach alfa: α = k/(k-1) × (1 − Σσᵢ² / σₜ²).
 *
 * Yalnızca hiçbir maddesi boş olmayan satırlar kullanılıyor (liste bazlı
 * silme). Eksik hücreyi ortalamayla doldurmak varyansı yapay olarak düşürür
 * ve alfayı olduğundan yüksek gösterir; kaç satırla hesaplandığı ayrıca
 * bildiriliyor.
 */
export function cronbachAlfa(
  tamSatirlar: number[][]
): { alfa: number | null; not?: string } {
  const k = tamSatirlar[0]?.length ?? 0;
  if (k < 2) return { alfa: null, not: "Alfa için en az iki madde gerekir." };
  if (tamSatirlar.length < 2)
    return {
      alfa: null,
      not: "Alfa için tüm maddeleri dolu en az iki katılımcı gerekir.",
    };

  let maddeVaryansToplami = 0;
  for (let j = 0; j < k; j++) {
    const sutun = tamSatirlar.map((s) => s[j]);
    const v = varyans(sutun);
    if (v === null) return { alfa: null, not: "Madde varyansı hesaplanamadı." };
    maddeVaryansToplami += v;
  }

  const toplamlar = tamSatirlar.map((s) => s.reduce((t, d) => t + d, 0));
  const toplamVaryans = varyans(toplamlar);
  if (toplamVaryans === null || toplamVaryans === 0)
    return {
      alfa: null,
      not: "Toplam puanların varyansı sıfır; alfa tanımsız.",
    };

  const alfa = (k / (k - 1)) * (1 - maddeVaryansToplami / toplamVaryans);
  return { alfa };
}

/**
 * Tabloyu özetler. `tersMaddeler` madde numaralarını (1'den başlayarak)
 * tutuyor; ters kodlama hem madde istatistiklerine hem alfaya yansıyor.
 */
export function ozetle(
  tablo: Tablo,
  olcek: Olcek,
  tersMaddeler: Set<number>
): Ozet {
  const maddeSayisi = tablo.basliklar.length;
  const secenekler: number[] = [];
  for (let d = olcek.min; d <= olcek.max; d++) secenekler.push(d);

  // Ters kodlama bir kez uygulanıp hem maddelere hem alfaya aynı veriden
  // gidiliyor; iki ayrı yerde kodlamak tutarsızlık riski taşırdı.
  const kodlu = tablo.veri.map((satir) =>
    satir.map((deger, j) =>
      deger === null
        ? null
        : tersMaddeler.has(j + 1)
          ? tersKodla(deger, olcek)
          : deger
    )
  );

  const maddeler: MaddeOzeti[] = [];
  for (let j = 0; j < maddeSayisi; j++) {
    const sutun = kodlu.map((s) => s[j]);
    const gecerli = sutun.filter((d): d is number => d !== null);
    const v = varyans(gecerli);
    const dagilim = secenekler.map((deger) => {
      const sayi = gecerli.filter((d) => d === deger).length;
      return {
        deger,
        sayi,
        yuzde: gecerli.length ? (sayi / gecerli.length) * 100 : 0,
      };
    });
    maddeler.push({
      indis: j + 1,
      baslik: tablo.basliklar[j],
      ters: tersMaddeler.has(j + 1),
      n: gecerli.length,
      eksik: sutun.length - gecerli.length,
      ortalama: gecerli.length ? ortalama(gecerli) : null,
      ss: v === null ? null : Math.sqrt(v),
      medyan: gecerli.length ? medyan(gecerli) : null,
      mod: gecerli.length ? mod(gecerli) : [],
      dagilim,
    });
  }

  const tumGecerli = kodlu.reduce<number[]>(
    (t, s) => t.concat(s.filter((d): d is number => d !== null)),
    []
  );
  const tamSatirlar = kodlu.filter((s): s is number[] =>
    s.every((d) => d !== null)
  );
  const { alfa, not } = cronbachAlfa(tamSatirlar);

  return {
    maddeler,
    katilimci: tablo.veri.length,
    maddeSayisi,
    olcekOrtalamasi: tumGecerli.length ? ortalama(tumGecerli) : null,
    alfa,
    alfaKatilimci: tamSatirlar.length,
    alfaNotu: not,
    eksikSayisi: tablo.sorunlar.filter((s) => s.tur === "eksik").length,
    gecersizSayisi: tablo.sorunlar.filter((s) => s.tur === "gecersiz").length,
    sorunlar: tablo.sorunlar,
  };
}

/* -------------------------------------------------------------------- CSV */

/** Türkçe Excel ondalık ayracı virgül; sayılar buna göre biçimleniyor. */
export function trSayi(deger: number | null, basamak = 2): string {
  if (deger === null || !Number.isFinite(deger)) return "";
  return deger.toFixed(basamak).replace(".", ",");
}

/** Ayraç ya da tırnak içeren alanlar CSV kuralına göre tırnaklanıyor. */
function csvAlan(deger: string): string {
  return /[";\n]/.test(deger) ? '"' + deger.replace(/"/g, '""') + '"' : deger;
}

/**
 * Türkçe Excel için CSV: ayraç `;`, ondalık `,`.
 * Başına UTF-8 BOM ekleniyor — yoksa Excel Türkçe harfleri bozuk gösteriyor.
 */
export function csvUret(ozet: Ozet, olcek: Olcek): string {
  const secenekler: number[] = [];
  for (let d = olcek.min; d <= olcek.max; d++) secenekler.push(d);

  const basliklar = [
    "Madde no",
    "Madde",
    "Ters kodlu",
    "n",
    "Eksik/geçersiz",
    "Ortalama",
    "Std. sapma (n-1)",
    "Medyan",
    "Mod",
    ...secenekler.map((d) => `${d} (sayı)`),
    ...secenekler.map((d) => `${d} (%)`),
  ];

  const satirlar = ozet.maddeler.map((m) =>
    [
      String(m.indis),
      m.baslik,
      m.ters ? "Evet" : "Hayır",
      String(m.n),
      String(m.eksik),
      trSayi(m.ortalama),
      trSayi(m.ss),
      trSayi(m.medyan),
      m.mod.map((d) => trSayi(d, 0)).join(" / "),
      ...m.dagilim.map((d) => String(d.sayi)),
      ...m.dagilim.map((d) => trSayi(d.yuzde, 1)),
    ].map(csvAlan)
  );

  const genel = [
    [],
    ["Katılımcı sayısı", String(ozet.katilimci)],
    ["Madde sayısı", String(ozet.maddeSayisi)],
    ["Ölçek ortalaması", trSayi(ozet.olcekOrtalamasi)],
    [
      "Cronbach alfa",
      ozet.alfa === null ? (ozet.alfaNotu ?? "hesaplanamadı") : trSayi(ozet.alfa, 3),
    ],
    ["Alfaya giren katılımcı", String(ozet.alfaKatilimci)],
    ["Eksik hücre", String(ozet.eksikSayisi)],
    ["Geçersiz hücre", String(ozet.gecersizSayisi)],
  ].map((s) => s.map(csvAlan));

  const govde = [basliklar.map(csvAlan), ...satirlar, ...genel]
    .map((s) => s.join(";"))
    .join("\r\n");
  return "\uFEFF" + govde + "\r\n";
}
