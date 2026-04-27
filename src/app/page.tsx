"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { 
  ArrowRight, 
  CheckCircle2, 
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
      {/* 2.2 Hero Section */}
      <section className="hero-section">
        <div style={{ paddingTop: '2rem', paddingBottom: '2rem', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
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
            
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={session ? "/quiz-intro" : "/form"} className="btn-primary" style={{ padding: '1rem 3rem' }}>
                Start the Quiz <ArrowRight size={20} />
              </Link>
              <Link href={session ? "/careers" : "/form"} className="btn-secondary" style={{ padding: '1rem 2.5rem' }}>
                Browse All Careers
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{ marginTop: '5rem', position: 'relative' }}
          >
            <img 
              src="/hero_illustration.png" 
              alt="Student at crossroads of careers" 
              style={{ 
                maxWidth: '800px', 
                width: '100%', 
                height: 'auto', 
                borderRadius: '32px',
                boxShadow: '0 30px 60px rgba(30, 58, 95, 0.15)'
              }} 
            />
          </motion.div>
        </div>
      </section>

      {/* 2.4 Social Proof / Stats Strip */}
      <section style={{ padding: '1rem 1rem', textAlign: 'center' }}>
        <div style={{ 
          background: 'var(--primary)', 
          color: 'white', 
          padding: '1.5rem 1.5rem', 
          borderRadius: '24px',
          display: 'inline-flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '800px',
          boxShadow: '0 20px 40px rgba(30, 58, 95, 0.15)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.2rem' }}>1,270+</h3>
            <p style={{ opacity: 0.8, fontSize: '0.8rem' }}>Careers</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.2rem' }}>PCM/PCB/Arts</h3>
            <p style={{ opacity: 0.8, fontSize: '0.8rem' }}>Specialized Paths</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.2rem' }}>100% Free</h3>
            <p style={{ opacity: 0.8, fontSize: '0.8rem' }}>Unbiased Truth</p>
          </div>
        </div>
      </section>

      {/* 2.3 How It Works Section */}
      <section className="main-content" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          textAlign: 'center', 
          color: 'var(--primary)', 
          fontWeight: '800',
          marginBottom: '3rem'
        }}>
          How It Works
        </h2>
        
        <div className="grid-cards">
          <motion.div 
            className="glass-panel"
            whileHover={{ y: -10 }}
          >
            <div style={{ 
              width: '60px', height: '60px', 
              background: 'rgba(30, 58, 95, 0.1)', 
              borderRadius: '16px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.5rem', color: 'var(--primary)'
            }}>
              <Users size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>1. Tell us about yourself</h3>
            <p style={{ color: 'var(--text-muted)' }}>Share your stream, marks, and interests. We use this to personalize your journey.</p>
          </motion.div>

          <motion.div 
            className="glass-panel"
            whileHover={{ y: -10 }}
          >
            <div style={{ 
              width: '60px', height: '60px', 
              background: 'rgba(232, 99, 10, 0.1)', 
              borderRadius: '16px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.5rem', color: 'var(--accent)'
            }}>
              <Trophy size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>2. Take the rapid quiz</h3>
            <p style={{ color: 'var(--text-muted)' }}>Pick between two careers across 20 quick rounds. Our engine analyzes your split-second choices.</p>
          </motion.div>

          <motion.div 
            className="glass-panel"
            whileHover={{ y: -10 }}
          >
            <div style={{ 
              width: '60px', height: '60px', 
              background: 'rgba(45, 158, 107, 0.1)', 
              borderRadius: '16px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.5rem', color: 'var(--success)'
            }}>
              <BookOpen size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>3. Get your roadmap</h3>
            <p style={{ color: 'var(--text-muted)' }}>See your top 10 matches with full step-by-step guidance from Class 12 to your dream job.</p>
          </motion.div>
        </div>
      </section>

      {/* 2.5 Testimonials */}
      <section className="bg-offset" style={{ padding: '6rem 0' }}>
        <div className="main-content" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 style={{ 
            fontSize: '3rem', 
            textAlign: 'center', 
            color: 'var(--primary)', 
            fontWeight: '800',
            marginBottom: '4rem'
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
                  size={40} 
                  style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', opacity: 0.1, color: 'var(--primary)' }} 
                />
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem', color: '#FFD700' }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '2rem', fontSize: '1.1rem' }}>"{t.quote}"</p>
                <div>
                  <p style={{ fontWeight: '700', color: 'var(--primary)' }}>{t.name}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.stream} • {t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section style={{ padding: '2rem 1rem', textAlign: 'center' }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          background: 'var(--primary)', 
          color: 'white',
          padding: '3rem 1.5rem',
          borderRadius: '32px',
          boxShadow: '0 30px 60px rgba(30, 58, 95, 0.2)'
        }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem' }}>
            Ready to find your future?
          </h2>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Join 50,000+ students who have found their path with 12kebaad.
          </p>
          <Link href={session ? "/quiz-intro" : "/form"} className="btn-primary" style={{ padding: '1rem 4rem', fontSize: '1.1rem', background: 'white', color: 'var(--primary)' }}>
            Start the Quiz Now
          </Link>
        </div>
      </section>

      {/* Quick Feedback Link */}
      <section style={{ padding: '2rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          <MessageSquare size={16} /> Have suggestions? 
          <Link href="/feedback" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
            Give Feedback
          </Link>
        </p>
      </section>
    </main>
  );
}
