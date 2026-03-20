import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="hero-section" aria-label="Hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '140px 32px 100px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient light */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 65%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-30%', left: '-15%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,30,50,0.15) 0%, transparent 65%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 'var(--max-width)', margin: '0 auto', width: '100%',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ animation: 'fadeInUp 0.9s cubic-bezier(0.25,0.1,0.25,1)' }}>
          {/* Status pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 18px', borderRadius: 100, marginBottom: 36,
            background: 'var(--accent-dim)', border: '1px solid var(--accent-mid)',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#34d399',
              animation: 'pulse-dot 2.5s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
              color: 'var(--accent-light)', letterSpacing: 0.5,
            }}>
              {t('hero.badge')}
            </span>
          </div>

          {/* Name */}
          <h1 style={{
            fontSize: 'clamp(44px, 6.5vw, 68px)', fontWeight: 800,
            lineHeight: 1.08, letterSpacing: -2.5, marginBottom: 28,
            color: 'var(--text)',
          }}>
            Cem B&#305;kmaz
          </h1>

          {/* Title */}
          <p style={{
            fontSize: 'clamp(17px, 2.2vw, 20px)', fontWeight: 400,
            color: 'var(--text-secondary)', lineHeight: 1.5,
            maxWidth: 540, marginBottom: 20,
          }}>
            <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>{t('hero.title')}</span>{' '}
            {t('hero.titleAnd')}{' '}<span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>{t('hero.title2')}</span>
          </p>

          {/* Description */}
          <p style={{
            fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8,
            maxWidth: 500, marginBottom: 44,
          }}>
            {t('hero.desc')}
          </p>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-primary"
              onClick={e => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}>
              {t('hero.cta')}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <Link to="/blog" className="btn btn-outline">
              {t('hero.articles')}
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1, marginTop: 96,
          background: 'var(--border)', borderRadius: 'var(--radius)',
          overflow: 'hidden',
          animation: 'fadeInUp 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.2s both',
        }}>
          {[
            { value: '3+', label: t('hero.stat1') },
            { value: '63', label: t('hero.stat2') },
            { value: '5+', label: t('hero.stat3') },
            { value: '335', label: t('hero.stat4') },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', padding: '28px 20px', textAlign: 'center',
            }}>
              <div style={{
                fontSize: 26, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: -0.5,
              }}>{stat.value}</div>
              <div style={{
                fontSize: 11, color: 'var(--text-muted)', marginTop: 6,
                fontWeight: 500, letterSpacing: 0.8, textTransform: 'uppercase',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            padding: 100px 20px 64px !important;
            min-height: auto !important;
          }
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            margin-top: 56px !important;
          }
        }
      `}</style>
    </section>
  )
}
