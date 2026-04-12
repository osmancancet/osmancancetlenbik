"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";

function splitSlides(markdown: string): string[] {
  if (!markdown.trim()) return [];
  return markdown
    .split(/^---\s*$/m)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function SlideDeck({
  content,
  title,
  backHref,
}: {
  content: string;
  title?: string;
  backHref?: string;
}) {
  const router = useRouter();
  const slides = useMemo(() => splitSlides(content), [content]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFs, setIsFs] = useState(false);

  const total = slides.length;

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const close = useCallback(() => {
    if (backHref) router.push(backHref);
    else router.back();
  }, [backHref, router]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          close();
        }
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, close]);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFs(true);
    } else {
      document.exitFullscreen?.();
      setIsFs(false);
    }
  }

  useEffect(() => {
    function onFs() {
      setIsFs(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  if (total === 0) {
    return (
      <div className="fixed inset-0 bg-[var(--bg)] flex items-center justify-center p-8 text-center">
        <div>
          <p className="text-[var(--fg-muted)] mb-4">
            Bu sunum için henüz slayt eklenmemiş.
          </p>
          <button
            onClick={close}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            ← Geri dön
          </button>
        </div>
      </div>
    );
  }

  const progress = ((index + 1) / total) * 100;

  return (
    <div className="fixed inset-0 bg-[var(--bg)] z-[100] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between text-[var(--fg-muted)]">
        <div className="text-xs font-mono uppercase tracking-wider truncate max-w-[60%]">
          {title}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:text-[var(--fg)] transition-colors"
            aria-label="Tam ekran"
          >
            {isFs ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={close}
            className="p-2 hover:text-[var(--fg)] transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[var(--border)] z-10">
        <motion.div
          className="h-full bg-[var(--accent)]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Slide */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-20 py-20 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-4xl"
          >
            <div className="prose-slide">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {slides[index] ?? ""}
              </ReactMarkdown>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Click zones */}
        <button
          onClick={prev}
          disabled={index === 0}
          className="absolute left-0 top-0 bottom-0 w-1/4 cursor-w-resize disabled:cursor-default opacity-0"
          aria-label="Önceki slayt"
        />
        <button
          onClick={next}
          disabled={index === total - 1}
          className="absolute right-0 top-0 bottom-0 w-1/4 cursor-e-resize disabled:cursor-default opacity-0"
          aria-label="Sonraki slayt"
        />
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-5 flex items-center justify-between">
        <button
          onClick={prev}
          disabled={index === 0}
          className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Önceki
        </button>

        <div className="font-mono text-xs text-[var(--fg-subtle)]">
          <span className="text-[var(--accent)] font-semibold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mx-1">/</span>
          {String(total).padStart(2, "0")}
        </div>

        <button
          onClick={next}
          disabled={index === total - 1}
          className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Sonraki
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
