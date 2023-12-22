import en from './en.json'
import he from './he.json'
import ru from './ru.json'
import vHe from 'vuetify/lib/locale/he'
import vRu from 'vuetify/lib/locale/ru'
import vEn from 'vuetify/lib/locale/en'
import { MessageContext } from 'vue-i18n'
import { differenceInMinutes, format, intlFormatDistance } from 'date-fns'


const timeRelative = (locale) => ({ list, linked }: MessageContext) => {
  const now = new Date().getTime()
  const from = list(0) as number
  const to = list(1) as number
  const hoursUntilClose = differenceInMinutes(to, now)
  debugger
  const time = intlFormatDistance(now, from, { locale })
  const timeFormat = format(to, 'hh:MM')
  if (now >= from && now <= to) {
    const time = intlFormatDistance(now, from, { locale })
    if (hoursUntilClose <= 120) {
      return `${linked('location.time.willClose')} ${time}`
    }
    return `${linked('location.time.openUntil')} ${timeFormat}`
  } else if (now < from) {
    const time = intlFormatDistance(to, now, { locale })
    return `${linked('location.time.willOpen')} ${time}`
  } else if (now > to) {
    return `${linked('location.time.hasBeenOpenedAndClosed')} (${timeFormat})`
  }
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
  OPTIONS.messages[locale].location.time!.timeRelative = timeRelative(locale)

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
