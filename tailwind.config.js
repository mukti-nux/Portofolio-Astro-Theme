// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx,vue,svelte}",
    "./components/**/*.{astro,js,ts,jsx,tsx}",
    "./layouts/**/*.{astro,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        info: 'var(--color-info)',
      },
      keyframes: {
        rgbGlow: {
          '0%': { borderColor: 'rgb(255,0,0)' },
          '25%': { borderColor: 'rgb(0,255,0)' },
          '50%': { borderColor: 'rgb(0,0,255)' },
          '75%': { borderColor: 'rgb(255,255,0)' },
          '100%': { borderColor: 'rgb(255,0,0)' },
        },
        rgbShadow: {
          '0%': { boxShadow: '0 0 10px rgb(255,0,0)' },
          '25%': { boxShadow: '0 0 10px rgb(0,255,0)' },
          '50%': { boxShadow: '0 0 10px rgb(0,0,255)' },
          '75%': { boxShadow: '0 0 10px rgb(255,255,0)' },
          '100%': { boxShadow: '0 0 10px rgb(255,0,0)' },
        },
        gradientMove: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },
      animation: {
        'rgb-glow': 'rgbGlow 10s linear infinite',
        'hover-rgb': 'rgbShadow 10s linear infinite',
        'gradient-move': 'gradientMove 5s ease-in-out infinite',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [],
};
