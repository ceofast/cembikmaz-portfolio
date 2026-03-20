import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'

export default function Consulting() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

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
              fontSize: 32, fontWeight: 800, lineHeight: 1, marginBottom: 20,
              background: 'linear-gradient(135deg, var(--accent) 0%, #9333ea 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.25,
            }}>{service.num}</div>

            <h3 style={{
              fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 8,
            }}>{service.title}</h3>
            <p style={{
              fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24,
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
                    background: 'var(--accent)', flexShrink: 0, opacity: 0.6,
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
        marginTop: 24, textAlign: 'center', padding: '56px 32px',
        background: 'linear-gradient(135deg, #f5f5f7 0%, #eef2ff 100%)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden',
      }}>
        <h3 style={{
          fontSize: 22, fontWeight: 600, color: 'var(--text)', marginBottom: 10,
        }}>
          {t('consulting.ctaTitle')}
        </h3>
        <p style={{
          fontSize: 15, color: 'var(--text-secondary)', marginBottom: 28,
          maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.6,
        }}>
          {t('consulting.ctaDesc')}
        </p>
        <a href={`mailto:cembikmaz@outlook.com?subject=${t('consulting.emailSubject')}`} className="btn btn-primary">
          {t('consulting.ctaBtn')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
