import "./styles/globals.css";

import Cursor     from "./components/Cursor";
import Navbar     from "./components/Navbar";
import Hero       from "./components/sections/Hero";
import Skills     from "./components/sections/Skills";
import Projects   from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Contact    from "./components/sections/Contact";

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer style={{
        textAlign: "center", padding: "28px 5vw",
        borderTop: "1px solid rgba(255,255,255,.06)",
        color: "#334155", fontSize: 13,
      }}>
        Designed & Built by{" "}
        <span style={{ color: "#f97316", fontWeight: 700 }}>Saad Siddiqui</span>
        {" "}· {new Date().getFullYear()}
      </footer>
    </>
  );
}