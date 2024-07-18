import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { useModel } from "@hooks/components";
import { models, sizes } from "@constants/index";

import ModelView from "./ModelView";

const Model = () => {
  const {
    size,
    model,
    small,
    large,
    changeSize,
    rootElement,
    changeModel,
    cameraControlSmall,
    cameraControlLarge,
    changeSmallRotation,
    changeLargeRotation,
  } = useModel();

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              size={size}
              item={model}
              gsapType="view1"
              groupRef={small}
              controlRef={cameraControlSmall}
              setRotationState={changeSmallRotation}
            />
            <ModelView
              index={2}
              size={size}
              item={model}
              gsapType="view2"
              groupRef={large}
              controlRef={cameraControlLarge}
              setRotationState={changeLargeRotation}
            />
            {rootElement && (
              <Canvas
                className="w-full h-full"
                eventSource={rootElement}
                style={{
                  position: "fixed",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  overflow: "hidden",
                }}
              >
                <View.Port />
              </Canvas>
            )}
          </div>
          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => changeModel(item)}
                    style={{ backgroundColor: item.color[0] }}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                  />
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    onClick={() => changeSize(value)}
                    style={{
                      color: size === value ? "black" : "white",
                      backgroundColor: size === value ? "white" : "transparent",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
