import { lower } from "./text";

export interface AuthorYear { s: string; y: string }
export interface Citations { numeric: number[]; ay: AuthorYear[] }

const UP = "A-ZÇĞİÖŞÜ";
const RX_PAREN = /\(([^()]*?(?:19|20)\d{2}[a-z]?[^()]*)\)/g;
const RX_AY = new RegExp(`([${UP}][\\p{L}'’\\-]+)(?:\\s+(?:ve|vd\\.|et al\\.|&|and)(?:\\s+[${UP}][\\p{L}'’\\-]+)?)?,?\\s*((?:19|20)\\d{2})`, "gu");
const RX_NARR = new RegExp(`([${UP}][\\p{L}'’\\-]+)(?:\\s+(?:vd\\.|et al\\.))?\\s+\\(((?:19|20)\\d{2})[a-z]?\\)`, "gu");
const RX_NUM = /\[(\d+(?:\s*[-–,]\s*\d+)*)\]/g;
export const RX_DOI = /10\.\d{4,9}\/[^\s"<>]+/i;

export function citations(text: string): Citations {
  const numeric: number[] = [];
  for (const m of text.matchAll(RX_NUM)) {
    for (const part of m[1].split(",")) {
      const b = part.trim().split(/\s*[-–]\s*/);
      if (b.length === 2) {
        for (let n = +b[0]; n <= +b[1] && n - +b[0] < 200; n++) numeric.push(n);
      } else if (/^\d+$/.test(b[0])) numeric.push(+b[0]);
    }
  }
  const ay: AuthorYear[] = [];
  for (const m of text.matchAll(RX_PAREN)) {
    for (const part of m[1].split(";")) for (const a of part.matchAll(RX_AY)) ay.push({ s: a[1], y: a[2] });
  }
  for (const m of text.matchAll(RX_NARR)) ay.push({ s: m[1], y: m[2] });
  return { numeric, ay };
}

export const refMatches = (ref: string, c: AuthorYear): boolean => lower(ref).includes(lower(c.s)) && ref.includes(c.y);

export const refLines = (raw: string): string[] =>
  raw.split("\n").map((l) => l.trim().replace(/^(\[\d+\]|\d+[.)])\s*/, "")).filter(Boolean);

export const hasDoi = (ref: string): boolean => RX_DOI.test(ref);
