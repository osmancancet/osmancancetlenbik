import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { AkademisyenKartiClient } from "./AkademisyenKartiClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("akademisyen-karti")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/akademisyen-karti",
  title: `${tool.title} — Yayın, Atıf ve h-indeks Özetiniz Tek Görselde`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="akademisyen-karti">
      <AkademisyenKartiClient />
    </ToolShell>
  );
}
