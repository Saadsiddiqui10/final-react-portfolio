import FadeIn from "../FadeIn";
import { EXPERIENCE } from "../../data";

export default function Experience() {
  return (
    <section
      id="experience"
      style={{ padding: "100px 5vw", background: "rgba(255,255,255,.015)" }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <FadeIn>
          <div style={{
            display:"inline-block", padding:"4px 14px", background:"rgba(249,115,22,.12)",
            border:"1px solid rgba(249,115,22,.3)", borderRadius:99,
            fontSize:12, color:"#f97316", fontWeight:600, letterSpacing:1.2,
            textTransform:"uppercase", marginBottom:20,
          }}>
            Experience
          </div>
          <h2 style={{
            fontSize:"clamp(32px,5vw,52px)", fontWeight:800,
            fontFamily:"'Syne',sans-serif", marginBottom:40,
            background:"linear-gradient(135deg,#f1f5f9,#94a3b8)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>
            My Journey
          </h2>
        </FadeIn>

        <div style={{ position: "relative", paddingLeft: 32 }}>
          {/* Vertical timeline line */}
          <div style={{
            position: "absolute", left: 8, top: 0, bottom: 0,
            width: 2,
            background: "linear-gradient(to bottom,#f97316,rgba(249,115,22,.1))",
          }} />

          {EXPERIENCE.map((e, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{
                position: "relative", marginBottom: 40, paddingBottom: 40,
                borderBottom: i < EXPERIENCE.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
              }}>
                {/* Timeline dot */}
                <div style={{
                  position: "absolute", left: -32 - 6, top: 4,
                  width: 12, height: 12, borderRadius: "50%",
                  background: "#f97316", border: "2px solid #020817",
                  boxShadow: "0 0 0 4px rgba(249,115,22,.2)",
                }} />

                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", flexWrap: "wrap",
                  gap: 8, marginBottom: 8,
                }}>
                  <div>
                    <h3 style={{
                      fontSize: 18, fontWeight: 700, color: "#f1f5f9",
                      fontFamily: "'Syne',sans-serif",
                    }}>
                      {e.role}
                    </h3>
                    <span style={{ color: "#f97316", fontSize: 14, fontWeight: 600 }}>
                      {e.company}
                    </span>
                  </div>
                  <span style={{
                    padding: "4px 12px",
                    background: "rgba(249,115,22,.1)",
                    border: "1px solid rgba(249,115,22,.2)",
                    borderRadius: 99, fontSize: 12, color: "#f97316", whiteSpace: "nowrap",
                  }}>
                    {e.period}
                  </span>
                </div>

                <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: 15 }}>
                  {e.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}