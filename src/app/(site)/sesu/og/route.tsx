import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

/**
 * Sabit adres: /sesu/og
 * `opengraph-image.tsx` (site) rota grubunda olduğu için Next adrese bir
 * hash ekliyor; meta etiketinin kırılmaması için görsel normal bir route.
 */
export async function GET() {
  const icon = `data:image/png;base64,${(
    await readFile(join(process.cwd(), "public/sesu/sesu-icon.png"))
  ).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          background: "#000000",
          color: "#e8ffee",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          width={340}
          height={340}
          alt=""
          style={{ borderRadius: 76 }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 3,
              color: "#00ff41",
            }}
          >
            ÜCRETSİZ · REKLAMSIZ · ÇEVRİMDIŞI
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Sesu
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.35,
              color: "#7a9988",
              maxWidth: 640,
            }}
          >
            Dil ve konuşma terapisi. Artikülasyon, kekemelik, afazi.
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#4d6657" }}>
            osmancancetlenbik.com/sesu
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
