"use client";

import { useCallback, useMemo, useRef, type RefObject } from "react";
import { tokenizePython } from "./highlight";
import { renderTokenLines } from "./renderTokens";

const INDENT = "    "; // Python'da 4 boşluk — PEP 8

/**
 * Düzenlenebilir kod yüzeyi: şeffaf `<textarea>` + arkasında renklendirilmiş
 * `<pre>` + solda satır numarası sütunu.
 *
 * NEDEN MONACO/CODEMIRROR DEĞİL: onlar ~1-2 MB. Bize gereken tek şey girinti,
 * renk ve Tab davranışı. Bu yüzden react-simple-code-editor deseni elle yazıldı
 * (~200 satır, 0 KB bağımlılık).
 */
export function CodeSurface({
  value,
  onChange,
  onRun,
  readOnly = false,
  ariaLabel,
  taRef,
}: {
  value: string;
  onChange?: (v: string) => void;
  onRun?: () => void;
  readOnly?: boolean;
  ariaLabel: string;
  taRef?: RefObject<HTMLTextAreaElement | null>;
}) {
  const innerRef = useRef<HTMLTextAreaElement | null>(null);
  const ref = taRef ?? innerRef;

  const tokens = useMemo(() => tokenizePython(value), [value]);
  const lineCount = tokens.length;

  /**
   * Metni tarayıcının KENDİ düzenleme yoluyla değiştirir.
   *
   * `setState` ile `value`'yu doğrudan değiştirmek textarea'nın yerleşik
   * geri alma (undo) yığınını yok eder — öğrenci Ctrl+Z yapamaz.
   * `execCommand("insertText")` resmen kullanımdan kaldırılmış olsa da tüm
   * masaüstü tarayıcılarda çalışıyor ve undo/redo'yu koruyor; CodeMirror 5 ve
   * react-simple-code-editor de aynı yolu kullanıyor. Desteklenmezse aşağıdaki
   * `value` + `setSelectionRange` yedeğine düşülür (undo kaybolur ama düzenleme
   * çalışmaya devam eder).
   */
  const applyEdit = useCallback(
    (start: number, end: number, text: string, caret?: number) => {
      const ta = ref.current;
      if (!ta || !onChange) return;
      ta.focus();
      ta.setSelectionRange(start, end);

      let ok = false;
      try {
        ok = document.execCommand("insertText", false, text);
      } catch {
        ok = false;
      }

      if (ok) {
        onChange(ta.value);
      } else {
        const next = ta.value.slice(0, start) + text + ta.value.slice(end);
        onChange(next);
        // React değeri yazdıktan sonra imleci konumla
        requestAnimationFrame(() => {
          const p = caret ?? start + text.length;
          ta.setSelectionRange(p, p);
        });
        return;
      }

      if (caret !== undefined) {
        requestAnimationFrame(() => ta.setSelectionRange(caret, caret));
      }
    },
    [onChange, ref]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const ta = e.currentTarget;
      const { selectionStart: s, selectionEnd: en, value: v } = ta;

      // Çalıştır
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        onRun?.();
        return;
      }

      // Odaktan çık → slayt navigasyonu geri gelir
      if (e.key === "Escape") {
        e.preventDefault();
        ta.blur();
        return;
      }

      if (readOnly || !onChange) return;

      /* ---- Tab / Shift+Tab: girinti ---- */
      if (e.key === "Tab") {
        e.preventDefault();
        const lineStart = v.lastIndexOf("\n", s - 1) + 1;
        const multiline = v.slice(s, en).includes("\n");

        if (!multiline && !e.shiftKey) {
          applyEdit(s, en, INDENT);
          return;
        }

        // Seçili satırların tamamına uygula
        const blockEnd = en === lineStart ? en : v.indexOf("\n", en) === -1 ? v.length : en;
        const block = v.slice(lineStart, Math.max(blockEnd, en));
        const lines = block.split("\n");
        const next = lines
          .map((l) =>
            e.shiftKey ? l.replace(/^ {1,4}/, "") : l.length || lines.length === 1 ? INDENT + l : l
          )
          .join("\n");
        applyEdit(lineStart, lineStart + block.length, next);
        return;
      }

      /* ---- Enter: otomatik girinti ---- */
      if (e.key === "Enter") {
        e.preventDefault();
        const lineStart = v.lastIndexOf("\n", s - 1) + 1;
        const currentLine = v.slice(lineStart, s);
        const lead = /^[ \t]*/.exec(currentLine)?.[0] ?? "";
        // `:` ile biten satırdan sonra blok açılır → bir kademe içeri
        const opensBlock = /:\s*(#.*)?$/.test(currentLine.trimEnd());
        const indent = lead + (opensBlock ? INDENT : "");
        applyEdit(s, en, "\n" + indent);
        return;
      }

      /* ---- Backspace: girinti hizasında 4 boşluk birden sil ---- */
      if (e.key === "Backspace" && s === en && s > 0) {
        const lineStart = v.lastIndexOf("\n", s - 1) + 1;
        const before = v.slice(lineStart, s);
        if (before.length > 0 && /^ +$/.test(before) && before.length % INDENT.length === 0) {
          e.preventDefault();
          applyEdit(s - INDENT.length, s, "");
        }
        return;
      }

      /* ---- Ctrl/Cmd + / : yorum aç-kapat ---- */
      if ((e.ctrlKey || e.metaKey) && (e.key === "/" || e.code === "Slash")) {
        e.preventDefault();
        const lineStart = v.lastIndexOf("\n", s - 1) + 1;
        const lineEndRaw = v.indexOf("\n", en);
        const lineEnd = lineEndRaw === -1 ? v.length : lineEndRaw;
        const block = v.slice(lineStart, lineEnd);
        const lines = block.split("\n");
        const allCommented = lines.every((l) => !l.trim() || /^\s*#\s?/.test(l));
        const next = lines
          .map((l) => {
            if (!l.trim()) return l;
            if (allCommented) return l.replace(/^(\s*)#\s?/, "$1");
            const lead = /^\s*/.exec(l)?.[0] ?? "";
            return lead + "# " + l.slice(lead.length);
          })
          .join("\n");
        applyEdit(lineStart, lineEnd, next);
        return;
      }
    },
    [applyEdit, onChange, onRun, readOnly, ref]
  );

  /** Dokunmatik cihazlarda Tab tuşu yok — araç çubuğundan karakter ekle. */
  const insertAtCaret = useCallback(
    (text: string) => {
      const ta = ref.current;
      if (!ta) return;
      applyEdit(ta.selectionStart, ta.selectionEnd, text);
    },
    [applyEdit, ref]
  );

  return (
    <>
      <div className="pyrun-editor">
        <div className="pyrun-gutter" aria-hidden="true">
          {Array.from({ length: lineCount }, (_, i) => (
            <span className="pyrun-gutter-num" key={i}>
              {i + 1}
            </span>
          ))}
        </div>

        <div className="pyrun-scroll">
          {/* Renkli katman — ekranda görünen bu. Ekran okuyucudan gizli, çünkü
              aynı metin textarea'da zaten erişilebilir. */}
          <pre className="pyrun-pre" aria-hidden="true">
            {renderTokenLines(tokens)}
          </pre>

          <textarea
            ref={ref}
            className="pyrun-ta"
            value={value}
            readOnly={readOnly}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label={ariaLabel}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            data-gramm="false"
            wrap="off"
            rows={lineCount}
          />
        </div>
      </div>

      {!readOnly && (
        <div className="pyrun-touchbar gap-1.5 px-3 py-2 bg-[#171717] border-t border-[#2d2d2d] overflow-x-auto">
          {[
            { label: "⇥", text: INDENT, title: "Girinti" },
            { label: ":", text: ":" },
            { label: '"', text: '"' },
            { label: "(", text: "(" },
            { label: ")", text: ")" },
            { label: "[", text: "[" },
            { label: "]", text: "]" },
            { label: "#", text: "# " },
            { label: "_", text: "_" },
            { label: "=", text: " = " },
          ].map((k) => (
            <button
              key={k.label}
              type="button"
              className="pyrun-touchbar-key"
              title={k.title}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => insertAtCaret(k.text)}
            >
              {k.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
