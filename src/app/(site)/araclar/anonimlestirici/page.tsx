import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { AnonimlestiriciClient } from "./AnonimlestiriciClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("anonimlestirici")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/anonimlestirici",
  title: `${tool.title} — Kişisel Veri Temizleme`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="anonimlestirici">
      <AnonimlestiriciClient />
    </ToolShell>
  );
}
