import { defineConfig } from 'vite'
import type { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  optimizeDeps: {
    include: ['@fawmi/vue-google-maps', 'fast-deep-equal'],
    esbuildOptions: {
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    },
  },
}) satisfies UserConfigExport
