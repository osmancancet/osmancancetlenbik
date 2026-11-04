import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@/generated/prisma";
import { databaseConfigured, prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { getHaritaSummary, istanbulDay, reporterKey } from "@/lib/harita";
import { SCAM_KIND_IDS } from "@/data/dolandiricilik";

export const dynamic = "force-dynamic";

const ReportSchema = z.object({
  plate: z.number().int().min(1).max(81),
  kind: z.enum(SCAM_KIND_IDS),
  lost: z.boolean().default(false),
  /** Bal küpü — insan bu alanı görmez, doluysa bot. */
  website: z.string().max(0).optional(),
});

export async function GET() {
  const summary = await getHaritaSummary();
  return NextResponse.json(summary, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" },
  });
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`harita:${ip}`, { max: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok fazla istek, biraz sonra tekrar dene." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  const parsed = ReportSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz bildirim." }, { status: 400 });
  }
  if (!databaseConfigured()) {
    return NextResponse.json({ error: "Önizleme sürümünde bildirim kaydedilmiyor." }, { status: 503 });
  }

  const day = istanbulDay();
  const { plate, kind, lost } = parsed.data;
  try {
    await prisma.scamReport.create({
      data: { plate, kind, lost, day, reporterKey: reporterKey(ip, day) },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return NextResponse.json(
        { error: "Bugün zaten bir bildirim yaptın. Yarın yeni bir tane ekleyebilirsin.", summary: await getHaritaSummary() },
        { status: 409 },
      );
    }
    throw e;
  }
  return NextResponse.json({ ok: true, summary: await getHaritaSummary() });
}
