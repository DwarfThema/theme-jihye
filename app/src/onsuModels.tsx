import {
  useGLTF,
  useAnimations,
  PerspectiveCamera,
  useVideoTexture,
  useTexture,
  Reflector,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import {
  AnimationAction,
  Group,
  Material,
  MathUtils,
  Mesh,
  MirroredRepeatWrapping,
  RepeatWrapping,
  Vector2,
} from "three";

export default function OnsuModels({ scroll }: { scroll: number }) {
  const vidRoomTex = useVideoTexture("/textures/video.mp4", {
    muted: true,
    loop: true,
  });
  const vidMonitorTex = useVideoTexture("/textures/monitor.mp4", {
    muted: true,
    loop: true,
  });
  useEffect(() => {
    vidRoomTex.wrapS = RepeatWrapping;
    vidRoomTex.wrapT = RepeatWrapping;

    vidMonitorTex.wrapS = RepeatWrapping;
    vidMonitorTex.wrapT = RepeatWrapping;
  }, [vidRoomTex, vidMonitorTex]);

  const group = useRef();
  const { scene, animations } = useGLTF("/models/Onsu.glb");
  const { actions, names } = useAnimations(animations, group);

  //Ref for Meshs
  const onsuModel = useMemo(() => scene, [scene]);
  const { nodes } = useGraph(onsuModel);

  const onsuModelsScene = nodes.Scene as Group;
  const onsuModelMeshs: Mesh[] = [];
  onsuModelsScene.traverse((obj) => {
    if (obj instanceof Mesh) {
      onsuModelMeshs.push(obj);
    }
  });

  //Ref for Anim
  useEffect(() => {
    if (actions[names[0]]) {
      (actions[names[0]] as AnimationAction).play().paused = true;
    }
  }, [actions, names]);

  useFrame((state) => {
    const action = actions[names[0]] as AnimationAction;
    if (action && action.time >= 0) {
      action.time = MathUtils.lerp(
        action?.time,
        action?.getClip().duration * scroll,
        0.05
      );
    }
  });

  return (
    <>
      <group ref={group as any}>
        {onsuModelMeshs.map((mesh, index) => {
          if (mesh.name === "VideoWall") {
            return (
              <mesh
                key={index}
                geometry={mesh.geometry}
                receiveShadow
                castShadow
              >
                <meshStandardMaterial
                  map={vidRoomTex}
                  emissiveMap={vidRoomTex}
                  emissiveIntensity={0.3}
                  alphaHash
                  transparent
                />
              </mesh>
            );
          } else if (mesh.name.includes("display")) {
            return (
              <mesh key={index} geometry={mesh.geometry}>
                <meshStandardMaterial
                  map={vidMonitorTex}
                  emissiveMap={vidMonitorTex}
                  emissiveIntensity={0.3}
                  alphaHash
                  transparent
                />
              </mesh>
            );
          } else {
            return (
              <mesh
                key={index}
                geometry={mesh.geometry}
                material={mesh.material as Material}
                receiveShadow
                castShadow
              />
            );
          }
        })}

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[7.34, 0.01, -7.1]}>
          <planeGeometry args={[10.3, 7.05]} />
          <MeshReflectorMaterial
            mirror={0}
            blur={[500, 800]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={1}
          />
        </mesh>

        <group name="Camera_Orientation">
          <PerspectiveCamera
            makeDefault
            far={100}
            near={0.1}
            fov={isMobile ? 80 : 60}
            rotation={[0, 0, 0]}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/models/Onsu.glb");
