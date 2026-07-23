import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Mobil uygulamalar, web platformları, veri & yapay zekâ araçları ve oyunlar — açık kaynak projeler ve canlı ürünler.",
};

export default function ProjelerPage() {
  return (
    <PageShell
      eyebrow="Çalışmalar"
      title="Projeler"
      subtitle="Mobil uygulamalardan web platformlarına, veri araçlarından oyunlara — geliştirdiğim açık kaynak projeler ve canlı ürünler."
    >
      <Projects />
    </PageShell>
  );
}
