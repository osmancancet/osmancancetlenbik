import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

// Raw HTML in markdown source is escaped (allowDangerousHtml omitted).
// This blocks <script>, <iframe>, inline event handlers, etc. from post content.
// rehypePrettyCode and rehypeAutolinkHeadings emit proper hast nodes, so they
// still render correctly without allowDangerousHtml.
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "wrap",
    properties: { className: ["heading-anchor"] },
  })
  .use(rehypePrettyCode, {
    theme: "github-dark-dimmed",
    keepBackground: false,
    defaultLang: "plaintext",
  })
  .use(rehypeStringify);

export async function renderMarkdown(content: string): Promise<string> {
  const file = await processor.process(content);
  return String(file);
}
