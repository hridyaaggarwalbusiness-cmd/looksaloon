import Reveal from './Reveal'
import CountUp from './CountUp'
import PhotoFrame from './PhotoFrame'
import { SALON_PHOTOS } from '../photos'

function AboutCombAccent() {
  return (
    <svg viewBox="0 0 100 40" className="about-comb-accent" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="aboutGoldLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9a15a" />
          <stop offset="100%" stopColor="#e7b6a3" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="14" rx="7" fill="url(#aboutGoldLine)" opacity="0.95" />
      <g stroke="url(#aboutGoldLine)" strokeWidth="3" strokeLinecap="round">
        <path d="M10 14v20" />
        <path d="M28 14v26" />
        <path d="M46 14v20" />
        <path d="M64 14v26" />
        <path d="M82 14v20" />
      </g>
    </svg>
  )
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-inner">
        <Reveal className="about-visual" as="div">
          <PhotoFrame
            src={SALON_PHOTOS.interiorMirrors}
            alt="Looks Saloon styling stations, Hanumangarh"
            className="about-photo-frame"
          >
            <div className="about-photo-caption">
              <span>Gaandhi Nagar, Hanumangarh</span>
            </div>
          </PhotoFrame>
          <AboutCombAccent />
        </Reveal>

        <Reveal className="about-copy" delay={120}>
          <p className="eyebrow">
            <span className="eyebrow-dot" /> Our Story
          </p>
          <h2 className="section-title">Crafted for confidence, refined by experience.</h2>
          <p className="about-lead">
            Looks Saloon is Hanumangarh&rsquo;s trusted destination for hair, skin, and
            beauty. What began as a small studio is now a full-service atelier &mdash;
            built on precision technique, premium products, and a genuine love for
            making people feel extraordinary.
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
