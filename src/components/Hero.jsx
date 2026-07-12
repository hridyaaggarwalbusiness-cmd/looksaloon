import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import HeroSceneGate from './HeroSceneGate'
import { useContent } from '../hooks/useContent'

const EASE = [0.16, 1, 0.3, 1]

const HIDDEN_UP = { opacity: 0, y: 20 }
const SHOWN = { opacity: 1, y: 0 }

const DUST = [
  { top: '18%', left: '8%', size: 3, delay: '0s', duration: '9s' },
  { top: '62%', left: '4%', size: 2, delay: '1.4s', duration: '11s' },
  { top: '30%', left: '46%', size: 2, delay: '2.6s', duration: '10s' },
  { top: '80%', left: '38%', size: 3, delay: '0.8s', duration: '12s' },
  { top: '12%', left: '92%', size: 2, delay: '2s', duration: '9.5s' },
  { top: '70%', left: '96%', size: 3, delay: '1.1s', duration: '10.5s' },
]

function Hero({ revealed }) {
  const { hero } = useContent()
  const headline = [hero.headline1, hero.headline2, hero.headline3]
  const sectionRef = useRef(null)
  const copyRef = useRef(null)
  const copyInnerRef = useRef(null)
  const orbRef = useRef(null)
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
        if (copyInnerRef.current) {
          copyInnerRef.current.style.transform = `translate3d(${px * 4}px, ${py * 3}px, 0)`
        }
        if (orbRef.current) {
          orbRef.current.style.transform = `translate3d(${px * 22}px, ${py * 16}px, 0) scale(1.02)`
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
      ;[copyInnerRef, orbRef, badgeTopRef, badgeBottomRef].forEach((ref) => {
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

  useEffect(() => {
    const section = sectionRef.current
    const copy = copyRef.current
    if (!section || !copy) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    let frame = null

    const handleScroll = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const progress = Math.min(Math.max(-rect.top / (rect.height * 0.7), 0), 1)
        copy.style.opacity = String(1 - progress * 0.9)
        copy.style.transform = `translate3d(0, ${progress * -40}px, 0)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="top" className="hero" ref={sectionRef}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-atmosphere" aria-hidden="true">
        {DUST.map((d, i) => (
          <span
            key={i}
            className="hero-dust"
            style={{ top: d.top, left: d.left, width: d.size, height: d.size, animationDelay: d.delay, animationDuration: d.duration }}
          />
        ))}
      </div>
      <HeroSceneGate />

      <div className="container hero-inner">
        <div className="hero-copy" ref={copyRef}>
          <div className="hero-copy-inner" ref={copyInnerRef}>
            <motion.p
              className="eyebrow"
              initial={HIDDEN_UP}
              animate={revealed ? SHOWN : HIDDEN_UP}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <span className="eyebrow-line" /> {hero.eyebrow}
            </motion.p>

            <h1 className="hero-headline">
              {headline.map((line, i) => (
                <span className="hero-headline-mask" key={`${i}-${line}`}>
                  <motion.span
                    className={`hero-headline-line ${
                      i === headline.length - 1 ? `text-accent hero-headline-shine ${revealed ? 'is-active' : ''}` : ''
                    }`}
                    initial={{ y: '110%' }}
                    animate={{ y: revealed ? 0 : '110%' }}
                    transition={{ duration: 1.1, delay: revealed ? 0.2 + i * 0.14 : 0, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="hero-sub"
              initial={HIDDEN_UP}
              animate={revealed ? SHOWN : HIDDEN_UP}
              transition={{ duration: 1, delay: 0.7, ease: EASE }}
            >
              {hero.subtext}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={HIDDEN_UP}
              animate={revealed ? SHOWN : HIDDEN_UP}
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
              animate={{ opacity: revealed ? 1 : 0 }}
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
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        >
          <div ref={orbRef} className="hero-visual-orb" aria-hidden="true">
            <span className="hero-orb hero-orb-1" />
            <span className="hero-orb hero-orb-2" />
            <span className="hero-orb hero-orb-3" />
            <span className="hero-orb-ring" />
          </div>
          <div ref={badgeTopRef} className="hero-badge-wrap hero-badge-wrap-top">
            <div className="hero-badge glass">
              <span className="hero-badge-stars">★★★★★</span>
              <p>
                <strong>{hero.ratingValue}/5</strong> from {hero.reviewCount} reviews
              </p>
            </div>
          </div>
          <div ref={badgeBottomRef} className="hero-badge-wrap hero-badge-wrap-bottom">
            <div className="hero-badge glass">
              <p className="hero-badge-title">{hero.bookingBadgeTitle}</p>
              <p className="hero-badge-sub">{hero.bookingBadgeSub}</p>
            </div>
          </div>
          <div className="hero-badge-wrap hero-badge-wrap-side">
            <div className="hero-badge glass hero-badge-craft">
              <span className="hero-badge-craft-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="6" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="6" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M8.5 7.5 20 18M8.5 16.5 20 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <p className="hero-badge-craft-text">Hair &bull; Skin &bull; Bridal Studio</p>
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
