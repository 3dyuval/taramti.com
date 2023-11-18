import en from './en.json'
import he from './he.json'
import ru from './ru.json'


const OPTIONS = {
  legacy: false,
  fallbackLocale: 'en',
  availableLocales: ['he', 'en', 'ru'],
  messages: {
    he,
    en,
    ru
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
