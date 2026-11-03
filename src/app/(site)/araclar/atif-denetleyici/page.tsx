import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { AtifDenetleyiciClient } from "./AtifDenetleyiciClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("atif-denetleyici")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/atif-denetleyici",
  title: `${tool.title} — DOI Doğrulama`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="atif-denetleyici">
      <AtifDenetleyiciClient />
    </ToolShell>
  );
}
