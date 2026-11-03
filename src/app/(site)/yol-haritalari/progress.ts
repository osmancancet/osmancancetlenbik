"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Yol haritası ilerlemesi yalnızca ziyaretçinin tarayıcısında tutuluyor —
 * üyelik yok, sunucuya bir şey gitmiyor. Gizli pencerede ya da depolama
 * kapalıyken okuma/yazma sessizce boşa düşüyor, sayfa yine çalışıyor.
 */

const PREFIX = "yol-haritasi:";
const EVENT = "yol-haritasi-degisti";

function read(slug: string): string {
  try {
    return window.localStorage.getItem(PREFIX + slug) ?? "";
  } catch {
    return "";
  }
}

function parse(raw: string): Set<string> {
  if (!raw) return new Set();
  try {
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}

export function saveProgress(slug: string, done: Set<string>) {
  try {
    if (done.size === 0) window.localStorage.removeItem(PREFIX + slug);
    else window.localStorage.setItem(PREFIX + slug, JSON.stringify([...done]));
  } catch {
    // depolama kapalı — ilerleme bu oturumla sınırlı kalır
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

/** Bir haritanın tamamlanan konu kimlikleri. Sunucuda boş küme. */
export function useProgress(slug: string): Set<string> {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(slug),
    () => ""
  );
  return useMemo(() => parse(raw), [raw]);
}

/** Birden çok haritanın tamamlanan konu sayıları (liste sayfası için). */
export function useProgressCounts(slugs: string[]): Record<string, number> {
  const key = slugs.join("|");
  const raw = useSyncExternalStore(
    subscribe,
    () => slugs.map((s) => read(s)).join("\u0000"),
    () => ""
  );
  return useMemo(() => {
    const parts = raw ? raw.split("\u0000") : [];
    const out: Record<string, number> = {};
    key.split("|").forEach((s, i) => {
      out[s] = parse(parts[i] ?? "").size;
    });
    return out;
  }, [raw, key]);
}
