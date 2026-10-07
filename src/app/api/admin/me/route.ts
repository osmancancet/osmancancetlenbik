import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionRole, SESSION_COOKIE } from "@/lib/auth";

/** Panel menüsünü role göre süzmek için. Yetki kontrolü sunucu tarafında ayrıca yapılır. */
export async function GET() {
  const store = await cookies();
  const role = await getSessionRole(store.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ role });
}
