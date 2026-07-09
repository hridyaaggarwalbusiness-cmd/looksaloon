import { useCallback, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Craft from './components/Craft'
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
import IntroReveal from './components/IntroReveal'

function App() {
  const [introDone, setIntroDone] = useState(false)
  const handleIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <>
      <IntroReveal onDone={handleIntroDone} />
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <main id="main" className={introDone ? 'is-revealed' : ''}>
        <Hero revealed={introDone} />
        <Marquee />
        <Craft />
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
