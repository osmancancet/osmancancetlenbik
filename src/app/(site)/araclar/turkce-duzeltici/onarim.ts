/**
 * Bozuk Türkçe metin onarımı (mojibake).
 *
 * Mantık bilerek React'ten ayrı bir dosyada: kurallar saf fonksiyon olarak
 * dursun ki arayüzden bağımsız çalıştırılıp doğrulanabilsin.
 *
 * Sorunun kaynağı: UTF-8 kodlanmış metin, tek baytlık bir kodlama
 * (Windows-1252 / Latin-1) sanılarak okunduğunda her bayt ayrı bir harfe
 * dönüşüyor. "ö" harfinin iki baytı (C3 B6) "Ã" ve "¶" olarak görünüyor.
 *
 * Çözüm: harfleri bayta geri çevirip UTF-8 olarak yeniden çözmek. Tablo
 * tutmaktan daha doğru, çünkü tek bir tablo tüm harf çiftlerini kapsayamaz.
 */

/**
 * Windows-1252'nin 0x80-0x9F aralığı Latin-1'den ayrılıyor; bu baytlar tırnak,
 * tire, Œ gibi harflere karşılık geliyor. Naif `charCodeAt(0) & 0xff` yöntemi
 * bunları yanlış bayta çeviriyor — örneğin "Ã–nemli" içindeki "–" (U+2013)
 * aslında 0x96 baytı. Ters tablo olmadan "Önemli" çıkmıyor, bu yüzden var.
 */
const CP1252_OZEL: Record<string, number> = {
  "€": 0x80, "‚": 0x82, "ƒ": 0x83, "„": 0x84,
  "…": 0x85, "†": 0x86, "‡": 0x87, "ˆ": 0x88,
  "‰": 0x89, "Š": 0x8a, "‹": 0x8b, "Œ": 0x8c,
  "Ž": 0x8e, "‘": 0x91, "’": 0x92, "“": 0x93,
  "”": 0x94, "•": 0x95, "–": 0x96, "—": 0x97,
  "˜": 0x98, "™": 0x99, "š": 0x9a, "›": 0x9b,
  "œ": 0x9c, "ž": 0x9e, "Ÿ": 0x9f,
};

/**
 * Yedek eşleme: UTF-8 çözümü işe yaramayan *tekil* bozuk harfler için.
 *
 * İki durumda gerekiyor:
 * 1) Çift baytın ikincisi yolda düşmüş olabiliyor. "ş" (C5 9F) → "ÅŸ" olur ama
 *    bazı sistemler 0x9F baytını atıyor ve geriye yalnız "Å" kalıyor. Tek
 *    başına "Å" geçerli bir UTF-8 dizisi değil, çözülemiyor.
 * 2) Latin-5 (ISO-8859-9) metnin Latin-1 sanılması: "İstanbul" → "Ýstanbul".
 *
 * Değerler [küçük, büyük] çifti. "Å" ve "Ä" için asıl harfin büyük mü küçük mü
 * olduğu kayıp olduğundan komşu harflere bakılarak seçiliyor.
 */
const KIRIK_ESLEME: Record<string, [string, string]> = {
  "Å": ["ş", "Ş"], // Å — "ÅŸ" (ş) / "Åž" (Ş) dizisinin artığı
  "Ä": ["ğ", "Ğ"], // Ä — "ÄŸ" (ğ) / "Äž" (Ğ) dizisinin artığı
  "ð": ["ğ", "ğ"], // ð — Latin-5 0xF0
  "Ð": ["Ğ", "Ğ"], // Ð — Latin-5 0xD0
  "þ": ["ş", "ş"], // þ — Latin-5 0xFE
  "Þ": ["Ş", "Ş"], // Þ — Latin-5 0xDE
  "ý": ["ı", "ı"], // ý — Latin-5 0xFD
  "Ý": ["İ", "İ"], // Ý — Latin-5 0xDD
};

const DEGISTIRME = "�"; // TextDecoder'ın "çözemedim" işareti: �
const COZUCU = new TextDecoder("utf-8");

const BUYUK_HARF = /\p{Lu}/u;
const HARF = /\p{L}/u;

/** Bir harfi, Windows-1252 okumasının ürettiği bayta geri çevirir. */
function harfBayti(ch: string): number | null {
  const kod = ch.codePointAt(0);
  if (kod === undefined) return null;
  if (kod <= 0xff) return kod;
  const ozel = CP1252_OZEL[ch];
  return ozel === undefined ? null : ozel;
}

/** UTF-8 dizisinin ilk baytına bakıp toplam uzunluğunu söyler. */
function diziUzunlugu(bayt: number): number {
  if (bayt >= 0xc2 && bayt <= 0xdf) return 2;
  if (bayt >= 0xe0 && bayt <= 0xef) return 3;
  if (bayt >= 0xf0 && bayt <= 0xf4) return 4;
  return 0; // geçersiz başlangıç
}

const devamBayti = (b: number) => b >= 0x80 && b <= 0xbf;

/**
 * Kayıp ikinci bayt yüzünden çözülemeyen harfi tabloyla onarır.
 * Büyük/küçük seçimi komşu harflerden: "BaÅlat" → "ş", "BAÅLAT" → "Ş".
 */
function tekHarfOnar(ch: string, metin: string, indeks: number): string | null {
  const esleme = KIRIK_ESLEME[ch];
  if (!esleme) return null;
  const [kucuk, buyuk] = esleme;
  if (kucuk === buyuk) return kucuk;

  const sonraki = metin[indeks + 1] ?? "";
  const onceki = metin[indeks - 1] ?? "";
  const buyukMu = HARF.test(sonraki)
    ? BUYUK_HARF.test(sonraki)
    : BUYUK_HARF.test(onceki);
  return buyukMu ? buyuk : kucuk;
}

type Parca = { kaynak: string; sonuc: string; degisti: boolean };

/**
 * Bir bozuk öbeği (ardışık ASCII dışı harfler) çözer.
 *
 * Öbeği tek parça çözmek yerine bayt bayt yürüyoruz: metnin bir kısmı sağlam
 * çözülüp bir harfi kırıksa, sağlam kısmı kaybetmeden yalnız kırık harfe
 * tabloyla dokunabiliyoruz.
 */
function obekCoz(harfler: string[], baytlar: number[], baslangic: number, metin: string): Parca[] {
  const parcalar: Parca[] = [];
  let i = 0;
  while (i < baytlar.length) {
    const uzunluk = diziUzunlugu(baytlar[i]);
    let gecerli = uzunluk > 0 && i + uzunluk <= baytlar.length;
    if (gecerli) {
      for (let k = 1; k < uzunluk; k++) {
        if (!devamBayti(baytlar[i + k])) {
          gecerli = false;
          break;
        }
      }
    }

    if (gecerli) {
      const dilim = baytlar.slice(i, i + uzunluk);
      const cozulen = COZUCU.decode(Uint8Array.from(dilim));
      const kaynak = harfler.slice(i, i + uzunluk).join("");
      // Çözüm � ürettiyse (aşırı uzun kodlama, vekil aralık) dokunma.
      const basarili = !cozulen.includes(DEGISTIRME);
      parcalar.push({
        kaynak,
        sonuc: basarili ? cozulen : kaynak,
        degisti: basarili && cozulen !== kaynak,
      });
      i += uzunluk;
      continue;
    }

    // Tek bayt çözülemedi: yedek tabloyu dene.
    const kaynak = harfler[i];
    const onarilan = tekHarfOnar(kaynak, metin, baslangic + i);
    parcalar.push({
      kaynak,
      sonuc: onarilan ?? kaynak,
      degisti: onarilan !== null && onarilan !== kaynak,
    });
    i += 1;
  }
  return parcalar;
}

/** Hangi bozuk parçanın neye dönüştüğü ve kaç kez geçtiği. */
export type Degisiklik = { kaynak: string; sonuc: string; adet: number };

export type OnarimSonucu = {
  /** Onarılmış metin. Onarım gerekmediyse özgün metnin aynısı. */
  metin: string;
  degisti: boolean;
  /** Kaynakta kaç harfin yerine yenisi kondu. */
  duzeltilenKarakter: number;
  /** Kaç ayrı bozuk parça onarıldı. */
  duzeltmeSayisi: number;
  /** "tam": bütün metin tek seferde çözüldü. "parcali": kırık yerler tabloyla tamamlandı. */
  yontem: "tam" | "parcali" | "yok";
  /** Sıklığa göre sıralı değişiklik özeti — kullanıcı ne olduğunu görebilsin. */
  degisiklikler: Degisiklik[];
  not: string;
};

/** Aynı bozulmayı tek satırda toplayıp sık geçenden başlayarak sıralar. */
function degisiklikOzeti(parcalar: Parca[]): Degisiklik[] {
  const sayac = new Map<string, Degisiklik>();
  for (const p of parcalar) {
    if (!p.degisti) continue;
    const anahtar = `${p.kaynak}\u0000${p.sonuc}`;
    const mevcut = sayac.get(anahtar);
    if (mevcut) mevcut.adet += 1;
    else sayac.set(anahtar, { kaynak: p.kaynak, sonuc: p.sonuc, adet: 1 });
  }
  return [...sayac.values()].sort((a, b) => b.adet - a.adet);
}

/**
 * Metnin tamamını tek seferde çözmeyi dener.
 * Yalnızca *hiç* kayıp olmayan, düzgün bozulmuş metinlerde başarılı olur;
 * doğrulama amaçlı: parçalı sonuçla aynı çıkarsa onarım güvenilir demektir.
 */
function tamMetinDene(metin: string): string | null {
  const baytlar: number[] = [];
  for (const ch of metin) {
    const b = harfBayti(ch);
    if (b === null) return null; // Metinde zaten sağlam Türkçe harf var.
    baytlar.push(b);
  }
  const cozulen = COZUCU.decode(Uint8Array.from(baytlar));
  return cozulen.includes(DEGISTIRME) ? null : cozulen;
}

/** Bozuk Türkçe metni onarır. Metin sağlamsa olduğu gibi geri verir. */
export function onar(girdi: string): OnarimSonucu {
  if (!girdi) {
    return {
      metin: girdi,
      degisti: false,
      duzeltilenKarakter: 0,
      duzeltmeSayisi: 0,
      yontem: "yok",
      degisiklikler: [],
      not: "Onarılacak metin yok.",
    };
  }

  const parcalar: Parca[] = [];
  let i = 0;
  while (i < girdi.length) {
    const ch = girdi[i];
    const bayt = ch.charCodeAt(0) < 0x80 ? null : harfBayti(ch);
    if (bayt === null) {
      // ASCII ya da bayta çevrilemeyen harf: olduğu gibi kalsın.
      parcalar.push({ kaynak: ch, sonuc: ch, degisti: false });
      i += 1;
      continue;
    }
    // Ardışık ASCII dışı harfleri topla — UTF-8 çok baytlı diziler
    // tamamen 0x80 üstü baytlardan oluşur, öbek sınırı burasıdır.
    const harfler: string[] = [];
    const baytlar: number[] = [];
    const baslangic = i;
    while (i < girdi.length) {
      const c = girdi[i];
      if (c.charCodeAt(0) < 0x80) break;
      const b = harfBayti(c);
      if (b === null) break;
      harfler.push(c);
      baytlar.push(b);
      i += 1;
    }
    parcalar.push(...obekCoz(harfler, baytlar, baslangic, girdi));
  }

  const sonuc = parcalar.map((p) => p.sonuc).join("");
  const degisenler = parcalar.filter((p) => p.degisti);
  const duzeltilenKarakter = degisenler.reduce((t, p) => t + p.kaynak.length, 0);

  // Güvenlik ağı: onarım � ürettiyse sonuç özgün metinden kötüdür, geri al.
  if (!girdi.includes(DEGISTIRME) && sonuc.includes(DEGISTIRME)) {
    return {
      metin: girdi,
      degisti: false,
      duzeltilenKarakter: 0,
      duzeltmeSayisi: 0,
      yontem: "yok",
      degisiklikler: [],
      not: "Bu metin zaten düzgün görünüyor — onarım denemesi sonucu bozacaktı, özgün hâli korundu.",
    };
  }

  if (degisenler.length === 0) {
    return {
      metin: girdi,
      degisti: false,
      duzeltilenKarakter: 0,
      duzeltmeSayisi: 0,
      yontem: "yok",
      degisiklikler: [],
      not: "Bu metin zaten düzgün görünüyor — bozuk karakter bulunamadı.",
    };
  }

  const tam = tamMetinDene(girdi);
  const yontem: "tam" | "parcali" = tam === sonuc ? "tam" : "parcali";

  return {
    metin: sonuc,
    degisti: true,
    duzeltilenKarakter,
    duzeltmeSayisi: degisenler.length,
    yontem,
    degisiklikler: degisiklikOzeti(parcalar),
    not:
      yontem === "tam"
        ? "Metin bütünüyle yeniden çözüldü; sonuç güvenilir."
        : "Bazı harflerin ikinci baytı kayıptı; bunlar yaygın bozulma tablosuyla tamamlandı — sonucu gözden geçirin.",
  };
}
