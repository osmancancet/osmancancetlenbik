/**
 * BibTeX üretiminin saf katmanı.
 *
 * Arayüzden ayrı duruyor; çünkü buradaki hatalar sessizdir: yanlış kaçırılmış
 * bir `&` LaTeX derlemesini kırar, korunmamış bir kısaltma ise ("IoT" → "iot")
 * kaynakçada sessizce yanlış basılır. Ayrı modül olunca kayıtlar Node ile
 * çalıştırılıp gözle doğrulanabiliyor.
 *
 * Derleme hedefi ES2017 olduğu için gerilemeli bakış (lookbehind) ve
 * `\p{...}` kaçışları kullanılmıyor; Türkçe harfler açıkça yazılıyor.
 */

/* ------------------------------------------------------------------ türler */

export type BibYazar = {
  soyad?: string;
  ad?: string;
  /** Kurum yazarları: CrossRef bunları tek bir `name` alanıyla veriyor. */
  kurum?: string;
};

export type BibKunye = {
  doi: string;
  /** CrossRef'in kendi tür adı — eşleme `bibTuru` içinde yapılıyor. */
  crossRefTuru?: string;
  yazarlar: BibYazar[];
  baslik?: string;
  /** Dergi / konferans / kitap adı — CrossRef hepsini `container-title` diyor. */
  kap?: string;
  cilt?: string;
  sayi?: string;
  sayfa?: string;
  yil?: string;
  yayinci?: string;
};

/* -------------------------------------------------------------- DOI ayıklama */

/**
 * Metinden DOI ayıkla. DOI'ler `10.` ile başlar ve boşluğa kadar sürer;
 * cümle sonundaki noktalama DOI'ye yapıştığı için ayrıca kırpılıyor.
 */
export function doileriAyikla(metin: string): string[] {
  const desen = /10\.\d{4,9}\/[^\s"'<>,;)\]]+/g;
  const bulunan = (metin.match(desen) ?? []).map((d) =>
    d.replace(/[.,;:)\]]+$/, "")
  );
  return Array.from(new Set(bulunan));
}

/* ------------------------------------------------------ CrossRef çözümleme */

type Kayit = Record<string, unknown>;

function nesne(v: unknown): Kayit | undefined {
  return typeof v === "object" && v !== null && !Array.isArray(v)
    ? (v as Kayit)
    : undefined;
}

function duzMetin(v: unknown): string | undefined {
  if (typeof v === "string") return v.trim() || undefined;
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return undefined;
}

/** CrossRef başlık ve dergi adını dizi olarak veriyor; ilk öğe asıl addır. */
function ilkMetin(v: unknown): string | undefined {
  return Array.isArray(v) ? duzMetin(v[0]) : duzMetin(v);
}

/**
 * Yayın yılı. `issued` yoksa basım/çevrimiçi tarihine, o da yoksa kaydın
 * oluşturulma tarihine düşülüyor — yıl olmayan bir BibTeX kaydı çoğu stilde
 * "n.d." basılır, bu yüzden elimizdeki her tarih alanı deneniyor.
 */
function yilBul(m: Kayit): string | undefined {
  const alanlar = ["issued", "published-print", "published-online", "published", "created"];
  for (const alan of alanlar) {
    const parcalar = nesne(m[alan])?.["date-parts"];
    if (!Array.isArray(parcalar) || !Array.isArray(parcalar[0])) continue;
    const y = duzMetin(parcalar[0][0]);
    if (y && /^\d{4}$/.test(y)) return y;
  }
  return undefined;
}

function yazarlariAl(v: unknown): BibYazar[] {
  if (!Array.isArray(v)) return [];
  const cikti: BibYazar[] = [];
  for (const ham of v) {
    const y = nesne(ham);
    if (!y) continue;
    const soyad = duzMetin(y.family);
    const ad = duzMetin(y.given);
    const kurum = duzMetin(y.name);
    if (soyad || ad || kurum) cikti.push({ soyad, ad, kurum });
  }
  return cikti;
}

/** CrossRef `/works/<doi>` yanıtını künyeye çevirir. */
export function kunyeCozumle(doi: string, ham: unknown): BibKunye {
  const m = nesne(nesne(ham)?.message) ?? {};
  return {
    doi: duzMetin(m.DOI) ?? doi,
    crossRefTuru: duzMetin(m.type),
    yazarlar: yazarlariAl(m.author),
    baslik: ilkMetin(m.title),
    kap: ilkMetin(m["container-title"]),
    cilt: duzMetin(m.volume),
    sayi: duzMetin(m.issue),
    sayfa: duzMetin(m.page),
    yil: yilBul(m),
    yayinci: duzMetin(m.publisher),
  };
}

/* ----------------------------------------------------------- tür eşlemesi */

const TUR_ESLEME: Record<string, string> = {
  "journal-article": "article",
  "proceedings-article": "inproceedings",
  "book-chapter": "incollection",
  book: "book",
};

/** CrossRef türünü BibTeX giriş türüne çevirir; tanımadığını `misc` sayar. */
export function bibTuru(crossRefTuru?: string): string {
  if (!crossRefTuru) return "misc";
  return TUR_ESLEME[crossRefTuru] ?? "misc";
}

/* -------------------------------------------------------- anahtar üretimi */

const TURKCE_ASCII: Record<string, string> = {
  ç: "c", Ç: "c",
  ğ: "g", Ğ: "g",
  ı: "i", I: "i", İ: "i",
  ö: "o", Ö: "o",
  ş: "s", Ş: "s",
  ü: "u", Ü: "u",
};

/**
 * BibTeX anahtarları ASCII olmalı — LaTeX kaynak dosyasında `\cite{}` içine
 * Türkçe harf girdiğinde bazı derleyiciler anahtarı bulamıyor.
 */
export function asciiye(metin: string): string {
  return metin
    .replace(/[çÇğĞıIİöÖşŞüÜ]/g, (h) => TURKCE_ASCII[h] ?? h)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/** Yazarın anahtar için kullanılacak adı: soyadı, yoksa kurumun ilk kelimesi. */
function anahtarAdi(yazar?: BibYazar): string {
  if (!yazar) return "";
  if (yazar.soyad) return asciiye(yazar.soyad);
  if (yazar.kurum) return asciiye(yazar.kurum.split(/\s+/)[0] ?? "");
  if (yazar.ad) return asciiye(yazar.ad);
  return "";
}

/** Başlığın ASCII'ye çevrilince harf/rakam içeren ilk kelimesi. */
function ilkKelime(baslik?: string): string {
  if (!baslik) return "";
  for (const kelime of baslik.split(/\s+/)) {
    const temiz = asciiye(kelime);
    if (temiz) return temiz;
  }
  return "";
}

/**
 * `soyadYılİlkKelime` — ör. `cetlenbik2024iot`. Eksik parçalar atlanıyor;
 * hepsi birden eksikse kayıt yine de alıntılanabilsin diye DOI'ye düşülüyor.
 */
export function anahtarUret(kunye: BibKunye): string {
  const parcalar = [
    anahtarAdi(kunye.yazarlar[0]),
    kunye.yil ?? "",
    ilkKelime(kunye.baslik),
  ].filter(Boolean);
  const anahtar = parcalar.join("");
  return anahtar || asciiye(kunye.doi) || "kaynak";
}

/**
 * Aynı anahtar birden çok kez çıkarsa sonrakilere a, b, c ekler.
 * İlk kayıt olduğu gibi kalıyor; böylece tek kayıtlı olağan durumda anahtar
 * hiç değişmiyor, yalnızca çakışanlar ayrışıyor.
 */
export function anahtarlariTekillestir(anahtarlar: string[]): string[] {
  const sayac: Record<string, number> = {};
  return anahtarlar.map((a) => {
    const kacinci = sayac[a] ?? 0;
    sayac[a] = kacinci + 1;
    if (kacinci === 0) return a;
    // 1 → "a", 2 → "b" ... 26'dan sonra sayıya düşüyoruz, tükenmesin.
    return kacinci <= 26
      ? a + String.fromCharCode(96 + kacinci)
      : a + String(kacinci);
  });
}

/* ------------------------------------------------------------- BibTeX kaçışı */

/** BibTeX'te özel anlamı olan karakterler ters eğik çizgiyle kaçırılır. */
export function bibKacir(metin: string): string {
  return metin.replace(/[&%$#_{}]/g, (k) => "\\" + k);
}

const BUYUK_HARF = /[A-ZÇĞİÖŞÜ]/;
const KUCUK_HARF = /[a-zçğıöşü]/;

/**
 * CrossRef bazı yayıncıların başlığını tümü büyük harf kaydediyor. Böyle bir
 * başlıkta kelime kelime koruma anlamsız olurdu (her kelime parantezlenirdi),
 * bu yüzden ayrı ele alınıyor ve arayüzde kullanıcıya uyarı gösteriliyor.
 */
export function baslikTumuBuyuk(baslik: string): boolean {
  return BUYUK_HARF.test(baslik) && !KUCUK_HARF.test(baslik);
}

/**
 * Başlıkta büyük harf koruması.
 *
 * BibTeX çoğu stilde başlığı küçük harfe indiriyor; süslü parantez içindeki
 * bölümlere dokunmuyor. Bu yüzden ilk harfinden sonra da büyük harf içeren
 * kelimeler (IoT, DNA, COVID-19) parantezle korunuyor. Baştaki ve sondaki
 * noktalama parantezin dışında bırakılıyor ki kaynakçada garip durmasın.
 */
export function baslikHazirla(baslik: string): string {
  // Tümü büyük harfli kayıtta başlığın tamamı tek parantezle korunuyor;
  // kullanıcı büyük/küçük harfi düzeltmek isterse tek yerde düzeltiyor.
  if (baslikTumuBuyuk(baslik)) return "{" + bibKacir(baslik) + "}";
  return baslik
    .split(/(\s+)/)
    .map((parca) => {
      if (!parca || /^\s+$/.test(parca)) return parca;
      const bolum = /^([^0-9A-Za-zÇĞİÖŞÜçğıöşü]*)([\s\S]*?)([^0-9A-Za-zÇĞİÖŞÜçğıöşü]*)$/.exec(
        parca
      );
      if (!bolum) return bibKacir(parca);
      const [, on, govde, son] = bolum;
      const korunacak = govde.length > 1 && BUYUK_HARF.test(govde.slice(1));
      const kacirilmis = bibKacir(govde);
      return (
        bibKacir(on) + (korunacak ? "{" + kacirilmis + "}" : kacirilmis) + bibKacir(son)
      );
    })
    .join("");
}

/** BibTeX'te yazarlar "ve" ile değil " and " ile ayrılır. */
function yazarAlani(yazarlar: BibYazar[]): string | undefined {
  const adlar = yazarlar
    .map((y) => {
      // Kurum adları süslü parantezle veriliyor; yoksa BibTeX son kelimeyi
      // soyadı sanıp "Üniversitesi, Ege" gibi çeviriyor.
      if (!y.soyad && y.kurum) return "{" + bibKacir(y.kurum) + "}";
      const soyad = y.soyad ? bibKacir(y.soyad) : "";
      const ad = y.ad ? bibKacir(y.ad) : "";
      if (soyad && ad) return soyad + ", " + ad;
      return soyad || ad;
    })
    .filter(Boolean);
  return adlar.length ? adlar.join(" and ") : undefined;
}

/** CrossRef sayfa aralığını tek tire veriyor; BibTeX'te en–dash için çift tire. */
function sayfaAlani(sayfa?: string): string | undefined {
  if (!sayfa) return undefined;
  return sayfa.replace(/\s*-+\s*/g, "--");
}

/* ---------------------------------------------------------- kayıt üretimi */

type Alan = { ad: string; deger: string };

/** Tek bir künyeyi verilen anahtarla BibTeX kaydına çevirir. */
export function bibKaydiUret(kunye: BibKunye, anahtar: string): string {
  const tur = bibTuru(kunye.crossRefTuru);
  const alanlar: Alan[] = [];
  const ekle = (ad: string, deger?: string) => {
    if (deger && deger.trim()) alanlar.push({ ad, deger: deger.trim() });
  };

  ekle("author", yazarAlani(kunye.yazarlar));
  ekle("title", kunye.baslik ? baslikHazirla(kunye.baslik) : undefined);
  // Dergi makalesinde `journal`, bildiri ve kitap bölümünde `booktitle`.
  if (kunye.kap) {
    const kapAlani =
      tur === "inproceedings" || tur === "incollection" ? "booktitle" : "journal";
    if (tur !== "book" && tur !== "misc") ekle(kapAlani, bibKacir(kunye.kap));
    else if (tur === "misc") ekle("howpublished", bibKacir(kunye.kap));
  }
  ekle("volume", kunye.cilt ? bibKacir(kunye.cilt) : undefined);
  ekle("number", kunye.sayi ? bibKacir(kunye.sayi) : undefined);
  ekle("pages", sayfaAlani(kunye.sayfa));
  ekle("year", kunye.yil);
  ekle("doi", kunye.doi);
  ekle("publisher", kunye.yayinci ? bibKacir(kunye.yayinci) : undefined);

  const genislik = alanlar.reduce((en, a) => Math.max(en, a.ad.length), 0);
  const govde = alanlar
    .map((a) => "  " + a.ad.padEnd(genislik) + " = {" + a.deger + "}")
    .join(",\n");
  return "@" + tur + "{" + anahtar + ",\n" + govde + "\n}";
}

export type BibDosyasi = {
  metin: string;
  /** Künyelerle aynı sırada, tekilleştirilmiş anahtarlar. */
  anahtarlar: string[];
};

/**
 * Tüm künyelerden tek bir `.bib` metni üretir. Anahtar çakışması ancak bütün
 * liste elde olunca çözülebildiği için tekilleştirme burada yapılıyor.
 */
export function bibDosyasiUret(kunyeler: BibKunye[]): BibDosyasi {
  const anahtarlar = anahtarlariTekillestir(kunyeler.map(anahtarUret));
  const metin = kunyeler
    .map((k, i) => bibKaydiUret(k, anahtarlar[i]))
    .join("\n\n");
  return { metin, anahtarlar };
}
