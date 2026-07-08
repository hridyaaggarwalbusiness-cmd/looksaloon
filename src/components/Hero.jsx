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
        <radialGradient id="heroMirrorGlass" cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#fdf6ec" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e7b6a3" stopOpacity="0.55" />
        </radialGradient>
      </defs>

      <circle cx="270" cy="230" r="230" fill="url(#heroGlow)" />

      <circle cx="270" cy="230" r="168" fill="none" stroke="url(#heroGoldGrad)" strokeWidth="1.5" opacity="0.55" />
      <circle cx="270" cy="230" r="132" fill="none" stroke="#b4694f" strokeWidth="1" opacity="0.3" />

      <g className="hero-orbit-slow">
        <ellipse cx="270" cy="230" rx="210" ry="210" fill="none" stroke="#c9a15a" strokeWidth="0.6" strokeDasharray="2 10" opacity="0.5" />
      </g>

      {/* Flowing hair strands */}
      <g className="hero-float-1" opacity="0.55">
        <path
          d="M60 190c70-70 140-70 210 0s140 70 210 0"
          stroke="url(#heroRoseGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
          opacity="0.32"
        />
        <path
          d="M85 250c55-46 110-46 165 0s110 46 165 0"
          stroke="url(#heroRoseGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0.22"
        />
      </g>

      {/* Hand mirror */}
      <g transform="translate(150 90)" className="hero-float-2">
        <ellipse cx="110" cy="112" rx="94" ry="100" fill="url(#heroMirrorGlass)" stroke="url(#heroGoldGrad)" strokeWidth="6" />
        <ellipse cx="110" cy="112" rx="94" ry="100" fill="none" stroke="#fff8ec" strokeWidth="1.2" opacity="0.4" />
        <path d="M70 62c26 24 34 60 24 108" stroke="#fff8ec" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.45" />
        <rect x="98" y="204" width="24" height="76" rx="12" fill="url(#heroGoldGrad)" />
        <ellipse cx="110" cy="286" rx="18" ry="11" fill="url(#heroGoldGrad)" />
      </g>

      {/* Comb */}
      <g transform="translate(58 366)" className="hero-float-3">
        <rect x="0" y="0" width="132" height="24" rx="12" fill="#1c1512" />
        <g stroke="#1c1512" strokeWidth="5" strokeLinecap="round">
          <path d="M12 24v32" />
          <path d="M32 24v40" />
          <path d="M52 24v32" />
          <path d="M72 24v42" />
          <path d="M92 24v32" />
          <path d="M112 24v40" />
        </g>
        <rect x="0" y="0" width="132" height="24" rx="12" fill="none" stroke="#f1d59d" strokeWidth="1" opacity="0.4" />
      </g>

      {/* Scissors */}
      <g transform="translate(348 58)" className="hero-float-4">
        <circle cx="14" cy="58" r="13" fill="none" stroke="url(#heroGoldGrad)" strokeWidth="4.5" />
        <circle cx="14" cy="14" r="13" fill="none" stroke="url(#heroGoldGrad)" strokeWidth="4.5" />
        <path d="M24 24 78 68M24 48 78 4" stroke="url(#heroGoldGrad)" strokeWidth="4.5" strokeLinecap="round" />
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
