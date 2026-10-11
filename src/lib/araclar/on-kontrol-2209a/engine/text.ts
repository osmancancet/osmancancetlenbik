import type { DraftState, TextKey } from "./types";

export const TEXT_KEYS: readonly TextKey[] = ["ozet", "bilimsel", "amac", "yontem", "risk", "olanak", "etki", "kaynak"];
export const BODY_KEYS: readonly TextKey[] = TEXT_KEYS.filter((k) => k !== "kaynak");

export const lower = (s: string): string => s.toLocaleLowerCase("tr-TR");
export const words = (s: string): number => (s.match(/\S+/g) || []).length;
export const chars = (s: string): number => [...s.trim()].length;
export const hasNum = (s: string): boolean => /\d/.test(s);

export const fmt = (n: number): string =>
  Number.isInteger(n) ? String(n) : n.toLocaleString("tr-TR", { maximumFractionDigits: 2 });

export const list = (items: string[], limit = 5): string =>
  items.slice(0, limit).join(", ") + (items.length > limit ? ` ve ${items.length - limit} tane daha` : "");

export const toNum = (v: number | string | ""): number => +v || 0;

export const contributionSum = (state: DraftState): number =>
  state.wp.reduce((a, w) => a + toNum(w.pct), 0);

export function emptyDraft(): DraftState {
  return {
    text: { ozet: "", bilimsel: "", amac: "", yontem: "", risk: "", olanak: "", etki: "", kaynak: "" },
    wp: [{ name: "", start: 1, end: 1, crit: "", pct: "" }],
  };
}
