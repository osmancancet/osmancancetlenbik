import { NextResponse } from "next/server";
import { agVerisiGetir } from "@/lib/openalex";

/** Araç sayfasındaki ortak yazar listesi (etiketleme önerisi) için ağ verisi. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = (searchParams.get("id") ?? "").trim();
  try {
    const veri = await agVerisiGetir(id);
    if (!veri) {
      return NextResponse.json({ hata: "Yazar bulunamadı" }, { status: 404 });
    }
    return NextResponse.json(veri, {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    });
  } catch {
    return NextResponse.json({ hata: "OpenAlex'e ulaşılamadı" }, { status: 502 });
  }
}
