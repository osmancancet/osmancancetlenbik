import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { seoMeta } from "@/lib/seo/metadata";
import { getHaritaSummary } from "@/lib/harita";
import { HaritaClient } from "./HaritaClient";

export const metadata: Metadata = seoMeta({
  path: "/harita",
  title: "Türkiye'nin Dolandırıcılık Haritası",
  description:
    "Sana ya da bir yakınına hangi dolandırıcılık yöntemi denendi? İlini ve yöntemi anonim olarak işaretle, Türkiye'nin canlı dolandırıcılık haritasını birlikte çıkaralım.",
  keywords: [
    "dolandırıcılık haritası",
    "dolandırıcılık türleri",
    "sahte savcı araması",
    "kargo sms dolandırıcılığı",
    "telefon dolandırıcılığı",
    "siber güvenlik farkındalık",
  ],
});

export const dynamic = "force-dynamic";

export default async function HaritaPage() {
  const summary = await getHaritaSummary();
  return (
    <PageShell
      eyebrow="Dolandırıcılık Haritası"
      title="Sana hangi tuzak kuruldu?"
      subtitle="İlini ve sana (ya da bir yakınına) denenen yöntemi işaretle. İsim, telefon, e-posta istemiyoruz — harita tamamen anonim. Ne kadar çok kişi katılırsa, kimin neye karşı uyarılması gerektiği o kadar net görünür."
    >
      <HaritaClient initial={summary} />
    </PageShell>
  );
}
