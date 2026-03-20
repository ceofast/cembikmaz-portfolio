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
          <div style={{ maxWidth: 400 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, margin: '0 auto 20px',
              background: 'rgba(255,59,48,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 style={{
              fontSize: 22, fontWeight: 600, color: '#1d1d1f',
              marginBottom: 10,
            }}>
              {this.props.title || 'Bir hata olu\u015Ftu'}
            </h1>
            <p style={{
              fontSize: 15, color: '#6e6e73', lineHeight: 1.6,
              marginBottom: 28,
            }}>
              {this.props.description || 'Sayfa y\u00FCklenirken beklenmeyen bir hata meydana geldi.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 980,
                background: '#1d1d1f', color: '#fff',
                fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer',
              }}
            >
              {this.props.reloadText || 'Sayfay\u0131 Yenile'}
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
