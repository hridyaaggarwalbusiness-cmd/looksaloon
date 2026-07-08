import Reveal from './Reveal'
import Photo from './Photo'
import { SALON_PHOTOS } from '../photos'

function HeroBackdrop() {
  return (
    <svg viewBox="0 0 520 560" className="hero-backdrop" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="heroGoldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f1d59d" />
          <stop offset="100%" stopColor="#b9863f" />
        </linearGradient>
        <radialGradient id="heroGlow" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f6e3c2" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f6e3c2" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="270" cy="230" r="230" fill="url(#heroGlow)" />
      <circle cx="270" cy="230" r="168" fill="none" stroke="url(#heroGoldGrad)" strokeWidth="1.5" opacity="0.55" />
      <circle cx="270" cy="230" r="132" fill="none" stroke="#b4694f" strokeWidth="1" opacity="0.3" />

      <g className="hero-orbit-slow">
        <ellipse cx="270" cy="230" rx="210" ry="210" fill="none" stroke="#c9a15a" strokeWidth="0.6" strokeDasharray="2 10" opacity="0.5" />
      </g>

      {/* Comb accent */}
      <g transform="translate(30 400)" className="hero-float-3">
        <rect x="0" y="0" width="90" height="16" rx="8" fill="#1c1512" />
        <g stroke="#1c1512" strokeWidth="3.4" strokeLinecap="round">
          <path d="M8 16v20" />
          <path d="M22 16v26" />
          <path d="M36 16v20" />
          <path d="M50 16v26" />
          <path d="M64 16v20" />
          <path d="M78 16v26" />
        </g>
      </g>

      {/* Scissors accent */}
      <g transform="translate(430 40)" className="hero-float-4">
        <circle cx="10" cy="42" r="9" fill="none" stroke="url(#heroGoldGrad)" strokeWidth="3.4" />
        <circle cx="10" cy="10" r="9" fill="none" stroke="url(#heroGoldGrad)" strokeWidth="3.4" />
        <path d="M17 17 55 50M17 35 55 3" stroke="url(#heroGoldGrad)" strokeWidth="3.4" strokeLinecap="round" />
      </g>

      <g className="hero-sparkle-1">
        <path d="M60 90l4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" fill="#e7b6a3" />
      </g>
      <g className="hero-sparkle-2">
        <path d="M440 380l5 14 14 5-14 5-5 14-5-14-14-5 14-5Z" fill="#c9a15a" />
      </g>
    </svg>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-inner">
        <Reveal className="hero-copy" delay={0}>
          <p className="eyebrow">
            <span className="eyebrow-dot" /> Premium Hair &amp; Beauty Studio
          </p>
          <h1>
            Where every visit
            <br />
            becomes a <span className="text-accent">signature look.</span>
          </h1>
          <p className="hero-sub">
            Looks Saloon blends award-winning stylists, luxury skincare rituals, and a
            calm, elevated space &mdash; so you leave looking, and feeling, like the best
            version of yourself.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href="#contact">
              Book an Appointment
            </a>
            <a className="btn btn-ghost btn-lg" href="#services">
              Explore Services
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="hero-stats">
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
          </div>
        </Reveal>

        <Reveal className="hero-visual" delay={150} as="div">
          <HeroBackdrop />
          <div className="hero-photo-frame">
            <Photo src={SALON_PHOTOS.exterior} alt="Looks Saloon storefront, Hanumangarh" className="hero-photo" />
          </div>
          <div className="hero-badge hero-badge-top">
            <span className="hero-badge-stars">★★★★★</span>
            <p>
              <strong>4.5/5</strong> from 124 reviews
            </p>
          </div>
          <div className="hero-badge hero-badge-bottom">
            <p className="hero-badge-title">Now Booking</p>
            <p className="hero-badge-sub">Bridal &amp; Festive Packages</p>
          </div>
        </Reveal>
      </div>

      <a className="scroll-cue" href="#services" aria-label="Scroll to services">
        <span />
      </a>
    </section>
  )
}

export default Hero
