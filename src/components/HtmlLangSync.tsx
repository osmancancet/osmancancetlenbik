"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { htmlLang, localeDir, localeFromPath } from "@/lib/i18n";

/**
 * `<html lang>` ve `<html dir>` sunucuda Türkçe/ltr olarak basılır (kök layout
 * tek ve statik). Dil bölümlerinde içerik ağacı zaten `lang`/`dir` ile
 * işaretleniyor; bu bileşen ek olarak kök elemanı da senkronlar — ekran
 * okuyucular, tarayıcı çeviri motoru ve `::selection` gibi kök seviyesindeki
 * davranışlar doğru dili görsün diye.
 */
export function HtmlLangSync() {
  const pathname = usePathname() || "/";
  useEffect(() => {
    const locale = localeFromPath(pathname);
    document.documentElement.lang = htmlLang[locale];
    document.documentElement.dir = localeDir[locale];
  }, [pathname]);
  return null;
}
