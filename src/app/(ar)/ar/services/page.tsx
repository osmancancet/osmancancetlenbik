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
  path: "/ar/services",
  locale: "ar",
  title: "الخدمات — اختبار الاختراق وتطوير تطبيقات الهاتف والويب",
  description:
    "اختبار اختراق تطبيقات الويب والهاتف، وتقييم أمن الشبكات وإنترنت الأشياء، وتطوير تطبيقات الهاتف والويب، وهندسة واجهات البرمجة، وحلول البيانات والذكاء الاصطناعي، وتدريب الشركات على الأمن السيبراني.",
  keywords: [
    "اختبار الاختراق",
    "اختبار اختراق الويب",
    "تطوير تطبيقات الهاتف",
    "تطوير الويب",
    "استشارات الأمن السيبراني",
    "أمن إنترنت الأشياء",
    "محاكاة التصيد",
    "تدريب الأمن السيبراني",
  ],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(professionalServiceJsonLd("ar"))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(serviceFaq.ar))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "الرئيسية", path: "/ar" },
            { name: "الخدمات", path: "/ar/services" },
          ])
        )}
      />
      <PageShell
        eyebrow="الخدمات"
        title="أبنيه، وأكسره، وأُعلّمه."
        subtitle="من اختبار الاختراق إلى تطوير تطبيقات الهاتف، ومن مشاريع علم البيانات إلى تدريب الشركات — مجموعة خدمات تنظر إلى أنظمتكم بعين المهاجم وعين المطوّر معًا."
      >
        <Services locale="ar" />
      </PageShell>
    </>
  );
}
