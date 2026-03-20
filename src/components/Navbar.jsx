import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

const navKeys = [
  { key: 'nav.about', href: '/#about' },
  { key: 'nav.experience', href: '/#experience' },
  { key: 'nav.projects', href: '/#projects' },
  { key: 'nav.blog', href: '/blog' },
  { key: 'nav.consulting', href: '/#consulting' },
  { key: 'nav.contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        e.preventDefault()
        document.getElementById(href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav role="navigation" aria-label="Main navigation" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '14px 32px' : '22px 32px',
      background: scrolled ? 'rgba(9,9,11,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
    }}>
      <div style={{
        maxWidth: 'var(--max-width)', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/" style={{
          fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700,
          color: 'var(--text)', letterSpacing: -0.3, display: 'flex', alignItems: 'center', gap: 3,
        }}>
          Cem<span style={{ color: 'var(--accent)' }}> BIKMAZ</span>
        </Link>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 36,
        }} className="desktop-nav">
          {navKeys.map(link => (
            <Link
              key={link.key}
              to={link.href.startsWith('/#') ? '/' : link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: 13, fontWeight: 450, color: 'var(--text-muted)',
                transition: 'color 0.25s', letterSpacing: 0.1,
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              {t(link.key)}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="mobile-controls">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'none', background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, color: 'var(--text)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>
              }
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(9,9,11,0.98)', backdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--border)', padding: '12px 32px 20px',
        }}>
          {navKeys.map(link => (
            <Link
              key={link.key}
              to={link.href.startsWith('/#') ? '/' : link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                display: 'block', padding: '14px 0', fontSize: 14, fontWeight: 500,
                color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)',
              }}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .mobile-controls { display: none; align-items: center; gap: 12px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
          .mobile-menu-btn { display: block !important; }
          nav { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </nav>
  )
}
