import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import dotenv from 'dotenv';
import React from '@astrojs/react';

dotenv.config();

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind(), React()],
});
