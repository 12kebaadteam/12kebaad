import Link from "next/link";

export default function Footer() {
  return (
    <footer className="glass-panel" style={{ marginTop: "4rem", borderRadius: "1.5rem 1.5rem 0 0", padding: "3rem 2rem", borderBottom: "none" }}>
      <div className="grid-cards" style={{ gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
            <img src="/logo.png" alt="12kebaad Logo" style={{ height: '36px', borderRadius: '6px' }} />
            <h3 style={{ color: "var(--primary)", margin: 0 }}>12kebaad</h3>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>
            The definitive career guidance platform for students. Helping you make informed choices for a brighter future.
          </p>
          <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} MyPaperTrail. All rights reserved.
          </p>
          <small style={{ color: "var(--accent)" }}>Product of MyPaperTrail</small>
        </div>

        {/* Shortcuts Column */}
        <div>
          <h4 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Shortcuts</h4>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <li><Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Home</Link></li>
            <li><Link href="/colleges" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Colleges</Link></li>
            <li><Link href="/courses" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Courses</Link></li>
            <li><Link href="/entrance-tests" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Entrance Tests</Link></li>
            <li><Link href="/professional-courses" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Professional Courses</Link></li>
          </ul>
        </div>

        {/* Career Guides Column */}
        <div>
          <h4 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Career Guides</h4>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <li><Link href="/courses-after-12th" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Courses After 12th</Link></li>
            <li><Link href="/courses-after-12th-science" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Science Careers</Link></li>
            <li><Link href="/courses-after-12th-commerce" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Commerce Careers</Link></li>
            <li><Link href="/courses-after-12th-arts" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Arts Careers</Link></li>
            <li><Link href="/high-salary-courses-after-12th" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>High Salary Paths</Link></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Legal</h4>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <li><Link href="/terms" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Terms & Conditions</Link></li>
            <li><Link href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</Link></li>
            <li><Link href="/about" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>About Us</Link></li>
            <li><Link href="/admin" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.75rem", opacity: 0.5 }}>Admin Dashboard</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
