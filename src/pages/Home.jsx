import Hero from '../components/Hero'
import About from '../components/About'
import Certifications from '../components/Certifications'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Articles from '../components/Articles'
import Consulting from '../components/Consulting'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function SectionBand({ gray, children }) {
  return (
    <div style={{
      background: gray ? 'var(--bg-soft)' : 'var(--bg)',
      transition: 'background 0.3s ease',
    }}>
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionBand gray><About /></SectionBand>
      <SectionBand><Certifications /></SectionBand>
      <SectionBand gray><Experience /></SectionBand>
      <SectionBand><Projects /></SectionBand>
      <SectionBand gray><Articles limit={3} /></SectionBand>
      <SectionBand><Consulting /></SectionBand>
      <SectionBand gray><Contact /></SectionBand>
      <Footer />
    </main>
  )
}
