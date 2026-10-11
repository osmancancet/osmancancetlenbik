"use client";

import { useEffect, useRef, useState } from "react";
import s from "./OnKontrol.module.css";

/** İki adımlı onay: ilk tıklamada uyarır, 3,5 sn içinde ikinci tıklamada temizler. */
export function ClearButton({ onConfirm }: { onConfirm(): void }) {
  const [armed, setArmed] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const click = () => {
    window.clearTimeout(timer.current);
    if (!armed) {
      setArmed(true);
      timer.current = window.setTimeout(() => setArmed(false), 3500);
      return;
    }
    setArmed(false);
    onConfirm();
  };

  return (
    <button type="button" className={armed ? s.armed : undefined} onClick={click}>
      {armed ? "Silmek için tekrar tıkla" : "Formu temizle"}
    </button>
  );
}
