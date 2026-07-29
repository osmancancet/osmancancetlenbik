/**
 * Alıştırma slaytlarında öğrencinin çıktısını beklenen çıktıyla karşılaştırır.
 */

export type CompareMode = "loose" | "exact" | "contains";

export type CompareOptions = {
  mode?: CompareMode;
  ignoreCase?: boolean;
};

/**
 * TÜRKÇE İÇİN KRİTİK: `.normalize("NFC")`.
 * "ş" harfi hem tek kod noktası (U+015F) hem de "s" + birleştirici çengel
 * (U+0073 U+0327) olarak yazılabilir. Görsel olarak aynı, bayt olarak farklı.
 * NFC uygulanmazsa öğrencinin doğru cevabı "yanlış" görünebilir.
 */
export function normalizeOutput(s: string, opt: CompareOptions = {}): string {
  const mode = opt.mode ?? "loose";
  let t = s.replace(/\r\n?/g, "\n").normalize("NFC");

  if (mode !== "exact") {
    // Satır sonlarındaki görünmez boşlukları ve sondaki boş satırları tolere et.
    // Satır İÇİ boşluk bilerek tolere EDİLMEZ — çıktı biçimi de dersin konusu.
    t = t
      .split("\n")
      .map((l) => l.replace(/[ \t]+$/g, ""))
      .join("\n")
      .replace(/\n+$/g, "");
  }

  // toLocaleLowerCase("tr-TR") şart: Türkçede I→ı ve İ→i'dir; varsayılan
  // İngilizce kurallar "İzmir" ile "izmir"i yanlış eşleştirir.
  if (opt.ignoreCase) t = t.toLocaleLowerCase("tr-TR");

  return t;
}

export type CompareResult =
  | { pass: true }
  | {
      pass: false;
      /** İlk farklı satırın 1 tabanlı numarası (yoksa null). */
      line: number | null;
      expected: string | null;
      actual: string | null;
    };

export function compareOutput(
  actual: string,
  expected: string,
  opt: CompareOptions = {}
): CompareResult {
  const mode = opt.mode ?? "loose";
  const a = normalizeOutput(actual, opt);
  const e = normalizeOutput(expected, opt);

  if (mode === "contains") {
    return a.includes(e) ? { pass: true } : { pass: false, line: null, expected: e, actual: a };
  }

  if (a === e) return { pass: true };

  // İlk farklı satırı bul — tüm cevabı vermeden yönlendirir
  const al = a.split("\n");
  const el = e.split("\n");
  for (let i = 0; i < Math.max(al.length, el.length); i++) {
    if (al[i] !== el[i]) {
      return {
        pass: false,
        line: i + 1,
        expected: el[i] ?? null,
        actual: al[i] ?? null,
      };
    }
  }
  return { pass: false, line: null, expected: e, actual: a };
}
