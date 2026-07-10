import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Craft from '../components/Craft'
import Services from '../components/Services'
import Showcase from '../components/Showcase'
import About from '../components/About'
import Gallery from '../components/Gallery'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

function Home({ revealed }) {
  return (
    <>
      <Hero revealed={revealed} />
      <Marquee />
      <Craft />
      <Services />
      <Showcase />
      <About />
      <Gallery />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  )
}

export default Home
