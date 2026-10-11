"use client";

import { useEffect, useRef, type Dispatch } from "react";
import type { Action, ToolState } from "../state";
import { sanitizeDraft } from "../state";

export const STORE_KEY = "on-kontrol-2209a-v1";

/**
 * Taslağı yalnızca bu tarayıcıda saklar. İlk çizimde örnek gösterilir (hidrasyon için);
 * kayıtlı taslak useEffect içinde okunur. Örnek başvuru kaydedilmez. Yazma 300 ms gecikmelidir.
 */
export function useDraft(state: ToolState, dispatch: Dispatch<Action>) {
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      const draft = raw ? sanitizeDraft(JSON.parse(raw)) : null;
      if (draft) dispatch({ type: "load", draft, sample: false });
    } catch { /* depolama kapalı ya da bozuk veri: örnekle devam */ }
    loaded.current = true;
  }, [dispatch]);

  useEffect(() => {
    if (!loaded.current || state.isSample) return;
    const t = window.setTimeout(() => {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state.draft)); } catch { /* depolama kapalı */ }
    }, 300);
    return () => window.clearTimeout(t);
  }, [state.draft, state.isSample]);
}
