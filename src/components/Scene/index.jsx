'use client';
import { Canvas } from '@react-three/fiber'
import Model from './Model';
import { Environment } from '@react-three/drei' 
import { OrbitControls } from "@react-three/drei";

export default function Index() {
  return (
    <div className="w-full h-[100vh]">
    <Canvas>
        <Model />
        <directionalLight intensity={2} position={[0, 2, 3]}/>
        <Environment preset="city" />
        <OrbitControls />
    </Canvas>
    </div>
  )
}