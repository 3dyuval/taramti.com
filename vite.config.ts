import { defineConfig } from 'vite'
import type { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import ssr from 'vite-plugin-ssr/plugin'

const noExternal = process.env.NODE_ENV !== 'production' ? [] : ['primevue']

export default defineConfig({
  plugins: [
    vue(),
    ssr({
      includeAssetsImportedByServer: true,
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  ssr: { noExternal },
  build: {
    emptyOutDir: true,
  },
}) satisfies UserConfigExport
