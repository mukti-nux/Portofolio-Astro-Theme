<script>
  import { useEffect } from "preact/hooks";

  export default function HeroSectionMotion() {
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target;
            if (entry.isIntersecting) {
              target.classList.remove("animasi-fade-out");
              target.classList.add("animasi-fade-in");
            } else {
              target.classList.remove("animasi-fade-in");
              target.classList.add("animasi-fade-out");
            }
          });
        },
        { threshold: 0.1 }
      );

      const elements = document.querySelectorAll(".animasi-teks");
      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, []);

    return null;
  }
</script>