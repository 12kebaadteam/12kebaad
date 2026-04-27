"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { 
  ArrowRight, 
  Users, 
  BookOpen, 
  Trophy, 
  Star,
  Quote,
  MessageSquare
} from "lucide-react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="full-screen-layout">
      {/* Hero Section */}
      <section className="hero-section">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="hero-title">
              Confused after 12th? <br />
              <span className="text-accent">Find your path in 2 minutes.</span>
            </h1>
            <p className="hero-subtitle">
              India's smartest career quiz — built for Science, Commerce & Arts students. 
              Stop guessing and start building your future with data-driven guidance.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={session ? "/quiz-intro" : "/form"} className="btn-primary" style={{ padding: '0.9rem 2.5rem' }}>
                Start the Quiz <ArrowRight size={20} />
              </Link>
              <Link href={session ? "/careers" : "/form"} className="btn-secondary" style={{ padding: '0.9rem 2rem' }}>
                Browse All Careers
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{ marginTop: '3rem' }}
          >
            <img 
              src="/hero_illustration.png" 
              alt="Student at crossroads of careers" 
              style={{ 
                maxWidth: '700px', 
                width: '100%', 
                height: 'auto', 
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(30, 58, 95, 0.12)',
                display: 'block',
                margin: '0 auto'
              }} 
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ padding: '1.5rem 1rem', textAlign: 'center' }}>
        <div style={{ 
          background: 'var(--primary)', 
          color: 'white', 
          padding: '1.25rem 1rem', 
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          maxWidth: '700px',
          margin: '0 auto',
          boxShadow: '0 12px 30px rgba(30, 58, 95, 0.15)'
        }}>
          <div style={{ textAlign: 'center', minWidth: '80px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.1rem' }}>1,270+</h3>
            <p style={{ opacity: 0.8, fontSize: '0.75rem' }}>Careers</p>
          </div>
          <div style={{ textAlign: 'center', minWidth: '80px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.1rem' }}>All Streams</h3>
            <p style={{ opacity: 0.8, fontSize: '0.75rem' }}>PCM / PCB / Commerce / Arts</p>
          </div>
          <div style={{ textAlign: 'center', minWidth: '80px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.1rem' }}>100% Free</h3>
            <p style={{ opacity: 0.8, fontSize: '0.75rem' }}>Unbiased Truth</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '3rem 1rem 2rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          textAlign: 'center', 
          color: 'var(--primary)', 
          fontWeight: '800',
          marginBottom: '2rem'
        }}>
          How It Works
        </h2>
        
        <div className="grid-cards">
          <motion.div className="glass-panel" whileHover={{ y: -6 }}>
            <div style={{ 
              width: '50px', height: '50px', 
              background: 'rgba(30, 58, 95, 0.1)', 
              borderRadius: '14px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem', color: 'var(--primary)'
            }}>
              <Users size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>1. Tell us about yourself</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Share your stream, marks, and interests. We use this to personalize your journey.</p>
          </motion.div>

          <motion.div className="glass-panel" whileHover={{ y: -6 }}>
            <div style={{ 
              width: '50px', height: '50px', 
              background: 'rgba(232, 99, 10, 0.1)', 
              borderRadius: '14px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem', color: 'var(--accent)'
            }}>
              <Trophy size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>2. Take the rapid quiz</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Pick between two careers across 20 quick rounds. Our engine analyzes your choices.</p>
          </motion.div>

          <motion.div className="glass-panel" whileHover={{ y: -6 }}>
            <div style={{ 
              width: '50px', height: '50px', 
              background: 'rgba(45, 158, 107, 0.1)', 
              borderRadius: '14px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem', color: 'var(--success)'
            }}>
              <BookOpen size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>3. Get your roadmap</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>See your top 10 matches with step-by-step guidance from Class 12 to your dream job.</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-offset" style={{ padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            textAlign: 'center', 
            color: 'var(--primary)', 
            fontWeight: '800',
            marginBottom: '2rem'
          }}>
            Trusted by Students
          </h2>

          <div className="grid-cards">
            {[
              { name: "Rahul Sharma", stream: "Science (PCM)", city: "Delhi", quote: "I was confused between B.Tech and Data Science. The quiz matched me perfectly with AI Research!" },
              { name: "Ananya Iyer", stream: "Commerce", city: "Mumbai", quote: "Finally a platform that doesn't just push MBA. Found amazing paths in Fintech and Product Management." },
              { name: "Sahil Khan", stream: "Arts", city: "Bangalore", quote: "The roadmap steps are so clear. I now know exactly which entrance tests to take for Design." }
            ].map((t, i) => (
              <div key={i} className="glass-panel" style={{ position: 'relative' }}>
                <Quote 
                  size={32} 
                  style={{ position: 'absolute', top: '1rem', right: '1rem', opacity: 0.1, color: 'var(--primary)' }} 
                />
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.75rem', color: '#FFD700' }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.5' }}>"{t.quote}"</p>
                <div>
                  <p style={{ fontWeight: '700', color: 'var(--primary)' }}>{t.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.stream} • {t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section style={{ padding: '4rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: '800' }}>Explore Top Colleges</h2>
            <p style={{ color: 'var(--text-muted)' }}>Find the best institutions for your chosen career path.</p>
          </div>
          <Link href="/colleges" className="btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
            View All Colleges
          </Link>
        </div>

        <div className="grid-cards">
          {[
            { name: "Engineering Excellence", desc: "Top IITs, NITs and private universities for technical education.", count: "100+ Colleges" },
            { name: "Business & Management", desc: "Premium IIMs and B-Schools for future leaders.", count: "50+ Colleges" },
            { name: "Medical & Science", desc: "Leading medical colleges and research institutes.", count: "40+ Colleges" }
          ].map((cat, i) => (
            <Link href="/colleges" key={i} className="glass-panel" style={{ textDecoration: 'none', transition: 'all 0.3s' }}>
              <p style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{cat.count}</p>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>{cat.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section style={{ padding: '2rem 1rem', textAlign: 'center' }}>
        <div style={{ 
          maxWidth: '700px', 
          margin: '0 auto',
          background: 'var(--primary)', 
          color: 'white',
          padding: '2.5rem 1.5rem',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(30, 58, 95, 0.2)'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            Ready to find your future?
          </h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.9, maxWidth: '450px', margin: '0 auto 1.5rem auto' }}>
            Join 50,000+ students who have found their path with 12kebaad.
          </p>
          <Link href={session ? "/quiz-intro" : "/form"} className="btn-primary" style={{ padding: '0.9rem 3rem', fontSize: '1rem', background: 'white', color: 'var(--primary)' }}>
            Start the Quiz Now
          </Link>
        </div>
      </section>

      {/* Quick Feedback Link */}
      <section style={{ padding: '1.5rem 1rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <MessageSquare size={14} /> Have suggestions? 
          <Link href="/feedback" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
            Give Feedback
          </Link>
        </p>
      </section>
    </main>
  );
}
