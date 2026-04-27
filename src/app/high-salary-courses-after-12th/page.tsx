import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Top 10 High Salary Career Options After 12th in India (2024) | High ROI Guide",
  description: "Identify the most lucrative career paths after 12th. From Aviation and IITs to IPM and Investment Banking. Find courses that offer the best Return on Investment.",
  keywords: ["high salary career options after 12th", "highest paying jobs in india after 12th", "roi career options after 12th", "commercial pilot salary india"],
}

export default function HighSalaryCoursesPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, #ef4444, #f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>
          The Crore Club: Top 10 High-Salary Career Options After 12th
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto' }}>
          Success is often measured by both impact and income. Discover the premium paths with the highest Return on Investment (ROI) in modern India.
        </p>
      </header>

      <section className="glass-panel animate-slide-up" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#ef4444', marginBottom: '1.2rem' }}>Investing in Your Future</h2>
        <p style={{ lineHeight: '1.7', color: 'var(--text-main)' }}>
          In the competitive Indian job market of 2024, certain career paths offer significantly higher starting salaries and faster growth trajectories. Whether it's the booming tech sector, global finance, or the elite aviation industry, this guide identifies the premium courses that promise a life of financial freedom.
        </p>
      </section>

      <section className="glass-panel animate-slide-up" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>The ROI Leaderboard (Top 10)</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem' }}>Rank</th>
                <th style={{ padding: '1rem' }}>Course</th>
                <th style={{ padding: '1rem' }}>Entrance Exam</th>
                <th style={{ padding: '1rem' }}>Avg. Start (LPA)</th>
                <th style={{ padding: '1rem' }}>Top Ceiling (LPA)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { r: 1, name: "Commercial Pilot", entrance: "CPL Ground", start: "₹15 - ₹25", top: "₹50+" },
                { r: 2, name: "B.Tech CSE (IIT/NIT)", entrance: "JEE Advanced", start: "₹12 - ₹22", top: "₹1 Cr+" },
                { r: 3, name: "IPM (IIM Integrated)", entrance: "IPMAT", start: "₹12 - ₹20", top: "₹45+" },
                { r: 4, name: "Chartered Accountancy", entrance: "Foundation", start: "₹8 - ₹18", top: "₹35+" },
                { r: 5, name: "MBBS", entrance: "NEET", start: "₹9 - ₹15", top: "₹40+" },
                { r: 6, name: "Corporate Law (NLUs)", entrance: "CLAT", start: "₹10 - ₹18", top: "₹30+" },
                { r: 7, name: "Merchant Navy", entrance: "IMU CET", start: "₹8 - ₹15", top: "₹25+ (Tax-Free)" },
                { r: 8, name: "Actuarial Science", entrance: "ACET", start: "₹9 - ₹16", top: "₹35+" },
                { r: 9, name: "BMS (SSCBS DU)", entrance: "CUET", start: "₹7 - ₹14", top: "₹25+" },
                { r: 10, name: "B.Des (NID/IIT)", entrance: "UCEED / NID", start: "₹6 - ₹12", top: "₹20+" },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)', background: i % 2 === 0 ? 'rgba(239,68,68,0.03)' : 'transparent' }}>
                  <td style={{ padding: '1rem' }}>#{row.r}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{row.name}</td>
                  <td style={{ padding: '1rem' }}>{row.entrance}</td>
                  <td style={{ padding: '1rem', color: 'var(--primary)' }}>{row.start}</td>
                  <td style={{ padding: '1rem', color: 'var(--accent)' }}>{row.top}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-panel animate-slide-up" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.2rem' }}>How to Target High-Salary Roles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>1. Risk Appetite</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>CPL or Private MBBS require high initial capital. Ensure clear loan repayment plans.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>2. Brand Tier</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>In India, Tier-1 status (IIT, IIM, NLU, SRCC) is directly correlated with top-bracket starting offers.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>3. Future Scalability</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>AI, Wealth Management, and Renewable Tech are future-proof sectors with massive growth potential.</p>
          </div>
        </div>
      </section>

      <section className="glass-panel animate-slide-up">
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Wealth & Career FAQs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { q: "Which course gives the highest starting salary in India?", a: "Currently, B.Tech graduates from top IITs and IPM graduates from top IIMs see the highest domestic and international offers." },
            { q: "Can a Commerce student earn as much as an Engineer?", a: "Absolutely. Top CAs, Investment Bankers (via BBA/BMS), and Actuaries often outearn average engineers." },
            { q: "Are there high-salary options in the Arts stream?", a: "Yes. Corporate Law, Management Consulting (via IPM), and UI/UX Design are top-paying paths for Arts students." },
            { q: "How does the Merchant Navy salary work?", a: "Officers earn tax-free income while at sea (NRI status). Salaries are high, and expenses on ship are nil." }
          ].map((faq, i) => (
            <details key={i} style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
              <summary style={{ fontWeight: 600, cursor: 'pointer', marginBottom: '0.5rem' }}>{faq.q}</summary>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', paddingLeft: '1rem' }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
