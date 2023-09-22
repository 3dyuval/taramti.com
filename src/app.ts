import { createSSRApp, createApp, h } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import Tooltip from 'primevue/tooltip'
import type { Component, PageContext, PageProps } from '@/types'
import { setPageContext } from '@/composables/usePageContext'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'

export function createPageApp(pageContext: PageContext, clientOnly: boolean) {
  const { Page: PageComponent, pageProps } = pageContext

  const AppComponent = {
    render() {
      const renderLayoutSlot = () => h(PageComponent as any, pageProps || {})
      return h(App as any, pageProps || {}, { default: renderLayoutSlot })
    },
  }

  const page = clientOnly ? createApp(AppComponent) : createSSRApp(AppComponent)

  page.use(createPinia())
  page.use(PrimeVue, { ripple: true })
  page.directive('tooltip', Tooltip)
  page.use(ToastService)
  page.use(createVuetify({
    ssr: !clientOnly,
  }))
  page.provide('pageContext', pageContext)

  
    page.use(VueGoogleMaps, {
      load: {
        key: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        installComponents: true,
      },
    })

  return page

  // Make pageContext available from any Vue component
  // setPageContext(app, pageContext)
  //
  // return app
}
