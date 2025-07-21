import React, { useRef, useEffect } from 'react';

interface Props {
  videoSrc: string;
  direction?: 'left' | 'right' | 'bottom';
}

const MovingbgFortasi: React.FC<Props> = ({ videoSrc, direction = 'left' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // optional: tangani error autoplay
      });
    }
  }, []);

  return (
    <div className={`video-wrapper move-${direction}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        className="w-full h-auto"
      />
    </div>
  );
};

export default MovingbgFortasi;
