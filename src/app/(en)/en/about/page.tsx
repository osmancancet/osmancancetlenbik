import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";
import { seoMeta } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/en/about",
  locale: "en",
  title: "About",
  description:
    "Osman Can Çetlenbik — lecturer at Manisa Celal Bayar University working on big data, artificial intelligence, cyber security and software engineering.",
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", path: "/en" },
            { name: "About", path: "/en/about" },
          ])
        )}
      />
      <PageShell
        eyebrow="About"
        title="Teaching and building."
        subtitle="I work where education and engineering meet."
      >
        <About locale="en" />
      </PageShell>
    </>
  );
}
