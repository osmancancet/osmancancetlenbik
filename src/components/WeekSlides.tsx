"use client";

import { useSearchParams } from "next/navigation";
import { SlideDeck } from "@/components/SlideDeck";
import { PresentationHost } from "@/components/PresentationHost";

/**
 * Hafta sunumunda hangi görüntüleyicinin açılacağını tarayıcıda seçer.
 *
 * `?format=markdown` kontrolü eskiden sunucuda `searchParams` ile yapılıyordu;
 * bu da sayfayı her istekte yeniden render ettiriyordu (önbelleğe
 * alınamıyordu). Seçim artık burada, istemcide yapılıyor; sunucu sayfası
 * statik kalıp CDN'den sunuluyor.
 */
export function WeekSlides({
  presentationSlug,
  slides,
  title,
  backHref,
}: {
  presentationSlug: string | null;
  slides: string;
  title: string;
  backHref: string;
}) {
  const format = useSearchParams().get("format");

  // React component sunum varsa onu kullan, yoksa markdown SlideDeck.
  // `?format=markdown` ikisi birden varken yazılı slaytları açar.
  if (presentationSlug && format !== "markdown") {
    return <PresentationHost slug={presentationSlug} backHref={backHref} />;
  }

  return <SlideDeck content={slides} title={title} backHref={backHref} />;
}
