import ShowcaseRow from './ShowcaseRow'
import { useContent } from '../hooks/useContent'

function Showcase() {
  const { showcase } = useContent()

  if (!showcase || showcase.length === 0) return null

  return (
    <section className="section showcase" aria-label="What we do">
      <div className="container">
        {showcase.map((section, index) => (
          <ShowcaseRow key={index} items={section.items} index={index} reverse={index % 2 === 1} />
        ))}
      </div>
    </section>
  )
}

export default Showcase
