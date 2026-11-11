import { ImageResponse } from "next/og";
import { personal, stats } from "@/data/portfolio";
import { loadOgFonts } from "@/lib/ogFonts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${personal.name} - ${personal.title}`;

export default async function OpengraphImage() {
  const [firstName, lastName] = personal.name.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#F9F8F5",
          fontFamily: "DM Sans",
          color: "#18181B",
          position: "relative",
        }}
      >
        {/* Soft accent glow, top right */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(200,212,154,0.55) 0%, rgba(242,245,232,0.5) 45%, rgba(249,248,245,0) 70%)",
          }}
        />

        {/* Header row: monogram + location */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 800,
              fontSize: 30,
              letterSpacing: "-0.03em",
            }}
          >
            N<span style={{ color: "#6B7C2E" }}>.</span>R
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "JetBrains Mono",
              fontSize: 18,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#3A4A15",
              background: "#F2F5E8",
              border: "1px solid #6B7C2E",
              borderRadius: 9999,
              padding: "8px 20px",
            }}
          >
            {personal.location}
          </div>
        </div>

        {/* Name + title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 800,
              fontSize: 96,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
            }}
          >
            <span>{firstName}</span>
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #3A4A15, #6B7C2E)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {lastName}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 32,
              fontWeight: 500,
              color: "#4A5A1E",
            }}
          >
            {personal.title} · {personal.tagline}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Plus Jakarta Sans",
                    fontWeight: 800,
                    fontSize: 56,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "#3A4A15",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 10,
                    fontFamily: "JetBrains Mono",
                    fontSize: 16,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#52525B",
                  }}
                >
                  {stat.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div style={{ width: 1, height: 56, background: "#D4D4D8", margin: "0 48px" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: await loadOgFonts() }
  );
}
