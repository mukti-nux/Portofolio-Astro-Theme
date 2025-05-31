// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,astro,ts,tsx,vue,svelte}", // sesuaikan dengan struktur project kamu
  ],
  theme: {
    extend: {
      keyframes: {
        rgbGlow: {
          '0%':   {  borderColor: 'rgb(255,0,0)' },
          '25%':  {  borderColor: 'rgb(0,255,0)' },
          '50%':  {  borderColor: 'rgb(0,0,255)' },
          '75%':  {  borderColor: 'rgb(255,255,0)' },
          '100%': {  borderColor: 'rgb(255,0,0)' },
        },
      },
      animation: {
        'rgb-glow': 'rgbGlow 10s linear infinite',
      },
    },
  },
  plugins: [],
};
// shadow nya
module.exports = {
  theme: {
    extend: {
      keyframes: {
        rgbShadow: {
          '0%':   { boxShadow: '0 0 10px rgb(255,0,0)' },
          '25%':  { boxShadow: '0 0 10px rgb(0,255,0)' },
          '50%':  { boxShadow: '0 0 10px rgb(0,0,255)' },
          '75%':  { boxShadow: '0 0 10px rgb(255,255,0)' },
          '100%': { boxShadow: '0 0 10px rgb(255,0,0)' },
        },
      },
      animation: {
        'hover-rgb': 'rgbShadow 10s linear infinite',
      },
    },
  },
};
// gradient move
module.exports = {
  theme: {
    extend: {
      animation: {
        'gradient-move': 'gradientMove 5s ease-in-out infinite',
      },
      keyframes: {
        gradientMove: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
};

