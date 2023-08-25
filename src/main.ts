import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import Tooltip from 'primevue/tooltip';

import 'primevue/resources/themes/saga-blue/theme.css' //the  me
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, { ripple: true })
app.directive('tooltip', Tooltip);
app.use(ToastService)

app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    installComponents: true,
  },
})
app.mount('#app')
