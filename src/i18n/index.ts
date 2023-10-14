import { createI18n, VueI18nOptions } from 'vue-i18n'
import en from './en.json'
import he from './he.json'

const locales = ['he', 'en'] as const

const OPTIONS: VueI18nOptions = {
  legacy: false,
  locale: 'he',
  fallbackLocale: 'en',
  availableLocales: locales,
  messages: {
    he,
    en,
  },
}

export const localesTranslated = {
  he: 'עברית',
  en: 'English',
}

const i18n = createI18n(OPTIONS)

type Language = {
  locale: keyof typeof locales
  message: any
}

export { i18n, OPTIONS }
export type { Language }
