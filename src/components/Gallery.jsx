import { useState } from 'react'
import Reveal from './Reveal'
import PhotoFrame from './PhotoFrame'
import Lightbox from './Lightbox'
import { SALON_PHOTOS } from '../photos'

const ITEMS = [
  { title: 'Style Bar', tag: 'Styling Chairs', variant: 'v1 tall', src: SALON_PHOTOS.interiorStyling },
  { title: 'Signature Mirrors', tag: 'Mirror Row', variant: 'v2', src: SALON_PHOTOS.interiorMirrors },
  { title: 'Wash & Relax', tag: 'Spa Station', variant: 'v3', src: SALON_PHOTOS.interiorWash },
  { title: 'Guest Lounge', tag: 'Ambience', variant: 'v4 tall', src: SALON_PHOTOS.interiorLounge },
  { title: 'Our Storefront', tag: 'Exterior', variant: 'v5', src: SALON_PHOTOS.exterior },
  { title: 'Welcome In', tag: 'Entrance', variant: 'v6', src: SALON_PHOTOS.checkin },
]

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)

  const close = () => setActiveIndex(null)
  const prev = () => setActiveIndex((i) => (i - 1 + ITEMS.length) % ITEMS.length)
  const next = () => setActiveIndex((i) => (i + 1) % ITEMS.length)

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> Take a Look Inside
          </p>
          <h2 className="section-title">A glimpse into our studio.</h2>
          <p className="section-sub">Real photos from the Looks Saloon studio in Hanumangarh.</p>
        </Reveal>

        <div className="gallery-grid">
          {ITEMS.map((item, index) => (
            <Reveal
              as="figure"
              key={item.title}
              className={`gallery-item ${item.variant}`}
              delay={index * 60}
            >
              <button
                type="button"
                className="gallery-item-button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View larger photo: ${item.title}`}
              >
                <PhotoFrame src={item.src} alt={`Looks Saloon — ${item.title}`} className="gallery-media" />
                <figcaption>
                  <span className="gallery-tag">{item.tag}</span>
                  <span className="gallery-title">{item.title}</span>
                </figcaption>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox item={activeIndex === null ? null : ITEMS[activeIndex]} onClose={close} onPrev={prev} onNext={next} />
    </section>
  )
}

export default Gallery
