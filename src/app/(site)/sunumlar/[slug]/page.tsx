import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  publicTalks,
  getPublicTalk,
  getUnlistedTalk,
} from "@/presentations/publicTalks";
import { PresentationHost } from "@/components/PresentationHost";
import { seoMeta } from "@/lib/seo/metadata";

/**
 * Paylaşıma açık sunumlar. Ders sunumları buradan yayımlanmıyor — onlar
 * ilgili hafta sayfasından erişiliyor ve ikinci bir adresten yayımlanmaları
 * Google'da kopya sayfa üretirdi (bkz. registry `publicShare`).
 *
 * Aynı yol, listelenmeyen sunumları da açıyor (`unlistedTalks`): kapalı
 * eğitimler için, bağlantıyı bilenin açabildiği ama dizine girmeyen sayfalar.
 * Statik parametrelere ve sitemap'e girmiyorlar; `noindex` ile geliyorlar.
 */

export function generateStaticParams() {
  return publicTalks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPublicTalk(slug);
  if (!meta) {
    const gizli = getUnlistedTalk(slug);
    if (gizli) {
      return { title: gizli.title, robots: { index: false, follow: false } };
    }
    return { title: "Sunum bulunamadı", robots: { index: false } };
  }

  return seoMeta({
    path: `/sunumlar/${slug}`,
    title: meta.title,
    description: meta.description,
    type: "article",
  });
}

export default async function PublicPresentationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (getPublicTalk(slug)) {
    return <PresentationHost slug={slug} backHref="/" />;
  }

  const gizli = getUnlistedTalk(slug);
  if (!gizli) notFound();

  return <PresentationHost slug={gizli.slug} backHref="/" />;
}
