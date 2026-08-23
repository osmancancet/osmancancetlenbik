import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Atölye/tuzak sayfaları ve API uçları taranmasın; buna karşılık üretken
 * arama motorlarının (GEO) tarayıcıları açıkça karşılanır — ChatGPT,
 * Perplexity, Claude ve Gemini alıntı verirken bu izne bakıyor.
 */
const DISALLOW = [
  "/admin",
  "/admin/",
  "/api/",
  "/mcbukaf/",
  "/yoklama-tuzak/",
  "/poll/",
  "/kitaplar/*/basin-kiti",
];

const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: AI_AGENTS,
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
