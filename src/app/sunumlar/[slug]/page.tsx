import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicTalks, getPublicTalk } from "@/presentations/publicTalks";
import { PresentationHost } from "@/components/PresentationHost";
import { seoMeta } from "@/lib/seo/metadata";

/**
 * Paylaşıma açık sunumlar. Ders sunumları buradan yayımlanmıyor — onlar
 * ilgili hafta sayfasından erişiliyor ve ikinci bir adresten yayımlanmaları
 * Google'da kopya sayfa üretirdi (bkz. registry `publicShare`).
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
  if (!meta) return { title: "Sunum bulunamadı", robots: { index: false } };

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
  if (!getPublicTalk(slug)) notFound();

  return <PresentationHost slug={slug} backHref="/" />;
}
