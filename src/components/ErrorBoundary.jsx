import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 32, textAlign: 'center',
        }}>
          <div style={{ maxWidth: 420 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, margin: '0 auto 24px',
              background: 'var(--accent-dim)', border: '1px solid var(--accent-mid)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 style={{
              fontSize: 24, fontWeight: 700, color: 'var(--text)',
              marginBottom: 12, letterSpacing: -0.5,
            }}>
              {this.props.title || 'Bir hata oluştu'}
            </h1>
            <p style={{
              fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7,
              marginBottom: 32,
            }}>
              {this.props.description || 'Sayfa yüklenirken beklenmeyen bir hata meydana geldi.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              {this.props.reloadText || 'Sayfayı Yenile'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
              </svg>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
