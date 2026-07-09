import { Suspense, lazy, useEffect, useState } from 'react'

const HeroScene = lazy(() => import('./HeroScene'))

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

function HeroSceneGate() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !supportsWebGL()) return

    setEnabled(true)
  }, [])

  if (!enabled) return null

  return (
    <div className="hero-scene-3d">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </div>
  )
}

export default HeroSceneGate
