import { useEffect, useRef } from 'react'

function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || reduceMotion) return undefined

    const node = ref.current
    let frame = null

    const handleMove = (event) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
        node.style.opacity = '1'
      })
    }

    const handleLeave = () => {
      node.style.opacity = '0'
    }

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

export default CursorGlow
