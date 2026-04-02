'use client'
import { useState } from 'react'

type EntranceTest = {
  id: string
  name: string
  fullForm: string
  suitability: string
  eligibility: string
  extraRemarks: string | null
}

export default function ExpandableTestCard({ test }: { test: EntranceTest }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="glass-panel animate-slide-up expandable-card" style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{test.name}</h3>
      </div>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.8rem', fontStyle: 'italic' }}>{test.fullForm}</p>

      <p style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>
        <strong style={{ color: 'var(--text-main)' }}>Suitable for:</strong>{' '}
        <span style={{ color: 'var(--accent)' }}>{test.suitability}</span>
      </p>
      <p style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>
        <strong style={{ color: 'var(--text-main)' }}>Eligibility:</strong>{' '}
        <span style={{ color: 'var(--text-muted)' }}>{test.eligibility}</span>
      </p>

      {test.extraRemarks && !expanded && (
        <p style={{ fontSize: '0.82rem', color: 'var(--accent)', marginTop: '0.5rem' }}>
          ↳ {test.extraRemarks.length > 80 ? test.extraRemarks.slice(0, 80) + '…' : test.extraRemarks}
        </p>
      )}

      <button onClick={() => setExpanded(!expanded)} className="expand-btn">
        {expanded ? '▲ Show Less' : '▼ Full Details'}
      </button>

      {expanded && (
        <div className="expanded-details">
          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '0.8rem', marginTop: '0.8rem' }}>
            <p style={{ fontSize: '0.88rem', marginBottom: '0.6rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>Full Name:</strong>{' '}
              <span style={{ color: 'var(--text-muted)' }}>{test.fullForm}</span>
            </p>
            <p style={{ fontSize: '0.88rem', marginBottom: '0.6rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>Suitability:</strong>{' '}
              <span style={{ color: 'var(--accent)' }}>{test.suitability}</span>
            </p>
            <p style={{ fontSize: '0.88rem', marginBottom: '0.6rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>Eligibility:</strong>{' '}
              <span style={{ color: 'var(--text-muted)' }}>{test.eligibility}</span>
            </p>
            {test.extraRemarks && (
              <p style={{ fontSize: '0.88rem' }}>
                <strong style={{ color: 'var(--text-main)' }}>Remarks:</strong>{' '}
                <span style={{ color: 'var(--accent)' }}>{test.extraRemarks}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
