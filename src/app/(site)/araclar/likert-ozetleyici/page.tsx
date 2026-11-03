import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { LikertOzetleyiciClient } from "./LikertOzetleyiciClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("likert-ozetleyici")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/likert-ozetleyici",
  title: `${tool.title} — Ortalama, Standart Sapma, Cronbach Alfa`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="likert-ozetleyici">
      <LikertOzetleyiciClient />
    </ToolShell>
  );
}
