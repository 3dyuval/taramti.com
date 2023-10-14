export { onBeforeRoute }


function onBeforeRoute(pageContext) {
  const { urlWithoutLocale, locale } = extractLocale(pageContext.urlOriginal)
  return {
    pageContext: {
      // We make `locale` available as `pageContext.locale`
      locale,
      // We overwrite `pageContext.urlOriginal`
      urlOriginal: urlWithoutLocale
    }
  }
}

// We can also use a library instead of implementing our own locale retrieval mechanism
function extractLocale(url: string) {
  // We determine the locale, for example:
  //  extractLocale('/en-US/film/42').locale === 'en-US'
  //  extractLocale('/de-DE/film/42').locale === 'de-DE'

  const parts = url.split('/')

    // We remove the locale, for example:
    //  extractLocale('/en-US/film/42').urlWithoutLocale === '/film/42'
    //  extractLocale('/de-DE/film/42').urlWithoutLocale === '/film/42'
    //  ...


  return { locale: parts[1], urlWithoutLocale: parts.splice(2) }
}