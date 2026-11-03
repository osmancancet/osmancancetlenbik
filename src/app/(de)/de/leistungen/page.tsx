import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Services } from "@/components/sections/Services";
import { seoMeta } from "@/lib/seo/metadata";
import { serviceFaq } from "@/data/services";
import {
  professionalServiceJsonLd,
  faqJsonLd,
} from "@/lib/seo/jsonLd";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/de/leistungen",
  locale: "de",
  title: "Leistungen — Penetrationstests, App- und Webentwicklung",
  description:
    "Penetrationstests für Web- und Mobilanwendungen, Netzwerk- und IoT-Sicherheitsprüfungen, App- und Webentwicklung, API-Engineering, Daten- und KI-Lösungen sowie Cybersicherheitsschulungen für Unternehmen.",
  keywords: [
    "Penetrationstest",
    "Pentest Türkei",
    "App-Entwicklung",
    "Webentwicklung",
    "IT-Sicherheitsberatung",
    "IoT-Sicherheit",
    "Phishing-Simulation",
    "Cybersicherheitsschulung",
  ],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(professionalServiceJsonLd("de"))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(serviceFaq.de))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Startseite", path: "/de" },
            { name: "Leistungen", path: "/de/leistungen" },
          ])
        )}
      />
      <PageShell
        eyebrow="Leistungen"
        title="Ich baue es, ich breche es, ich lehre es."
        subtitle="Von Penetrationstests bis zur App-Entwicklung, von Data-Science-Projekten bis zur Unternehmensschulung — ein Leistungsspektrum, das Ihre Systeme mit den Augen des Angreifers und des Entwicklers zugleich betrachtet."
      >
        <Services locale="de" />
      </PageShell>
    </>
  );
}
