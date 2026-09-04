import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { TurkceDuzelticiClient } from "./TurkceDuzelticiClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("turkce-duzeltici")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/turkce-duzeltici",
  title: `${tool.title} — Bozuk Karakterleri Onar`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="turkce-duzeltici">
      <TurkceDuzelticiClient />
    </ToolShell>
  );
}
