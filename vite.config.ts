import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const resolvePath = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: '#assets', replacement: resolvePath('./src/assets') },
      {
        find: '#project-gallery',
        replacement: resolvePath('./src/components/project-gallery'),
      },
      { find: '#common', replacement: resolvePath('./src/components/common') },
      { find: '#components', replacement: resolvePath('./src/components') },
      { find: '#data', replacement: resolvePath('./src/data') },
      { find: '#routes', replacement: resolvePath('./src/routes') },
      { find: '#store', replacement: resolvePath('./src/store') },
      { find: '#lib', replacement: resolvePath('./src/lib') },
      { find: '#config', replacement: resolvePath('./src/config') },
      { find: '#', replacement: resolvePath('./src') },
    ],
  },
  plugins: [
    tailwindcss(),
    // TanStack Start's plugin must come before React's plugin.
    tanstackStart(),
    svgr(),
    react(),
  ],
  server: {
    port: 5555,
  },
  preview: {
    port: 8080,
  },
});
