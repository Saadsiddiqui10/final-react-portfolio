import emailjs from '@emailjs/browser';
import FadeIn from "../FadeIn";

const SOCIALS = [
  ["GitHub",   "https://github.com/Saadsiddiqui10"],
  ["LinkedIn", "https://www.linkedin.com/in/saad-siddiqui-97442a23a/"],
  ["Email",    "mailto:saadsiddiqui2002@outlook.com"],
];

export default function Contact() {
const handleSubmit = (e) => {
  e.preventDefault();
  emailjs.sendForm(
    'service_7pm0f9c',
    'template_kutgskb', 
    e.target,
    'g6HPY60Y_vug4sam_'
  )
  .then(() => {
    alert("Message sent successfully! I'll get back to you soon.");
    e.target.reset();
  })
  .catch(() => {
    alert("Something went wrong. Please email me directly at saadsiddiqui2002@outlook.com");
  });
};

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: 10, color: "#e2e8f0", fontSize: 15, outline: "none",
    transition: "border .2s", fontFamily: "'DM Sans',sans-serif",
  };

  return (
    <section id="contact" style={{ padding: "100px 5vw" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>

        <FadeIn>
          <div style={{
            display:"inline-block", padding:"4px 14px", background:"rgba(249,115,22,.12)",
            border:"1px solid rgba(249,115,22,.3)", borderRadius:99,
            fontSize:12, color:"#f97316", fontWeight:600, letterSpacing:1.2,
            textTransform:"uppercase", marginBottom:20,
          }}>
            Contact
          </div>
          <h2 style={{
            fontSize:"clamp(32px,5vw,52px)", fontWeight:800,
            fontFamily:"'Syne',sans-serif", marginBottom:12,
            background:"linear-gradient(135deg,#f1f5f9,#94a3b8)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>
            Let's Build Something
          </h2>
          <p style={{ color:"#475569", lineHeight:1.8, marginBottom:48, fontSize:16 }}>
            Whether you have a project in mind, a job opportunity, or just want to say hi — my inbox is always open.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:16, textAlign:"left" }}>

            {[["Name","text","Your name"], ["Email","email","your@email.com"]].map(([label, type, ph]) => (
              <div key={label}>
                <label style={{ fontSize:13, color:"#64748b", marginBottom:6, display:"block", fontWeight:500 }}>
                  {label}
                </label>
                <input
                  type={type}
                  name={label.toLowerCase()}
                  placeholder={ph}
                  required
                  style={inputStyle}
                  onFocus={(e)  => (e.target.style.borderColor = "#f97316")}
                  onBlur={(e)   => (e.target.style.borderColor = "rgba(255,255,255,.1)")}
                />
              </div>
            ))}

            <div>
              <label style={{ fontSize:13, color:"#64748b", marginBottom:6, display:"block", fontWeight:500 }}>
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                required
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e)  => (e.target.style.borderColor = "#f97316")}
                onBlur={(e)   => (e.target.style.borderColor = "rgba(255,255,255,.1)")}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: 8, padding: "13px 28px", borderRadius: 12,
                fontSize: 15, fontWeight: 700, cursor: "pointer",
                fontFamily: "'Syne',sans-serif",
                background: "linear-gradient(135deg,#f97316,#ea580c)",
                color: "#fff", border: "none", letterSpacing: 0.3,
                transition: "all .25s ease", textAlign: "center",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px #f9731655"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              Send Message →
            </button>
          </form>
        </FadeIn>

        {/* Socials */}
        <FadeIn delay={0.3}>
          <div style={{ display:"flex", justifyContent:"center", gap:20, marginTop:48 }}>
            {SOCIALS.map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="hover-orange"
                style={{ color:"#475569", textDecoration:"none", fontSize:13, fontWeight:600, transition:"color .2s" }}
              >
                {name}
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}