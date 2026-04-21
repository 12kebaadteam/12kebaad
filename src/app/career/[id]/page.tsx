import prisma from "@/lib/prisma";
import Link from "next/link";
import { ChevronLeft, GraduationCap, Map, Target, TrendingUp, UserCheck } from "lucide-react";
import CommentBox from '@/components/CommentBox';

export default async function CareerPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const career = await prisma.career.findUnique({
    where: { id },
    include: {
      skills: { orderBy: { importance: 'desc' } },
      roadmaps: { orderBy: { stepNumber: 'asc' } },
      collegeCareers: { include: { college: true } },
      comments: {
        where: { status: 'APPROVED' },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!career) return <div>Career not found.</div>;

  return (
    <main className="main-content">
      <Link href="/results" className="back-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ChevronLeft size={16} /> Back to Results
      </Link>

      <section style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{career.name}</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', lineHeight: '1.6' }}>{career.description}</p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
        
        {/* Roadmap Column */}
        <div style={{ gridColumn: 'span 1' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
            <Map color="var(--primary)" /> YOUR ROADMAP
          </h3>

          <div style={{ borderLeft: '2px dashed var(--glass-border)', marginLeft: '1rem', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {career.roadmaps.map((step, idx) => (
              <div key={step.id} style={{ position: 'relative' }}>
                <div style={{ 
                  position: 'absolute', left: '-2.75rem', top: '0', 
                  width: '1.5rem', height: '1.5rem', 
                  background: 'var(--bg-color)', border: '2px solid var(--primary)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold'
                }}>
                  {idx + 1}
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.3rem' }}>{step.timelineStage}</div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{step.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats & Skills Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          <div className="glass-panel">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              <Target color="var(--accent)" size={18} /> SKILLS YOU NEED
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {career.skills.map(skill => (
                <span key={skill.id} className="stream-badge" style={{ padding: '0.4rem 0.8rem' }}>
                  {skill.skillName}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              <TrendingUp color="#10b981" size={18} /> FINANCIAL REALITY
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Entry Level</span>
                <span style={{ fontWeight: '600' }}>₹{career.salaryRangeMin.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Mid-Level (5 yrs)</span>
                <span style={{ fontWeight: '600' }}>₹{(career.salaryRangeMin * 2.5).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Peak Potential</span>
                <span style={{ fontWeight: '600' }}>₹{career.salaryRangeMax.toLocaleString()}+</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
              <UserCheck color="var(--primary)" size={18} /> SECURE YOUR SPOT
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Get detailed timeline and application support for top colleges in this field.
            </p>
            <button className="btn-primary" style={{ width: '100%' }}>Book Mentorship Session</button>
          </div>

        </div>
      </div>

      {/* Discussion Section */}
      <section style={{ marginTop: '5rem', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>
          Discussions & Insights
        </h2>

        {career.comments && career.comments.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {career.comments.map((c: any) => (
              <div key={c.id} className="glass-panel" style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{c.user?.name || 'Anonymous User'}</span>
                  <span>{c.createdAt.toLocaleDateString()}</span>
                </div>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{c.text}</p>
              </div>
            ))}
          </div>
        ) : (
           <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No comments yet. Be the first to share your thoughts!</p>
        )}

        <CommentBox targetId={career.id} type="career" />
      </section>

    </main>
  );
}
