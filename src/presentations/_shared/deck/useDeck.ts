"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isTypingTarget } from "../isTypingTarget";

/**
 * Sunum gezinme çekirdeği.
 *
 * 119 sunumun her biri bu mantığı kendi dosyasına kopyalamıştı ve üç ortak
 * kusuru vardı: `Escape` dinlenmiyordu (oysa köşedeki ipucu "Esc" yazıyordu),
 * yazı alanındayken boşluk tuşu slaytı atlıyordu, bazılarında tam ekrandan
 * çıkış yoktu. Üçü de burada çözülü.
 */

export type DeckNav = {
  current: number;
  direction: 1 | -1;
  total: number;
  isFullscreen: boolean;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  toggleFullscreen: () => void;
  /** Dokunmatik kaydırma için doğrudan öğeye bağlanır. */
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
};

/** Kaydırmanın slayt değiştirmesi için gereken en küçük yatay mesafe (px). */
const SWIPE_THRESHOLD = 60;

export function useDeck(total: number): DeckNav {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, total - 1));
      setCurrent((c) => {
        setDirection(clamped >= c ? 1 : -1);
        return clamped;
      });
    },
    [total]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => Math.min(c + 1, total - 1));
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  // Tam ekran durumu tarayıcıdan da değişebilir (F11, Esc) — tek kaynak olay.
  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    onFs();
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Slayt içindeki kod editörüne yazarken boşluk tuşu slaydı atlamasın.
      if (isTypingTarget(e.target)) return;

      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(total - 1);
          break;
        default:
          if (e.key.toLowerCase() === "f") {
            e.preventDefault();
            toggleFullscreen();
          }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, toggleFullscreen, total]);

  const touchHandlers = {
    onTouchStart: (e: React.TouchEvent) => {
      touchStartX.current = e.changedTouches[0]?.clientX ?? null;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const start = touchStartX.current;
      if (start == null) return;
      const delta = (e.changedTouches[0]?.clientX ?? start) - start;
      if (Math.abs(delta) > SWIPE_THRESHOLD) {
        if (delta < 0) next();
        else prev();
      }
      touchStartX.current = null;
    },
  };

  return {
    current,
    direction,
    total,
    isFullscreen,
    next,
    prev,
    goTo,
    toggleFullscreen,
    touchHandlers,
  };
}
