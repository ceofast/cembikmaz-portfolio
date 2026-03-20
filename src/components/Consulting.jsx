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
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
    },
    {
      title: t('consulting.s2.title'),
      desc: t('consulting.s2.desc'),
      items: [t('consulting.s2.i1'), t('consulting.s2.i2'), t('consulting.s2.i3'), t('consulting.s2.i4')],
      num: '02',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
    },
    {
      title: t('consulting.s3.title'),
      desc: t('consulting.s3.desc'),
      items: [t('consulting.s3.i1'), t('consulting.s3.i2'), t('consulting.s3.i3'), t('consulting.s3.i4')],
      num: '03',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"><path d="M4 14a1 1 0 01-.78-1.63l9.9-10.2a.5.5 0 01.86.46l-1.92 6.02A1 1 0 0013 10h7a1 1 0 01.78 1.63l-9.9 10.2a.5.5 0 01-.86-.46l1.92-6.02A1 1 0 0011 14z" /></svg>,
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
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 20,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'var(--accent-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{service.icon}</div>
              <span style={{
                fontSize: 28, fontWeight: 700, color: 'var(--border-hover)',
                lineHeight: 1,
              }}>{service.num}</span>
            </div>

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
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--accent-dim) 100%)',
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
        <a href={`mailto:cembikmaz@outlook.com?subject=${encodeURIComponent(t('consulting.emailSubject'))}`} className="btn btn-primary">
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
