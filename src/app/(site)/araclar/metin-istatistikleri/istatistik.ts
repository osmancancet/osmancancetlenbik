/**
 * Metin istatistiklerinin saf mantığı.
 *
 * Arayüzden ayrı duruyor çünkü buradaki her sayı bir karar dayanağı: yazar
 * dergiye "6000 kelimeyi aşmadım" diye güveniyor. Ayrı modül olunca sayım
 * kuralları tek tek okunabiliyor ve Node ile sınanabiliyor.
 *
 * Projenin derleme hedefi ES2017 olduğu için gerilemeli bakış (lookbehind) ve
 * `\p{...}` kaçışları kullanılamıyor. Bu yüzden "harf nedir" sorusu ters
 * yönden yanıtlanıyor: noktalama ve boşluk listesi tanımlanıp geri kalan her
 * karakter harf sayılıyor. Türkçe'nin çğıöşü ÇĞİÖŞÜ harfleri ile şapkalı
 * â/î/û böylece ayrıca sayılmak zorunda kalmıyor.
 */

export type Istatistik = {
  kelime: number;
  karakterBosluklu: number;
  karakterBosluksuz: number;
  cumle: number;
  paragraf: number;
  /** Kelime başına düşen ortalama harf sayısı (noktalama sayılmaz). */
  ortKelimeUzunlugu: number;
  /** Cümle başına düşen ortalama kelime sayısı. */
  ortCumleUzunlugu: number;
  /** Dakikada 200 kelime — sessiz okuma için yaygın kabul. */
  okumaSaniye: number;
  /** Dakikada 130 kelime — sunumda konuşma hızı okumadan yavaştır. */
  sunumSaniye: number;
};

export type KelimeSikligi = { kelime: string; sayi: number };

/** Sessiz okuma hızı (kelime/dakika). */
export const OKUMA_HIZI = 200;
/** Sunum konuşma hızı (kelime/dakika). */
export const SUNUM_HIZI = 130;

/* ------------------------------------------------------------- sözcüklere ayırma */

/**
 * Bir sözcüğün başında ya da sonunda bulunabilecek noktalama.
 *
 * Sözcüğün *içindeki* kesme işareti bilerek kırpılmıyor: "Türkiye'nin" tek
 * kelimedir, "bilgi-işlem" de öyle. Kırpma yalnızca uçlardan yapıldığı için
 * `("2020")` → `2020`, `—` → `` (hiç) olur.
 */
const UC_NOKTALAMA =
  /^[\s"'“”‘’«»„`(){}[\]<>.,;:!?…\-–—/\\|@#*+=~$%&^_·•]+|[\s"'“”‘’«»„`(){}[\]<>.,;:!?…\-–—/\\|@#*+=~$%&^_·•]+$/g;

/**
 * Metni sözcüklere ayırır.
 *
 * Önce boşluktan bölünüyor, sonra her parçanın uçlarındaki noktalama
 * kırpılıyor. Geriye hiçbir şey kalmayan parçalar (tek başına duran tire,
 * üç nokta, madde imi) kelime sayılmıyor.
 */
export function kelimeleriAyikla(metin: string): string[] {
  const kelimeler: string[] = [];
  for (const ham of metin.split(/\s+/)) {
    if (ham.length === 0) continue;
    const temiz = ham.replace(UC_NOKTALAMA, "");
    if (temiz.length > 0) kelimeler.push(temiz);
  }
  return kelimeler;
}

/* ------------------------------------------------------------------- cümleler */

/**
 * Noktadan sonra cümle bitmediği durumlar. Hepsi küçük harfe çevrilmiş
 * biçimde tutuluyor; karşılaştırma `normalle` ile yapılır.
 */
const KISALTMALAR = new Set([
  "vb",
  "vs",
  "bkz",
  "örn",
  "ör",
  "age",
  "agm",
  "dr",
  "doç",
  "prof",
  "yrd",
  "arş",
  "gör",
  "öğr",
  "çev",
  "ed",
  "haz",
  "yay",
  "s",
  "ss",
  "c",
  "no",
  "nr",
  "yy",
  "bs",
  "et al",
]);

/**
 * Karşılaştırma için ortak küçük harf biçimi.
 *
 * `toLocaleLowerCase("tr")` Türkçe'de zorunlu ("İSTANBUL" → "istanbul"), ama
 * İngilizce başlıkları bozuyor: "BIBLIOGRAPHY" → "bıblıography". Bu yüzden
 * dönüşümden sonra "ı" tek biçime ("i") indirgeniyor. Sonuç yalnızca
 * karşılaştırmada kullanılıyor, kullanıcıya gösterilmiyor.
 */
function normalle(metin: string): string {
  return metin.toLocaleLowerCase("tr").replace(/ı/g, "i");
}

/** Verilen konumdan geriye doğru en yakın sözcüğü okur. */
function oncekiSozcuk(metin: string, konum: number): string {
  let bas = konum;
  while (bas > 0 && !/[\s"'“”‘’«»(){}[\]<>.,;:!?…]/.test(metin.charAt(bas - 1))) {
    bas--;
  }
  return metin.slice(bas, konum);
}

/**
 * Cümle sayar.
 *
 * Bir bitiş imi (`. ! ? …`) ancak ardından boşluk gelirse ya da metin biterse
 * cümleyi kapatır; böylece "3.14" ve "ornek.edu.tr" ortasından bölünmüyor.
 * Noktadan önceki sözcük bilinen bir kısaltma ("vb.", "Dr."), tek bir harf
 * ("A. Yılmaz") ya da sıra sayısı ("1. Bölüm", "2020.") ise cümle
 * kapanmıyor — akademik metinde bu üç durum çok sık.
 */
export function cumleSayisi(metin: string): number {
  const desen = /[.!?…]+/g;
  let sayi = 0;
  let sonKapanis = 0;
  let eslesme: RegExpExecArray | null;

  while ((eslesme = desen.exec(metin)) !== null) {
    const bitis = eslesme.index + eslesme[0].length;
    const sonraki = metin.charAt(bitis);
    if (sonraki !== "" && !/\s/.test(sonraki)) continue;

    if (eslesme[0] === ".") {
      const onceki = oncekiSozcuk(metin, eslesme.index);
      if (onceki.length === 1) continue;
      if (/^[0-9]+$/.test(onceki)) continue;
      if (KISALTMALAR.has(normalle(onceki))) continue;
    }

    sayi++;
    sonKapanis = bitis;
  }

  // Son bitiş iminden sonra hâlâ sözcük varsa (ya da hiç im yoksa) o da bir
  // cümledir: başlıklar ve noktasız biten metinler böyle sayılıyor.
  if (kelimeleriAyikla(metin.slice(sonKapanis)).length > 0) sayi++;

  return sayi;
}

/**
 * Paragraf sayar.
 *
 * Satır sonu paragraf ayracı kabul ediliyor (Word da böyle sayar); boş
 * satırlar ve yalnız boşluktan oluşan satırlar sayılmaz.
 */
export function paragrafSayisi(metin: string): number {
  let sayi = 0;
  for (const satir of metin.split(/\r?\n/)) {
    if (satir.trim().length > 0) sayi++;
  }
  return sayi;
}

/* ---------------------------------------------------------------- kaynakça */

/** Kaynakça bölümünü açan başlıklar. `normalle` biçiminde tutuluyorlar. */
const KAYNAKCA_BASLIKLARI = new Set([
  "kaynakça",
  "kaynaklar",
  "kaynakca",
  "references",
  "reference list",
  "bibliography",
  "works cited",
]);

export type Ayrim = {
  /** Sayıma girecek bölüm. */
  sayilan: string;
  /** Kaynakça başlığı ve sonrası. Başlık bulunamadıysa boş dizi. */
  atilan: string;
  /** Bulunan başlık satırı, olduğu gibi. Yoksa null. */
  baslik: string | null;
};

/**
 * Kaynakça başlığını bulup metni ikiye ayırır.
 *
 * Başlık aranırken satırın *tamamı* başlık olmalı: baştaki numaralandırma
 * ("5.", "V.", "#"), sondaki iki nokta ve kalın işaretleri (`**`) atıldıktan
 * sonra geriye yalnızca başlığın kendisi kalmalı. Aksi hâlde "Kaynaklar
 * incelendiğinde…" diye başlayan bir cümle metnin yarısını uçururdu.
 *
 * Birden çok aday varsa sonuncusu seçiliyor: Türkçe tezlerde önce Türkçe
 * sonra İngilizce kaynakça listesi görülebiliyor, ikisini de dışarıda
 * bırakmak isteniyor.
 */
export function kaynakcayiAyir(metin: string): Ayrim {
  const satirlar = metin.split(/\r?\n/);
  let bulunan = -1;
  let baslik: string | null = null;

  for (let i = 0; i < satirlar.length; i++) {
    const satir = satirlar[i].trim();
    if (satir.length === 0 || satir.length > 40) continue;

    const cekirdek = satir
      // Baştaki madde/numara: "5.", "5)", "III.", "#", "##", "*"
      .replace(/^[#*\s]*(?:[0-9]+|[IVXivx]+)?[.)]?\s*/, "")
      // Sondaki iki nokta, kalın/eğik işaretleri
      .replace(/[\s:*_]+$/, "")
      .trim();

    if (KAYNAKCA_BASLIKLARI.has(normalle(cekirdek))) {
      bulunan = i;
      baslik = satir;
    }
  }

  if (bulunan === -1) return { sayilan: metin, atilan: "", baslik: null };

  return {
    sayilan: satirlar.slice(0, bulunan).join("\n"),
    atilan: satirlar.slice(bulunan).join("\n"),
    baslik,
  };
}

/* ------------------------------------------------------------ durak kelimeler */

/**
 * Sıklık listesinden düşülen Türkçe durak kelimeleri.
 *
 * Bunlar elenmezse ilk on beş sırayı bağlaçlar kapıyor ve liste hiçbir şey
 * anlatmıyor. Liste bilinçli olarak kısa: anlam taşıyabilecek kelimeleri
 * (ör. "sonuç", "değil") elemek, metnin kendi vurgusunu gizlerdi.
 */
export const DURAK_KELIMELER = new Set([
  "ve",
  "ile",
  "bu",
  "bir",
  "için",
  "olarak",
  "daha",
  "çok",
  "gibi",
  "ancak",
  "ayrıca",
  "ise",
  "de",
  "da",
  "ki",
  "mi",
]);

/**
 * En sık geçen kelimeleri döndürür.
 *
 * Küçük harfe çevirme `toLocaleLowerCase("tr")` ile yapılıyor: İngilizce
 * yerelde "İ" iki kod birimine açılır ve "İSTANBUL" ile "İstanbul" ayrı
 * kelime sayılırdı. Tek harfli parçalar ve salt sayılar da eleniyor; onlar
 * madde numarası ya da tarih oluyor.
 */
export function enSikKelimeler(metin: string, adet = 15): KelimeSikligi[] {
  const sayac = new Map<string, number>();

  for (const ham of kelimeleriAyikla(metin)) {
    const kelime = ham.toLocaleLowerCase("tr");
    if (kelime.length < 2) continue;
    if (/^[0-9.,%]+$/.test(kelime)) continue;
    if (DURAK_KELIMELER.has(kelime)) continue;
    sayac.set(kelime, (sayac.get(kelime) ?? 0) + 1);
  }

  return Array.from(sayac.entries())
    .map(([kelime, sayi]) => ({ kelime, sayi }))
    // Eşitlikte alfabetik sıra: aynı girdi her zaman aynı listeyi versin.
    .sort((a, b) => b.sayi - a.sayi || a.kelime.localeCompare(b.kelime, "tr"))
    .slice(0, adet);
}

/* ----------------------------------------------------------------- hesaplama */

/** Bir kesri virgülden sonra tek basamağa yuvarlar. */
function yuvarla(sayi: number): number {
  return Math.round(sayi * 10) / 10;
}

export function hesapla(metin: string): Istatistik {
  const kelimeler = kelimeleriAyikla(metin);
  const kelime = kelimeler.length;
  const cumle = cumleSayisi(metin);

  let harfToplam = 0;
  for (const k of kelimeler) harfToplam += k.length;

  return {
    kelime,
    karakterBosluklu: metin.length,
    karakterBosluksuz: metin.replace(/\s/g, "").length,
    cumle,
    paragraf: paragrafSayisi(metin),
    ortKelimeUzunlugu: kelime === 0 ? 0 : yuvarla(harfToplam / kelime),
    ortCumleUzunlugu: cumle === 0 ? 0 : yuvarla(kelime / cumle),
    okumaSaniye: Math.round((kelime / OKUMA_HIZI) * 60),
    sunumSaniye: Math.round((kelime / SUNUM_HIZI) * 60),
  };
}

/**
 * Saniyeyi "4 dk 12 sn" biçiminde yazar.
 *
 * Bir dakikanın altındaki süreler saniye olarak gösteriliyor; "0 dk" demek
 * kullanıcıya hiçbir şey anlatmıyor.
 */
export function sureMetni(saniye: number): string {
  if (saniye <= 0) return "0 sn";
  if (saniye < 60) return `${saniye} sn`;
  const dakika = Math.floor(saniye / 60);
  const kalan = saniye % 60;
  return kalan === 0 ? `${dakika} dk` : `${dakika} dk ${kalan} sn`;
}
