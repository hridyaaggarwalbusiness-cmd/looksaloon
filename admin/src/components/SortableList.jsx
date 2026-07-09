import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function DragHandle(props) {
  return (
    <button type="button" className="drag-handle" aria-label="Drag to reorder" {...props}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="6" r="1.4" fill="currentColor" />
        <circle cx="16" cy="6" r="1.4" fill="currentColor" />
        <circle cx="8" cy="12" r="1.4" fill="currentColor" />
        <circle cx="16" cy="12" r="1.4" fill="currentColor" />
        <circle cx="8" cy="18" r="1.4" fill="currentColor" />
        <circle cx="16" cy="18" r="1.4" fill="currentColor" />
      </svg>
    </button>
  )
}

function SortableRow({ id, renderRow, index }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <tr ref={setNodeRef} style={style} className={isDragging ? 'is-dragging' : ''}>
      <td className="drag-handle-cell">
        <DragHandle {...attributes} {...listeners} />
      </td>
      {renderRow(index)}
    </tr>
  )
}

function SortableTableBody({ items, onReorder, renderRow }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((item) => item.id === active.id)
    const newIndex = items.findIndex((item) => item.id === over.id)
    onReorder(arrayMove(items, oldIndex, newIndex))
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <tbody>
          {items.map((item, index) => (
            <SortableRow key={item.id} id={item.id} index={index} renderRow={(i) => renderRow(item, i)} />
          ))}
        </tbody>
      </SortableContext>
    </DndContext>
  )
}

export default SortableTableBody
