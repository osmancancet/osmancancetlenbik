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
  path: "/hizmetler",
  title: "Hizmetler — Sızma Testi, Mobil ve Web Uygulama Geliştirme",
  description:
    "Web sızma testi, mobil uygulama sızma testi, mobil ve web uygulama geliştirme, API geliştirme, IoT güvenlik testi, veri analitiği & yapay zekâ çözümleri ve kurumsal siber güvenlik eğitimi.",
  keywords: [
    "web sızma testi",
    "penetrasyon testi",
    "mobil uygulama sızma testi",
    "mobil uygulama geliştirme",
    "web uygulaması geliştirme",
    "siber güvenlik danışmanlığı",
    "IoT güvenlik testi",
    "sosyal mühendislik testi",
    "kurumsal siber güvenlik eğitimi",
    "Manisa siber güvenlik",
  ],
});

export default function HizmetlerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(professionalServiceJsonLd("tr"))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(serviceFaq.tr))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Hizmetler", path: "/hizmetler" },
          ])
        )}
      />
      <PageShell
        eyebrow="Hizmetler"
        title="Kuran, kıran ve öğreten bir yaklaşım."
        subtitle="Sızma testinden mobil uygulama geliştirmeye, veri bilimi projelerinden kurumsal eğitime kadar; hem saldırganın hem geliştiricinin gözünden bakan bir hizmet seti."
      >
        <Services locale="tr" />
      </PageShell>
    </>
  );
}
