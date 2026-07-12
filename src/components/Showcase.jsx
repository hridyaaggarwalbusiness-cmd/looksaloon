import ShowcaseGrid from './ShowcaseGrid'
import { useContent } from '../hooks/useContent'

function Showcase() {
  const { showcase } = useContent()

  if (!showcase || showcase.length === 0) return null

  return (
    <section className="section showcase" aria-label="What we do">
      <div className="container">
        <ShowcaseGrid sections={showcase} />
      </div>
    </section>
  )
}

export default Showcase
