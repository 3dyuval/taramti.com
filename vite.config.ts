import { defineConfig } from 'vite'
import type { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import ssr from 'vite-plugin-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ssr({
    includeAssetsImportedByServer: true
  })],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  build: {
    emptyOutDir: true
  },
  optimizeDeps: {
    // include: ['@fawmi/vue-google-maps', 'fast-deep-equal'],
    // esbuildOptions: {
    // tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    // },
  },
}) satisfies UserConfigExport
