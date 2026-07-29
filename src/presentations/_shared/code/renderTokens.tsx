import type { ReactNode } from "react";
import type { Tok } from "./highlight";

/**
 * Token satırlarını renkli `<span class="tok-*">` ağacına çevirir.
 *
 * Her satır kendi `<span class="pyrun-line">`'ı içinde döner. Boş satırlar
 * için sıfır genişlikli birleştirici (​) değil, gerçek bir boşluk
 * kullanılır — aksi halde <pre> o satırı çökertir ve arkadaki <textarea> ile
 * satır hizası kayar (bu bileşenin en sinsi hata türü).
 */
export function renderTokenLines(lines: Tok[][]): ReactNode {
  return lines.map((toks, i) => (
    <span className="pyrun-line" key={i}>
      {toks.length === 0
        ? " "
        : toks.map((t, j) =>
            t.cls ? (
              <span className={t.cls} key={j}>
                {t.text}
              </span>
            ) : (
              <span key={j}>{t.text}</span>
            )
          )}
      {"\n"}
    </span>
  ));
}
