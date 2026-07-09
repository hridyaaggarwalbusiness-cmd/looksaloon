import { useCallback, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import WhyUs from './components/WhyUs'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import QuickActions from './components/QuickActions'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'

function App() {
  const [introDone, setIntroDone] = useState(false)
  const handleIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <>
      <Preloader onDone={handleIntroDone} />
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <main id="main" className={introDone ? 'is-revealed' : ''}>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Gallery />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <QuickActions />
    </>
  )
}

export default App
