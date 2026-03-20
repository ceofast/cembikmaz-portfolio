import Hero from '../components/Hero'
import About from '../components/About'
import Certifications from '../components/Certifications'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Articles from '../components/Articles'
import Consulting from '../components/Consulting'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Certifications />
      <div className="divider" />
      <Experience />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Articles limit={3} />
      <div className="divider" />
      <Consulting />
      <div className="divider" />
      <Contact />
      <Footer />
    </main>
  )
}
