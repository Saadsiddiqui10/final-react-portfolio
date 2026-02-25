import { useRef, useEffect } from "react";

export default function Particles() {
  const canvas = useRef(null);

  useEffect(() => {
    const c   = canvas.current;
    const ctx = c.getContext("2d");
    let W = (c.width  = window.innerWidth);
    let H = (c.height = window.innerHeight);

    const pts = Array.from({ length: 80 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 1.5 + 0.5,
    }));

    let mouse = { x: -999, y: -999 };
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onResize    = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize",    onResize);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Mouse repel
        const dx   = p.x - mouse.x;
        const dy   = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) { p.vx += (dx / dist) * 0.02; p.vy += (dy / dist) * 0.02; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(249,115,22,.45)";
        ctx.fill();
      });

      // Draw connecting lines
      pts.forEach((a, i) =>
        pts.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(249,115,22,${0.15 * (1 - d / 120)})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        })
      );

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize",    onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  );
}