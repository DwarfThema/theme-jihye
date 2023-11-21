import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { useControls } from "leva";
import { BlendFunction } from "postprocessing";

export default function VineteeScene() {
  const { offset, darkness } = useControls({
    offset: { value: 0.7, step: 0.1 },
    darkness: { value: 50, step: 1 },
  });

  return (
    <>
      <EffectComposer>
        <Vignette
          offset={offset}
          darkness={darkness}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  );
}
