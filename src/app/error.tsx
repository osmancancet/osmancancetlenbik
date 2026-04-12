"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="inline-flex w-14 h-14 rounded-full border border-[var(--border-strong)] items-center justify-center mb-6">
          <AlertTriangle className="w-6 h-6 text-[var(--accent)]" />
        </div>
        <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-3">
          Hata
        </div>
        <h1 className="text-3xl font-semibold text-[var(--fg)] mb-3">
          Bir şeyler ters gitti
        </h1>
        <p className="text-[var(--fg-muted)] mb-8">
          Sayfa yüklenirken beklenmeyen bir hata oluştu. Sayfayı yeniden deneyebilir
          ya da ana sayfaya dönebilirsiniz.
        </p>
        {error.digest && (
          <p className="text-xs font-mono text-[var(--fg-subtle)] mb-6">
            Hata kodu: {error.digest}
          </p>
        )}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-4 h-4" />
            Tekrar Dene
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-strong)] text-[var(--fg)] rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            <Home className="w-4 h-4" />
            Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  );
}
