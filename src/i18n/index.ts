import { createI18n } from 'vue-i18n'
import en from './en.json'
import he from './he.json'


const i18n = createI18n({
  locale: 'he',
  fallbackLocale: 'en',
  availableLocales: ['he', 'en'],
  messages: {
    he,
    en
  }
})


type Locale = 'he' | 'en'

type Language = {
  locale: Locale,
  message: any,
}


export default i18n