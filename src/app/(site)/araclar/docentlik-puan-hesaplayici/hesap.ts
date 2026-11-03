import {
  DR_SONRASI_ASGARI,
  TOPLAM_ASGARI,
  yuvarla,
  type Bakis,
  type HesaplananKayit,
  type Kayit,
  type Kosul,
  type KosulSonucu,
  type Madde,
  type TemelAlan,
} from "./kriterler";

/**
 * Puan hesabı. Üç katman:
 *  1. Kayıt payı — yazar sayısı ve role göre çarpan.
 *  2. Madde toplamı — alt tavanlar, sonra madde tavanı.
 *  3. Genel — 100 puan ve doktora sonrası 90 puan şartı + alan koşulları.
 *
 * Doktora sonrası toplam, her maddede yalnızca doktora sonrası kayıtlar
 * varmış gibi aynı tavanlarla hesaplanıyor. ÜAK metni tavanın nasıl
 * paylaştırılacağını söylemiyor; bu en muhafazakâr (adayın aleyhine olmayan
 * ama şişirmeyen) yorum.
 */

export function yazarPayi(alan: TemelAlan, madde: Madde, k: Kayit): number {
  const n = Math.max(1, Math.floor(k.yazarSayisi));
  switch (madde.tip) {
    case "adet":
      return 1;
    case "danismanlik":
      return k.esDanisman ? 0.5 : 1;
    case "kisi":
    case "esit":
      return 1 / n;
    case "makale": {
      if (n === 1) return 1;
      if (alan.yazarKurali === "esit") return 1 / n;
      if (k.rol === "belirsiz") return 1 / n;
      if (n === 2) return k.rol === "baslica" ? 0.8 : 0.5;
      return k.rol === "baslica" ? 0.5 : 0.5 / (n - 1);
    }
  }
}

export type MaddeSonucu = {
  madde: Madde;
  ham: number;
  puan: number;
  drHam: number;
  drPuan: number;
  /** Tavan kesintisi oldu mu — arayüzde uyarı için. */
  kesildi: boolean;
};

function maddeTopla(madde: Madde, kayitlar: HesaplananKayit[]): number {
  const kodToplam = new Map<string, number>();
  for (const k of kayitlar) {
    kodToplam.set(k.bentKod, (kodToplam.get(k.bentKod) ?? 0) + k.puan);
  }
  let toplam = 0;
  const islenen = new Set<string>();
  for (const alt of madde.altTavanlar ?? []) {
    let grup = 0;
    for (const kod of alt.kodlar) {
      grup += kodToplam.get(kod) ?? 0;
      islenen.add(kod);
    }
    toplam += Math.min(grup, alt.tavan);
  }
  for (const [kod, p] of kodToplam) {
    if (!islenen.has(kod)) toplam += p;
  }
  return madde.tavan !== undefined ? Math.min(toplam, madde.tavan) : toplam;
}

export type HesapSonucu = {
  kayitlar: HesaplananKayit[];
  maddeler: MaddeSonucu[];
  toplam: number;
  drToplam: number;
  kosullar: (Kosul & KosulSonucu)[];
  genel: { toplamOk: boolean; drOk: boolean };
  hepsiTamam: boolean;
};

export function hesapla(
  alan: TemelAlan,
  kayitlar: Kayit[],
  altSecenek: string | null
): HesapSonucu {
  const maddeMap = new Map(alan.maddeler.map((m) => [m.no, m]));

  const hesaplanan: HesaplananKayit[] = [];
  for (const k of kayitlar) {
    const madde = maddeMap.get(k.maddeNo);
    const bent = madde?.bentler.find((b) => b.kod === k.bentKod);
    if (!madde || !bent) continue;
    const adet = Math.max(0, Math.floor(k.adet));
    const puan = bent.puan * adet * yazarPayi(alan, madde, k);
    hesaplanan.push({
      ...k,
      adet,
      // 3. maddede doktora sorulmaz; koşul süzgeçleri şaşmasın diye true.
      drSonrasi: madde.drSorulmaz ? true : k.drSonrasi,
      bent,
      madde,
      puan,
    });
  }

  const maddeler: MaddeSonucu[] = alan.maddeler.map((madde) => {
    const kendi = hesaplanan.filter((k) => k.maddeNo === madde.no);
    const ham = kendi.reduce((t, k) => t + k.puan, 0);
    const puan = maddeTopla(madde, kendi);
    const drKayit = kendi.filter((k) => k.drSonrasi);
    const drHam = drKayit.reduce((t, k) => t + k.puan, 0);
    const drPuan = madde.drSorulmaz ? 0 : maddeTopla(madde, drKayit);
    return {
      madde,
      ham: yuvarla(ham),
      puan: yuvarla(puan),
      drHam: yuvarla(drHam),
      drPuan: yuvarla(drPuan),
      kesildi: puan + 1e-9 < ham,
    };
  });

  const toplam = yuvarla(maddeler.reduce((t, m) => t + m.puan, 0));
  const drToplam = yuvarla(maddeler.reduce((t, m) => t + m.drPuan, 0));

  const bakis: Bakis = {
    kayitlar: hesaplanan,
    altSecenek,
    drPuan: (no, kodlar) =>
      hesaplanan
        .filter(
          (k) => k.maddeNo === no && k.drSonrasi && (!kodlar || kodlar.includes(k.bentKod))
        )
        .reduce((t, k) => t + k.puan, 0),
    drSayi: (no, kodlar, sart) =>
      hesaplanan
        .filter(
          (k) =>
            k.maddeNo === no &&
            k.drSonrasi &&
            (!kodlar || kodlar.includes(k.bentKod)) &&
            (!sart || sart(k))
        )
        .reduce((t, k) => t + k.adet, 0),
    sayi: (no, kodlar) =>
      hesaplanan
        .filter((k) => k.maddeNo === no && (!kodlar || kodlar.includes(k.bentKod)))
        .reduce((t, k) => t + k.adet, 0),
  };

  const kosullar = alan.kosullar.map((k) => ({ ...k, ...k.kontrol(bakis) }));
  const genel = {
    toplamOk: toplam >= TOPLAM_ASGARI,
    drOk: drToplam >= DR_SONRASI_ASGARI,
  };

  return {
    kayitlar: hesaplanan,
    maddeler,
    toplam,
    drToplam,
    kosullar,
    genel,
    hepsiTamam: genel.toplamOk && genel.drOk && kosullar.every((k) => k.saglandi),
  };
}

/** Panoya kopyalanacak düz metin özet. */
export function ozetMetni(alan: TemelAlan, s: HesapSonucu, donem: string): string {
  const satirlar = [
    `Doçentlik puan özeti — ${alan.ad} Temel Alanı (ÜAK ${donem}, Tablo ${alan.tabloNo})`,
    "",
    `Toplam puan: ${s.toplam} / ${TOPLAM_ASGARI}`,
    `${alan.unvan} sonrası puan (3. madde hariç): ${s.drToplam} / ${DR_SONRASI_ASGARI}`,
    "",
    "Madde dökümü:",
    ...s.maddeler
      .filter((m) => m.ham > 0)
      .map(
        (m) =>
          `  ${m.madde.no}. ${m.madde.ad}: ${m.puan}` +
          (m.kesildi ? ` (ham ${m.ham}, tavan uygulandı)` : "")
      ),
    "",
    "Asgari koşullar:",
    ...s.kosullar.map((k) => `  [${k.saglandi ? "✓" : "✗"}] ${k.metin} — ${k.durum}`),
    "",
    "Bu özet resmî değerlendirme değildir; ÜAK tablosuyla birlikte kullanın.",
  ];
  return satirlar.join("\n");
}
