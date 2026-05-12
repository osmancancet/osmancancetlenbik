import type { Metadata } from "next";
import { QrTrapClient } from "./QrTrapClient";

export const metadata: Metadata = {
  title: "Etkinlik Anketi · MCBÜKAF '26",
  description: "Sunum hakkındaki kısa anketi yanıtla.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <QrTrapClient />;
}
