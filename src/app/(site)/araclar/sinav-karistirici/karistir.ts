/**
 * Sınav karıştırıcının saf katmanı: ayrıştırma, tohumlu karıştırma, çıktı.
 *
 * Arayüzden ayrı duruyor — çünkü sessizce yanlış çalışması en pahalı yer
 * burası. Bir şık yanlış eşleşirse eğitmen bunu ancak sınav kâğıtlarını
 * okurken fark eder. Bu yüzden ayrıştırıcı şüphelendiği her durumda satır
 * numarasıyla hata veriyor, tahmin yürütmüyor.
 */

export type Soru = {
  /** Kaynak metindeki soru gövdesi (numara olmadan). */
  govde: string;
  /** Şık metinleri — kaynak sırasıyla. */
  siklar: string[];
  /** Doğru şıkkın kaynak metindeki dizini. */
  dogru: number;
  /** Sorunun başladığı satır numarası — hata iletilerinde kullanılıyor. */
  satir: number;
};

export type AyristirmaHatasi = {
  satir: number;
  mesaj: string;
};

export type AyristirmaSonucu =
  | { basarili: true; sorular: Soru[] }
  | { basarili: false; hata: AyristirmaHatasi };

/** Soru başlangıcı: "1.", "1)", "S1.", "Soru 1:" gibi biçimleri kabul eder. */
const SORU_DESENI = /^(?:s(?:oru)?\s*)?(\d{1,3})\s*[.)\-:]\s*(.*)$/i;

/**
 * Şık satırı: isteğe bağlı `*` işareti + tek harf + ayraç.
 * `*b)`, `b)`, `A.`, `c -` ve satır sonundaki `*` da kabul ediliyor.
 * Türkçe şık harfleri (ç, ş, ı...) de geçerli sayılıyor.
 */
const SIK_DESENI = /^(\*?)\s*([a-zçğıöşüA-ZÇĞIİÖŞÜ])\s*[.)\-]\s*(.*)$/;

/** Şıklarda kullanılacak harfler — çıktıda ve cevap anahtarında ortak. */
export const SIK_HARFLERI = "abcdefghijkl".split("");

/**
 * Yapıştırılan metni sorulara çevir.
 *
 * Satır satır bir durum makinesi: soru satırı yeni soru açar, şık satırı
 * açık soruya şık ekler, diğer satırlar bir öncekinin devamı sayılır (uzun
 * soru gövdeleri satır kaydırıldığında bölünmesin diye).
 */
export function ayristir(metin: string): AyristirmaSonucu {
  const satirlar = metin.split(/\r?\n/);
  const sorular: Soru[] = [];
  let acik: Soru | null = null;
  // Devam satırının nereye ekleneceğini bilmek için son yazılan yeri tutuyoruz.
  let sonHedef: "govde" | "sik" | null = null;

  for (let i = 0; i < satirlar.length; i++) {
    const satirNo = i + 1;
    const ham = satirlar[i].trim();
    if (ham === "") {
      sonHedef = null;
      continue;
    }

    const soruEsleme = ham.match(SORU_DESENI);
    // Bir satır hem soru hem şık desenine uyamaz: soru numarası rakam,
    // şık harfi harftir. Yine de sırayı soru lehine kuruyoruz.
    if (soruEsleme) {
      if (acik) {
        const hata = soruyuDogrula(acik);
        if (hata) return { basarili: false, hata };
        sorular.push(acik);
      }
      acik = {
        govde: soruEsleme[2].trim(),
        siklar: [],
        dogru: -1,
        satir: satirNo,
      };
      sonHedef = "govde";
      continue;
    }

    const sikEsleme = ham.match(SIK_DESENI);
    if (sikEsleme) {
      if (!acik) {
        return {
          basarili: false,
          hata: {
            satir: satirNo,
            mesaj: `"${ham}" bir şık gibi görünüyor ama öncesinde soru yok. Şıklardan önce numaralı bir soru satırı olmalı.`,
          },
        };
      }
      let sikMetni = sikEsleme[3].trim();
      let dogruMu = sikEsleme[1] === "*";
      // Bazı eğitmenler yıldızı satır sonuna koyuyor; onu da kabul edelim.
      if (sikMetni.endsWith("*")) {
        dogruMu = true;
        sikMetni = sikMetni.slice(0, -1).trim();
      }
      if (dogruMu && acik.dogru !== -1) {
        return {
          basarili: false,
          hata: {
            satir: satirNo,
            mesaj: `${acik.satir}. satırdaki soruda birden fazla şık yıldızla işaretlenmiş. Her soruda tek doğru şık olmalı.`,
          },
        };
      }
      if (dogruMu) acik.dogru = acik.siklar.length;
      acik.siklar.push(sikMetni);
      sonHedef = "sik";
      continue;
    }

    // Devam satırı: son yazdığımız yere ekle.
    if (acik && sonHedef === "sik" && acik.siklar.length > 0) {
      acik.siklar[acik.siklar.length - 1] += " " + ham;
      continue;
    }
    if (acik && sonHedef === "govde") {
      acik.govde = (acik.govde + " " + ham).trim();
      continue;
    }

    return {
      basarili: false,
      hata: {
        satir: satirNo,
        mesaj: `"${ham}" satırı çözümlenemedi. Soru satırı "1." ya da "S1." ile, şık satırı "a)" ya da "A." ile başlamalı.`,
      },
    };
  }

  if (acik) {
    const hata = soruyuDogrula(acik);
    if (hata) return { basarili: false, hata };
    sorular.push(acik);
  }

  if (sorular.length === 0) {
    return {
      basarili: false,
      hata: {
        satir: 1,
        mesaj:
          "Metinde soru bulunamadı. Beklenen biçim için aşağıdaki örneğe bakın.",
      },
    };
  }

  return { basarili: true, sorular };
}

/** Tamamlanan bir soruyu kapatmadan önce denetle. */
function soruyuDogrula(s: Soru): AyristirmaHatasi | null {
  if (s.govde === "") {
    return { satir: s.satir, mesaj: "Soru metni boş." };
  }
  if (s.siklar.length < 2) {
    return {
      satir: s.satir,
      mesaj: `Bu soruda ${s.siklar.length} şık var. En az iki şık gerekli.`,
    };
  }
  if (s.siklar.length > SIK_HARFLERI.length) {
    return {
      satir: s.satir,
      mesaj: `Bu soruda ${s.siklar.length} şık var; en fazla ${SIK_HARFLERI.length} şık desteklenir.`,
    };
  }
  if (s.dogru === -1) {
    return {
      satir: s.satir,
      mesaj:
        "Doğru şık işaretlenmemiş. Doğru şıkkın başına yıldız koyun: *b) ...",
    };
  }
  return null;
}

/**
 * Metin tohumunu 32 bitlik sayıya çeviren FNV-1a karması.
 * Aynı metin her zaman aynı sayıyı verir — tekrar üretilebilirliğin temeli.
 */
export function tohumSayisi(tohum: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < tohum.length; i++) {
    h ^= tohum.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * mulberry32 — küçük, hızlı ve deterministik bir rastgele sayı üreteci.
 * Math.random() kullanmıyoruz: eğitmen aynı tohumla aynı sınavı yeniden
 * üretebilmeli (kayıp kâğıt, ikinci baskı, itiraz incelemesi).
 */
export function uretec(cekirdek: number): () => number {
  let a = cekirdek >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher-Yates — verilen üreteçle, kaynağı bozmadan karıştırır. */
export function karistir<T>(dizi: T[], rnd: () => number): T[] {
  const k = [...dizi];
  for (let i = k.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [k[i], k[j]] = [k[j], k[i]];
  }
  return k;
}

export type FormSorusu = {
  govde: string;
  siklar: string[];
  /** Karıştırma sonrası doğru şıkkın bu formdaki dizini. */
  dogru: number;
};

export type Form = {
  /** A, B, C... */
  etiket: string;
  sorular: FormSorusu[];
};

/** Form etiketleri; sekiz formdan fazlası pratikte anlamsız. */
export const FORM_ETIKETLERI = "ABCDEFGH".split("");

/**
 * Formları üret.
 *
 * Her formun kendi üreteci var: tohum + form etiketi. Böylece hem tüm çıktı
 * tek tohumla yeniden üretilebiliyor hem de formlar birbirinden farklı
 * çıkıyor. A formu da karıştırılıyor — "A zaten orijinal" varsayımı, aynı
 * soruların aynı sırada dolaştığı bir sınav demek olurdu.
 */
export function formlariUret(
  sorular: Soru[],
  formSayisi: number,
  tohum: string
): Form[] {
  const formlar: Form[] = [];
  for (let f = 0; f < formSayisi; f++) {
    const etiket = FORM_ETIKETLERI[f] ?? String(f + 1);
    const rnd = uretec(tohumSayisi(`${tohum}|form:${etiket}`));
    const sirali = karistir(sorular, rnd);
    const formSorulari: FormSorusu[] = sirali.map((s) => {
      // Şıkları karıştırırken doğru şıkkı işaretle taşıyoruz ki yeni
      // konumunu aramak zorunda kalmayalım (aynı metinli iki şık olabilir).
      const isaretli = s.siklar.map((metin, i) => ({
        metin,
        dogruMu: i === s.dogru,
      }));
      const yeni = karistir(isaretli, rnd);
      return {
        govde: s.govde,
        siklar: yeni.map((x) => x.metin),
        dogru: yeni.findIndex((x) => x.dogruMu),
      };
    });
    formlar.push({ etiket, sorular: formSorulari });
  }
  return formlar;
}

/** Tek bir formun basılabilir metni. */
export function formMetni(form: Form): string {
  const satirlar: string[] = [`FORM ${form.etiket}`, "=".repeat(20), ""];
  form.sorular.forEach((s, i) => {
    satirlar.push(`${i + 1}. ${s.govde}`);
    s.siklar.forEach((sik, j) => {
      satirlar.push(`${SIK_HARFLERI[j]}) ${sik}`);
    });
    satirlar.push("");
  });
  return satirlar.join("\n").trimEnd();
}

/** "Form A: 1-c, 2-a, 3-d" biçiminde cevap anahtarı. */
export function cevapAnahtari(form: Form): string {
  const cevaplar = form.sorular.map(
    (s, i) => `${i + 1}-${SIK_HARFLERI[s.dogru]}`
  );
  return `Form ${form.etiket}: ${cevaplar.join(", ")}`;
}

/** Tüm formlar + tüm cevap anahtarları — indirilen .txt dosyasının içeriği. */
export function tumCikti(formlar: Form[], tohum: string): string {
  const parcalar = formlar.map(formMetni);
  const anahtarlar = [
    "CEVAP ANAHTARLARI",
    "=".repeat(20),
    ...formlar.map(cevapAnahtari),
    "",
    `Tohum: ${tohum}`,
    "Aynı tohum ve aynı soru metniyle bu formlar birebir yeniden üretilir.",
  ].join("\n");
  return [...parcalar, anahtarlar].join("\n\n\n");
}
