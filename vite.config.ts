import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    tailwindcss(),
    ViteAliases({
      prefix: '#',
    }),
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
