import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ 
      background: 'var(--bg-offset)', 
      borderTop: '1px solid var(--border)',
      padding: '5rem 5% 3rem 5%'
    }}>
      <div style={{ maxWidth: '100%', width: '100%' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Brand Column */}
          <div style={{ flex: '1', minWidth: '250px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <img src="/logo.png" alt="12kebaad Logo" style={{ height: '36px', borderRadius: '6px' }} />
              <h3 style={{ color: "var(--primary)", margin: 0, fontWeight: '800', fontSize: '1.5rem' }}>12kebaad</h3>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6", maxWidth: '300px' }}>
              The definitively smarter way to navigate your career after Class 12. Decision-first guidance for a brighter future.
            </p>
          </div>

          {/* Links Columns */}
          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ color: "var(--primary)", marginBottom: "1.5rem", fontWeight: '700' }}>Platform</h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <li><Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.95rem" }}>Home</Link></li>
                <li><Link href="/quiz-intro" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.95rem" }}>Career Quiz</Link></li>
                <li><Link href="/careers" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.95rem" }}>Browse Careers</Link></li>
                <li><Link href="/about" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.95rem" }}>About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: "var(--primary)", marginBottom: "1.5rem", fontWeight: '700' }}>Legal</h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <li><Link href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.95rem" }}>Privacy Policy</Link></li>
                <li><Link href="/terms" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.95rem" }}>Terms & Conditions</Link></li>
                <li><Link href="/admin" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.8rem", opacity: 0.5 }}>Admin Dashboard</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid var(--border)', 
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            © 2026 <span style={{ fontWeight: '600', color: 'var(--primary)' }}>MyPaperTrail</span>. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
             {/* Social icons can go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
