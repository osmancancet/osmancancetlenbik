import type { Metadata } from "next";
import { RootShell } from "@/components/layout/RootShell";
import NotFound from "@/app/(site)/not-found";
import { rootMetadata, rootViewport } from "@/lib/seo/rootMetadata";

/**
 * Her dilin ayrı kök layout'u olduğu için (bkz. components/layout/RootShell)
 * hiçbir rotaya uymayan adreslerin 404 sayfası buradan gelir.
 */
export const metadata: Metadata = {
  ...rootMetadata,
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: true },
};
export const viewport = rootViewport;

export default function GlobalNotFound() {
  return (
    <RootShell locale="tr">
      <NotFound />
    </RootShell>
  );
}
