import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 90,
        width: 44, height: 44, borderRadius: '50%',
        background: 'var(--glass)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-secondary)',
        transition: 'all 0.3s ease',
        animation: 'fadeIn 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--text)'
        e.currentTarget.style.color = '#fff'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--glass)'
        e.currentTarget.style.color = 'var(--text-secondary)'
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = '0 2px 12px var(--shadow)'
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
