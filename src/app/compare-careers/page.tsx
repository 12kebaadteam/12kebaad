'use client'

import { useState, useEffect } from 'react'
import { Check, X, ArrowLeftRight, TrendingUp, BarChart, Target, Zap, Building2, Briefcase, Minus } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CompareCareersPage() {
  const [careers, setCareers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [career1Id, setCareer1Id] = useState<string>('')
  const [career2Id, setCareer2Id] = useState<string>('')

  useEffect(() => {
    fetch('/api/careers')
      .then(res => res.json())
      .then(data => {
        setCareers(data)
        if (data.length > 1) {
          setCareer1Id(data[0].id)
          setCareer2Id(data[1].id)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch careers", err)
        setLoading(false)
      })
  }, [])

  const career1 = careers.find(c => c.id === career1Id)
  const career2 = careers.find(c => c.id === career2Id)

  const renderComparisonRow = (label: string, val1: any, val2: any, icon?: React.ReactNode, type: 'text' | 'boolean' | 'score' | 'array' | 'money' = 'text') => {
    
    const renderVal = (val: any) => {
      if (val === null || val === undefined || val === '') return <span style={{ color: 'var(--text-muted)' }}>N/A</span>
      
      if (type === 'boolean') {
        if (typeof val === 'string') {
          if (val.toLowerCase() === 'yes' || val.toLowerCase() === 'high' || val.toLowerCase() === 'possible') {
            return <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}><Check size={16} /> {val}</span>
          }
          if (val.toLowerCase() === 'no' || val.toLowerCase() === 'low') {
            return <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}><X size={16} /> {val}</span>
          }
        }
        return val
      }
      
      if (type === 'score') {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1, background: 'var(--border)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${(val / 10) * 100}%`, background: val >= 7 ? 'var(--success)' : val >= 5 ? '#f59e0b' : '#ef4444', height: '100%' }} />
            </div>
            <span style={{ fontWeight: 'bold' }}>{val}/10</span>
          </div>
        )
      }

      if (type === 'array') {
        if (Array.isArray(val)) {
          return val.length > 0 ? val.join(', ') : <span style={{ color: 'var(--text-muted)' }}>None</span>
        }
        return val
      }

      if (type === 'money') {
        return <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>₹{val}L</span>
      }

      return val
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', padding: '1rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {icon} {label}
        </div>
        <div style={{ fontSize: '0.95rem' }}>{renderVal(val1)}</div>
        <div style={{ fontSize: '0.95rem' }}>{renderVal(val2)}</div>
      </div>
    )
  }

  if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading comparisons...</div>

  return (
    <>
      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem' }}>Compare Careers</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Select any two careers side-by-side to find your perfect fit.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          
          {/* Header Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div></div> {/* Empty for alignment with labels */}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)' }}>CAREER 1</label>
              <select 
                className="form-control" 
                value={career1Id} 
                onChange={e => setCareer1Id(e.target.value)}
                style={{ fontWeight: 'bold', fontSize: '1.05rem', color: 'var(--primary)', borderColor: 'var(--primary)', background: 'var(--bg-offset)' }}
              >
                {careers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)' }}>CAREER 2</label>
              <select 
                className="form-control" 
                value={career2Id} 
                onChange={e => setCareer2Id(e.target.value)}
                style={{ fontWeight: 'bold', fontSize: '1.05rem', color: 'var(--primary)', borderColor: 'var(--primary)', background: 'var(--bg-offset)' }}
              >
                {careers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {/* Comparison Table */}
          {career1 && career2 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ padding: '1rem', background: 'var(--bg-offset)', borderRadius: '12px 12px 0 0', borderBottom: '2px solid var(--primary)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Core Info</div>
                <div style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--primary)' }}>{career1.name}</div>
                <div style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--primary)' }}>{career2.name}</div>
              </div>

              {renderComparisonRow('Stream Required', career1.stream, career2.stream, <Target size={18} />)}
              {renderComparisonRow('Sector / Field', career1.sector, career2.sector, <Building2 size={18} />)}
              {renderComparisonRow('Base Degree', career1.degreeRequired, career2.degreeRequired)}
              {renderComparisonRow('Entrance Exam', career1.entryExam, career2.entryExam)}
              {renderComparisonRow('Years to 1st Job', career1.years_to_first_job, career2.years_to_first_job, null, 'text')}
              
              <div style={{ padding: '1rem', background: 'var(--bg-offset)', borderBottom: '2px solid var(--border)', marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Analytics & Metrics</div>
                <div></div><div></div>
              </div>

              {renderComparisonRow('Starting Salary Range', `${career1.salaryRangeMin} - ${career1.salaryRangeMax}`, `${career2.salaryRangeMin} - ${career2.salaryRangeMax}`, <TrendingUp size={18} />, 'money')}
              {renderComparisonRow('Average Salary (LPA)', career1.avg_salary_lpa, career2.avg_salary_lpa, null, 'money')}
              {renderComparisonRow('Market Demand', career1.demand, career2.demand, <Zap size={18} />, 'score')}
              {renderComparisonRow('Career Growth', career1.growth, career2.growth, <TrendingUp size={18} />, 'score')}
              {renderComparisonRow('Difficulty Level', career1.difficulty, career2.difficulty, <BarChart size={18} />, 'score')}
              {renderComparisonRow('Job Demand Trend', career1.job_demand_trend, career2.job_demand_trend, null, 'boolean')}

              <div style={{ padding: '1rem', background: 'var(--bg-offset)', borderBottom: '2px solid var(--border)', marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Work & Lifestyle</div>
                <div></div><div></div>
              </div>

              {renderComparisonRow('Work From Home', career1.work_from_home_possible, career2.work_from_home_possible, <Briefcase size={18} />, 'boolean')}
              {renderComparisonRow('Self Employment', career1.self_employment_possible, career2.self_employment_possible, null, 'boolean')}
              {renderComparisonRow('Physical Demand', career1.physical_demand, career2.physical_demand)}
              {renderComparisonRow('Key Skills', career1.keySkills, career2.keySkills, null, 'array')}

              <div style={{ padding: '2rem 1rem 1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div></div>
                <div>
                  <Link href={`/career/${career1.slug || career1.id}`} className="btn-primary" style={{ width: '100%' }}>View Full Roadmap</Link>
                </div>
                <div>
                  <Link href={`/career/${career2.slug || career2.id}`} className="btn-primary" style={{ width: '100%' }}>View Full Roadmap</Link>
                </div>
              </div>

            </motion.div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              Please select two distinct careers to compare them.
            </div>
          )}

        </div>
      </main>
    </>
  )
}
