/**
 * Sınav markdown → responsive monochrome HTML
 *
 * Kullanım:
 *   node scripts/sinav-export.mjs <input.md> [output.html]
 *
 * Varsayılan output: <input>.html (aynı klasör, aynı isim, .html uzantısı)
 *
 * Sonra:
 *   textutil -convert docx <output.html> -output <output>.docx
 *   "Brave Browser" --headless=new --print-to-pdf=<output>.pdf
 *     --print-to-pdf-no-header "file://<output.html>"
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname, basename, extname, join } from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const args = process.argv.slice(2);
const inputArg = args[0];
if (!inputArg) {
  console.error("Kullanım: node scripts/sinav-export.mjs <input.md> [output.html]");
  process.exit(1);
}

const inputPath = resolve(inputArg);
const outputPath = args[1]
  ? resolve(args[1])
  : join(
      dirname(inputPath),
      `${basename(inputPath, extname(inputPath))}.html`,
    );

const md = await readFile(inputPath, "utf8");

const file = await unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true })
  .process(md);

const body = String(file);

/* Tek renk siyah, ortalı, sıkı sınav stylesheet (2 sayfa hedefi) */
const css = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    font-family: "Times New Roman", Georgia, "Liberation Serif", serif;
    font-size: 10.5pt;
    line-height: 1.35;
    color: #000;
    background: #fff;
    max-width: 760px;
    margin: 0 auto;
    padding: 4px 18px 16px 18px;
    text-align: justify;
  }
  /* Üst başlık bloğu (ilk hr'a kadar) + son selamlama: center */
  body > h1,
  body > h2,
  body > h3,
  body > h4 { text-align: center; }
  /* Üniversite başlığı ve sınav başlığı bloğundaki info paragrafları (Öğretim Üyesi, Öğrenme Çıktıları, Adı Soyadı) */
  body > p:nth-of-type(-n+3) { text-align: center; }
  /* Son paragraf (Başarılar dilerim) */
  body > p:last-of-type { text-align: center; }
  h1 {
    font-size: 17pt;
    margin: 0 0 0 0;
    letter-spacing: 0.4pt;
    font-weight: 700;
  }
  h2 {
    font-size: 13pt;
    margin: 2pt 0 4pt 0;
    letter-spacing: 0.2pt;
    font-weight: 700;
  }
  h3 {
    font-size: 11.5pt;
    margin: 6pt 0 4pt 0;
    font-weight: 700;
    letter-spacing: 0.2pt;
  }
  h4 {
    font-size: 10.5pt;
    margin: 8pt 0 4pt 0;
    font-weight: 700;
    text-decoration: underline;
  }
  p {
    margin: 4pt 0;
  }
  /* Hikâye paragrafları */
  blockquote + h4 + p,
  h4 + p {
    text-align: justify;
    text-align-last: left;
    margin: 4pt auto;
    max-width: 720px;
  }
  blockquote {
    border-left: 2px solid #000;
    background: #f5f5f5;
    padding: 5pt 10pt;
    margin: 5pt auto;
    font-size: 9.5pt;
    text-align: left;
    max-width: 720px;
  }
  blockquote p { margin: 2pt 0; text-align: left; }
  strong { font-weight: 700; }
  em { font-style: italic; color: #333; }
  ul, ol { margin: 3pt auto 3pt 18pt; padding: 0; text-align: left; max-width: 720px; }
  li { margin: 1pt 0; }
  hr {
    border: none;
    border-top: 1px solid #000;
    margin: 6pt 0;
  }
  table {
    width: auto;
    margin: 6pt auto;
    border-collapse: collapse;
    font-size: 10pt;
  }
  th, td {
    border: 1px solid #000;
    padding: 3pt 8pt;
    text-align: center;
  }
  th { background: #ececec; font-weight: 700; }
  code {
    font-family: "JetBrains Mono", "Consolas", "Menlo", monospace;
    background: #f0f0f0;
    padding: 0 4px;
    border: 1px solid #d0d0d0;
    border-radius: 2px;
    font-size: 9.5pt;
  }
  /* Header bloğu */
  h1 + h2, h2 + h3 { margin-top: 2pt; }
  /* MEDEK özeti vs */
  body > p { font-size: 10pt; }
  body > p > em { font-size: 9pt; color: #222; }

  /* MOBİL */
  @media (max-width: 640px) {
    body {
      font-size: 13pt;
      padding: 14px 12px;
      line-height: 1.55;
      text-align: left;
    }
    h1, h2, h3, h4 { text-align: center; }
    h1 { font-size: 18pt; }
    h2 { font-size: 15pt; }
    h3 { font-size: 13pt; }
    h4 { font-size: 12pt; }
    p { text-align: left; }
    blockquote + h4 + p, h4 + p { text-align: left; max-width: none; }
    table { display: block; overflow-x: auto; width: 100%; font-size: 11pt; }
    code { font-size: 11pt; }
    blockquote { max-width: none; }
    ul, ol { max-width: none; }
  }

  /* YAZDIRMA (A4) — 2 sayfa hedef */
  @media print {
    @page { size: A4; margin: 14mm 14mm 14mm 14mm; }
    body {
      max-width: none;
      padding: 0;
      font-size: 9.5pt;
      line-height: 1.3;
    }
    h1 { font-size: 14pt; margin: 0 0 2pt 0; }
    h2 { font-size: 11pt; margin: 0 0 3pt 0; page-break-after: avoid; }
    h3 { font-size: 10pt; margin: 4pt 0 3pt 0; page-break-after: avoid; }
    h4 { font-size: 9.5pt; margin: 5pt 0 2pt 0; page-break-after: avoid; }
    p { margin: 3pt 0; }
    blockquote { padding: 3pt 8pt; margin: 3pt auto; font-size: 8.5pt; }
    table { font-size: 9pt; page-break-inside: avoid; }
    th, td { padding: 2pt 6pt; }
    th {
      background: #ececec !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    code { font-size: 8.5pt; padding: 0 3px; }
    hr { margin: 4pt 0; }
    p, li { orphans: 3; widows: 3; }
  }
`;

const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="robots" content="noindex, nofollow">
  <title>BVA 1108 — Final Sınavı</title>
  <style>${css}</style>
</head>
<body>
${body}
</body>
</html>`;

await writeFile(outputPath, html, "utf8");
console.log(`✓ ${outputPath} (${html.length} bytes)`);
