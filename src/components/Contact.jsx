import { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Reveal from './Reveal'
import { db } from '../firebase'
import { useSettings } from '../hooks/useSettings'
import { useServices } from '../hooks/useServices'
import { BOOKING_SERVICE_EVENT, BOOKING_SERVICE_STORAGE_KEY } from '../bookingService'

function Contact() {
  const settings = useSettings()
  const { services } = useServices()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [selectedService, setSelectedService] = useState('')

  useEffect(() => {
    const stored = sessionStorage.getItem(BOOKING_SERVICE_STORAGE_KEY)
    if (stored) {
      setSelectedService(stored)
      sessionStorage.removeItem(BOOKING_SERVICE_STORAGE_KEY)
    }

    const handleServiceChange = (event) => setSelectedService(event.detail || '')
    window.addEventListener(BOOKING_SERVICE_EVENT, handleServiceChange)
    return () => window.removeEventListener(BOOKING_SERVICE_EVENT, handleServiceChange)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const form = event.target
    const data = new FormData(form)
    const booking = {
      name: data.get('name'),
      phone: data.get('phone'),
      email: data.get('email'),
      service: data.get('service') || '',
      date: data.get('date') || '',
      message: data.get('message') || '',
      status: 'pending',
      createdAt: serverTimestamp(),
    }

    if (!db) {
      setSubmitted(true)
      return
    }

    setSubmitting(true)
    try {
      await addDoc(collection(db, 'bookings'), booking)
      setSubmitted(true)
      form.reset()
      setSelectedService('')
    } catch {
      setError('Something went wrong sending your request. Please call or WhatsApp us instead.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact-inner">
        <Reveal className="contact-info" as="div">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Get In Touch
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
                <a href={`tel:${settings.phone}`}>{settings.phone}</a>
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
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
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

          <div className="contact-socials">
            {settings.instagram && (
              <a href={settings.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
                IG
              </a>
            )}
            {settings.facebook && (
              <a href={settings.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
                FB
              </a>
            )}
            <a
              href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}`}
              aria-label="WhatsApp"
              target="_blank"
              rel="noreferrer"
            >
              WA
            </a>
          </div>

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
                  <input type="text" name="name" placeholder="Priya Sharma" required />
                </label>
                <label>
                  <span>Mobile Number</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    pattern="(\+91[\s-]?)?[6-9]\d{9}"
                    title="Enter a valid 10-digit Indian mobile number"
                    required
                  />
                </label>
              </div>
              <label>
                <span>Email Address</span>
                <input type="email" name="email" placeholder="priya@example.com" required />
              </label>
              <label>
                <span>Service Interested In</span>
                <select
                  name="service"
                  value={selectedService}
                  onChange={(event) => setSelectedService(event.target.value)}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Preferred Date</span>
                <input type="date" name="date" min={new Date().toISOString().split('T')[0]} />
              </label>
              <label>
                <span>Message (optional)</span>
                <textarea name="message" rows="3" placeholder="Anything we should know before your visit?" />
              </label>
              {error && <p className="form-error">{error}</p>}
              <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={submitting}>
                {submitting ? 'Sending…' : 'Request Appointment'}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
