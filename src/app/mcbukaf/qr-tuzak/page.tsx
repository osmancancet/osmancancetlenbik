import type { Metadata } from "next";
import { QRTrapClient } from "./QRTrapClient";

export const metadata: Metadata = {
  title: "Tebrikler!",
  description: "Ödülünü almak için son bir adım kaldı.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <QRTrapClient />;
}
