import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Contact } from "@/components/sections/Contact";
import { seoMeta } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/de/kontakt",
  locale: "de",
  title: "Kontakt",
  description:
    "Nehmen Sie Kontakt auf zu Penetrationstests, App- und Webentwicklung, Daten- und KI-Projekten, Unternehmensschulungen oder wissenschaftlicher Zusammenarbeit.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Startseite", path: "/de" },
            { name: "Kontakt", path: "/de/kontakt" },
          ])
        )}
      />
      <PageShell
        eyebrow="Kontakt"
        title="Arbeiten wir zusammen."
        subtitle="Melden Sie sich für eine Sicherheitsprüfung, eine Produktentwicklung, eine Forschungskooperation oder ein Schulungsprogramm."
      >
        <Contact locale="de" />
      </PageShell>
    </>
  );
}
