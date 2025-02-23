"use client"
import { useEffect, useRef, useState, Suspense } from "react"
import { Canvas, extend, useThree, useFrame, useLoader } from "@react-three/fiber"
import { useTexture, Environment, Lightformer } from "@react-three/drei"
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier"
import { MeshLineGeometry, MeshLineMaterial } from "meshline"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import "./Lanyard.css"

extend({ MeshLineGeometry, MeshLineMaterial })

const cardGLB = "/cardmain.glb"
const lanyardTexturePath = "/lanyard.png"

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: transparent, antialias: true, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
          gl.outputEncoding = THREE.sRGBEncoding
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI} />
          <Physics gravity={gravity} timeStep={1 / 60}>
            <Band />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={4}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={8}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={4}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={1}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  )
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef()
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3()
  const segmentProps = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 }

  const gltf = useLoader(GLTFLoader, cardGLB)
  const { nodes, materials } = gltf
  const texture = useTexture(lanyardTexturePath)
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
  )
  const [dragged, setDragged] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [touchStartPos, setTouchStartPos] = useState(new THREE.Vector2())
  const [isTouchMoving, setIsTouchMoving] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab"
      return () => void (document.body.style.cursor = "auto")
    }
  }, [hovered, dragged])

  const handlePointerDown = (e) => {
    if (e.pointerType === "touch") {
      setTouchStartPos(new THREE.Vector2(e.clientX, e.clientY))
      setIsTouchMoving(false)
    } else {
      e.target.setPointerCapture(e.pointerId)
      setDragged(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
    }
  }

  const handlePointerUp = (e) => {
    if (e.pointerType !== "touch") {
      e.target.releasePointerCapture(e.pointerId)
      setDragged(false)
    }
  }

  const handlePointerMove = (e, state) => {
    if (e && e.pointerType === "touch") {
      const touchCurrentPos = new THREE.Vector2(e.clientX, e.clientY)
      const touchDelta = touchCurrentPos.sub(touchStartPos)

      if (touchDelta.length() > 10) {
        setIsTouchMoving(true)
      }

      if (isTouchMoving) {
        e.preventDefault() // Prevent scrolling only when moving the card
        setDragged(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
      }
    }

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
  }

  useFrame((state, delta) => {
    handlePointerMove(null, state)

    if (fixed.current) {
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  curve.curveType = "chordal"
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  // Improve texture quality
  Object.values(materials).forEach((material) => {
    if (material.map) {
      material.map.anisotropy = 16
      material.map.minFilter = THREE.LinearMipmapLinearFilter
      material.map.magFilter = THREE.LinearFilter
    }
  })

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}

