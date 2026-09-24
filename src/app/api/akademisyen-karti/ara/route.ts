import { NextResponse } from "next/server";
import { yazarAra } from "@/lib/openalex";

/** Ad ya da ORCID ile OpenAlex yazar araması; istemci doğrudan OpenAlex'e gitmiyor. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().slice(0, 120);
  if (q.length < 3) {
    return NextResponse.json({ sonuclar: [] });
  }
  try {
    const sonuclar = await yazarAra(q);
    return NextResponse.json(
      { sonuclar },
      { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } }
    );
  } catch {
    return NextResponse.json(
      { sonuclar: [], hata: "OpenAlex'e ulaşılamadı" },
      { status: 502 }
    );
  }
}
