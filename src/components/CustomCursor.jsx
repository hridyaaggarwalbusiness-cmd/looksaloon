import { useEffect, useRef, useState } from 'react'

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const [label, setLabel] = useState('')
  const [active, setActive] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || reduceMotion) return undefined

    document.body.classList.add('has-custom-cursor')
    setEnabled(true)

    let ringX = 0
    let ringY = 0
    let targetX = 0
    let targetY = 0
    let frame = null
    let lastHovered = null

    const animateRing = () => {
      ringX += (targetX - ringX) * 0.18
      ringY += (targetY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      frame = requestAnimationFrame(animateRing)
    }
    frame = requestAnimationFrame(animateRing)

    const handleMove = (event) => {
      targetX = event.clientX
      targetY = event.clientY
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
        glowRef.current.style.opacity = '1'
      }

      const hovered = event.target.closest('[data-cursor]')
      if (hovered !== lastHovered) {
        lastHovered = hovered
        if (hovered) {
          setActive(true)
          setLabel(hovered.getAttribute('data-cursor') || '')
        } else {
          setActive(false)
          setLabel('')
        }
      }
    }

    const handleLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0'
    }

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className={`custom-cursor-ring ${active ? 'is-active' : ''}`}>
        <span>{label}</span>
      </div>
    </>
  )
}

export default CustomCursor
