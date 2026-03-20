import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'

export default function Articles({ limit, searchQuery = '' }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const { t, lang } = useTranslation()

  useEffect(() => {
    fetchArticles().then(data => {
      setArticles(data)
      setLoading(false)
    })
  }, [])

  const filtered = searchQuery
    ? articles.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : articles

  const display = limit ? filtered.slice(0, limit) : filtered

  if (loading) {
    return (
      <section id="articles" className="section">
        <div className="animate-in">
          <span className="section-label">{t('articles.label')}</span>
          <h2 className="section-title">{t('articles.title')}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="card" style={{ height: 120, opacity: 0.3 }} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="articles" className="section">
      <div className="animate-in">
        <span className="section-label">{t('articles.label')}</span>
        <h2 className="section-title">{t('articles.title')}</h2>
        <p className="section-desc">{t('articles.desc')}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {display.map((article, i) => (
          <Link
            key={i}
            to={`/blog/${article.slug}`}
            className="card article-card"
            style={{
              display: 'grid', gridTemplateColumns: article.thumbnail ? '120px 1fr auto' : '1fr auto',
              gap: 24, alignItems: 'center', textDecoration: 'none', cursor: 'pointer',
            }}
          >
            {article.thumbnail && (
              <div style={{
                width: 120, height: 80, borderRadius: 'var(--radius-sm)',
                overflow: 'hidden', flexShrink: 0,
                background: 'var(--bg)',
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
                display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8,
              }}>
                <span style={{
                  fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
                }}>{formatDate(article.pubDate, lang)}</span>
                <span style={{
                  fontSize: 11, color: 'var(--accent-light)', fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}>{article.readTime}</span>
              </div>
              <h3 style={{
                fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8,
                lineHeight: 1.4,
              }}>{article.title}</h3>
              <p style={{
                fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>{article.description}</p>
              {article.categories.length > 0 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                  {article.categories.slice(0, 4).map(tag => (
                    <span key={tag} style={{
                      padding: '3px 10px', borderRadius: 6, fontSize: 10, fontWeight: 500,
                      background: 'var(--bg)', border: '1px solid var(--border)',
                      color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
                    }}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="var(--text-muted)" strokeWidth="1.8" strokeLinecap="round"
              style={{ flexShrink: 0, opacity: 0.4 }}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ))}
      </div>

      {!limit && searchQuery && display.length === 0 && !loading && (
        <div style={{
          textAlign: 'center', padding: '48px 20px',
          color: 'var(--text-muted)', fontSize: 14,
        }}>
          {t('blog.noResults')}
        </div>
      )}

      {limit && articles.length > limit && (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/blog" className="btn btn-outline">
            {t('articles.seeAll')} ({articles.length})
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .article-card {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .article-card img { width: 100% !important; height: 180px !important; }
          .article-card > div:first-child { width: 100% !important; height: 180px !important; }
          .article-card > svg:last-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}

const monthsTR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
const monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthsDE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

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
