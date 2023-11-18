import { createI18n, VueI18nOptions } from 'vue-i18n'
import en from './en.json'
import he from './he.json'
import ru from './ru.json'


const messages = Object.freeze({
  he,
  en,
  ru
})

const OPTIONS: VueI18nOptions = {
  legacy: false,
  locale: 'he',
  fallbackLocale: 'en',
  availableLocales: ['he', 'en', 'ru'],
  messages
}

export const localesTranslated = OPTIONS.availableLocales!
  .reduce((acc, key) => {
    //@ts-ignore
    return { ...acc, [key]: messages[key]['settings']['locale'][key] }
  }, {})

const i18n = createI18n(OPTIONS)

type Language = {
  locale: keyof typeof VueI18nOptions['availableLocales']
  message: any
}

export { i18n, OPTIONS }
export type { Language }
