import { useCallback, useEffect, useState } from 'react'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { useTestimonials } from '../../hooks/useTestimonials'
import { useSettings } from '../../hooks/useSettings'
import { useContent } from '../../hooks/useContent'

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
  {
    key: 'scissors',
    label: 'Precision Cuts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.5 7.5 20 18M8.5 16.5 20 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'comb',
    label: 'Styling & Blowouts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5.5 9a7.5 7.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path
          d="M5.5 9v3.6M8.2 6.3v4.3M11 5.5v5M13.8 6.3v4.3M16.5 9v3.6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: 'dryer',
    label: 'Finish & Volume',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="7.5" y="7" width="10" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 14v4.5a1.5 1.5 0 0 1-1.5 1.5H7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 8.3l2-1.1M19 12.7l2 1.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'spray',
    label: 'Color & Care',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="8" y="10" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 10V7h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M13 7V5.5a1 1 0 0 1 1-1h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M17.5 3.6l1 .6M18.4 5.8h1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'polish',
    label: 'Nail Studio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M10 4h4v3l1.5 1.6a3 3 0 0 1 .8 2V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-7.4a3 3 0 0 1 .8-2L10 7V4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M10 4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'brush',
    label: 'Bridal Makeup',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M14.5 8.8 7 16.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="17" cy="6.3" r="3.3" fill="currentColor" opacity="0.85" />
        <rect x="4.6" y="16.6" width="2.6" height="2.6" rx="0.6" transform="rotate(45 5.9 17.9)" fill="currentColor" opacity="0.85" />
      </svg>
    ),
  },
]

export function CraftPreview() {
  return (
    <section className="section craft" aria-label="Our craft">
      <div className="container craft-inner">
        <Reveal className="craft-heading" as="div">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Tools of the Trade
          </p>
          <h2 className="section-title">Every visit, hands-on craft.</h2>
          <p className="section-sub">
            From the first snip to the final finish — real tools, real technique, real care, in every
            chair at Looks Saloon.
          </p>
        </Reveal>

        <div className="craft-strip">
          {CRAFT_TOOLS.map((tool, index) => (
            <Reveal className="craft-item" key={tool.key} delay={index * 70}>
              <span className="craft-icon">{tool.icon}</span>
              <span className="craft-label">{tool.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const WHY_US_FEATURES = [
  {
    title: 'Certified Specialists',
    description: 'Every stylist and therapist is internationally certified and continuously trained.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l7 3.5v5c0 5-3 8.5-7 9.5-4-1-7-4.5-7-9.5v-5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Premium Products',
    description: 'We use only professional-grade, low-damage formulas trusted by top studios.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="8" y="8" width="8" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 8V5.5A2 2 0 0 1 12 3.5v0a2 2 0 0 1 2 2V8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Hygienic & Safe',
    description: 'Hospital-grade sterilization and single-use tools for total peace of mind.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l7 3.5v5c0 5-3 8.5-7 9.5-4-1-7-4.5-7-9.5v-5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Personalized Consults',
    description: 'A one-on-one consultation before every service to nail the perfect result.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 20c1.5-4.5 5-6.5 7-6.5s5.5 2 7 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function WhyUsPreview() {
  return (
    <section className="section why-us">
      <div className="container why-us-inner">
        <Reveal className="why-us-heading" as="div">
          <p className="eyebrow">
            <span className="eyebrow-line" /> The Looks Saloon Difference
          </p>
          <h2 className="section-title">Little details. Bigger confidence.</h2>
          <p className="section-sub">
            Everything we do is designed around one goal: helping you feel effortlessly, unmistakably you.
          </p>
        </Reveal>

        <div className="why-us-grid">
          {WHY_US_FEATURES.map((feature, index) => (
            <Reveal className="card-wrap" variant="3d" key={feature.title} delay={index * 80}>
              <TiltCard className="why-us-card" tiltMax={8}>
                <div className="why-us-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </TiltCard>
            </Reveal>
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
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index >= testimonials.length) setIndex(0)
  }, [testimonials.length, index])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (testimonials.length < 2) return undefined
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, testimonials.length])

  const current = testimonials[index]

  return (
    <section className="section testimonials">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Client Love
          </p>
          <h2 className="section-title">Don&rsquo;t just take our word for it.</h2>
        </Reveal>

        {current && (
          <Reveal className="testimonial-card" delay={100}>
            <svg className="quote-mark" width="42" height="34" viewBox="0 0 42 34" fill="none" aria-hidden="true">
              <path
                d="M12 0C5 3 0 10 0 18c0 9 6 16 15 16v-8c-4 0-7-3-7-7 0-1 0-2 1-3l9-2V0h-6ZM33 0c-7 3-12 10-12 18 0 9 6 16 15 16v-8c-4 0-7-3-7-7 0-1 0-2 1-3l9-2V0h-6Z"
                fill="currentColor"
              />
            </svg>
            <div className="testimonial-content" key={current.id}>
              <Stars />
              <p className="testimonial-quote">&ldquo;{current.quote}&rdquo;</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{current.name}</span>
                <span className="testimonial-role">{current.role}</span>
              </div>
            </div>

            <div className="testimonial-controls">
              <button type="button" aria-label="Previous review" onClick={prev}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="testimonial-dots">
                {testimonials.map((review, i) => (
                  <button
                    key={review.id}
                    type="button"
                    className={i === index ? 'is-active' : ''}
                    aria-label={`Show review from ${review.name}`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
              <button type="button" aria-label="Next review" onClick={next}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
      <button type="button" className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{item.q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="faq-chevron">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="faq-answer">
        <p>{item.a}</p>
      </div>
    </div>
  )
}

export function FAQPreview() {
  const { content } = useContent()
  const faq = content.faq
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section faq">
      <div className="container faq-inner">
        <Reveal className="section-head" as="div">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Good to Know
          </p>
          <h2 className="section-title">Frequently asked questions.</h2>
        </Reveal>

        <Reveal className="faq-list" delay={100}>
          {faq.map((item, index) => (
            <FAQItem
              key={item.q}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export function ContactPreview() {
  const { settings } = useSettings()

  return (
    <section className="section contact">
      <div className="container contact-inner">
        <Reveal className="contact-info" as="div">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Get In Touch
          </p>
          <h2 className="section-title">Reserve your chair today.</h2>
          <p className="section-sub">
            Tell us what you have in mind and our front desk will confirm your slot within the day.
          </p>

          <ul className="contact-list">
            <li>
              <span className="contact-list-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              <div>
                <strong>Visit the Studio</strong>
                <span>{settings.address}</span>
              </div>
            </li>
            <li>
              <span className="contact-list-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 5c0 8.3 6.7 15 15 15l3-3-4.5-4.5-2 2A11 11 0 0 1 9.5 9.5l2-2L7 3 4 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <strong>Call or WhatsApp</strong>
                <span>{settings.phone}</span>
              </div>
            </li>
            <li>
              <span className="contact-list-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 6.5l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <strong>Email</strong>
                <span>{settings.email}</span>
              </div>
            </li>
            <li>
              <span className="contact-list-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <strong>Studio Hours</strong>
                <span>{settings.hours}</span>
              </div>
            </li>
          </ul>

          <div className="contact-map">
            <iframe
              title="Looks Saloon location map"
              src="https://www.google.com/maps?q=29.619166666667,74.289380555556&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <Reveal className="contact-form-wrap" delay={120}>
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <div className="form-row">
              <label>
                <span>Full Name</span>
                <input type="text" placeholder="Jane Doe" />
              </label>
              <label>
                <span>Phone Number</span>
                <input type="tel" placeholder="+1 (555) 000-0000" />
              </label>
            </div>
            <label>
              <span>Email Address</span>
              <input type="email" placeholder="jane@example.com" />
            </label>
            <label>
              <span>Message (optional)</span>
              <textarea rows="3" placeholder="Anything we should know before your visit?" />
            </label>
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Request Appointment
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
