"use client";

import { useEffect, useRef, useState } from "react";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Sayıyı hedefe doğru sayarak gösterir. Sekme arka plandaysa son değer yine yazılır. */
export function useCountUp(target: number, ms = 520): number {
  const [shown, setShown] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    const start = from.current;
    if (reduced() || start === target) { from.current = target; setShown(target); return; }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min((t - t0) / ms, 1);
      const v = Math.round(start + (target - start) * (1 - Math.pow(1 - k, 3)));
      from.current = v;
      setShown(v);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const done = window.setTimeout(() => { cancelAnimationFrame(raf); from.current = target; setShown(target); }, ms + 80);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(done); };
  }, [target, ms]);

  return shown;
}
