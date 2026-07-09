import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function StudioLighting() {
  return (
    <Environment resolution={256}>
      <group>
        <Lightformer intensity={2.4} color="#f3dda4" position={[4, 3, 2]} scale={[4, 4, 1]} form="rect" />
        <Lightformer intensity={1.2} color="#e7bfae" position={[-4, -1, 2]} scale={[3, 3, 1]} form="rect" />
        <Lightformer intensity={0.8} color="#f8f3ea" position={[0, 4, -3]} scale={[6, 2, 1]} form="rect" />
        <Lightformer intensity={1.4} color="#c9a15a" position={[-3, 2, -2]} scale={[2, 4, 1]} form="rect" />
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
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.12}
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
          chromaticAberration={0.045}
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
        <meshPhysicalMaterial color="#f3dda4" metalness={1} roughness={0.16} clearcoat={1} />
      </mesh>
    </Float>
  )
}

function GoldRibbon() {
  const ref = useRef(null)

  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(-1.6, 1.15, -0.6),
      new THREE.Vector3(-0.7, 0.6, 0.3),
      new THREE.Vector3(0.1, 1.1, -0.2),
      new THREE.Vector3(0.9, 0.4, 0.5),
      new THREE.Vector3(1.7, 0.95, -0.3),
    ]
    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.6)
    return new THREE.TubeGeometry(curve, 120, 0.028, 12, false)
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.18) * 0.06
  })

  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={ref} geometry={geometry}>
        <meshPhysicalMaterial color="#f3dda4" metalness={1} roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
    </Float>
  )
}

function ResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const aspect = size.width / size.height
    const extraFov = aspect < 1 ? THREE.MathUtils.clamp((1 - aspect) * 16, 0, 18) : 0
    camera.fov = 42 + extraFov
    camera.position.z = aspect < 1 ? 4.6 * THREE.MathUtils.clamp(1 / aspect, 1, 1.35) : 4.6
    camera.updateProjectionMatrix()
  }, [camera, size])

  return null
}

function Scene() {
  const groupRef = useRef(null)
  const scrollRef = useRef(0)
  const scale = useRef(1)

  useMemo(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY / (window.innerHeight || 1)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const { pointer, size } = state
    const aspect = size.width / size.height
    const targetScale = THREE.MathUtils.clamp(aspect / 1.5, 0.68, 1)
    scale.current = THREE.MathUtils.lerp(scale.current, targetScale, 0.05)
    groupRef.current.scale.setScalar(scale.current)
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
      <GoldRing position={[0.6, 0.5, 0]} scale={1.2} />
      <GlassOrb position={[-1.15, -0.55, -0.6]} scale={0.85} />
      <GlassOrb position={[1.35, -1.1, -1]} scale={0.4} />
      <GoldSliver position={[1.3, -0.85, 0.4]} rotation={[0.4, 0.3, 1.1]} scale={0.9} />
      <GoldRibbon />
      <Sparkles count={55} scale={[4.4, 4, 2.4]} size={2.2} speed={0.3} color="#f3dda4" opacity={0.65} />
      <ContactShadows position={[0, -1.35, 0]} opacity={0.45} scale={7} blur={2.6} far={2.2} color="#0d0a07" />
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
      <ResponsiveCamera />
      <Scene />
    </Canvas>
  )
}

export default HeroScene
