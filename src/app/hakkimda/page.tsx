import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "Hakkımda",
  description:
    "Osman Can Çetlenbik — Manisa Celal Bayar Üniversitesi öğretim görevlisi. Büyük veri, yapay zekâ ve yazılım üzerine çalışıyorum.",
};

export default function HakkimdaPage() {
  return (
    <PageShell
      eyebrow="Hakkımda"
      title="Öğreten ve üreten."
      subtitle="Eğitim ile mühendisliğin kesiştiği noktada çalışıyorum."
    >
      <About />
    </PageShell>
  );
}
