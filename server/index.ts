/// <reference types="vite/client" />
import express from 'express'
import { renderPage } from 'vike/server'
import httpDevServer from 'vavite/http-dev-server'
import compression from 'compression'
import { root } from './root'
import { DB } from '../api/db'
import { OPTIONS } from '../src/i18n'

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

    const localeHeader = req.headers['accept-language']?.split(',')[0].split('-')[0]

    function findLocaleAvailable(locale: string): string | undefined {
      return OPTIONS.availableLocales.find(option => option === locale)
    }

    const locale = findLocaleAvailable(req.originalUrl.split('/')[1])

    if (!locale) {
      res.redirect(`/${findLocaleAvailable(localeHeader) || OPTIONS.fallbackLocale}${req.originalUrl}`)
      return next()
    }

    const pageContextInit = {
      urlOriginal: req.originalUrl
      urlOriginal: req.originalUrl,
      locale
    }

    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
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
