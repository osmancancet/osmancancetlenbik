import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { NotHesaplayiciClient } from "./NotHesaplayiciClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("not-hesaplayici")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/not-hesaplayici",
  title: `${tool.title} — Ağırlıklı Ortalama ve Harf Notu`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="not-hesaplayici">
      <NotHesaplayiciClient />
    </ToolShell>
  );
}
