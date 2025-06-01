import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

// 👇 Ini harus dipanggil sebelum defineConfig
dotenv.config();

// https://astro.build/config
export default defineConfig({
  darkMode: "class",
  output: "static",

  vite: {
    plugins: [tailwindcss()]
  }
});
