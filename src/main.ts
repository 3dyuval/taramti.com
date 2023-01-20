import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import LottieAnimation from 'lottie-web-vue'
import ToastService from 'primevue/toastservice'

import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css       ' //core css
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)

app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    installComponents: true,
  },
})
app.use(LottieAnimation)
app.mount('#app')
