// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Static site generation for optimal performance
  output: 'static',

  // Image optimization configuration
  image: {
    // Responsive image sizes for srcset generation
    // Covers mobile (360), tablet (540, 720), desktop (960, 1200), and high-res displays (2048)
    domains: [],
    remotePatterns: [],
  },

  vite: {
    plugins: [tailwindcss()]
  }
});