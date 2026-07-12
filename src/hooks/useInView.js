import { useEffect, useRef, useState } from 'react'

export function useInView(options) {
  const ref = useRef(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1, ...options },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return [ref, inView]
}
