import { useState } from 'react'
import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'

const faqKeys = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
  { q: 'faq.q5', a: 'faq.a5' },
  { q: 'faq.q6', a: 'faq.a6' },
]

export default function FAQ() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(null)
  const [ref, inView] = useInView()

  return (
    <section id="faq" className="section" ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(20px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    }}>
      <div>
        <span className="section-label">{t('faq.label')}</span>
        <h2 className="section-title">{t('faq.title')}</h2>
        <p className="section-desc">{t('faq.desc')}</p>
      </div>

      <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {faqKeys.map((item, i) => {
          const isOpen = expanded === i
          return (
            <div key={i} className="card" style={{
              padding: 0, overflow: 'hidden',
              animation: inView ? `fadeInUp 0.4s ease ${i * 0.06}s both` : 'none',
            }}>
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: 16,
                  padding: '20px 24px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontSize: 15, fontWeight: 600, color: 'var(--text)',
                  lineHeight: 1.4,
                }}>{t(item.q)}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"
                  style={{
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.25s ease',
                  }}>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <div style={{
                maxHeight: isOpen ? 300 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.35s ease',
              }}>
                <p style={{
                  padding: '0 24px 20px',
                  fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7,
                  margin: 0,
                }}>{t(item.a)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
