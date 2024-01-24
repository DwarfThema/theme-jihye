import {
  useGLTF,
  useAnimations,
  PerspectiveCamera,
  useVideoTexture,
  useTexture,
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
  const texture = useVideoTexture("/textures/video.mp4", {
    muted: true,
    loop: true,
  });
  useEffect(() => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
  }, [texture]);

  const [
    artTex1,
    artTex2,
    artTex3,
    artTex4,
    artTex5,
    artTex6,
    artTex8,
    artTex9,
    artTex10,
    artTex11,
    artTex12,
    artTex13,
    artTex14,
    artTex15,
    artTex16,
    artTex17,
    artTex18,
  ] = useTexture([
    "/textures/arts/art1.jpg",
    "/textures/arts/art2.jpg",
    "/textures/arts/art3.jpg",
    "/textures/arts/art4.jpg",
    "/textures/arts/art5.jpg",
    "/textures/arts/art6.jpg",
    "/textures/arts/art8.jpg",
    "/textures/arts/art9.jpg",
    "/textures/arts/art10.jpg",
    "/textures/arts/art11.jpg",
    "/textures/arts/art12.jpg",
    "/textures/arts/art13.jpg",
    "/textures/arts/art14.jpg",
    "/textures/arts/art15.jpg",
    "/textures/arts/art16.jpg",
  ]);

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
          } else if (mesh.name.includes("VideoBotReflect")) {
            return (
              <mesh
                key={index}
                geometry={mesh.geometry}
                material={mesh.material as Material}
              ></mesh>
            );
          } else if (mesh.name.includes("art")) {
            const vec2 = new Vector2(0.5, 0.5);

            const vecRepeat2 = new Vector2(1, 0);

            if (mesh.name === "art1") {
              artTex1.wrapS = MirroredRepeatWrapping;
              artTex1.wrapT = MirroredRepeatWrapping;
              artTex1.offset = vecRepeat2;
              artTex1.center = vec2;
              artTex1.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex1} />
                </mesh>
              );
            } else if (mesh.name === "art2") {
              artTex2.wrapS = MirroredRepeatWrapping;
              artTex2.wrapT = MirroredRepeatWrapping;
              artTex2.offset = vecRepeat2;
              artTex2.center = vec2;
              artTex2.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex2} roughness={1} />
                </mesh>
              );
            } else if (mesh.name === "art3") {
              artTex3.wrapS = MirroredRepeatWrapping;
              artTex3.wrapT = MirroredRepeatWrapping;
              artTex3.offset = vecRepeat2;
              artTex3.center = vec2;
              artTex3.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex3} roughness={1} />
                </mesh>
              );
            } else if (mesh.name === "art4") {
              artTex4.wrapS = MirroredRepeatWrapping;
              artTex4.wrapT = MirroredRepeatWrapping;
              artTex4.offset = vecRepeat2;
              artTex4.center = vec2;
              artTex4.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex4} />
                </mesh>
              );
            } else if (mesh.name === "art5") {
              artTex5.wrapS = MirroredRepeatWrapping;
              artTex5.wrapT = MirroredRepeatWrapping;
              artTex5.offset = vecRepeat2;
              artTex5.center = vec2;
              artTex5.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex5} />
                </mesh>
              );
            } else if (mesh.name === "art6") {
              artTex6.wrapS = MirroredRepeatWrapping;
              artTex6.wrapT = MirroredRepeatWrapping;
              artTex6.offset = vecRepeat2;
              artTex6.center = vec2;
              artTex6.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex6} />
                </mesh>
              );
            } else if (mesh.name === "art7") {
              artTex6.wrapS = MirroredRepeatWrapping;
              artTex6.wrapT = MirroredRepeatWrapping;
              artTex6.offset = vecRepeat2;
              artTex6.center = vec2;
              artTex6.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex6} />
                </mesh>
              );
            } else if (mesh.name === "art8") {
              artTex8.wrapS = MirroredRepeatWrapping;
              artTex8.wrapT = MirroredRepeatWrapping;
              artTex8.offset = vecRepeat2;
              artTex8.center = vec2;
              artTex8.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex8} />
                </mesh>
              );
            } else if (mesh.name === "art9") {
              artTex9.wrapS = MirroredRepeatWrapping;
              artTex9.wrapT = MirroredRepeatWrapping;
              artTex9.offset = vecRepeat2;
              artTex9.center = vec2;
              artTex9.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex9} />
                </mesh>
              );
            } else if (mesh.name === "art10") {
              artTex10.wrapS = MirroredRepeatWrapping;
              artTex10.wrapT = MirroredRepeatWrapping;
              artTex10.offset = vecRepeat2;
              artTex10.center = vec2;
              artTex10.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex10} />
                </mesh>
              );
            } else if (mesh.name === "art11") {
              artTex11.wrapS = MirroredRepeatWrapping;
              artTex11.wrapT = MirroredRepeatWrapping;
              artTex11.offset = vecRepeat2;
              artTex11.center = vec2;
              artTex11.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex11} />
                </mesh>
              );
            } else if (mesh.name === "art12") {
              artTex12.wrapS = MirroredRepeatWrapping;
              artTex12.wrapT = MirroredRepeatWrapping;
              artTex12.offset = vecRepeat2;
              artTex12.center = vec2;
              artTex12.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex12} />
                </mesh>
              );
            } else if (mesh.name === "art13") {
              artTex13.wrapS = MirroredRepeatWrapping;
              artTex13.wrapT = MirroredRepeatWrapping;
              artTex13.offset = vecRepeat2;
              artTex13.center = vec2;
              artTex13.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex13} />
                </mesh>
              );
            } else if (mesh.name === "art14") {
              artTex14.wrapS = MirroredRepeatWrapping;
              artTex14.wrapT = MirroredRepeatWrapping;
              artTex14.offset = vecRepeat2;
              artTex14.center = vec2;
              artTex14.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex14} />
                </mesh>
              );
            } else if (mesh.name === "art15") {
              artTex15.wrapS = MirroredRepeatWrapping;
              artTex15.wrapT = MirroredRepeatWrapping;
              artTex15.offset = vecRepeat2;
              artTex15.center = vec2;
              artTex15.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex15} />
                </mesh>
              );
            } else if (mesh.name === "art16") {
              artTex16.wrapS = MirroredRepeatWrapping;
              artTex16.wrapT = MirroredRepeatWrapping;
              artTex16.offset = vecRepeat2;
              artTex16.center = vec2;
              artTex16.rotation = Math.PI * 1;
              return (
                <mesh key={index} geometry={mesh.geometry}>
                  <meshStandardMaterial map={artTex16} />
                </mesh>
              );
            }
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
useTexture.preload("/textures/arts/art1.jpg");
useTexture.preload("/textures/arts/art2.jpg");
useTexture.preload("/textures/arts/art3.jpg");
useTexture.preload("/textures/arts/art4.jpg");
useTexture.preload("/textures/arts/art5.jpg");
useTexture.preload("/textures/arts/art6.jpg");
useTexture.preload("/textures/arts/art8.jpg");
useTexture.preload("/textures/arts/art9.jpg");
useTexture.preload("/textures/arts/art10.jpg");
useTexture.preload("/textures/arts/art11.jpg");
useTexture.preload("/textures/arts/art12.jpg");
useTexture.preload("/textures/arts/art13.jpg");
useTexture.preload("/textures/arts/art14.jpg");
useTexture.preload("/textures/arts/art15.jpg");
useTexture.preload("/textures/arts/art16.jpg");
