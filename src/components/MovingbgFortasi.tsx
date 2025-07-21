import { useEffect } from 'react';

interface Props {
  videoSrc: string;
  direction?: string;
}

function MovingbgFortasi({ videoSrc, direction = '' }: Props) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // browser-only logic
    }
  }, []);

  return (
    <div className={`video-container ${direction}`}>
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default MovingbgFortasi;
