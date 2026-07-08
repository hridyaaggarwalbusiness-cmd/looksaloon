import Reveal from './Reveal'

const ITEMS = [
  { title: 'Editorial Color', tag: 'Hair Color', variant: 'v1 tall' },
  { title: 'Bridal Updo', tag: 'Bridal', variant: 'v2' },
  { title: 'Glow Facial', tag: 'Skin Therapy', variant: 'v3' },
  { title: 'Gel Nail Art', tag: 'Nails', variant: 'v4 tall' },
  { title: 'Precision Cut', tag: 'Haircut', variant: 'v5' },
  { title: 'Signature Makeup', tag: 'Makeup', variant: 'v6' },
]

const MARKS = {
  'Hair Color': (
    <>
      <ellipse cx="40" cy="42" rx="20" ry="15" fill="none" stroke="currentColor" strokeWidth="2.4" opacity="0.85" />
      <path d="M58 34l20-7v30l-20-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" opacity="0.85" />
      <path d="M28 55 14 82" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
    </>
  ),
  Bridal: (
    <path
      d="M18 68h64l-6-32-14 14-12-24-12 24-14-14-6 32Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
      opacity="0.85"
    />
  ),
  'Skin Therapy': (
    <path
      d="M50 78c22 0 34-14 34-36C64 42 54 30 50 20c-4 10-14 22-34 22 0 22 12 36 34 36Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
      opacity="0.85"
    />
  ),
  Nails: (
    <>
      <rect x="38" y="20" width="24" height="16" rx="4" fill="currentColor" opacity="0.85" />
      <path d="M40 36h20l-3 40a7 7 0 0 1-7 6h-3a7 7 0 0 1-7-6l-3-40Z" fill="none" stroke="currentColor" strokeWidth="2.4" opacity="0.85" />
    </>
  ),
  Haircut: (
    <>
      <circle cx="30" cy="68" r="10" fill="none" stroke="currentColor" strokeWidth="2.6" opacity="0.85" />
      <circle cx="30" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="2.6" opacity="0.85" />
      <path d="M42 40 84 74M42 58 84 24" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity="0.85" />
    </>
  ),
  Makeup: (
    <>
      <rect x="40" y="46" width="20" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="2.4" opacity="0.85" />
      <path d="M42 46l4-24h8l4 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" opacity="0.85" />
    </>
  ),
}

function GalleryMark({ tag }) {
  return (
    <svg viewBox="0 0 100 100" className="gallery-mark" aria-hidden="true">
      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      {MARKS[tag]}
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
                <GalleryMark tag={item.tag} />
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
