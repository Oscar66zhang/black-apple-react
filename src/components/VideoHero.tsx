import React, { useEffect, useState } from "react";

type VideoHeroProps = {
  videoSrc: string;
  videoSmallSrc: string;
};

const VideoHero = ({ videoSrc, videoSmallSrc }: VideoHeroProps) => {
  const [isLargeScreen, setIsLargerScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsLargerScreen(window.innerWidth > 640);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [borderRadius, setBorderRadius] = useState(0);
  const [videoSize, setVideoSize] = useState("100%");
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setVideoSize(`${Math.max(87, 100 - scrollTop * 0.1)}%`);
      setBorderRadius(Math.min(40, scrollTop * 0.1));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <video
        key={isLargeScreen ? videoSrc : videoSmallSrc}
        autoPlay
        loop
        muted
        style={{
          width: isLargeScreen ? videoSize : "100%",
          borderRadius: isLargeScreen ? `${borderRadius}px` : "40px",
        }}
        className={`${
          isLargeScreen
            ? "h-[730px] object-cover transition-all duration-300 ease-out"
            : "w-full object-cover rounded-[40px] m-1"
        }`}
      >
        <source
          src={isLargeScreen ? videoSrc : videoSmallSrc}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default VideoHero;
