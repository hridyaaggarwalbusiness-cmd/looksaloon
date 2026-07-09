import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { useContent } from '../hooks/useContent'

const ICONS = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3.5v5c0 5-3 8.5-7 9.5-4-1-7-4.5-7-9.5v-5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="8" y="8" width="8" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8V5.5A2 2 0 0 1 12 3.5v0a2 2 0 0 1 2 2V8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  sterile: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3.5v5c0 5-3 8.5-7 9.5-4-1-7-4.5-7-9.5v-5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  consult: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c1.5-4.5 5-6.5 7-6.5s5.5 2 7 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

function WhyUs() {
  const { whyUsFeatures } = useContent()
  return (
    <section className="section why-us">
      <div className="container why-us-inner">
        <Reveal className="why-us-heading" as="div">
          <p className="eyebrow">
            <span className="eyebrow-line" /> The Looks Saloon Difference
          </p>
          <h2 className="section-title">Little details. Bigger confidence.</h2>
          <p className="section-sub">
            Everything we do is designed around one goal: helping you feel effortlessly,
            unmistakably you.
          </p>
        </Reveal>

        <div className="why-us-grid">
          {whyUsFeatures.map((feature, index) => (
            <Reveal className="card-wrap" variant="3d" key={feature.title} delay={index * 80}>
              <TiltCard className="why-us-card" tiltMax={8}>
                <div className="why-us-icon">{ICONS[feature.icon] || ICONS.shield}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
