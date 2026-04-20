"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Compass, Target, Map, ArrowRight } from "lucide-react";

import FlowingNodes from "@/components/FlowingNodes";
import AmbientBackground from "@/components/AmbientBackground";

export default function HomePage() {
  return (
    <main className="main-content full-screen-layout" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <AmbientBackground />
      <FlowingNodes />

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '10rem 0', minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        
        {/* Floating Icons for Visual Interest */}
        <div className="hide-mobile" style={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.3 }}>
           <Compass size={80} color="var(--primary)" />
        </div>
        <div className="hide-mobile" style={{ position: 'absolute', bottom: '20%', right: '12%', opacity: 0.3 }}>
           <Target size={100} color="var(--accent)" />
        </div>

        <div 
          style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem', 
            background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)',
            padding: '0.5rem 1.25rem', borderRadius: '99px', color: 'var(--primary)',
            fontSize: '0.85rem', fontWeight: '700', marginBottom: '2.5rem', margin: '0 auto'
          }}
        >
          <Sparkles size={16} /> 12kebaad Decision Engine V2.0
        </div>
        
        <h1 className="hero-title" style={{ maxWidth: '1000px', margin: '0 auto 2rem auto', fontSize: '5rem', fontWeight: '900', lineHeight: 1 }}>
          Confused after 12th? Get your <span style={{ color: 'var(--primary)' }}>career plan</span> in 60s.
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
          Stop browsing thousands of colleges. We analyze your interests and marks to show you 5 paths that actually matter.
        </p>
        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/predictor" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            Start Career Predictor <ArrowRight size={20} />
          </Link>
          <Link href="/courses-after-12th" className="btn-secondary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
            Browse Streams
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel">
            <Compass color="var(--primary)" style={{ marginBottom: '1.25rem' }} />
            <h3 style={{ marginBottom: '0.75rem' }}>Personalized Paths</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>We don't show filters. We show answers based on your marks and personality.</p>
          </div>
          <div className="glass-panel">
            <Target color="var(--accent)" style={{ marginBottom: '1.25rem' }} />
            <h3 style={{ marginBottom: '0.75rem' }}>Reality Scores</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Honest pros and cons for every college. No paid rankings, just truth.</p>
          </div>
          <div className="glass-panel">
            <Map color="#10b981" style={{ marginBottom: '1.25rem' }} />
            <h3 style={{ marginBottom: '0.75rem' }}>Full Roadmaps</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>From Class 12 to your first ₹10LPA job. Every step mapped out.</p>
          </div>
        </div>
      </section>

      {/* Stream Quick Links */}
      <section style={{ padding: '6rem 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Pick your stream to explore</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {['Science', 'Commerce', 'Arts'].map(s => (
            <Link key={s} href={`/courses-after-12th-${s.toLowerCase()}`} style={{ textDecoration: 'none' }}>
              <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 2rem', transition: 'all 0.3s' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{s}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Explore high-salary {s} careers</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
