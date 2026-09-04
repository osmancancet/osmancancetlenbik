/**
 * Kaynakça biçimleri: APA 7, IEEE ve Vancouver.
 *
 * Biçimlendirme mantığı bilerek React'ten ayrı: APA'nın 21 yazar kuralı ya da
 * IEEE'nin "et al." eşiği gibi ayrıntılar arayüzden bağımsız çalıştırılıp
 * doğrulanabilsin. Ayrıca CrossRef kayıtları çok eksikli geliyor — cilt, sayı,
 * sayfa, hatta yazar hiç olmayabiliyor. Her alan isteğe bağlı kabul edildi;
 * eksik alan satırdan tümüyle düşürülüyor, asla "undefined" basılmıyor.
 */

export type Bicim = "apa" | "ieee" | "vancouver";

export const BICIMLER: { anahtar: Bicim; ad: string; aciklama: string }[] = [
  { anahtar: "apa", ad: "APA 7", aciklama: "Sosyal bilimler, eğitim, psikoloji" },
  { anahtar: "ieee", ad: "IEEE", aciklama: "Mühendislik, bilgisayar bilimleri" },
  { anahtar: "vancouver", ad: "Vancouver", aciklama: "Tıp ve sağlık bilimleri" },
];

export type Yazar = { soyad?: string; ad?: string; tamAd?: string };

export type Kunye = {
  doi: string;
  yazarlar: Yazar[];
  baslik?: string;
  dergi?: string;
  cilt?: string;
  sayi?: string;
  sayfa?: string;
  yil?: string;
  /** CrossRef başlığı tümü büyük harf kaydetmiş mi? Arayüz bunu uyarı olarak gösteriyor. */
  baslikBuyukHarf: boolean;
};

/* ---------------------------------------------------------------- CrossRef */

function nesne(v: unknown): Record<string, unknown> | undefined {
  return typeof v === "object" && v !== null && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : undefined;
}

function metin(v: unknown): string | undefined {
  if (typeof v === "string") return v.trim() || undefined;
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return undefined;
}

/** CrossRef başlık ve dergi adını dizi olarak veriyor; ilk öğe asıl addır. */
function ilkMetin(v: unknown): string | undefined {
  return Array.isArray(v) ? metin(v[0]) : metin(v);
}

/**
 * Yayın yılı. `issued` yoksa basım/çevrimiçi tarihine, o da yoksa kaydın
 * oluşturulma tarihine düşülüyor — yıl olmadan hiçbir biçim doğru olmaz.
 */
function yilBul(m: Record<string, unknown>): string | undefined {
  for (const alan of ["issued", "published-print", "published-online", "published", "created"]) {
    const parcalar = nesne(m[alan])?.["date-parts"];
    if (!Array.isArray(parcalar) || !Array.isArray(parcalar[0])) continue;
    const y = metin(parcalar[0][0]);
    if (y && /^\d{4}$/.test(y)) return y;
  }
  return undefined;
}

function yazarlariAl(v: unknown): Yazar[] {
  if (!Array.isArray(v)) return [];
  const cikti: Yazar[] = [];
  for (const ham of v) {
    const y = nesne(ham);
    if (!y) continue;
    const soyad = metin(y.family);
    const ad = metin(y.given);
    // Kurum yazarlarında family/given yok, tek bir `name` alanı geliyor.
    const tamAd = metin(y.name);
    if (soyad || ad || tamAd) cikti.push({ soyad, ad, tamAd });
  }
  return cikti;
}

/** CrossRef `/works/<doi>` yanıtını künyeye çevirir. Şema doğrulanmadan güvenilmiyor. */
export function kunyeCozumle(doi: string, yanit: unknown): Kunye {
  const m = nesne(nesne(yanit)?.message) ?? {};
  const baslik = ilkMetin(m.title);
  return {
    doi,
    yazarlar: yazarlariAl(m.author),
    baslik,
    dergi: ilkMetin(m["container-title"]) ?? ilkMetin(m["short-container-title"]),
    cilt: metin(m.volume),
    sayi: metin(m.issue),
    sayfa: metin(m.page),
    yil: yilBul(m),
    // Yalnızca büyük harf içeren başlıklar CrossRef'te sık; APA cümle düzeni
    // ister, bu yüzden kullanıcıyı uyarıyoruz ama başlığı kendi başımıza
    // değiştirmiyoruz (kısaltmaları bozardık: IOT → Iot).
    baslikBuyukHarf: !!baslik && baslik.length > 8 && baslik === baslik.toUpperCase(),
  };
}

/* ------------------------------------------------------------------ Yardım */

/** "Osman Can" → "O. C." — çizgili adlarda çizgi korunur: "Jean-Pierre" → "J.-P." */
function basHarfler(ad?: string): string {
  if (!ad) return "";
  return ad
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((parca) =>
      parca
        .split("-")
        .filter(Boolean)
        .map((p) => `${[...p][0].toUpperCase()}.`)
        .join("-")
    )
    .join(" ");
}

/** "Osman Can" → "OC" — Vancouver noktasız ve bitişik ister. */
function bitisikBasHarfler(ad?: string): string {
  if (!ad) return "";
  return ad
    .split(/[\s.-]+/)
    .filter(Boolean)
    .map((p) => [...p][0].toUpperCase())
    .join("");
}

/** Cümle sonundaki noktayı yutar; biçim zaten kendi noktasını koyuyor. */
const noktasiz = (s: string) => s.replace(/[.\s]+$/, "");

/**
 * Parçayı tek bir cümle sonu noktalamasıyla bitirir.
 *
 * Kısaltmalar yüzünden gerekli: APA'da yazar bloğu zaten "Duman, B." diye
 * noktayla bitiyor, IEEE'de "et al." öyle. Körü körüne nokta silmek "B" ya da
 * "et al" bırakıyordu; körü körüne eklemek "B.." yapıyor. Soru/ünlem ile biten
 * başlıklara da ayrıca nokta konmuyor.
 */
function cumleSonu(s: string): string {
  const kirpik = noktasiz(s);
  return /[?!]$/.test(kirpik) ? kirpik : `${kirpik}.`;
}

const vurgula = (s: string, vurgu: boolean) => (vurgu ? `*${s}*` : s);

/** Sayfa aralığı tekse "p.", aralıksa "pp." (IEEE/Vancouver ayrımı). */
const tekSayfa = (sayfa: string) => !/[-–]/.test(sayfa);

/* --------------------------------------------------------------- APA 7 */

function apaYazar(y: Yazar): string {
  const bh = basHarfler(y.ad);
  if (y.soyad && bh) return `${y.soyad}, ${bh}`;
  if (y.soyad) return y.soyad;
  return y.tamAd ?? y.ad ?? "";
}

/**
 * APA 7 yazar listesi.
 * 2 yazarda "&", 3-20 yazarda son yazardan önce "&", 21 ve üstünde ilk 19
 * yazar + üç nokta + *son* yazar (aradakiler atılır, "&" kullanılmaz).
 */
function apaYazarlar(yazarlar: Yazar[]): string {
  const adlar = yazarlar.map(apaYazar).filter(Boolean);
  if (adlar.length === 0) return "";
  if (adlar.length === 1) return adlar[0];
  if (adlar.length <= 20) {
    return `${adlar.slice(0, -1).join(", ")}, & ${adlar[adlar.length - 1]}`;
  }
  return `${adlar.slice(0, 19).join(", ")}, . . . ${adlar[adlar.length - 1]}`;
}

export function apaSatiri(k: Kunye, vurgu = true): string {
  const parcalar: string[] = [];
  const yazarlar = apaYazarlar(k.yazarlar);
  const yil = `(${k.yil ?? "t.y."}).`; // t.y. = tarih yok

  if (yazarlar) {
    parcalar.push(cumleSonu(yazarlar), yil);
    if (k.baslik) parcalar.push(cumleSonu(k.baslik));
  } else if (k.baslik) {
    // Yazarsız kaynakta APA başlığı yazar yerine koyar.
    parcalar.push(cumleSonu(k.baslik), yil);
  } else {
    parcalar.push(yil);
  }

  if (k.dergi) {
    // Dergi adına dokunulmuyor: "IEEE Trans. Comput." gibi kısaltmalı adlarda
    // sondaki nokta adın parçası.
    let dergi = vurgula(k.dergi, vurgu);
    if (k.cilt) {
      dergi += `, ${vurgula(k.cilt, vurgu)}`;
      if (k.sayi) dergi += `(${k.sayi})`;
    }
    if (k.sayfa) dergi += `, ${k.sayfa}`;
    parcalar.push(`${dergi}.`);
  }

  parcalar.push(`https://doi.org/${k.doi}`);
  return parcalar.join(" ");
}

/* ----------------------------------------------------------------- IEEE */

function ieeeYazar(y: Yazar): string {
  const bh = basHarfler(y.ad);
  if (y.soyad && bh) return `${bh} ${y.soyad}`;
  if (y.soyad) return y.soyad;
  return y.tamAd ?? y.ad ?? "";
}

/** IEEE altı yazardan fazlasında ilk yazar + "et al." yazar. */
function ieeeYazarlar(yazarlar: Yazar[]): string {
  const adlar = yazarlar.map(ieeeYazar).filter(Boolean);
  if (adlar.length === 0) return "";
  if (adlar.length > 6) return `${adlar[0]} et al.`;
  if (adlar.length === 1) return adlar[0];
  return `${adlar.slice(0, -1).join(", ")}, and ${adlar[adlar.length - 1]}`;
}

/** IEEE'de başlığı ayıran virgül tırnağın içinde kalır; soru/ünlem varsa virgül konmaz. */
function ieeeBaslik(baslik: string): string {
  const kirpik = noktasiz(baslik);
  return /[?!]$/.test(kirpik) ? `"${kirpik}"` : `"${kirpik},"`;
}

export function ieeeSatiri(k: Kunye, sira: number, vurgu = true): string {
  // Başlıktan sonraki alanlar virgülle ayrılır; eksik olan tümden düşer.
  const kuyruk: string[] = [];
  if (k.dergi) kuyruk.push(vurgula(k.dergi, vurgu));
  if (k.cilt) kuyruk.push(`vol. ${k.cilt}`);
  if (k.sayi) kuyruk.push(`no. ${k.sayi}`);
  if (k.sayfa) kuyruk.push(`${tekSayfa(k.sayfa) ? "p." : "pp."} ${k.sayfa}`);
  kuyruk.push(k.yil ?? "n.d.");
  kuyruk.push(`doi: ${k.doi}`);

  const yazarlar = ieeeYazarlar(k.yazarlar);
  // "et al." kısaltmasının noktası korunuyor, ardından ayıran virgül gelir.
  const bas = yazarlar ? [yazarlar] : [];

  // IEEE'de makale başlığı tırnak içinde ve ayıran virgül tırnağın *içinde*
  // kalır; bu yüzden başlık düz birleştirmeye giremiyor, ayrı ekleniyor.
  const govde = k.baslik
    ? `${bas.length ? `${bas.join(", ")}, ` : ""}${ieeeBaslik(k.baslik)} ${kuyruk.join(", ")}`
    : [...bas, ...kuyruk].join(", ");

  return `[${sira}] ${govde}.`;
}

/* ------------------------------------------------------------ Vancouver */

function vancouverYazar(y: Yazar): string {
  const bh = bitisikBasHarfler(y.ad);
  if (y.soyad && bh) return `${y.soyad} ${bh}`;
  if (y.soyad) return y.soyad;
  return y.tamAd ?? y.ad ?? "";
}

/** Vancouver altı yazara kadar hepsini yazar, fazlasında ilk 6 + "et al.". */
function vancouverYazarlar(yazarlar: Yazar[]): string {
  const adlar = yazarlar.map(vancouverYazar).filter(Boolean);
  if (adlar.length === 0) return "";
  if (adlar.length > 6) return `${adlar.slice(0, 6).join(", ")}, et al.`;
  return adlar.join(", ");
}

export function vancouverSatiri(k: Kunye, sira: number): string {
  const parcalar: string[] = [];
  const yazarlar = vancouverYazarlar(k.yazarlar);
  if (yazarlar) parcalar.push(cumleSonu(yazarlar));
  if (k.baslik) parcalar.push(cumleSonu(k.baslik));
  if (k.dergi) parcalar.push(cumleSonu(k.dergi));

  // Yıl;Cilt(Sayı):sayfa — Vancouver bu bloğu boşluksuz yazar.
  let kunyeBlok = k.yil ?? "";
  if (k.cilt) {
    kunyeBlok += `;${k.cilt}`;
    if (k.sayi) kunyeBlok += `(${k.sayi})`;
    if (k.sayfa) kunyeBlok += `:${k.sayfa}`;
  } else if (k.sayfa) {
    kunyeBlok += `:${k.sayfa}`;
  }
  if (kunyeBlok) parcalar.push(`${kunyeBlok}.`);

  parcalar.push(`doi: ${k.doi}`);
  return `${sira}. ${parcalar.join(" ")}`;
}

/* --------------------------------------------------------------- Toplu */

const turkceSirala = new Intl.Collator("tr", { sensitivity: "base" });

/**
 * Künyeleri istenen biçimde sıralar ve numaralandırır.
 *
 * APA kaynakçayı yazar soyadına göre alfabetik ister; IEEE ve Vancouver ise
 * metinde geçiş sırasını korur — bu yüzden yalnızca APA'da sıralama yapılıyor.
 */
export function kaynakcaUret(kunyeler: Kunye[], bicim: Bicim, vurgu = true): string[] {
  if (bicim === "apa") {
    const sirali = [...kunyeler].sort((a, b) =>
      turkceSirala.compare(
        a.yazarlar[0]?.soyad ?? a.yazarlar[0]?.tamAd ?? a.baslik ?? "",
        b.yazarlar[0]?.soyad ?? b.yazarlar[0]?.tamAd ?? b.baslik ?? ""
      )
    );
    return sirali.map((k) => apaSatiri(k, vurgu));
  }
  if (bicim === "ieee") {
    return kunyeler.map((k, i) => ieeeSatiri(k, i + 1, vurgu));
  }
  return kunyeler.map((k, i) => vancouverSatiri(k, i + 1));
}

/** Metinden DOI ayıkla. DOI'ler "10." ile başlar ve boşluğa kadar sürer. */
export function doiAyikla(text: string): string[] {
  const re = /10\.\d{4,9}\/[^\s"'<>,;)\]]+/g;
  const bulunan = (text.match(re) ?? []).map((d) =>
    // Cümle sonundaki noktalama DOI'ye yapışır; temizle.
    d.replace(/[.,;:)\]]+$/, "")
  );
  return [...new Set(bulunan)];
}
