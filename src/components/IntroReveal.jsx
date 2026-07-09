import { Suspense, lazy, useEffect, useState } from 'react'

const IntroScene = lazy(() => import('./IntroScene'))

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

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

function IntroReveal({ onDone, videoSrc }) {
  const alreadySeen = typeof window !== 'undefined' && sessionStorage.getItem('ls-intro-seen')
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const skip = Boolean(alreadySeen || reduceMotion)
  const use3d =
    typeof window !== 'undefined' &&
    !reduceMotion &&
    !window.matchMedia('(pointer: coarse)').matches &&
    window.innerWidth >= 860 &&
    supportsWebGL()

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

    const t1 = setTimeout(() => setCutting(true), 1450)
    const t2 = setTimeout(() => setParted(true), 2050)
    const t3 = setTimeout(() => {
      setExiting(true)
      document.body.classList.remove('loading')
      sessionStorage.setItem('ls-intro-seen', '1')
      onDone()
    }, 3150)
    const t4 = setTimeout(() => setVisible(false), 3900)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  const stage = { cutting, parted, exiting }

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
      <div className="intro-letterbox intro-letterbox-top" />
      <div className="intro-letterbox intro-letterbox-bottom" />
      <div className="intro-vignette" />

      <div className="intro-ribbon intro-ribbon-left" />
      <div className="intro-ribbon intro-ribbon-right" />

      {videoSrc ? (
        <div className="intro-stage-3d">
          <video className="intro-video" src={videoSrc} autoPlay muted playsInline />
        </div>
      ) : (
        use3d && (
          <div className="intro-stage-3d">
            <Suspense fallback={null}>
              <IntroScene stage={stage} />
            </Suspense>
          </div>
        )
      )}

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
