import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import { databaseConfigured, prisma } from "@/lib/prisma";
import { SlideDeck } from "@/components/SlideDeck";
import { PresentationHost } from "@/components/PresentationHost";
import type { Metadata } from "next";

// Konferans slaytları — etkileşimli deck, arama sonucunda değeri yok.
const NOINDEX: Metadata = {
  title: "Sunum",
  robots: { index: false, follow: false },
};

const loadConference = cache(async (id: string) => {
  if (!databaseConfigured()) return null;
  return prisma.conference.findUnique({ where: { id } });
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const conference = await loadConference(id);
  if (!conference) notFound();
  return NOINDEX;
}

// İçerik yalnızca admin panelden değişiyor ve her değişiklik önbelleği
// anında tazeliyor (bkz. lib/revalidate.ts). Bu süre sadece güvenlik ağı.
export const revalidate = 86400;

// Boş liste: sayfalar build'de değil, ilk ziyarette üretilip önbelleğe
// alınır (ISR). Bu satır olmadan Next.js her isteği yeniden render eder.
export async function generateStaticParams() {
  return [];
}

export default async function ConferenceSlidesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const conference = await loadConference(id);
  if (!conference) notFound();

  if (conference.presentationSlug) {
    return (
      <Suspense fallback={null}>
        <PresentationHost
          slug={conference.presentationSlug}
          backHref="/konferanslarim"
        />
      </Suspense>
    );
  }

  return (
    <SlideDeck
      content={conference.slides ?? ""}
      title={conference.title}
      backHref="/konferanslarim"
    />
  );
}
