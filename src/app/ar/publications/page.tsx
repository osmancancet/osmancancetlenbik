import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Publications } from "@/components/sections/Publications";
import { seoMeta } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/ar/publications",
  locale: "ar",
  title: "المنشورات",
  description:
    "مقالات محكّمة وأوراق مؤتمرات في الذكاء الاصطناعي والأمن السيبراني وأمن إنترنت الأشياء وعلم البيانات.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "الرئيسية", path: "/ar" },
            { name: "المنشورات", path: "/ar/publications" },
          ])
        )}
      />
      <PageShell
        eyebrow="البحث"
        title="المنشورات الأكاديمية"
        subtitle="أعمال في الذكاء الاصطناعي والأمن السيبراني وعلم البيانات."
      >
        <Publications locale="ar" />
      </PageShell>
    </>
  );
}
