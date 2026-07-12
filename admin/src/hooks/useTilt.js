import { useEffect, useRef } from 'react'

const MAX_TILT = 10

export function useTilt({ scale = 1.02, max = MAX_TILT } = {}) {
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
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      const rotateY = (px - 0.5) * max * 2
      const rotateX = (0.5 - py) * max * 2

      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        node.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
        node.style.setProperty('--glare-x', `${px * 100}%`)
        node.style.setProperty('--glare-y', `${py * 100}%`)
        node.style.setProperty('--glare-opacity', '1')
      })
    }

    const handleLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      node.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      node.style.setProperty('--glare-opacity', '0')
    }

    node.addEventListener('mousemove', handleMove)
    node.addEventListener('mouseleave', handleLeave)

    return () => {
      node.removeEventListener('mousemove', handleMove)
      node.removeEventListener('mouseleave', handleLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [scale, max])

  return ref
}
