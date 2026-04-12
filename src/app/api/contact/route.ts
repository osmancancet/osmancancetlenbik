import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalı").max(100),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  subject: z.string().min(2).max(150),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı").max(5000),
  // Honeypot — bots fill this; humans don't see it
  website: z.string().max(0).optional().or(z.literal("")),
});

// In-memory rate limit (per process)
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const ipHits = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_MAX) return false;
  hits.push(now);
  ipHits.set(ip, hits);
  return true;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Çok fazla istek. Lütfen biraz sonra tekrar deneyin." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz veri" },
      { status: 400 }
    );
  }

  // Honeypot triggered
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, subject, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "osmancancetlenbik@gmail.com";

  if (!apiKey) {
    // Dev fallback — no key configured
    console.log("[contact] no RESEND_API_KEY; would send:", {
      to,
      from: email,
      name,
      subject,
      message,
    });
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portföy <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `[Site] ${subject}`,
      text: `${name} (${email}) yazdı:\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] resend error", e);
    return NextResponse.json(
      { error: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}
