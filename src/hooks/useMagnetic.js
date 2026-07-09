import { useEffect, useRef } from 'react'

export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || reduceMotion) return undefined

    let frame = null

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect()
      const x = event.clientX - (rect.left + rect.width / 2)
      const y = event.clientY - (rect.top + rect.height / 2)

      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        node.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
      })
    }

    const handleLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      node.style.transform = 'translate3d(0, 0, 0)'
    }

    node.addEventListener('mousemove', handleMove)
    node.addEventListener('mouseleave', handleLeave)

    return () => {
      node.removeEventListener('mousemove', handleMove)
      node.removeEventListener('mouseleave', handleLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [strength])

  return ref
}
