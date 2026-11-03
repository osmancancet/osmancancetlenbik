/**
 * ÜAK doçentlik başvuru şartları — 2026 Mart dönemi tabloları.
 *
 * Kaynak: uak.gov.tr/page/docentlik-basvuru-sartlari (Tablo 1–13 PDF'leri).
 * Güzel Sanatlar tablosu (Tablo 4) sanatsal etkinlik ağırlıklı ve yapısı
 * bambaşka olduğu için burada yok; kullanıcı ÜAK belgesine yönlendiriliyor.
 *
 * Ortak iskelet 13 madde; alanlar arasında değişenler: yazar payı kuralı,
 * madde tavanları, birkaç bent puanı ve asgari koşullar. Bu yüzden her alan
 * ortak yapıcılarla kurulup yalnızca farkları veriyor. Tablolar her dönem
 * güncellenebiliyor; yeni dönemde sadece bu dosya değişmeli.
 */

export const DONEM = "2026 Mart";
export const KAYNAK_URL =
  "https://www.uak.gov.tr/page/docentlik-basvuru-sartlari-kLPHX";

/** Satırdaki girdi alanlarını belirler. */
export type SatirTipi =
  | "makale" // yazar sayısı + başlıca yazar rolü
  | "esit" // yazar sayısı, puan eşit bölünür
  | "adet" // yalnızca adet
  | "danismanlik" // adet + eş danışman
  | "kisi"; // kişi sayısına bölünür (patent)

export type Bent = { kod: string; ad: string; puan: number };

export type Madde = {
  no: number;
  ad: string;
  tip: SatirTipi;
  bentler: Bent[];
  /** Maddeden alınabilecek en fazla puan. */
  tavan?: number;
  /** Belirli bentlerin toplamına uygulanan ek tavan. */
  altTavanlar?: { kodlar: string[]; tavan: number; not: string }[];
  /** 3. madde: doktora sonrası şartına girmez, soru da sorulmaz. */
  drSorulmaz?: boolean;
  notlar?: string[];
};

export type Rol = "baslica" | "diger" | "belirsiz";

export type Kayit = {
  id: string;
  maddeNo: number;
  bentKod: string;
  adet: number;
  yazarSayisi: number;
  rol: Rol;
  drSonrasi: boolean;
  esDanisman: boolean;
};

/** Koşul kontrolleri hesaplanmış kayıtlar üzerinden bakıyor. */
export type HesaplananKayit = Kayit & { bent: Bent; madde: Madde; puan: number };

export type Bakis = {
  kayitlar: HesaplananKayit[];
  altSecenek: string | null;
  /** Doktora sonrası kayıtların ham puan toplamı (bent süzgeciyle). */
  drPuan: (maddeNo: number, kodlar?: string[]) => number;
  /** Doktora sonrası kayıt adedi (bent süzgeci + ek şart). */
  drSayi: (
    maddeNo: number,
    kodlar?: string[],
    sart?: (k: HesaplananKayit) => boolean
  ) => number;
  /** Tüm kayıtlar için adet (3. madde gibi doktora şartı olmayanlar). */
  sayi: (maddeNo: number, kodlar?: string[]) => number;
};

export type KosulSonucu = { saglandi: boolean; durum: string };

export type Kosul = {
  id: string;
  maddeNo: number;
  metin: string;
  /** Araç doğrulayamıyorsa (ör. "farklı dergilerde") kullanıcıya not düşer. */
  elleKontrol?: string;
  kontrol: (b: Bakis) => KosulSonucu;
};

export type TemelAlan = {
  id: string;
  ad: string;
  tabloNo: number;
  yazarKurali: "kademeli" | "esit";
  /** Sağlık'ta "doktora" yerine "doktora/uzmanlık" deniyor. */
  unvan: string;
  altSecenekler?: {
    etiket: string;
    secenekler: { id: string; ad: string }[];
  };
  maddeler: Madde[];
  kosullar: Kosul[];
};

export const TOPLAM_ASGARI = 100;
export const DR_SONRASI_ASGARI = 90;

/* ---------- Ortak yapıcılar ---------- */

const Q = (puan: number[]): Bent[] => [
  { kod: "1a1", ad: "a) SCIE/SSCI dergide makale — Q1", puan: puan[0] },
  { kod: "1a2", ad: "a) SCIE/SSCI dergide makale — Q2", puan: puan[1] },
  { kod: "1a3", ad: "a) SCIE/SSCI dergide makale — Q3", puan: puan[2] },
  { kod: "1a4", ad: "a) SCIE/SSCI dergide makale — Q4", puan: puan[3] },
];
export const Q123 = ["1a1", "1a2", "1a3"];
export const Q1234 = [...Q123, "1a4"];

function m1(o: { cAd?: string; ekBentler?: Bent[] } = {}): Madde {
  return {
    no: 1,
    ad: "Uluslararası Makale",
    tip: "makale",
    bentler: [
      ...Q([30, 20, 15, 10]),
      { kod: "1b", ad: "b) AHCI dergide makale", puan: 20 },
      { kod: "1c", ad: o.cAd ?? "c) ESCI veya Scopus dergide makale", puan: 10 },
      { kod: "1d", ad: "d) Diğer uluslararası indeksli dergide makale", puan: 5 },
      {
        kod: "1e",
        ad: "e) a–d dergilerinde editöre mektup, araştırma notu, özet, kitap kritiği",
        puan: 3,
      },
      ...(o.ekBentler ?? []),
    ],
    notlar: ["Lisansüstü tezlerden üretilmiş makaleler burada değil, 3. maddede puanlanır."],
  };
}

function m2(): Madde {
  return {
    no: 2,
    ad: "Ulusal Makale",
    tip: "makale",
    bentler: [
      { kod: "2a", ad: "a) TR Dizin dergide makale", puan: 10 },
      { kod: "2b", ad: "b) Diğer hakemli dergide makale", puan: 4 },
      {
        kod: "2c",
        ad: "c) Hakemli dergide editöre mektup, araştırma notu, özet, kitap kritiği",
        puan: 2,
      },
    ],
  };
}

function m3(o: {
  c?: number;
  d?: number;
  g?: number;
  h?: number;
  i1?: number;
  ghTavan?: number;
  scopusKitap?: boolean;
}): Madde {
  const kitap = o.scopusKitap ? "BKCI/Scopus" : "BKCI";
  return {
    no: 3,
    ad: "Lisansüstü Tezlerden Üretilmiş Yayın",
    tip: "esit",
    drSorulmaz: true,
    tavan: 20,
    bentler: [
      { kod: "3a", ad: "a) SCIE/SSCI/AHCI dergide makale", puan: 20 },
      { kod: "3b", ad: "b) ESCI veya Scopus dergide makale", puan: 10 },
      { kod: "3c", ad: "c) Diğer uluslararası indeksli dergide makale", puan: o.c ?? 5 },
      { kod: "3d", ad: "d) TR Dizin dergide makale", puan: o.d ?? 8 },
      { kod: "3e", ad: `e) ${kitap} kapsamında kitap`, puan: 20 },
      { kod: "3f", ad: `f) ${kitap} kapsamında kitapta bölüm`, puan: 10 },
      { kod: "3g", ad: "g) Diğer uluslararası/ulusal kitap", puan: o.g ?? 5 },
      { kod: "3h", ad: "h) Diğer uluslararası/ulusal kitapta bölüm", puan: o.h ?? 3 },
      { kod: "3i", ad: "ı) Uluslararası toplantı — CPCI'da yayımlanmış", puan: o.i1 ?? 3 },
      { kod: "3j", ad: "i) Diğer uluslararası/ulusal toplantıda yayımlanmış", puan: 2 },
    ],
    altTavanlar: o.ghTavan
      ? [{ kodlar: ["3g", "3h"], tavan: o.ghTavan, not: `g ve h toplamı en fazla ${o.ghTavan}` }]
      : undefined,
    notlar: [
      "Bu maddenin puanı doktora sonrası 90 puan şartına sayılmaz.",
      "a–h bentlerinden en az bir yayın zorunludur.",
    ],
  };
}

function m4(o: {
  c?: number;
  d?: number;
  e?: Bent;
  tavan?: number;
  altTavan: number;
  altKodlar?: string[];
  scopusKitap?: boolean;
  notlar?: string[];
}): Madde {
  const kitap = o.scopusKitap ? "BKCI/Scopus" : "BKCI";
  const altKodlar = o.altKodlar ?? ["4c", "4d"];
  return {
    no: 4,
    ad: "Kitap",
    tip: "esit",
    tavan: o.tavan,
    bentler: [
      { kod: "4a", ad: `a) ${kitap} kapsamında kitap`, puan: 20 },
      { kod: "4b", ad: `b) ${kitap} kapsamında kitapta bölüm`, puan: 10 },
      { kod: "4c", ad: "c) Diğer uluslararası/ulusal kitap", puan: o.c ?? 5 },
      { kod: "4d", ad: "d) Diğer uluslararası/ulusal kitapta bölüm", puan: o.d ?? 3 },
      ...(o.e ? [o.e] : []),
    ],
    altTavanlar: [
      {
        kodlar: altKodlar,
        tavan: o.altTavan,
        not: `${altKodlar.map((k) => k.slice(1)).join(", ")} bentleri toplamı en fazla ${o.altTavan}`,
      },
    ],
    notlar: [
      "Ders kitabı puanlanmaz; aynı kitaptan yalnızca bir bölüm puanlanır.",
      ...(o.notlar ?? []),
    ],
  };
}

function m5(o: { sportDiscus?: boolean } = {}): Madde {
  return {
    no: 5,
    ad: "Atıf",
    tip: "adet",
    tavan: 10,
    bentler: [
      {
        kod: "5a",
        ad: `a) SCIE/SSCI/AHCI/ESCI/Scopus${o.sportDiscus ? "/SPORT Discus" : ""} kapsamında atıf`,
        puan: 3,
      },
      { kod: "5b", ad: "b) BKCI kitapta atıf", puan: 2 },
      { kod: "5c", ad: "c) TR Dizin dergide atıf", puan: 2 },
      { kod: "5d", ad: "d) Diğer kitap/dergide atıf", puan: 1 },
    ],
    notlar: [
      "Kendi eserlerinize yaptığınız atıflar sayılmaz; aynı yayındaki birden fazla atıf tek atıftır.",
    ],
  };
}

function m6(): Madde {
  return {
    no: 6,
    ad: "Lisansüstü Tez Danışmanlığı",
    tip: "danismanlik",
    tavan: 10,
    bentler: [
      { kod: "6a", ad: "a) Tamamlanmış doktora tezi", puan: 5 },
      { kod: "6b", ad: "b) Tamamlanmış yüksek lisans tezi", puan: 3 },
    ],
    notlar: ["İkinci/eş danışman puanın yarısını alır."],
  };
}

function m7(tavan: number): Madde {
  return {
    no: 7,
    ad: "Bilimsel Araştırma Projesi",
    tip: "adet",
    tavan,
    bentler: [
      { kod: "7a1", ad: "a) AB Çerçeve/TÜBİTAK projesi — koordinatör/yürütücü", puan: 15 },
      { kod: "7a2", ad: "a) AB Çerçeve/TÜBİTAK projesi — araştırmacı", puan: 10 },
      { kod: "7a3", ad: "a) AB Çerçeve/TÜBİTAK projesi — danışman", puan: 5 },
      { kod: "7b", ad: "b) Uluslararası destekli proje — yürütücü/araştırmacı/danışman", puan: 10 },
      { kod: "7c", ad: "c) Kamu/özel kuruluşla Ar-Ge/Ür-Ge projesi", puan: 5 },
      { kod: "7d", ad: "d) Üniversite BAP projesi — yürütücü", puan: 3 },
    ],
    notlar: ["Yalnızca başarıyla tamamlanmış projeler; öğrenci ve tez projeleri hariç."],
  };
}

function m8(notlar: string[] = []): Madde {
  return {
    no: 8,
    ad: "Bilimsel Toplantı",
    tip: "esit",
    tavan: 10,
    bentler: [
      { kod: "8a", ad: "a) Uluslararası toplantı — CPCI'da yayımlanmış", puan: 5 },
      { kod: "8b", ad: "b) Diğer uluslararası/ulusal toplantıda yayımlanmış", puan: 3 },
    ],
    notlar: ["Aynı toplantıda sunulan en fazla bir çalışma puanlanır.", ...notlar],
  };
}

function m9(): Madde {
  return {
    no: 9,
    ad: "Eğitim-Öğretim",
    tip: "adet",
    tavan: 6,
    bentler: [
      { kod: "9a", ad: "a) Dönemlik programda dört farklı yarıyılda ders", puan: 2 },
      { kod: "9b", ad: "b) Yıllık programda iki farklı yılda ders", puan: 2 },
      {
        kod: "9k",
        ad: "Doktora sonrası en az 2 yıl kadrolu öğretim elemanı (2 puan sayılır)",
        puan: 2,
      },
    ],
  };
}

function m10(): Madde {
  return {
    no: 10,
    ad: "Patent / Faydalı Model",
    tip: "kisi",
    bentler: [
      { kod: "10a", ad: "a) Tescilli uluslararası patent", puan: 20 },
      { kod: "10b", ad: "b) Tescilli ulusal patent", puan: 10 },
      { kod: "10c", ad: "c) Tescilli faydalı model", puan: 5 },
      { kod: "10d", ad: "d) Kişisel patent başvurusu", puan: 2 },
    ],
    notlar: ["Puan kişi sayısına bölünür."],
  };
}

function m11(): Madde {
  return {
    no: 11,
    ad: "Ödül",
    tip: "adet",
    tavan: 25,
    bentler: [
      { kod: "11a", ad: "a) YÖK Yılın Doktora Tezi Ödülü", puan: 25 },
      { kod: "11b", ad: "b) YÖK Üstün Başarı Ödülü", puan: 25 },
      { kod: "11c", ad: "c) TÜBİTAK Bilim Ödülü", puan: 25 },
      { kod: "11d", ad: "d) TÜBİTAK Teşvik Ödülü (UBYT hariç)", puan: 25 },
      { kod: "11e", ad: "e) TÜBA GEBİP Ödülü", puan: 25 },
      { kod: "11f", ad: "f) TÜBA TESEP Ödülü", puan: 25 },
    ],
  };
}

function m12(): Madde {
  return {
    no: 12,
    ad: "Editörlük",
    tip: "adet",
    tavan: 4,
    bentler: [
      { kod: "12a", ad: "a) SCIE/SSCI/AHCI/ESCI/Scopus dergide editörlük", puan: 2 },
      { kod: "12b", ad: "b) BKCI/Scopus kitapta editörlük", puan: 1 },
      { kod: "12c", ad: "c) TR Dizin dergide editörlük", puan: 1 },
    ],
  };
}

function mDiger(no: number, o: { ek?: Bent[]; tavan?: number; notlar?: string[] } = {}): Madde {
  return {
    no,
    ad: "Diğer",
    tip: "adet",
    tavan: o.tavan ?? 10,
    bentler: [
      { kod: `${no}a`, ad: "a) Web of Science h-indeksi en az 5", puan: 5 },
      {
        kod: `${no}b`,
        ad: "b) İlk 300 üniversitede kesintisiz 6 ay yurt dışı araştırma/öğretim",
        puan: 5,
      },
      ...(o.ek ?? []),
    ],
    notlar: o.notlar,
  };
}

/* ---------- Ortak koşullar ---------- */

const puanKosulu = (
  id: string,
  maddeNo: number,
  metin: string,
  kodlar: string[] | undefined,
  hedef: number
): Kosul => ({
  id,
  maddeNo,
  metin,
  kontrol: (b) => {
    const p = b.drPuan(maddeNo, kodlar);
    return { saglandi: p >= hedef, durum: `${yuvarla(p)} / ${hedef} puan` };
  },
});

const k3: Kosul = {
  id: "m3-bir-yayin",
  maddeNo: 3,
  metin: "Tezden üretilmiş en az bir yayın (a–h bentleri)",
  kontrol: (b) => {
    const n = b.sayi(3, ["3a", "3b", "3c", "3d", "3e", "3f", "3g", "3h"]);
    return { saglandi: n >= 1, durum: `${n} yayın` };
  },
};

const k5 = (unvan: string) =>
  puanKosulu("m5-atif", 5, `${unvan} sonrası yayınlardan en az 5 atıf puanı`, undefined, 5);

const k8 = (unvan: string, ekMetin = "") =>
  puanKosulu(
    "m8-toplanti",
    8,
    `${unvan} sonrası bilimsel toplantılardan en az 5 puan${ekMetin}`,
    undefined,
    5
  );

const k9 = puanKosulu("m9-egitim", 9, "Eğitim-öğretimden en az 2 puan", undefined, 2);

const ortakKosullar = (unvan: string, m8Ek = "") => [k3, k5(unvan), k8(unvan, m8Ek), k9];

const baslica = (k: HesaplananKayit) => k.rol === "baslica" || k.yazarSayisi === 1;
const tekYazar = (k: HesaplananKayit) => k.yazarSayisi === 1;

export function yuvarla(n: number) {
  return Math.round(n * 100) / 100;
}

/** Sosyal/Filoloji/Hukuk/İlahiyat'taki "ulusal ya da alternatif uluslararası" koşulu. */
function ulusalVeyaUluslararasi(o: {
  ulusalAdet: number;
  ulusalTek: number;
  ulusalPuan?: number;
  farkliDergi: number;
  altAdet: number;
  altTek: number;
  altPuan?: number;
  altKodlar: string[];
}): Kosul {
  const altHarf = o.altKodlar.includes("1c") ? "a, b veya c" : "a veya b";
  return {
    id: "m2-ulusal-alt",
    maddeNo: 2,
    metin:
      `Doktora sonrası TR Dizin'de en az ${o.ulusalAdet} makale (${o.ulusalTek}'ü tek yazarlı, ${o.farkliDergi}'ü farklı dergilerde)` +
      (o.ulusalPuan ? ` ve 2. maddeden en az ${o.ulusalPuan} puan` : "") +
      ` — sağlanamazsa 1. maddenin ${altHarf} bentlerinden en az ${o.altAdet} yayın (biri tek yazarlı)` +
      (o.altPuan ? ` ve en az ${o.altPuan} puan` : ""),
    elleKontrol: "Farklı dergi şartını araç denetleyemez; kendiniz kontrol edin.",
    kontrol: (b) => {
      const ulusal = b.drSayi(2, ["2a"]);
      const ulusalTekli = b.drSayi(2, ["2a"], tekYazar);
      const ulusalPuan = b.drPuan(2);
      const ulusalOk =
        ulusal >= o.ulusalAdet &&
        ulusalTekli >= o.ulusalTek &&
        (o.ulusalPuan === undefined || ulusalPuan >= o.ulusalPuan);

      const alt = b.drSayi(1, o.altKodlar);
      const altTekli = b.drSayi(1, o.altKodlar, tekYazar);
      const altPuan = b.drPuan(1, o.altKodlar);
      const altOk =
        alt >= o.altAdet &&
        altTekli >= o.altTek &&
        (o.altPuan === undefined || altPuan >= o.altPuan);

      return {
        saglandi: ulusalOk || altOk,
        durum: `TR Dizin: ${ulusal} makale (${ulusalTekli} tek yazarlı${
          o.ulusalPuan ? `, ${yuvarla(ulusalPuan)} puan` : ""
        }) · Alternatif: ${alt} yayın (${altTekli} tek yazarlı${
          o.altPuan ? `, ${yuvarla(altPuan)} puan` : ""
        })`,
      };
    },
  };
}

/* ---------- Temel alanlar ---------- */

const DR = "Doktora";

export const TEMEL_ALANLAR: TemelAlan[] = [
  {
    id: "muhendislik",
    ad: "Mühendislik",
    tabloNo: 9,
    yazarKurali: "kademeli",
    unvan: DR,
    maddeler: [
      m1(),
      m2(),
      m3({ i1: 5 }),
      m4({ tavan: 20, altTavan: 5 }),
      m5(),
      m6(),
      m7(30),
      m8(),
      m9(),
      m10(),
      m11(),
      m12(),
      mDiger(13),
    ],
    kosullar: [
      {
        id: "m1-40",
        maddeNo: 1,
        metin:
          "Doktora sonrası SCIE/SSCI (a bendi) makalelerden en az 40 puan; Q1–Q3 makalelerden en az birinde başlıca yazar",
        kontrol: (b) => {
          const p = b.drPuan(1, Q1234);
          const bas = b.drSayi(1, Q123, baslica);
          return {
            saglandi: p >= 40 && bas >= 1,
            durum: `${yuvarla(p)} / 40 puan · ${bas} başlıca yazarlı Q1–Q3 makale`,
          };
        },
      },
      puanKosulu("m2-10", 2, "Doktora sonrası TR Dizin makalelerden en az 10 puan", ["2a"], 10),
      ...ortakKosullar(DR),
    ],
  },
  {
    id: "fen",
    ad: "Fen Bilimleri ve Matematik",
    tabloNo: 2,
    yazarKurali: "kademeli",
    unvan: DR,
    altSecenekler: {
      etiket: "Bilim alanı",
      secenekler: [
        { id: "dogal", ad: "Biyoloji, Fizik, Kimya, Moleküler Biyoloji ve Genetik" },
        { id: "mat", ad: "Matematik, İstatistik" },
      ],
    },
    maddeler: [
      m1(),
      m2(),
      m3({}),
      m4({ tavan: 20, altTavan: 5 }),
      m5(),
      m6(),
      m7(30),
      m8(),
      m9(),
      m10(),
      m11(),
      m12(),
      mDiger(13),
    ],
    kosullar: [
      {
        id: "m1-fen",
        maddeNo: 1,
        metin:
          "Doktora sonrası SCIE/SSCI makalelerden en az 40 puan (Matematik/İstatistik: 20); Q1–Q3'te en az bir başlıca yazarlı makale",
        kontrol: (b) => {
          const hedef = b.altSecenek === "mat" ? 20 : 40;
          const p = b.drPuan(1, Q1234);
          const bas = b.drSayi(1, Q123, baslica);
          return {
            saglandi: p >= hedef && bas >= 1,
            durum: `${yuvarla(p)} / ${hedef} puan · ${bas} başlıca yazarlı Q1–Q3 makale`,
          };
        },
      },
      puanKosulu("m2-10", 2, "Doktora sonrası TR Dizin makalelerden en az 10 puan", ["2a"], 10),
      ...ortakKosullar(DR),
    ],
  },
  {
    id: "saglik",
    ad: "Sağlık Bilimleri",
    tabloNo: 10,
    yazarKurali: "kademeli",
    unvan: "Doktora/uzmanlık",
    maddeler: [
      m1({
        ekBentler: [{ kod: "1f", ad: "f) SCIE/SSCI dergide vak'a takdimi", puan: 5 }],
      }),
      m2(),
      m3({ ghTavan: 5 }),
      m4({ tavan: 20, altTavan: 5 }),
      m5(),
      m6(),
      m7(20),
      m8(),
      m9(),
      m10(),
      m11(),
      m12(),
      mDiger(13),
    ],
    kosullar: [
      {
        id: "m1-saglik",
        maddeNo: 1,
        metin:
          "Uzmanlık/doktora sonrası SCIE/SSCI (a bendi) makalelerden en az 40 puan ve en az üç makalede başlıca yazar",
        kontrol: (b) => {
          const p = b.drPuan(1, Q1234);
          const bas = b.drSayi(1, Q1234, baslica);
          return {
            saglandi: p >= 40 && bas >= 3,
            durum: `${yuvarla(p)} / 40 puan · ${bas} / 3 başlıca yazarlı makale`,
          };
        },
      },
      {
        id: "m2-saglik",
        maddeNo: 2,
        metin:
          "Uzmanlık/doktora sonrası en az üç ulusal makale (ikisi TR Dizin) ve en az ikisinde başlıca yazar",
        kontrol: (b) => {
          const n = b.drSayi(2);
          const tr = b.drSayi(2, ["2a"]);
          const bas = b.drSayi(2, undefined, baslica);
          return {
            saglandi: n >= 3 && tr >= 2 && bas >= 2,
            durum: `${n} / 3 makale · ${tr} / 2 TR Dizin · ${bas} / 2 başlıca yazar`,
          };
        },
      },
      ...ortakKosullar("Uzmanlık/doktora"),
    ],
  },
  {
    id: "sosyal",
    ad: "Sosyal, Beşeri ve İdari Bilimler",
    tabloNo: 11,
    yazarKurali: "esit",
    unvan: DR,
    maddeler: [
      m1(),
      m2(),
      m3({ g: 3, h: 2, ghTavan: 5 }),
      m4({
        tavan: 20,
        altTavan: 5,
        notlar: ["Üç veya daha çok ansiklopedi maddesi bir kitap bölümü sayılır."],
      }),
      m5(),
      m6(),
      m7(20),
      m8(),
      m9(),
      m10(),
      m11(),
      m12(),
      mDiger(13, {
        tavan: 20,
        ek: [
          { kod: "13c", ad: "c) Film festivalinde jüri/yürütücü/koordinatör/danışman", puan: 5 },
          { kod: "13d", ad: "d) Kısa/uzun metraj filmde yönetmen(lik)/yardımcı/danışman", puan: 5 },
          { kod: "13e", ad: "e) Ulusal TV/sinema/dijital platform içeriğinde alanla ilgili görev", puan: 5 },
        ],
        notlar: [
          "Görsel İletişim Tasarımı, İletişim Çalışmaları, Reklamcılık, Sinema ve Halkla İlişkiler alanlarında c–e bentlerinden en az 10 puan zorunludur.",
        ],
      }),
    ],
    kosullar: [
      puanKosulu(
        "m1-10",
        1,
        "Doktora sonrası uluslararası makalelerden (a–d) en az 10 puan",
        [...Q1234, "1b", "1c", "1d"],
        10
      ),
      ulusalVeyaUluslararasi({
        ulusalAdet: 5,
        ulusalTek: 3,
        farkliDergi: 5,
        altAdet: 3,
        altTek: 1,
        altKodlar: [...Q1234, "1b"],
      }),
      {
        id: "m4-sosyal",
        maddeNo: 4,
        metin: "Doktora sonrası en az bir kitap ya da iki kitap bölümü",
        kontrol: (b) => {
          const kitap = b.drSayi(4, ["4a", "4c"]);
          const bolum = b.drSayi(4, ["4b", "4d"]);
          return {
            saglandi: kitap >= 1 || bolum >= 2,
            durum: `${kitap} kitap · ${bolum} bölüm`,
          };
        },
      },
      ...ortakKosullar(DR),
    ],
  },
  {
    id: "egitim",
    ad: "Eğitim Bilimleri",
    tabloNo: 1,
    yazarKurali: "esit",
    unvan: DR,
    maddeler: [
      m1(),
      m2(),
      m3({ ghTavan: 5 }),
      m4({
        tavan: 20,
        altTavan: 5,
        notlar: ["Üç veya daha çok ansiklopedi maddesi bir kitap bölümü sayılır."],
      }),
      m5(),
      m6(),
      m7(15),
      m8(),
      m9(),
      m10(),
      m11(),
      m12(),
      mDiger(13),
    ],
    kosullar: [
      puanKosulu(
        "m1-30",
        1,
        "Doktora sonrası SCIE/SSCI Q1–Q3 makalelerden en az 30 puan",
        Q123,
        30
      ),
      {
        id: "m2-egitim",
        maddeNo: 2,
        metin: "Doktora sonrası en az iki ulusal makale (biri TR Dizin)",
        kontrol: (b) => {
          const n = b.drSayi(2);
          const tr = b.drSayi(2, ["2a"]);
          return { saglandi: n >= 2 && tr >= 1, durum: `${n} / 2 makale · ${tr} / 1 TR Dizin` };
        },
      },
      ...ortakKosullar(DR),
    ],
  },
  {
    id: "ziraat",
    ad: "Ziraat, Orman ve Su Ürünleri",
    tabloNo: 12,
    yazarKurali: "kademeli",
    unvan: DR,
    maddeler: [
      m1(),
      m2(),
      m3({}),
      m4({ tavan: 20, altTavan: 5 }),
      m5(),
      m6(),
      m7(60),
      m8(),
      m9(),
      m10(),
      m11(),
      m12(),
      mDiger(13),
    ],
    kosullar: [
      {
        id: "m1-ziraat",
        maddeNo: 1,
        metin:
          "Doktora sonrası SCIE/SSCI makalelerden en az 30 puan; bunun en az 20 puanı başlıca yazar olduğunuz Q1–Q3 makalelerden",
        kontrol: (b) => {
          const p = b.drPuan(1, Q1234);
          const basPuan = b.kayitlar
            .filter((k) => k.maddeNo === 1 && k.drSonrasi && Q123.includes(k.bentKod) && baslica(k))
            .reduce((t, k) => t + k.puan, 0);
          return {
            saglandi: p >= 30 && basPuan >= 20,
            durum: `${yuvarla(p)} / 30 puan · başlıca yazarlı Q1–Q3: ${yuvarla(basPuan)} / 20`,
          };
        },
      },
      puanKosulu("m2-20", 2, "Doktora sonrası TR Dizin makalelerden en az 20 puan", ["2a"], 20),
      ...ortakKosullar(DR),
    ],
  },
  {
    id: "mimarlik",
    ad: "Mimarlık, Planlama ve Tasarım",
    tabloNo: 8,
    yazarKurali: "kademeli",
    unvan: DR,
    maddeler: [
      m1(),
      m2(),
      m3({}),
      m4({ tavan: 20, altTavan: 5 }),
      m5(),
      m6(),
      m7(30),
      m8(),
      m9(),
      m10(),
      m11(),
      m12(),
      {
        no: 13,
        ad: "Yarışma, Proje ve Yazılım",
        tip: "adet",
        bentler: [
          { kod: "13a", ad: "a) Mesleki yarışmada ödül/mansiyon (ekip yürütücüsü/üyesi)", puan: 15 },
          { kod: "13b", ad: "b) Uygulanmış/tamamlanmış proje hakkında yayın", puan: 10 },
          { kod: "13c", ad: "c) Proje/yapım yönetimi, tasarım, planlama yazılımı üreticisi", puan: 15 },
        ],
        notlar: [
          "Bu maddeden en az 15 puan zorunludur; sağlanamazsa 1. maddenin a, b veya c bentlerinden en az bir yayın gerekir.",
        ],
      },
      mDiger(14),
    ],
    kosullar: [
      {
        id: "m1-mimarlik",
        maddeNo: 1,
        metin:
          "Doktora sonrası uluslararası makalelerden (a, b, c) en az 20 puan; en az birinde başlıca yazar",
        kontrol: (b) => {
          const kodlar = [...Q1234, "1b", "1c"];
          const p = b.drPuan(1, kodlar);
          const bas = b.drSayi(1, kodlar, baslica);
          return {
            saglandi: p >= 20 && bas >= 1,
            durum: `${yuvarla(p)} / 20 puan · ${bas} başlıca yazarlı makale`,
          };
        },
      },
      puanKosulu("m2-10", 2, "Doktora sonrası TR Dizin makalelerden en az 10 puan", ["2a"], 10),
      {
        id: "m13-yarisma",
        maddeNo: 13,
        metin:
          "Yarışma/proje/yazılımdan en az 15 puan — ya da 1. maddenin a, b, c bentlerinden en az bir yayın",
        kontrol: (b) => {
          const p = b.drPuan(13);
          const yayin = b.drSayi(1, [...Q1234, "1b", "1c"]);
          return {
            saglandi: p >= 15 || yayin >= 1,
            durum: `${yuvarla(p)} / 15 puan · ${yayin} uluslararası makale`,
          };
        },
      },
      ...ortakKosullar(DR),
    ],
  },
  {
    id: "filoloji",
    ad: "Filoloji",
    tabloNo: 3,
    yazarKurali: "esit",
    unvan: DR,
    maddeler: [
      m1(),
      m2(),
      m3({ ghTavan: 5 }),
      m4({
        c: 20,
        d: 5,
        altTavan: 30,
        notlar: [
          "Armağan/anma kitaplarındaki hakemli makaleler kitap bölümü olarak puanlanabilir.",
          "Üç veya daha çok ansiklopedi maddesi bir kitap bölümü sayılır.",
        ],
      }),
      m5(),
      m6(),
      m7(20),
      m8(),
      m9(),
      m10(),
      m11(),
      m12(),
      mDiger(13),
    ],
    kosullar: [
      ulusalVeyaUluslararasi({
        ulusalAdet: 6,
        ulusalTek: 4,
        ulusalPuan: 50,
        farkliDergi: 3,
        altAdet: 2,
        altTek: 1,
        altPuan: 50,
        altKodlar: [...Q1234, "1b", "1c"],
      }),
      {
        id: "m4-kitap",
        maddeNo: 4,
        metin: "Doktora sonrası en az bir kitap (a veya c bendi)",
        kontrol: (b) => {
          const n = b.drSayi(4, ["4a", "4c"]);
          return { saglandi: n >= 1, durum: `${n} kitap` };
        },
      },
      ...ortakKosullar(DR),
    ],
  },
  {
    id: "hukuk",
    ad: "Hukuk",
    tabloNo: 5,
    yazarKurali: "esit",
    unvan: DR,
    maddeler: [
      m1(),
      m2(),
      m3({ ghTavan: 10 }),
      m4({
        c: 20,
        d: 10,
        altTavan: 30,
        notlar: [
          "Armağan/anma kitaplarındaki hakemli makaleler kitap bölümü olarak puanlanabilir.",
          "Üç veya daha çok ansiklopedi maddesi bir kitap bölümü sayılır.",
        ],
      }),
      m5(),
      m6(),
      m7(20),
      m8(["Doktora sonrası çalışmalardan en az birini adayın kendisi tebliğ etmiş olmalıdır."]),
      m9(),
      m10(),
      m11(),
      m12(),
      mDiger(13),
    ],
    kosullar: [
      ulusalVeyaUluslararasi({
        ulusalAdet: 6,
        ulusalTek: 4,
        ulusalPuan: 50,
        farkliDergi: 3,
        altAdet: 2,
        altTek: 1,
        altPuan: 50,
        altKodlar: [...Q1234, "1b", "1c"],
      }),
      {
        id: "m4-kitap",
        maddeNo: 4,
        metin: "Doktora sonrası en az bir kitap (a veya c bendi)",
        kontrol: (b) => {
          const n = b.drSayi(4, ["4a", "4c"]);
          return { saglandi: n >= 1, durum: `${n} kitap` };
        },
      },
      ...ortakKosullar(DR, " (en az birini kendiniz sunmuş olmalısınız)"),
    ],
  },
  {
    id: "ilahiyat",
    ad: "İlahiyat",
    tabloNo: 6,
    yazarKurali: "esit",
    unvan: DR,
    maddeler: [
      m1(),
      m2(),
      m3({ c: 3, d: 5, g: 3, h: 2, i1: 5, ghTavan: 5, scopusKitap: true }),
      m4({
        c: 20,
        d: 5,
        e: { kod: "4e", ad: "e) Tahkik (tenkitli metin neşri) türünde kitap", puan: 10 },
        altTavan: 30,
        altKodlar: ["4c", "4d", "4e"],
        scopusKitap: true,
        notlar: ["Üç veya daha çok ansiklopedi maddesi bir kitap bölümü sayılır."],
      }),
      m5(),
      m6(),
      m7(20),
      m8(),
      m9(),
      m10(),
      m11(),
      m12(),
      {
        no: 13,
        ad: "Sanatsal Uygulama/Etkinlik",
        tip: "adet",
        tavan: 20,
        bentler: [
          { kod: "13a", ad: "a) Dinî mûsıkî formunda özgün beste", puan: 5 },
          { kod: "13b", ad: "b) Solo/karma konserde icracı", puan: 5 },
          { kod: "13c", ad: "c) Dijital platformda en az 30 dk ses/video kaydı", puan: 5 },
          { kod: "13d", ad: "d) Solo icra albümü (bandrollü/dijital)", puan: 5 },
        ],
        notlar: [
          "Dinî Musiki alanından başvuranlar bu maddeden en az 10 puan almalıdır.",
          "Öğrencilerle yapılan icralar puanlanmaz; belgelendirme zorunludur.",
        ],
      },
      mDiger(14),
    ],
    kosullar: [
      ulusalVeyaUluslararasi({
        ulusalAdet: 5,
        ulusalTek: 3,
        ulusalPuan: 50,
        farkliDergi: 2,
        altAdet: 2,
        altTek: 1,
        altPuan: 50,
        altKodlar: [...Q1234, "1b", "1c"],
      }),
      {
        id: "m4-kitap",
        maddeNo: 4,
        metin: "Doktora sonrası en az bir kitap (a veya c bendi)",
        kontrol: (b) => {
          const n = b.drSayi(4, ["4a", "4c"]);
          return { saglandi: n >= 1, durum: `${n} kitap` };
        },
      },
      ...ortakKosullar(DR),
    ],
  },
  {
    id: "spor",
    ad: "Spor Bilimleri",
    tabloNo: 13,
    yazarKurali: "kademeli",
    unvan: DR,
    maddeler: [
      m1({ cAd: "c) ESCI, Scopus veya SPORT Discus dergide makale" }),
      m2(),
      m3({ g: 3, h: 2, ghTavan: 5 }),
      m4({
        tavan: 20,
        altTavan: 5,
        notlar: ["Üç veya daha çok ansiklopedi maddesi bir kitap bölümü sayılır."],
      }),
      m5({ sportDiscus: true }),
      m6(),
      m7(20),
      m8(),
      m9(),
      m10(),
      m11(),
      m12(),
      {
        no: 13,
        ad: "Sportif Başarı ve Temsil",
        tip: "adet",
        tavan: 15,
        bentler: [
          { kod: "13a1", ad: "a) Olimpiyat/Paralimpik — altın madalya", puan: 15 },
          { kod: "13a2", ad: "a) Olimpiyat/Paralimpik — gümüş madalya", puan: 10 },
          { kod: "13a3", ad: "a) Olimpiyat/Paralimpik — bronz madalya", puan: 5 },
          { kod: "13b1", ad: "b) Universiade / Avrupa-Dünya Şampiyonası — altın", puan: 10 },
          { kod: "13b2", ad: "b) Universiade / Avrupa-Dünya Şampiyonası — gümüş", puan: 5 },
          { kod: "13b3", ad: "b) Universiade / Avrupa-Dünya Şampiyonası — bronz", puan: 3 },
          { kod: "13c", ad: "c) Olimpik branşta en az 3. kademe antrenörlük belgesi", puan: 5 },
          { kod: "13d", ad: "d) Olimpik branşta A Milli Sporcu Belgesi", puan: 2 },
        ],
      },
      mDiger(14),
    ],
    kosullar: [
      {
        id: "m1-spor",
        maddeNo: 1,
        metin:
          "Doktora sonrası uluslararası makalelerden en az 30 puan; a veya b bendinde en az bir başlıca yazarlı makale",
        kontrol: (b) => {
          const p = b.drPuan(1);
          const bas = b.drSayi(1, [...Q1234, "1b"], baslica);
          return {
            saglandi: p >= 30 && bas >= 1,
            durum: `${yuvarla(p)} / 30 puan · ${bas} başlıca yazarlı makale`,
          };
        },
      },
      {
        id: "m2-spor",
        maddeNo: 2,
        metin: "Doktora sonrası en az üç ulusal makale (ikisi TR Dizin)",
        kontrol: (b) => {
          const n = b.drSayi(2);
          const tr = b.drSayi(2, ["2a"]);
          return { saglandi: n >= 3 && tr >= 2, durum: `${n} / 3 makale · ${tr} / 2 TR Dizin` };
        },
      },
      {
        id: "m4-spor",
        maddeNo: 4,
        metin: "Doktora sonrası en az bir kitap ya da iki kitap bölümü",
        kontrol: (b) => {
          const kitap = b.drSayi(4, ["4a", "4c"]);
          const bolum = b.drSayi(4, ["4b", "4d"]);
          return {
            saglandi: kitap >= 1 || bolum >= 2,
            durum: `${kitap} kitap · ${bolum} bölüm`,
          };
        },
      },
      ...ortakKosullar(DR),
    ],
  },
];

export function temelAlanBul(id: string) {
  return TEMEL_ALANLAR.find((a) => a.id === id);
}
