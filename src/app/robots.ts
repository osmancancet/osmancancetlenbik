import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Yalnızca hiçbir koşulda taranmaması gereken yollar kapatılır: admin paneli
 * ve API uçları.
 *
 * Atölye/tuzak sayfaları (/mcbukaf, /poll, /yoklama-tuzak, kitap basın kiti)
 * bilerek AÇIK bırakıldı. Bu sayfalar zaten `robots: { index: false }` ile
 * geliyor; robots.txt'te Disallow edilirlerse Google sayfayı indirip o
 * noindex etiketini göremez ve dışarıdan bağlantı varsa URL'yi yine de
 * dizinde tutabilir. Bir sayfayı dizinden çıkarmanın doğru yolu taranmasına
 * izin verip noindex vermektir.
 */
const DISALLOW = ["/admin", "/admin/", "/api/"];

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
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_AGENTS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
