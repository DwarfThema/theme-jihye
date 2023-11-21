"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import VineteeScene from "./scenes/VineteeScene";

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Canvas>
        <Environment preset="city" background />
        <OrbitControls />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <VineteeScene />
      </Canvas>
    </main>
  );
}
