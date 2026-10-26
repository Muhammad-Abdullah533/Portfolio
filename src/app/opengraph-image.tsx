import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#09090b",
        color: "#fafafa",
        padding: "72px",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -140,
          left: -100,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "#6366f1",
          opacity: 0.35,
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -180,
          right: -120,
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: "#22d3ee",
          opacity: 0.22,
          filter: "blur(40px)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#6366f1",
            color: "#ffffff",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          MA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 22, color: "#a1a1aa" }}>{site.role}</span>
          <span style={{ fontSize: 22, color: "#a1a1aa" }}>{site.location}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-0.03em" }}>{site.name}</div>
        <div style={{ fontSize: 30, color: "#a1a1aa", maxWidth: 900, lineHeight: 1.4 }}>
          {site.tagline}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, fontSize: 22, color: "#a5b4fc" }}>
        <span>Java</span>
        <span>·</span>
        <span>C</span>
        <span>·</span>
        <span>Next.js</span>
        <span>·</span>
        <span>KhataFlow</span>
      </div>
    </div>,
    size,
  );
}
