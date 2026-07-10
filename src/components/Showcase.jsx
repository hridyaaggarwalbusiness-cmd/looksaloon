import Reveal from './Reveal'
import PhotoFrame from './PhotoFrame'
import ShowcaseCarousel from './ShowcaseCarousel'
import { useContent } from '../hooks/useContent'

function Showcase() {
  const { showcase } = useContent()

  if (!showcase || showcase.length === 0) return null

  return (
    <section className="section showcase" aria-label="What we do">
      <div className="container">
        {showcase.map((item, index) => (
          <div className={`showcase-row ${index % 2 === 1 ? 'showcase-row-reverse' : ''}`} key={item.title || index}>
            <Reveal className="showcase-visual" as="div" variant="3d">
              <PhotoFrame src={item.imageUrl} alt={item.title} className="showcase-frame" />
            </Reveal>
            <Reveal className="showcase-copy" delay={100}>
              <p className="eyebrow">
                <span className="eyebrow-line" /> {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="section-title">{item.title}</h2>
              <p className="showcase-description">{item.description}</p>
            </Reveal>
          </div>
        ))}

        <ShowcaseCarousel />
      </div>
    </section>
  )
}

export default Showcase
