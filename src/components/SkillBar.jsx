import { useRef, useState, useEffect } from "react";

export default function SkillBar({ name, level, delay = 0 }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setW(level), delay * 1000);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level, delay]);

  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex", justifyContent: "space-between",
          marginBottom: 6, fontSize: 13, color: "#cbd5e1",
        }}
      >
        <span>{name}</span>
        <span style={{ color: "#f97316" }}>{level}%</span>
      </div>

      <div
        style={{
          height: 6, background: "rgba(255,255,255,.08)",
          borderRadius: 99, overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%", width: `${w}%`,
            background: "linear-gradient(90deg,#f97316,#fb923c)",
            borderRadius: 99,
            transition: "width 1.2s cubic-bezier(.22,1,.36,1)",
          }}
        />
      </div>
    </div>
  );
}