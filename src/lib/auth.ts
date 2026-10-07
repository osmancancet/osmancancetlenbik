import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "occ_admin";
const ALG = "HS256";

/**
 * admin        → tüm panel
 * applications → yalnız yarışma başvuruları (/admin/basvurular). Takımı
 *                birlikte kuran hocaların ayrı bir şifreyle girmesi için.
 */
export type SessionRole = "admin" | "applications";

/** Yalnız başvuru rolünün girebileceği panel yolu. */
export const APPLICATIONS_PATH = "/admin/basvurular";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET environment variable not set or too short");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(
  role: SessionRole = "admin"
): Promise<string> {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function getSessionRole(
  token: string | undefined
): Promise<SessionRole | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin" || payload.role === "applications"
      ? payload.role
      : null;
  } catch {
    return null;
  }
}

export async function verifySessionToken(
  token: string | undefined
): Promise<boolean> {
  return (await getSessionRole(token)) === "admin";
}

async function currentRole(): Promise<SessionRole | null> {
  const store = await cookies();
  return getSessionRole(store.get(COOKIE_NAME)?.value);
}

/** Tam yetkili yönetici mi? Mevcut tüm admin API'leri bunu kullanır. */
export async function isAuthenticated(): Promise<boolean> {
  return (await currentRole()) === "admin";
}

/** Yarışma başvurularını görebilir mi? (admin ya da başvuru rolü) */
export async function canManageApplications(): Promise<boolean> {
  return (await currentRole()) !== null;
}

export const SESSION_COOKIE = COOKIE_NAME;
