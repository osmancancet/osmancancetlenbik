import { NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { verifyPassword, safeEqualString } from "@/lib/password";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

// Throttle: 5 login attempts per IP per 15 minutes.
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const FAIL_DELAY_MS = 600;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`login:${ip}`, {
    max: MAX_ATTEMPTS,
    windowMs: WINDOW_MS,
  });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok fazla deneme. Daha sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  const { password } = (await req.json().catch(() => ({}))) as {
    password?: string;
  };

  const hash = process.env.ADMIN_PASSWORD_HASH;
  const plain = process.env.ADMIN_PASSWORD;

  if (!hash && !plain) {
    return NextResponse.json(
      { error: "Sunucu yapılandırılmamış." },
      { status: 500 }
    );
  }

  if (!password || typeof password !== "string") {
    await sleep(FAIL_DELAY_MS);
    return NextResponse.json({ error: "Şifre hatalı." }, { status: 401 });
  }

  let valid = false;
  if (hash) {
    valid = await verifyPassword(password, hash);
  } else if (plain) {
    // Legacy fallback — log once so the operator switches to ADMIN_PASSWORD_HASH.
    if (!globalThis.__warnedPlainPassword) {
      console.warn(
        "[auth] ADMIN_PASSWORD (plain) is deprecated. Set ADMIN_PASSWORD_HASH instead. Generate with: npx tsx scripts/hash-password.ts"
      );
      globalThis.__warnedPlainPassword = true;
    }
    valid = safeEqualString(password, plain);
  }

  if (!valid) {
    await sleep(FAIL_DELAY_MS);
    return NextResponse.json({ error: "Şifre hatalı." }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

declare global {
  // eslint-disable-next-line no-var
  var __warnedPlainPassword: boolean | undefined;
}
