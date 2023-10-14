import type { UserConfigExport } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import ssr, { UserConfig } from 'vike/plugin'
import vuetify from 'vite-plugin-vuetify'
import { vavite } from 'vavite'
import { compression } from 'vite-plugin-compression2'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  buildSteps: [
    { name: 'client' },
    {
      name: 'server',
      config: {
        build: {
          emptyOutDir: true,
          ssr: true,
        },
      },
    },
  ],
  plugins: [
    vue(),
    vuetify(),
    VueI18nPlugin({
      ssr: true,
      include: [path.resolve(__dirname, './src/i18n/*.json')],
    }),
    ssr({ disableAutoFullBuild: true } satisfies UserConfig),
    vavite({
      serverEntry: '/server/index.ts',
      serveClientAssetsInDev: true,
    }),
    compression(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  ssr: {
    noExternal: [
      'primevue',
      '@fawmi/vue-google-maps',
      'vuetify',
      '@googlemaps/markerclusterer',
    ],
  },
  optimizeDeps: {
    include: ['@fawmi/vue-google-maps', 'fast-deep-equal'],
  },
}) satisfies UserConfigExport
