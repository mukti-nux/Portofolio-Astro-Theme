import { useEffect } from 'preact/hooks';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HeroSectionMotion() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // animasi muncul sekali
  }, []);

  return null; // tidak render elemen
}
