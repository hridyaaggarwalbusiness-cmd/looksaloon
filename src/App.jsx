import './App.css'

const SERVICES = [
  {
    name: 'Haircut & Styling',
    price: '$35+',
    description: 'Precision cuts and styling tailored to you, finished with a wash and blow-dry.',
  },
  {
    name: 'Hair Color',
    price: '$70+',
    description: 'Full color, balayage, or highlights using premium, low-damage formulas.',
  },
  {
    name: 'Manicure & Pedicure',
    price: '$45+',
    description: 'Classic or gel finishes with cuticle care and a relaxing hand and foot massage.',
  },
  {
    name: 'Facial Treatment',
    price: '$60+',
    description: 'Deep-cleansing facials customized to your skin type, leaving you refreshed.',
  },
  {
    name: 'Bridal Package',
    price: '$250+',
    description: 'Full hair, makeup, and styling package for your big day, trial session included.',
  },
  {
    name: "Men's Grooming",
    price: '$30+',
    description: 'Beard trims, hot towel shaves, and haircuts for the modern gentleman.',
  },
]

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a className="brand" href="#top">
          Looks Saloon
        </a>
        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="btn btn-primary" href="#contact">
          Book Now
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <p className="eyebrow">Hair &middot; Skin &middot; Nails</p>
        <h1>Look your best, every day.</h1>
        <p className="hero-sub">
          Looks Saloon is your neighborhood destination for expert haircuts, coloring,
          skincare, and nail care &mdash; delivered with care by experienced stylists.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contact">
            Book an Appointment
          </a>
          <a className="btn btn-secondary" href="#services">
            View Services
          </a>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-sub">Simple, transparent pricing for every service we offer.</p>
        <div className="services-grid">
          {SERVICES.map((service) => (
            <div className="service-card" key={service.name}>
              <div className="service-card-header">
                <h3>{service.name}</h3>
                <span className="service-price">{service.price}</span>
              </div>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="container about-inner">
        <div>
          <h2 className="section-title">About Looks Saloon</h2>
          <p>
            For over a decade, Looks Saloon has been a trusted name in beauty and grooming.
            Our team of licensed stylists and estheticians combines skill with genuine care to
            help every client look and feel their best.
          </p>
          <p>
            From quick trims to full bridal transformations, we treat every visit as a chance
            to make your day a little brighter.
          </p>
        </div>
        <dl className="about-stats">
          <div>
            <dt>10+</dt>
            <dd>Years of experience</dd>
          </div>
          <div>
            <dt>15</dt>
            <dd>Expert stylists</dd>
          </div>
          <div>
            <dt>5,000+</dt>
            <dd>Happy clients</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container contact-inner">
        <div>
          <h2 className="section-title">Visit or Contact Us</h2>
          <ul className="contact-list">
            <li>
              <strong>Address:</strong> 123 Main Street, Springfield
            </li>
            <li>
              <strong>Phone:</strong> <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </li>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:hello@lookssaloon.com">hello@lookssaloon.com</a>
            </li>
            <li>
              <strong>Hours:</strong> Tue&ndash;Sun, 9:00 AM &ndash; 7:00 PM
            </li>
          </ul>
          <a className="btn btn-primary" href="tel:+15551234567">
            Call to Book
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>&copy; {new Date().getFullYear()} Looks Saloon. All rights reserved.</span>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
