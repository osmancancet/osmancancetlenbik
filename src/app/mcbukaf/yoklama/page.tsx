import type { Metadata } from "next";
import { YoklamaClient } from "./YoklamaClient";

export const metadata: Metadata = {
  title: "Yoklama · Bilgi Teknolojileri",
  description: "Ders yoklaması — QR ile imza.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <YoklamaClient />;
}
