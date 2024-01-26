"use client";

import {
  BakeShadows,
  Environment,
  Loader,
  OrbitControls,
  SoftShadows,
  useProgress,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import OnsuScene from "./scenes/onsuScene";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { ACESFilmicToneMapping } from "three";

function ExportBoard() {
  const { progress, loaded, active } = useProgress();

  const [explainBoard, setExplainBoard] = useState(true);
  const [explainBoardEnd, setExplainBoardEnd] = useState(false);

  useEffect(() => {
    if (explainBoard && !active) {
      setTimeout(() => {
        setExplainBoard(false);
      }, 3000);
      setTimeout(() => {
        setExplainBoardEnd(true);
      }, 7000);
    }
  }, [loaded, explainBoard, explainBoardEnd]);
  return (
    <div
      className={` transition-opacity ease-in-out duration-[2500ms] fixed font-semibold text-stone-950 ${
        explainBoard ? "opacity-100" : "opacity-0"
      } ${explainBoardEnd ? "hidden -z-10" : "z-30"}
      `}
    >
      스크롤을 통해 이동하세요. <br />
      Go through the scroll.
    </div>
  );
}

export default function Home() {
  const [scroll, setScroll] = useState(0);
  const { loaded } = useProgress();

  return (
    <main className="absolute h-screen w-screen items-center justify-center bg-black">
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
        className="snap-start select-none overflow-y-auto h-full w-full absolute top-0 left-0 flex items-center justify-center"
        onScroll={(e) => {
          const target = e.target as HTMLElement;
          setScroll(
            target.scrollTop / (target.scrollHeight - window.innerHeight)
          );
        }}
      >
        {loaded ? <ExportBoard /> : null}
        <div style={{ height: "5000vh" }} />
      </div>
    </main>
  );
}
