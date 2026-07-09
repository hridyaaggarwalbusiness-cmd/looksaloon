import Reveal from './Reveal'

const TOOLS = [
  {
    key: 'scissors',
    label: 'Precision Cuts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.5 7.5 20 18M8.5 16.5 20 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'comb',
    label: 'Styling & Blowouts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5.5 9a7.5 7.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path
          d="M5.5 9v3.6M8.2 6.3v4.3M11 5.5v5M13.8 6.3v4.3M16.5 9v3.6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: 'dryer',
    label: 'Finish & Volume',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="7.5" y="7" width="10" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 14v4.5a1.5 1.5 0 0 1-1.5 1.5H7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 8.3l2-1.1M19 12.7l2 1.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'spray',
    label: 'Color & Care',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="8" y="10" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 10V7h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M13 7V5.5a1 1 0 0 1 1-1h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M17.5 3.6l1 .6M18.4 5.8h1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'polish',
    label: 'Nail Studio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M10 4h4v3l1.5 1.6a3 3 0 0 1 .8 2V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-7.4a3 3 0 0 1 .8-2L10 7V4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M10 4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'brush',
    label: 'Bridal Makeup',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M14.5 8.8 7 16.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="17" cy="6.3" r="3.3" fill="currentColor" opacity="0.85" />
        <rect x="4.6" y="16.6" width="2.6" height="2.6" rx="0.6" transform="rotate(45 5.9 17.9)" fill="currentColor" opacity="0.85" />
      </svg>
    ),
  },
]

function Craft() {
  return (
    <section className="section craft" aria-label="Our craft">
      <div className="container craft-inner">
        <Reveal className="craft-heading" as="div">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Tools of the Trade
          </p>
          <h2 className="section-title">Every visit, hands-on craft.</h2>
          <p className="section-sub">
            From the first snip to the final finish — real tools, real technique, real care,
            in every chair at Looks Saloon.
          </p>
        </Reveal>

        <div className="craft-strip">
          {TOOLS.map((tool, index) => (
            <Reveal className="craft-item" key={tool.key} delay={index * 70}>
              <span className="craft-icon">{tool.icon}</span>
              <span className="craft-label">{tool.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Craft
