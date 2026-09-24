import { ImageResponse } from "next/og";
import { kartVerisiGetir, type KartVerisi } from "@/lib/openalex";
import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Akademisyen kartı PNG'si.
 *
 * ?id=A123          OpenAlex yazar kimliği (zorunlu)
 * ?boyut=dikey|og   dikey: 1080×1350 (LinkedIn gönderi görseli, varsayılan)
 *                   og:    1200×630  (bağlantı önizlemesi)
 *
 * Yazı tipi: Satori'nin varsayılanı Türkçe harfleri kutucuk basıyor. public/fonts'taki
 * Inter-*.ttf CV PDF'i için altkümelenmiş (harflerin çoğu yok); bu yüzden tam
 * karakter setli InterFull-*.ttf ayrı duruyor. İlk istekte okunup modülde saklanıyor.
 */

const BG = "#000000";
const KART = "#0a0a0a";
const FG = "#e8ffee";
const MUTED = "#7a9988";
const SUBTLE = "#4d6657";
const ACCENT = "#00ff41";
const BORDER = "rgba(0, 255, 65, 0.22)";
const SOFT = "rgba(0, 255, 65, 0.08)";

let fontlar: Promise<{ normal: ArrayBuffer; kalin: ArrayBuffer }> | null = null;

/**
 * Önce diskten (public/fonts), olmazsa isteğin geldiği adresten çekiyor.
 * Diskten okuma yerelde ve Vercel'de çalışıyor; adres yedeği ise dosya
 * izlemesinin fontu pakete almadığı durum için.
 */
async function fontOku(dosya: string, istekUrl: string): Promise<ArrayBuffer> {
  try {
    const buf = await readFile(path.join(process.cwd(), "public", "fonts", dosya));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } catch {
    const res = await fetch(new URL(`/fonts/${dosya}`, istekUrl));
    if (!res.ok) throw new Error(`Yazı tipi alınamadı: ${dosya}`);
    return res.arrayBuffer();
  }
}

function fontGetir(istekUrl: string) {
  if (!fontlar) {
    fontlar = Promise.all([
      fontOku("InterFull-Regular.ttf", istekUrl),
      fontOku("InterFull-Bold.ttf", istekUrl),
    ]).then(([normal, kalin]) => ({ normal, kalin }));
    // Başarısız olursa bir sonraki istek yeniden denesin.
    fontlar.catch(() => {
      fontlar = null;
    });
  }
  return fontlar;
}

const sayi = (n: number) => n.toLocaleString("tr-TR");
/** CSS uppercase "i"yi "I" yapıyor; Türkçe için İ gerekiyor. */
const buyukHarf = (m: string) => m.toLocaleUpperCase("tr-TR");

function kisalt(metin: string, uzunluk: number) {
  if (metin.length <= uzunluk) return metin;
  return metin.slice(0, uzunluk - 1).trimEnd() + "…";
}

function Sayac({
  etiket,
  deger,
  buyuk,
  duz = false,
}: {
  etiket: string;
  deger: string;
  buyuk: number;
  /** "i10" gibi büyük harfe çevrilmemesi gereken etiketler için. */
  duz?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: "26px 28px",
        background: KART,
        border: `1px solid ${BORDER}`,
        borderRadius: 16,
      }}
    >
      <div
        style={{
          fontSize: buyuk,
          fontWeight: 700,
          color: ACCENT,
          letterSpacing: -2,
          lineHeight: 1,
        }}
      >
        {deger}
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 20,
          color: MUTED,
          letterSpacing: 2,
        }}
      >
        {duz ? etiket : buyukHarf(etiket)}
      </div>
    </div>
  );
}

function Baslik({ children }: { children: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontSize: 18,
        color: ACCENT,
        letterSpacing: 3,
      }}
    >
      <div style={{ width: 22, height: 2, background: ACCENT }} />
      {buyukHarf(children)}
    </div>
  );
}

function DikeyKart({ v, yil }: { v: KartVerisi; yil: number }) {
  const cipler = [
    ...v.konular.map((k) => ({ metin: k, vurgu: true })),
    ...v.dergiler.map((d) => ({ metin: d.ad, vurgu: false })),
  ].slice(0, 5);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: BG,
        color: FG,
        fontFamily: "Inter",
        padding: "56px 64px 44px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: ACCENT,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -260,
          right: -260,
          width: 720,
          height: 720,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(0,255,65,0.16) 0%, transparent 70%)",
        }}
      />

      {/* Üst şerit */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Baslik>{`Akademisyen Kartı ${yil}`}</Baslik>
        <div style={{ fontSize: 18, color: SUBTLE, letterSpacing: 2 }}>
          OPENALEX VERİSİ
        </div>
      </div>

      {/* Ad ve kurum */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 34,
        }}
      >
        <div
          style={{
            fontSize: v.ad.length > 26 ? 56 : 68,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {kisalt(v.ad, 40)}
        </div>
        {v.kurum && (
          <div style={{ marginTop: 14, fontSize: 26, color: MUTED }}>
            {kisalt(v.kurum, 60)}
          </div>
        )}
      </div>

      {/* Sayaçlar */}
      <div style={{ display: "flex", gap: 16, marginTop: 34 }}>
        <Sayac etiket="Yayın" deger={sayi(v.yayin)} buyuk={64} />
        <Sayac etiket="Atıf" deger={sayi(v.atif)} buyuk={64} />
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
        <Sayac etiket="h-indeks" deger={sayi(v.hIndeks)} buyuk={64} />
        <Sayac etiket="i10-indeks" deger={sayi(v.i10)} buyuk={64} duz />
        <Sayac
          etiket="Ortak yazar"
          deger={sayi(v.ortakYazarSayisi)}
          buyuk={64}
        />
      </div>

      {/* En çok atıf alan */}
      {v.enCokAtifAlan && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            padding: "22px 28px",
            background: SOFT,
            border: `1px solid ${BORDER}`,
            borderRadius: 16,
          }}
        >
          <Baslik>En çok atıf alan çalışma</Baslik>
          <div
            style={{
              marginTop: 14,
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            {kisalt(v.enCokAtifAlan.baslik, 110)}
          </div>
          <div style={{ marginTop: 10, fontSize: 22, color: MUTED }}>
            {[
              v.enCokAtifAlan.yil ? String(v.enCokAtifAlan.yil) : null,
              `${sayi(v.enCokAtifAlan.atif)} atıf`,
            ]
              .filter(Boolean)
              .join("  ·  ")}
          </div>
        </div>
      )}

      {/* Ortak yazarlar + konular */}
      <div style={{ display: "flex", gap: 16, marginTop: 18 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "20px 28px",
            background: KART,
            border: `1px solid ${BORDER}`,
            borderRadius: 16,
          }}
        >
          <Baslik>En sık birlikte</Baslik>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 14,
              gap: 8,
            }}
          >
            {v.ortakYazarlar.length === 0 && (
              <div style={{ fontSize: 22, color: MUTED }}>Tek yazarlı yayınlar</div>
            )}
            {v.ortakYazarlar.map((o) => (
              <div
                key={o.ad}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 23,
                }}
              >
                <span>{kisalt(o.ad, 24)}</span>
                <span style={{ color: MUTED }}>{o.sayi} ortak</span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "20px 28px",
            background: KART,
            border: `1px solid ${BORDER}`,
            borderRadius: 16,
          }}
        >
          <Baslik>Kısa özet</Baslik>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 14,
              gap: 8,
              fontSize: 23,
            }}
          >
            {v.ilkYil && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: MUTED }}>İlk yayın</span>
                <span>{v.ilkYil}</span>
              </div>
            )}
            {v.enVerimliYil && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: MUTED }}>En verimli yıl</span>
                <span>
                  {v.enVerimliYil.yil} ({v.enVerimliYil.yayin})
                </span>
              </div>
            )}
            {v.ulkeSayisi > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: MUTED }}>İş birliği ülkesi</span>
                <span>{v.ulkeSayisi}</span>
              </div>
            )}
            {v.acikErisimYuzdesi !== null && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: MUTED }}>Açık erişim</span>
                <span>%{v.acikErisimYuzdesi}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Konu çipleri */}
      {cipler.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 18,
          }}
        >
          {cipler.map((c) => (
            <div
              key={c.metin}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                fontSize: 20,
                border: `1px solid ${c.vurgu ? ACCENT : BORDER}`,
                color: c.vurgu ? ACCENT : MUTED,
                background: c.vurgu ? SOFT : "transparent",
              }}
            >
              {kisalt(c.metin, 40)}
            </div>
          ))}
        </div>
      )}

      {/* Alt bilgi */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
          paddingTop: 22,
          borderTop: `1px solid ${BORDER}`,
          fontSize: 20,
          color: SUBTLE,
        }}
      >
        <span>osmancancetlenbik.com/araclar/akademisyen-karti</span>
        <span>{v.orcid ? `ORCID ${v.orcid}` : `OpenAlex ${v.id}`}</span>
      </div>
    </div>
  );
}

function OgKart({ v, yil }: { v: KartVerisi; yil: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: BG,
        color: FG,
        fontFamily: "Inter",
        padding: "56px 64px 44px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: ACCENT,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -220,
          right: -220,
          width: 620,
          height: 620,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(0,255,65,0.16) 0%, transparent 70%)",
        }}
      />
      <Baslik>{`Akademisyen Kartı ${yil}`}</Baslik>
      <div
        style={{
          marginTop: 22,
          fontSize: v.ad.length > 26 ? 50 : 62,
          fontWeight: 700,
          letterSpacing: -2,
          lineHeight: 1.05,
        }}
      >
        {kisalt(v.ad, 40)}
      </div>
      {v.kurum && (
        <div style={{ marginTop: 10, fontSize: 24, color: MUTED }}>
          {kisalt(v.kurum, 70)}
        </div>
      )}
      <div style={{ display: "flex", gap: 16, marginTop: 34 }}>
        <Sayac etiket="Yayın" deger={sayi(v.yayin)} buyuk={54} />
        <Sayac etiket="Atıf" deger={sayi(v.atif)} buyuk={54} />
        <Sayac etiket="h-indeks" deger={sayi(v.hIndeks)} buyuk={54} />
        <Sayac etiket="i10-indeks" deger={sayi(v.i10)} buyuk={54} duz />
      </div>
      {v.enCokAtifAlan && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 26,
            padding: "18px 24px",
            background: SOFT,
            border: `1px solid ${BORDER}`,
            borderRadius: 14,
          }}
        >
          <Baslik>En çok atıf alan çalışma</Baslik>
          <div style={{ marginTop: 8, fontSize: 24, fontWeight: 700 }}>
            {kisalt(v.enCokAtifAlan.baslik, 80)}
          </div>
          <div style={{ marginTop: 6, fontSize: 18, color: MUTED }}>
            {[
              v.enCokAtifAlan.yil ? String(v.enCokAtifAlan.yil) : null,
              `${sayi(v.enCokAtifAlan.atif)} atıf`,
            ]
              .filter(Boolean)
              .join("  ·  ")}
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
          fontSize: 18,
          color: SUBTLE,
        }}
      >
        <span>osmancancetlenbik.com/araclar/akademisyen-karti</span>
        <span>Veri: OpenAlex</span>
      </div>
    </div>
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = (searchParams.get("id") ?? "").trim();
  const og = searchParams.get("boyut") === "og";

  const veri = await kartVerisiGetir(id);
  if (!veri) {
    return new Response("Yazar bulunamadı", { status: 404 });
  }

  const { normal, kalin } = await fontGetir(request.url);
  const yil = new Date().getFullYear();

  return new ImageResponse(
    og ? <OgKart v={veri} yil={yil} /> : <DikeyKart v={veri} yil={yil} />,
    {
      width: og ? 1200 : 1080,
      height: og ? 630 : 1350,
      fonts: [
        { name: "Inter", data: normal, weight: 400, style: "normal" },
        { name: "Inter", data: kalin, weight: 700, style: "normal" },
      ],
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Content-Disposition": `inline; filename="akademisyen-karti-${veri.id}.png"`,
      },
    }
  );
}
