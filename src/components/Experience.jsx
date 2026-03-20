import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'

const techStack = [
  { name: 'Python', color: '#3776ab' },
  { name: 'PyTorch', color: '#ee4c2c' },
  { name: 'TensorFlow', color: '#ff6f00' },
  { name: 'Scikit-learn', color: '#f7931e' },
  { name: 'LangChain', color: '#1c3c3c' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'PostgreSQL', color: '#4169e1' },
  { name: 'Pandas', color: '#150458' },
  { name: 'OpenCV', color: '#5c3ee8' },
  { name: 'Hugging Face', color: '#ffd21e' },
  { name: 'Apache Spark', color: '#e25a1c' },
  { name: 'MLflow', color: '#0194e2' },
  { name: 'Git', color: '#f05032' },
  { name: 'AWS', color: '#ff9900' },
  { name: 'Linux', color: '#333' },
]

export default function Experience() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  return (
    <section id="experience" className="section" ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
      <div>
        <span className="section-label">{t('experience.label')}</span>
        <h2 className="section-title">{t('experience.title')}</h2>
        <p className="section-desc">{t('experience.desc')}</p>
      </div>

      {/* LinkedIn CTA */}
      <div className="card" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 20, marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(0,119,181,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#0077b5', flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
              {t('experience.linkedinTitle')}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              {t('experience.linkedinDesc')}
            </div>
          </div>
        </div>
        <a
          href="https://www.linkedin.com/in/cembikmaz/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          {t('experience.linkedinBtn')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>

      {/* Tech Stack */}
      <div className="card" style={{ padding: '28px 30px' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
            {t('experience.techTitle')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {t('experience.techDesc')}
          </div>
        </div>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
        }}>
          {techStack.map((tech, i) => (
            <span
              key={tech.name}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 980,
                background: 'var(--bg-soft)',
                border: '1px solid var(--border)',
                fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                animation: inView ? `fadeInUp 0.4s ease ${i * 0.03}s both` : 'none',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = tech.color
                e.currentTarget.style.color = tech.color
                e.currentTarget.style.background = `${tech.color}08`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.background = 'var(--bg-soft)'
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: tech.color, flexShrink: 0,
              }} />
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
