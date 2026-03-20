import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'
import Footer from '../components/Footer'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <main style={{ paddingTop: 100 }}>
      <div style={{
        minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 32, textAlign: 'center',
      }}>
        <div style={{ maxWidth: 460 }}>
          <div style={{
            fontSize: 72, fontWeight: 900, color: 'var(--border-hover)',
            fontFamily: 'var(--font-mono)', lineHeight: 1, marginBottom: 16,
            letterSpacing: -4,
          }}>404</div>
          <h1 style={{
            fontSize: 24, fontWeight: 700, color: 'var(--text)',
            marginBottom: 12, letterSpacing: -0.5,
          }}>
            {t('notFound.title')}
          </h1>
          <p style={{
            fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7,
            marginBottom: 36,
          }}>
            {t('notFound.desc')}
          </p>
          <Link to="/" className="btn btn-primary">
            {t('notFound.cta')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
