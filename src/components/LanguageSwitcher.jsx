import { useState, useRef, useEffect } from 'react'
import { useTranslation } from '../i18n/LanguageContext'

const langs = [
  { code: 'tr', label: 'TR', flag: '🇹🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
]

export default function LanguageSwitcher() {
  const { lang, switchLang } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const current = langs.find(l => l.code === lang)

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label={`Language: ${current.label}`}
        aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', borderRadius: 8,
          background: 'var(--accent-dim)', border: '1px solid var(--accent-mid)',
          color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'var(--font-mono)',
          transition: 'all 0.2s',
        }}
      >
        <span style={{ fontSize: 14 }}>{current.flag}</span>
        {current.label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          background: 'rgba(17,17,19,0.97)', backdropFilter: 'blur(20px)',
          border: '1px solid var(--border)', borderRadius: 10,
          padding: 4, minWidth: 110, zIndex: 200,
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.15s ease-out',
        }}>
          {langs.map(l => (
            <button
              key={l.code}
              onClick={() => { switchLang(l.code); setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                width: '100%', padding: '8px 12px', borderRadius: 7,
                background: l.code === lang ? 'var(--accent-dim)' : 'transparent',
                border: 'none', cursor: 'pointer', fontSize: 12,
                fontWeight: l.code === lang ? 600 : 400,
                color: l.code === lang ? 'var(--accent-light)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)', transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (l.code !== lang) e.currentTarget.style.background = 'var(--bg)' }}
              onMouseLeave={e => { if (l.code !== lang) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: 14 }}>{l.flag}</span>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
