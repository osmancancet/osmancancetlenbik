import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { JoinClient } from "./JoinClient";
import { seoMeta } from "@/lib/seo/metadata";

export const metadata: Metadata = seoMeta({
  path: "/canli",
  title: "Canlı Derse Katıl",
  description:
    "Derste tahtada görünen kodu girerek canlı oylamalara, yarışmalara ve soru–cevaba telefonunuzdan katılın.",
});

export default function CanliPage() {
  return (
    <PageShell
      eyebrow="Canlı Ders"
      title="Derse katıl."
      subtitle="Tahtadaki altı haneli kodu gir, telefonundan derse dahil ol. Hesap açmana gerek yok."
    >
      <div className="max-w-md">
        <Suspense fallback={null}>
          <JoinClient />
        </Suspense>
      </div>
    </PageShell>
  );
}
