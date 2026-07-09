import { useEffect, useState } from 'react'

const PARTICLES = [
  { top: '22%', left: '18%', size: 5, delay: '0s', driftX: '14px', driftY: '-18px', duration: '7s' },
  { top: '68%', left: '24%', size: 3, delay: '0.4s', driftX: '-10px', driftY: '-22px', duration: '8.5s' },
  { top: '35%', left: '78%', size: 4, delay: '0.8s', driftX: '-16px', driftY: '-14px', duration: '6.5s' },
  { top: '76%', left: '70%', size: 6, delay: '0.2s', driftX: '12px', driftY: '-20px', duration: '9s' },
  { top: '48%', left: '10%', size: 3, delay: '1.1s', driftX: '18px', driftY: '-10px', duration: '7.5s' },
  { top: '15%', left: '55%', size: 4, delay: '0.6s', driftX: '-14px', driftY: '-16px', duration: '8s' },
  { top: '85%', left: '46%', size: 3, delay: '1.3s', driftX: '10px', driftY: '-24px', duration: '6.8s' },
  { top: '58%', left: '88%', size: 5, delay: '0.9s', driftX: '-12px', driftY: '-18px', duration: '7.8s' },
]

function IntroReveal({ onDone }) {
  const alreadySeen = typeof window !== 'undefined' && sessionStorage.getItem('ls-intro-seen')
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const skip = Boolean(alreadySeen || reduceMotion)

  const igniting = !skip
  const [parting, setParting] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [visible, setVisible] = useState(!skip)

  useEffect(() => {
    if (skip) {
      onDone()
      return undefined
    }

    document.body.classList.add('loading')

    const t1 = setTimeout(() => setParting(true), 900)
    const t2 = setTimeout(() => {
      setExiting(true)
      document.body.classList.remove('loading')
      sessionStorage.setItem('ls-intro-seen', '1')
      onDone()
    }, 2000)
    const t3 = setTimeout(() => setVisible(false), 2650)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  const stageClass = [
    'intro-reveal',
    igniting ? 'intro-igniting' : '',
    parting ? 'intro-parting' : '',
    exiting ? 'intro-exiting' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={stageClass} aria-hidden="true">
      <div className="intro-particles">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="intro-particle"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              '--drift-x': p.driftX,
              '--drift-y': p.driftY,
            }}
          />
        ))}
      </div>

      <div className="intro-panel intro-panel-left" />
      <div className="intro-panel intro-panel-right" />
      <div className="intro-seam" />

      <div className="intro-mark">
        <div className="intro-mark-glow" />
        <svg viewBox="0 0 48 48" width="56" height="56">
          <path d="M24 4c6 6 6 14 0 20-6-6-6-14 0-20Z" fill="currentColor" />
          <path d="M24 22c0 10-6 16-16 20 4-10 6-16 16-20Z" fill="currentColor" opacity="0.7" />
          <path d="M24 22c0 10 6 16 16 20-4-10-6-16-16-20Z" fill="currentColor" opacity="0.45" />
        </svg>
        <span>Looks Saloon</span>
      </div>
    </div>
  )
}

export default IntroReveal
