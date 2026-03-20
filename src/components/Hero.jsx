import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'
import useCountUp from '../hooks/useCountUp'
import RotatingText from './RotatingText'

function AnimatedStat({ value, label, inView }) {
  const numericPart = parseInt(value) || 0
  const suffix = value.replace(/[0-9]/g, '')
  const count = useCountUp(numericPart, 1800, inView)

  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{
        fontSize: 36, fontWeight: 700, color: 'var(--text)',
        letterSpacing: -1.5, lineHeight: 1,
      }}>
        {inView ? count : 0}{suffix}
      </div>
      <div style={{
        fontSize: 13, color: 'var(--text-muted)', marginTop: 8,
        fontWeight: 500, letterSpacing: 0.2,
      }}>{label}</div>
    </div>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const [statsRef, statsInView] = useInView()
  const [scrollY, setScrollY] = useState(0)
  const [gh, setGh] = useState({ repos: 63, followers: 335 })

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const cached = sessionStorage.getItem('gh-stats')
    if (cached) { setGh(JSON.parse(cached)); return }

    fetch('https://api.github.com/users/ceofast')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          const stats = { repos: data.public_repos, followers: data.followers }
          setGh(stats)
          sessionStorage.setItem('gh-stats', JSON.stringify(stats))
        }
      })
      .catch(() => {})
  }, [])

  const stats = [
    { value: '3+', label: t('hero.stat1') },
    { value: String(gh.repos), label: t('hero.stat2') },
    { value: '5+', label: t('hero.stat3') },
    { value: String(gh.followers), label: t('hero.stat4') },
  ]

  return (
    <section className="hero-section" aria-label="Hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '140px 32px 100px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Animated mesh gradient background */}
      <div className="hero-orb hero-orb-1" style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,113,227,0.05) 0%, transparent 60%)',
        filter: 'blur(60px)', pointerEvents: 'none',
        transform: `translateY(${scrollY * 0.08}px)`,
      }} />
      <div className="hero-orb hero-orb-2" style={{
        position: 'absolute', bottom: '-10%', left: '-10%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(147,51,234,0.04) 0%, transparent 60%)',
        filter: 'blur(60px)', pointerEvents: 'none',
        transform: `translateY(${scrollY * -0.05}px)`,
      }} />

      <div style={{
        maxWidth: 'var(--max-width)', margin: '0 auto', width: '100%',
        position: 'relative', zIndex: 1,
      }}>
        {/* Hero content: text + photo */}
        <div className="hero-content" style={{
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 48,
          alignItems: 'center',
        }}>
          <div style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.25,0.1,0.25,1)' }}>
            {/* Status pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 980, marginBottom: 32,
              background: 'rgba(52,199,89,0.08)', border: '1px solid rgba(52,199,89,0.12)',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: '#34c759',
                animation: 'pulse-dot 2.5s ease-in-out infinite',
              }} />
              <span style={{
                fontSize: 12, fontWeight: 500,
                color: '#248a3d',
              }}>
                {t('hero.badge')}
              </span>
            </div>

            {/* Name — gradient text */}
            <h1 aria-label="Cem Bıkmaz" style={{
              fontSize: 'clamp(44px, 7vw, 76px)', fontWeight: 700,
              lineHeight: 1.02, letterSpacing: -3.5, marginBottom: 24,
              background: 'linear-gradient(135deg, var(--hero-grad-start) 0%, var(--hero-grad-start) 50%, var(--hero-grad-end) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Cem B&#305;kmaz
            </h1>

            {/* Title */}
            <p style={{
              fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 400,
              color: 'var(--text-secondary)', lineHeight: 1.35,
              maxWidth: 520, marginBottom: 16,
            }}>
              <RotatingText
                words={['Data Scientist', 'ML Engineer', 'AI Consultant']}
                interval={3000}
                style={{ fontWeight: 600, color: 'var(--text)' }}
              />
            </p>

            {/* Description */}
            <p style={{
              fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.65,
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

          {/* Profile photo with parallax */}
          <div className="hero-photo" style={{
            animation: 'fadeIn 1s cubic-bezier(0.25,0.1,0.25,1) 0.3s both',
            transform: `translateY(${scrollY * 0.06}px)`,
            transition: 'transform 0s',
          }}>
            <div style={{
              width: 280, height: 340,
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 60px var(--shadow-lg)',
              position: 'relative',
            }}>
              <img
                src="/profile.jpg"
                alt="Cem Bıkmaz"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center top',
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="hero-stats" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          marginTop: 72,
          background: 'var(--bg-soft)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          opacity: statsInView ? 1 : 0,
          transform: statsInView ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}>
              <AnimatedStat value={stat.value} label={stat.label} inView={statsInView} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            padding: 110px 24px 64px !important;
            min-height: auto !important;
          }
          .hero-content {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .hero-photo {
            order: -1;
            justify-self: start;
          }
          .hero-photo > div {
            width: 140px !important;
            height: 170px !important;
            border-radius: 20px !important;
          }
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            margin-top: 48px !important;
          }
          .hero-stats > div:nth-child(2) { border-right: none !important; }
          .hero-stats > div:nth-child(1),
          .hero-stats > div:nth-child(2) { border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </section>
  )
}
