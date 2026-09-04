import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { SinavKaristiriciClient } from "./SinavKaristiriciClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("sinav-karistirici")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/sinav-karistirici",
  title: `${tool.title} — A/B Kitapçık ve Cevap Anahtarı`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="sinav-karistirici">
      <SinavKaristiriciClient />
    </ToolShell>
  );
}
