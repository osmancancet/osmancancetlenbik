/**
 * Bir klavye olayının yazı yazılan bir alandan gelip gelmediğini söyler.
 *
 * NEDEN GEREKLİ: her sunumun kökünde `window`'a bağlı global bir keydown
 * dinleyicisi var — sağ/sol ok ve boşluk slaytı değiştiriyor, `f` tam ekranı
 * açıyor. Bugüne kadar sorun çıkmadı çünkü sunumlarda hiç `<textarea>` yoktu.
 * Canlı kod editörüyle birlikte öğrenci `f` yazınca tam ekran açılır, boşluk
 * tuşu slaytı atlar. Bu guard onu engeller.
 */
export function isTypingTarget(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  if (!el || typeof el.tagName !== "string") return false;
  const tag = el.tagName;
  return (
    tag === "TEXTAREA" ||
    tag === "INPUT" ||
    tag === "SELECT" ||
    el.isContentEditable === true
  );
}
