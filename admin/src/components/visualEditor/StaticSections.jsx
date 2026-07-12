import { useServices } from '../../hooks/useServices'
import { useTestimonials } from '../../hooks/useTestimonials'
import { useSettings } from '../../hooks/useSettings'
import { useContent } from '../../hooks/useContent'
import { SERVICE_ICONS } from './serviceIcons'

const MARQUEE_ITEMS = [
  'Haircuts',
  'Global Color',
  'Bridal Styling',
  'Spa Rituals',
  'Manicure & Pedicure',
  'Facials',
  "Men's Grooming",
  'Balayage',
]

export function MarqueePreview() {
  const track = (
    <div className="marquee-track">
      {MARQUEE_ITEMS.map((item) => (
        <span className="marquee-item" key={item}>
          {item}
          <span className="marquee-dot" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" aria-hidden="true">
      {track}
      {track}
    </div>
  )
}

const CRAFT_TOOLS = [
  'Precision Cuts',
  'Styling & Blowouts',
  'Finish & Volume',
  'Color & Care',
  'Nail Studio',
  'Bridal Makeup',
]

export function CraftPreview() {
  return (
    <section className="section craft">
      <div className="container craft-inner">
        <div className="craft-heading">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Tools of the Trade
          </p>
          <h2 className="section-title">Every visit, hands-on craft.</h2>
          <p className="section-sub">
            From the first snip to the final finish — real tools, real technique, real care, in every
            chair at Looks Saloon.
          </p>
        </div>

        <div className="craft-strip">
          {CRAFT_TOOLS.map((label) => (
            <div className="craft-item" key={label}>
              <span className="craft-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesPreview() {
  const { services } = useServices()

  return (
    <section className="section services">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-line" /> What We Offer
          </p>
          <h2 className="section-title">Services, priced with total transparency.</h2>
          <p className="section-sub">
            Every treatment is performed by a certified specialist using premium, salon-grade products.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.id} className={`service-card ${service.popular ? 'service-card-popular' : ''}`}>
              {service.popular && <span className="service-tag">Most Popular</span>}
              <div className="service-icon">{SERVICE_ICONS[service.icon] || SERVICE_ICONS.sparkle}</div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="service-footer">
                <span className="service-price">{service.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const WHY_US_FEATURES = [
  { title: 'Certified Specialists', description: 'Every stylist and therapist is internationally certified and continuously trained.' },
  { title: 'Premium Products', description: 'We use only professional-grade, low-damage formulas trusted by top studios.' },
  { title: 'Hygienic & Safe', description: 'Hospital-grade sterilization and single-use tools for total peace of mind.' },
  { title: 'Personalized Consults', description: 'A one-on-one consultation before every service to nail the perfect result.' },
]

export function WhyUsPreview() {
  return (
    <section className="section why-us">
      <div className="container why-us-inner">
        <div className="why-us-heading">
          <p className="eyebrow">
            <span className="eyebrow-line" /> The Looks Saloon Difference
          </p>
          <h2 className="section-title">Little details. Bigger confidence.</h2>
          <p className="section-sub">
            Everything we do is designed around one goal: helping you feel effortlessly, unmistakably you.
          </p>
        </div>

        <div className="why-us-grid">
          {WHY_US_FEATURES.map((feature) => (
            <div className="why-us-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stars() {
  return (
    <div className="stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1L12 2Z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialsPreview() {
  const { testimonials } = useTestimonials()
  const current = testimonials[0]

  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Client Love
          </p>
          <h2 className="section-title">Don&rsquo;t just take our word for it.</h2>
        </div>

        {current && (
          <div className="testimonial-card">
            <svg className="quote-mark" width="42" height="34" viewBox="0 0 42 34" fill="none" aria-hidden="true">
              <path
                d="M12 0C5 3 0 10 0 18c0 9 6 16 15 16v-8c-4 0-7-3-7-7 0-1 0-2 1-3l9-2V0h-6ZM33 0c-7 3-12 10-12 18 0 9 6 16 15 16v-8c-4 0-7-3-7-7 0-1 0-2 1-3l9-2V0h-6Z"
                fill="currentColor"
              />
            </svg>
            <div className="testimonial-content">
              <Stars />
              <p className="testimonial-quote">&ldquo;{current.quote}&rdquo;</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{current.name}</span>
                <span className="testimonial-role">{current.role}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export function FAQPreview() {
  const { content } = useContent()
  const faq = content.faq

  return (
    <section className="section faq">
      <div className="container faq-inner">
        <div className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Good to Know
          </p>
          <h2 className="section-title">Frequently asked questions.</h2>
        </div>

        <div className="faq-list">
          {faq.map((item, index) => (
            <div className={`faq-item ${index === 0 ? 'is-open' : ''}`} key={item.q}>
              <div className="faq-question">
                <span>{item.q}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="faq-chevron">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactPreview() {
  const { settings } = useSettings()

  return (
    <section className="section contact">
      <div className="container contact-inner">
        <div className="contact-info">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Get In Touch
          </p>
          <h2 className="section-title">Reserve your chair today.</h2>
          <p className="section-sub">
            Tell us what you have in mind and our front desk will confirm your slot within the day.
          </p>

          <ul className="contact-list">
            <li>
              <div>
                <strong>Visit the Studio</strong>
                <span>{settings.address}</span>
              </div>
            </li>
            <li>
              <div>
                <strong>Call or WhatsApp</strong>
                <span>{settings.phone}</span>
              </div>
            </li>
            <li>
              <div>
                <strong>Email</strong>
                <span>{settings.email}</span>
              </div>
            </li>
            <li>
              <div>
                <strong>Studio Hours</strong>
                <span>{settings.hours}</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="contact-form-wrap">
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <div className="form-row">
              <label>
                <span>Full Name</span>
                <input type="text" placeholder="Jane Doe" readOnly />
              </label>
              <label>
                <span>Phone Number</span>
                <input type="tel" placeholder="+1 (555) 000-0000" readOnly />
              </label>
            </div>
            <label>
              <span>Email Address</span>
              <input type="email" placeholder="jane@example.com" readOnly />
            </label>
            <label>
              <span>Message (optional)</span>
              <textarea rows="3" placeholder="Anything we should know before your visit?" readOnly />
            </label>
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Request Appointment
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
