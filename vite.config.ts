import { defineConfig } from 'vite'
import type { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import ssr from 'vike/plugin'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'


export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    ssr({
      includeAssetsImportedByServer: true,
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  ssr: { noExternal: ['primevue', '@fawmi/vue-google-maps', 'vuetify'] },
  build: {
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['@fawmi/vue-google-maps', 'fast-deep-equal'],
    //    disabled: false,
    //    force: true,
  },
}) satisfies UserConfigExport
