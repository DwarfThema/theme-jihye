import {
  useGLTF,
  useAnimations,
  PerspectiveCamera,
  MeshReflectorMaterial,
  Reflector,
  Html,
  useVideoTexture,
} from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import {
  AnimationAction,
  CubeReflectionMapping,
  CubeUVReflectionMapping,
  Group,
  Material,
  MathUtils,
  Mesh,
  RepeatWrapping,
  UVMapping,
  Vector2,
} from "three";

export default function OnsuModels({ scroll }: { scroll: number }) {
  const texture = useVideoTexture("/textures/video.mp4", {
    muted: true,
    loop: true,
  });
  useEffect(() => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
  }, [texture]);

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
                  map={texture}
                  emissiveMap={texture}
                  emissiveIntensity={0.3}
                  alphaHash
                  transparent
                />
              </mesh>
            );
          }
          if (mesh.name === "VideoBotReflect") {
            return (
              <mesh
                key={index}
                geometry={mesh.geometry}
                material={mesh.material as Material}
              ></mesh>
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
