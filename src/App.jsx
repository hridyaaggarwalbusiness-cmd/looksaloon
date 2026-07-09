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
import CursorGlow from './components/CursorGlow'

function App() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main id="main">
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
