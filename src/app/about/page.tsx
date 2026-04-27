export default function AboutPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h1 className="animate-slide-up" style={{ color: "var(--primary)", marginBottom: "1rem" }}>About 12kebaad</h1>
      <div className="glass-panel animate-slide-up delay-1">
        <h2 style={{ marginBottom: "1rem" }}>Our Mission</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1rem", lineHeight: "1.8" }}>
          <strong>12kebaad</strong> is a professional guidance platform, a proud <span style={{ color: "var(--accent)", fontWeight: "bold" }}>Product of MyPaperTrail</span>.
        </p>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: "1.8" }}>
          We were created with a single vision: to help guide students who have completed their 12th grade to choose the optimal career path. The abundance of choices can often be overwhelming, and we aim to simplify the process using factual, direct, and well-organized data regarding careers and institutions. We believe a better informed student makes better career decisions.
        </p>

        <h2 style={{ marginBottom: "1rem", color: "var(--accent)" }}>The Founders</h2>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <div style={{ flex: "1", minWidth: "200px", background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--glass-border)" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Jaskirat Singh</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Co-Founder & Developer</p>
          </div>
          <div style={{ flex: "1", minWidth: "200px", background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--glass-border)" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Pushkar Verma</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Co-Founder & Visionary</p>
          </div>
        </div>

        <h2 style={{ marginBottom: "1rem", color: "var(--primary)" }}>Contact & Feedback</h2>
        <p style={{ color: "var(--text-muted)" }}>
          We are constantly improving 12kebaad. If you have any feedback or want to suggest new colleges or career paths, please reach out to us:
        </p>
        <a href="mailto:12kebaad.team@gmail.com" className="btn-primary" style={{ marginTop: "1rem", display: "inline-block" }}>
          Email Feedback (12kebaad.team@gmail.com)
        </a>
      </div>
    </div>
  )
}
