// GEÇİCİ tanı: Telegram'a Frankfurt bölgesinden erişim.
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const preferredRegion = "fra1";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const tok = (process.env.TELEGRAM_BOT_TOKEN ?? "").trim();
  const t = Date.now();
  let getMe = "";
  try {
    const r = await fetch(`https://api.telegram.org/bot${tok}/getMe`, {
      signal: AbortSignal.timeout(8000),
    });
    const j = await r.json();
    getMe = `${r.status} ok=${j.ok} ${j.description ?? j.result?.username ?? ""} ${Date.now() - t}ms`;
  } catch (e) {
    getMe = `${(e as Error).name} ${Date.now() - t}ms`;
  }
  return NextResponse.json({ region: process.env.VERCEL_REGION, getMe });
}
