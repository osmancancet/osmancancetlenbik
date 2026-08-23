import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Contact } from "@/components/sections/Contact";
import { seoMeta } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/en/contact",
  locale: "en",
  title: "Contact",
  description:
    "Get in touch about penetration testing, mobile and web development, data & AI projects, corporate training or academic collaboration.",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", path: "/en" },
            { name: "Contact", path: "/en/contact" },
          ])
        )}
      />
      <PageShell
        eyebrow="Contact"
        title="Let's work together."
        subtitle="Reach out about a security assessment, a product build, a research collaboration or a training programme."
      >
        <Contact locale="en" />
      </PageShell>
    </>
  );
}
