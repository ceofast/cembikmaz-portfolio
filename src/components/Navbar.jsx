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
      padding: scrolled ? '12px 32px' : '20px 32px',
      background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: 'var(--max-width)', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/" style={{
          fontSize: 15, fontWeight: 600,
          color: 'var(--text)', letterSpacing: -0.3,
        }}>
          Cem Bıkmaz
        </Link>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 32,
        }} className="desktop-nav">
          {navKeys.map(link => (
            <Link
              key={link.key}
              to={link.href.startsWith('/#') ? '/' : link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: 13, fontWeight: 400, color: 'var(--text-muted)',
                transition: 'color 0.2s',
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
          background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)', padding: '8px 32px 16px',
        }}>
          {navKeys.map(link => (
            <Link
              key={link.key}
              to={link.href.startsWith('/#') ? '/' : link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                display: 'block', padding: '14px 0', fontSize: 15, fontWeight: 500,
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
          nav { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </nav>
  )
}
