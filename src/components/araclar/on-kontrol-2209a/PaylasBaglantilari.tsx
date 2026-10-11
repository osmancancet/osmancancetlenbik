"use client";

import { useState } from "react";
import s from "./Hazirlayan.module.css";

const URL = "https://osmancancetlenbik.com/araclar/2209a-on-kontrol";

// Yalnızca sayfa adresi paylaşılır; başvuru metni asla.
export function PaylasBaglantilari() {
  const [status, setStatus] = useState("");
  const enc = encodeURIComponent(URL);
  const wa = encodeURIComponent(`2209-A ön kontrol aracı: ${URL}`);

  const copy = async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(URL); ok = true; } catch { ok = false; }
    setStatus(ok ? "Bağlantı kopyalandı." : URL);
    window.setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div className={s.share}>
      <span>Öğrencilerinle paylaş:</span>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`} target="_blank" rel="noopener">LinkedIn</a>
      <a href={`https://wa.me/?text=${wa}`} target="_blank" rel="noopener">WhatsApp</a>
      <a href={`https://x.com/intent/post?url=${enc}&text=${encodeURIComponent("2209-A Ön Kontrol")}`} target="_blank" rel="noopener">X</a>
      <button type="button" onClick={copy}>Bağlantıyı kopyala</button>
      <span className={s.status} aria-live="polite">{status}</span>
    </div>
  );
}
