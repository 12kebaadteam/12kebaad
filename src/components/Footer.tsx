import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ 
      background: 'var(--bg-offset)', 
      borderTop: '1px solid var(--border)',
      padding: '3rem 1rem 2rem 1rem'
    }}>
      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
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
                <li><Link href="/colleges" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Colleges</Link></li>
                <li><Link href="/entrance-tests" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Exams</Link></li>
                <li><Link href="/compare-careers" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Compare Careers</Link></li>
                <li><Link href="/bookmarks" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>My Bookmarks</Link></li>
                <li><Link href="/parents" style={{ color: "var(--accent)", textDecoration: "none", fontSize: "0.95rem", fontWeight: "600" }}>For Parents</Link></li>
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
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
             <a href="https://www.instagram.com/12kebaad?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex' }} aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
             </a>
             <a href="https://youtube.com/@12kebaad?si=Zzkp_Ouvw7YKN6q0" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex' }} aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
