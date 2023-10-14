import { createI18n, I18n, VueI18nOptions } from 'vue-i18n'
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

export let i18n: I18n<typeof OPTIONS>['global']
let useI18N: I18n<typeof OPTIONS>

const init = () => {
  const instance = createI18n(OPTIONS)
  i18n = instance.global
  useI18N = instance
}

type Language = {
  locale: keyof typeof locales
  message: any
}

export { useI18N, init as initI18n, OPTIONS }
export type { Language }
