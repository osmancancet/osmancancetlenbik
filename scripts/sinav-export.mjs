/**
 * Convert sinav/BVA-1108-Final-2026.md → styled HTML
 *   node scripts/sinav-export.mjs
 * Then:
 *   textutil -convert docx /tmp/sinav.html -output sinav/BVA-1108-Final-2026.docx
 *   "Brave Browser" --headless --print-to-pdf=... /tmp/sinav.html
 */
import { readFile, writeFile } from "node:fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const md = await readFile("sinav/BVA-1108-Final-2026.md", "utf8");

const file = await unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true })
  .process(md);

const body = String(file);

const css = `
  @page { size: A4; margin: 18mm 16mm 18mm 16mm; }
  body { font-family: "Times New Roman", Georgia, serif; font-size: 11pt; line-height: 1.45; color: #111; max-width: 18cm; margin: 0 auto; padding: 0 8px; }
  h1 { font-size: 20pt; text-align: center; margin: 8pt 0 2pt 0; letter-spacing: 0.4pt; }
  h2 { font-size: 14pt; text-align: center; margin: 0 0 12pt 0; color: #c0392b; border-bottom: 2px solid #c0392b; padding-bottom: 4pt; letter-spacing: 0.3pt; }
  h2:not(:first-of-type) { page-break-before: auto; margin-top: 18pt; }
  h3 { font-size: 12pt; margin: 14pt 0 6pt 0; border-bottom: 1px solid #999; padding-bottom: 2pt; }
  p { margin: 6pt 0; text-align: justify; }
  blockquote { border-left: 3px solid #c0392b; background: #fafafa; padding: 8pt 12pt; margin: 8pt 0; font-size: 10.5pt; }
  blockquote p { margin: 4pt 0; }
  strong { font-weight: 700; }
  ul, ol { margin: 4pt 0 4pt 16pt; padding: 0; }
  li { margin: 2pt 0; }
  hr { border: none; border-top: 1.5px dashed #999; margin: 16pt 0; }
  table { width: 100%; border-collapse: collapse; margin: 8pt 0; font-size: 10pt; }
  th, td { border: 1px solid #888; padding: 4pt 6pt; text-align: center; }
  th { background: #f0e6e0; font-weight: 700; }
  code { font-family: "Consolas", "Menlo", monospace; background: #f3eee9; padding: 1pt 4pt; border-radius: 2pt; font-size: 10pt; }
  /* "Soru numarası" — Markdown'da **1.** olarak yazıldı, <strong>1.</strong> render edilir */
  p > strong:first-child { color: #c0392b; }
  /* Tablo cevap anahtarı için */
  table th:first-child { background: #e8d8d0; }
  /* Şıklar arasında satır arası daralt */
  p + p { margin-top: 4pt; }
`;

const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <title>BVA 1108 — Final Sınavı</title>
  <style>${css}</style>
</head>
<body>
${body}
</body>
</html>`;

await writeFile("/tmp/sinav.html", html, "utf8");
console.log("✓ /tmp/sinav.html (" + html.length + " bytes)");
