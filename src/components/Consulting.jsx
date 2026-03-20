import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'

export default function Consulting() {
  const { t } = useTranslation()

  const services = [
    {
      title: t('consulting.s1.title'),
      desc: t('consulting.s1.desc'),
      items: [t('consulting.s1.i1'), t('consulting.s1.i2'), t('consulting.s1.i3'), t('consulting.s1.i4')],
      num: '01',
    },
    {
      title: t('consulting.s2.title'),
      desc: t('consulting.s2.desc'),
      items: [t('consulting.s2.i1'), t('consulting.s2.i2'), t('consulting.s2.i3'), t('consulting.s2.i4')],
      num: '02',
    },
    {
      title: t('consulting.s3.title'),
      desc: t('consulting.s3.desc'),
      items: [t('consulting.s3.i1'), t('consulting.s3.i2'), t('consulting.s3.i3'), t('consulting.s3.i4')],
      num: '03',
    },
  ]

  const [ref, inView] = useInView()

  return (
    <section id="consulting" className="section" ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
      <div>
        <span className="section-label">{t('consulting.label')}</span>
        <h2 className="section-title">{t('consulting.title')}</h2>
        <p className="section-desc">{t('consulting.desc')}</p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
      }} className="consulting-grid">
        {services.map((service, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              fontSize: 32, fontWeight: 800, color: 'var(--border-hover)',
              fontFamily: 'var(--font-mono)', marginBottom: 20, lineHeight: 1,
            }}>{service.num}</div>

            <h3 style={{
              fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8,
            }}>{service.title}</h3>
            <p style={{
              fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24,
            }}>{service.desc}</p>

            <div style={{
              marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10,
              borderTop: '1px solid var(--border)', paddingTop: 20,
            }}>
              {service.items.map(item => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 13, color: 'var(--text-secondary)',
                }}>
                  <span style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: 'var(--accent)', flexShrink: 0, opacity: 0.7,
                  }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="consulting-cta" style={{
        marginTop: 24, textAlign: 'center', padding: '48px 32px',
        background: 'var(--bg-card)',
        border: '1px solid var(--accent-mid)',
        borderRadius: 'var(--radius)',
      }}>
        <h3 style={{
          fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 10,
        }}>
          {t('consulting.ctaTitle')}
        </h3>
        <p style={{
          fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28,
          maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.7,
        }}>
          {t('consulting.ctaDesc')}
        </p>
        <a href={`mailto:cembikmaz@outlook.com?subject=${t('consulting.emailSubject')}`} className="btn btn-primary">
          {t('consulting.ctaBtn')}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .consulting-grid { grid-template-columns: 1fr !important; }
          .consulting-cta { padding: 32px 20px !important; }
        }
      `}</style>
    </section>
  )
}
