import { PageContext } from '@/types'
import { OPTIONS } from '@/i18n'

export { onBeforeRoute }

function onBeforeRoute(pageContext: PageContext) {
  const { urlWithoutLocale, locale } = extractLocale(pageContext.urlOriginal)
  return {
    pageContext: {
      locale,
      urlOriginal: urlWithoutLocale
    }
  }
}

// The Accept-Language header can be used for redirecting the user to
// the right localized URL (e.g. URL /about + Header Accept-Language:
// de-DE => redirect to /de-DE/about). Once the user is redirected to
// a localized URL, we can use the technique described above. We can
// perform the redirection by using our server (e.g. Express.js)
// independently of Vike.
//
//   Using the Accept-Language header to show different languages for
//   the same URL is considered bad practice for both SEO and UX reasons.
//   It's recommended to use Accept-Language only to redirect the user.
//
//

function extractLocale(url?: string) {
  const parts = (url || '').split('/')

  const localeFromUrl = OPTIONS.availableLocales.find(
    (locale: string) => locale === parts[1]
  )


  return {
    locale: localeFromUrl || 'he',
    urlWithoutLocale: localeFromUrl ? '/' + parts.slice(2).join('/') : url
  }
}
