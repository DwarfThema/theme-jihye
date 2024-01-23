import { BakeShadows, SoftShadows } from "@react-three/drei";
import OnsuModels from "../src/onsuModels";

export default function OnsuScene({ scroll }: { scroll: number }) {
  return (
    <>
      <OnsuModels scroll={scroll} />
    </>
  );
}
