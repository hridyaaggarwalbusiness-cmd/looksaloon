import Reveal from './Reveal'

const ICONS = {
  scissors: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 7.5 20 18M8.5 16.5 20 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  color: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3c4 3.6 7 7.4 7 11a7 7 0 1 1-14 0c0-3.6 3-7.4 7-11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8.5 14.5c0 2 1.6 3.5 3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  hand: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M7 12V6a1.6 1.6 0 0 1 3.2 0v4.4M10.2 10V4.6a1.6 1.6 0 0 1 3.2 0V10M13.4 10.2V5.8a1.6 1.6 0 0 1 3.2 0V13M7 12c-2.6-1.4-4 .3-3 2 1.8 3 4 6 8 6h1.6c3 0 5.4-2.4 5.7-5.4l.5-4.6a1.5 1.5 0 0 0-3-.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  crown: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M4 18h16l-1.4-8-4 3.4L12 8l-2.6 5.4-4-3.4L4 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M5 19c9 0 14-5 14-14-9 0-14 5-14 14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6 18c3-5 6-8 12-11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
}

const SERVICES = [
  {
    icon: 'scissors',
    name: 'Precision Haircut & Styling',
    price: 'From ₹899',
    description: 'A tailored cut and blow-dry finish, shaped to your face and lifestyle.',
  },
  {
    icon: 'color',
    name: 'Global Color & Balayage',
    price: 'From ₹2,499',
    description: 'Dimensional color, balayage, and gloss treatments in low-damage formulas.',
    popular: true,
  },
  {
    icon: 'sparkle',
    name: 'Luxe Facials & Skin Therapy',
    price: 'From ₹1,499',
    description: 'Deep-cleansing, brightening, and anti-aging facials for every skin type.',
  },
  {
    icon: 'hand',
    name: 'Manicure & Pedicure',
    price: 'From ₹999',
    description: 'Classic, gel, or nail art finishes with restorative hand and foot care.',
  },
  {
    icon: 'crown',
    name: 'Bridal & Occasion Styling',
    price: 'From ₹8,999',
    description: 'Full hair, makeup, and draping with a complimentary trial session.',
  },
  {
    icon: 'leaf',
    name: 'Spa & Body Rituals',
    price: 'From ₹1,999',
    description: 'Signature massages and body treatments designed to melt away stress.',
  },
]

function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> What We Offer
          </p>
          <h2 className="section-title">Services, priced with total transparency.</h2>
          <p className="section-sub">
            Every treatment is performed by a certified specialist using premium,
            salon-grade products.
          </p>
        </Reveal>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <Reveal
              as="article"
              className={`service-card ${service.popular ? 'service-card-popular' : ''}`}
              key={service.name}
              delay={index * 70}
            >
              {service.popular && <span className="service-tag">Most Popular</span>}
              <div className="service-icon">{ICONS[service.icon]}</div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="service-footer">
                <span className="service-price">{service.price}</span>
                <a href="#contact" className="service-link">
                  Book
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
