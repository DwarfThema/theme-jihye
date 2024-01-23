"use client";

import {
  BakeShadows,
  Environment,
  Loader,
  OrbitControls,
  SoftShadows,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import OnsuScene from "./scenes/onsuScene";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";

export default function Home() {
  const [scroll, setScroll] = useState(0);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Canvas shadows>
        <BakeShadows />
        {<Environment preset="warehouse" />}
        {<SoftShadows size={10} focus={0} samples={20} />}

        <directionalLight
          castShadow
          position={[-9.3, 1.3, 2.5]}
          intensity={2.0}
          shadow-mapSize={1024}
          shadow-bias={-0.001}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, -10, 10, 0.1, 50]}
          />
        </directionalLight>

        <Suspense fallback={null}>
          <OnsuScene scroll={scroll} />
        </Suspense>
      </Canvas>
      <Loader />
      <div
        className="snap-start select-none overflow-y-auto h-full w-full absolute top-0 left-0"
        onScroll={(e) => {
          const target = e.target as HTMLElement;
          setScroll(
            target.scrollTop / (target.scrollHeight - window.innerHeight)
          );
          console.log(scroll);
        }}
      >
        <div style={{ height: "5000vh" }} />
      </div>
    </main>
  );
}
