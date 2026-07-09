const ITEMS = [
  'Haircuts',
  'Global Color',
  'Bridal Styling',
  'Spa Rituals',
  'Manicure & Pedicure',
  'Facials',
  "Men's Grooming",
  'Balayage',
]

function MarqueeTrack() {
  return (
    <div className="marquee-track">
      {ITEMS.map((item) => (
        <span className="marquee-item" key={item}>
          {item}
          <span className="marquee-dot" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  )
}

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <MarqueeTrack />
      <MarqueeTrack />
    </div>
  )
}

export default Marquee
