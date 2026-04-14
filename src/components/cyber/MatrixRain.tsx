"use client";

import { useEffect, useRef, useState } from "react";

const CHARS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>/{}[]$#@!*+=";

function getThemeColor() {
  if (typeof document === "undefined") return "rgba(0, 255, 65, ALPHA)";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "rgba(21, 128, 61, ALPHA)"
    : "rgba(0, 255, 65, ALPHA)";
}

function getBgColor() {
  if (typeof document === "undefined") return "rgba(0, 0, 0, 0.06)";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "rgba(255, 255, 255, 0.10)"
    : "rgba(0, 0, 0, 0.06)";
}

export function MatrixRain({ opacity = 1 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setVersion] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let columns: number[] = [];
    const fontSize = 16;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / fontSize);
      columns = Array.from({ length: cols }, () =>
        Math.floor(Math.random() * -50)
      );
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let frame = 0;
    const draw = () => {
      frame++;
      if (frame % 4 !== 0) {
        raf = requestAnimationFrame(draw);
        return;
      }

      // Stronger fade clears prior frames so chars don't pile up
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const col = getThemeColor();

      for (let i = 0; i < columns.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = columns[i] * fontSize;

        // Bright head — soft white-green tip
        ctx.fillStyle = "rgba(180, 255, 200, 0.55)";
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.fillText(ch, i * fontSize, y);

        // Single trail char — main green, softer
        ctx.fillStyle = col.replace("ALPHA", "0.30");
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(
          CHARS[Math.floor(Math.random() * CHARS.length)],
          i * fontSize,
          y - fontSize
        );

        if (y > canvas.height && Math.random() > 0.975) columns[i] = 0;
        columns[i]++;
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    // React to theme changes
    const observer = new MutationObserver(() => setVersion((v) => v + 1));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
}
