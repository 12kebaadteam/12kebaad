'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Map, 
  Download, 
  Bookmark, 
  ChevronRight, 
  TrendingUp, 
  Target,
  Clock,
  Briefcase,
  GraduationCap,
  Sparkles,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'
import FeedbackSection from '@/components/FeedbackSection'
import CommentSection from '@/components/CommentSection'

export default function CareerDetailClient() {
  const { slug } = useParams()
  const router = useRouter()
  const [career, setCareer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await fetch(`/api/career/${slug}`)
        const data = await res.json()
        setCareer(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCareer()
  }, [slug])

  if (loading) return null
  if (!career) return <div>Career not found</div>

  return (
    <div className="main-content" style={{ maxWidth: '100%' }}>
      <Link href="/results" className="back-link">
        <ArrowLeft size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Back to recommendations
      </Link>

      {/* Header */}
      <section style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
          {career.name}
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          {career.description}
        </p>
      </section>

      {/* At a Glance */}
      <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', background: 'var(--bg-offset)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SALARY RANGE</p>
            <p style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1.2rem' }}>₹{career.salaryRangeMin}L - ₹{career.salaryRangeMax}L /yr</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>DEMAND</p>
            <p style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1.2rem' }}>{career.demand}/10</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>GROWTH</p>
            <p style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1.2rem' }}>{career.growth}/10</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>STREAM</p>
            <p style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1.2rem' }}>{career.stream}</p>
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <section style={{ marginBottom: '6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          <Map size={32} style={{ color: 'var(--accent)' }} />
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--primary)' }}>Your Success Roadmap</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', paddingLeft: '2rem' }}>
          <div style={{ 
            position: 'absolute', left: '0', top: '10px', bottom: '10px', 
            width: '2px', background: 'var(--border)', zIndex: 0 
          }} />
          
          {(career.roadmapSteps?.length > 0 ? career.roadmapSteps : [
            "Complete Class 12 in " + career.stream + " stream",
            "Prepare for entrance exams like " + (career.entryExam || "CUET/Specific tests"),
            "Pursue a " + (career.degreeRequired || "Bachelor's degree") + " in a related field",
            "Build core skills like " + (career.keySkills?.join(", ") || "Technical/Soft skills"),
            "Apply for internships or entry-level positions",
            "Climb the ladder to senior roles or specialization"
          ]).map((step: string, i: number) => (
            <div key={i} style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ 
                position: 'absolute', left: '-2.5rem', top: '0', 
                width: '16px', height: '16px', borderRadius: '50%', 
                background: 'var(--bg-main)', border: '4px solid var(--primary)'
              }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                Step {i + 1}: {step.split(":")[0]}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {step.includes(":") ? step.split(":")[1] : step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} style={{ color: 'var(--accent)' }} /> Key Skills Required
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {(career.keySkills || ["Critical Thinking", "Problem Solving", "Communication", "Time Management"]).map((skill: string, i: number) => (
              <span key={i} style={{ background: 'rgba(30, 58, 95, 0.05)', color: 'var(--primary)', padding: '0.6rem 1.2rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '600' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GraduationCap size={20} style={{ color: 'var(--accent)' }} /> Top Colleges in India
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(career.topColleges?.split(",") || ["IIT Delhi", "BITS Pilani", "SRCC Delhi", "IIM Ahmedabad"]).map((college: string, i: number) => (
              <div key={i} style={{ padding: '1rem', background: 'var(--bg-offset)', borderRadius: '12px', border: '1px solid var(--border)', fontWeight: '600', color: 'var(--text-main)' }}>
                {college.trim()}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Typical Day */}
      <section style={{ marginBottom: '6rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem' }}>
          A Typical Day in This Career
        </h3>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            As a {career.name}, your day typically begins with {career.stream === 'Science' ? 'analyzing technical data and coordination meetings.' : 'strategic planning and client interactions.'} You'll spend most of your time solving complex problems and collaborating with team members. No two days are exactly alike, making it a dynamic and fulfilling choice for those who love to learn.
          </p>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            "name": career.name,
            "description": career.description,
            "occupationalCategory": career.sector,
            "salaryRange": {
              "@type": "MonetaryAmount",
              "currency": "INR",
              "minValue": career.salaryRangeMin * 100000,
              "maxValue": career.salaryRangeMax * 100000
            }
          })
        }}
      />

      {/* CTA Section */}
      <section style={{ 
        background: 'var(--primary)', 
        padding: '4rem', 
        borderRadius: '32px', 
        textAlign: 'center', 
        color: '#fff',
        marginBottom: '6rem'
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>This could be your future.</h2>
        <p style={{ opacity: 0.9, fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          Save this career to your profile or download the full report to share with your parents or mentors.
        </p>
      </section>

      {/* Related Careers - Internal Linking Boost */}
      {career.related?.length > 0 && (
        <section style={{ marginBottom: '6rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '2rem' }}>
            Similar Career Paths
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {career.related.map((rel: any) => (
              <Link 
                key={rel.id} 
                href={`/career/${rel.slug || rel.id}`}
                className="glass-panel"
                style={{ padding: '1.5rem', textDecoration: 'none', transition: 'transform 0.2s' }}
              >
                <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)', marginBottom: '0.5rem' }}>{rel.stream}</p>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>{rel.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Explore roadmap <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Feedback & Comments */}
      <section style={{ marginBottom: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        <FeedbackSection careerId={career.id} />
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem' }}>Expert Consultation</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Need more specific advice? Connect with our career mentors for a personalized 1-on-1 session.
          </p>
          <button className="btn-secondary" style={{ width: '100%' }}>Book a Call</button>
        </div>
      </section>

      <CommentSection careerId={career.id} />
    </div>
  )
}
