import { Suspense, lazy, useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

const HeroScene = lazy(() => import('./HeroScene'))

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

function HeroSceneGate({ active = true }) {
  const [enabled, setEnabled] = useState(false)
  const [wrapRef, inView] = useInView()

  useEffect(() => {
    if (!active) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !supportsWebGL()) return

    setEnabled(true)
  }, [active])

  if (!enabled) return null

  return (
    <div className="hero-scene-3d" ref={wrapRef}>
      <Suspense fallback={null}>
        <HeroScene frameloop={inView ? 'always' : 'never'} />
      </Suspense>
    </div>
  )
}

export default HeroSceneGate
