"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

interface GLBModelProps {
  glbFile: string;
  scale?: number;
}

function GLBModel({ glbFile, scale = 1 }: GLBModelProps) {
  const { scene } = useGLTF(glbFile);
  const modelRef = useRef<THREE.Group>(null);

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  return (
    <group ref={modelRef} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#444" wireframe />
    </mesh>
  );
}

interface GLBViewerProps {
  glbFile: string;
  className?: string;
  showControls?: boolean;
  autoRotate?: boolean;
  scale?: number;
}

export default function GLBViewer({ 
  glbFile, 
  className = "w-full h-[400px]", 
  showControls = true,
  autoRotate = false,
  scale = 1
}: GLBViewerProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ 
          position: [3, 3, 3], 
          fov: 50,
          near: 0.1,
          far: 1000 
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: true 
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), 0);
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight 
            position={[-5, 3, -5]} 
            intensity={0.5} 
          />

          {/* Environment and Model */}
          <Environment preset="city" />
          <GLBModel glbFile={glbFile} scale={scale} />
          
          {/* Contact Shadows for better grounding */}
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />

          {/* Controls */}
          {showControls && (
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
              minDistance={1}
              maxDistance={10}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
} 