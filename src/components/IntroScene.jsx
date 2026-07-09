import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, RoundedBox, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const GOLD = '#d9b46a'

function createBladeShape() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0.09)
  shape.quadraticCurveTo(0.5, 0.05, 1.08, 0.008)
  shape.quadraticCurveTo(0.55, -0.025, 0.07, -0.08)
  shape.quadraticCurveTo(0.015, -0.02, 0, 0.09)
  return shape
}

function StudioLighting() {
  return (
    <Environment resolution={256}>
      <group>
        <Lightformer intensity={3.2} color="#f8ecc9" position={[3, 3, 3]} scale={[3, 3, 1]} form="rect" />
        <Lightformer intensity={1.5} color="#e7bfae" position={[-3.6, -1.2, 2]} scale={[2.6, 2.6, 1]} form="rect" />
        <Lightformer intensity={2.2} color="#c9a15a" position={[-2, 1.6, -3]} scale={[2, 4, 1]} form="rect" />
        <Lightformer intensity={0.7} color="#f8f3ea" position={[0, -3, 1]} scale={[6, 1.4, 1]} form="rect" />
        <Lightformer intensity={1.8} color="#fffaf0" position={[0, 0.6, 6]} scale={[6, 5, 1]} form="rect" />
      </group>
    </Environment>
  )
}

function CameraRig({ stage }) {
  const { camera } = useThree()
  const z = useRef(5.6)
  const y = useRef(0.35)

  useFrame((state, delta) => {
    const target = stage.exiting ? 3.85 : stage.parted ? 4.15 : 5.6
    z.current = THREE.MathUtils.damp(z.current, target, 2.2, delta)
    y.current = THREE.MathUtils.damp(y.current, stage.parted ? 0.05 : 0.35, 2.2, delta)
    const drift = Math.sin(state.clock.elapsedTime * 0.22) * 0.05
    camera.position.set(drift, y.current, z.current)
    camera.lookAt(0, -0.05, 0)
  })

  return null
}

function Blade({ side, stage }) {
  const group = useRef(null)
  const angle = useRef(0.3)

  const bladeGeometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(createBladeShape(), {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 3,
      curveSegments: 10,
    })
    geo.translate(0, 0, -0.025)
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame((state, delta) => {
    const target = stage.cutting || stage.parted || stage.exiting ? 0.015 : 0.3
    angle.current = THREE.MathUtils.damp(angle.current, target, 5, delta)
    if (group.current) group.current.rotation.z = side * angle.current
  })

  return (
    <group ref={group}>
      <mesh geometry={bladeGeometry} scale={[side, 1, 1]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={GOLD}
          metalness={1}
          roughness={0.24}
          clearcoat={1}
          clearcoatRoughness={0.15}
          envMapIntensity={2.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[side * -0.22, side * -0.18, 0]} rotation={[0, 0, side * 0.55]} castShadow>
        <cylinderGeometry args={[0.035, 0.045, 0.55, 16]} />
        <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.18} clearcoat={1} envMapIntensity={1.8} />
      </mesh>
      <mesh position={[side * -0.5, side * -0.42, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.16, 0.05, 24, 40]} />
        <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.2} clearcoat={1} envMapIntensity={1.8} />
      </mesh>
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
      <mesh castShadow>
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.15} clearcoat={1} />
      </mesh>
      <Blade side={1} stage={stage} />
      <Blade side={-1} stage={stage} />
    </group>
  )
}

function RibbonHalf({ side, stage }) {
  const ref = useRef(null)
  const progress = useRef(0)

  useFrame((state, delta) => {
    const target = stage.parted || stage.exiting ? 1 : 0
    progress.current = THREE.MathUtils.damp(progress.current, target, 2.1, delta)
    if (ref.current) {
      ref.current.position.x = side * (1.15 + progress.current * 1.4)
      ref.current.position.y = -progress.current * 0.85
      ref.current.rotation.z = side * progress.current * 0.5
      ref.current.material.opacity = 1 - progress.current
    }
  })

  return (
    <RoundedBox ref={ref} args={[2.1, 0.4, 0.05]} radius={0.05} smoothness={4} position={[side * 1.15, 0, 0]}>
      <meshPhysicalMaterial
        color={side < 0 ? '#c9a15a' : '#b5715a'}
        sheen={1}
        sheenColor="#fff3da"
        sheenRoughness={0.28}
        roughness={0.32}
        metalness={0.08}
        clearcoat={0.55}
        clearcoatRoughness={0.18}
        envMapIntensity={1.2}
        transparent
      />
    </RoundedBox>
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

function Scene({ stage }) {
  return (
    <>
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
      <Sparkles count={28} scale={[4, 3, 2.5]} size={2} speed={0.35} color="#f3dda4" opacity={0.55} />
      <ContactShadows position={[0, -1.1, 0]} opacity={0.5} scale={6} blur={2.4} far={2} color="#0a0704" resolution={256} frames={1} />
    </>
  )
}

function IntroScene({ stage }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      shadows
      camera={{ position: [0, 0.35, 5.6], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMappingExposure: 1.15 }}
    >
      <Scene stage={stage} />
    </Canvas>
  )
}

export default IntroScene
