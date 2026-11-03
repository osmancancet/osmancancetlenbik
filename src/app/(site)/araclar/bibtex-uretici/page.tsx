import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { BibtexUreticiClient } from "./BibtexUreticiClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("bibtex-uretici")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/bibtex-uretici",
  title: `${tool.title} — DOI'den .bib Dosyası`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="bibtex-uretici">
      <BibtexUreticiClient />
    </ToolShell>
  );
}
