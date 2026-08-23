import type { Metadata } from "next";
import { canonicalOnly } from "@/lib/seo/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Publications } from "@/components/sections/Publications";

export const metadata: Metadata = {
  title: "Yayınlar",
  description:
    "Yapay zekâ, siber güvenlik ve veri bilimi alanlarındaki akademik çalışmalar.",
  alternates: canonicalOnly("/yayinlar"),
};

export default function YayinlarPage() {
  return (
    <PageShell
      eyebrow="Araştırma"
      title="Akademik Yayınlar"
      subtitle="Yapay zekâ, siber güvenlik ve veri bilimi alanlarında çalışmalar."
    >
      <Publications />
    </PageShell>
  );
}
