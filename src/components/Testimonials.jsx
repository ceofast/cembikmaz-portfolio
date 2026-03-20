import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'

const testimonials = [
  {
    nameKey: 'testimonials.t1.name',
    roleKey: 'testimonials.t1.role',
    textKey: 'testimonials.t1.text',
    initials: 'AY',
  },
  {
    nameKey: 'testimonials.t2.name',
    roleKey: 'testimonials.t2.role',
    textKey: 'testimonials.t2.text',
    initials: 'MK',
  },
  {
    nameKey: 'testimonials.t3.name',
    roleKey: 'testimonials.t3.role',
    textKey: 'testimonials.t3.text',
    initials: 'SK',
  },
]

export default function Testimonials() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  return (
    <section id="testimonials" className="section" ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(20px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    }}>
      <div>
        <span className="section-label">{t('testimonials.label')}</span>
        <h2 className="section-title">{t('testimonials.title')}</h2>
        <p className="section-desc">{t('testimonials.desc')}</p>
      </div>

      <div className="testimonials-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
      }}>
        {testimonials.map((item, i) => (
          <div key={i} className="card" style={{
            display: 'flex', flexDirection: 'column',
            animation: inView ? `fadeInUp 0.5s ease ${i * 0.1}s both` : 'none',
          }}>
            {/* Quote icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent)" opacity="0.15" style={{ marginBottom: 16 }}>
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <p style={{
              fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7,
              flex: 1, marginBottom: 24, fontStyle: 'italic',
            }}>
              {t(item.textKey)}
            </p>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              borderTop: '1px solid var(--border)', paddingTop: 16,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--accent-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: 'var(--accent)',
              }}>{item.initials}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
                  {t(item.nameKey)}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {t(item.roleKey)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
