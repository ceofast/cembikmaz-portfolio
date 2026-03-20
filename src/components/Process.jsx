import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'

const steps = [
  {
    num: '01',
    titleKey: 'process.s1.title',
    descKey: 'process.s1.desc',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  },
  {
    num: '02',
    titleKey: 'process.s2.title',
    descKey: 'process.s2.desc',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
  },
  {
    num: '03',
    titleKey: 'process.s3.title',
    descKey: 'process.s3.desc',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  },
  {
    num: '04',
    titleKey: 'process.s4.title',
    descKey: 'process.s4.desc',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  },
]

export default function Process() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  return (
    <section id="process" className="section" ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(20px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    }}>
      <div>
        <span className="section-label">{t('process.label')}</span>
        <h2 className="section-title">{t('process.title')}</h2>
        <p className="section-desc">{t('process.desc')}</p>
      </div>

      <div className="process-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
      }}>
        {steps.map((step, i) => (
          <div key={i} className="card" style={{
            display: 'flex', flexDirection: 'column', textAlign: 'center',
            alignItems: 'center', padding: '36px 24px',
            animation: inView ? `fadeInUp 0.5s ease ${i * 0.1}s both` : 'none',
          }}>
            {/* Icon */}
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'var(--accent-dim)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20,
            }}>
              {step.icon}
            </div>

            {/* Step number */}
            <span style={{
              fontSize: 11, fontWeight: 600, color: 'var(--accent)',
              letterSpacing: 1, marginBottom: 8,
            }}>{step.num}</span>

            {/* Title */}
            <h3 style={{
              fontSize: 16, fontWeight: 600, color: 'var(--text)',
              marginBottom: 8,
            }}>{t(step.titleKey)}</h3>

            {/* Description */}
            <p style={{
              fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6,
            }}>{t(step.descKey)}</p>

            {/* Connector arrow (not on last) */}
            {i < 3 && (
              <div className="process-arrow" style={{
                position: 'absolute', right: -14, top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--border-hover)', display: 'flex',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-grid { grid-template-columns: 1fr 1fr !important; }
          .process-arrow { display: none !important; }
        }
        @media (max-width: 480px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
