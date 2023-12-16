import { OPTIONS } from '@/i18n'
import { redirect } from 'vike/abort'
import { PageContextServer } from '@/types'

export function onBeforeRoute(pageContext: PageContextServer) {
  let url = pageContext.urlOriginal

  // Remove leading slash if it exists
  if (url.startsWith('/')) {
    url = url.substring(1)
  }

  // Get the first part of the URL path
  const firstPart = url.split('/')[0]

  // Check if the first part of the URL path is a valid locale
  if (!OPTIONS.availableLocales.includes(firstPart)) {
    // If it's not, redirect to a URL that includes the locale
    throw redirect(`/${pageContext.locale}${url}`, 302)
  }

  // Remove trailing slash if it exists
  if (url.endsWith('/')) {
    url = url.slice(0, -1)
  }

  // Add leading slash
  url = '/' + url

  // Get the current locale from the redirected URL
  const currentLocale = url.split('/')[1]

  // Handle locale
  return {
    pageContext: {
      urlLogical: url.replace(`/${currentLocale}`, '/'),
      locale: currentLocale
    }
  }
}