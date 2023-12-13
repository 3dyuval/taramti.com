import { PageContextServer } from '@/types'
import { redirect, render } from 'vike/abort'
import { OPTIONS } from '@/i18n'

export { onBeforeRoute }


function onBeforeRoute(pageContext: PageContextServer) {

  function findLocaleAvailable(locale: string): string | undefined {
    return OPTIONS.availableLocales.find(option => option === locale)
  }

  const locale = findLocaleAvailable(pageContext.urlOriginal.split('/')[1])

  if (!locale) {
    throw redirect(`/${findLocaleAvailable(pageContext.localeHeader) || OPTIONS.fallbackLocale}${pageContext.urlOriginal}`)
  }

  return {
    pageContext: {
      urlLogical: pageContext.urlOriginal.replace(`/${locale}`, '/'),
      locale
    }
  }

  if (!pageContext.urlOriginal.startsWith('/' + pageContext.locale)) {
    throw render(404, 'Page is not available in your country')
  }


}

