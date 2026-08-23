import type { ReactNode } from "react";

/**
 * İngilizce bölüm. Kök `<html lang="tr">` olduğu için içerik ağacı burada
 * `lang="en"` ile işaretlenir — ilk HTML'de yer aldığı için tarayıcılar ve
 * arama motorları JavaScript çalıştırmadan da doğru dili görür.
 */
export default function EnLayout({ children }: { children: ReactNode }) {
  return <div lang="en">{children}</div>;
}
