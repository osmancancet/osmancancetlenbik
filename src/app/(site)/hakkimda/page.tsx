import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";
import { aboutExtra } from "@/data/aboutPage";
import { faqJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/hakkimda",
  title: "Hakkımda",
  description:
    "Osman Can Çetlenbik — Manisa Celal Bayar Üniversitesi öğretim görevlisi. Büyük veri, yapay zekâ ve yazılım üzerine çalışıyorum.",
});

export default function HakkimdaPage() {
  const extra = aboutExtra("tr");
  return (
    <PageShell
      eyebrow="Hakkımda"
      title="Öğreten ve üreten."
      subtitle="Eğitim ile mühendisliğin kesiştiği noktada çalışıyorum."
    >
      {extra && extra.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(extra.faq))}
        />
      )}
      <About extra={extra} />
    </PageShell>
  );
}
