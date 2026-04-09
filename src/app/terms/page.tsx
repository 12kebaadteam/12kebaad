export default function TermsPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1.5rem" }}>
      <h1 style={{ color: "var(--primary)", marginBottom: "2rem" }}>Terms & Conditions</h1>
      <div className="glass-panel" style={{ lineHeight: "1.7", color: "var(--text-main)" }}>
        <section style={{ marginBottom: "2rem" }}>
          <h2>1. Acceptance of Terms</h2>
          <p>By accesssing this website, you agree to be bound by these Terms and Conditions. 12kebaad provides guidance based on available data, but choices remain the sole responsibility of the user.</p>
        </section>
        
        <section style={{ marginBottom: "2rem" }}>
          <h2>2. Use of Information</h2>
          <p>The information provided on 12kebaad is for guidance purposes only. We strive for accuracy but do not guarantee it. Users should verify details with the respective educational institutions directly.</p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2>3. Intellectual Property</h2>
          <p>All content on 12kebaad, including text, logos, and data organization, is the property of MyPaperTrail unless otherwise stated. Trademarks used are the property of their respective owners.</p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2>4. User Conduct</h2>
          <p>Users are expected to provide accurate information when using our recommendation tools. Misuse of the platform or attempt to scrape data is strictly prohibited.</p>
        </section>

        <footer style={{ marginTop: "3rem", borderTop: "1px solid var(--glass-border)", paddingTop: "1rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Last updated: April 2026
        </footer>
      </div>
    </div>
  );
}
