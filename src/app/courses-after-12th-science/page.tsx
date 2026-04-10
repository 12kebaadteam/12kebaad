import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Top Courses After 12th Science In India 2024-25 | PCM & PCB Guide",
  description: "Comprehensive guide for science students after 12th. Explore engineering, medical, pure sciences, and high-salary niche careers like aviation.",
  keywords: ["courses after 12th science", "best courses after 12th pcm", "high salary courses after 12th pcb", "engineering vs medical"],
}

export default function CoursesSciencePage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>
          Future-Proof Your Career: Courses After 12th Science
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Explore the versatile and high-impact landscape of Science. High-paying paths in Engineering, Medical, Technology, and beyond.
        </p>
      </header>

      <section className="glass-panel animate-slide-up" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1.2rem' }}>The Versatility of Science</h2>
        <p style={{ lineHeight: '1.7', color: 'var(--text-main)' }}>
          Whether you're passionate about coding the next breakthrough AI (PCM), saving lives in healthcare (PCB), or exploring the intersection of both (PCMB), the options in 2024-25 are more diverse than ever. From traditional engineering and medicine to emerging fields like Data Science and Biotechnology, this guide covers everything a science student needs to know.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-panel shadow-sm">
          <h3 style={{ color: 'var(--primary)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>PCM (Engineering)</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
            <li>• Computer Science (AI/ML)</li>
            <li>• Robotics & Automation</li>
            <li>• Aerospace Engineering</li>
            <li>• Cybersecurity</li>
            <li>• Ethical Hacking</li>
          </ul>
        </div>
        <div className="glass-panel shadow-sm">
          <h3 style={{ color: 'var(--accent)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>PCB (Medical)</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
            <li>• MBBS / BDS</li>
            <li>• BAMS / BHMS</li>
            <li>• B.Sc Nursing</li>
            <li>• BPT (Physiotherapy)</li>
            <li>• Microbiology</li>
          </ul>
        </div>
        <div className="glass-panel shadow-sm">
          <h3 style={{ color: '#10b981', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Niche & NRR</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
            <li>• Commercial Pilot (CPL)</li>
            <li>• Merchant Navy</li>
            <li>• Forensic Science</li>
            <li>• Astrophysics</li>
            <li>• B.Arch (Architecture)</li>
          </ul>
        </div>
      </div>

      <section className="glass-panel animate-slide-up" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Science Career Comparison</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem' }}>Course</th>
                <th style={{ padding: '1rem' }}>Duration</th>
                <th style={{ padding: '1rem' }}>Entrance Exam</th>
                <th style={{ padding: '1rem' }}>Salary (LPA)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "B.Tech (CS/AI)", duration: "4 Years", entrance: "JEE Main/BITSAT", salary: "₹8 - ₹25" },
                { name: "MBBS", duration: "5.5 Years", entrance: "NEET-UG", salary: "₹9 - ₹18" },
                { name: "Comm. Pilot", duration: "2-3 Years", entrance: "CPL Ground", salary: "₹15 - ₹30" },
                { name: "B.Arch", duration: "5 Years", entrance: "NATA / JEE Paper 2", salary: "₹4 - ₹10" },
                { name: "B.Sc Nursing", duration: "4 Years", entrance: "AIIMS / NEET", salary: "₹3 - ₹7" },
                { name: "Merchant Navy", duration: "4 Years", entrance: "IMU CET", salary: "₹6 - ₹12" },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)', background: i % 2 === 0 ? 'rgba(59,130,246,0.03)' : 'transparent' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{row.name}</td>
                  <td style={{ padding: '1rem' }}>{row.duration}</td>
                  <td style={{ padding: '1rem' }}>{row.entrance}</td>
                  <td style={{ padding: '1rem', color: 'var(--primary)' }}>{row.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-panel animate-slide-up">
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Common Science FAQs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { q: "Can a PCB student join B.Tech?", a: "Yes, in fields like Biotechnology or Food Technology, often meeting specific university criteria even without Maths." },
            { q: "What is the best option for PCMB students?", a: "PCMB students have maximum flexibility. Biotechnology and Forensics are elite interdisciplinary options for them." },
            { q: "Is JEE the only exam for Engineering?", a: "No. State exams (MHT-CET), private exams (BITSAT, VITEEE), and individual university tests offer great entries." },
            { q: "How to become a Pilot after 12th?", a: "You need 12th PCM with 50%+. You join a flying school, complete ground classes, and clock 200+ flying hours for a CPL." }
          ].map((faq, i) => (
            <details key={i} style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
              <summary style={{ fontWeight: 600, cursor: 'pointer', marginBottom: '0.5rem' }}>{faq.q}</summary>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', paddingLeft: '1rem' }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Link href="/colleges" className="btn-primary">View Top Science Colleges →</Link>
      </div>
    </div>
  )
}
