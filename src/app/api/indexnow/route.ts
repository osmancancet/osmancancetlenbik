import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { siteUrl } from "@/lib/site";
import { recentlyChanged, submitIndexNow } from "@/lib/indexnow";

export const dynamic = "force-dynamic";

const WINDOW_MS = 48 * 60 * 60 * 1000;
let lastRun = 0;

/**
 * Vercel Cron günde bir kez çağırır: sitemap'te son 48 saatte değişmiş
 * adresleri IndexNow'a bildirir. Yalnız herkese açık adresler gönderildiği
 * için gizli anahtar yok; kötüye kullanıma karşı saatte bir çalışır.
 */
export async function GET() {
  const now = Date.now();
  if (now - lastRun < 60 * 60 * 1000) {
    return NextResponse.json({ skipped: "rate-limited" });
  }
  lastRun = now;

  const entries = (await sitemap()).map((e) => ({
    url: e.url,
    lastModified: e.lastModified,
  }));
  const urls = recentlyChanged(entries, siteUrl, now, WINDOW_MS);
  try {
    const r = await submitIndexNow(siteUrl, urls);
    console.log("indexnow", r);
    return NextResponse.json(r);
  } catch (e) {
    console.log("indexnow error", String(e));
    return NextResponse.json({ error: "submit failed" }, { status: 502 });
  }
}
