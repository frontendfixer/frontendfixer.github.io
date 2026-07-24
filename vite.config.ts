import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
      '#assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '#common': fileURLToPath(
        new URL('./src/components/common', import.meta.url),
      ),
      '#components': fileURLToPath(
        new URL('./src/components', import.meta.url),
      ),
      '#config': fileURLToPath(new URL('./src/config', import.meta.url)),
      '#data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '#lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '#project-gallery': fileURLToPath(
        new URL('./src/components/project-gallery', import.meta.url),
      ),
      '#routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      '#store': fileURLToPath(new URL('./src/store', import.meta.url)),
    },
  },
  plugins: [tanstackStart(), nitro(), tailwindcss(), react(), svgr()],
  server: {
    port: 5555,
    open: true,
  },
  preview: {
    port: 8080,
  },
});
