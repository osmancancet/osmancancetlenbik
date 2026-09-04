/**
 * Sayfa aralığı ifadelerinin çözümlenmesi.
 *
 * Arayüzden ayrı duruyor çünkü burada bir hata sessizce yanlış sayfaları
 * içeren bir PDF üretir — kullanıcı bunu ancak dosyayı açtığında fark eder.
 * Bu yüzden çözümleyici hataları yutmuyor, anlaşılır bir Türkçe mesajla
 * geri dönüyor.
 */

/** Tek bir çıktı dosyası: adında görünecek etiket ve 0 tabanlı sayfa indisleri. */
export type Parca = { etiket: string; indisler: number[] };

export type CozumSonucu =
  | { tamam: true; parcalar: Parca[] }
  | { tamam: false; hata: string };

/**
 * "1-40, 55, 60-80" gibi bir ifadeyi çözer.
 *
 * Virgülle ayrılan her öğe ayrı bir çıktı dosyasına karşılık gelir; bölücünün
 * asıl işi bu. Öğeleri tek dosyada toplamak isteyen için `tekDosya` seçeneği
 * var — o durumda sıra korunur ve tekrar eden sayfalar birden çok kez eklenmez.
 */
export function araliklariCoz(
  ifade: string,
  toplamSayfa: number,
  tekDosya: boolean
): CozumSonucu {
  const ogeler = ifade
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (ogeler.length === 0) {
    return { tamam: false, hata: "Bir sayfa aralığı yazın. Örnek: 1-40, 55, 60-80" };
  }

  const parcalar: Parca[] = [];

  for (const oge of ogeler) {
    // Kullanıcılar kısa tire yerine uzun tire ya da en tire yapıştırabiliyor.
    const duz = oge.replace(/[–—]/g, "-");
    const eslesme = /^([0-9]+)(?:\s*-\s*([0-9]+))?$/.exec(duz);
    if (!eslesme) {
      return {
        tamam: false,
        hata: `"${oge}" anlaşılamadı. Yalnızca sayı ve tire kullanın: 1-40, 55, 60-80`,
      };
    }

    const bas = Number(eslesme[1]);
    const son = eslesme[2] === undefined ? bas : Number(eslesme[2]);

    if (bas < 1) {
      return { tamam: false, hata: "Sayfa numaraları 1'den başlar." };
    }
    if (son < bas) {
      return {
        tamam: false,
        hata: `"${oge}" tersine yazılmış. Küçük sayfa numarası önce gelmeli.`,
      };
    }
    if (son > toplamSayfa) {
      return {
        tamam: false,
        hata: `Bu PDF ${toplamSayfa} sayfa; "${oge}" bunun dışında kalıyor.`,
      };
    }

    const indisler: number[] = [];
    for (let s = bas; s <= son; s++) indisler.push(s - 1);
    parcalar.push({ etiket: bas === son ? `${bas}` : `${bas}-${son}`, indisler });
  }

  if (!tekDosya) return { tamam: true, parcalar };

  const birlesik: number[] = [];
  const gorulen = new Set<number>();
  for (const parca of parcalar) {
    for (const i of parca.indisler) {
      if (!gorulen.has(i)) {
        gorulen.add(i);
        birlesik.push(i);
      }
    }
  }
  return {
    tamam: true,
    parcalar: [{ etiket: parcalar.map((p) => p.etiket).join("_"), indisler: birlesik }],
  };
}

/**
 * "Her N sayfada bir böl" kipi.
 *
 * Varsayılan 100: yapay zekâ araçlarının çoğu bundan büyük PDF'lerde
 * görselleri işlemiyor, bu aracın varlık sebebi de o sınır.
 */
export function esitBol(toplamSayfa: number, adim: number): CozumSonucu {
  if (!Number.isInteger(adim) || adim < 1) {
    return { tamam: false, hata: "Parça büyüklüğü en az 1 sayfa olmalı." };
  }
  if (toplamSayfa < 1) {
    return { tamam: false, hata: "PDF'te sayfa bulunamadı." };
  }

  const parcalar: Parca[] = [];
  for (let bas = 0; bas < toplamSayfa; bas += adim) {
    const son = Math.min(bas + adim, toplamSayfa);
    const indisler: number[] = [];
    for (let i = bas; i < son; i++) indisler.push(i);
    parcalar.push({ etiket: `${bas + 1}-${son}`, indisler });
  }
  return { tamam: true, parcalar };
}

/** Dosya adının uzantısını atar; çıktı adları özgün addan türetiliyor. */
export function tabanAd(dosyaAdi: string): string {
  const temiz = dosyaAdi.replace(/\.pdf$/i, "").trim();
  return temiz.length > 0 ? temiz : "belge";
}
