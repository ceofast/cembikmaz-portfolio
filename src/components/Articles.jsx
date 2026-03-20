import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'

export default function Articles({ limit, searchQuery = '', activeCategory = null, onCategoryChange, showCategoryFilter = false }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const { t, lang } = useTranslation()
  const [ref, inView] = useInView()

  useEffect(() => {
    fetchArticles().then(data => {
      setArticles(data)
      setLoading(false)
    })
  }, [])

  // Collect all unique categories
  const allCategories = [...new Set(articles.flatMap(a => a.categories))].sort()

  let filtered = articles

  if (searchQuery) {
    const q = searchQuery.toLowerCase()
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.categories.some(c => c.toLowerCase().includes(q))
    )
  }

  if (activeCategory) {
    filtered = filtered.filter(a => a.categories.includes(activeCategory))
  }

  const display = limit ? filtered.slice(0, limit) : filtered

  if (loading) {
    return (
      <section id="articles" className="section">
        <div>
          <span className="section-label">{t('articles.label')}</span>
          <h2 className="section-title">{t('articles.title')}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="card skeleton-shimmer" style={{ height: 100 }} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="articles" className="section" ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
      <div>
        <span className="section-label">{t('articles.label')}</span>
        <h2 className="section-title">{t('articles.title')}</h2>
        <p className="section-desc">{t('articles.desc')}</p>
      </div>

      {/* Category Filter */}
      {showCategoryFilter && allCategories.length > 0 && (
        <div style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32,
        }}>
          <button
            onClick={() => onCategoryChange?.(null)}
            style={{
              padding: '6px 16px', borderRadius: 980, fontSize: 13, fontWeight: 500,
              border: 'none', cursor: 'pointer',
              background: !activeCategory ? 'var(--text)' : 'var(--bg-card)',
              color: !activeCategory ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {t('blog.filter.all')}
          </button>
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange?.(activeCategory === cat ? null : cat)}
              style={{
                padding: '6px 16px', borderRadius: 980, fontSize: 13, fontWeight: 500,
                border: 'none', cursor: 'pointer',
                background: activeCategory === cat ? 'var(--text)' : 'var(--bg-card)',
                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {display.map((article, i) => (
          <Link
            key={i}
            to={`/blog/${article.slug}`}
            className="card article-card"
            style={{
              display: 'grid', gridTemplateColumns: article.thumbnail ? '100px 1fr auto' : '1fr auto',
              gap: 20, alignItems: 'center', textDecoration: 'none', cursor: 'pointer',
            }}
          >
            {article.thumbnail && (
              <div style={{
                width: 100, height: 68, borderRadius: 'var(--radius-sm)',
                overflow: 'hidden', flexShrink: 0,
              }}>
                <img
                  src={article.thumbnail}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            )}
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6,
              }}>
                <span style={{
                  fontSize: 13, color: 'var(--text-muted)',
                }}>{formatDate(article.pubDate, lang)}</span>
                <span style={{
                  fontSize: 12, color: 'var(--accent)',
                  fontWeight: 500,
                }}>{article.readTime}</span>
              </div>
              <h3 style={{
                fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 6,
                lineHeight: 1.4,
              }}>{article.title}</h3>
              <p style={{
                fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>{article.description}</p>
              {article.categories.length > 0 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                  {article.categories.slice(0, 4).map(tag => (
                    <span key={tag} style={{
                      padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 500,
                      background: 'var(--bg)', color: 'var(--text-muted)',
                    }}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"
              style={{ flexShrink: 0, opacity: 0.3 }}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ))}
      </div>

      {!limit && searchQuery && display.length === 0 && !loading && (
        <div style={{
          textAlign: 'center', padding: '48px 20px',
          color: 'var(--text-muted)', fontSize: 15,
        }}>
          {t('blog.noResults')}
        </div>
      )}

      {limit && articles.length > limit && (
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <Link to="/blog" className="btn btn-outline">
            {t('articles.seeAll')} ({articles.length})
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .article-card {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .article-card img { width: 100% !important; height: 160px !important; }
          .article-card > div:first-child { width: 100% !important; height: 160px !important; }
          .article-card > svg:last-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}

const monthsTR = ['Ocak', '\u015Eubat', 'Mart', 'Nisan', 'May\u0131s', 'Haziran', 'Temmuz', 'A\u011Fustos', 'Eyl\u00FCl', 'Ekim', 'Kas\u0131m', 'Aral\u0131k']
const monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthsDE = ['Januar', 'Februar', 'M\u00E4rz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

function formatDate(dateStr, lang = 'tr') {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const months = lang === 'de' ? monthsDE : lang === 'en' ? monthsEN : monthsTR
  if (lang === 'en') {
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  }
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

async function fetchArticles() {
  try {
    const res = await fetch('/api/articles')
    if (!res.ok) throw new Error('API failed')
    const data = await res.json()
    return data.articles || []
  } catch {
    return []
  }
}

export { fetchArticles, formatDate }
