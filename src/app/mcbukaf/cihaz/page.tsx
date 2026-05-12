import type { Metadata } from "next";
import { headers } from "next/headers";
import { DeviceFingerprintClient } from "./DeviceFingerprintClient";

export const metadata: Metadata = {
  title: "Cihaz Kontrolü",
  description: "Cihazınız taranıyor.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const h = await headers();
  const ua = h.get("user-agent") || "—";
  const xff = h.get("x-forwarded-for") || h.get("x-real-ip") || "—";
  const lang = h.get("accept-language") || "—";
  const ip = xff.split(",")[0]?.trim() || "—";
  // mask middle octet for display
  const maskedIp = ip.replace(/(\d+\.\d+)\.\d+(\.\d+)/, "$1.***$2");

  return (
    <DeviceFingerprintClient
      ip={maskedIp}
      userAgent={ua}
      acceptLang={lang}
    />
  );
}
