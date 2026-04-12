import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "GitHub'daki öne çıkan açık kaynak ve kişisel projeler.",
};

export default function ProjelerPage() {
  return (
    <PageShell
      eyebrow="Çalışmalar"
      title="Projeler"
      subtitle="GitHub'daki öne çıkan açık kaynak ve kişisel projelerim."
    >
      <Projects />
    </PageShell>
  );
}
