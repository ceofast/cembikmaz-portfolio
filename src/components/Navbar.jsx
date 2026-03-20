import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

const navKeys = [
  { key: 'nav.about', href: '/#about', section: 'about' },
  { key: 'nav.experience', href: '/#experience', section: 'experience' },
  { key: 'nav.projects', href: '/#projects', section: 'projects' },
  { key: 'nav.blog', href: '/blog', section: null },
  { key: 'nav.consulting', href: '/#consulting', section: 'consulting' },
  { key: 'nav.contact', href: '/#contact', section: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const navRef = useRef(null)
  const location = useLocation()
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy
  useEffect(() => {
    if (location.pathname !== '/') { setActiveSection(null); return }

    const sections = navKeys
      .filter(n => n.section)
      .map(n => document.getElementById(n.section))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [location.pathname])

  // Update indicator position
  useEffect(() => {
    if (!navRef.current) return
    const activeLink = navRef.current.querySelector('[data-active="true"]')
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      })
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }))
    }
  }, [activeSection, location.pathname])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        e.preventDefault()
        document.getElementById(href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const isActive = (link) => {
    if (link.section && activeSection === link.section) return true
    if (link.href === '/blog' && location.pathname.startsWith('/blog')) return true
    return false
  }

  return (
    <nav role="navigation" aria-label="Main navigation" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '10px 32px' : '18px 32px',
      background: scrolled ? 'var(--glass)' : 'transparent',
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

        <div ref={navRef} style={{
          display: 'flex', alignItems: 'center', gap: 28,
          position: 'relative',
        }} className="desktop-nav">
          {/* Sliding indicator */}
          <div style={{
            position: 'absolute', bottom: -6, height: 2,
            background: 'var(--accent)', borderRadius: 1,
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: indicatorStyle.opacity,
          }} />

          {navKeys.map(link => (
            <Link
              key={link.key}
              data-active={isActive(link)}
              to={link.href.startsWith('/#') ? '/' : link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: 13, fontWeight: isActive(link) ? 600 : 400,
                color: isActive(link) ? 'var(--text)' : 'var(--text-muted)',
                transition: 'color 0.2s',
                position: 'relative', paddingBottom: 2,
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => { if (!isActive(link)) e.target.style.color = 'var(--text-muted)' }}
            >
              {t(link.key)}
            </Link>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mobile-controls">
          <ThemeToggle />
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
          background: 'var(--glass-solid)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)', padding: '8px 24px 16px',
          animation: 'slideDown 0.25s ease',
        }}>
          {navKeys.map((link, i) => (
            <Link
              key={link.key}
              to={link.href.startsWith('/#') ? '/' : link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 0', fontSize: 16, fontWeight: 500,
                color: isActive(link) ? 'var(--text)' : 'var(--text-secondary)',
                borderBottom: '1px solid var(--border)',
                animation: `fadeInUp 0.3s ease ${i * 0.04}s both`,
              }}
            >
              {t(link.key)}
              {isActive(link) && (
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              )}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .mobile-controls { display: none; align-items: center; gap: 8px; }
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
