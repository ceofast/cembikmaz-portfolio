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
        <div style={{ maxWidth: 400 }}>
          <div style={{
            fontSize: 80, fontWeight: 700, color: 'rgba(0,0,0,0.06)',
            lineHeight: 1, marginBottom: 16, letterSpacing: -4,
          }}>404</div>
          <h1 style={{
            fontSize: 24, fontWeight: 600, color: 'var(--text)',
            marginBottom: 12,
          }}>
            {t('notFound.title')}
          </h1>
          <p style={{
            fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6,
            marginBottom: 32,
          }}>
            {t('notFound.desc')}
          </p>
          <Link to="/" className="btn btn-primary">
            {t('notFound.cta')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
