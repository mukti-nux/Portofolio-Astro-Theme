import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  adapter: vercel(),
  output: 'server',

  integrations: [tailwind()],
});
