import { useEffect } from 'preact/hooks';
import { animate } from 'motion';

export default function HeroMotion() {
  useEffect(() => {
    for (let i = 1; i <= 3; i++) {
      const tombol = document.getElementsByClassName(`tombolhero${i}`);
      if (tombol) {
        animate(tombol, { opacity: [0, 1], y: [-30, 0] }, {
          duration: 1.2,
          delay: i * 0.2,
          easing: 'ease-in-out',
        });
      }
    }

    const tulisan = document.getElementById('deskripdiri');
    if (tulisan) {
      animate(tulisan, { opacity: [0, 1], y: [-20, 0] }, {
        duration: 1.2,
        delay: 0.5,
        easing: 'ease-in-out',
      });
    }
  }, []);

  return null; // Komponen ini hanya untuk menjalankan efek
}