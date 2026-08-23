import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";
import { seoMeta } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/de/ueber-mich",
  locale: "de",
  title: "Über mich",
  description:
    "Osman Can Çetlenbik — Dozent an der Manisa Celal Bayar Universität mit Schwerpunkt Big Data, künstliche Intelligenz, Cybersicherheit und Softwareentwicklung.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Startseite", path: "/de" },
            { name: "Über mich", path: "/de/ueber-mich" },
          ])
        )}
      />
      <PageShell
        eyebrow="Über mich"
        title="Lehren und bauen."
        subtitle="Ich arbeite dort, wo Bildung und Ingenieurwesen aufeinandertreffen."
      >
        <About locale="de" />
      </PageShell>
    </>
  );
}
