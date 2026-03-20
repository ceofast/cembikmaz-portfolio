import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setVisible(false)
    trackVisitor()
  }

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-wrapper" style={{
      position: 'fixed', bottom: 24, left: 24, right: 24,
      zIndex: 9999, display: 'flex', justifyContent: 'center',
      animation: 'fadeInUp 0.4s ease-out',
      pointerEvents: 'none',
    }}>
      <div style={{
        maxWidth: 520, width: '100%',
        background: 'var(--glass-solid)', backdropFilter: 'blur(20px)',
        border: '1px solid var(--border)', borderRadius: 'var(--radius)',
        padding: '20px 24px', pointerEvents: 'auto',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
      }}>
        <div style={{
          fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 6,
        }}>
          {t('cookie.title')}
        </div>
        <p style={{
          fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16,
        }}>
          {t('cookie.desc')}{' '}
          <Link to="/kvkk" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
            {t('cookie.policyLink')}
          </Link>{' '}
          {t('cookie.suffix')}
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={accept} className="btn btn-primary" style={{ fontSize: 13, padding: '8px 20px' }}>
            {t('cookie.accept')}
          </button>
          <button onClick={reject} className="btn btn-outline" style={{ fontSize: 13, padding: '8px 20px' }}>
            {t('cookie.reject')}
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .cookie-wrapper { bottom: 12px !important; left: 12px !important; right: 12px !important; }
        }
      `}</style>
    </div>
  )
}

async function trackVisitor() {
  try {
    const res = await fetch('https://ipapi.co/json/')
    if (!res.ok) return
    const geo = await res.json()
    const data = {
      ip: geo.ip,
      city: geo.city,
      region: geo.region,
      country: geo.country_name,
      lat: geo.latitude,
      lon: geo.longitude,
      org: geo.org,
      timezone: geo.timezone,
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language,
    }

    const visitors = JSON.parse(localStorage.getItem('visitor-log') || '[]')
    visitors.push(data)
    localStorage.setItem('visitor-log', JSON.stringify(visitors))

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {})
  } catch {
    // Silently fail
  }
}
