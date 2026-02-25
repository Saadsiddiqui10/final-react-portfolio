import { useState } from "react";
import FadeIn from "../FadeIn";
import SkillBar from "../SkillBar";
import { SKILLS } from "../../data";

const CATEGORIES = ["All", "Frontend", "Backend", "Tools"];

export default function Skills() {
  const [skillCat, setSkillCat] = useState("All");
  const filtered = skillCat === "All" ? SKILLS : SKILLS.filter((s) => s.cat === skillCat);

  return (
    <section
      id="skills"
      style={{ padding: "100px 5vw", background: "rgba(255,255,255,.015)" }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        <FadeIn>
          <div style={{
            display:"inline-block", padding:"4px 14px", background:"rgba(249,115,22,.12)",
            border:"1px solid rgba(249,115,22,.3)", borderRadius:99,
            fontSize:12, color:"#f97316", fontWeight:600, letterSpacing:1.2,
            textTransform:"uppercase", marginBottom:20,
          }}>
            Skills
          </div>
          <h2 style={{
            fontSize:"clamp(32px,5vw,52px)", fontWeight:800,
            fontFamily:"'Syne',sans-serif", marginBottom:12,
            background:"linear-gradient(135deg,#f1f5f9,#94a3b8)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>
            What I Work With
          </h2>
          <p style={{ color:"#475569", marginBottom:40, maxWidth:520, lineHeight:1.7 }}>
            A curated set of tools and technologies I use to bring ideas to life.
          </p>
        </FadeIn>

        {/* Category filter */}
        <FadeIn delay={0.15}>
          <div style={{ display:"flex", gap:10, marginBottom:40, flexWrap:"wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSkillCat(cat)}
                style={{
                  padding:"7px 18px", borderRadius:99, fontSize:13,
                  fontWeight:600, cursor:"pointer", transition:"all .2s",
                  background: skillCat === cat ? "#f97316" : "rgba(255,255,255,.06)",
                  color:      skillCat === cat ? "#fff"     : "#64748b",
                  border:     skillCat === cat ? "none"     : "1px solid rgba(255,255,255,.08)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Skill bars */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(360px,1fr))", gap:"0 48px" }}>
          {filtered.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.07} />
          ))}
        </div>

        {/* Tech pills */}
        <FadeIn delay={0.3}>
          <div style={{ marginTop:60, display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center" }}>
            {["React","TypeScript","Node","MongoDB","Git","Next.js","TailwindCSS"].map((t) => (
              <div
                key={t}
                data-hover
                style={{
                  padding:"8px 20px", background:"rgba(255,255,255,.04)",
                  border:"1px solid rgba(255,255,255,.08)", borderRadius:10,
                  fontSize:13, color:"#64748b", fontWeight:500,
                  transition:"all .2s", cursor:"default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor="#f97316"; e.currentTarget.style.color="#f97316"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,.08)"; e.currentTarget.style.color="#64748b"; }}
              >
                {t}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}