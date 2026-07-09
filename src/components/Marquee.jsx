import { useContent } from '../hooks/useContent'

function MarqueeTrack({ items }) {
  return (
    <div className="marquee-track">
      {items.map((item) => (
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
  const { marqueeItems } = useContent()

  return (
    <div className="marquee" aria-hidden="true">
      <MarqueeTrack items={marqueeItems} />
      <MarqueeTrack items={marqueeItems} />
    </div>
  )
}

export default Marquee
