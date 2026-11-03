/**
 * Yayın listesi düzenleyicinin saf katmanı.
 *
 * Tür tahmini ve sıralama arayüzden ayrı duruyor: doçentlik ya da atama
 * dosyasında yanlış gruba düşmüş bir yayın komisyonda geri dönüyor, bu yüzden
 * kurallar tek tek okunabilir ve Node ile sınanabilir olmalı.
 *
 * Tahmin bilerek "kesin" değil — arayüz her satırın türünü açılır menüyle
 * düzeltmeye izin veriyor. Buradaki iş, kullanıcının elle işaretleyeceği
 * satır sayısını azaltmak.
 *
 * Derleme hedefi ES2017: gerilemeli bakış (lookbehind) ve `\p{...}` yok.
 */

/* ------------------------------------------------------------------ türler */

export type Tur = "makale" | "bildiri" | "kitapBolumu" | "kitap" | "tez";

/**
 * Grup sırası akademik başvuru dosyalarındaki alışılmış sıra: önce hakemli
 * makaleler, sonra bildiriler, sonra kitap çalışmaları.
 */
export const TURLER: { anahtar: Tur; baslik: string; tekil: string }[] = [
  { anahtar: "makale", baslik: "Makaleler", tekil: "Makale" },
  { anahtar: "bildiri", baslik: "Bildiriler", tekil: "Bildiri" },
  { anahtar: "kitapBolumu", baslik: "Kitap Bölümleri", tekil: "Kitap Bölümü" },
  { anahtar: "kitap", baslik: "Kitaplar", tekil: "Kitap" },
  { anahtar: "tez", baslik: "Tezler", tekil: "Tez" },
];

export type Yayin = {
  /** Liste yeniden sıralandığında React anahtarı olarak kullanılıyor. */
  id: string;
  metin: string;
  tur: Tur;
  /** Tahmin edilen yıl; bulunamazsa tanımsız kalıyor. */
  yil?: number;
  /** Türü kullanıcı mı seçti? Arayüz "tahmin" rozetini buna göre gösteriyor. */
  elle: boolean;
};

/* ------------------------------------------------------------- normalleştirme */

const TURKCE_ASCII: Record<string, string> = {
  ç: "c", Ç: "c",
  ğ: "g", Ğ: "g",
  ı: "i", I: "i", İ: "i",
  ö: "o", Ö: "o",
  ş: "s", Ş: "s",
  ü: "u", Ü: "u",
};

/**
 * Anahtar kelime aramasını hem Türkçe hem İngilizce yazımda tutturabilmek için
 * metin ASCII'ye indiriliyor. Doğrudan `toLowerCase()` yeterli değil: "ISBN"
 * Türkçe kurala göre "ısbn" olurdu ve "isbn" araması kaçardı; "İ" ise noktası
 * ayrı bir karaktere düşerdi.
 */
function normalle(metin: string): string {
  return metin.replace(/[çÇğĞıIİöÖşŞüÜ]/g, (h) => TURKCE_ASCII[h] ?? h).toLowerCase();
}

/* ------------------------------------------------------------- yıl tahmini */

const YIL_DESENI = /\b(?:19|20)\d{2}\b/g;

/**
 * Satırdaki yayın yılı. Birden çok dört haneli sayı varsa sonuncusu alınıyor:
 * satırın başında cilt/sayı, ortasında DOI gibi sayılar bulunabiliyor, yıl
 * ise çoğu kaynakça biçiminde sona daha yakın duruyor.
 */
export function yilTahminEt(satir: string): number | undefined {
  const bulunan = satir.match(YIL_DESENI);
  if (!bulunan || bulunan.length === 0) return undefined;
  return Number(bulunan[bulunan.length - 1]);
}

/* ------------------------------------------------------------- tür tahmini */

const BILDIRI_ANAHTARLARI = [
  "konferans",
  "sempozyum",
  "kongre",
  "bildiri",
  "proceedings",
  "conference",
];

const KITAP_BOLUMU_ANAHTARLARI = ["kitap bolumu", "chapter", "in:"];

/**
 * Türü satırdaki anahtar kelimelerden tahmin eder.
 *
 * Sıra önemli: bir bildiri kitabının ISBN'i olabiliyor, bir kitap bölümü
 * künyesinde "in:" ile birlikte ISBN geçebiliyor. Daha ayırt edici olan
 * kelime önce sınanıyor, hiçbiri yoksa en yaygın tür olan makaleye düşülüyor.
 */
export function turTahminEt(satir: string): Tur {
  const m = normalle(satir);
  if (BILDIRI_ANAHTARLARI.some((k) => m.indexOf(k) !== -1)) return "bildiri";
  if (KITAP_BOLUMU_ANAHTARLARI.some((k) => m.indexOf(k) !== -1)) return "kitapBolumu";
  if (m.indexOf("isbn") !== -1) return "kitap";
  // "tez" kısa bir hece; kelime sınırı olmadan "tezgah" gibi sözcüklere takılır.
  if (/\btez\w*\b/.test(m)) return "tez";
  return "makale";
}

/* -------------------------------------------------------------- ayrıştırma */

/**
 * Yapıştırılan metni satır satır yayına çevirir. Boş satırlar atılıyor;
 * kullanıcılar yayınları arada boş satır bırakarak yapıştırıyor.
 */
export function satirlariAyristir(metin: string): Yayin[] {
  return metin
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s, i) => ({
      id: `y${i}-${s.slice(0, 24)}`,
      metin: s,
      tur: turTahminEt(s),
      yil: yilTahminEt(s),
      elle: false,
    }));
}

/* ------------------------------------------------------------- gruplandırma */

export type Grup = {
  tur: Tur;
  /** Grup harfi: A, B, C ... Yalnızca dolu gruplara veriliyor. */
  harf: string;
  baslik: string;
  yayinlar: Yayin[];
};

export type Numaralandirma = "surekli" | "grupIci";

/**
 * Yayınları türe göre gruplar, her grubu yıla göre azalan sıralar.
 *
 * Yılı bulunamayan yayınlar grubun sonuna konuyor — listeden düşürmek yerine
 * görünür bırakmak gerekiyor ki kullanıcı eksik yılı fark edip düzeltsin.
 * Aynı yıl içinde kullanıcının yapıştırdığı sıra korunuyor.
 */
export function grupla(yayinlar: Yayin[]): Grup[] {
  const gruplar: Grup[] = [];
  let harfKodu = 65; // "A"
  for (const tur of TURLER) {
    const uyeler = yayinlar
      .map((y, sira) => ({ y, sira }))
      .filter((k) => k.y.tur === tur.anahtar)
      .sort((a, b) => {
        const ay = a.y.yil ?? -Infinity;
        const by = b.y.yil ?? -Infinity;
        if (ay !== by) return by - ay;
        return a.sira - b.sira;
      })
      .map((k) => k.y);
    if (uyeler.length === 0) continue;
    gruplar.push({
      tur: tur.anahtar,
      harf: String.fromCharCode(harfKodu),
      baslik: tur.baslik,
      yayinlar: uyeler,
    });
    harfKodu++;
  }
  return gruplar;
}

/** Bir yayının listedeki etiketi: "A1." ya da sürekli sayımda "7.". */
export function etiket(
  grup: Grup,
  grupIciSira: number,
  surekliSira: number,
  bicim: Numaralandirma
): string {
  return bicim === "grupIci"
    ? `${grup.harf}${grupIciSira}.`
    : `${surekliSira}.`;
}

/** Gruplardan kopyalanabilir/indirilebilir düz metin listesi üretir. */
export function listeUret(gruplar: Grup[], bicim: Numaralandirma): string {
  let surekli = 0;
  const bloklar = gruplar.map((grup) => {
    const satirlar = grup.yayinlar.map((y, i) => {
      surekli++;
      return `${etiket(grup, i + 1, surekli, bicim)} ${y.metin}`;
    });
    return `${grup.harf}. ${grup.baslik}\n\n${satirlar.join("\n")}`;
  });
  return bloklar.join("\n\n");
}
