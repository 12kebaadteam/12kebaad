import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Professional Career Options After 12th Commerce 2024-25 | CA, MBA, Fintech",
  description: "Master the markets with the best career options after 12th commerce in India. Detailed guide on CA, BBA, B.Com Hons, Actuarial Science, and Investment Banking.",
  keywords: ["career options after 12th commerce", "best commerce courses", "ca after 12th", "bba vs bcom"],
}

export default function CoursesCommercePage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>
          Master of Markets: High-Salary Career Options After 12th Commerce
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto' }}>
          Commerce is the heartbeat of the global economy. In 2024, it's a powerhouse of high-stakes careers in Fintech, Corporate Law, and Investment Banking.
        </p>
      </header>

      <section className="glass-panel animate-slide-up" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#10b981', marginBottom: '1.2rem' }}>Modern Financial Architect</h2>
        <p style={{ lineHeight: '1.7', color: 'var(--text-main)' }}>
          Whether you want to be a financial architect as a CA or a corporate strategist with an MBA, the pathways after 12th commerce are lucrative and diverse. This guide explores the best academic and professional paths to help you build a solid financial future in the rapidly evolving fintech era.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ borderTop: '4px solid #10b981' }}>
          <h3 style={{ marginBottom: '1rem' }}>Professional Certs</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
            <li>• Chartered Accountancy (CA)</li>
            <li>• Company Secretary (CS)</li>
            <li>• CMA / ACCA</li>
            <li>• Actuarial Science</li>
          </ul>
        </div>
        <div className="glass-panel" style={{ borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ marginBottom: '1rem' }}>Management & Finance</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
            <li>• IPM (IIM Integrated Program)</li>
            <li>• BBA / BMS</li>
            <li>• B.Com (Hons)</li>
            <li>• Economics (Hons)</li>
          </ul>
        </div>
        <div className="glass-panel" style={{ borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ marginBottom: '1rem' }}>Intersections</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
            <li>• Corporate Law (B.Com LLB)</li>
            <li>• BCA (Fintech focused)</li>
            <li>• Data Science for Finance</li>
            <li>• Digital Marketing</li>
          </ul>
        </div>
      </div>

      <section className="glass-panel animate-slide-up" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Commerce Career ROI Comparison</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem' }}>Course</th>
                <th style={{ padding: '1rem' }}>Duration</th>
                <th style={{ padding: '1rem' }}>Eligibility</th>
                <th style={{ padding: '1rem' }}>Avg Salary (LPA)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Chartered Accountancy (CA)", duration: "4.5-5 Years", eligibility: "12th + Foundation", salary: "₹8 - ₹25" },
                { name: "IPM (IIM Integrated)", duration: "5 Years", eligibility: "12th + IPMAT", salary: "₹12 - ₹28" },
                { name: "B.Com (Hons)", duration: "3 Years", eligibility: "12th (High %)", salary: "₹4 - ₹10" },
                { name: "Economics (Hons)", duration: "3 Years", eligibility: "12th (Maths pref)", salary: "₹6 - ₹15" },
                { name: "Actuarial Science", duration: "3-6 Years", eligibility: "12th (Maths exc)", salary: "₹8 - ₹20" },
                { name: "B.Com LLB", duration: "5 Years", eligibility: "12th + CLAT", salary: "₹6 - ₹14" },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)', background: i % 2 === 0 ? 'rgba(16,185,129,0.03)' : 'transparent' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{row.name}</td>
                  <td style={{ padding: '1rem' }}>{row.duration}</td>
                  <td style={{ padding: '1rem' }}>{row.eligibility}</td>
                  <td style={{ padding: '1rem', color: '#10b981' }}>{row.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-panel animate-slide-up">
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Commerce Career FAQs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { q: "Is Maths compulsory for Commerce after 12th?", a: "Not for all, but mandatory for Eco Hons in top DU colleges and Actuarial Science. Highly recommended for B.Com Hons." },
            { q: "What is the difference between B.Com and B.Com (Hons)?", a: "B.Com (Hons) is specialized and academically rigorous, offering deeper insights into Accounting/Finance." },
            { q: "Can I do CA along with B.Com?", a: "Yes, most CA aspirants pursue B.Com simultaneously to have a fallback degree." },
            { q: "Which has a higher salary: CA or MBA?", a: "Freshers from top IIT/IIMs or top CA ranks earn similarly. MBA often leads to higher management ceilings later." }
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
