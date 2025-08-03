import { useEffect } from 'preact/hooks';
import { animate } from 'motion';

export default function HeroSectionMotion() {
  useEffect(() => {
    for (let i = 1; i <= 3; i++) {
      const tombol = document.querySelector(`.tombolhero${i}`) as HTMLElement | null;
      if (tombol) {
        animate(tombol, {
          opacity: [0, 1],
          transform: ['translateY(-30px)', 'translateY(0px)']
        }, {
          duration: 1.2,
          delay: i * 0.2,
          easing: 'ease-in-out'
        });
      }
    }

    const tulisan = document.getElementById('deskripdiri') as HTMLElement | null;
    if (tulisan) {
      animate(tulisan, {
        opacity: [0, 1],
        transform: ['translateY(-20px)', 'translateY(0px)']
      }, {
        duration: 1.2,
        delay: 0.5,
        easing: 'ease-in-out'
      });
    }
  }, []);

  return null;
}
