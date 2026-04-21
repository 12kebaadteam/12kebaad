import Link from "next/link";

export default function Footer() {
  return (
    <footer className="glass-panel" style={{ marginTop: "4rem", borderRadius: "1.5rem 1.5rem 0 0", padding: "3rem 2rem", borderBottom: "none" }}>
      <div className="grid-cards" style={{ gap: "3rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
            <img src="/logo.png" alt="12kebaad Logo" style={{ height: '36px', borderRadius: '6px' }} />
            <h3 style={{ color: "var(--primary)", margin: 0 }}>12kebaad</h3>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>
            The definitively smarter way to navigate your career after Class 12. Decision-first guidance for a brighter future.
          </p>
          <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} MyPaperTrail. All rights reserved.
          </p>
          <small style={{ color: "var(--accent)" }}>Product of MyPaperTrail</small>
        </div>

        {/* Shortcuts Column */}
        <div>
          <h4 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Platform</h4>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <li><Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Home</Link></li>
            <li><Link href="/predictor" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Career Predictor</Link></li>
            <li><Link href="/results" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>My Recommendations</Link></li>
            <li><Link href="/questions" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Community Q&A</Link></li>
          </ul>
        </div>

        {/* Guides Column */}
        <div>
          <h4 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Resources</h4>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <li><Link href="/courses-after-12th" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Stream Guides</Link></li>
            <li><Link href="/about" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Our Methodology</Link></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Legal & Admin</h4>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <li><Link href="/terms" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Terms & Conditions</Link></li>
            <li><Link href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</Link></li>
            <li><Link href="/admin" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.75rem", opacity: 0.5 }}>Admin Dashboard</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
