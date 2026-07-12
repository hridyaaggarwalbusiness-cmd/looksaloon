import Reveal from './Reveal'
import ShowcaseGrid from './ShowcaseGrid'
import { useContent } from '../hooks/useContent'

function StudioShowcase() {
  const { spaceShowcase } = useContent()

  if (!spaceShowcase || spaceShowcase.length === 0) return null

  return (
    <section className="section showcase studio-showcase" aria-label="Inside our studio">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Step Inside
          </p>
          <h2 className="section-title">A space designed to make you feel at ease.</h2>
          <p className="section-sub">
            From the moment you walk in, every corner of Looks Saloon is built for comfort,
            calm, and a little bit of luxury.
          </p>
        </Reveal>

        <ShowcaseGrid sections={spaceShowcase} />
      </div>
    </section>
  )
}

export default StudioShowcase
