/**
 * Python sözdizimi renklendirici — sunumlardaki mevcut `.tok-*` sınıflarını üretir.
 *
 * NEDEN ELLE YAZILDI (Shiki değil): Shiki projede zaten var ama SUNUCU tarafında
 * ve farklı bir temayla (github-dark-dimmed). Client'a taşımak ~120-200 KB chunk,
 * async init ve farklı bir renk paleti demek. Buradaki 34 kod bloğu VS Code Dark+
 * paletiyle ELLE renklendirilmişti; bu tokenizer aynı `.tok-*` sınıflarını ürettiği
 * için mevcut görünüm birebir korunuyor. Üstelik senkron çalışır → her tuş
 * vuruşunda yeniden boyanabilir, debounce/suspense gerekmez.
 *
 * Kalibrasyon: `npx tsx scripts/extract-code-editors.mts --verify` mevcut 34
 * bloğun elle renklendirmesiyle bu tokenizer'ın çıktısını karşılaştırır.
 */

export type Tok = { cls: string; text: string };

/* ------------------------------------------------------------------ */

const KEYWORDS = new Set([
  "and", "as", "assert", "async", "await", "break", "class", "continue",
  "def", "del", "elif", "else", "except", "finally", "for", "from", "global",
  "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass",
  "raise", "return", "try", "while", "with", "yield",
  "True", "False", "None",
  // Yumuşak anahtar kelimeler — mevcut slaytlarda keyword olarak boyanmışlar
  "match", "case",
]);

const BUILTINS = new Set([
  "print", "input", "len", "range", "open", "type", "int", "float", "str",
  "bool", "list", "dict", "set", "tuple", "abs", "sum", "min", "max",
  "sorted", "reversed", "enumerate", "zip", "round", "map", "filter",
  "any", "all", "isinstance", "format", "chr", "ord", "repr", "divmod",
  "pow", "id", "hex", "bin", "oct",
]);

/** Çok karakterli operatörler önce denenmeli (uzundan kısaya). */
const OPERATORS = [
  "**=", "//=", ">>=", "<<=", "...", "!=", "==", "<=", ">=", "->", ":=",
  "+=", "-=", "*=", "/=", "%=", "&=", "|=", "^=", "~=",
  "**", "//", "<<", ">>",
  "+", "-", "*", "/", "%", "=", "<", ">", "&", "|", "^", "~", "@",
];

const PUNCT = new Set(["(", ")", "[", "]", "{", "}", ",", ":", ".", ";"]);

/** Türkçe tanımlayıcılar şart: öğrenciler `yaş`, `öğrenci_sayısı` yazıyor. */
const IDENT_START = /[\p{L}_]/u;
const IDENT_PART = /[\p{L}\p{N}_]/u;

const STRING_PREFIX = /^[rRbBuUfF]{1,3}$/;

/* ------------------------------------------------------------------ */

class Emitter {
  lines: Tok[][] = [[]];

  push(cls: string, text: string) {
    if (!text) return;
    // Üçlü tırnaklı stringler satır atlayabilir — token'ı satırlara böl
    const parts = text.split("\n");
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) this.lines.push([]);
      if (parts[i]) this.lines[this.lines.length - 1].push({ cls, text: parts[i] });
    }
  }

  newline() {
    this.lines.push([]);
  }
}

/**
 * Kaynağı satır başına token dizisine çevirir.
 *
 * Tüm metin üzerinde tek geçiş yapılır (satır satır DEĞİL): üçlü tırnaklı
 * stringler ve çok satırlı ifadeler ancak böyle doğru boyanabilir.
 */
export function tokenizePython(src: string): Tok[][] {
  const em = new Emitter();
  const n = src.length;
  let i = 0;

  /** `def` görüldüyse bir sonraki tanımlayıcı fonksiyon adıdır. */
  let expectFnName = false;

  while (i < n) {
    const ch = src[i];

    /* --- satır sonu --- */
    if (ch === "\n") {
      em.newline();
      i++;
      continue;
    }

    /* --- boşluk (renksiz) --- */
    if (ch === " " || ch === "\t" || ch === "\r") {
      let j = i;
      while (j < n && (src[j] === " " || src[j] === "\t" || src[j] === "\r")) j++;
      em.push("", src.slice(i, j));
      i = j;
      continue;
    }

    /* --- yorum --- */
    if (ch === "#") {
      let j = i;
      while (j < n && src[j] !== "\n") j++;
      em.push("tok-comment", src.slice(i, j));
      i = j;
      continue;
    }

    /* --- string (önekli olabilir: f"", r'', rb"" …) --- */
    const strStart = tryString(src, i, em);
    if (strStart > i) {
      i = strStart;
      expectFnName = false;
      continue;
    }

    /* --- sayı --- */
    if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(src[i + 1] ?? ""))) {
      const m = NUMBER_RE.exec(src.slice(i));
      if (m) {
        em.push("tok-number", m[0]);
        i += m[0].length;
        continue;
      }
    }

    /* --- tanımlayıcı / anahtar kelime / builtin / fonksiyon adı --- */
    if (IDENT_START.test(ch)) {
      let j = i + 1;
      while (j < n && IDENT_PART.test(src[j])) j++;
      const word = src.slice(i, j);

      let cls: string;
      if (expectFnName) {
        cls = "tok-fname";
        expectFnName = false;
      } else if (KEYWORDS.has(word)) {
        cls = "tok-keyword";
        if (word === "def") expectFnName = true;
      } else if (BUILTINS.has(word)) {
        cls = "tok-builtin";
      } else if (src[j] === "(") {
        // Çağrılan her şey fonksiyon adı sayılır: `notlar.append(` → append,
        // `faktoriyel(` → faktoriyel. Builtin kontrolü ÖNCE geldiği için
        // `print(` builtin kalır (referans renklendirmesi de böyle).
        cls = "tok-fname";
      } else {
        cls = "tok-var";
      }

      em.push(cls, word);
      i = j;
      continue;
    }

    /* --- operatör --- */
    const op = OPERATORS.find((o) => src.startsWith(o, i));
    if (op) {
      em.push("tok-operator", op);
      i += op.length;
      continue;
    }

    /* --- ayraç --- */
    if (PUNCT.has(ch)) {
      em.push("tok-punct", ch);
      i++;
      continue;
    }

    /* --- tanınmayan karakter --- */
    em.push("", ch);
    i++;
  }

  return em.lines;
}

const NUMBER_RE =
  /^(?:0[xX][0-9a-fA-F_]+|0[oO][0-7_]+|0[bB][01_]+|(?:\d[\d_]*)?\.\d[\d_]*(?:[eE][+-]?\d+)?|\d[\d_]*\.(?!\.)|\d[\d_]*(?:[eE][+-]?\d+)?)[jJ]?/;

/* ------------------------------------------------------------------ *
 * String tarama
 * ------------------------------------------------------------------ */

/**
 * `i` konumunda bir string başlıyorsa tokenleri emit eder ve string'in
 * bittiği konumu döndürür; başlamıyorsa `i`'yi aynen döndürür.
 */
function tryString(src: string, i: number, em: Emitter): number {
  const n = src.length;

  // Öneki oku (en fazla 3 harf), hemen ardından tırnak gelmeli
  let p = i;
  while (p < n && p - i < 3 && /[rRbBuUfF]/.test(src[p])) p++;
  const prefix = src.slice(i, p);
  const q = src[p];
  if (q !== '"' && q !== "'") return i;
  if (prefix && !STRING_PREFIX.test(prefix)) return i;

  const isF = /[fF]/.test(prefix);
  const isRaw = /[rR]/.test(prefix);

  // Önek yalnızca f-string'de ayrı renk alır (referans konvansiyonu)
  if (prefix) em.push(isF ? "tok-fstring" : "tok-string", prefix);

  const triple = src.startsWith(q.repeat(3), p);
  const close = triple ? q.repeat(3) : q;

  let k = p + close.length;
  let buf = close; // açılış tırnağı string metnine dahil

  const flush = () => {
    if (buf) {
      em.push("tok-string", buf);
      buf = "";
    }
  };

  while (k < n) {
    const c = src[k];

    // Tek tırnaklı string satır sonunda kapanmamışsa orada biter (hatalı kod)
    if (!triple && c === "\n") break;

    // Kaçış dizisi — VS Code gibi ayrı renk (tok-fstring #d7ba7d)
    if (c === "\\" && !isRaw && k + 1 < n) {
      flush();
      em.push("tok-fstring", src.slice(k, k + 2));
      k += 2;
      continue;
    }
    if (c === "\\" && isRaw && k + 1 < n) {
      buf += src.slice(k, k + 2);
      k += 2;
      continue;
    }

    // f-string ifadesi: {...} içi yeniden tokenize edilir
    if (isF && c === "{") {
      if (src[k + 1] === "{") {
        buf += "{{";
        k += 2;
        continue;
      }
      flush();
      em.push("tok-punct", "{");
      k++;
      const end = findExprEnd(src, k);
      const inner = src.slice(k, end);
      for (const line of tokenizePython(inner)) {
        for (const t of line) em.push(t.cls, t.text);
      }
      k = end;
      if (src[k] === "}") {
        em.push("tok-punct", "}");
        k++;
      }
      continue;
    }
    if (isF && c === "}" && src[k + 1] === "}") {
      buf += "}}";
      k += 2;
      continue;
    }

    // Kapanış
    if (src.startsWith(close, k)) {
      buf += close;
      k += close.length;
      flush();
      return k;
    }

    buf += c;
    k++;
  }

  flush();
  return k;
}

/**
 * f-string süslü parantezinin kapanışını bulur. İç içe parantezleri ve
 * içerideki stringleri atlar; `!r` / `:.2f` gibi biçim belirteçlerinde durur.
 */
function findExprEnd(src: string, start: number): number {
  let depth = 0;
  let k = start;
  while (k < src.length) {
    const c = src[k];
    if (c === "'" || c === '"') {
      const qq = c;
      k++;
      while (k < src.length && src[k] !== qq) {
        if (src[k] === "\\") k++;
        k++;
      }
      k++;
      continue;
    }
    if (c === "(" || c === "[" || c === "{") depth++;
    else if (c === ")" || c === "]") depth--;
    else if (c === "}") {
      if (depth === 0) return k;
      depth--;
    } else if (c === ":" && depth === 0) {
      // biçim belirteci başlıyor — ifade burada biter
      return k;
    } else if (c === "\n") {
      return k;
    }
    k++;
  }
  return k;
}
