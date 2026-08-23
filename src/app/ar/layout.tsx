import type { ReactNode } from "react";

/**
 * القسم العربي — يُكتب من اليمين إلى اليسار.
 *
 * Kök `<html>` `lang="tr"` ve `dir="ltr"` olduğu için Arapça içerik ağacı
 * burada `lang="ar" dir="rtl"` ile işaretlenir; ilk HTML'de yer aldığından
 * JavaScript çalışmadan da yön doğru gelir.
 */
export default function ArLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="ar" dir="rtl">
      {children}
    </div>
  );
}
