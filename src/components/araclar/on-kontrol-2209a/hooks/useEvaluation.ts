"use client";

import { useDeferredValue, useMemo } from "react";
import type { DraftState } from "@/lib/araclar/on-kontrol-2209a/engine/types";
import { evaluate } from "@/lib/araclar/on-kontrol-2209a/engine/evaluate";
import { summarize } from "@/lib/araclar/on-kontrol-2209a/engine/report";
import { rules2209a2026 } from "@/lib/araclar/on-kontrol-2209a/rules/2209a-2026";

/** Değerlendirme ertelenmiş değer üzerinde çalışır; yazarken arayüz takılmaz. */
export function useEvaluation(draft: DraftState) {
  const deferred = useDeferredValue(draft);
  return useMemo(() => {
    const evaluation = evaluate(deferred, rules2209a2026);
    return { evaluation, summary: summarize(evaluation) };
  }, [deferred]);
}
