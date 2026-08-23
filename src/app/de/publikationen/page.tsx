import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Publications } from "@/components/sections/Publications";
import { seoMeta } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/de/publikationen",
  locale: "de",
  title: "Publikationen",
  description:
    "Begutachtete Artikel und Konferenzbeiträge zu künstlicher Intelligenz, Cybersicherheit, IoT-Sicherheit und Data Science.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Startseite", path: "/de" },
            { name: "Publikationen", path: "/de/publikationen" },
          ])
        )}
      />
      <PageShell
        eyebrow="Forschung"
        title="Wissenschaftliche Publikationen"
        subtitle="Arbeiten zu künstlicher Intelligenz, Cybersicherheit und Data Science."
      >
        <Publications locale="de" />
      </PageShell>
    </>
  );
}
