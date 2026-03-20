import { useState } from 'react'
import DOMPurify from 'dompurify'
import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [ref, inView] = useInView()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const sanitized = {
        name: DOMPurify.sanitize(form.name.trim()),
        email: DOMPurify.sanitize(form.email.trim()),
        message: DOMPurify.sanitize(form.message.trim()),
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitized),
      })

      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const links = [
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22,7 12,13 2,7" /></svg>,
      label: t('contact.email'),
      value: 'cembikmaz@outlook.com',
      href: 'mailto:cembikmaz@outlook.com',
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
      label: t('contact.phone'),
      value: '+90 543 560 29 11',
      href: 'tel:+905435602911',
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077b5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
      label: 'LinkedIn',
      value: 'cembikmaz',
      href: 'https://www.linkedin.com/in/cembikmaz/',
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text)"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
      label: 'GitHub',
      value: 'ceofast',
      href: 'https://github.com/ceofast',
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text)"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" /></svg>,
      label: 'Medium',
      value: '@cembikmaz.ie',
      href: 'https://medium.com/@cembikmaz.ie',
    },
  ]

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)', color: 'var(--text)',
    fontSize: 15, fontFamily: 'var(--font-sans)',
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" className="section" ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
      <div>
        <span className="section-label">{t('contact.label')}</span>
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-desc">{t('contact.desc')}</p>
      </div>

      <div className="contact-layout" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
      }}>
        {/* Contact Form */}
        <div className="card">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="contact-name" style={{
                display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)',
                marginBottom: 6,
              }}>{t('contact.form.name')}</label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div>
              <label htmlFor="contact-email" style={{
                display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)',
                marginBottom: 6,
              }}>{t('contact.form.email')}</label>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div>
              <label htmlFor="contact-message" style={{
                display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)',
                marginBottom: 6,
              }}>{t('contact.form.message')}</label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {status === 'success' && (
              <div style={{
                padding: '10px 16px', borderRadius: 'var(--radius-sm)',
                background: 'rgba(52,199,89,0.06)',
                fontSize: 14, color: '#248a3d', lineHeight: 1.5,
              }}>{t('contact.form.success')}</div>
            )}
            {status === 'error' && (
              <div style={{
                padding: '10px 16px', borderRadius: 'var(--radius-sm)',
                background: 'rgba(255,59,48,0.06)',
                fontSize: 14, color: '#d70015', lineHeight: 1.5,
              }}>{t('contact.form.error')}</div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn btn-primary"
              style={{ alignSelf: 'flex-start', opacity: status === 'sending' ? 0.6 : 1 }}
            >
              {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>

        {/* Contact Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={`${link.label}: ${link.value}`}
              className="card"
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                textDecoration: 'none', cursor: 'pointer', padding: '16px 20px',
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: 'var(--bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', flexShrink: 0,
              }}>{link.icon}</div>
              <div>
                <div style={{
                  fontSize: 12, fontWeight: 500, color: 'var(--text-muted)',
                  marginBottom: 2,
                }}>{link.label}</div>
                <div style={{
                  fontSize: 15, fontWeight: 500, color: 'var(--text)',
                }}>{link.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
