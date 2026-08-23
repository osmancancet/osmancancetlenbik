import type { Metadata } from "next";
import { LocaleHome } from "@/components/sections/LocaleHome";
import { seoMeta } from "@/lib/seo/metadata";
import { professionalServiceJsonLd, jsonLdScript } from "@/lib/seo/jsonLd";

export const metadata: Metadata = seoMeta({
  path: "/ar",
  locale: "ar",
  title: "عثمان جان تشتلنبيك — الأمن السيبراني وهندسة البرمجيات",
  description:
    "محاضر في جامعة مانيسا جلال بايار. اختبار اختراق للويب والهاتف، وتطوير تطبيقات الهاتف والويب، وحلول البيانات والذكاء الاصطناعي، وتدريب الشركات على الأمن السيبراني.",
  keywords: [
    "عثمان جان تشتلنبيك",
    "اختبار الاختراق",
    "اختبار اختراق الويب",
    "تطوير تطبيقات الهاتف",
    "استشارات الأمن السيبراني",
    "الذكاء الاصطناعي القابل للتفسير",
  ],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(professionalServiceJsonLd("ar"))}
      />
      <LocaleHome locale="ar" />
    </>
  );
}
