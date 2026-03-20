import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useTranslation()

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/cembikmaz/', label: 'LinkedIn', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { href: 'https://github.com/ceofast', label: 'GitHub', d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
    { href: 'https://medium.com/@cembikmaz.ie', label: 'Medium', d: 'M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z' },
    { href: 'https://www.kaggle.com/cembikmaz', label: 'Kaggle', d: 'M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.238-.036.27l-6.555 6.344 6.836 8.507c.095.104.117.208.075.303z' },
  ]

  const navLinks = [
    { label: t('nav.about'), href: '/#about' },
    { label: t('nav.projects'), href: '/#projects' },
    { label: t('nav.blog'), href: '/blog' },
    { label: t('nav.consulting'), href: '/#consulting' },
    { label: t('nav.contact'), href: '/#contact' },
  ]

  return (
    <footer role="contentinfo" style={{
      borderTop: '1px solid var(--border)',
      padding: '48px 32px 32px',
    }}>
      <div style={{
        maxWidth: 'var(--max-width)', margin: '0 auto',
      }}>
        {/* Top row */}
        <div className="footer-grid" style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
          gap: 40, marginBottom: 40,
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8,
            }}>Cem Bıkmaz</div>
            <p style={{
              fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 280,
            }}>
              Data Scientist & ML Engineer
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{
              fontSize: 12, fontWeight: 600, color: 'var(--text-muted)',
              marginBottom: 16, letterSpacing: 0.5, textTransform: 'uppercase',
            }}>Navigation</div>
            {navLinks.map((link, i) => (
              <Link key={i} to={link.href.startsWith('/#') ? '/' : link.href} style={{
                display: 'block', fontSize: 14, color: 'var(--text-secondary)',
                marginBottom: 10, transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <div style={{
              fontSize: 12, fontWeight: 600, color: 'var(--text-muted)',
              marginBottom: 16, letterSpacing: 0.5, textTransform: 'uppercase',
            }}>Legal</div>
            <Link to="/kvkk" style={{
              display: 'block', fontSize: 14, color: 'var(--text-secondary)',
              marginBottom: 10, transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {t('footer.privacy')}
            </Link>
            <a href="mailto:cembikmaz@outlook.com" style={{
              display: 'block', fontSize: 14, color: 'var(--text-secondary)',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              cembikmaz@outlook.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 20,
          fontSize: 13, color: 'var(--text-muted)',
        }}>
          &copy; {new Date().getFullYear()} Cem B&#305;kmaz
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer { padding: 36px 24px 24px !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  )
}
