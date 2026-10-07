import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "occ_admin";
// src/lib/auth.ts ile aynı — proxy next/headers kullanan modülü içe aktarmıyor.
const APPLICATIONS_PATH = "/admin/basvurular";

async function roleOf(token: string | undefined) {
  if (!token) return null;
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload.role === "admin" || payload.role === "applications"
      ? payload.role
      : null;
  } catch {
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const role = await roleOf(req.cookies.get(COOKIE_NAME)?.value);

  if (!role) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Başvuru rolü panelin geri kalanına giremez.
  if (
    role === "applications" &&
    pathname !== APPLICATIONS_PATH &&
    !pathname.startsWith(`${APPLICATIONS_PATH}/`)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = APPLICATIONS_PATH;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
