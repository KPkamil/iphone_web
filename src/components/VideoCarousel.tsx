import { highlightsSlides } from "@constants/index";
import { useVIdeoCarousel } from "@hooks/components";
import { pauseImg, playImg, replayImg } from "@utils/index";

const VideoCarousel = () => {
  const {
    setVideo,
    videoRef,
    isPlaying,
    isLastVideo,
    videoDivRef,
    videoSpanRef,
    handleProcess,
    handleLoadedMetadata,
  } = useVIdeoCarousel();

  return (
    <>
      <div className="flex items-center">
        {highlightsSlides.map((slide, index) => (
          <div key={slide.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  muted
                  id="video"
                  playsInline
                  preload="auto"
                  className={`${slide.id === 2 && "translate-x-44"} pointer-events-none`}
                  ref={(el) => (videoRef.current[index] = el)}
                  onLoadedMetadata={(event) => handleLoadedMetadata(event)}
                  onPlay={() => {
                    setVideo((p) => ({ ...p, isPlaying: true }));
                  }}
                  onEnded={() => {
                    index !== 3
                      ? handleProcess("video-end", index)
                      : handleProcess("video-last");
                  }}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, index) => (
            <span
              key={index}
              ref={(el) => (videoDivRef.current[index] = el)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[index] = el)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                  ? () => handleProcess("play")
                  : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
