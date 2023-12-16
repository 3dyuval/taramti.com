import en from './en.json'
import he from './he.json'
import ru from './ru.json'
import vHe from 'vuetify/lib/locale/he'
import vRu from 'vuetify/lib/locale/ru'
import vEn from 'vuetify/lib/locale/en'
import { MessageContext } from 'vue-i18n'
import { intlFormatDistance } from 'date-fns'


const openFromRelative = ({ locale }) => ({ list, linked }: MessageContext) => {
  const time = intlFormatDistance(list(0), new Date(), { locale })
  return `${linked('location.time.openUntil')} ${time}`
}
const openToRelative = ({ locale }) => ({ list, linked }: MessageContext) => {
  const time = intlFormatDistance(list(0), new Date(), { locale })
  return `${linked('location.time.openUntil')} ${time}`
}

const OPTIONS = {
  legacy: false,
  globalInjection: true,
  fallbackLocale: 'en',
  availableLocales: ['he', 'en', 'ru'] as const,
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

for (const locale of OPTIONS.availableLocales) {
  OPTIONS.messages[locale].location.time.openFromRelative = openFromRelative(locale)
  OPTIONS.messages[locale].location.time.openToRelative = openToRelative(locale)
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
