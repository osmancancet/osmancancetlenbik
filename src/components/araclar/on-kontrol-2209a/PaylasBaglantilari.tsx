"use client";

import { useState } from "react";
import s from "./Hazirlayan.module.css";

const URL = "https://osmancancetlenbik.com/araclar/2209a-on-kontrol";

// Paylaşımda hazır gelen açıklama. Yalnızca sayfa adresi ve tanıtım metni paylaşılır; başvuru metni asla.
const ACIKLAMA =
  "TÜBİTAK 2209-A başvurusu yapacak öğrenciler için ücretsiz ön kontrol aracı. " +
  "Başvuru metnini TYBS'ye girmeden önce 2026 bilgi notundaki kurallara göre kontrol ediyor: " +
  "özet ve bölüm sınırları, 12 aylık çalışma takvimi, katkı toplamı, ayrı iş adımı olamayacak işler, atıf ve DOI. " +
  "Metin tarayıcıdan çıkmıyor. Son başvuru: 11 Kasım 2026.";
const UZUN = `${ACIKLAMA}\n\n${URL}`;
// X'te 280 karakter sınırı var; bağlantı ayrıca eklenir.
const KISA = "TÜBİTAK 2209-A başvuru metnini TYBS'ye girmeden önce bilgi notundaki kurallara göre kontrol eden ücretsiz araç. Metin tarayıcıdan çıkmaz. Son başvuru: 11 Kasım.";

export function PaylasBaglantilari() {
  const [status, setStatus] = useState("");

  const copy = async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(UZUN); ok = true; } catch { ok = false; }
    setStatus(ok ? "Açıklama ve bağlantı kopyalandı." : URL);
    window.setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div className={s.share}>
      <span>Öğrencilerinle paylaş:</span>
      <a href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`${UZUN}\n\n#TÜBİTAK #2209A #lisans #araştırma`)}`} target="_blank" rel="noopener">LinkedIn</a>
      <a href={`https://wa.me/?text=${encodeURIComponent(UZUN)}`} target="_blank" rel="noopener">WhatsApp</a>
      <a href={`https://x.com/intent/post?text=${encodeURIComponent(KISA)}&url=${encodeURIComponent(URL)}`} target="_blank" rel="noopener">X</a>
      <a href={`https://t.me/share/url?url=${encodeURIComponent(URL)}&text=${encodeURIComponent(ACIKLAMA)}`} target="_blank" rel="noopener">Telegram</a>
      <button type="button" onClick={copy}>Açıklamayla kopyala</button>
      <span className={s.status} aria-live="polite">{status}</span>
    </div>
  );
}
