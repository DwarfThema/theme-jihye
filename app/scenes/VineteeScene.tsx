import OnsuModels from "../src/onsuModels";

export default function VineteeScene({ scroll }: { scroll: number }) {
  return (
    <>
      <OnsuModels scroll={scroll} />
    </>
  );
}
