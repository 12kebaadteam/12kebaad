export default function PrivacyPage() {
  return (
    <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Privacy Policy</h1>
      <div className="glass-panel" style={{ padding: '3rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>
        <p>This Privacy Policy explains how Mypapertrail collects, uses, and protects user information on 12kebaad.in.</p>

        <h3 style={{ color: '#fff', marginTop: '2rem' }}>1. INFORMATION WE COLLECT</h3>
        <ul>
          <li>Personal: Name, email, phone number</li>
          <li>Academic: Stream, marks, preferences</li>
          <li>Usage: Pages visited, interactions</li>
        </ul>

        <h3 style={{ color: '#fff', marginTop: '2rem' }}>2. HOW WE USE DATA</h3>
        <p>We use your data to provide personalized recommendations, improve platform experience, and send relevant updates.</p>

        <h3 style={{ color: '#fff', marginTop: '2rem' }}>3. DATA SHARING</h3>
        <p>Mypapertrail may share data with educational institutions (for lead generation) and service providers. We do not sell personal data.</p>

        <h3 style={{ color: '#fff', marginTop: '2rem' }}>7. USER RIGHTS</h3>
        <p>Users may request access, correction, or deletion of their data at any time.</p>

        <h3 style={{ color: '#fff', marginTop: '2rem' }}>12. CONTACT</h3>
        <p>Email: <a href="mailto:support@12kebaad.in" style={{ color: 'var(--primary)' }}>support@12kebaad.in</a><br />
        Operated by: Mypapertrail</p>
      </div>
    </main>
  );
}
