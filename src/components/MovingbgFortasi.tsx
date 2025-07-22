import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import './../MovingbgFortasi.css';

interface Props {
  videoSrc: string;
  direction?: string;
  children?: any;
}

function MovingbgFortasi({ videoSrc, direction = '', children }: Props) {
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && videoContainerRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1, rootMargin: '50px' });

      observer.observe(videoContainerRef.current);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="content-wrapper">
      <div ref={videoContainerRef} className={`video-container ${direction}`}>
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          loading="lazy"
          className="video-background"
        />
      </div>
      <div className="content-overlay">
        {children}
      </div>
    </div>
  );
}

export default MovingbgFortasi;