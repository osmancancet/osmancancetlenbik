"use client";

import { useRef, useState } from "react";
import { reportFileName } from "@/lib/araclar/on-kontrol-2209a/engine/report";
import s from "./OnKontrol.module.css";

interface Props {
  getText(): string;
  onCopied(): void;
  onDownloaded(): void;
}

async function copyText(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

export function CopyReport({ getText, onCopied, onDownloaded }: Props) {
  const [status, setStatus] = useState("");
  const timer = useRef<number | undefined>(undefined);
  const flash = (msg: string) => {
    setStatus(msg);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus(""), 4000);
  };

  const copy = async () => {
    const ok = await copyText(getText());
    if (ok) onCopied();
    flash(ok ? "Rapor kopyalandı. Danışmanına yapıştırabilirsin." : "Kopyalanamadı. Raporu elle seçip kopyala.");
  };

  const download = () => {
    const name = reportFileName(new Date());
    try {
      const url = URL.createObjectURL(new Blob(["﻿" + getText() + "\n"], { type: "text/plain;charset=utf-8" }));
      const a = document.createElement("a");
      a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      onDownloaded();
      flash(`“${name}” indirildi.`);
    } catch {
      flash("İndirilemedi. “Raporu kopyala”yı kullan.");
    }
  };

  return (
    <>
      <div className={s.sideActions}>
        <button type="button" className={s.primary} onClick={copy}>Raporu kopyala</button>
        <button type="button" onClick={download}>.txt indir</button>
      </div>
      <span className={s.copyStatus} aria-live="polite">{status}</span>
    </>
  );
}
