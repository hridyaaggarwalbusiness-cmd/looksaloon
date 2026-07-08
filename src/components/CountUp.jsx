import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

function CountUp({ end, duration = 1600, suffix = '' }) {
  const [ref, visible] = useReveal()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!visible) return

    let start = null
    let frame

    const step = (timestamp) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(eased * end))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [visible, end, duration])

  return (
    <span ref={ref} className="count-up">
      {value}
      {suffix}
    </span>
  )
}

export default CountUp
