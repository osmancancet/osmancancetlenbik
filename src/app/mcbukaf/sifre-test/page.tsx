import type { Metadata } from "next";
import { PasswordTestClient } from "./PasswordTestClient";

export const metadata: Metadata = {
  title: "Şifre Testi · MCBÜKAF'26",
  description:
    "Şifreni yaz — entropi, kırma süresi ve sızıntı kontrolünü canlı gör.",
};

export default function Page() {
  return <PasswordTestClient />;
}
