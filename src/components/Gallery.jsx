import { useState } from 'react'
import Reveal from './Reveal'
import PhotoFrame from './PhotoFrame'
import TiltCard from './TiltCard'
import Lightbox from './Lightbox'
import { usePhotos } from '../hooks/usePhotos'

const SLUG_LAYOUT = [
  { slug: 'interiorStyling', variant: 'v1 tall' },
  { slug: 'interiorMirrors', variant: 'v2' },
  { slug: 'interiorWash', variant: 'v3' },
  { slug: 'interiorLounge', variant: 'v4 tall' },
  { slug: 'exterior', variant: 'v5' },
  { slug: 'checkin', variant: 'v6' },
]

function Gallery() {
  const photos = usePhotos()
  const [activeIndex, setActiveIndex] = useState(null)

  const items = SLUG_LAYOUT.map(({ slug, variant }) => ({
    slug,
    variant,
    title: photos[slug].title,
    tag: photos[slug].tag,
    src: photos[slug].url,
  }))

  const close = () => setActiveIndex(null)
  const prev = () => setActiveIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setActiveIndex((i) => (i + 1) % items.length)

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Take a Look Inside
          </p>
          <h2 className="section-title">A glimpse into our studio.</h2>
          <p className="section-sub">Real photos from the Looks Saloon studio in Hanumangarh.</p>
        </Reveal>

        <div className="gallery-grid">
          {items.map((item, index) => (
            <Reveal
              as="figure"
              key={item.slug}
              className={`gallery-item ${item.variant}`}
              variant="3d"
              delay={index * 60}
            >
              <TiltCard
                as="button"
                type="button"
                className="gallery-item-button"
                tiltMax={7}
                tiltScale={1.03}
                onClick={() => setActiveIndex(index)}
                aria-label={`View larger photo: ${item.title}`}
              >
                <PhotoFrame src={item.src} alt={`Looks Saloon — ${item.title}`} className="gallery-media" />
                <figcaption>
                  <span className="gallery-tag">{item.tag}</span>
                  <span className="gallery-title">{item.title}</span>
                </figcaption>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox item={activeIndex === null ? null : items[activeIndex]} onClose={close} onPrev={prev} onNext={next} />
    </section>
  )
}

export default Gallery
