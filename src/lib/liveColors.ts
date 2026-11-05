/**
 * Yarışma şıklarının renkleri — tahtada ve telefonda aynı şık aynı renkte
 * görünsün ki öğrenci tahtadaki rengi telefonda hemen bulsun.
 * (Saf veri: istemci bileşenleri `lib/live` içindeki node:crypto'yu çekmesin.)
 */
export const OPTION_COLORS = [
  { letter: "A", bg: "#7c3aed" },
  { letter: "B", bg: "#0369a1" },
  { letter: "C", bg: "#b45309" },
  { letter: "D", bg: "#047857" },
  { letter: "E", bg: "#be185d" },
  { letter: "F", bg: "#4338ca" },
  { letter: "G", bg: "#4d7c0f" },
  { letter: "H", bg: "#0e7490" },
] as const;

export function optionColor(i: number) {
  return OPTION_COLORS[i % OPTION_COLORS.length];
}
