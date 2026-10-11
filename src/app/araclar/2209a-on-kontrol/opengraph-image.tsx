import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = "2209-A Ön Kontrol · 12/18 kural tamam · son başvuru 11 Kasım 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const C = { hero: "#000000", line: "#0f3d1c", ink: "#e8ffee", muted: "#7a9988", accent: "#00ff41", ok: "#00ff41", bad: "#ff6b5e", warn: "#ffb547" };
const METER = ["ok", "ok", "ok", "ok", "ok", "ok", "bad", "bad", "ok", "warn", "ok", "ok", "ok", "ok", "warn", "warn", "warn", "ok"] as const;

export default async function OgImage() {
  const photo = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/profile.png"))).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: C.hero, color: C.ink, padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#00ff41" fillOpacity="0.14" stroke="#00ff41" strokeWidth="2" />
            <rect x="12" y="15" width="22" height="7" rx="3.5" fill="#ffffff" />
            <rect x="22" y="27" width="22" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.72" />
            <path d="M33 45 l5.5 5.5 L52 37" fill="none" stroke="#00ff41" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 26, color: C.accent, letterSpacing: 2 }}>TÜBİTAK 2209-A · 2026 ÇAĞRISI · ÜCRETSİZ</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 600 }}>
            <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>2209-A Ön Kontrol</div>
            <div style={{ display: "flex", fontSize: 30, color: C.muted, lineHeight: 1.3 }}>Katkı toplamı, 12 ay sınırı, iş adımları, atıf ve DOI. Metin tarayıcıdan çıkmaz.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 420, padding: 28, borderRadius: 20, border: `2px solid ${C.line}`, background: "#050f08" }}>
            <div style={{ display: "flex", fontSize: 22, color: C.muted }}>Kontrol listesi</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <div style={{ display: "flex", fontSize: 72, fontWeight: 800 }}>12/18</div>
              <div style={{ display: "flex", fontSize: 24, color: C.muted, whiteSpace: "nowrap" }}>kural tamam</div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {METER.map((m, i) => <div key={i} style={{ display: "flex", flex: 1, height: 12, borderRadius: 3, background: C[m] }} />)}
            </div>
            <div style={{ display: "flex", fontSize: 22, color: C.muted }}>Son başvuru: 11 Kasım 2026, 17.30</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, borderTop: `2px solid ${C.line}`, paddingTop: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} width={56} height={56} alt="" style={{ borderRadius: 28, border: `3px solid ${C.accent}` }} />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>Öğr. Gör. {profile.name}</div>
          <div style={{ display: "flex", fontSize: 26, color: C.muted }}>· osmancancetlenbik.com/2209</div>
        </div>
      </div>
    ),
    size,
  );
}
