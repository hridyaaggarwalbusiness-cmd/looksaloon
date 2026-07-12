import ShowcaseRow from './ShowcaseRow'

function ShowcaseGrid({ sections, onImageChange }) {
  if (!sections || sections.length === 0) return null

  return sections.map((section, sectionIndex) => (
    <ShowcaseRow
      key={sectionIndex}
      items={section.items}
      index={sectionIndex}
      reverse={sectionIndex % 2 === 1}
      onImageChange={(itemIndex, url) => onImageChange(sectionIndex, itemIndex, url)}
    />
  ))
}

export default ShowcaseGrid
