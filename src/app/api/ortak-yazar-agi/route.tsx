import type { CSSProperties } from "react";
import { ImageResponse } from "next/og";
import { agVerisiGetir, type AgVerisi } from "@/lib/openalex";
import { interFontlari } from "@/lib/ogFont";
import {
  basHarfler,
  yerlesimHesapla,
  type YerlesikDugum,
} from "@/app/araclar/ortak-yazar-agi/yerlesim";

/**
 * Ortak yazar ağı PNG'si.
 *
 * ?id=A123          OpenAlex yazar kimliği (zorunlu)
 * ?boyut=dikey|og   dikey: 1080×1350 (LinkedIn gönderi görseli, varsayılan)
 *                   og:    1200×630  (bağlantı önizlemesi)
 *
 * Çizgiler ve daireler satır içi SVG, etiketler mutlak konumlu div: Satori
 * SVG içindeki <text>'i yazı tipiyle basamıyor.
 */

const BG = "#000000";
const KART = "#0a0a0a";
const FG = "#e8ffee";
const MUTED = "#7a9988";
const SUBTLE = "#4d6657";
const ACCENT = "#00ff41";
const BORDER = "rgba(0, 255, 65, 0.22)";
const SOFT = "rgba(0, 255, 65, 0.08)";

const sayi = (n: number) => n.toLocaleString("tr-TR");
const buyukHarf = (m: string) => m.toLocaleUpperCase("tr-TR");

function kisalt(metin: string, uzunluk: number) {
  if (metin.length <= uzunluk) return metin;
  return metin.slice(0, uzunluk - 1).trimEnd() + "…";
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

function Sayac({
  etiket,
  deger,
  buyuk,
}: {
  etiket: string;
  deger: string;
  buyuk: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: "22px 24px",
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
      <div style={{ marginTop: 10, fontSize: 18, color: MUTED, letterSpacing: 2 }}>
        {buyukHarf(etiket)}
      </div>
    </div>
  );
}

type GrafikOlcu = {
  genislik: number;
  yukseklik: number;
  yaricap: number;
  enFazla: number;
  merkezR: number;
  dugumMin: number;
  dugumMax: number;
  adSiniri: number;
  etiketGenislik: number;
  yazi: number;
};

function Etiket({ d, o }: { d: YerlesikDugum; o: GrafikOlcu }) {
  const bosluk = 12;
  const yukseklik = o.yazi * 2.4;
  const konum: CSSProperties =
    d.hiza === "sag"
      ? { left: d.x + d.r + bosluk, top: d.y - yukseklik / 2, alignItems: "flex-start" }
      : d.hiza === "sol"
        ? {
            left: d.x - d.r - bosluk - o.etiketGenislik,
            top: d.y - yukseklik / 2,
            alignItems: "flex-end",
          }
        : d.hiza === "ust"
          ? {
              left: d.x - o.etiketGenislik / 2,
              top: d.y - d.r - bosluk / 2 - yukseklik,
              alignItems: "center",
            }
          : {
              left: d.x - o.etiketGenislik / 2,
              top: d.y + d.r + bosluk / 2,
              alignItems: "center",
            };
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: o.etiketGenislik,
        height: yukseklik,
        ...konum,
      }}
    >
      <div style={{ fontSize: o.yazi, fontWeight: 700, color: FG, lineHeight: 1.15 }}>
        {d.kisaAd}
      </div>
      <div style={{ fontSize: o.yazi * 0.78, color: MUTED, marginTop: 4 }}>
        {`${d.sayi} ortak yayın`}
      </div>
    </div>
  );
}

function AgGrafik({ v, o }: { v: AgVerisi; o: GrafikOlcu }) {
  const cx = o.genislik / 2;
  const cy = o.yukseklik / 2;
  const y = yerlesimHesapla(v, {
    cx,
    cy,
    yaricap: o.yaricap,
    enFazla: o.enFazla,
    merkezR: o.merkezR,
    dugumMin: o.dugumMin,
    dugumMax: o.dugumMax,
    adSiniri: o.adSiniri,
  });

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: o.genislik,
        height: o.yukseklik,
      }}
    >
      <svg
        width={o.genislik}
        height={o.yukseklik}
        viewBox={`0 0 ${o.genislik} ${o.yukseklik}`}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={o.yaricap}
          fill="none"
          stroke="rgba(0,255,65,0.10)"
          strokeWidth={1.5}
          strokeDasharray="4 8"
        />
        {/* Önce ortak yazarlar arası bağlar, üstüne merkez bağları. */}
        {y.baglar
          .filter((b) => !b.merkez)
          .map((b, i) => (
            <line
              key={`k${i}`}
              x1={b.x1}
              y1={b.y1}
              x2={b.x2}
              y2={b.y2}
              stroke="rgba(122,153,136,0.45)"
              strokeWidth={b.kalinlik}
              strokeLinecap="round"
            />
          ))}
        {y.baglar
          .filter((b) => b.merkez)
          .map((b, i) => (
            <line
              key={`m${i}`}
              x1={b.x1}
              y1={b.y1}
              x2={b.x2}
              y2={b.y2}
              stroke="rgba(0,255,65,0.55)"
              strokeWidth={b.kalinlik}
              strokeLinecap="round"
            />
          ))}
        {y.dugumler.map((d, i) => (
          <circle
            key={`d${i}`}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="#062b12"
            stroke={ACCENT}
            strokeWidth={2.5}
          />
        ))}
        <circle cx={cx} cy={cy} r={o.merkezR + 14} fill="rgba(0,255,65,0.12)" />
        <circle cx={cx} cy={cy} r={o.merkezR} fill={ACCENT} />
      </svg>

      <div
        style={{
          position: "absolute",
          left: cx - o.merkezR,
          top: cy - o.merkezR,
          width: o.merkezR * 2,
          height: o.merkezR * 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: o.merkezR * 0.72,
          fontWeight: 700,
          color: BG,
          letterSpacing: -1,
        }}
      >
        {basHarfler(v.ad)}
      </div>

      {y.dugumler.map((d, i) => (
        <Etiket key={i} d={d} o={o} />
      ))}

      {y.dugumler.length === 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: cy + o.merkezR + 30,
            display: "flex",
            justifyContent: "center",
            fontSize: o.yazi,
            color: MUTED,
          }}
        >
          Yayınların tamamı tek yazarlı
        </div>
      )}

      {y.kalan > 0 && (
        <div
          style={{
            position: "absolute",
            right: 24,
            bottom: 8,
            display: "flex",
            fontSize: o.yazi * 0.8,
            color: SUBTLE,
          }}
        >
          {`+${sayi(y.kalan)} ortak yazar daha`}
        </div>
      )}
    </div>
  );
}

function ortalama(n: number | null) {
  return n === null ? "–" : n.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
}

function DikeyAg({ v, yil }: { v: AgVerisi; yil: number }) {
  const enSik = v.ortakYazarlar[0];
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
          top: 330,
          left: 90,
          width: 900,
          height: 900,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(0,255,65,0.10) 0%, transparent 65%)",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Baslik>{`Ortak Yazar Ağım ${yil}`}</Baslik>
        <div style={{ fontSize: 18, color: SUBTLE, letterSpacing: 2 }}>OPENALEX VERİSİ</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
        <div
          style={{
            fontSize: v.ad.length > 26 ? 50 : 60,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {kisalt(v.ad, 40)}
        </div>
        {v.kurum && (
          <div style={{ marginTop: 12, fontSize: 26, color: MUTED }}>
            {kisalt(v.kurum, 60)}
          </div>
        )}
      </div>

      <div style={{ display: "flex", marginLeft: -64, marginRight: -64 }}>
        <AgGrafik
          v={v}
          o={{
            genislik: 1080,
            yukseklik: 720,
            yaricap: 235,
            enFazla: 12,
            merkezR: 62,
            dugumMin: 14,
            dugumMax: 40,
            adSiniri: 18,
            etiketGenislik: 230,
            yazi: 22,
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        <Sayac etiket="Ortak yazar" deger={sayi(v.ortakYazarSayisi)} buyuk={52} />
        <Sayac etiket="Kurum" deger={sayi(v.kurumSayisi)} buyuk={52} />
        <Sayac etiket="Ülke" deger={sayi(v.ulkeSayisi)} buyuk={52} />
        <Sayac etiket="Yazar / yayın" deger={ortalama(v.ortalamaYazar)} buyuk={52} />
      </div>

      {enSik && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
            padding: "20px 26px",
            background: SOFT,
            border: `1px solid ${BORDER}`,
            borderRadius: 16,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Baslik>En sık birlikte</Baslik>
            <div style={{ marginTop: 10, fontSize: 30, fontWeight: 700 }}>
              {kisalt(enSik.ad, 34)}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              fontSize: 22,
              color: MUTED,
            }}
          >
            <span style={{ color: ACCENT, fontSize: 30, fontWeight: 700 }}>
              {`${enSik.sayi} ortak yayın`}
            </span>
            {enSik.ilkYil && <span style={{ marginTop: 6 }}>{`ilki ${enSik.ilkYil}`}</span>}
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
          paddingTop: 20,
          borderTop: `1px solid ${BORDER}`,
          fontSize: 20,
          color: SUBTLE,
        }}
      >
        <span>osmancancetlenbik.com/araclar/ortak-yazar-agi</span>
        <span>{v.orcid ? `ORCID ${v.orcid}` : `OpenAlex ${v.id}`}</span>
      </div>
    </div>
  );
}

function OgAg({ v, yil }: { v: AgVerisi; yil: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: BG,
        color: FG,
        fontFamily: "Inter",
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
          display: "flex",
          flexDirection: "column",
          width: 520,
          padding: "56px 0 44px 64px",
        }}
      >
        <Baslik>{`Ortak Yazar Ağım ${yil}`}</Baslik>
        <div
          style={{
            marginTop: 22,
            fontSize: v.ad.length > 20 ? 42 : 52,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {kisalt(v.ad, 40)}
        </div>
        {v.kurum && (
          <div style={{ marginTop: 10, fontSize: 22, color: MUTED }}>
            {kisalt(v.kurum, 44)}
          </div>
        )}
        <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
          <Sayac etiket="Ortak yazar" deger={sayi(v.ortakYazarSayisi)} buyuk={44} />
          <Sayac etiket="Kurum" deger={sayi(v.kurumSayisi)} buyuk={44} />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <Sayac etiket="Ülke" deger={sayi(v.ulkeSayisi)} buyuk={44} />
          <Sayac etiket="Yazar / yayın" deger={ortalama(v.ortalamaYazar)} buyuk={44} />
        </div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 17, color: SUBTLE }}>
          osmancancetlenbik.com/araclar/ortak-yazar-agi
        </div>
      </div>
      <div style={{ position: "absolute", left: 520, top: 0, display: "flex" }}>
        <AgGrafik
          v={v}
          o={{
            genislik: 660,
            yukseklik: 630,
            yaricap: 160,
            enFazla: 8,
            merkezR: 44,
            dugumMin: 11,
            dugumMax: 28,
            adSiniri: 14,
            etiketGenislik: 146,
            yazi: 18,
          }}
        />
      </div>
    </div>
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = (searchParams.get("id") ?? "").trim();
  const og = searchParams.get("boyut") === "og";

  const veri = await agVerisiGetir(id);
  if (!veri) {
    return new Response("Yazar bulunamadı", { status: 404 });
  }

  const yil = new Date().getFullYear();

  return new ImageResponse(
    og ? <OgAg v={veri} yil={yil} /> : <DikeyAg v={veri} yil={yil} />,
    {
      width: og ? 1200 : 1080,
      height: og ? 630 : 1350,
      fonts: await interFontlari(request.url),
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Content-Disposition": `inline; filename="ortak-yazar-agi-${veri.id}.png"`,
      },
    }
  );
}
