import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DOMPurify from 'dompurify'
import { formatDate } from '../components/Articles'
import { useTranslation } from '../i18n/LanguageContext'
import Footer from '../components/Footer'

export default function ArticleView() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { t, lang } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch('/api/articles')
      .then(r => r.json())
      .then(data => {
        const found = (data.articles || []).find(a => a.slug === slug)
        if (found) {
          setArticle(found)
        } else {
          setError(true)
        }
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <main style={{ paddingTop: 120, minHeight: '80vh' }}>
        <div className="section" style={{ maxWidth: 760, textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 13,
            color: 'var(--text-muted)', animation: 'fadeIn 0.5s ease-out',
          }}>{t('articles.loading')}</div>
        </div>
      </main>
    )
  }

  if (error || !article) {
    return (
      <main style={{ paddingTop: 120, minHeight: '60vh' }}>
        <div className="section" style={{ textAlign: 'center' }}>
          <h2 className="section-title">{t('articles.notFound')}</h2>
          <p className="section-desc" style={{ margin: '0 auto 32px' }}>
            {t('articles.notFoundDesc')}
          </p>
          <Link to="/blog" className="btn btn-outline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t('articles.allArticles')}
          </Link>
        </div>
      </main>
    )
  }

  const sanitizedContent = DOMPurify.sanitize(article.content, {
    ADD_TAGS: ['iframe', 'figure', 'figcaption'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading'],
  })

  return (
    <main style={{ paddingTop: 100 }}>
      <article className="section" style={{ maxWidth: 760, paddingBottom: 60 }}>
        {/* Back link */}
        <Link to="/blog" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--text-muted)', marginBottom: 40,
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t('articles.allArticles')}
        </Link>

        {/* Article header */}
        <header style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
            }}>{formatDate(article.pubDate, lang)}</span>
            <span style={{
              fontSize: 11, color: 'var(--accent-light)', fontFamily: 'var(--font-mono)',
              fontWeight: 500,
            }}>{article.readTime}</span>
            <span style={{
              fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
            }}>{article.wordCount.toLocaleString(lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-US' : 'tr-TR')} {t('articles.words')}</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, lineHeight: 1.3,
            color: 'var(--text)', letterSpacing: -0.5, marginBottom: 20,
          }}>{article.title}</h1>

          {article.categories.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {article.categories.map(cat => (
                <span key={cat} style={{
                  padding: '5px 14px', borderRadius: 8, fontSize: 11, fontWeight: 500,
                  background: 'var(--accent-dim)', color: 'var(--accent-light)',
                  fontFamily: 'var(--font-mono)', letterSpacing: 0.3,
                }}>{cat}</span>
              ))}
            </div>
          )}

          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 16px', borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--accent-dim)', border: '1px solid var(--accent-mid)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: 'var(--accent-light)',
              fontFamily: 'var(--font-mono)',
            }}>CB</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                {article.creator || 'Cem Bıkmaz'}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {t('articles.authorTitle')}
              </div>
            </div>
          </div>
        </header>

        <div style={{ height: 1, background: 'var(--border)', marginBottom: 40 }} />

        {/* Article content - sanitized with DOMPurify */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        {/* Article footer */}
        <div style={{
          marginTop: 56, paddingTop: 32,
          borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ fontSize: 12 }}
          >
            {t('articles.viewOnMedium')}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <Link to="/blog" className="btn btn-outline" style={{ fontSize: 12 }}>
            {t('articles.otherArticles')}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </article>

      <style>{`
        .article-content {
          font-size: 16px;
          line-height: 1.85;
          color: var(--text-secondary);
        }
        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4 {
          color: var(--text);
          margin: 40px 0 16px;
          line-height: 1.35;
          letter-spacing: -0.3px;
        }
        .article-content h1 { font-size: 28px; font-weight: 800; }
        .article-content h2 { font-size: 22px; font-weight: 700; }
        .article-content h3 { font-size: 18px; font-weight: 700; }
        .article-content h4 { font-size: 16px; font-weight: 600; }
        .article-content p { margin-bottom: 20px; }
        .article-content img {
          max-width: 100%;
          border-radius: var(--radius-sm);
          margin: 28px 0;
          border: 1px solid var(--border);
        }
        .article-content figure { margin: 28px 0; }
        .article-content figcaption {
          text-align: center;
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 10px;
          font-style: italic;
        }
        .article-content a {
          color: var(--accent-light);
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: var(--accent-mid);
          transition: color 0.2s;
        }
        .article-content a:hover { color: var(--accent); }
        .article-content blockquote {
          border-left: 3px solid var(--accent);
          margin: 28px 0;
          padding: 16px 24px;
          background: var(--bg-card);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-style: italic;
          color: var(--text);
        }
        .article-content pre,
        .article-content code {
          font-family: var(--font-mono);
          font-size: 14px;
        }
        .article-content pre {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 20px 24px;
          overflow-x: auto;
          margin: 24px 0;
          line-height: 1.6;
        }
        .article-content code {
          background: var(--bg-card);
          padding: 2px 8px;
          border-radius: 4px;
          color: var(--accent-light);
        }
        .article-content pre code {
          background: none;
          padding: 0;
          color: var(--text-secondary);
        }
        .article-content ul,
        .article-content ol {
          margin: 16px 0 20px 24px;
        }
        .article-content li { margin-bottom: 8px; }
        .article-content strong { color: var(--text); font-weight: 600; }
        .article-content em { color: var(--text); }
        .article-content hr {
          border: none;
          height: 1px;
          background: var(--border);
          margin: 40px 0;
        }
        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 24px 0;
          font-size: 14px;
        }
        .article-content th,
        .article-content td {
          padding: 10px 14px;
          border: 1px solid var(--border);
          text-align: left;
        }
        .article-content th {
          background: var(--bg-card);
          color: var(--text);
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .article-content { font-size: 15px; }
          .article-content h1 { font-size: 24px; }
          .article-content h2 { font-size: 20px; }
          .article-content pre { padding: 14px 16px; font-size: 13px; }
        }
      `}</style>
      <Footer />
    </main>
  )
}
