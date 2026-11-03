import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Publications } from "@/components/sections/Publications";
import { seoMeta } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/en/publications",
  locale: "en",
  title: "Publications",
  description:
    "Peer-reviewed articles and conference papers on artificial intelligence, cyber security, IoT security and data science.",
});

export default function PublicationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", path: "/en" },
            { name: "Publications", path: "/en/publications" },
          ])
        )}
      />
      <PageShell
        eyebrow="Research"
        title="Academic Publications"
        subtitle="Work on artificial intelligence, cyber security and data science."
      >
        <Publications locale="en" />
      </PageShell>
    </>
  );
}
