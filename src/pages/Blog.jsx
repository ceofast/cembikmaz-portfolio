import { useState, useMemo } from 'react'
import { useTranslation } from '../i18n/LanguageContext'
import Articles from '../components/Articles'
import Footer from '../components/Footer'

export default function Blog() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="section" style={{ paddingBottom: 0 }}>
        {/* Search */}
        <div style={{
          position: 'relative', maxWidth: 480, marginBottom: 40,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"
            style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('blog.search')}
            aria-label={t('blog.search')}
            style={{
              width: '100%', padding: '12px 16px 12px 44px',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', color: 'var(--text)',
              fontSize: 14, fontFamily: 'var(--font-sans)',
              outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-mid)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
      </div>

      <Articles searchQuery={search} />
      <Footer />
    </main>
  )
}
