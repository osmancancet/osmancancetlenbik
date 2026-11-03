import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { MetinIstatistikleriClient } from "./MetinIstatistikleriClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("metin-istatistikleri")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/metin-istatistikleri",
  title: `${tool.title} — Kelime Sayacı ve Okuma Süresi`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="metin-istatistikleri">
      <MetinIstatistikleriClient />
    </ToolShell>
  );
}
