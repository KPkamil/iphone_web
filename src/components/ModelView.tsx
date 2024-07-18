import { Suspense } from "react";
import { Group, Vector3 } from "three";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";

import Lights from "./Lights";
import IPhone from "./IPhone";
import Loader from "./Loader";

type ModelViewProps = {
  size: string;
  index: number;
  gsapType: string;
  groupRef: React.MutableRefObject<Group>;
  controlRef: React.MutableRefObject<any>;
  setRotationState: (value: number) => void;
  item: {
    title: string;
    color: string[];
    img: string;
  };
};

const ModelView = ({
  size,
  item,
  index,
  gsapType,
  groupRef,
  controlRef,
  setRotationState,
}: ModelViewProps) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      <ambientLight intensity={3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new Vector3(0, 0, 0)} // Position in the center
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group
        ref={groupRef}
        position={[0, 0, 0]}
        name={`${index === 1 ? "small" : "large"}`}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            item={item}
            size={size}
            scale={
              index === 1 ? new Vector3(15, 15, 15) : new Vector3(17, 17, 17)
            }
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
