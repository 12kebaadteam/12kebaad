import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Best Courses After 12th Arts In India 2024-25 | Law, Design, BJMC",
  description: "Creativity meets career in the arts stream. Explore BA LLB, Design, Journalism, Psychology, and Hotel Management. High-salary creative career pathways revealed.",
  keywords: ["courses after 12th arts", "best arts courses", "career options after 12th humanities", "creative arts career"],
}

export default function CoursesArtsPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>
          Creativity Meets Career: Courses After 12th Arts
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto' }}>
          Arts and Humanities are the breeding grounds for the world's most creative and influential professionals. From justice to design, the landscape is vast and vibrant.
        </p>
      </header>

      <section className="glass-panel animate-slide-up" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#f59e0b', marginBottom: '1.2rem' }}>The Modern Influencer</h2>
        <p style={{ lineHeight: '1.7', color: 'var(--text-main)' }}>
          Gone are the days when the Arts stream was considered the 'easy' path. In 2024, Arts students in India are defending justice in high courts, designing viral apps, and managing global luxury brands. This guide blends passion with profession to map out your best pathways.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ borderBottom: '4px solid #f59e0b' }}>
          <h3 style={{ marginBottom: '1rem' }}>Law & Governance</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
            <li>• Integrated Law (BA LLB)</li>
            <li>• Social Work (BSW)</li>
            <li>• Political Science Hons</li>
            <li>• International Relations</li>
          </ul>
        </div>
        <div className="glass-panel" style={{ borderBottom: '4px solid #ec4899' }}>
          <h3 style={{ marginBottom: '1rem' }}>Design & Digital</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
            <li>• Fashion Design (B.Des)</li>
            <li>• UI/UX & Product Design</li>
            <li>• Digital Marketing</li>
            <li>• Content Strategy</li>
          </ul>
        </div>
        <div className="glass-panel" style={{ borderBottom: '4px solid #3b82f6' }}>
          <h3 style={{ marginBottom: '1rem' }}>Media & Hospitality</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
            <li>• Journalism (BJMC)</li>
            <li>• Film Making & VFX</li>
            <li>• Hotel Management (BHM)</li>
            <li>• Culinary Arts</li>
          </ul>
        </div>
      </div>

      <section className="glass-panel animate-slide-up" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Arts Career Performance Table</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem' }}>Course</th>
                <th style={{ padding: '1rem' }}>Duration</th>
                <th style={{ padding: '1rem' }}>Avg Salary (LPA)</th>
                <th style={{ padding: '1rem' }}>Top Career Roles</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "BA LLB / BBA LLB", duration: "5 Years", salary: "₹5 - ₹18", roles: "Corporate Lawyer, Legal Advisor" },
                { name: "B.Des (Design)", duration: "4 Years", salary: "₹4 - ₹15", roles: "Product/UI Designer" },
                { name: "B.A. Economics (Hons)", duration: "3 Years", salary: "₹5 - ₹12", roles: "Data Analyst, Policy Expert" },
                { name: "BJMC (Journalism)", duration: "3 Years", salary: "₹3.5 - ₹10", roles: "PR Manager, Editor" },
                { name: "IPM (IIM Integrated)", duration: "5 Years", salary: "₹10 - ₹25", roles: "Business Consultant" },
                { name: "Psychology (Hons)", duration: "3 Years", salary: "₹3.5 - ₹8", roles: "HR Specialist, Counselor" },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)', background: i % 2 === 0 ? 'rgba(245,158,11,0.03)' : 'transparent' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{row.name}</td>
                  <td style={{ padding: '1rem' }}>{row.duration}</td>
                  <td style={{ padding: '1rem', color: '#f59e0b' }}>{row.salary}</td>
                  <td style={{ padding: '1rem' }}>{row.roles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-panel animate-slide-up">
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Arts Career FAQs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { q: "Can I become a lawyer after 12th Arts?", a: "Yes! Integrated Law (BA LLB) is a 5-year path. Clear CLAT or AILET to enter top National Law Universities (NLUs)." },
            { q: "Is Mathematics required for B.A. Economics?", a: "For top colleges (like in Delhi University), Maths in 12th is usually mandatory for Economics Hons." },
            { q: "What is the scope of Psychology in India?", a: "Demand is skyrocketing. You can start with BA Psychology, though a Master's (MA) is usually needed to practice." },
            { q: "What is Liberal Arts?", a: "A multidisciplinary approach where you can study a mix like Philosophy with Economics, fostering diverse critical thinking." }
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
