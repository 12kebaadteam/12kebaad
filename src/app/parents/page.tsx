import { Metadata } from 'next'
import { ShieldCheck, HeartHandshake, Lightbulb, LineChart, Target, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: "For Parents | Guiding Your Child's Future - 12kebaad",
  description: 'Learn how 12kebaad partners with parents to help children make data-driven, confident career decisions after Class 12.',
}

export default function ParentsPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      <section style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem', lineHeight: '1.2' }}>
          Partnering with Parents for a Brighter Future
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          We understand that as a parent, you want nothing but the best for your child. Choosing the right career after Class 12 is a monumental decision, and we are here to support you both.
        </p>
      </section>

      <section className="glass-panel" style={{ marginBottom: '4rem', padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <ShieldCheck size={32} style={{ color: 'var(--accent)' }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary)' }}>Why Trust 12kebaad?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LineChart size={20} style={{ color: 'var(--success)' }} />
              Data-Driven Decisions
            </h3>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>
              Our recommendations are not based on guesswork. We analyze over 1,200+ Indian career paths, incorporating real-time market demand, salary ranges, and growth trends to ensure your child chooses a viable path.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCheck size={20} style={{ color: 'var(--accent)' }} />
              Personalized Matching
            </h3>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>
              Every child is unique. Our AI engine evaluates their specific academic stream, interests, and passions to suggest careers where they will not just succeed, but truly thrive and be happy.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={20} style={{ color: 'var(--primary)' }} />
              Actionable Roadmaps
            </h3>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>
              We do not just give a list of names. We provide clear, step-by-step roadmaps including necessary entrance exams, degrees, and top colleges, turning a daunting process into a clear plan.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HeartHandshake size={20} style={{ color: '#ef4444' }} />
              A Tool, Not a Replacement
            </h3>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>
              Our platform is designed to empower your discussions, not replace human guidance. We strongly encourage you to review the results together and consult with professional counselors before making final choices.
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center' }}>
          How You Can Use Our Platform
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '700px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-offset)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold', flexShrink: 0 }}>1</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>Encourage Honest Answers</h3>
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.5' }}>Sit with your child as they take the assessment, but let them answer honestly about their interests and passions. The most accurate results come from genuine responses.</p>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-offset)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold', flexShrink: 0 }}>2</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>Review the Reports Together</h3>
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.5' }}>Download the PDF report of their top matches. Use it as a structured starting point for family discussions about the future.</p>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-offset)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold', flexShrink: 0 }}>3</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>Explore the Unknown</h3>
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.5' }}>Be open to new career paths you might not have considered. The job market is evolving rapidly, and many of today's best careers didn't exist a decade ago.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section style={{ textAlign: 'center', padding: '3rem 1.5rem', background: 'var(--bg-offset)', borderRadius: '20px', border: '1px solid var(--border)' }}>
        <Lightbulb size={40} style={{ color: 'var(--accent)', margin: '0 auto 1.5rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>
          Ready to Start the Journey?
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Have your child take our 60-second assessment and uncover their potential.
        </p>
        <a href="/quiz-intro" className="btn-primary" style={{ display: 'inline-block', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
          Take the Assessment Now
        </a>
      </section>
    </div>
  )
}
