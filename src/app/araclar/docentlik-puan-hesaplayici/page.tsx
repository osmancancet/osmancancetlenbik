import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { DocentlikClient } from "./DocentlikClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("docentlik-puan-hesaplayici")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/docentlik-puan-hesaplayici",
  title: `${tool.title} — ÜAK 2026 Kriterleri`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="docentlik-puan-hesaplayici">
      <DocentlikClient />
    </ToolShell>
  );
}
