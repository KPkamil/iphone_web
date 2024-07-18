import gsap from "gsap";
import { Group } from "three";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

import { yellowImg } from "@utils/index";
import { Model, Sizes } from "@customTypes/model";
import { animateWithGsapTimeline } from "@utils/animations";

export const useModel = () => {
  const [size, setSize] = useState<Sizes>("small");
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  const small = useRef(new Group());
  const large = useRef(new Group());
  const cameraControlSmall = useRef(null);
  const cameraControlLarge = useRef(null);

  const rootElement = document.getElementById("root");

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", {
      y: 0,
      opacity: 1,
    });
  }, []);

  const changeSize = (size: Sizes) => setSize(size);
  const changeModel = (model: Model) => setModel(model);
  const changeSmallRotation = (value: number) => setSmallRotation(value);
  const changeLargeRotation = (value: number) => setLargeRotation(value);

  return {
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
  };
};
