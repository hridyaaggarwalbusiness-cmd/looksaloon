import ShowcaseRow from './ShowcaseRow'

function ShowcaseGrid({ sections }) {
  if (!sections || sections.length === 0) return null

  return sections.map((section, index) => (
    <ShowcaseRow key={index} items={section.items} index={index} reverse={index % 2 === 1} />
  ))
}

export default ShowcaseGrid
