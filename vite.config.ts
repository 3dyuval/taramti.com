import { defineConfig } from 'vite'
import type { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import ssr, { UserConfig} from 'vike/plugin'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'


export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    ssr({
    } satisfies UserConfig),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  ssr: { noExternal: ['primevue', '@fawmi/vue-google-maps', 'vuetify', '@googlemaps/markerclusterer'] },
  build: {
    emptyOutDir: true,
  },
}) satisfies UserConfigExport
