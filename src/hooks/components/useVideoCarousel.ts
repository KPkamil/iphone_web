import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

import { LoadedData, VideoProcess } from "@customTypes/videoCarousel";

export const useVIdeoCarousel = () => {
  const [loadedData, setLoadedData] = useState<LoadedData>([]);
  const [video, setVideo] = useState({
    videoId: 0,
    isEnd: false,
    startPlay: false,
    isPlaying: false,
    isLastVideo: false,
  });

  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);

  const { isEnd, videoId, startPlay, isPlaying, isLastVideo } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((p) => ({ ...p, startPlay: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId]?.pause();
      } else {
        startPlay && videoRef.current[videoId]?.play();
      }
    }
  }, [videoId, startPlay, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                    ? "10vw"
                    : "4vw",
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });

            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        const currentVideo = videoRef.current[videoId];

        if (currentVideo) {
          anim.progress(currentVideo.currentTime / currentVideo.duration);
        }
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleProcess = (type: VideoProcess, index?: number) => {
    switch (type) {
      case "video-end":
        if (typeof index === "undefined") {
          throw new Error("Index is required for 'video-end' type.");
        }

        setVideo((p) => ({ ...p, isEnd: true, videoId: index + 1 }));
        break;
      case "video-last":
        setVideo((p) => ({ ...p, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((p) => ({ ...p, isLastVideo: false, videoId: 0 }));
        break;
      case "play":
      case "pause":
        setVideo((p) => ({ ...p, isPlaying: !p.isPlaying }));
        break;
      default:
        return video;
    }
  };

  const handleLoadedMetadata = (event: SyntheticEvent) => {
    setLoadedData((p) => [...p, { event }]);
  };

  return {
    setVideo,
    videoRef,
    isPlaying,
    isLastVideo,
    videoDivRef,
    videoSpanRef,
    handleProcess,
    handleLoadedMetadata,
  };
};
