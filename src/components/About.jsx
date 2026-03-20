import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'

const expertiseIcons = [
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 14a1 1 0 01-.78-1.63l9.9-10.2a.5.5 0 01.86.46l-1.92 6.02A1 1 0 0013 10h7a1 1 0 01.78 1.63l-9.9 10.2a.5.5 0 01-.86-.46l1.92-6.02A1 1 0 0011 14z" /></svg>,
]

const sectorIcons = [
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-2" /></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
]

export default function About() {
  const { t } = useTranslation()

  const expertise = [
    { title: t('about.e1.title'), desc: t('about.e1.desc') },
    { title: t('about.e2.title'), desc: t('about.e2.desc') },
    { title: t('about.e3.title'), desc: t('about.e3.desc') },
    { title: t('about.e4.title'), desc: t('about.e4.desc') },
  ]

  const sectors = [
    { title: t('about.s1.title'), desc: t('about.s1.desc') },
    { title: t('about.s2.title'), desc: t('about.s2.desc') },
    { title: t('about.s3.title'), desc: t('about.s3.desc') },
    { title: t('about.s4.title'), desc: t('about.s4.desc') },
  ]

  const [ref, inView] = useInView()

  return (
    <section id="about" className="section" ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
      <div>
        <span className="section-label">{t('about.label')}</span>
        <h2 className="section-title">{t('about.title')}</h2>
        <p className="section-desc">{t('about.desc')}</p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
      }} className="about-grid">
        {/* Expertise */}
        <div className="card">
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28,
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'var(--accent-dim)', border: '1px solid var(--accent-mid)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-light)', flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{t('about.expertiseTitle')}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t('about.expertiseSub')}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {expertise.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-light)',
                }}>
                  {expertiseIcons[i]}
                </div>
                <div>
                  <div style={{
                    fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4,
                  }}>{item.title}</div>
                  <div style={{
                    fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.7,
                  }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sectors & References */}
        <div className="card">
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28,
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'var(--accent-dim)', border: '1px solid var(--accent-mid)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-light)', flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{t('about.sectorsTitle')}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t('about.sectorsSub')}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {sectors.map((sector, i) => (
              <div key={i} style={{
                padding: '14px 18px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6,
                }}>
                  <span style={{ color: 'var(--accent-light)', display: 'flex' }}>
                    {sectorIcons[i]}
                  </span>
                  <span style={{
                    fontSize: 13, fontWeight: 700, color: 'var(--text)',
                  }}>{sector.title}</span>
                </div>
                <div style={{
                  fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7,
                  paddingLeft: 28,
                }}>{sector.desc}</div>
              </div>
            ))}
          </div>

          {/* Kaggle badge */}
          <div style={{
            marginTop: 20, display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 16px', borderRadius: 10,
            background: 'var(--accent-dim)', border: '1px solid var(--accent-mid)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent-light)">
              <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.238-.036.27l-6.555 6.344 6.836 8.507c.095.104.117.208.075.303z" />
            </svg>
            <span style={{
              fontSize: 12, fontWeight: 600, color: 'var(--accent-light)',
              fontFamily: 'var(--font-mono)',
            }}>{t('about.kaggle')}</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 380px) {
          .about-grid .card { padding: 20px 16px !important; }
        }
      `}</style>
    </section>
  )
}
