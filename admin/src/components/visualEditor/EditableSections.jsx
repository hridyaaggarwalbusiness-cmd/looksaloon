import EditableImage from './EditableImage'

const DUST = [
  { top: '18%', left: '8%', size: 3, delay: '0s', duration: '9s' },
  { top: '62%', left: '4%', size: 2, delay: '1.4s', duration: '11s' },
  { top: '30%', left: '46%', size: 2, delay: '2.6s', duration: '10s' },
  { top: '80%', left: '38%', size: 3, delay: '0.8s', duration: '12s' },
  { top: '12%', left: '92%', size: 2, delay: '2s', duration: '9.5s' },
  { top: '70%', left: '96%', size: 3, delay: '1.1s', duration: '10.5s' },
]

export function HeroPreview({ hero }) {
  const headline = [hero.headline1, hero.headline2, hero.headline3]

  return (
    <section id="top" className="hero">
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

      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <p className="eyebrow">
              <span className="eyebrow-line" /> {hero.eyebrow}
            </p>

            <h1 className="hero-headline">
              {headline.map((line, i) => (
                <span className="hero-headline-mask" key={`${i}-${line}`}>
                  <span className={`hero-headline-line ${i === headline.length - 1 ? 'text-accent hero-headline-shine is-active' : ''}`}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p className="hero-sub">{hero.subtext}</p>

            <div className="hero-actions">
              <span className="btn btn-primary btn-lg">Book an Appointment</span>
              <span className="btn btn-ghost btn-lg">
                Explore Services
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <div className="hero-stats">
              <div>
                <strong>12+</strong>
                <span>Years of craft</span>
              </div>
              <div>
                <strong>{hero.ratingValue}</strong>
                <span>Average rating</span>
              </div>
              <div>
                <strong>18k+</strong>
                <span>Happy clients</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-orb" aria-hidden="true">
            <span className="hero-orb hero-orb-1" />
            <span className="hero-orb hero-orb-2" />
            <span className="hero-orb hero-orb-3" />
            <span className="hero-orb-ring" />
          </div>
          <div className="hero-badge-wrap hero-badge-wrap-top">
            <div className="hero-badge glass">
              <span className="hero-badge-stars">★★★★★</span>
              <p>
                <strong>{hero.ratingValue}/5</strong> from {hero.reviewCount} reviews
              </p>
            </div>
          </div>
          <div className="hero-badge-wrap hero-badge-wrap-bottom">
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
        </div>
      </div>
    </section>
  )
}

export function ShowcaseSection({ field, heading, subheading, sections, onImageChange }) {
  if (!sections || sections.length === 0) return null

  return (
    <section className={`section showcase ${field === 'spaceShowcase' ? 'studio-showcase' : ''}`}>
      <div className="container">
        {heading && (
          <div className="section-head">
            <p className="eyebrow">
              <span className="eyebrow-line" /> Step Inside
            </p>
            <h2 className="section-title">{heading}</h2>
            {subheading && <p className="section-sub">{subheading}</p>}
          </div>
        )}

        {sections.map((section, sectionIndex) => (
          <div className="ve-showcase-group" key={sectionIndex}>
            <p className="ve-group-label">Section {sectionIndex + 1}</p>
            {section.items.map((item, itemIndex) => (
              <div className={`showcase-row ${itemIndex % 2 === 1 ? 'showcase-row-reverse' : ''}`} key={itemIndex}>
                <div className="showcase-visual">
                  <div className="showcase-frame-wrap">
                    <EditableImage
                      src={item.imageUrl}
                      alt={item.title}
                      label={item.title}
                      frameClassName="showcase-photo"
                      onChange={(url) => onImageChange(field, sectionIndex, itemIndex, url)}
                    />
                  </div>
                </div>
                <div className="showcase-copy">
                  <p className="eyebrow">
                    <span className="eyebrow-line" /> {String(sectionIndex + 1).padStart(2, '0')}.{itemIndex + 1}
                  </p>
                  <h2 className="section-title">{item.title}</h2>
                  <p className="showcase-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function AboutCombAccent() {
  return (
    <svg viewBox="0 0 100 40" className="about-comb-accent" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="veAboutGoldLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9a15a" />
          <stop offset="100%" stopColor="#e7b6a3" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="14" rx="7" fill="url(#veAboutGoldLine)" opacity="0.95" />
      <g stroke="url(#veAboutGoldLine)" strokeWidth="3" strokeLinecap="round">
        <path d="M10 14v20" />
        <path d="M28 14v26" />
        <path d="M46 14v20" />
        <path d="M64 14v26" />
        <path d="M82 14v20" />
      </g>
    </svg>
  )
}

export function AboutPreview({ about, photos, onPhotoChange }) {
  return (
    <section id="about" className="section about">
      <div className="container about-inner">
        <div className="about-visual">
          <EditableImage
            src={photos.interiorMirrors.url}
            alt={`Looks Saloon ${photos.interiorMirrors.title}, Hanumangarh`}
            label="About — Main Photo"
            frameClassName="about-photo-frame"
            onChange={(url) => onPhotoChange('interiorMirrors', url)}
          >
            <div className="about-photo-caption">
              <span>Gaandhi Nagar, Hanumangarh</span>
            </div>
          </EditableImage>
          <EditableImage
            src={photos.interiorLounge.url}
            alt={`Looks Saloon ${photos.interiorLounge.title}, Hanumangarh`}
            label="About — Accent Photo"
            frameClassName="about-photo-frame-accent"
            onChange={(url) => onPhotoChange('interiorLounge', url)}
          />
          <AboutCombAccent />
        </div>

        <div className="about-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" /> {about.eyebrow}
          </p>
          <h2 className="section-title">{about.title}</h2>
          <p className="about-lead">{about.lead}</p>
          <p>{about.body}</p>

          <div className="about-stats">
            <div className="about-stat">
              <span>12+</span>
              <span>Years of Excellence</span>
            </div>
            <div className="about-stat">
              <span>24</span>
              <span>Expert Specialists</span>
            </div>
            <div className="about-stat">
              <span>18k+</span>
              <span>Clients Styled</span>
            </div>
            <div className="about-stat">
              <span>98%</span>
              <span>Client Retention</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const GALLERY_LAYOUT = [
  { slug: 'interiorStyling', variant: 'v1 tall' },
  { slug: 'interiorMirrors', variant: 'v2' },
  { slug: 'interiorWash', variant: 'v3' },
  { slug: 'interiorLounge', variant: 'v4 tall' },
  { slug: 'exterior', variant: 'v5' },
  { slug: 'checkin', variant: 'v6' },
]

export function GalleryPreview({ photos, onPhotoChange }) {
  return (
    <section className="section gallery">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Take a Look Inside
          </p>
          <h2 className="section-title">A glimpse into our studio.</h2>
          <p className="section-sub">Real photos from the Looks Saloon studio in Hanumangarh.</p>
        </div>

        <div className="gallery-grid">
          {GALLERY_LAYOUT.map(({ slug, variant }) => {
            const photo = photos[slug]
            return (
              <figure className={`gallery-item ${variant}`} key={slug}>
                <div className="gallery-item-button">
                  <EditableImage
                    src={photo.url}
                    alt={`Looks Saloon — ${photo.title}`}
                    label={`Gallery — ${photo.title}`}
                    frameClassName="gallery-media"
                    onChange={(url) => onPhotoChange(slug, url)}
                  />
                  <figcaption>
                    <span className="gallery-tag">{photo.tag}</span>
                    <span className="gallery-title">{photo.title}</span>
                  </figcaption>
                </div>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
