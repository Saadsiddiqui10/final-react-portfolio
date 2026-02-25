import FadeIn from "../FadeIn";
import ProjectCard from "../ProjectCard";
import { PROJECTS } from "../../data";

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <FadeIn>
          <div style={{
            display:"inline-block", padding:"4px 14px", background:"rgba(249,115,22,.12)",
            border:"1px solid rgba(249,115,22,.3)", borderRadius:99,
            fontSize:12, color:"#f97316", fontWeight:600, letterSpacing:1.2,
            textTransform:"uppercase", marginBottom:20,
          }}>
            Projects
          </div>
          <h2 style={{
            fontSize:"clamp(32px,5vw,52px)", fontWeight:800,
            fontFamily:"'Syne',sans-serif", marginBottom:12,
            background:"linear-gradient(135deg,#f1f5f9,#94a3b8)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>
            Things I've Built
          </h2>
          <p style={{ color:"#475569", marginBottom:48, maxWidth:520, lineHeight:1.7 }}>
            A selection of projects that showcase my skills across different domains.
          </p>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: 24,
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div style={{ textAlign:"center", marginTop:48 }}>
            <a href="https://github.com/Saadsiddiqui10" target="_blank" rel="noreferrer">
              <button
                style={{
                  padding:"13px 28px", borderRadius:12, fontSize:14, fontWeight:700,
                  cursor:"pointer", fontFamily:"'Syne',sans-serif",
                  background:"transparent", color:"#f97316",
                  border:"1.5px solid #f97316", letterSpacing:0.3, transition:"all .25s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background="#f97316"; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#f97316"; }}
              >
                See All on GitHub ↗
              </button>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}