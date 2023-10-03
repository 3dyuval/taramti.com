import { createApp, createSSRApp, h } from 'vue'
import './style.css'
import PrimeVue from 'primevue/config'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import Tooltip from 'primevue/tooltip'
import type { PageContext } from '@/types'
import { setPageContext } from '@/composables/usePageContext'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import Layout from '@/components/Layout.vue'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'

export function createPageApp(pageContext: PageContext, clientOnly: boolean) {

  const { Page, pageProps } = pageContext
  if (!Page || !pageProps) throw new Error('Client-side render() hook expects pageContext.Page to be defined')

  const Component = {
    render() {
      const hDefaultSlot = () => h(Page as any, pageProps || {})
      return h(Layout as any, pageProps || {}, { default: hDefaultSlot })
    }
  }


  const page = clientOnly ? createApp(Component) : createSSRApp(Component)
  const store = createPinia()

  page.use(store)
  page.use(PrimeVue, { ripple: true })
  page.directive('tooltip', Tooltip)
  page.use(ToastService)
  page.use(createVuetify({
    ssr: !clientOnly
  }))

  page.use(VueGoogleMaps, {
    load: {
      key: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
      installComponents: true
    }
  })
  setPageContext(page, pageContext)

  return { page, store }

}
