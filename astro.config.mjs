import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import dotenv from 'dotenv';
import preact from '@astrojs/preact';

dotenv.config();

export default defineConfig({

  vite: {
    resolve: {
      alias: {
        motion: 'motion/dist/index.mjs',
      }
    }
  },
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind(), preact()],
});
