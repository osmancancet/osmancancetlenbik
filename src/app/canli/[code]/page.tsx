import type { Metadata } from "next";
import { LiveStudentClient } from "./LiveStudentClient";
import { normalizeCode } from "@/lib/live";

// Oturuma özel, kişiye özel ekran — arama sonucunda işi yok.
export const metadata: Metadata = {
  title: "Canlı Ders",
  robots: { index: false, follow: false },
};

export default async function LiveRoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <LiveStudentClient code={normalizeCode(code)} />;
}
