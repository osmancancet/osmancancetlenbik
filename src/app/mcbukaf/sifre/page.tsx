import type { Metadata } from "next";
import { PasswordTestClient } from "./PasswordTestClient";

export const metadata: Metadata = {
  title: "Şifre Testi · MCBÜKAF'26",
  description:
    "Şifreni yaz — entropi, kırma süresi ve sızıntı kontrolünü canlı gör.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PasswordTestClient />;
}
