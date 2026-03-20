import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'
import Footer from '../components/Footer'

export default function KVKK() {
  const { t } = useTranslation()

  return (
    <main style={{ paddingTop: 100 }}>
      <div className="section" style={{ maxWidth: 720 }}>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--text-muted)', marginBottom: 32,
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.target.style.color = 'var(--text)'}
          onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t('privacy.back')}
        </Link>

        <span className="section-label">{t('privacy.label')}</span>
        <h1 className="section-title">{t('privacy.title')}</h1>
        <p className="section-desc">{t('privacy.subtitle')}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Section title={t('privacy.s1.title')}>
            <p>{t('privacy.s1.text')}</p>
          </Section>

          <Section title={t('privacy.s2.title')}>
            <p>{t('privacy.s2.intro')}</p>
            <ul>
              <li>{t('privacy.s2.i1')}</li>
              <li>{t('privacy.s2.i2')}</li>
              <li>{t('privacy.s2.i3')}</li>
              <li>{t('privacy.s2.i4')}</li>
              <li>{t('privacy.s2.i5')}</li>
              <li>{t('privacy.s2.i6')}</li>
            </ul>
          </Section>

          <Section title={t('privacy.s3.title')}>
            <p>{t('privacy.s3.intro')}</p>
            <ul>
              <li>{t('privacy.s3.i1')}</li>
              <li>{t('privacy.s3.i2')}</li>
              <li>{t('privacy.s3.i3')}</li>
              <li>{t('privacy.s3.i4')}</li>
            </ul>
          </Section>

          <Section title={t('privacy.s4.title')}>
            <p>{t('privacy.s4.text')}</p>
          </Section>

          <Section title={t('privacy.s5.title')}>
            <p>{t('privacy.s5.intro')}</p>
            <ul>
              <li><strong>{t('privacy.s5.i1.label')}</strong> {t('privacy.s5.i1.text')}</li>
              <li><strong>{t('privacy.s5.i2.label')}</strong> {t('privacy.s5.i2.text')}</li>
            </ul>
          </Section>

          <Section title={t('privacy.s6.title')}>
            <p>{t('privacy.s6.intro')}</p>
            <ul>
              <li>{t('privacy.s6.i1')}</li>
              <li>{t('privacy.s6.i2')}</li>
              <li>{t('privacy.s6.i3')}</li>
              <li>{t('privacy.s6.i4')}</li>
              <li>{t('privacy.s6.i5')}</li>
              <li>{t('privacy.s6.i6')}</li>
            </ul>
          </Section>

          <Section title={t('privacy.s7.title')}>
            <p>{t('privacy.s7.intro')}</p>
            <ul>
              <li><strong>E-posta:</strong> cembikmaz@outlook.com</li>
              <li><strong>Web:</strong> cembikmaz.com</li>
            </ul>
          </Section>

          <Section title={t('privacy.s8.title')}>
            <p>{t('privacy.s8.text')}</p>
          </Section>
        </div>
      </div>
      <Footer />
    </main>
  )
}

function Section({ title, children }) {
  return (
    <div className="card" style={{ padding: '24px 28px' }}>
      <h2 style={{
        fontSize: 16, fontWeight: 700, color: 'var(--text)',
        marginBottom: 12, lineHeight: 1.4,
      }}>{title}</h2>
      <div style={{
        fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8,
      }}>
        {children}
        <style>{`
          .card ul { margin: 12px 0 0 20px; }
          .card li { margin-bottom: 6px; }
        `}</style>
      </div>
    </div>
  )
}
