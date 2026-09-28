import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { agVerisiGetir } from "@/lib/openalex";
import { absoluteUrl } from "@/lib/site";
import { seoMeta } from "@/lib/seo/metadata";
import { agGorselYolu, agPaylasimYolu, linkedinPaylasUrl } from "../paylasim";

/**
 * Ağın paylaşım sayfası. İlk yoruma konan bağlantı buraya geliyor: LinkedIn
 * önizlemede kişinin ağını (OG görseli) gösteriyor, tıklayan da "kendi ağını
 * çıkar"a yönleniyor.
 */

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const veri = await agVerisiGetir(id);
  if (!veri) return { title: "Ağ bulunamadı" };
  const sayi = (n: number) => n.toLocaleString("tr-TR");
  return seoMeta({
    path: agPaylasimYolu(veri.id),
    title: `${veri.ad} — Ortak Yazar Ağı`,
    description: `${sayi(veri.ortakYazarSayisi)} ortak yazar, ${sayi(
      veri.kurumSayisi
    )} kurum. OpenAlex verisinden otomatik çizilen akademik iş birliği ağı.`,
    image: absoluteUrl(agGorselYolu(veri.id, "og")),
    type: "profile",
    // Her yazar için ayrı sayfa indekslenmesin; ana araç sayfası yeterli.
    noindex: true,
  });
}

export default async function AgPaylasimSayfasi({ params }: Props) {
  const { id } = await params;
  const veri = await agVerisiGetir(id);
  if (!veri) notFound();

  const mutlak = absoluteUrl(agPaylasimYolu(veri.id));

  return (
    <section className="relative pt-28 pb-24 px-6">
      <div className="relative max-w-4xl mx-auto">
        <Link
          href="/araclar/ortak-yazar-agi"
          className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-7"
        >
          <ArrowLeft className="w-4 h-4" />
          Ortak Yazar Ağı aracı
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)] mb-3">
          {veri.ad}
        </h1>
        <p className="text-[var(--fg-muted)] leading-relaxed max-w-2xl">
          {veri.kurum ? `${veri.kurum} · ` : ""}
          {veri.ortakYazarSayisi.toLocaleString("tr-TR")} ortak yazar ·{" "}
          {veri.kurumSayisi.toLocaleString("tr-TR")} kurum
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,440px)_1fr] items-start">
          <div className="rounded-lg border border-[var(--border-strong)] overflow-hidden aspect-[4/5] bg-[var(--bg-card)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={agGorselYolu(veri.id)}
              alt={`${veri.ad} ortak yazar ağı`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5">
            <div className="card rounded-lg p-6">
              <div className="flex items-center gap-2 text-[var(--accent)] text-xs uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                Kendi ağınızı çıkarın
              </div>
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-4">
                Adınızı ya da ORCID numaranızı yazmanız yeterli; kimlerle, kaç
                kurum ve ülkeden yazdığınız 30 saniyede tek görsele dönüşür.
                Ücretsiz, üyelik yok.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/araclar/ortak-yazar-agi"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity text-sm"
                >
                  Ağımı çıkar
                </Link>
                <Link
                  href="/araclar/akademisyen-karti"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-strong)] rounded-md hover:border-[var(--accent)] text-[var(--fg)] text-sm transition-colors"
                >
                  Akademisyen Kartı
                </Link>
              </div>
            </div>

            <a
              href={linkedinPaylasUrl(mutlak)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--border-strong)] rounded-md hover:border-[var(--accent)] text-[var(--fg)] text-sm transition-colors"
            >
              Bu ağı LinkedIn&apos;de paylaş
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
              ). Aynı kişinin farklı kayıtları ad üzerinden birleştirilir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
