import { useState } from 'react'
import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'

const certData = [
  {
    catKey: 'certs.cat1',
    certs: [
      { name: 'Fundamentals of MCP', org: 'Hugging Face', year: '2025' },
      { name: 'Fundamentals of Agents', org: 'Hugging Face', year: '2025' },
      { name: 'Introduction to Deep Learning', org: 'Global AI Hub', year: '2022' },
    ],
  },
  {
    catKey: 'certs.cat2',
    certs: [
      { name: 'Data Science & Machine Learning', org: 'Veri Bilimi Okulu', year: '2022' },
      { name: 'Machine Learning', org: 'Miuul', year: '2022' },
      { name: 'Feature Engineering for NLP in Python', org: 'DataCamp', year: '2022' },
      { name: 'Data Scientist with Python Track', org: 'DataCamp', year: '2021' },
    ],
  },
  {
    catKey: 'certs.cat3',
    certs: [
      { name: 'Data Engineer Path', org: 'Miuul', year: '2022' },
      { name: 'Machine Learning Operations (MLOps)', org: 'Veri Bilimi Okulu', year: '2022' },
      { name: 'DataOps MLOps Principal Capabilities', org: 'Miuul', year: '2022' },
      { name: 'Container Environments & Deploying ML Models', org: 'Miuul', year: '2022' },
      { name: 'Data Pipelines & Workflow Scheduling', org: 'Miuul', year: '2022' },
    ],
  },
  {
    catKey: 'certs.cat4',
    certs: [
      { name: 'Big Data Processing with Apache Spark', org: 'Miuul', year: '2022' },
      { name: 'Real-Time Data Processing with Spark', org: 'Miuul', year: '2022' },
      { name: 'Spark Machine Learning', org: 'Miuul', year: '2022' },
      { name: 'Non-Relational Databases', org: 'Miuul', year: '2022' },
    ],
  },
]

const TOTAL_CERTS = 37

const orgColors = {
  'Hugging Face': '#ff9d00',
  'Miuul': '#6366f1',
  'DataCamp': '#05c168',
  'Veri Bilimi Okulu': '#f97316',
  'Global AI Hub': '#3b82f6',
}

export default function Certifications() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(null)
  const [ref, inView] = useInView()

  return (
    <section id="certifications" className="section" ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
      <div>
        <span className="section-label">{t('certs.label')}</span>
        <h2 className="section-title">{t('certs.title')}</h2>
        <p className="section-desc">{t('certs.desc')}</p>
      </div>

      {/* Total badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 16px', borderRadius: 980, marginBottom: 20,
        background: 'var(--bg-card)',
      }}>
        <span style={{
          fontSize: 20, fontWeight: 700, color: 'var(--text)',
        }}>{TOTAL_CERTS}+</span>
        <span style={{
          fontSize: 13, fontWeight: 500, color: 'var(--text-muted)',
        }}>{t('certs.total')}</span>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16,
      }} className="certs-grid">
        {certData.map((group, gi) => (
          <div key={gi} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              role="button"
              tabIndex={0}
              aria-expanded={expanded === gi}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 20, cursor: 'pointer',
              }}
              onClick={() => setExpanded(expanded === gi ? null : gi)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(expanded === gi ? null : gi) } }}
            >
              <div style={{
                fontSize: 13, fontWeight: 600, color: 'var(--text-muted)',
                letterSpacing: 0,
              }}>{t(group.catKey)}</div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{
                  padding: '2px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                  background: 'var(--bg)', color: 'var(--text-muted)',
                }}>{group.certs.length}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
                  style={{
                    transform: expanded === gi ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(expanded === gi ? group.certs : group.certs.slice(0, 2)).map((cert, ci) => (
                <div key={ci} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '10px 14px', background: 'var(--bg)',
                  borderRadius: 'var(--radius-sm)',
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%', marginTop: 6, flexShrink: 0,
                    background: orgColors[cert.org] || 'var(--accent)',
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 14, fontWeight: 500, color: 'var(--text)',
                      lineHeight: 1.4, marginBottom: 2,
                    }}>{cert.name}</div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontSize: 12, color: 'var(--text-muted)',
                    }}>
                      <span>{cert.org}</span>
                      <span style={{
                        width: 3, height: 3, borderRadius: '50%',
                        background: 'var(--border-hover)',
                      }} />
                      <span>{cert.year}</span>
                    </div>
                  </div>
                </div>
              ))}
              {!expanded && group.certs.length > 2 && (
                <button
                  onClick={() => setExpanded(gi)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 12, color: 'var(--accent)', fontWeight: 500,
                    padding: '4px 0', textAlign: 'left',
                  }}
                >
                  +{group.certs.length - 2} more
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* LinkedIn CTA */}
      <div style={{ textAlign: 'center', marginTop: 28 }}>
        <a
          href="https://www.linkedin.com/in/cembikmaz/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          {t('certs.allBtn')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .certs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
