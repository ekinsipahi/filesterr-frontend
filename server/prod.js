import express from 'express'
import compression from 'compression'
import sirv from 'sirv'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = resolve(__dirname, '..')
const PORT      = process.env.PORT || 3000
const LOCALES   = ['tr', 'de', 'fr', 'es', 'ar']

async function start() {
  const app = express()

  app.use(compression())

  // Serve built static assets (JS, CSS, images, etc.)
  app.use(sirv(resolve(ROOT, 'dist/client'), {
    extensions: [],
    gzip: true,
  }))

  // Load SSR renderer and HTML template once at startup
  const { render } = await import(resolve(ROOT, 'dist/server/entry-server.js'))
  const template   = readFileSync(resolve(ROOT, 'dist/client/index.html'), 'utf-8')

  app.use('*', async (req, res) => {
    const url   = req.originalUrl
    const parts = url.split('/')
    const locale = LOCALES.includes(parts[1]) ? parts[1] : 'en'

    try {
      const { html: appHtml } = await render(url, locale)
      const html = template
        .replace('<!--app-html-->', appHtml)
        .replace('<!--app-head-->', `<meta name="language" content="${locale}"/>`)
      res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html)
    } catch (e) {
      console.error('[SSR Error]', e.stack)
      // Fall through to client-side rendering on SSR errors
      res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(
        template.replace('<!--app-html-->', '').replace('<!--app-head-->', '')
      )
    }
  })

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  SSR server → http://localhost:${PORT}\n`)
  })
}

start()
