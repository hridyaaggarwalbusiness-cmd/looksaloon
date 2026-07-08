import { useState } from 'react'
import Reveal from './Reveal'

const SERVICE_OPTIONS = [
  'Haircut & Styling',
  'Color & Balayage',
  'Facial & Skin Therapy',
  'Manicure & Pedicure',
  'Bridal & Occasion',
  'Spa & Body Ritual',
]

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact-inner">
        <Reveal className="contact-info" as="div">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> Get In Touch
          </p>
          <h2 className="section-title">Reserve your chair today.</h2>
          <p className="section-sub">
            Tell us what you have in mind and our front desk will confirm your slot
            within the day.
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
                <span>123 Marina Boulevard, Springfield</span>
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
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
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
                <a href="mailto:hello@lookssaloon.com">hello@lookssaloon.com</a>
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
                <span>Tue&ndash;Sun, 9:00 AM &ndash; 8:00 PM</span>
              </div>
            </li>
          </ul>

          <div className="contact-socials">
            <a href="#top" aria-label="Instagram">
              IG
            </a>
            <a href="#top" aria-label="Facebook">
              FB
            </a>
            <a href="#top" aria-label="WhatsApp">
              WA
            </a>
          </div>
        </Reveal>

        <Reveal className="contact-form-wrap" delay={120}>
          {submitted ? (
            <div className="contact-success">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3>Request received!</h3>
              <p>Thank you for reaching out. Our team will confirm your appointment shortly.</p>
              <button type="button" className="btn btn-ghost" onClick={() => setSubmitted(false)}>
                Send another request
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  <span>Full Name</span>
                  <input type="text" name="name" placeholder="Jane Doe" required />
                </label>
                <label>
                  <span>Phone Number</span>
                  <input type="tel" name="phone" placeholder="+1 (555) 000-0000" required />
                </label>
              </div>
              <label>
                <span>Email Address</span>
                <input type="email" name="email" placeholder="jane@example.com" required />
              </label>
              <label>
                <span>Service Interested In</span>
                <select name="service" defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Preferred Date</span>
                <input type="date" name="date" />
              </label>
              <label>
                <span>Message (optional)</span>
                <textarea name="message" rows="3" placeholder="Anything we should know before your visit?" />
              </label>
              <button type="submit" className="btn btn-primary btn-lg btn-block">
                Request Appointment
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
