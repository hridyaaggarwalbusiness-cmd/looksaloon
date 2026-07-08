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
      </defs>
      <rect x="18" y="18" width="384" height="444" rx="18" fill="url(#aboutPanelGrad)" />
      <rect x="18.5" y="18.5" width="383" height="443" rx="17.5" fill="none" stroke="#c9a15a" strokeOpacity="0.35" />

      <g transform="translate(70 70)">
        <circle cx="90" cy="90" r="86" fill="none" stroke="url(#aboutGoldLine)" strokeWidth="1.4" opacity="0.6" />
        <path
          d="M40 110c8-46 40-78 86-78 12 26 6 56-14 76-24 24-58 26-72 2Z"
          fill="#e7b6a3"
          opacity="0.85"
        />
        <path
          d="M50 60c26-30 66-34 96-10-6 30-32 52-64 52-18 0-34-16-32-42Z"
          fill="#c9a15a"
        />
        <circle cx="90" cy="90" r="5" fill="#fbf4ec" />
      </g>

      <g transform="translate(60 300)" fill="none" stroke="#c9a15a" strokeWidth="1.2" opacity="0.7">
        <path d="M0 0h300" />
        <path d="M0 22h180" opacity="0.5" />
        <path d="M0 44h220" opacity="0.3" />
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
