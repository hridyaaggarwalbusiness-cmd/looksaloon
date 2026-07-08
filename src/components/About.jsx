import Reveal from './Reveal'
import CountUp from './CountUp'

function AboutArt() {
  return (
    <svg viewBox="0 0 420 480" className="about-art" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="aboutPanelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#241b16" />
          <stop offset="100%" stopColor="#120e0b" />
        </linearGradient>
        <linearGradient id="aboutGoldLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9a15a" />
          <stop offset="100%" stopColor="#e7b6a3" />
        </linearGradient>
        <radialGradient id="aboutMirrorGlass" cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#fdf6ec" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e7b6a3" stopOpacity="0.45" />
        </radialGradient>
      </defs>
      <rect x="18" y="18" width="384" height="444" rx="18" fill="url(#aboutPanelGrad)" />
      <rect x="18.5" y="18.5" width="383" height="443" rx="17.5" fill="none" stroke="#c9a15a" strokeOpacity="0.35" />

      {/* Hand mirror */}
      <g transform="translate(108 66)">
        <ellipse cx="102" cy="96" rx="80" ry="86" fill="url(#aboutMirrorGlass)" stroke="url(#aboutGoldLine)" strokeWidth="4.5" />
        <ellipse cx="102" cy="96" rx="80" ry="86" fill="none" stroke="#fbf4ec" strokeWidth="1" opacity="0.3" />
        <path d="M68 56c22 20 28 50 20 90" stroke="#fbf4ec" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.4" />
        <rect x="90" y="174" width="20" height="58" rx="10" fill="url(#aboutGoldLine)" />
        <ellipse cx="100" cy="238" rx="15" ry="9" fill="url(#aboutGoldLine)" />
      </g>

      {/* Comb accent */}
      <g transform="translate(232 330)">
        <rect x="0" y="0" width="72" height="14" rx="7" fill="url(#aboutGoldLine)" opacity="0.9" />
        <g stroke="url(#aboutGoldLine)" strokeWidth="2.6" strokeLinecap="round" opacity="0.8">
          <path d="M8 14v16" />
          <path d="M20 14v20" />
          <path d="M32 14v16" />
          <path d="M44 14v20" />
          <path d="M56 14v16" />
        </g>
      </g>

      <g transform="translate(60 300)" fill="none" stroke="#c9a15a" strokeWidth="1.2" opacity="0.7">
        <path d="M0 30h150" />
        <path d="M0 52h100" opacity="0.5" />
      </g>

      <text x="60" y="410" fill="#f6e3c2" fontFamily="Cormorant Garamond, serif" fontSize="26" fontStyle="italic">
        Est. 2013
      </text>
    </svg>
  )
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-inner">
        <Reveal className="about-visual" as="div">
          <AboutArt />
        </Reveal>

        <Reveal className="about-copy" delay={120}>
          <p className="eyebrow">
            <span className="eyebrow-dot" /> Our Story
          </p>
          <h2 className="section-title">Crafted for confidence, refined by experience.</h2>
          <p className="about-lead">
            For over a decade, Looks Saloon has been the city&rsquo;s trusted destination
            for hair, skin, and beauty. What began as a small studio is now a full-service
            atelier &mdash; built on precision technique, premium products, and a genuine
            love for making people feel extraordinary.
          </p>
          <p>
            Every service starts with a conversation. Our stylists and therapists take the
            time to understand your features, your lifestyle, and your goals &mdash; then
            craft a look that&rsquo;s unmistakably yours.
          </p>

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

export default About
