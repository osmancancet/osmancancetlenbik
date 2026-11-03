import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { kartVerisiGetir } from "@/lib/openalex";
import { absoluteUrl } from "@/lib/site";
import { seoMeta } from "@/lib/seo/metadata";
import { kartGorselYolu, linkedinPaylasUrl, paylasimYolu } from "../paylasim";

/**
 * Kartın paylaşım sayfası. LinkedIn bağlantıyı tararken buradaki OG
 * görselini (yatay kart) önizleme olarak alıyor; sayfaya gelen kişi de
 * dikey kartı görüp "kendi kartını oluştur"a yönleniyor — yayılma
 * mekanizması bu.
 */

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const veri = await kartVerisiGetir(id);
  if (!veri) return { title: "Kart bulunamadı" };
  const sayi = (n: number) => n.toLocaleString("tr-TR");
  return seoMeta({
    path: paylasimYolu(veri.id),
    title: `${veri.ad} — Akademisyen Kartı`,
    description: `${sayi(veri.yayin)} yayın, ${sayi(veri.atif)} atıf, h-indeks ${sayi(
      veri.hIndeks
    )}. OpenAlex verisinden otomatik üretilen akademik özet kartı.`,
    image: absoluteUrl(kartGorselYolu(veri.id, "og")),
    type: "profile",
    // Her yazar için ayrı sayfa indekslenmesin; ana araç sayfası yeterli.
    noindex: true,
  });
}

export default async function PaylasimSayfasi({ params }: Props) {
  const { id } = await params;
  const veri = await kartVerisiGetir(id);
  if (!veri) notFound();

  const mutlak = absoluteUrl(paylasimYolu(veri.id));

  return (
    <section className="relative pt-28 pb-24 px-6">
      <div className="relative max-w-4xl mx-auto">
        <Link
          href="/araclar/akademisyen-karti"
          className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-7"
        >
          <ArrowLeft className="w-4 h-4" />
          Akademisyen Kartı aracı
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)] mb-3">
          {veri.ad}
        </h1>
        <p className="text-[var(--fg-muted)] leading-relaxed max-w-2xl">
          {veri.kurum ? `${veri.kurum} · ` : ""}
          {veri.yayin.toLocaleString("tr-TR")} yayın ·{" "}
          {veri.atif.toLocaleString("tr-TR")} atıf · h-indeks {veri.hIndeks}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,440px)_1fr] items-start">
          <div className="rounded-lg border border-[var(--border-strong)] overflow-hidden aspect-[4/5] bg-[var(--bg-card)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={kartGorselYolu(veri.id)}
              alt={`${veri.ad} akademisyen kartı`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5">
            <div className="card rounded-lg p-6">
              <div className="flex items-center gap-2 text-[var(--accent)] text-xs uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                Kendi kartınızı oluşturun
              </div>
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-4">
                Adınızı ya da ORCID numaranızı yazmanız yeterli; yayın, atıf,
                h-indeks ve en çok atıf alan çalışmanız 30 saniyede tek karta
                dönüşür. Ücretsiz, üyelik yok.
              </p>
              <Link
                href="/araclar/akademisyen-karti"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity text-sm"
              >
                Kartımı oluştur
              </Link>
            </div>

            <a
              href={linkedinPaylasUrl(mutlak)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--border-strong)] rounded-md hover:border-[var(--accent)] text-[var(--fg)] text-sm transition-colors"
            >
              Bu kartı LinkedIn&apos;de paylaş
            </a>

            <p className="text-xs text-[var(--fg-subtle)] leading-relaxed">
              Veri kaynağı: OpenAlex (
              <a
                href={`https://openalex.org/${veri.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)]"
              >
                {veri.id}
              </a>
              ). Sayılar Google Scholar ile birebir örtüşmeyebilir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
