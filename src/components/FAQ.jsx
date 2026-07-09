import { useState } from 'react'
import Reveal from './Reveal'

const FAQS = [
  {
    q: 'Do I need to book an appointment in advance?',
    a: 'Walk-ins are welcome whenever a chair is free, but we recommend booking ahead — especially on weekends and for color, bridal, or spa services — so we can hold your preferred time.',
  },
  {
    q: 'How do I confirm or reschedule my appointment?',
    a: 'Call or WhatsApp us directly and our front desk will confirm, reschedule, or answer any questions about your booking.',
  },
  {
    q: 'What safety and hygiene measures do you follow?',
    a: 'All tools are sanitized between every client, we use single-use items where applicable, and our stations are cleaned throughout the day.',
  },
  {
    q: 'Do you offer bridal and party packages?',
    a: 'Yes — our bridal and occasion styling includes a complimentary trial session so we can perfect your look before the big day.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept cash, UPI, and all major cards at the studio.',
  },
]

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

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section faq">
      <div className="container faq-inner">
        <Reveal className="section-head" as="div">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> Good to Know
          </p>
          <h2 className="section-title">Frequently asked questions.</h2>
        </Reveal>

        <Reveal className="faq-list" delay={100}>
          {FAQS.map((item, index) => (
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

export default FAQ
