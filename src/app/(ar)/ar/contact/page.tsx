import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Contact } from "@/components/sections/Contact";
import { seoMeta } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/ar/contact",
  locale: "ar",
  title: "تواصل معي",
  description:
    "تواصلوا معي بشأن اختبار الاختراق، أو تطوير تطبيقات الهاتف والويب، أو مشاريع البيانات والذكاء الاصطناعي، أو تدريب الشركات، أو التعاون الأكاديمي.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "الرئيسية", path: "/ar" },
            { name: "تواصل معي", path: "/ar/contact" },
          ])
        )}
      />
      <PageShell
        eyebrow="تواصل"
        title="لنعمل معًا."
        subtitle="راسلوني لإجراء تقييم أمني، أو بناء منتج، أو تعاون بحثي، أو برنامج تدريبي."
      >
        <Contact locale="ar" />
      </PageShell>
    </>
  );
}
