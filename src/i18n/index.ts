import en from './en.json'
import he from './he.json'
import ru from './ru.json'
import vHe from 'vuetify/lib/locale/he'
import vRu from 'vuetify/lib/locale/ru'
import vEn from 'vuetify/lib/locale/en'


const OPTIONS = {
  legacy: false,
  fallbackLocale: 'en',
  availableLocales: ['he', 'en', 'ru'],
  messages: {
    he: {
      ...he,
      $vuetify: vHe
    },
    ru: {
      ...ru,
      $vuetify: vRu
    },
    en: {
      ...en,
      $vuetify: vEn
    }
  }
}

export const localesTranslated = OPTIONS.availableLocales
  .reduce((acc, key) => {
    //@ts-ignore
    return { ...acc, [key]: OPTIONS['messages'][key]['settings']['locale'][key] }
  }, {})


type Language = {
  locale: keyof typeof OPTIONS['availableLocales']
  message: any
}

export { OPTIONS }
export type { Language }
