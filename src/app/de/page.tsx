import type { Metadata } from "next";
import { LocaleHome } from "@/components/sections/LocaleHome";
import { seoMeta } from "@/lib/seo/metadata";
import { professionalServiceJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/de",
  locale: "de",
  title: "Osman Can Çetlenbik — Cybersicherheit & Softwareentwicklung",
  description:
    "Dozent an der Manisa Celal Bayar Universität. Penetrationstests für Web und Mobil, App- und Webentwicklung, Daten- und KI-Lösungen sowie Cybersicherheitsschulungen für Unternehmen.",
  keywords: [
    "Osman Can Çetlenbik",
    "Penetrationstest",
    "Pentest Türkei",
    "App-Entwicklung",
    "IT-Sicherheitsberatung",
    "erklärbare KI",
  ],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(professionalServiceJsonLd("de"))}
      />
      <LocaleHome locale="de" />
    </>
  );
}
