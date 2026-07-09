import { useState } from 'react'
import Reveal from './Reveal'
import { useContent } from '../hooks/useContent'

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
  const { faq } = useContent()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section faq">
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

export default FAQ
