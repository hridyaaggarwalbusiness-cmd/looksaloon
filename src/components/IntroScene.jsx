import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const STEEL = '#d7dadd'
const STEEL_WARM = '#c9ccd1'

function createBladeShape() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0.07)
  shape.quadraticCurveTo(0.45, 0.058, 0.85, 0.032)
  shape.quadraticCurveTo(1.06, 0.018, 1.24, 0.004)
  shape.quadraticCurveTo(1.06, -0.012, 0.85, -0.022)
  shape.quadraticCurveTo(0.5, -0.048, 0.09, -0.068)
  shape.quadraticCurveTo(0.02, -0.02, 0, 0.07)
  return shape
}

function createFoldedRibbonGeometry(width, height, segments) {
  const geo = new THREE.PlaneGeometry(width, height, segments, 5)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const fold = Math.sin(x * 2.4 + y * 1.1) * 0.014 + Math.sin(x * 5.1 - y * 0.6) * 0.006
    pos.setZ(i, fold)
  }
  geo.computeVertexNormals()
  return geo
}

function StudioLighting() {
  return (
    <Environment resolution={256}>
      <group>
        <Lightformer intensity={3.2} color="#fdf6e3" position={[3, 3, 3]} scale={[3, 3, 1]} form="rect" />
        <Lightformer intensity={1.5} color="#e7d9c9" position={[-3.6, -1.2, 2]} scale={[2.6, 2.6, 1]} form="rect" />
        <Lightformer intensity={2.2} color="#cfc4a8" position={[-2, 1.6, -3]} scale={[2, 4, 1]} form="rect" />
        <Lightformer intensity={0.7} color="#f8f3ea" position={[0, -3, 1]} scale={[6, 1.4, 1]} form="rect" />
        <Lightformer intensity={1.9} color="#fffaf0" position={[0, 0.6, 6]} scale={[6, 5, 1]} form="rect" />
      </group>
    </Environment>
  )
}

function CameraRig({ stage }) {
  const { camera } = useThree()
  const z = useRef(9)
  const y = useRef(0.6)
  const fov = useRef(24)
  const orbit = useRef(0)
  const sceneTime = useRef(0)

  useFrame((state, delta) => {
    sceneTime.current += delta
    const anticipation = Math.min(1, sceneTime.current / 1.35)
    const eased = 1 - Math.pow(1 - anticipation, 3)

    const establishedZ = stage.exiting ? 3.85 : stage.parted ? 4.15 : 5.6
    const establishedY = stage.parted ? 0.05 : 0.35
    const targetZ = THREE.MathUtils.lerp(9, establishedZ, eased)
    const targetY = THREE.MathUtils.lerp(0.9, establishedY, eased)
    const targetFov = THREE.MathUtils.lerp(20, 34, eased)

    z.current = THREE.MathUtils.damp(z.current, targetZ, 2, delta)
    y.current = THREE.MathUtils.damp(y.current, targetY, 2, delta)
    fov.current = THREE.MathUtils.damp(fov.current, targetFov, 2, delta)

    orbit.current += delta * 0.05
    const orbitX = Math.sin(orbit.current) * 0.32 * eased
    const orbitZOffset = Math.cos(orbit.current * 0.7) * 0.06

    camera.position.set(orbitX, y.current, z.current + orbitZOffset)
    camera.lookAt(0, -0.05, 0)
    if (camera.fov !== fov.current) {
      camera.fov = fov.current
      camera.updateProjectionMatrix()
    }
  })

  return null
}

function PivotScrew() {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.052, 0.052, 0.02, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshPhysicalMaterial color={STEEL_WARM} metalness={1} roughness={0.16} clearcoat={1} envMapIntensity={2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 5]} position={[0, 0, 0.011]}>
        <boxGeometry args={[0.07, 0.007, 0.004]} />
        <meshStandardMaterial color="#3a3a3c" roughness={0.5} metalness={0.3} />
      </mesh>
    </group>
  )
}

function Blade({ side, ringScale, stage }) {
  const group = useRef(null)
  const angle = useRef(0.32)

  const bladeGeometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(createBladeShape(), {
      depth: 0.046,
      bevelEnabled: true,
      bevelThickness: 0.007,
      bevelSize: 0.007,
      bevelSegments: 3,
      curveSegments: 10,
    })
    geo.translate(0, 0, -0.023)
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame((state, delta) => {
    const target = stage.cutting || stage.parted || stage.exiting ? 0.012 : 0.32
    angle.current = THREE.MathUtils.damp(angle.current, target, 4.5, delta)
    if (group.current) group.current.rotation.z = side * angle.current
  })

  return (
    <group ref={group}>
      <mesh geometry={bladeGeometry} scale={[side, 1, 1]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={STEEL}
          metalness={1}
          roughness={0.26}
          clearcoat={1}
          clearcoatRoughness={0.14}
          envMapIntensity={2.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[side * -0.24, side * -0.2, 0]} rotation={[0, 0, side * 0.5]} castShadow>
        <cylinderGeometry args={[0.032, 0.042, 0.6, 16]} />
        <meshPhysicalMaterial color={STEEL_WARM} metalness={1} roughness={0.28} clearcoat={1} envMapIntensity={2} />
      </mesh>
      <mesh position={[side * -0.56, side * -0.47, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.15 * ringScale, 0.046 * ringScale, 24, 40]} />
        <meshPhysicalMaterial color={STEEL_WARM} metalness={1} roughness={0.3} clearcoat={1} envMapIntensity={2} />
      </mesh>
      {side === -1 && (
        <mesh position={[side * -0.4, side * -0.3, 0]} rotation={[0, 0, side * 0.5]} castShadow>
          <boxGeometry args={[0.1, 0.03, 0.03]} />
          <meshPhysicalMaterial color={STEEL_WARM} metalness={1} roughness={0.32} clearcoat={1} envMapIntensity={1.8} />
        </mesh>
      )}
    </group>
  )
}

function Shears({ stage }) {
  const rig = useRef(null)
  const progress = useRef(0)

  useFrame((state, delta) => {
    const target = stage.parted || stage.exiting ? 1 : 0
    progress.current = THREE.MathUtils.damp(progress.current, target, 2.4, delta)
    if (rig.current) {
      rig.current.position.x = progress.current * 0.7
      rig.current.position.y = -progress.current * 0.25
      rig.current.scale.setScalar(1 - progress.current * 0.35)
      const mat = rig.current.userData.opacityTargets
      if (mat) mat.forEach((m) => { m.opacity = 1 - progress.current })
    }
  })

  return (
    <group
      ref={(node) => {
        rig.current = node
        if (node && !node.userData.opacityTargets) {
          const mats = []
          node.traverse((child) => {
            if (child.isMesh) {
              child.material.transparent = true
              mats.push(child.material)
            }
          })
          node.userData.opacityTargets = mats
        }
      }}
    >
      <PivotScrew />
      <Blade side={1} ringScale={1.15} stage={stage} />
      <Blade side={-1} ringScale={0.85} stage={stage} />
    </group>
  )
}

function RibbonHalf({ side, stage }) {
  const ref = useRef(null)
  const progress = useRef(0)
  const geometry = useMemo(() => createFoldedRibbonGeometry(2.1, 0.42, 24), [])

  useFrame((state, delta) => {
    const target = stage.parted || stage.exiting ? 1 : 0
    progress.current = THREE.MathUtils.damp(progress.current, target, 2.1, delta)
    if (ref.current) {
      const tension = stage.cutting && !stage.parted ? Math.sin(state.clock.elapsedTime * 14) * 0.006 : 0
      const sway = !stage.cutting ? Math.sin(state.clock.elapsedTime * 0.9 + side) * 0.03 : 0
      ref.current.position.x = side * (1.05 + progress.current * 1.45 + tension)
      ref.current.position.y = -progress.current * 0.85
      ref.current.rotation.z = side * progress.current * 0.5 + sway * 0.2
      ref.current.rotation.x = sway
      ref.current.material.opacity = 1 - progress.current
    }
  })

  return (
    <mesh ref={ref} geometry={geometry} position={[side * 1.05, 0, 0]}>
      <meshPhysicalMaterial
        color={side < 0 ? '#c9a15a' : '#b5715a'}
        sheen={1}
        sheenColor="#fff3da"
        sheenRoughness={0.26}
        roughness={0.3}
        metalness={0.06}
        clearcoat={0.5}
        clearcoatRoughness={0.2}
        envMapIntensity={1.2}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  )
}

function HairStrand({ curvePoints, color, delay, stage }) {
  const ref = useRef(null)
  const progress = useRef(0)

  const geometry = useRef(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.6), 100, 0.012, 8, false),
  ).current

  useFrame((state, delta) => {
    const t = Math.max(0, state.clock.elapsedTime - delay)
    const inTarget = stage.exiting ? 0 : Math.min(1, t / 1.4)
    progress.current = THREE.MathUtils.damp(progress.current, inTarget, 3, delta)
    if (ref.current) ref.current.material.opacity = progress.current * 0.85
  })

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.35}
        metalness={0.9}
        roughness={0.28}
        clearcoat={1}
        envMapIntensity={1.4}
        transparent
        opacity={0}
      />
    </mesh>
  )
}

function DustAtmosphere() {
  return (
    <>
      <Sparkles count={22} scale={[5, 3.5, 3]} size={3.2} speed={0.15} color="#f3dda4" opacity={0.35} />
      <Sparkles count={20} scale={[3.2, 2.2, 2]} size={1.4} speed={0.3} color="#fff3da" opacity={0.5} />
    </>
  )
}

function Scene({ stage }) {
  return (
    <>
      <fog attach="fog" args={['#0a0704', 8, 15]} />
      <StudioLighting />
      <ambientLight intensity={0.3} />
      <pointLight position={[1.6, 2.1, 3.2]} intensity={2} color="#fff3da" />
      <CameraRig stage={stage} />
      <Shears stage={stage} />
      <RibbonHalf side={-1} stage={stage} />
      <RibbonHalf side={1} stage={stage} />
      <HairStrand
        stage={stage}
        delay={0.15}
        color="#f3dda4"
        curvePoints={[
          new THREE.Vector3(-1.8, 0.9, -0.5),
          new THREE.Vector3(-0.8, 1.3, 0.2),
          new THREE.Vector3(0, 0.95, -0.3),
          new THREE.Vector3(0.9, 1.35, 0.3),
          new THREE.Vector3(1.9, 1, -0.2),
        ]}
      />
      <HairStrand
        stage={stage}
        delay={0.32}
        color="#e7bfae"
        curvePoints={[
          new THREE.Vector3(-1.9, -1, 0.3),
          new THREE.Vector3(-0.9, -1.4, -0.2),
          new THREE.Vector3(0.1, -1.05, 0.25),
          new THREE.Vector3(1, -1.45, -0.15),
          new THREE.Vector3(1.95, -1.05, 0.2),
        ]}
      />
      <DustAtmosphere />
      <ContactShadows position={[0, -1.1, 0]} opacity={0.5} scale={6} blur={2.4} far={2} color="#0a0704" resolution={256} frames={1} />
    </>
  )
}

function IntroScene({ stage }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      shadows
      camera={{ position: [0, 0.9, 9], fov: 20 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMappingExposure: 1.1 }}
    >
      <Scene stage={stage} />
    </Canvas>
  )
}

export default IntroScene
