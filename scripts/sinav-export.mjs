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

/* Tek renk (siyah), responsive HTML + yazıcı dostu A4 stylesheet */
const css = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    font-family: "Times New Roman", Georgia, "Liberation Serif", serif;
    font-size: 12pt;
    line-height: 1.55;
    color: #000;
    background: #fff;
    max-width: 800px;
    margin: 0 auto;
    padding: 24px 20px;
  }
  h1 {
    font-size: 22pt;
    text-align: center;
    margin: 8pt 0 2pt 0;
    letter-spacing: 0.4pt;
    font-weight: 700;
  }
  h2 {
    font-size: 15pt;
    text-align: center;
    margin: 0 0 14pt 0;
    border-bottom: 1.5px solid #000;
    padding-bottom: 6pt;
    letter-spacing: 0.3pt;
    font-weight: 700;
  }
  h2:not(:first-of-type) { margin-top: 22pt; }
  h3 {
    font-size: 13pt;
    margin: 16pt 0 8pt 0;
    border-bottom: 1px solid #000;
    padding-bottom: 3pt;
    font-weight: 700;
  }
  p { margin: 7pt 0; text-align: justify; }
  blockquote {
    border-left: 3px solid #000;
    background: #f5f5f5;
    padding: 10pt 14pt;
    margin: 10pt 0;
    font-size: 11.5pt;
  }
  blockquote p { margin: 4pt 0; }
  strong { font-weight: 700; }
  em { font-style: italic; }
  ul, ol { margin: 5pt 0 5pt 18pt; padding: 0; }
  li { margin: 3pt 0; }
  hr {
    border: none;
    border-top: 1px dashed #000;
    margin: 18pt 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10pt 0;
    font-size: 11pt;
  }
  th, td {
    border: 1px solid #000;
    padding: 5pt 8pt;
    text-align: center;
  }
  th {
    background: #ececec;
    font-weight: 700;
  }
  code {
    font-family: "JetBrains Mono", "Consolas", "Menlo", monospace;
    background: #f0f0f0;
    padding: 1px 5px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    font-size: 10.5pt;
  }
  p + p { margin-top: 4pt; }

  /* MOBİL (≤ 640 px) — responsive */
  @media (max-width: 640px) {
    body {
      font-size: 14pt;
      padding: 16px 14px;
      line-height: 1.6;
    }
    h1 { font-size: 20pt; }
    h2 { font-size: 16pt; }
    h3 { font-size: 14pt; }
    p { text-align: left; }
    table { font-size: 11pt; }
    th, td { padding: 6pt; }
    /* Wide tables: yatay scroll */
    table { display: block; overflow-x: auto; white-space: nowrap; }
    code { font-size: 11pt; }
  }

  /* YAZDIRMA (A4) */
  @media print {
    @page { size: A4; margin: 18mm 16mm 18mm 16mm; }
    body {
      max-width: none;
      padding: 0;
      font-size: 11pt;
      line-height: 1.45;
    }
    h1 { font-size: 18pt; }
    h2 {
      font-size: 13pt;
      page-break-after: avoid;
    }
    h3 {
      font-size: 11.5pt;
      page-break-after: avoid;
    }
    blockquote { background: #fafafa; }
    table { font-size: 9.5pt; page-break-inside: avoid; }
    th { background: #ececec !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    p, li { orphans: 3; widows: 3; }
    /* Bölüm başlıkları yeni sayfada başlamasın diye, ama kısımlar arasında zorla yeni sayfa */
    h2 + hr { page-break-after: always; }
    /* Sınav kısımlarını ayır */
    section { page-break-inside: auto; }
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
