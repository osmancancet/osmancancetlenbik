import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Wifi } from "lucide-react";
import { getTool } from "@/data/tools";
import { EmbedMode } from "@/components/tools/EmbedMode";

/**
 * Araç sayfalarının ortak kabuğu: başlık, aracın çözdüğü sorun ve gizlilik
 * rozeti. Rozet önemli — akademisyenin ilk sorusu "bu dosya nereye gidiyor"
 * oluyor, cevabı sayfanın en üstünde duruyor.
 */
export function ToolShell({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const tool = getTool(slug);
  if (!tool) return null;

  return (
    <section className="relative pt-28 pb-24 px-6">
      {/* useSearchParams statik üretimde Suspense sınırı istiyor. */}
      <Suspense fallback={null}>
        <EmbedMode />
      </Suspense>
      <div className="relative max-w-4xl mx-auto">
        <Link
          href="/araclar"
          data-arac-geri
          className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-7"
        >
          <ArrowLeft className="w-4 h-4" />
          Tüm araçlar
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)] mb-3">
          {tool.title}
        </h1>
        <p className="text-[var(--fg-muted)] leading-relaxed max-w-2xl">
          {tool.summary}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--border-strong)] text-xs">
          {tool.offline ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-[var(--fg-muted)]">
                Tüm işlem tarayıcınızda yapılır — dosya sunucuya gönderilmez
              </span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-[var(--fg-muted)]">
                Künye sorgusu için CrossRef&apos;e istek gider — belgeniz
                gönderilmez
              </span>
            </>
          )}
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
