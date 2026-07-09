import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import PhotoFrame from './PhotoFrame'
import MagneticButton from './MagneticButton'
import HeroSceneGate from './HeroSceneGate'
import { SALON_PHOTOS } from '../photos'

const EASE = [0.16, 1, 0.3, 1]

const HEADLINE = ['Where every visit', 'becomes a', 'signature look.']

function Hero() {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)
  const badgeTopRef = useRef(null)
  const badgeBottomRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || reduceMotion) return undefined

    let frame = null

    const handleMove = (event) => {
      const rect = section.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5

      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (photoRef.current) {
          photoRef.current.style.transform = `perspective(1200px) rotateY(${px * 8}deg) rotateX(${py * -8}deg) translate3d(${px * 6}px, ${py * 6}px, 0)`
        }
        if (badgeTopRef.current) {
          badgeTopRef.current.style.transform = `translate3d(${px * 18}px, ${py * 18}px, 0)`
        }
        if (badgeBottomRef.current) {
          badgeBottomRef.current.style.transform = `translate3d(${px * -16}px, ${py * -16}px, 0)`
        }
      })
    }

    const handleLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      ;[photoRef, badgeTopRef, badgeBottomRef].forEach((ref) => {
        if (ref.current) ref.current.style.transform = ''
      })
    }

    section.addEventListener('mousemove', handleMove)
    section.addEventListener('mouseleave', handleLeave)

    return () => {
      section.removeEventListener('mousemove', handleMove)
      section.removeEventListener('mouseleave', handleLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="top" className="hero" ref={sectionRef}>
      <div className="hero-bg" aria-hidden="true" />
      <HeroSceneGate />

      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span className="eyebrow-line" /> Premium Hair &amp; Beauty Studio
          </motion.p>

          <h1 className="hero-headline">
            {HEADLINE.map((line, i) => (
              <span className="hero-headline-mask" key={line}>
                <motion.span
                  className={`hero-headline-line ${i === HEADLINE.length - 1 ? 'text-accent' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.14, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: EASE }}
          >
            Looks Saloon blends award-winning stylists, luxury skincare rituals, and a
            calm, elevated space &mdash; so you leave looking, and feeling, like the best
            version of yourself.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: EASE }}
          >
            <MagneticButton className="btn btn-primary btn-lg" href="#contact" data-cursor="Book">
              Book an Appointment
            </MagneticButton>
            <MagneticButton className="btn btn-ghost btn-lg" href="#services" data-cursor="View">
              Explore Services
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE }}
          >
            <div>
              <strong>12+</strong>
              <span>Years of craft</span>
            </div>
            <div>
              <strong>4.5</strong>
              <span>Average rating</span>
            </div>
            <div>
              <strong>18k+</strong>
              <span>Happy clients</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        >
          <div ref={photoRef} className="hero-photo-layer">
            <PhotoFrame
              src={SALON_PHOTOS.exterior}
              alt="Looks Saloon storefront, Hanumangarh"
              className="hero-photo-frame"
              data-cursor="View"
            />
          </div>
          <div ref={badgeTopRef} className="hero-badge-wrap hero-badge-wrap-top">
            <div className="hero-badge glass">
              <span className="hero-badge-stars">★★★★★</span>
              <p>
                <strong>4.5/5</strong> from 124 reviews
              </p>
            </div>
          </div>
          <div ref={badgeBottomRef} className="hero-badge-wrap hero-badge-wrap-bottom">
            <div className="hero-badge glass">
              <p className="hero-badge-title">Now Booking</p>
              <p className="hero-badge-sub">Bridal &amp; Festive Packages</p>
            </div>
          </div>
        </motion.div>
      </div>

      <a className="scroll-cue" href="#services" aria-label="Scroll to services">
        <span />
      </a>
    </section>
  )
}

export default Hero
