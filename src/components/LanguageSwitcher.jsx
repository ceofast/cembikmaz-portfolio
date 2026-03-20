import { useState, useRef, useEffect } from 'react'
import { useTranslation } from '../i18n/LanguageContext'

const langs = [
  { code: 'tr', label: 'TR', flag: '\u{1F1F9}\u{1F1F7}' },
  { code: 'en', label: 'EN', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'de', label: 'DE', flag: '\u{1F1E9}\u{1F1EA}' },
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
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 10px', borderRadius: 8,
          background: 'var(--bg-card)', border: 'none',
          color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <span style={{ fontSize: 13 }}>{current.flag}</span>
        {current.label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)',
          border: '1px solid var(--border)', borderRadius: 12,
          padding: 4, minWidth: 110, zIndex: 200,
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          animation: 'fadeIn 0.15s ease-out',
        }}>
          {langs.map(l => (
            <button
              key={l.code}
              onClick={() => { switchLang(l.code); setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                width: '100%', padding: '8px 12px', borderRadius: 8,
                background: l.code === lang ? 'var(--bg-card)' : 'transparent',
                border: 'none', cursor: 'pointer', fontSize: 12,
                fontWeight: l.code === lang ? 600 : 400,
                color: l.code === lang ? 'var(--text)' : 'var(--text-secondary)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (l.code !== lang) e.currentTarget.style.background = 'var(--bg-card)' }}
              onMouseLeave={e => { if (l.code !== lang) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: 13 }}>{l.flag}</span>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
