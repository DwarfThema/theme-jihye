import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { AnimationAction, Group, Material, MathUtils, Mesh } from "three";

export default function OnsuModels({ scroll }: { scroll: number }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/Onsu.gltf");
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
  }, []);

  useFrame((state) => {
    const action = actions[names[0]] as AnimationAction;
    if (action && action.time >= 0) {
      action.time = MathUtils.lerp(
        action?.time,
        action?.getClip().duration * scroll,
        0.05
      );
      console.log(action.time);
    }
  });

  return (
    <group ref={group as any}>
      {onsuModelMeshs.map((mesh, index) => (
        <mesh
          key={index}
          geometry={mesh.geometry}
          material={mesh.material as Material}
        />
      ))}

      <group name="Camera_Orientation">
        <PerspectiveCamera
          makeDefault
          far={100}
          near={0.1}
          fov={60}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <directionalLight
            castShadow
            position={[10, 20, 15]}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-left={-8}
            shadow-camera-bottom={-8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            intensity={2}
            shadow-bias={-0.0001}
          />
        </PerspectiveCamera>
      </group>
    </group>
  );
}

useGLTF.preload("/models/model.glb");
