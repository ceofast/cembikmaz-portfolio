import { useState } from 'react'
import { useTranslation } from '../i18n/LanguageContext'
import Articles from '../components/Articles'
import Footer from '../components/Footer'

export default function Blog() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="section" style={{ paddingBottom: 0 }}>
        {/* Search */}
        <div style={{
          position: 'relative', maxWidth: 480, marginBottom: 20,
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
              background: 'var(--bg-card)', border: '1px solid transparent',
              borderRadius: 980, color: 'var(--text)',
              fontSize: 15, fontFamily: 'var(--font-sans)',
              outline: 'none', transition: 'all 0.2s',
            }}
            onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,113,227,0.1)' }}
            onBlur={e => { e.target.style.borderColor = 'transparent'; e.target.style.boxShadow = 'none' }}
          />
        </div>
      </div>

      <Articles searchQuery={search} activeCategory={activeCategory} onCategoryChange={setActiveCategory} showCategoryFilter gridLayout />
      <Footer />
    </main>
  )
}
