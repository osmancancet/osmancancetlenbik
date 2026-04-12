import { renderMarkdown } from "@/lib/markdown";
import { MarkdownClient } from "./MarkdownClient";

export async function MarkdownRenderer({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const html = await renderMarkdown(content);
  return <MarkdownClient html={html} className={className} />;
}
