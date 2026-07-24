import Reveal from './Reveal'
import TiltCard from './TiltCard'
import CountUp from './CountUp'
import EditableImage from './EditableImage'
import ShowcaseGrid from './ShowcaseGrid'
import { SERVICE_ICONS } from './serviceIcons'
import { useServices, updateService } from '../../hooks/useServices'

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

export function ServicesPreview() {
  const { services } = useServices()

  if (!services || services.length === 0) return null

  return (
    <section className="section services">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-line" /> What We Offer
          </p>
          <h2 className="section-title">Services, priced with total transparency.</h2>
          <p className="section-sub">
            Every treatment is performed by a certified specialist using premium, salon-grade products.
          </p>
        </Reveal>

        <div className="ve-services-stack">
          {services.map((service, index) => (
            <Reveal key={service.id} className="service-showcase" variant="3d" delay={index * 70}>
              <div className="service-showcase-visual">
                <EditableImage
                  src={service.imageUrl}
                  alt={service.name}
                  label={`Service — ${service.name}`}
                  frameClassName="service-showcase-frame"
                  onChange={(url) => updateService(service.id, { imageUrl: url })}
                />
              </div>

              <div className="service-showcase-copy">
                {service.popular && <span className="service-tag service-showcase-tag">Most Popular</span>}
                <div className="service-icon service-showcase-icon">
                  {SERVICE_ICONS[service.icon] || SERVICE_ICONS.sparkle}
                </div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-footer">
                  <span className="service-price">{service.price}</span>
                  <div className="service-footer-actions">
                    <span className="service-link service-link-ghost">Details</span>
                    <span className="service-link">
                      Book
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ShowcaseSection({ field, heading, subheading, sections, onImageChange }) {
  if (!sections || sections.length === 0) return null

  const handleImageChange = (sectionIndex, itemIndex, url) => onImageChange(field, sectionIndex, itemIndex, url)

  return (
    <section className={`section showcase ${field === 'spaceShowcase' ? 'studio-showcase' : ''}`}>
      <div className="container">
        {heading && (
          <Reveal className="section-head">
            <p className="eyebrow">
              <span className="eyebrow-line" /> Step Inside
            </p>
            <h2 className="section-title">{heading}</h2>
            {subheading && <p className="section-sub">{subheading}</p>}
          </Reveal>
        )}

        <ShowcaseGrid sections={sections} onImageChange={handleImageChange} />
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
        <Reveal className="about-visual" as="div">
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
        </Reveal>

        <Reveal className="about-copy" delay={120}>
          <p className="eyebrow">
            <span className="eyebrow-line" /> {about.eyebrow}
          </p>
          <h2 className="section-title">{about.title}</h2>
          <p className="about-lead">{about.lead}</p>
          <p>{about.body}</p>

          <div className="about-stats">
            <div className="about-stat">
              <CountUp end={12} suffix="+" />
              <span>Years of Excellence</span>
            </div>
            <div className="about-stat">
              <CountUp end={24} />
              <span>Expert Specialists</span>
            </div>
            <div className="about-stat">
              <CountUp end={18} suffix="k+" />
              <span>Clients Styled</span>
            </div>
            <div className="about-stat">
              <CountUp end={98} suffix="%" />
              <span>Client Retention</span>
            </div>
          </div>
        </Reveal>
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
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Take a Look Inside
          </p>
          <h2 className="section-title">A glimpse into our studio.</h2>
          <p className="section-sub">Real photos from the Looks Saloon studio in Hanumangarh.</p>
        </Reveal>

        <div className="gallery-grid">
          {GALLERY_LAYOUT.map(({ slug, variant }, index) => {
            const photo = photos[slug]
            return (
              <Reveal as="figure" key={slug} className={`gallery-item ${variant}`} variant="3d" delay={index * 60}>
                <TiltCard as="div" className="gallery-item-button" tiltMax={7} tiltScale={1.03}>
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
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
