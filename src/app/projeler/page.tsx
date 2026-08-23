import type { Metadata } from "next";
import { canonicalOnly } from "@/lib/seo/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Mobil uygulamalar, web platformları, veri & yapay zekâ araçları ve oyunlar — açık kaynak projeler ve canlı ürünler.",
  alternates: canonicalOnly("/projeler"),
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
