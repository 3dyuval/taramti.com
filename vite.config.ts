import type { UserConfigExport } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import vike from 'vike/plugin'
import vuetify from 'vite-plugin-vuetify'
import { vavite } from 'vavite'
import { compression } from 'vite-plugin-compression2'
import vueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin'
import { OPTIONS } from './src/i18n'
import { sitemap } from './sitemap'
import { DB } from './server/storage'

export default defineConfig(async ({ mode }) => {

  const db = await new DB().init()

  Object.assign(process.env, loadEnv(mode, process.cwd()))

  let links = []
  if (mode === 'production') {
    const locations = await db.getLocations()
    if (locations) {
      locations.forEach((item) => {
        links.push(
          {
            url: `/donation-location/${item.donationLocation.name}`,
            links: OPTIONS.availableLocales.map(locale => ({
              url: `/${locale}/donation-location/${item.donationLocation.name}`,
              lang: locale
            }))
          })
      })
    }
  }


  const buildSteps = [
    // https://vike.dev/disableAutoFullBuild
    // this in conjunction with vike.serveClientAssetsInDev: true
    // allows to specify server/client config separately
    { name: 'client' },
    {
      name: 'server',
      config: {
        build: {
          emptyOutDir: true,
          ssr: true
        }
      }
    }
  ]

  const ssr = {
    noExternal: [
      '@fawmi/vue-google-maps',
      'vuetify',
      '@googlemaps/markerclusterer'
    ]
  }

  const optimizeDeps = {
    include: ['@fawmi/vue-google-maps', 'fast-deep-equal']
  }

  return {
    buildSteps,
    ssr,
    optimizeDeps,
    plugins: [
      nodeLoaderPlugin(),
      vue(),
      vuetify(),
      vike({ disableAutoFullBuild: true }),
      vavite({
        serverEntry: '/server/index.ts',
        serveClientAssetsInDev: true
      }),
      sitemap(
        {
          outDir: 'dist/client',
          hostname: process.env.VITE_HOST_URL || 'http://localhost/',
          links
          // readable: true,
          // generateRobotsTxt: true,
          // robots: [{
          //   userAgent: '*',
          //   disallow: '/all'
          // }],
          // dynamicRoutes,
          // exclude: ['/all']
        }),
      vueI18nPlugin({
        ssr: true,
        include: [path.resolve(__dirname, './src/i18n/*.json')]
      }),
      compression()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  } satisfies UserConfigExport
})