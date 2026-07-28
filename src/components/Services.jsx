import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import PhotoFrame from './PhotoFrame'
import { useServices } from '../hooks/useServices'
import { useInView } from '../hooks/useInView'
import { SERVICE_ICONS } from './serviceIcons'
import { BOOKING_SERVICE_EVENT, BOOKING_SERVICE_STORAGE_KEY } from '../bookingService'

const EASE = [0.16, 1, 0.3, 1]
const SLIDE_DURATION = 3000

function Services() {
  const { services } = useServices()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [sectionRef, inView] = useInView()

  useEffect(() => {
    if (active >= services.length) setActive(0)
  }, [services, active])

  useEffect(() => {
    if (services.length < 2 || paused || !inView) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % services.length)
    }, SLIDE_DURATION)

    return () => clearInterval(timer)
  }, [services, paused, inView])

  const service = services[active]

  if (!service) return null

  return (
    <section id="services" className="section services" ref={sectionRef}>
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-line" /> What We Offer
          </p>
          <h2 className="section-title">Services, priced with total transparency.</h2>
          <p className="section-sub">
            Every treatment is performed by a certified specialist using premium,
            salon-grade products.
          </p>
        </Reveal>

        <Reveal
          className="service-showcase"
          variant="3d"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="service-showcase-visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={service.id}
                className="service-showcase-slide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <PhotoFrame
                  src={service.imageUrl}
                  alt={service.name}
                  className="service-showcase-frame"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="service-showcase-copy">
            <AnimatePresence mode="wait">
              <motion.div
                key={service.id}
                className="service-showcase-copy-slide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                {service.popular && <span className="service-tag service-showcase-tag">Most Popular</span>}
                <div className="service-icon service-showcase-icon">
                  {SERVICE_ICONS[service.icon] || SERVICE_ICONS.sparkle}
                </div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-footer">
                  <span className="service-price">{service.price}</span>
                  <div className="service-footer-actions">
                    <Link to={`/services/${service.id}`} className="service-link service-link-ghost">
                      Details
                    </Link>
                    <a
                      href="#contact"
                      className="service-link"
                      onClick={() => {
                        sessionStorage.setItem(BOOKING_SERVICE_STORAGE_KEY, service.name)
                        window.dispatchEvent(new CustomEvent(BOOKING_SERVICE_EVENT, { detail: service.name }))
                      }}
                    >
                      Book
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {services.length > 1 && (
              <div className="service-showcase-dots">
                {services.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    className="service-showcase-dot"
                    aria-label={`Show ${item.name}`}
                    onClick={() => setActive(i)}
                  >
                    <span className={`service-showcase-dot-track ${i === active ? 'is-active' : ''}`}>
                      {i === active && (
                        <motion.span
                          key={`${item.id}-progress`}
                          className="service-showcase-dot-fill"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: paused ? 0 : 1 }}
                          transition={{ duration: paused ? 0 : SLIDE_DURATION / 1000, ease: 'linear' }}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Services
