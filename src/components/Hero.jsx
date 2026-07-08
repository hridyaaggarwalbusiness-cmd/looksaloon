import Reveal from './Reveal'

function HeroArt() {
  return (
    <svg viewBox="0 0 520 560" className="hero-art" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="heroGoldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f1d59d" />
          <stop offset="100%" stopColor="#b9863f" />
        </linearGradient>
        <linearGradient id="heroRoseGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7b6a3" />
          <stop offset="100%" stopColor="#b4694f" />
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

      <g className="hero-float-1">
        <path
          d="M150 150c40-46 120-46 160 0 26 30 26 78 0 108-40 46-120 46-160 0-26-30-26-78 0-108Z"
          fill="url(#heroRoseGrad)"
          opacity="0.16"
        />
      </g>

      <g transform="translate(150 120)" className="hero-float-2">
        <path
          d="M110 8c8 30-6 58-34 70 22-4 46 4 60 26 10 16 8 38-4 52-18 22-52 24-76 4-30-24-40-66-24-102C50 24 78-4 110 8Z"
          fill="url(#heroGoldGrad)"
        />
        <path
          d="M110 8c8 30-6 58-34 70 22-4 46 4 60 26 10 16 8 38-4 52-18 22-52 24-76 4-30-24-40-66-24-102C50 24 78-4 110 8Z"
          fill="none"
          stroke="#fff8ec"
          strokeWidth="1.4"
          opacity="0.5"
        />
      </g>

      <g transform="translate(196 300)" className="hero-float-3">
        <path
          d="M0 40C6 16 28-2 54 1c26 3 44 24 42 50-2 24-24 42-50 40C20 89 0 74-2 50 0 47 0 44 0 40Z"
          fill="#1c1512"
          opacity="0.9"
        />
        <path d="M10 40h76" stroke="#f1d59d" strokeWidth="2" opacity="0.7" />
        <path d="M10 52h56" stroke="#f1d59d" strokeWidth="2" opacity="0.4" />
      </g>

      <g className="hero-sparkle-1">
        <path d="M60 90l4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" fill="#e7b6a3" />
      </g>
      <g className="hero-sparkle-2">
        <path d="M440 380l5 14 14 5-14 5-5 14-5-14-14-5 14-5Z" fill="#c9a15a" />
      </g>
      <g className="hero-sparkle-3">
        <circle cx="410" cy="140" r="5" fill="#b4694f" />
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
              <strong>4.9</strong>
              <span>Average rating</span>
            </div>
            <div>
              <strong>18k+</strong>
              <span>Happy clients</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="hero-visual" delay={150} as="div">
          <HeroArt />
          <div className="hero-badge hero-badge-top">
            <span className="hero-badge-stars">★★★★★</span>
            <p>
              <strong>4.9/5</strong> from 2,400+ reviews
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
