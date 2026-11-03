import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { OrtakYazarAgiClient } from "./OrtakYazarAgiClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("ortak-yazar-agi")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/ortak-yazar-agi",
  title: `${tool.title} — Akademik İş Birliği Haritanız Tek Görselde`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="ortak-yazar-agi">
      <OrtakYazarAgiClient />
    </ToolShell>
  );
}
