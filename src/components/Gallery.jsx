import Reveal from './Reveal'

const ITEMS = [
  { title: 'Editorial Color', tag: 'Hair Color', variant: 'v1 tall' },
  { title: 'Bridal Updo', tag: 'Bridal', variant: 'v2' },
  { title: 'Glow Facial', tag: 'Skin Therapy', variant: 'v3' },
  { title: 'Gel Nail Art', tag: 'Nails', variant: 'v4 tall' },
  { title: 'Precision Cut', tag: 'Haircut', variant: 'v5' },
  { title: 'Signature Makeup', tag: 'Makeup', variant: 'v6' },
]

function GalleryMark({ index }) {
  return (
    <svg viewBox="0 0 100 100" className="gallery-mark" aria-hidden="true">
      <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="50" cy="50" r="3.4" fill="currentColor" />
      <path
        d={
          index % 2 === 0
            ? 'M20 60c14-24 34-34 60-30'
            : 'M20 40c14 24 34 34 60 30'
        }
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  )
}

function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> Portfolio
          </p>
          <h2 className="section-title">A glimpse into our recent work.</h2>
          <p className="section-sub">Real transformations from the Looks Saloon chair.</p>
        </Reveal>

        <div className="gallery-grid">
          {ITEMS.map((item, index) => (
            <Reveal
              as="figure"
              key={item.title}
              className={`gallery-item ${item.variant}`}
              delay={index * 60}
            >
              <div className="gallery-media">
                <GalleryMark index={index} />
              </div>
              <figcaption>
                <span className="gallery-tag">{item.tag}</span>
                <span className="gallery-title">{item.title}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
