"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import OnsuScene from "./scenes/onsuScene";

export default function Home() {
  const [scroll, setScroll] = useState(0);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      {
        <Canvas shadows>
          <Environment preset="forest" background blur={0.15} />
          <Suspense fallback={null}>
            <OnsuScene scroll={scroll} />
          </Suspense>
        </Canvas>
      }
      <div
        className="snap-start select-none overflow-y-auto h-full w-full absolute top-0 left-0"
        onScroll={(e) => {
          const target = e.target as HTMLElement;
          setScroll(
            target.scrollTop / (target.scrollHeight - window.innerHeight)
          );
        }}
      >
        <div style={{ height: "5000vh" }} />
      </div>
    </main>
  );
}
