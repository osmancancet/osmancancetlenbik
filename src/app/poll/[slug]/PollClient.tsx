"use client";

import { useEffect, useState } from "react";

type Option = { id: string; label: string; emoji?: string };

const STORAGE_PREFIX = "mcb_poll_voted:";

const OTHER_POLLS: { slug: string; label: string }[] = [
  { slug: "mcb-1-attack-surface", label: "Soru 1 · Saldırı yüzeyi" },
  { slug: "mcb-2-sms-trap", label: "Soru 2 · Kargo SMS'i" },
  { slug: "mcb-3-2fa", label: "Soru 3 · 2FA" },
  { slug: "mcb-4-quiz", label: "Soru 4 · Phishing quiz" },
];

export function PollClient({
  slug,
  question,
  options,
  closed,
}: {
  slug: string;
  question: string;
  options: Option[];
  closed: boolean;
}) {
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [voted, setVoted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prev = localStorage.getItem(STORAGE_PREFIX + slug);
    if (prev) setVoted(prev);
  }, [slug]);

  const submit = async (optionId: string) => {
    if (submitting || closed) return;
    setSubmitting(optionId);
    setError(null);
    try {
      const r = await fetch(`/api/polls/${slug}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        setError(j.error || "Hata oluştu");
        setSubmitting(null);
        return;
      }
      localStorage.setItem(STORAGE_PREFIX + slug, optionId);
      setVoted(optionId);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate?.(15);
        } catch {}
      }
    } catch {
      setError("Bağlantı hatası");
    }
    setSubmitting(null);
  };

  return (
    <div
      className="min-h-dvh bg-black text-white flex flex-col font-sans relative overflow-x-hidden"
      style={{
        paddingTop: "max(2.5rem, env(safe-area-inset-top))",
        paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
        paddingRight: "max(1.25rem, env(safe-area-inset-right))",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,255,136,0.08), transparent 60%), radial-gradient(ellipse at bottom, rgba(14,165,233,0.06), transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
        <div className="text-center mb-2 font-mono text-[11px] tracking-[0.4em] text-emerald-400/80">
          MCBÜKAF · 2026
        </div>
        <h1 className="text-[28px] sm:text-3xl font-bold text-center leading-snug mb-7">
          {question}
        </h1>

        {closed ? (
          <div className="text-center text-zinc-400 border border-zinc-800 rounded-2xl p-6">
            Bu oylama kapandı.
          </div>
        ) : (
          <div className="space-y-3">
            {options.map((o) => {
              const isVoted = voted === o.id;
              const isSubmitting = submitting === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => submit(o.id)}
                  disabled={!!submitting}
                  className={[
                    "w-full text-left rounded-2xl border p-5 transition-all flex items-center gap-3 active:scale-[0.98] min-h-[68px]",
                    isVoted
                      ? "border-emerald-400 bg-emerald-400/10"
                      : "border-zinc-800 bg-zinc-900/60 active:border-emerald-400/60",
                    submitting && !isSubmitting ? "opacity-40" : "",
                  ].join(" ")}
                >
                  {o.emoji && (
                    <span className="text-3xl shrink-0">{o.emoji}</span>
                  )}
                  <span className="text-lg font-medium flex-1 leading-snug">
                    {o.label}
                  </span>
                  {isVoted && (
                    <span className="text-emerald-300 text-xl shrink-0">✓</span>
                  )}
                  {isSubmitting && (
                    <span className="text-xs font-mono text-zinc-500">…</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {voted && !closed && (
          <div className="mt-6 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-400 text-black flex items-center justify-center font-bold text-xl shrink-0">
              ✓
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold">Oyun ekrana düştü.</div>
              <div className="text-sm text-zinc-300">
                Cevabını dilediğin zaman değiştirebilirsin.
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-6 text-center text-sm text-rose-400">{error}</p>
        )}
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto mt-10 pt-6 border-t border-zinc-900">
        <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-3 text-center">
          Diğer sorular
        </div>
        <div className="grid grid-cols-2 gap-2">
          {OTHER_POLLS.filter((p) => p.slug !== slug).map((p) => (
            <a
              key={p.slug}
              href={`/poll/${p.slug}`}
              className="block rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 text-sm text-zinc-300 active:bg-zinc-900 active:border-emerald-400/40 transition-colors"
            >
              {p.label}
            </a>
          ))}
        </div>
        <p className="mt-6 text-center text-[10px] tracking-widest font-mono text-zinc-600">
          OSMANCANCETLENBIK.COM
        </p>
      </div>
    </div>
  );
}
