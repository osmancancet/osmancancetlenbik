"use client";

import { useEffect, useState } from "react";

type Option = { id: string; label: string; emoji?: string };

const STORAGE_PREFIX = "mcb_poll_voted:";

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
    } catch {
      setError("Bağlantı hatası");
    }
    setSubmitting(null);
  };

  return (
    <div className="min-h-dvh bg-black text-white flex flex-col items-center justify-center px-5 py-10 font-sans relative overflow-hidden">
      {/* ambient gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,255,65,0.08), transparent 60%), radial-gradient(ellipse at bottom, rgba(14,165,233,0.06), transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-2 font-mono text-xs tracking-[0.3em] text-emerald-400/70">
          MCBÜKAF · 2026
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center leading-tight mb-8">
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
                    "w-full text-left rounded-2xl border p-4 transition-all flex items-center gap-3 active:scale-[0.98]",
                    isVoted
                      ? "border-emerald-400 bg-emerald-400/10"
                      : "border-zinc-800 bg-zinc-900/60 hover:border-emerald-400/50",
                    submitting && !isSubmitting ? "opacity-40" : "",
                  ].join(" ")}
                >
                  {o.emoji && (
                    <span className="text-2xl shrink-0">{o.emoji}</span>
                  )}
                  <span className="text-base font-medium flex-1">
                    {o.label}
                  </span>
                  {isVoted && (
                    <span className="text-xs font-mono text-emerald-300">
                      OY VERİLDİ
                    </span>
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
          <p className="mt-6 text-center text-sm text-zinc-400">
            Cevabını dilediğin zaman değiştirebilirsin.
          </p>
        )}

        {error && (
          <p className="mt-6 text-center text-sm text-rose-400">{error}</p>
        )}

        <p className="mt-10 text-center text-[10px] tracking-widest font-mono text-zinc-600">
          OSMANCANCETLENBIK.COM
        </p>
      </div>
    </div>
  );
}
