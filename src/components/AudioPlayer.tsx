import { useEffect, useState } from "react";

export default function AudioPlayer() {
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      setCanPlay(true);
      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  return (
    <>
      {canPlay && (
        <audio autoPlay loop>
          <source src="/soundbg.mp3" type="audio/mpeg" />
        </audio>
      )}
    </>
  );
}