export function tcknValid(v: string): boolean {
  if (!/^[1-9]\d{10}$/.test(v)) return false;
  const d = [...v].map(Number);
  const t = ((d[0] + d[2] + d[4] + d[6] + d[8]) * 7 - (d[1] + d[3] + d[5] + d[7])) % 10;
  const e = d.slice(0, 10).reduce((a, b) => a + b, 0) % 10;
  return ((t + 10) % 10) === d[9] && e === d[10];
}

export const mask = (v: string): string =>
  v.length <= 4 ? "****" : v.slice(0, 2) + "*".repeat(v.length - 4) + v.slice(-2);

export type PiiKind = "tckn" | "telefon" | "eposta";
export interface PiiHit { kind: PiiKind; masked: string }

const RX_TCKN = /(?<!\d)[1-9]\d{10}(?!\d)/g;
const RX_PHONE = /(?<!\d)(?:\+90[\s-]?|0)?5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}(?!\d)/g;
const RX_EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;

export function findPii(text: string): PiiHit[] {
  const hits: PiiHit[] = [];
  for (const m of text.matchAll(RX_TCKN)) if (tcknValid(m[0])) hits.push({ kind: "tckn", masked: mask(m[0]) });
  for (const m of text.matchAll(RX_PHONE)) hits.push({ kind: "telefon", masked: mask(m[0].replace(/\s/g, "")) });
  for (const m of text.matchAll(RX_EMAIL)) hits.push({ kind: "eposta", masked: mask(m[0]) });
  return hits;
}
