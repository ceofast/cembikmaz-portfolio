import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'
import useCountUp from '../hooks/useCountUp'

function AnimatedStat({ value, label, inView }) {
  const numericPart = parseInt(value) || 0
  const suffix = value.replace(/[0-9]/g, '')
  const count = useCountUp(numericPart, 1800, inView)

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 32, fontWeight: 700, color: 'var(--text)',
        letterSpacing: -1,
      }}>
        {inView ? count : 0}{suffix}
      </div>
      <div style={{
        fontSize: 12, color: 'var(--text-muted)', marginTop: 4,
        fontWeight: 500,
      }}>{label}</div>
    </div>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const [statsRef, statsInView] = useInView()

  const stats = [
    { value: '3+', label: t('hero.stat1') },
    { value: '63', label: t('hero.stat2') },
    { value: '5+', label: t('hero.stat3') },
    { value: '335', label: t('hero.stat4') },
  ]

  return (
    <section className="hero-section" aria-label="Hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '160px 32px 120px', position: 'relative',
    }}>
      <div style={{
        maxWidth: 'var(--max-width)', margin: '0 auto', width: '100%',
      }}>
        <div style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.25,0.1,0.25,1)' }}>
          {/* Status pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 980, marginBottom: 32,
            background: 'rgba(52,199,89,0.08)',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#34c759',
              animation: 'pulse-dot 2.5s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
              color: '#248a3d',
            }}>
              {t('hero.badge')}
            </span>
          </div>

          {/* Name */}
          <h1 style={{
            fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 700,
            lineHeight: 1.05, letterSpacing: -3, marginBottom: 24,
            color: 'var(--text)',
          }}>
            Cem B&#305;kmaz
          </h1>

          {/* Title */}
          <p style={{
            fontSize: 'clamp(20px, 2.5vw, 24px)', fontWeight: 400,
            color: 'var(--text-secondary)', lineHeight: 1.4,
            maxWidth: 500, marginBottom: 16,
          }}>
            <span style={{ fontWeight: 600, color: 'var(--text)' }}>{t('hero.title')}</span>{' '}
            {t('hero.titleAnd')}{' '}<span style={{ fontWeight: 600, color: 'var(--text)' }}>{t('hero.title2')}</span>
          </p>

          {/* Description */}
          <p style={{
            fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6,
            maxWidth: 480, marginBottom: 40,
          }}>
            {t('hero.desc')}
          </p>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-primary"
              onClick={e => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}>
              {t('hero.cta')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <Link to="/blog" className="btn btn-outline">
              {t('hero.articles')}
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="hero-stats" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20, marginTop: 100,
          opacity: statsInView ? 1 : 0,
          transform: statsInView ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          {stats.map((stat, i) => (
            <AnimatedStat key={i} value={stat.value} label={stat.label} inView={statsInView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            padding: 120px 24px 80px !important;
            min-height: auto !important;
          }
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            margin-top: 64px !important;
            gap: 32px 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
