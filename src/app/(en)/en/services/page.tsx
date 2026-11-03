import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Services } from "@/components/sections/Services";
import { seoMeta } from "@/lib/seo/metadata";
import { serviceFaq } from "@/data/services";
import {
  professionalServiceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  jsonLdScript,
} from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/en/services",
  locale: "en",
  title: "Services — Penetration Testing, Mobile & Web App Development",
  description:
    "Web and mobile application penetration testing, network and IoT security assessments, mobile and web app development, API engineering, data & AI solutions and corporate cyber security training.",
  keywords: [
    "web penetration testing",
    "mobile application penetration testing",
    "mobile app development",
    "web application development",
    "cyber security consulting",
    "IoT security testing",
    "social engineering assessment",
    "corporate security training",
    "Türkiye penetration testing",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(professionalServiceJsonLd("en"))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(serviceFaq.en))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", path: "/en" },
            { name: "Services", path: "/en/services" },
          ])
        )}
      />
      <PageShell
        eyebrow="Services"
        title="I build it, I break it, I teach it."
        subtitle="From penetration testing to mobile app development, from data science projects to corporate training — a service set that looks at your systems through both the attacker's and the builder's eyes."
      >
        <Services locale="en" />
      </PageShell>
    </>
  );
}
