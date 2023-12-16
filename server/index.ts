/// <reference types="vite/client" />
import express from 'express'
import { renderPage } from 'vike/server'
import httpDevServer from 'vavite/http-dev-server'
import compression from 'compression'
import { root } from './root'
import { DB } from './storage'
import { OPTIONS } from '@/i18n'


startServer()

async function startServer() {
  const db = new DB()
  await db.init()

  const app = express()

  app.use(compression())

  if (!httpDevServer) {
    app.use(express.static(`${root}/client`))
  }

  app.get('*', async (req, res, next) => {

    let acceptLanguage = req.headers['accept-language']?.split(',')[0].split('-')[0]
    acceptLanguage = acceptLanguage in OPTIONS.availableLocales && acceptLanguage

    let refererUrl: string | URL = req.headers['referer']
    let referer
    if (refererUrl) {
      refererUrl = new URL(refererUrl)
      const firstPart = refererUrl.pathname.split('/')[1]

      if (OPTIONS.availableLocales.includes(firstPart)) {
        referer = firstPart
      }
    }

    // add precedence for first url part
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      locale: referer || acceptLanguage || OPTIONS.fallbackLocale,
      db
    }

    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    if (httpResponse.statusCode > 300 && httpResponse.statusCode < 400) {
      res.redirect(httpResponse.statusCode, httpResponse.headers.find(([header]) => header === 'Location')[1])
      return next()
    }
    const { statusCode, body } = httpResponse
    res.status(statusCode).send(body)
  })

  if (httpDevServer) {
    httpDevServer!.on('request', app)
  } else {
    const port = process.env.PORT || 3000
    app.listen(port)
    console.log(`Server running at http://localhost:${port}`)
  }
}
