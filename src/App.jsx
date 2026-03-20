import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { LanguageProvider, useTranslation } from './i18n/LanguageContext'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import CookieConsent from './components/CookieConsent'

const Blog = lazy(() => import('./pages/Blog'))
const ArticleView = lazy(() => import('./pages/ArticleView'))
const KVKK = lazy(() => import('./pages/KVKK'))
const NotFound = lazy(() => import('./pages/NotFound'))

function Loading() {
  const { t } = useTranslation()
  return (
    <div style={{
      minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)'
    }}>
      {t('loading')}
    </div>
  )
}

const pageTitles = {
  '/': 'Cem Bıkmaz — Data Scientist & ML Engineer',
  '/blog': 'Blog — Cem Bıkmaz',
  '/kvkk': 'Privacy Policy — Cem Bıkmaz',
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppContent() {
  const location = useLocation()
  const { t } = useTranslation()

  useEffect(() => {
    const title = pageTitles[location.pathname] || 'Cem Bıkmaz — Data Scientist & ML Engineer'
    document.title = title
  }, [location.pathname])

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <div id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<ArticleView />} />
            <Route path="/kvkk" element={<KVKK />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
      <BackToTop />
      <CookieConsent />
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ErrorBoundary>
  )
}
