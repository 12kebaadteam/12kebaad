"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, BarChart3, MapPin, Briefcase, ChevronRight, Award } from "lucide-react";

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("career_results");
    if (saved) setResults(JSON.parse(saved));
  }, []);

  if (results.length === 0) {
    return (
      <main className="main-content" style={{ textAlign: 'center', paddingTop: '10rem' }}>
        <h2>No paths yet.</h2>
        <Link href="/predictor" className="btn-primary" style={{ marginTop: '2rem' }}>Start Predictor</Link>
      </main>
    );
  }

  return (
    <main className="main-content">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-section"
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>Your Top 5 Matches</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>We've analyzed your profile. These paths offer the highest growth and alignment.</p>
        {/* Personalised Popup Message */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--primary)', padding: '0.8rem 1.5rem', borderRadius: '99px', display: 'inline-block', marginTop: '1.5rem', color: 'var(--primary)', fontWeight: 600 }}
        >
          ✨ Hey there! We've successfully processed your responses.
        </motion.div>
      </motion.div>

      <div style={{ display: 'grid', gap: '3rem' }}>
        {results.map((career, idx) => (
          <motion.div
            key={career.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel"
            style={{ padding: '2.5rem', position: 'relative', overflow: 'visible' }}
          >
            {/* Rank Badge */}
            <div style={{ 
              position: 'absolute', top: '-15px', left: '2rem', 
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              padding: '0.5rem 1.2rem', borderRadius: '99px', fontWeight: 'bold', fontSize: '0.9rem',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
            }}>
              MATCH #{idx + 1} — {career.matchScore}%
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              
              {/* Info Column */}
              <div>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {career.name}
                </h2>
                <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderStyle: 'dashed', marginBottom: '1.5rem' }}>
                  <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: '1.5' }}>
                    "{career.aiSummary}"
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <TrendingUp size={20} color="var(--primary)" />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SALARY REALITY</div>
                      <div style={{ fontWeight: '600' }}>{career.salaryRange}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Award size={20} color="var(--accent)" />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DIFFICULTY</div>
                      <div style={{ fontWeight: '600' }}>{career.difficulty}/10</div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <Link href={`/career/${career.id}`} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                    View Full Roadmap <ChevronRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Colleges Column */}
              <div>
                <h4 style={{ color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.05em' }}>RECOMMENDED COLLEGES</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {career.colleges.map((college: any) => (
                    <div 
                      key={college.id} 
                      className="glass-panel" 
                      style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '1rem' }}>{college.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <MapPin size={12} /> {college.location} • ₹{college.fees.toLocaleString()}/yr
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>{college.realityScore}/10</div>
                        <div style={{ fontSize: '0.65rem' }}>REALITY</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback UI Below the Suggestion */}
              <div style={{ gridColumn: '1 / -1', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', marginTop: '1rem' }}>
                 <FeedbackWidget careerId={career.id} />
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '6rem' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Want professional help deciding?</p>
        <button className="btn-secondary" style={{ padding: '1rem 2.5rem' }}>Talk to a Mentor (Coming Soon)</button>
      </div>
      
      {/* AI Error Disclaimer */}
      <div style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.6 }}>
         <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
           The AI can sometimes make mistakes. These are recommendations based on several computational analyses of your input.
         </p>
      </div>

    </main>
  );
}

function FeedbackWidget({ careerId }: { careerId: string }) {
  const [status, setStatus] = useState<'idle' | 'down' | 'submitted'>('idle');
  const [reason, setReason] = useState('');

  const submitFeedback = async (isPositive: boolean) => {
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({ careerId, isPositive, reason: isPositive ? null : reason })
      });
      setStatus('submitted');
    } catch(e) {}
  };

  if (status === 'submitted') {
    return <div style={{ fontSize: '0.85rem', color: '#10b981', textAlign: 'center' }}>Thank you for your feedback!</div>;
  }

  return (
    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Was this suggestion helpful?</p>
      {status === 'idle' && (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => submitFeedback(true)} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>👍 Yes</button>
          <button onClick={() => setStatus('down')} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>👎 No</button>
        </div>
      )}
      {status === 'down' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
          <select value={reason} onChange={e => setReason(e.target.value)} className="form-control" style={{ fontSize: '0.85rem', padding: '0.5rem' }}>
            <option value="" disabled>Why wasn't this good?</option>
            <option value="Not interested in this field">Not interested in this field</option>
            <option value="Salary expectation doesn't match">Salary expectation doesn't match</option>
            <option value="Too difficult">Too difficult</option>
            <option value="Location mismatch">Location mismatch</option>
            <option value="Other">Other</option>
          </select>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
             <button onClick={() => submitFeedback(false)} disabled={!reason} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Submit</button>
             <button onClick={() => setStatus('idle')} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
