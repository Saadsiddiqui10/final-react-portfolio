import Particles from "../Particles";
import useTypewriter from "../../hooks/useTypewriter";

const ROLES = ["Full-Stack Developer", "React Specialist", "UI Enthusiast", "Problem Solver"];

export default function Hero() {
  const typed = useTypewriter(ROLES);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh", position: "relative",
        display: "flex", alignItems: "center",
        padding: "0 5vw", overflow: "hidden",
      }}
    >
      <Particles />

      {/* Glow blobs */}
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,#f9731618,transparent 70%)", top:"10%", right:"10%", pointerEvents:"none", animation:"float 7s ease-in-out infinite" }} />
      <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,#a855f718,transparent 70%)", bottom:"15%", left:"5%", pointerEvents:"none", animation:"float 9s ease-in-out infinite reverse" }} />

      <div style={{ maxWidth: 720, position: "relative", zIndex: 1 }}>

        {/* Badge */}
        <div style={{
          display:"inline-block", padding:"4px 14px", borderRadius:99,
          fontSize:12, fontWeight:600, color:"#f97316", letterSpacing:1.2,
          textTransform:"uppercase", marginBottom:20,
          border:"1px solid rgba(249,115,22,.3)",
          background:"linear-gradient(90deg,rgba(249,115,22,.08) 25%,rgba(249,115,22,.22) 50%,rgba(249,115,22,.08) 75%)",
          backgroundSize:"200% auto",
          animation:"shimmer 3s linear infinite",
        }}>
          👋 Available for opportunities
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: "clamp(42px,7vw,82px)", fontWeight: 800,
          fontFamily: "'Syne',sans-serif", lineHeight: 1.05, marginBottom: 16,
        }}>
          Hi, I'm{" "}
          <span style={{
            background: "linear-gradient(135deg,#f97316,#fb923c,#fbbf24)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Saad
          </span>
        </h1>

        {/* Typewriter */}
        <div style={{
          fontSize: "clamp(20px,3vw,30px)", fontWeight: 600,
          marginBottom: 24, height: 40, fontFamily: "'Syne',sans-serif",
        }}>
          <span style={{ color: "#94a3b8" }}>{typed}</span>
          <span style={{ color: "#f97316", animation: "blink 1s step-end infinite" }}>|</span>
        </div>

        {/* Bio */}
        <p style={{ fontSize: 17, color: "#64748b", lineHeight: 1.8, marginBottom: 40, maxWidth: 560 }}>
          I build fast, beautiful, and accessible web experiences. Passionate about React, clean architecture, and pixel-perfect UIs. Currently looking for my next adventure.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button
            onClick={() => scrollTo("projects")}
            style={{
              padding: "13px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "'Syne',sans-serif",
              background: "linear-gradient(135deg,#f97316,#ea580c)",
              color: "#fff", border: "none", letterSpacing: 0.3, transition: "all .25s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 30px #f9731655"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            View Projects ↓
          </button>

          <button
            onClick={() => scrollTo("contact")}
            style={{
              padding: "13px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "'Syne',sans-serif",
              background: "transparent", color: "#f97316",
              border: "1.5px solid #f97316", letterSpacing: 0.3, transition: "all .25s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f97316"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f97316"; }}
          >
            Contact Me
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: 40, marginTop: 56, paddingTop: 40,
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}>
          {[["2+", "Years Coding"], ["10+", "Projects Built"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#f97316", fontFamily: "'Syne',sans-serif" }}>{n}</div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4,
      }}>
        <span style={{ fontSize: 11, letterSpacing: 2, color: "#64748b" }}>SCROLL</span>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom,#f97316,transparent)" }} />
      </div>
    </section>
  );
}