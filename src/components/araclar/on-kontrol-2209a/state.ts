import type { DraftState, TextKey, WorkPackage } from "@/lib/araclar/on-kontrol-2209a/engine/types";
import { TEXT_KEYS, emptyDraft } from "@/lib/araclar/on-kontrol-2209a/engine/text";
import { SAMPLE_DRAFT } from "@/lib/araclar/on-kontrol-2209a/sample";

export interface ToolState {
  draft: DraftState;
  isSample: boolean;
  /** Animasyon için: yeni eklenen iş adımının sırası. */
  newRow: number | null;
}

export type Action =
  | { type: "text"; key: TextKey; value: string }
  | { type: "wp"; i: number; field: keyof WorkPackage; value: string }
  | { type: "addWp" }
  | { type: "delWp"; i: number }
  | { type: "load"; draft: DraftState; sample: boolean };

const NUM_FIELDS = new Set<keyof WorkPackage>(["start", "end", "pct"]);

function toField(field: keyof WorkPackage, value: string): string | number {
  if (!NUM_FIELDS.has(field)) return value;
  if (value.trim() === "") return "";
  const n = Number(value);
  return Number.isFinite(n) ? n : "";
}

export const initialState: ToolState = { draft: SAMPLE_DRAFT, isSample: true, newRow: null };

export function reducer(state: ToolState, a: Action): ToolState {
  switch (a.type) {
    case "text":
      return { ...state, isSample: false, newRow: null, draft: { ...state.draft, text: { ...state.draft.text, [a.key]: a.value } } };
    case "wp": {
      const wp = state.draft.wp.map((w, i) => (i === a.i ? { ...w, [a.field]: toField(a.field, a.value) } : w));
      return { ...state, isSample: false, newRow: null, draft: { ...state.draft, wp } };
    }
    case "addWp": {
      const last = state.draft.wp[state.draft.wp.length - 1];
      const start = last && +last.end ? Math.min(+last.end + 1, 12) : 1;
      const wp = [...state.draft.wp, { name: "", start, end: start, crit: "", pct: "" as const }];
      return { ...state, isSample: false, newRow: wp.length - 1, draft: { ...state.draft, wp } };
    }
    case "delWp":
      return { ...state, isSample: false, newRow: null, draft: { ...state.draft, wp: state.draft.wp.filter((_, i) => i !== a.i) } };
    case "load":
      return { draft: a.draft, isSample: a.sample, newRow: null };
  }
}

/** localStorage'dan gelen veriyi doğrular ve eksik alanları tamamlar. */
export function sanitizeDraft(data: unknown): DraftState | null {
  if (!data || typeof data !== "object") return null;
  const d = data as { text?: Record<string, unknown>; wp?: unknown };
  if (!d.text || typeof d.text !== "object" || !Array.isArray(d.wp)) return null;
  const base = emptyDraft();
  for (const k of TEXT_KEYS) base.text[k] = typeof d.text[k] === "string" ? (d.text[k] as string) : "";
  const num = (v: unknown): number | "" => (v === "" || v === null || v === undefined || !Number.isFinite(+v!) ? "" : +v!);
  base.wp = (d.wp as Record<string, unknown>[]).filter((w) => w && typeof w === "object").map((w) => ({
    name: typeof w.name === "string" ? w.name : "",
    start: num(w.start),
    end: num(w.end),
    crit: typeof w.crit === "string" ? w.crit : "",
    pct: num(w.pct),
  }));
  return base;
}
