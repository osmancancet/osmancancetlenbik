/**
 * Dört dilli katman.
 *
 * Türkçe içerik kök dizinde kalır (`/hakkimda`); diğer diller kendi ön ekleri
 * altına açılır (`/en/about`, `/de/ueber-mich`, `/ar/about`). Böylece Google'da
 * halihazırda dizinlenmiş Türkçe URL'ler hiç değişmez, yeni diller hreflang ile
 * onlara eşlenir.
 */

export const locales = ["tr", "en", "de", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

/** Dil seçicide gösterilen adlar. */
export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  de: "Deutsch",
  ar: "العربية",
};

/** hreflang değerleri (x-default her zaman Türkçe sürümü işaret eder). */
export const htmlLang: Record<Locale, string> = {
  tr: "tr-TR",
  en: "en",
  de: "de",
  ar: "ar",
};

export const ogLocale: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
  de: "de_DE",
  ar: "ar_AR",
};

/** Arapça sağdan sola yazılır — sayfa yönü buna göre ayarlanır. */
export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  tr: "ltr",
  en: "ltr",
  de: "ltr",
  ar: "rtl",
};

export type LocalizedRoute = Record<Locale, string>;

/**
 * Dört dilde de karşılığı olan sayfalar. Sadece burada listelenen yollara
 * hreflang bağlantısı basılır — karşılığı olmayan sayfaya sahte alternate
 * vermek Search Console'da hata üretir.
 */
export const localizedRoutes: ReadonlyArray<LocalizedRoute> = [
  { tr: "/", en: "/en", de: "/de", ar: "/ar" },
  {
    tr: "/hakkimda",
    en: "/en/about",
    de: "/de/ueber-mich",
    ar: "/ar/about",
  },
  {
    tr: "/hizmetler",
    en: "/en/services",
    de: "/de/leistungen",
    ar: "/ar/services",
  },
  {
    tr: "/yayinlar",
    en: "/en/publications",
    de: "/de/publikationen",
    ar: "/ar/publications",
  },
  {
    tr: "/iletisim",
    en: "/en/contact",
    de: "/de/kontakt",
    ar: "/ar/contact",
  },
];

/** Verilen yolun (hangi dilde olursa olsun) dört dilli karşılığını bulur. */
export function routeGroupFor(path: string): LocalizedRoute | null {
  const clean = path !== "/" ? path.replace(/\/$/, "") : "/";
  return (
    localizedRoutes.find((r) => locales.some((l) => r[l] === clean)) ?? null
  );
}

/**
 * `metadata.alternates.languages` için hreflang haritası.
 * Karşılığı yoksa `undefined` döner — tek dilli sayfalar temiz kalır.
 */
export function languageAlternates(
  path: string
): Record<string, string> | undefined {
  const group = routeGroupFor(path);
  if (!group) return undefined;
  const map: Record<string, string> = {};
  for (const l of locales) map[htmlLang[l]] = group[l];
  map["x-default"] = group.tr;
  return map;
}

/** Dil değiştirici için: bulunulan yolun hedef dildeki karşılığı. */
export function switchLocalePath(path: string, target: Locale): string {
  const group = routeGroupFor(path);
  if (group) return group[target];
  // Karşılığı olmayan sayfada dil değiştirilirse hedef dilin ana sayfasına düş.
  return target === "tr" ? "/" : `/${target}`;
}

export function localeFromPath(path: string): Locale {
  for (const l of locales) {
    if (l === "tr") continue;
    if (path === `/${l}` || path.startsWith(`/${l}/`)) return l;
  }
  return "tr";
}

/** Dile göre ana sayfa yolu. */
export function homePath(locale: Locale): string {
  return locale === "tr" ? "/" : `/${locale}`;
}
