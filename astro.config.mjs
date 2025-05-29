import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  darkMode : "class",
  output : "static",

  vite:{
    plugins: [
      tailwindcss()
    ]
  }
});