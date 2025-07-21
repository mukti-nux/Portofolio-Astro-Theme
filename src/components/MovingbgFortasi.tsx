import { useEffect, useState, useRef } from "react";
import "./../MovingbgFortasi.css";

type MovingbgFortasiProps = {
  videoSrc: string;
  direction?: "left" | "right" | "bottom";
};

export default function MovingbgFortasi({
  videoSrc,
  direction = "bottom"
}: MovingbgFortasiProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={videoRef}
      className={`video-wrapper ${direction} ${isVisible ? "active" : ""}`}
    >
      {isVisible && (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          loading="lazy"
        />
      )}
    </div>
  );
}
