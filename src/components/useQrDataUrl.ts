"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

/**
 * Metni QR koduna çevirir. Yüksek hata düzeltme seviyesi (H) bilerek
 * seçildi: kod projeksiyondan okunuyor, perdedeki parlama ya da açılı
 * bakış bir kısmını bozsa bile telefon okuyabilsin.
 */
export function useQrDataUrl(text: string, size = 720) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!text) return;
    let cancelled = false;
    QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: "#000000", light: "#ffffffff" },
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [text, size]);

  return dataUrl;
}
