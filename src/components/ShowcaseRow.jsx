import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import PhotoFrame from './PhotoFrame'

const EASE = [0.16, 1, 0.3, 1]

function ShowcaseRow({ items, index, reverse }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!items || items.length < 2) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % items.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [items])

  if (!items || items.length === 0) return null

  const item = items[active] || items[0]

  return (
    <div className={`showcase-row ${reverse ? 'showcase-row-reverse' : ''}`}>
      <Reveal className="showcase-visual" as="div" variant="3d">
        <div className="showcase-frame-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="showcase-slide"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <PhotoFrame src={item.imageUrl} alt={item.title} className="showcase-photo" />
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>

      <Reveal className="showcase-copy" delay={100}>
        <p className="eyebrow">
          <span className="eyebrow-line" /> {String(index + 1).padStart(2, '0')}
        </p>
        <div className="showcase-copy-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="showcase-copy-slide"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <h2 className="section-title">{item.title}</h2>
              <p className="showcase-description">{item.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {items.length > 1 && (
          <div className="showcase-dots">
            {items.map((subItem, i) => (
              <span key={subItem.title || i} className={`showcase-dot ${i === active ? 'is-active' : ''}`} />
            ))}
          </div>
        )}
      </Reveal>
    </div>
  )
}

export default ShowcaseRow
