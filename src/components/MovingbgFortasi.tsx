import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import './../MovingbgFortasi.css';

interface Props {
  videoSrc: string;
  direction?: string;
  children?: any; // untuk konten yang akan ditampilkan di atas video
}

function MovingbgFortasi({ videoSrc, direction = '', children }: Props) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 });

      const videoWrapper = document.querySelector('.video-container');
      if (videoWrapper) {
        observer.observe(videoWrapper);
      }

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="content-wrapper">
      <div className={`video-container ${direction}`}>
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