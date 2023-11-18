import { createApp, createSSRApp, h } from 'vue'
import './style.scss'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { createPinia } from 'pinia'
import type { PageContext } from '@/types'
import { setPageContext } from '@/composables/usePageContext'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import Layout from '@/components/Layout.vue'
import { aliases, ph } from '@/assets/phosphorIcons'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { OPTIONS } from '@/i18n'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { md3 } from 'vuetify/blueprints'
import { createI18n, useI18n } from 'vue-i18n'


export function createPageApp(pageContext: PageContext, clientOnly: boolean) {
  const { Page, pageProps } = pageContext
  if (!Page || !pageProps)
    throw new Error(
      'Client-side render() hook expects pageContext.Page to be defined'
    )

  const Component = {
    render() {
      const hDefaultSlot = () => h(Page as any, pageProps || {})
      return h(Layout as any, pageProps || {}, { default: hDefaultSlot })
    }
  }

  const page = clientOnly ? createApp(Component) : createSSRApp(Component)
  const i18n: any = createI18n(
    Object.assign(OPTIONS, { locale: pageContext.locale || 'he' })
  )
  page.use(i18n)

  page.use(
    createVuetify({
      blueprint: md3,
      ssr: !clientOnly,
      components: {
        VDataTable
      },
      locale: {
        adapter: createVueI18nAdapter({ i18n, useI18n })
      },
      icons: {
        defaultSet: 'ph',
        aliases,
        sets: {
          ph
        }
      },
      defaults: {
        VBtn: {
          style: 'text-transform: none;',
          class: 'app-font'
        },
        VChip: {
          class: 'app-font'
        }
      },
      theme: {
        defaultTheme: 'taramti',
        themes: {
          'taramti': {
            colors: {
              background: '#FFFFFF',
              surface: '#FFFFFF',
              primary: '#b36578',
              'primary-darken-1': '#4c3a51',
              secondary: '#00a395',
              'secondary-darken-1': '#07645d',
              error: '#fe5f55',
              info: '#1d96d5',
              success: '#06978d',
              warning: '#ffeaa5'
            }
          }
        }
      }
    })
  )


  const store = createPinia()

  page.use(store)
  page.use(VueGoogleMaps, {
    load: {
      key: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
      installComponents: true
    }
  })

  setPageContext(page, pageContext)

  return { page, store }
}
