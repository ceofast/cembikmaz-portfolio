import { useState, useEffect } from 'react'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 800)
    const remove = setTimeout(() => setVisible(false), 1200)
    return () => { clearTimeout(timer); clearTimeout(remove) }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.4s ease',
      pointerEvents: fadeOut ? 'none' : 'auto',
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        animation: 'fadeInUp 0.5s ease',
      }}>
        <div style={{
          fontSize: 24, fontWeight: 700, letterSpacing: -1,
          background: 'linear-gradient(135deg, var(--hero-grad-start), var(--accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          CB
        </div>
        <div style={{
          width: 32, height: 2, borderRadius: 1,
          background: 'var(--accent)', opacity: 0.4,
          animation: 'shimmer 1s ease infinite',
          backgroundSize: '200% 100%',
          backgroundImage: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 50%, var(--accent) 100%)',
        }} />
      </div>
    </div>
  )
}
