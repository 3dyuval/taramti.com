export { render }
export const doNotPrerender = true
export const passToClient = [
  'pageProps',
  'urlPathname',
  'initialStoreState',
  'locale',
]
import { renderToString as renderToString_ } from '@vue/server-renderer'
import type { App } from 'vue'
import { dangerouslySkipEscape, escapeInject } from 'vike/server'
import { createPageApp } from './page'
import type { PageContextServer } from '@/types'

export { onBeforeRender } from '@/_getData'

async function render(pageContext: PageContextServer) {
  const { page, store } = createPageApp(pageContext, false)
  let pageHTML = ''

  if (pageContext.Page) {
    pageHTML = await renderToString(page)
  }

  // See https://vite-plugin-ssr.com/head
  const { documentProps, getDocumentProps } = pageContext.exports

  // let title = i18n.t('meta.title')
  // let description = i18n.t('meta.description')
  let title, description
  // Static Head Tags
  if (documentProps?.title) {
    title = documentProps.title
  }

  if (documentProps?.description) {
    description = documentProps.description
  }

  // Dynamic Head Tags
  if (typeof getDocumentProps === 'function' && pageContext.pageProps) {
    const props = getDocumentProps(pageContext.pageProps)
    if (props && props.title) {
      title = props.title
    }

    if (props && props.description) {
      description = props.description
    }
  }

  const gtagId = import.meta.env.VITE_GA_ID
  const analyticsScripts = `
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${gtagId}"></script>
  <script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${gtagId}');
    </script>
  `

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${pageContext.locale || 'he'}">
      <head>
      <meta charset='UTF-8' />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/site.webmanifest">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
      <meta name="msapplication-TileColor" content="#da532c">
      <meta name="theme-color" content="#ffffff">
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='theme-color' content='#ffffff' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      ${import.meta.env.PROD && gtagId ? dangerouslySkipEscape(analyticsScripts) : ''}
        <meta name='description' content='${description || 'Blood donation locations in Israel'}' />
        <title>${title || 'Taramti'}</title>
      </head>
      <body>
        <div id='app'>${dangerouslySkipEscape(pageHTML)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      initialStoreState: store.state.value,
      locale: pageContext.locale,
    },
  }
}

async function renderToString(app: App) {
  let err: unknown
  // Workaround: renderToString_() swallows errors in production, see https://github.com/vuejs/core/issues/7876
  app.config.errorHandler = (err_) => {
    err = err_
  }
  const appHtml = await renderToString_(app)
  if (err) throw err
  return appHtml
}
