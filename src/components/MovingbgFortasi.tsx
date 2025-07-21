import { useEffect } from 'react';

function MovingbgFortasi({ videoSrc, direction }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // semua kode browser-only di sini
      // contohnya: pakai IntersectionObserver
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
