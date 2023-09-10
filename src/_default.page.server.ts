export { render }
export const doNotPrerender = true;
export const passToClient = ['pageProps', 'urlPathname']

import { getData } from '../api/index'
import { renderToString as renderToString_ } from '@vue/server-renderer'
import type { App } from 'vue'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import { createPageApp } from './app'
import logoUrl from './logo.svg'
import type { PageContextServer } from '@/types'



async function render(pageContext: PageContextServer) {
  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  // if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
  const page = createPageApp(pageContext, false)
  let pageHTML =  ''
  
  if (pageContext.Page) {
    pageHTML =  await renderToString(page)
  }

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Taramti תרמתי'
  const desc = (documentProps && documentProps.description) || 'Taramti תרמתי - Your source for blood donation information and centers. Learn about the process and benefits of donating blood.'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="he">
      <head>
      <meta charset="UTF-8" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(pageHTML)}</div>
      </body>
    </html>`

  return {
    documentHtml,
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