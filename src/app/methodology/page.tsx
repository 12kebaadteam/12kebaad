import { CheckCircle2, UserPlus, PhoneIncoming, Mail } from "lucide-react";

export default function MethodologyPage() {
  return (
    <main className="main-content" style={{ maxWidth: '900px', margin: '0 auto', padding: '6rem 1.5rem' }}>
      <section style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Our Decision Methodology</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          How 12kebaad transforms thousands of data points into a single career path.
        </p>
      </section>

      <div className="glass-panel" style={{ padding: '4rem', marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>How Lead Generation Works</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
          When you find a career or college that fits you, we don't just leave you with a link. Our lead generation feature bridge the gap between "interest" and "admission".
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <UserPlus size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ marginBottom: '0.5rem' }}>1. Expression of Interest</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>You click "Talk to Mentor" or "Apply" on a specific college card.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <CheckCircle2 size={40} color="var(--accent)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ marginBottom: '0.5rem' }}>2. Smart Matching</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Our engine verifies your marks & budget against the college criteria.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <PhoneIncoming size={40} color="#10b981" style={{ marginBottom: '1rem' }} />
            <h4 style={{ marginBottom: '0.5rem' }}>3. Direct Connectivity</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Your profile is shared with the institution's verified representative for a direct call.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
