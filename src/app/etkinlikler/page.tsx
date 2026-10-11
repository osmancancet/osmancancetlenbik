import type { Metadata } from "next";
import Link from "next/link";
import { seoMeta } from "@/lib/seo/metadata";
import { jsonLdScript } from "@/lib/seo/jsonLd";
import { absoluteUrl } from "@/lib/site";
import { PageShell } from "@/components/layout/PageShell";
import { openEvents, formatDate, type RadarFile } from "@/lib/etkinlikler";
import raw from "@/data/etkinlikler.json";
import { EtkinlikListesi } from "./EtkinlikListesi";
import { ArrowRight, Users } from "lucide-react";

const TITLE = "Etkinlik Radarı";
const DESCRIPTION =
  "Öğrenciler, mezunlar ve akademisyenler için başvurusu açık hackathon, datathon, game jam, CTF ve yapay zekâ yarışmaları. Liste her sabah güncellenir.";

export const metadata: Metadata = seoMeta({
  path: "/etkinlikler",
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: "Hackathon · Datathon · Game Jam · CTF — Başvurusu açık etkinlikler",
  keywords: [
    "hackathon",
    "datathon",
    "game jam",
    "CTF",
    "yapay zeka yarışması",
    "TEKNOFEST",
    "öğrenci yarışmaları",
  ],
});

// Süresi geçen etkinlikler veri dosyası değişmeden de düşsün diye saatlik.
export const revalidate = 3600;

export default function EtkinliklerPage() {
  // JSON'dan çıkarılan tip dosya içeriğine göre değiştiği için açıkça daraltılıyor.
  const data = raw as unknown as RadarFile;
  const events = openEvents(data.events);
  const updated = data.updatedAt;
  const closingThisWeek = events.filter(
    (e) => e.daysLeft !== null && e.daysLeft <= 7
  ).length;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TITLE,
    url: absoluteUrl("/etkinlikler"),
    itemListElement: events.slice(0, 50).map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      ...(e.url ? { url: e.url } : {}),
    })),
  };

  return (
    <PageShell
      eyebrow="Hackathon · Datathon · Game Jam · CTF"
      title={TITLE}
      subtitle="Öğrencilerim, mezunlarımız ve meslektaşlarım için başvurusu açık yarışmalar. Liste her sabah taranır; son başvuru tarihi en yakın olan en üstte."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(itemList)}
      />

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-8 font-mono text-sm">
        <div>
          <span className="text-2xl text-[var(--fg)] tabular-nums">
            {events.length}
          </span>{" "}
          <span className="text-[var(--fg-muted)]">açık etkinlik</span>
        </div>
        <div>
          <span className="text-2xl text-[var(--fg)] tabular-nums">
            {closingThisWeek}
          </span>{" "}
          <span className="text-[var(--fg-muted)]">bu hafta kapanıyor</span>
        </div>
        {updated && (
          <div className="text-xs text-[var(--fg-subtle)]">
            Son güncelleme: {formatDate(updated.slice(0, 10))}
          </div>
        )}
      </div>

      <EtkinlikListesi events={events} />

      <aside className="card rounded-lg p-6 md:p-8 mt-12 flex flex-col md:flex-row md:items-center gap-5">
        <Users className="w-6 h-6 text-[var(--accent)] shrink-0" />
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-medium text-[var(--fg)]">
            Takım arkadaşı mı arıyorsun?
          </h2>
          <p className="text-sm text-[var(--fg-muted)] mt-1 leading-relaxed">
            Bu dönem datathon, game jam, TEKNOFEST ve hackathon’lara takım olarak
            katılıyoruz. Deneyim şart değil.
          </p>
        </div>
        <Link
          href="/basvuru"
          className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-md bg-[var(--accent)] text-[var(--bg)] font-medium hover:bg-white transition-colors self-start md:self-auto"
        >
          Takıma başvur
          <ArrowRight className="w-4 h-4" />
        </Link>
      </aside>

      <p className="mt-8 text-xs text-[var(--fg-subtle)] leading-relaxed max-w-3xl">
        Bilgiler etkinliklerin resmi sayfalarından derlenir. Tarihler değişebilir;
        başvurmadan önce lütfen etkinliğin kendi sayfasını kontrol edin. Listede
        olmayan bir etkinlik biliyorsanız{" "}
        <Link href="/iletisim" className="text-[var(--accent)] hover:underline">
          bana yazın
        </Link>
        .
      </p>
    </PageShell>
  );
}
