import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function StudioLighting() {
  return (
    <Environment resolution={256}>
      <group>
        <Lightformer intensity={2.2} color="#f3dda4" position={[4, 3, 2]} scale={[4, 4, 1]} form="rect" />
        <Lightformer intensity={1.1} color="#e7bfae" position={[-4, -1, 2]} scale={[3, 3, 1]} form="rect" />
        <Lightformer intensity={0.7} color="#f8f3ea" position={[0, 4, -3]} scale={[6, 2, 1]} form="rect" />
      </group>
    </Environment>
  )
}

function GoldRing({ position, scale = 1, speed = 1 }) {
  const ref = useRef(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.15 * speed
    ref.current.rotation.y = state.clock.elapsedTime * 0.22 * speed
  })

  return (
    <Float speed={1.4 * speed} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.32, 48, 128]} />
        <meshPhysicalMaterial
          color="#c9a15a"
          metalness={1}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.15}
          reflectivity={1}
        />
      </mesh>
    </Float>
  )
}

function GlassOrb({ position, scale = 1 }) {
  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={1.1}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          thickness={0.6}
          roughness={0.05}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.04}
          backside
          color="#f8f3ea"
        />
      </mesh>
    </Float>
  )
}

function GoldSliver({ position, rotation, scale = 1 }) {
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.6}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <capsuleGeometry args={[0.05, 1.6, 8, 16]} />
        <meshPhysicalMaterial color="#f3dda4" metalness={1} roughness={0.18} clearcoat={1} />
      </mesh>
    </Float>
  )
}

function Scene() {
  const groupRef = useRef(null)
  const scrollRef = useRef(0)

  useMemo(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY / (window.innerHeight || 1)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const { pointer } = state
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.35, 0.04)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.2, 0.04)
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -scrollRef.current * 1.4,
      0.06,
    )
  })

  return (
    <group ref={groupRef}>
      <StudioLighting />
      <ambientLight intensity={0.35} />
      <GoldRing position={[0.6, 0.4, 0]} scale={1.15} />
      <GlassOrb position={[-1.1, -0.5, -0.6]} scale={0.85} />
      <GoldSliver position={[1.3, -0.9, 0.4]} rotation={[0.4, 0.3, 1.1]} scale={0.9} />
      <Sparkles count={40} scale={[4, 4, 2]} size={2} speed={0.3} color="#f3dda4" opacity={0.6} />
    </group>
  )
}

function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Scene />
    </Canvas>
  )
}

export default HeroScene
