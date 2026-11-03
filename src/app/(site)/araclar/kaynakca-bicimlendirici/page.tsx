import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { KaynakcaBicimlendiriciClient } from "./KaynakcaBicimlendiriciClient";
import { getTool } from "@/data/tools";
import { seoMeta } from "@/lib/seo/metadata";

const tool = getTool("kaynakca-bicimlendirici")!;

export const metadata: Metadata = seoMeta({
  path: "/araclar/kaynakca-bicimlendirici",
  title: `${tool.title} — APA, IEEE ve Vancouver`,
  description: tool.description,
  keywords: tool.keywords,
});

export default function Page() {
  return (
    <ToolShell slug="kaynakca-bicimlendirici">
      <KaynakcaBicimlendiriciClient />
    </ToolShell>
  );
}
