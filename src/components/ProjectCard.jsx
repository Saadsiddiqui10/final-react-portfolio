import { useState } from "react";
import FadeIn from "./FadeIn";

export default function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);

  return (
    <FadeIn delay={i * 0.1}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background:  "rgba(15,23,42,.7)",
          border:      `1px solid ${hov ? p.color : "rgba(255,255,255,.08)"}`,
          borderRadius: 16,
          padding:     "28px 24px",
          transition:  "all .35s ease",
          transform:   hov ? "translateY(-6px)" : "translateY(0)",
          boxShadow:   hov ? `0 20px 40px ${p.color}22` : "none",
          position:    "relative",
          overflow:    "hidden",
          cursor:      "default",
          height:      "100%",
        }}
      >
        {/* Corner glow */}
        <div
          style={{
            position: "absolute", top: 0, right: 0,
            width: 80, height: 80,
            background: `radial-gradient(circle at 100% 0%,${p.color}22,transparent 70%)`,
            borderRadius: "0 16px 0 0",
          }}
        />

        {/* Accent dot */}
        <div
          style={{
            width: 12, height: 12, borderRadius: "50%",
            background: p.color, marginBottom: 16,
            boxShadow: `0 0 12px ${p.color}`,
          }}
        />

        <h3
          style={{
            margin: "0 0 10px", fontSize: 18, fontWeight: 700,
            color: "#f1f5f9", fontFamily: "'Syne',sans-serif",
          }}
        >
          {p.title}
        </h3>

        <p style={{ margin: "0 0 18px", color: "#94a3b8", fontSize: 14, lineHeight: 1.65 }}>
          {p.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                padding: "3px 10px", borderRadius: 99,
                fontSize: 11, fontWeight: 600, letterSpacing: 0.5,
                background: `${p.color}18`, color: p.color,
                border: `1px solid ${p.color}33`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 12 }}>
          {[["↗ Live", p.demo], ["⌥ Code", p.code]].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={(e) => (e.target.style.color = p.color)}
              onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}