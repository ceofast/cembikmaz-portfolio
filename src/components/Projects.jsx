import { useTranslation } from '../i18n/LanguageContext'
import useInView from '../hooks/useInView'

export default function Projects() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  const projects = [
    {
      title: 'SQL Chat — Vanna AI',
      desc: t('projects.p1.desc'),
      tags: ['Python', 'LangChain', 'Vanna AI', 'MSSQL'],
      link: 'https://medium.com/@cembikmaz.ie/sql-veritaban%C4%B1n%C4%B1zla-sohbet-edin-vanna-ai-mssql-langchain-function-calling-ile-f47455130b9d',
      category: 'AI',
    },
    {
      title: 'ColPali + Qwen2 VL API',
      desc: t('projects.p2.desc'),
      tags: ['FastAPI', 'Vision LLM', 'ColPali', 'Python'],
      link: 'https://github.com/ceofast/colpali_qwen2_vl_fastapi',
      category: 'AI',
    },
    {
      title: 'DINOv3 Quantized Fine-tuning',
      desc: t('projects.p3.desc'),
      tags: ['PyTorch', 'DINOv3', 'Quantization'],
      link: 'https://github.com/ceofast/dinov3-quantized-finetuning',
      category: 'Deep Learning',
    },
    {
      title: t('projects.p4.title'),
      desc: t('projects.p4.desc'),
      tags: ['RAG', 'KAG', 'CAG', 'LLM'],
      link: 'https://medium.com/@cembikmaz.ie/kag-cag-ve-rag-hangi-yakla%C5%9F%C4%B1m-ne-i%CC%87%C5%9Fe-yarar-ff033df1c8ca',
      category: 'Research',
    },
    {
      title: 'Association Rule Learning',
      desc: t('projects.p5.desc'),
      tags: ['Python', 'Apriori', 'ML'],
      link: 'https://github.com/ceofast/association_rule_learning',
      category: 'ML',
    },
    {
      title: 'DART Algorithm',
      desc: t('projects.p6.desc'),
      tags: ['Gradient Boosting', 'DART', 'Research'],
      link: 'https://medium.com/@cembikmaz.ie/dart-dropouts-meet-multiple-additive-regression-trees-7c0924acd66d',
      category: 'Research',
    },
  ]

  return (
    <section id="projects" className="section" ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
      <div>
        <span className="section-label">{t('projects.label')}</span>
        <h2 className="section-title">{t('projects.title')}</h2>
        <p className="section-desc">{t('projects.desc')}</p>
      </div>

      <div className="projects-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16,
      }}>
        {projects.map((project, i) => (
          <a
            key={i}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{
              display: 'flex', flexDirection: 'column', textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 16,
            }}>
              <span style={{
                padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500,
                background: 'rgba(0,113,227,0.06)', color: 'var(--accent)',
                letterSpacing: 0.3,
              }}>{project.category}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"
                style={{ opacity: 0.4 }}>
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>

            <h3 style={{
              fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8,
              lineHeight: 1.3,
            }}>{project.title}</h3>

            <p style={{
              fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6,
              flex: 1, marginBottom: 20,
            }}>{project.desc}</p>

            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 6,
              borderTop: '1px solid var(--border)', paddingTop: 16,
            }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500,
                  background: 'var(--bg)', color: 'var(--text-muted)',
                }}>{tag}</span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
