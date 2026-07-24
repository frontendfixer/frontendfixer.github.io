import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = process.env.VITE_SITE_URL ?? 'https://frontendfixer.dev';

export default defineConfig({
  resolve: {
    alias: {
      '#': path.resolve(__dirname, 'src'),
      '#assets': path.resolve(__dirname, 'src/assets'),
      '#components': path.resolve(__dirname, 'src/components'),
      '#config': path.resolve(__dirname, 'src/config'),
      '#lib': path.resolve(__dirname, 'src/lib'),
      '#routes': path.resolve(__dirname, 'src/routes'),
      '#common': path.resolve(__dirname, 'src/components/common'),
      '#project-gallery': path.resolve(
        __dirname,
        'src/components/project-gallery',
      ),
    },
  },
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      sitemap: {
        enabled: true,
        host: siteUrl,
      },
    }),
    tailwindcss(),
    react(),
    svgr(),
  ],
  server: {
    port: 5555,
    open: true,
  },
  preview: {
    port: 8080,
  },
});
