import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { YayinListesiClient } from "./YayinListesiClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("yayin-listesi")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/yayin-listesi",
  title: `${tool.title} — Akademik Başvuru Biçimi`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="yayin-listesi">
      <YayinListesiClient />
    </ToolShell>
  );
}
