import { BakeShadows, SoftShadows } from "@react-three/drei";
import OnsuModels from "../src/onsuModels";
import { useEffect, useState } from "react";

export default function OnsuScene({ scroll }: { scroll: number }) {
  return (
    <>
      <OnsuModels scroll={scroll} />
    </>
  );
}
