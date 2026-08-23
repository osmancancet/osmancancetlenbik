import type { Metadata } from "next";
import { LocaleHome } from "@/components/sections/LocaleHome";
import { seoMeta } from "@/lib/seo/metadata";
import { professionalServiceJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/en",
  locale: "en",
  title: "Osman Can Çetlenbik — Cyber Security & Software Engineering",
  description:
    "Lecturer at Manisa Celal Bayar University. Web and mobile penetration testing, mobile and web application development, data & AI solutions and corporate cyber security training.",
  keywords: [
    "Osman Can Çetlenbik",
    "penetration testing Türkiye",
    "mobile app development",
    "web application security",
    "cyber security lecturer",
    "explainable AI",
  ],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(professionalServiceJsonLd("en"))}
      />
      <LocaleHome locale="en" />
    </>
  );
}
