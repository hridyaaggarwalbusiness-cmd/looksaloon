import { useEffect, useState } from 'react'

const THREADS = [
  { angle: -55, dist: 90, size: 4, delay: '0s' },
  { angle: -20, dist: 120, size: 3, delay: '0.05s' },
  { angle: 15, dist: 100, size: 4, delay: '0.02s' },
  { angle: 50, dist: 130, size: 3, delay: '0.08s' },
  { angle: -80, dist: 70, size: 3, delay: '0.1s' },
  { angle: 80, dist: 85, size: 4, delay: '0.04s' },
  { angle: -130, dist: 110, size: 3, delay: '0.12s' },
  { angle: 130, dist: 95, size: 3, delay: '0.06s' },
  { angle: 170, dist: 75, size: 4, delay: '0.14s' },
  { angle: -170, dist: 105, size: 3, delay: '0.09s' },
]

function IntroReveal({ onDone }) {
  const alreadySeen = typeof window !== 'undefined' && sessionStorage.getItem('ls-intro-seen')
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const skip = Boolean(alreadySeen || reduceMotion)

  const [cutting, setCutting] = useState(false)
  const [parted, setParted] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [visible, setVisible] = useState(!skip)

  useEffect(() => {
    if (skip) {
      onDone()
      return undefined
    }

    document.body.classList.add('loading')

    const t1 = setTimeout(() => setCutting(true), 900)
    const t2 = setTimeout(() => setParted(true), 1300)
    const t3 = setTimeout(() => {
      setExiting(true)
      document.body.classList.remove('loading')
      sessionStorage.setItem('ls-intro-seen', '1')
      onDone()
    }, 2050)
    const t4 = setTimeout(() => setVisible(false), 2700)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  const stageClass = [
    'intro-reveal',
    'intro-presented',
    cutting ? 'intro-cutting' : '',
    parted ? 'intro-parted' : '',
    exiting ? 'intro-exiting' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={stageClass} aria-hidden="true">
      <div className="intro-ribbon intro-ribbon-left" />
      <div className="intro-ribbon intro-ribbon-right" />

      <div className="intro-threads">
        {THREADS.map((t, i) => (
          <span
            key={i}
            className="intro-thread"
            style={{
              width: t.size,
              height: t.size,
              animationDelay: t.delay,
              '--tx': `${Math.cos((t.angle * Math.PI) / 180) * t.dist}px`,
              '--ty': `${Math.sin((t.angle * Math.PI) / 180) * t.dist}px`,
            }}
          />
        ))}
      </div>

      <div className="intro-cut-flash" />

      <div className="intro-hair-strands" aria-hidden="true">
        <svg viewBox="0 0 400 200" width="100%" height="100%" preserveAspectRatio="none" fill="none">
          <path className="hair-strand hair-strand-1" d="M20,40 C120,10 180,70 260,30 C320,5 360,40 390,20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path className="hair-strand hair-strand-2" d="M10,165 C90,190 160,140 240,175 C300,198 350,160 395,180" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      <div className="intro-scissors">
        <svg viewBox="0 0 170 60" width="150" height="53" fill="none">
          <g className="scissor-blade scissor-blade-a">
            <line x1="72" y1="30" x2="4" y2="30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="72" y1="30" x2="134" y2="9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="134" cy="9" r="7" stroke="currentColor" strokeWidth="2.2" />
          </g>
          <g className="scissor-blade scissor-blade-b">
            <line x1="72" y1="30" x2="4" y2="30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="72" y1="30" x2="134" y2="51" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="134" cy="51" r="7" stroke="currentColor" strokeWidth="2.2" />
          </g>
          <circle cx="72" cy="30" r="2.6" fill="currentColor" />
        </svg>
      </div>

      <div className="intro-mark">
        <svg viewBox="0 0 48 48" width="44" height="44">
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
