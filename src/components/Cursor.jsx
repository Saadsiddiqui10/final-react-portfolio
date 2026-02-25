import { useRef, useState, useEffect } from "react";

export default function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const move = (e) => {
      if (dot.current)  { dot.current.style.left  = e.clientX + "px"; dot.current.style.top  = e.clientY + "px"; }
      if (ring.current) { ring.current.style.left = e.clientX + "px"; ring.current.style.top = e.clientY + "px"; }
    };
    const over = (e) => { if (e.target.closest("a,button,[data-hover]")) setHov(true); };
    const out  = () => setHov(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout",  out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout",  out);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed", pointerEvents: "none", zIndex: 9999,
          borderRadius: "50%", background: "#f97316",
          transform: "translate(-50%,-50%)",
          transition: "width .2s, height .2s",
          width:  hov ? 20 : 8,
          height: hov ? 20 : 8,
        }}
      />
      <div
        ref={ring}
        style={{
          position: "fixed", pointerEvents: "none", zIndex: 9998,
          width: 36, height: 36,
          border: "1.5px solid #f97316", borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          transition: "all .15s cubic-bezier(.25,.46,.45,.94)",
          opacity: 0.6,
          scale: hov ? "1.4" : "1",
        }}
      />
    </>
  );
}