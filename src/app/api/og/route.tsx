import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || profile.name).slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") || profile.title).slice(0, 80);
  const accent = "#60a5fa";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0e1a",
          color: "#f1f5f9",
          fontFamily: "system-ui, sans-serif",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Accent stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: accent,
          }}
        />

        {/* Soft glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(96,165,250,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: accent,
            fontSize: 22,
            textTransform: "uppercase",
            letterSpacing: 4,
            fontFamily: "monospace",
          }}
        >
          <div style={{ width: 40, height: 2, background: accent }} />
          {eyebrow}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? 64 : 84,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: -2,
            marginTop: 24,
            maxWidth: 1040,
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            color: "#94a3b8",
            fontSize: 24,
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex" }}>osmancancetlenbik.com</div>
          <div style={{ display: "flex" }}>{profile.location}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
