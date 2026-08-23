import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";
import { seoMeta } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/ar/about",
  locale: "ar",
  title: "نبذة عني",
  description:
    "عثمان جان تشتلنبيك — محاضر في جامعة مانيسا جلال بايار، يعمل في مجالات البيانات الضخمة والذكاء الاصطناعي والأمن السيبراني وهندسة البرمجيات.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "الرئيسية", path: "/ar" },
            { name: "نبذة عني", path: "/ar/about" },
          ])
        )}
      />
      <PageShell
        eyebrow="نبذة"
        title="أُعلّم وأبني."
        subtitle="أعمل عند نقطة التقاء التعليم بالهندسة."
      >
        <About locale="ar" />
      </PageShell>
    </>
  );
}
