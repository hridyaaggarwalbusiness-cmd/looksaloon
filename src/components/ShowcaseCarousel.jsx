import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PhotoFrame from './PhotoFrame'
import { useContent } from '../hooks/useContent'

const EASE = [0.16, 1, 0.3, 1]

function ShowcaseCarousel() {
  const { carousel } = useContent()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!carousel || carousel.length < 2) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % carousel.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [carousel])

  if (!carousel || carousel.length === 0) return null

  const active = carousel[index] || carousel[0]

  return (
    <div className="showcase-carousel">
      <div className="showcase-carousel-frame-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="showcase-carousel-slide"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <PhotoFrame src={active.imageUrl} alt={active.title} className="showcase-carousel-photo" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="showcase-carousel-copy">
        <div className="showcase-carousel-copy-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="showcase-carousel-copy-slide"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="eyebrow">
                <span className="eyebrow-line" /> More To Explore
              </p>
              <h2 className="section-title">{active.title}</h2>
              <p className="showcase-description">{active.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="showcase-carousel-dots">
          {carousel.map((item, i) => (
            <span key={item.title || i} className={`showcase-carousel-dot ${i === index ? 'is-active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowcaseCarousel
