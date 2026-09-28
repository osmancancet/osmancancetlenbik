import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Satori (next/og) görselleri için Inter yazı tipi.
 *
 * Satori'nin varsayılanı Türkçe harfleri kutucuk basıyor. public/fonts'taki
 * Inter-*.ttf CV PDF'i için altkümelenmiş (harflerin çoğu yok); bu yüzden tam
 * karakter setli InterFull-*.ttf ayrı duruyor. İlk istekte okunup modülde saklanıyor.
 */

let fontlar: Promise<{ normal: ArrayBuffer; kalin: ArrayBuffer }> | null = null;

/**
 * Önce diskten (public/fonts), olmazsa isteğin geldiği adresten çekiyor.
 * Diskten okuma yerelde ve Vercel'de çalışıyor; adres yedeği ise dosya
 * izlemesinin fontu pakete almadığı durum için.
 */
async function fontOku(dosya: string, istekUrl: string): Promise<ArrayBuffer> {
  try {
    const buf = await readFile(path.join(process.cwd(), "public", "fonts", dosya));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } catch {
    const res = await fetch(new URL(`/fonts/${dosya}`, istekUrl));
    if (!res.ok) throw new Error(`Yazı tipi alınamadı: ${dosya}`);
    return res.arrayBuffer();
  }
}

function fontGetir(istekUrl: string) {
  if (!fontlar) {
    fontlar = Promise.all([
      fontOku("InterFull-Regular.ttf", istekUrl),
      fontOku("InterFull-Bold.ttf", istekUrl),
    ]).then(([normal, kalin]) => ({ normal, kalin }));
    // Başarısız olursa bir sonraki istek yeniden denesin.
    fontlar.catch(() => {
      fontlar = null;
    });
  }
  return fontlar;
}

/** ImageResponse'un `fonts` seçeneğine doğrudan verilecek liste. */
export async function interFontlari(istekUrl: string) {
  const { normal, kalin } = await fontGetir(istekUrl);
  return [
    { name: "Inter", data: normal, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: kalin, weight: 700 as const, style: "normal" as const },
  ];
}
