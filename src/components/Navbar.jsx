import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data";
import useScrollSpy from "../hooks/useScrollSpy";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const active = useScrollSpy(NAV_LINKS);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrolled = scrollY > 60;

  return (
    <nav
      style={{
        position:       "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding:        "0 5vw",
        height:         68,
        display:        "flex", alignItems: "center", justifyContent: "space-between",
        background:     scrolled ? "rgba(2,8,23,.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom:   scrolled ? "1px solid rgba(255,255,255,.07)" : "none",
        transition:     "all .4s ease",
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontSize: 22, fontWeight: 800, color: "#f97316",
          fontFamily: "'Syne',sans-serif", letterSpacing: -1, cursor: "pointer",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        SS.
      </span>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {NAV_LINKS.map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "6px 14px", fontSize: 14, fontWeight: 500,
              borderRadius: 8, textTransform: "capitalize",
              color:      active === id ? "#f97316" : "#94a3b8",
              transition: "color .2s",
            }}
          >
            {id}
          </button>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <a
          href="https://github.com/Saadsiddiqui10"
          target="_blank"
          rel="noreferrer"
          className="hover-orange"
          style={{ color: "#64748b", textDecoration: "none", fontSize: 20 }}
        >
          ⌥
        </a>
        <button
          onClick={() => scrollTo("contact")}
          style={{
            padding: "9px 20px", borderRadius: 12, fontSize: 13,
            fontWeight: 700, cursor: "pointer",
            background: "linear-gradient(135deg,#f97316,#ea580c)",
            color: "#fff", border: "none",
            fontFamily: "'Syne',sans-serif",
            transition: "all .25s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px #f9731655"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
        >
          Hire Me
        </button>
      </div>
    </nav>
  );
}