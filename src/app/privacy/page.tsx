export default function PrivacyPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1.5rem" }}>
      <h1 style={{ color: "var(--accent)", marginBottom: "2rem" }}>Privacy Policy</h1>
      <div className="glass-panel" style={{ lineHeight: "1.7", color: "var(--text-main)" }}>
        
        <div style={{ background: "rgba(var(--primary-rgb), 0.1)", padding: "1.5rem", borderRadius: "1rem", marginBottom: "2rem", border: "1px solid var(--primary)" }}>
          <h2 style={{ color: "var(--primary)", marginTop: 0 }}>Ethical Data Usage: Why we use your info</h2>
          <p>
            At 12kebaad, we collect a minimal amount of information (Name, Email, Phone, Stream, and City/State) for one primary reason: 
            <strong> Personalization.</strong>
          </p>
          <p>
            Educational paths are highly dependent on your current stream and geographic location. We use your data to:
            <ul style={{ marginTop: "0.5rem" }}>
              <li>Filter colleges and courses that are relevant to your 12th-grade stream.</li>
              <li>Provide location-aware guidance for colleges in your home state or city.</li>
              <li>Keep you updated on entrance test deadlines relevant to your interests.</li>
            </ul>
          </p>
          <p style={{ fontWeight: "bold" }}>We do NOT sell your data to third parties. Your information is used strictly to power your guidance dashboard.</p>
        </div>

        <section style={{ marginBottom: "2rem" }}>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us through forms, such as your contact details and academic background.</p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2>2. Cookies</h2>
          <p>We use session cookies to remember your state and stream preferences so you don't have to re-select them every time you visit a 새로운 page.</p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2>3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your information. Our platform is protected by SSL encryption and secure authentication systems.</p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2>4. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. If you wish to do so, please contact us at support@mypapertrail.com.</p>
        </section>

        <footer style={{ marginTop: "3rem", borderTop: "1px solid var(--glass-border)", paddingTop: "1rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Last updated: April 2026
        </footer>
      </div>
    </div>
  );
}
