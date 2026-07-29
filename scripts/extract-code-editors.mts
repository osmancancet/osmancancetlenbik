/**
 * Sunumlardaki <CodeEditor> çağrı noktalarından ham Python kaynağını çıkarır.
 *
 * NEDEN SCRIPT: `lines` prop'u ham metin değil, elle renklendirilmiş JSX:
 *   <><span className="tok-var">yas</span><span className="tok-operator"> = </span>...</>
 * 34 çağrı noktasını elle yeniden yazmak ~340 satır demek ve tek bir tipografik
 * hata (akıllı tırnak, kayıp boşluk) slaytta yanlış çıktı üretir.
 *
 * Script iki iş birden yapar:
 *   1. `code`   → migrasyonun girdisi (template literal olarak yapıştırılır)
 *   2. `tokens` → tokenizer'ın KALİBRASYON REFERANSI. `--verify` modunda
 *      tokenizePython(code) çıktısı bu referansla karşılaştırılır; böylece
 *      renklendirmenin bugünkü görünümü koruduğunu gözle değil ölçerek bilir.
 *
 * Kullanım:
 *   npx tsx scripts/extract-code-editors.mts            # JSON çıkar
 *   npx tsx scripts/extract-code-editors.mts --verify   # tokenizer'ı referansa karşı doğrula
 */

import ts from "typescript";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Kapsamdaki haftalar (h08 ara sınav; h03'te CodeEditor yok; h01/h02 kapsam dışı). */
const WEEKS = ["04", "05", "06", "07", "09", "10", "11", "12", "13", "14", "15"];

export type Tok = { cls: string; text: string };

export type Extracted = {
  file: string;
  week: string;
  line: number;
  title: string;
  tabs: string[];
  activeTab: string;
  highlight?: number[];
  /** Ham Python kaynağı — migrasyonun çıktısı. */
  code: string;
  /** Satır başına token dizisi — tokenizer kalibrasyon referansı. */
  tokens: Tok[][];
  /** Statik terminal mockup'ından çıkarılan düz metin (expectedOutput taslağı). */
  terminalText: string;
};

/* ------------------------------------------------------------------ *
 * HTML entity çözümü
 * ------------------------------------------------------------------ */

/**
 * Hedef 11 dosyada geçen entity'lerin tamamı (grep ile sayıldı):
 * &quot; &apos; &gt; &amp; &lt; &rarr; &rdquo; &ldquo; &mdash; &ndash;
 * &middot; &times; &nbsp;
 * Eksik bırakılan bir entity sessizce ham metin olarak kalır ve slaytta
 * "&rarr;" gibi görünür — bu yüzden liste tam tutulmalı.
 */
const ENTITIES: Record<string, string> = {
  "&quot;": '"',
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&amp;": "&",
  "&nbsp;": " ",
  "&rarr;": "→",
  "&larr;": "←",
  "&ldquo;": "“",
  "&rdquo;": "”",
  "&lsquo;": "‘",
  "&rsquo;": "’",
  "&mdash;": "—",
  "&ndash;": "–",
  "&middot;": "·",
  "&times;": "×",
  "&hellip;": "…",
};

function decodeEntities(s: string): string {
  return s
    .replace(/&[a-zA-Z]{2,10};/g, (m) => ENTITIES[m] ?? m)
    .replace(/&#(\d{1,6});/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-fA-F]{1,6});/g, (_, h: string) => String.fromCodePoint(parseInt(h, 16)));
}

/**
 * React'in JSX metin kuralı: yalnızca YENİ SATIR içeren baştaki/sondaki boşluk
 * blokları silinir; satır içindeki boşluklar korunur. Bu kural doğru
 * uygulanmazsa girinti bozulur.
 */
function normalizeJsxText(raw: string): string {
  const lines = raw.split("\n");
  if (lines.length === 1) return raw;
  const kept = lines
    .map((l, i) => (i === 0 ? l.replace(/\s+$/, "") : l.replace(/^\s+/, "").replace(/\s+$/, "")))
    .filter((l, i) => !(l === "" && (i === 0 || i === lines.length - 1)));
  return kept.join(" ");
}

/* ------------------------------------------------------------------ *
 * JSX gezinme
 * ------------------------------------------------------------------ */

function attrName(a: ts.JsxAttributeLike): string | null {
  return ts.isJsxAttribute(a) && ts.isIdentifier(a.name) ? a.name.text : null;
}

function getAttr(
  attrs: ts.JsxAttributes,
  name: string
): ts.JsxAttribute | undefined {
  return attrs.properties.find(
    (p): p is ts.JsxAttribute => attrName(p) === name
  );
}

/** `className="tok-var"` değerini okur (sadece düz string literal formunu destekler). */
function classNameOf(el: ts.JsxElement | ts.JsxSelfClosingElement): string {
  const attrs = ts.isJsxElement(el) ? el.openingElement.attributes : el.attributes;
  const a = getAttr(attrs, "className");
  if (!a?.initializer) return "";
  if (ts.isStringLiteral(a.initializer)) return a.initializer.text;
  if (
    ts.isJsxExpression(a.initializer) &&
    a.initializer.expression &&
    ts.isStringLiteral(a.initializer.expression)
  ) {
    return a.initializer.expression.text;
  }
  return "";
}

/**
 * Bir JSX düğümünü token listesine çevirir. `inherited`, iç içe span'lerde
 * dıştaki sınıfı taşır (en içteki className kazanır).
 */
function tokensOf(node: ts.Node, inherited: string, out: Tok[]): void {
  if (ts.isJsxText(node)) {
    const text = decodeEntities(normalizeJsxText(node.text));
    if (text) out.push({ cls: inherited, text });
    return;
  }

  if (ts.isJsxExpression(node)) {
    const e = node.expression;
    if (!e) return;
    if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) {
      // {"          "} → anlamlı boşluk / {"{"} → süslü parantez
      if (e.text) out.push({ cls: inherited, text: decodeEntities(e.text) });
      return;
    }
    throw new Error(
      `Desteklenmeyen JSX ifadesi: ${e.getText().slice(0, 60)} — elle taşınmalı`
    );
  }

  if (ts.isJsxFragment(node)) {
    node.children.forEach((c) => tokensOf(c, inherited, out));
    return;
  }

  if (ts.isJsxElement(node)) {
    const cls = classNameOf(node) || inherited;
    node.children.forEach((c) => tokensOf(c, cls, out));
    return;
  }

  if (ts.isJsxSelfClosingElement(node)) {
    // <br/> gibi — kod satırlarında beklenmiyor
    return;
  }
}

/** `lines={[...]}` dizisini satır başına token listesine çevirir. */
function extractLines(expr: ts.Expression): Tok[][] {
  if (!ts.isArrayLiteralExpression(expr)) {
    throw new Error("lines prop'u dizi literali değil");
  }
  return expr.elements.map((el) => {
    if (ts.isStringLiteral(el) || ts.isNoSubstitutionTemplateLiteral(el)) {
      return el.text ? [{ cls: "", text: decodeEntities(el.text) }] : [];
    }
    const out: Tok[] = [];
    tokensOf(el, "", out);
    return out;
  });
}

/** JSX ağacından düz metin toplar (terminal mockup'ı için). */
function plainText(node: ts.Node): string {
  let s = "";
  const visit = (n: ts.Node) => {
    if (ts.isJsxText(n)) {
      s += decodeEntities(normalizeJsxText(n.text));
      return;
    }
    if (ts.isJsxExpression(n)) {
      const e = n.expression;
      if (e && (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e))) {
        s += decodeEntities(e.text);
      }
      return;
    }
    if (ts.isJsxElement(n)) {
      // Her <div> yeni satır sayılır — terminal satırları böyle yazılmış
      const isBlock = ts.isIdentifier(n.openingElement.tagName)
        ? n.openingElement.tagName.text === "div"
        : false;
      n.children.forEach(visit);
      if (isBlock) s += "\n";
      return;
    }
    n.forEachChild(visit);
  };
  visit(node);
  return s.replace(/\n{2,}/g, "\n").trim();
}

function stringAttr(attrs: ts.JsxAttributes, name: string): string {
  const a = getAttr(attrs, name);
  if (!a?.initializer) return "";
  if (ts.isStringLiteral(a.initializer)) return a.initializer.text;
  if (
    ts.isJsxExpression(a.initializer) &&
    a.initializer.expression &&
    (ts.isStringLiteral(a.initializer.expression) ||
      ts.isNoSubstitutionTemplateLiteral(a.initializer.expression))
  ) {
    return a.initializer.expression.text;
  }
  return "";
}

function stringArrayAttr(attrs: ts.JsxAttributes, name: string): string[] {
  const a = getAttr(attrs, name);
  if (!a?.initializer || !ts.isJsxExpression(a.initializer)) return [];
  const e = a.initializer.expression;
  if (!e || !ts.isArrayLiteralExpression(e)) return [];
  return e.elements.flatMap((x) => (ts.isStringLiteral(x) ? [x.text] : []));
}

function numberArrayAttr(attrs: ts.JsxAttributes, name: string): number[] | undefined {
  const a = getAttr(attrs, name);
  if (!a?.initializer || !ts.isJsxExpression(a.initializer)) return undefined;
  const e = a.initializer.expression;
  if (!e || !ts.isArrayLiteralExpression(e)) return undefined;
  return e.elements.flatMap((x) => (ts.isNumericLiteral(x) ? [Number(x.text)] : []));
}

/* ------------------------------------------------------------------ *
 * Ana çıkarma
 * ------------------------------------------------------------------ */

function extractFile(week: string): Extracted[] {
  const rel = `src/presentations/programlama-temelleri-h${week}/Presentation.tsx`;
  const abs = join(ROOT, rel);
  const src = readFileSync(abs, "utf8");
  const sf = ts.createSourceFile(abs, src, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TSX);

  const found: Extracted[] = [];

  const visit = (node: ts.Node) => {
    const isEditor =
      (ts.isJsxElement(node) &&
        ts.isIdentifier(node.openingElement.tagName) &&
        node.openingElement.tagName.text === "CodeEditor") ||
      (ts.isJsxSelfClosingElement(node) &&
        ts.isIdentifier(node.tagName) &&
        node.tagName.text === "CodeEditor");

    if (isEditor) {
      const attrs = ts.isJsxElement(node) ? node.openingElement.attributes : node.attributes;
      const line = sf.getLineAndCharacterOfPosition(node.getStart()).line + 1;

      const linesAttr = getAttr(attrs, "lines");
      if (!linesAttr?.initializer || !ts.isJsxExpression(linesAttr.initializer)) {
        throw new Error(`${rel}:${line} — lines prop'u okunamadı`);
      }
      const expr = linesAttr.initializer.expression;
      if (!expr) throw new Error(`${rel}:${line} — lines boş`);

      let tokens: Tok[][];
      try {
        tokens = extractLines(expr);
      } catch (e) {
        throw new Error(`${rel}:${line} — ${(e as Error).message}`);
      }

      const termAttr = getAttr(attrs, "terminal");
      const terminalText =
        termAttr?.initializer && ts.isJsxExpression(termAttr.initializer) && termAttr.initializer.expression
          ? plainText(termAttr.initializer.expression)
          : "";

      found.push({
        file: rel,
        week,
        line,
        title: stringAttr(attrs, "title"),
        tabs: stringArrayAttr(attrs, "tabs"),
        activeTab: stringAttr(attrs, "activeTab"),
        highlight: numberArrayAttr(attrs, "highlight"),
        code: tokens.map((toks) => toks.map((t) => t.text).join("")).join("\n"),
        tokens,
        terminalText,
      });
    }

    node.forEachChild(visit);
  };

  visit(sf);
  return found;
}

/* ------------------------------------------------------------------ *
 * CLI
 * ------------------------------------------------------------------ */

const all: Extracted[] = [];
const problems: string[] = [];

for (const w of WEEKS) {
  try {
    all.push(...extractFile(w));
  } catch (e) {
    problems.push((e as Error).message);
  }
}

const outDir = join(ROOT, "scripts", ".out");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "code-editors.json");
writeFileSync(outFile, JSON.stringify(all, null, 2), "utf8");

console.log(`\nÇıkarılan çağrı noktası: ${all.length}`);
for (const w of WEEKS) {
  const n = all.filter((x) => x.week === w).length;
  console.log(`  h${w}: ${n}`);
}
console.log(`\nJSON: ${outFile}`);

if (problems.length) {
  console.log(`\n⚠ Sorunlar (${problems.length}):`);
  problems.forEach((p) => console.log("  - " + p));
}

/* ---- --verify: tokenizer'ı referansa karşı doğrula ---- */

/**
 * `.tok-*` → gerçek renk. styles.css:154-163 ile birebir aynı olmalı.
 *
 * Dikkat: `.prog-editor` taban rengi de #d4d4d4 — yani tok-punct, tok-operator
 * ve SINIFSIZ metin ekranda AYNI görünür. Bu yüzden token sınırlarını değil,
 * her GÖRÜNÜR KARAKTERİN RENGİNİ karşılaştırıyoruz: elle renklendirmede
 * boşluklar bazen token'a yapışık (`" = "`), bazen ayrı — bu fark ekranda
 * hiçbir şeyi değiştirmediği için hata sayılmamalı.
 */
const COLOR: Record<string, string> = {
  "tok-keyword": "#c586c0",
  "tok-builtin": "#4ec9b0",
  "tok-string": "#ce9178",
  "tok-number": "#b5cea8",
  "tok-comment": "#6a9955",
  "tok-fname": "#dcdcaa",
  "tok-var": "#9cdcfe",
  "tok-fstring": "#d7ba7d",
  "tok-punct": "#d4d4d4",
  "tok-operator": "#d4d4d4",
  "": "#d4d4d4",
};

/** Satırı `[görünür karakter, renk]` dizisine çevirir (boşluklar atılır). */
function colorMap(toks: Tok[]): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  for (const t of toks) {
    const color = COLOR[t.cls] ?? "#UNKNOWN(" + t.cls + ")";
    for (const chr of t.text) {
      if (/\s/.test(chr)) continue;
      out.push([chr, color]);
    }
  }
  return out;
}

function renderDiff(a: Array<[string, string]>, b: Array<[string, string]>): string {
  const len = Math.max(a.length, b.length);
  const parts: string[] = [];
  for (let i = 0; i < len; i++) {
    const x = a[i];
    const y = b[i];
    if (!x || !y || x[0] !== y[0] || x[1] !== y[1]) {
      parts.push(
        `  poz ${i}: referans=${x ? `${JSON.stringify(x[0])}${x[1]}` : "—"}  tokenizer=${y ? `${JSON.stringify(y[0])}${y[1]}` : "—"}`
      );
      if (parts.length >= 4) break;
    }
  }
  return parts.join("\n");
}

/**
 * BİLİNÇLİ KABUL EDİLEN FARKLAR.
 *
 * `return -1` satırlarında elle renklendirme `-1`'i bütünüyle sayı (#b5cea8)
 * boyamış. Gerçek VS Code Dark+ davranışı ise tekli eksiyi OPERATÖR (#d4d4d4),
 * `1`'i sayı olarak boyar — tokenizer bunu yapıyor. Öğrencilerin gerçekten
 * kullanacağı editörle tutarlı olmak, iki slayttaki tek karakterlik eski
 * kısayolu taklit etmekten değerli. Fark ekranda fark edilmez (tek tire).
 */
const ACCEPTED_DIFFS = new Set([
  "src/presentations/programlama-temelleri-h11/Presentation.tsx:830:5",
  "src/presentations/programlama-temelleri-h14/Presentation.tsx:1009:11",
]);

if (process.argv.includes("--verify")) {
  // Uzantısız: tsconfig'te allowImportingTsExtensions kapalı, tsx zaten çözüyor
  const { tokenizePython } = await import("../src/presentations/_shared/code/highlight");

  let badLines = 0;
  let totalLines = 0;
  let accepted = 0;
  const badSnippets = new Set<string>();

  for (const item of all) {
    const got = tokenizePython(item.code);
    const count = Math.max(got.length, item.tokens.length);
    for (let i = 0; i < count; i++) {
      totalLines++;
      const a = colorMap(item.tokens[i] ?? []);
      const b = colorMap(got[i] ?? []);
      const same =
        a.length === b.length && a.every((x, k) => x[0] === b[k][0] && x[1] === b[k][1]);
      if (!same) {
        if (ACCEPTED_DIFFS.has(`${item.file}:${item.line}:${i + 1}`)) {
          accepted++;
          continue;
        }
        badLines++;
        badSnippets.add(`${item.file}:${item.line}`);
        if (badLines <= 20) {
          const text = (item.tokens[i] ?? []).map((t) => t.text).join("");
          console.log(`\n✗ ${item.file}:${item.line}  satır ${i + 1}`);
          console.log(`  kod: ${text}`);
          console.log(renderDiff(a, b));
        }
      }
    }
  }

  console.log(
    badLines === 0
      ? `\n✓ Tokenizer, elle renklendirmeyle GÖRSEL OLARAK birebir aynı.` +
          `\n  ${all.length} snippet · ${totalLines} satır · 0 beklenmeyen fark` +
          `\n  (${accepted} bilinçli fark kabul listesinde — bkz. ACCEPTED_DIFFS)`
      : `\n✗ ${badLines}/${totalLines} satırda renk farkı (${badSnippets.size} snippet).`
  );
  process.exit(badLines === 0 ? 0 : 1);
}
