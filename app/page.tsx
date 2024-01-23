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
import { ACESFilmicToneMapping } from "three";

export default function Home() {
  const [scroll, setScroll] = useState(0);

  /*   const { posx, posy, posz, inten } = useControls({
    posx: { step: 0.1, value: -5.5 },
    posy: { step: 0.1, value: 16.6 },
    posz: { step: 0.1, value: 1.0 },
    inten: { step: 0.1, value: 4.6 },
  }); */

  return (
    <main className="absolute h-screen w-screen items-center justify-center scrollbar-hide bg-black">
      <Canvas
        shadows
        onCreated={({ gl }) => {
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.9;
        }}
      >
        <Environment preset="warehouse" />
        <SoftShadows size={10} focus={0} samples={20} />

        <directionalLight
          castShadow
          receiveShadow
          position={[-5.5, 16.6, 1.0]}
          intensity={4.6}
          shadow-mapSize={1024}
          shadow-bias={-0.002}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, -10, 10, 0.1, 50]}
          />
        </directionalLight>

        <Suspense fallback={null}>
          <OnsuScene scroll={scroll} />
        </Suspense>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={3}
            intensity={2}
          />
        </EffectComposer>
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
