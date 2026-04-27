import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Ultimate Guide: Best Career Options After 12th in India (2024-25)",
  description: "Comprehensive guide to career options after 12th science, commerce, and arts. Find high-salary courses, top colleges, and expert career advice.",
  keywords: ["what to do after 12th", "best career options after 12th", "career options after 12th", "high salary career options after 12th"],
}

export default function CoursesAfter12thPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>
          Beyond the Boards: The Ultimate Guide to Career Options After 12th
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Navigating the transition from school to professional excellence. A panoramic view of the most promising paths across all streams in 2024-25.
        </p>
      </header>

      <section className="glass-panel animate-slide-up" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.2rem' }}>The Junction of Curiosity and Career</h2>
        <p style={{ lineHeight: '1.7', color: 'var(--text-main)' }}>
          Completing 12th grade is more than just passing an exam; it's the first real step towards your professional identity. With the rapidly evolving job market in 2024, traditional paths like Engineering and Medicine are now joined by exciting new-age careers in Data Science, Digital Marketing, and Sustainable Design. This guide provides a panoramic view of the most promising courses across all streams, helping you navigate the transition from school to professional excellence.
        </p>
      </section>

      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '0.8rem' }}>Science</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>B.Tech, MBBS, B.Arch, Forensic Science, Biotechnology, and more.</p>
          <Link href="/courses-after-12th-science" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>Explore Science →</Link>
        </div>
        <div className="glass-panel" style={{ borderLeft: '4px solid #10b981' }}>
          <h3 style={{ color: '#10b981', marginBottom: '0.8rem' }}>Commerce</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>CA, B.Com (Hons), BBA, CS, Actuarial Science, and more.</p>
          <Link href="/courses-after-12th-commerce" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>Explore Commerce →</Link>
        </div>
        <div className="glass-panel" style={{ borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '0.8rem' }}>Arts</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>BA LLB, B.Des, Journalism, Liberal Arts, Psychology, and more.</p>
          <Link href="/courses-after-12th-arts" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>Explore Arts →</Link>
        </div>
      </div>

      <section className="glass-panel animate-slide-up" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Top 8 Courses Comparison</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem' }}>Course</th>
                <th style={{ padding: '1rem' }}>Stream</th>
                <th style={{ padding: '1rem' }}>Duration</th>
                <th style={{ padding: '1rem' }}>Eligibility</th>
                <th style={{ padding: '1rem' }}>Avg Salary (LPA)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "B.Tech (CSE/AI)", stream: "Science", duration: "4 Years", eligibility: "12th PCM", salary: "₹6 - ₹15" },
                { name: "MBBS", stream: "Science", duration: "5.5 Years", eligibility: "12th PCB + NEET", salary: "₹8 - ₹18" },
                { name: "B.Com (Hons)", stream: "Commerce", duration: "3 Years", eligibility: "12th Pass", salary: "₹3.5 - ₹8" },
                { name: "CA", stream: "Commerce", duration: "5 Years", eligibility: "12th + Foundation", salary: "₹8 - ₹15" },
                { name: "BBA", stream: "Any", duration: "3 Years", eligibility: "12th Pass", salary: "₹4 - ₹9" },
                { name: "BA LLB", stream: "Any", duration: "5 Years", eligibility: "12th + CLAT", salary: "₹5 - ₹12" },
                { name: "B.Des", stream: "Any", duration: "4 Years", eligibility: "12th + UCEED", salary: "₹4 - ₹10" },
                { name: "BCA", stream: "Any", duration: "3 Years", eligibility: "12th Pass", salary: "₹3.5 - ₹7" },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{row.name}</td>
                  <td style={{ padding: '1rem' }}>{row.stream}</td>
                  <td style={{ padding: '1rem' }}>{row.duration}</td>
                  <td style={{ padding: '1rem' }}>{row.eligibility}</td>
                  <td style={{ padding: '1rem', color: 'var(--primary)' }}>{row.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-panel animate-slide-up" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.2rem' }}>How to Choose the Right Course</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>1. Self-Assessment</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Evaluate your Aptitude, Interest, and Personality. Match your traits with career paths.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>2. Market Fit</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Research industry growth. Fields like AI and Sustainability are high-growth sectors for 2025.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>3. Eligibility</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Identify entrance requirements early (JEE, NEET, CUET, CLAT) to prepare effectively.</p>
          </div>
        </div>
      </section>

      <section className="glass-panel animate-slide-up">
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { q: "Which stream has the most scope in 2025?", a: "All streams have immense scope from reputed institutions. Science and Commerce lead in high-salary entry roles currently." },
            { q: "Can I change my stream after 12th?", a: "Science students can switch to Commerce or Arts. Arts/Commerce students cannot usually switch to Engineering/Medical paths." },
            { q: "What is CUET and is it mandatory?", a: "CUET (Common University Entrance Test) is now mandatory for most Central Universities in India for undergraduate programs." },
            { q: "How important is the college brand?", a: "Top-tier colleges (IITs, IIMs, NLU, SRCC) offer a massive advantage in networking and initial salary offers." }
          ].map((faq, i) => (
            <details key={i} style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
              <summary style={{ fontWeight: 600, cursor: 'pointer', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{faq.q}</summary>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', paddingLeft: '1rem' }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
