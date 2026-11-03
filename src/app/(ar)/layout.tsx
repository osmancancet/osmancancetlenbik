import type { ReactNode } from "react";
import { RootShell } from "@/components/layout/RootShell";
import { rootMetadata, rootViewport } from "@/lib/seo/rootMetadata";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function RootLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="ar">{children}</RootShell>;
}
