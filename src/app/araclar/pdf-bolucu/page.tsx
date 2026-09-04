import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { PdfBolucuClient } from "./PdfBolucuClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("pdf-bolucu")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/pdf-bolucu",
  title: `${tool.title} — Tarayıcıda PDF Bölme`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="pdf-bolucu">
      <PdfBolucuClient />
    </ToolShell>
  );
}
