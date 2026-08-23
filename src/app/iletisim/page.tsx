import type { Metadata } from "next";
import { canonicalOnly } from "@/lib/seo/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Akademik iş birliği, danışmanlık ve diğer iletişim kanalları.",
  alternates: canonicalOnly("/iletisim"),
};

export default function IletisimPage() {
  return (
    <PageShell
      eyebrow="İletişim"
      title="Birlikte çalışalım."
      subtitle="Akademik iş birliği, danışmanlık ya da yeni bir proje için bana ulaşabilirsiniz."
    >
      <Contact />
    </PageShell>
  );
}
