import React from "react";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="w-full aspect-video bg-black overflow-hidden shadow-md">
      <video
        width="100%"
        controls
        className="w-full h-full object-contain"
        poster="../assets/video-thumbnaial.svg"
      >
        <source src={videoUrl} type="video/mp4" />
        Browser kamu tidak mendukung pemutaran video.
      </video>
    </div>
  );
};

export default VideoPlayer;
