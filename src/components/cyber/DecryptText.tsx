"use client";

import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:,.<>?/\\|";

export function DecryptText({
  text,
  speed = 50,
  delay = 0,
  className = "",
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let frame = 0;
    const totalFrames = Math.ceil(text.length * 1.4);
    let timer: ReturnType<typeof setTimeout>;
    let raf: ReturnType<typeof setInterval>;

    timer = setTimeout(() => {
      raf = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const revealed = Math.floor(text.length * progress);
        const next = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealed) return char;
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join("");
        setDisplay(next);
        if (frame >= totalFrames) {
          setDisplay(text);
          clearInterval(raf);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timer);
      clearInterval(raf);
    };
  }, [text, speed, delay]);

  return <span className={className}>{display}</span>;
}
