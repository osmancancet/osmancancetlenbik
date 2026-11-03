import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { PdfBirlestiriciClient } from "./PdfBirlestiriciClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("pdf-birlestirici")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/pdf-birlestirici",
  title: `${tool.title} — Tarayıcıda PDF Birleştirme`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="pdf-birlestirici">
      <PdfBirlestiriciClient />
    </ToolShell>
  );
}
