/**
 * Anonimleştirme kuralları.
 *
 * Arayüzden ayrı bir modülde duruyorlar; çünkü asıl risk burada: yanlış bir
 * desen ya kişisel veriyi kaçırır ya da masum bir sayıyı kimlik numarası
 * sanıp metni bozar. Ayrı dosya olunca desenler tek tek gözden geçirilebiliyor
 * ve derlenip Node ile sınanabiliyor.
 *
 * Projenin derleme hedefi ES2017 olduğu için gerilemeli bakış (lookbehind) ve
 * `\p{...}` kaçışları kullanılamıyor. Sayı kaçaklarını engellemek için
 * "önceki karakteri de yakala, sonra geri yaz" yöntemi tercih edildi; bu,
 * gerilemeli bakışla aynı işi ES2017 sözdizimiyle yapıyor.
 */

export type KuralAnahtari =
  | "eposta"
  | "telefon"
  | "tc"
  | "ogrenciNo"
  | "iban"
  | "baglanti"
  | "tarih";

export type Kural = {
  anahtar: KuralAnahtari;
  etiket: string;
  jeton: string;
  ipucu: string;
  /** Metni tarar, jetonla değiştirir ve kaç değişiklik yaptığını söyler. */
  uygula: (metin: string) => Sonuc;
};

type Sonuc = { metin: string; sayi: number };

/**
 * Bir sayı dizisinin ortasından eşleşmeyi önlemek için desenlerin başına
 * "rakam olmayan bir karakter ya da metin başı" konuyor. O karakter eşleşmenin
 * parçası olduğundan yerine koyarken geri yazılmalı.
 */
function onEkiKoruyarak(metin: string, desen: RegExp, jeton: string): Sonuc {
  let sayi = 0;
  const yeni = metin.replace(desen, (_eslesme: string, onek: string) => {
    sayi++;
    return onek + jeton;
  });
  return { metin: yeni, sayi };
}

function duz(metin: string, desen: RegExp, jeton: string): Sonuc {
  let sayi = 0;
  const yeni = metin.replace(desen, () => {
    sayi++;
    return jeton;
  });
  return { metin: yeni, sayi };
}

/* ---------------------------------------------------------------- desenler */

/** E-posta. Alan adı çok parçalı olabildiği için uzantı ayrıca zorunlu. */
const EPOSTA = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;

/**
 * Türkiye telefon biçimleri: 0532 123 45 67, +90 212 555 00 00,
 * (0212) 555 00 00, 0 (212) 555 00 00, 00905321234567, 05321234567.
 *
 * Alan/operatör kodunun 2-5 ile başlaması şart koşuldu; bu sayede 11 haneli
 * TC kimlik numaraları (1-9 ile başlar ve ardından 10 hane gelir) telefon
 * sanılmıyor ve rastgele uzun sayılar eşleşmiyor.
 */
const TELEFON =
  /(^|[^0-9])((?:(?:\+|00)\s?90|0)?[\s.-]*\(?\s*0?[2-5][0-9]{2}\s*\)?[\s.-]*[0-9]{3}[\s.-]*[0-9]{2}[\s.-]*[0-9]{2})(?![0-9])/g;

/** TC kimlik: tam 11 hane, ilk hane sıfır olamaz. */
const TC = /(^|[^0-9])([1-9][0-9]{10})(?![0-9])/g;

/**
 * Öğrenci numarası: 7-12 hane. TC ve telefondan sonra çalıştırılmalı, yoksa
 * onları da yutar — kural sırası bu yüzden sabit.
 */
const OGRENCI_NO = /(^|[^0-9])([0-9]{7,12})(?![0-9])/g;

/**
 * IBAN: iki harf ülke kodu, iki denetim hanesi ve en az 12 karakterlik gövde.
 * Alt sınır yüksek tutuldu ki "AB12 CDEF" gibi kısa büyük harfli kısaltmalar
 * IBAN sanılmasın.
 */
const IBAN = /\b[A-Z]{2}[0-9]{2}(?:\s?[A-Z0-9]{4}){3,7}(?:\s?[A-Z0-9]{1,3})?\b/g;

/** Bağlantı. Protokolsüz alan adları bilerek dışarıda — yanlış eşleşme yapıyorlar. */
const BAGLANTI = /(?:https?:\/\/|www\.)[^\s<>"'()[\]]+/gi;

/** Tarih: gg.aa.yyyy ve gg/aa/yyyy. Ayraç iki yerde de aynı olmalı. */
const TARIH = /(^|[^0-9])([0-9]{1,2})([./])([0-9]{1,2})\3([0-9]{4})(?![0-9])/g;

/* ------------------------------------------------------------------ kurallar */

/**
 * Sıra önemlidir ve dizinin sırasıyla uygulanır:
 * e-posta → bağlantı (e-posta alan adları önce kapansın),
 * IBAN → tarih → telefon → TC → öğrenci no (dardan geniş sayıya doğru).
 */
export const KURALLAR: Kural[] = [
  {
    anahtar: "eposta",
    etiket: "E-posta adresi",
    jeton: "[E-POSTA]",
    ipucu: "ali.veli@cbu.edu.tr",
    uygula: (m) => duz(m, EPOSTA, "[E-POSTA]"),
  },
  {
    anahtar: "baglanti",
    etiket: "Bağlantı (URL)",
    jeton: "[BAĞLANTI]",
    ipucu: "https://ornek.edu.tr/sayfa",
    uygula: (metin) => {
      let sayi = 0;
      // Cümle sonundaki noktalama bağlantıya yapışıyor; jetondan sonra geri
      // yazılmazsa metnin noktalaması bozuluyor.
      const yeni = metin.replace(BAGLANTI, (eslesme: string) => {
        sayi++;
        const kuyruk = /[.,;:!?]+$/.exec(eslesme);
        return "[BAĞLANTI]" + (kuyruk ? kuyruk[0] : "");
      });
      return { metin: yeni, sayi };
    },
  },
  {
    anahtar: "iban",
    etiket: "IBAN",
    jeton: "[IBAN]",
    ipucu: "TR33 0006 1005 1978 6457 8413 26",
    uygula: (m) => duz(m, IBAN, "[IBAN]"),
  },
  {
    anahtar: "tarih",
    etiket: "Tarih",
    jeton: "[TARİH]",
    ipucu: "12.03.2024 · 12/03/2024",
    uygula: (m) => onEkiKoruyarak(m, TARIH, "[TARİH]"),
  },
  {
    anahtar: "telefon",
    etiket: "Telefon numarası",
    jeton: "[TELEFON]",
    ipucu: "0532 123 45 67 · +90 212 555 00 00",
    uygula: (m) => onEkiKoruyarak(m, TELEFON, "[TELEFON]"),
  },
  {
    anahtar: "tc",
    etiket: "TC kimlik numarası",
    jeton: "[TC]",
    ipucu: "11 hane, sıfırla başlamaz",
    uygula: (m) => onEkiKoruyarak(m, TC, "[TC]"),
  },
  {
    anahtar: "ogrenciNo",
    etiket: "Öğrenci numarası",
    jeton: "[ÖĞRENCİ NO]",
    ipucu: "7-12 haneli sayı",
    uygula: (m) => onEkiKoruyarak(m, OGRENCI_NO, "[ÖĞRENCİ NO]"),
  },
];

/* -------------------------------------------------------------- ad-soyad */

/**
 * Ad eşleşmesinde sınır denetimi için "harf" yerine "ayraç" listesi
 * kullanılıyor. Böylece Türkçe ç/ğ/ı/İ/ö/ş/ü ve başka alfabelerin harfleri
 * ayrıca sayılmak zorunda kalmıyor: ayraç değilse harftir.
 */
const AYIRAC = /[\s.,;:!?()[\]{}"'`«»…\-–—/\\|@#*+=<>~$%&^_]/;

function sinirMi(karakter: string): boolean {
  return karakter === "" || AYIRAC.test(karakter);
}

/**
 * Ad-soyad listesindeki girdileri metinde arar.
 *
 * Büyük/küçük harf duyarsızlığı `toLocaleLowerCase("tr")` ile yapılıyor;
 * İngilizce yerelde "İ" iki kod birimine açıldığı için hem yanlış eşleşme
 * hem de konum kayması olurdu. Yine de uzunluk değişirse o ad atlanıyor —
 * kaydırılmış bir dizinle metni kesmek sessizce bozuk çıktı üretir.
 */
export function adlariGizle(
  metin: string,
  adListesi: string
): { metin: string; sayi: number } {
  const adlar = adListesi
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 1)
    // Uzun adlar önce: "Ali Veli" varken "Ali" ile parçalanmasın.
    .sort((a, b) => b.length - a.length);

  let sonuc = metin;
  let sayi = 0;

  for (const ad of adlar) {
    const aranan = ad.toLocaleLowerCase("tr");
    if (aranan.length !== ad.length) continue;

    const kucuk = sonuc.toLocaleLowerCase("tr");
    if (kucuk.length !== sonuc.length) continue;

    let cikti = "";
    let imlec = 0;
    for (;;) {
      const yer = kucuk.indexOf(aranan, imlec);
      if (yer === -1) break;
      const oncesi = yer > 0 ? kucuk.charAt(yer - 1) : "";
      const sonrasi = kucuk.charAt(yer + aranan.length);
      if (sinirMi(oncesi) && sinirMi(sonrasi)) {
        cikti += sonuc.slice(imlec, yer) + "[AD]";
        sayi++;
      } else {
        // Başka bir sözcüğün içinde kalmış; olduğu gibi bırak.
        cikti += sonuc.slice(imlec, yer + aranan.length);
      }
      imlec = yer + aranan.length;
    }
    sonuc = cikti + sonuc.slice(imlec);
  }

  return { metin: sonuc, sayi };
}

/* ---------------------------------------------------------------- çalıştır */

export type Rapor = { anahtar: KuralAnahtari | "ad"; etiket: string; sayi: number };

export function anonimlestir(
  metin: string,
  acikKurallar: Record<KuralAnahtari, boolean>,
  adListesi: string
): { metin: string; rapor: Rapor[] } {
  let gecerli = metin;
  const rapor: Rapor[] = [];

  for (const kural of KURALLAR) {
    if (!acikKurallar[kural.anahtar]) continue;
    const sonuc = kural.uygula(gecerli);
    gecerli = sonuc.metin;
    rapor.push({ anahtar: kural.anahtar, etiket: kural.etiket, sayi: sonuc.sayi });
  }

  // Adlar en sonda: e-posta ve bağlantılar jetona dönüştükten sonra aranırsa
  // "ali.veli@..." içindeki "Ali" ikinci kez yakalanmıyor.
  if (adListesi.trim()) {
    const sonuc = adlariGizle(gecerli, adListesi);
    gecerli = sonuc.metin;
    rapor.push({ anahtar: "ad", etiket: "Ad-soyad", sayi: sonuc.sayi });
  }

  return { metin: gecerli, rapor };
}
