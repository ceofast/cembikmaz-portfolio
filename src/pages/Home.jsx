import Hero from '../components/Hero'
import About from '../components/About'
import Certifications from '../components/Certifications'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Articles from '../components/Articles'
import Testimonials from '../components/Testimonials'
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
      <SectionBand gray><Testimonials /></SectionBand>
      <SectionBand><Consulting /></SectionBand>
      <SectionBand><Articles limit={3} /></SectionBand>
      <SectionBand gray><Contact /></SectionBand>
      <Footer />
    </main>
  )
}
