"use client";

import { useEffect, useRef } from "react";

export function MarkdownClient({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const cleanups: Array<() => void> = [];

    container.querySelectorAll("pre").forEach((pre) => {
      const preEl = pre as HTMLPreElement;
      if (preEl.dataset.wrapped === "true") return;
      preEl.dataset.wrapped = "true";

      const wrapper = document.createElement("div");
      wrapper.className = "code-wrapper relative group";
      preEl.parentNode?.insertBefore(wrapper, preEl);
      wrapper.appendChild(preEl);

      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", "Kodu kopyala");
      button.className =
        "absolute top-2 right-2 z-10 inline-flex items-center gap-1 px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded border border-[var(--border-strong)] bg-[var(--bg-soft)]/80 backdrop-blur text-[var(--fg-muted)] opacity-0 group-hover:opacity-100 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all";

      const setLabel = (text: string) => {
        button.textContent = text;
      };
      setLabel("Kopyala");

      const onClick = () => {
        const code = preEl.querySelector("code");
        const text = code?.textContent ?? "";
        navigator.clipboard.writeText(text).then(() => {
          setLabel("Kopyalandı");
          setTimeout(() => setLabel("Kopyala"), 1500);
        });
      };
      button.addEventListener("click", onClick);
      wrapper.appendChild(button);

      cleanups.push(() => {
        button.removeEventListener("click", onClick);
      });
    });

    return () => {
      cleanups.forEach((c) => c());
    };
  }, [html]);

  return (
    <div
      ref={ref}
      className={`prose-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
