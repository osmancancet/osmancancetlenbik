import type { DraftState } from "@/lib/araclar/on-kontrol-2209a/engine/types";
import { evaluate } from "@/lib/araclar/on-kontrol-2209a/engine/evaluate";
import { summarize } from "@/lib/araclar/on-kontrol-2209a/engine/report";
import { rules2209a2026 as R } from "@/lib/araclar/on-kontrol-2209a/rules/2209a-2026";
import { SAMPLE_DRAFT } from "@/lib/araclar/on-kontrol-2209a/sample";

export { R };
export const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x));
export const sample = (): DraftState => clone(SAMPLE_DRAFT);
export const run = (s: DraftState) => evaluate(s, R);
export const result = (s: DraftState, id: string) => {
  const r = run(s).results.find((x) => x.rule.id === id);
  if (!r) throw new Error(`kural yok: ${id}`);
  return r;
};
export const sum = (s: DraftState) => summarize(run(s));
