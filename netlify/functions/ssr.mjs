/**
 * Netlify Function — Vue 3 SSR handler
 *
 * All routes that aren't static assets get redirected here (see netlify.toml).
 * The function renders the page server-side and returns full HTML.
 */
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST_CLIENT = resolve(__dirname, '../../dist/client')
const LOCALES     = ['tr', 'de', 'fr', 'es', 'ar']

// Cache across warm Lambda invocations
let _template = null
let _render   = null

async function boot() {
  if (_template && _render) return
  _template = readFileSync(resolve(DIST_CLIENT, 'index.html'), 'utf-8')
  // Static import path lets esbuild bundle the SSR module at deploy time
  const mod = await import('../../dist/server/entry-server.js')
  _render   = mod.render
}

export const handler = async (event) => {
  const url    = event.path || '/'
  const parts  = url.split('/')
  const locale = LOCALES.includes(parts[1]) ? parts[1] : 'en'

  try {
    await boot()

    const { html: appHtml } = await _render(url, locale)
    const html = _template
      .replace('<!--app-html-->', appHtml)
      .replace('<!--app-head-->', `<meta name="language" content="${locale}"/>`)

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: html,
    }
  } catch (e) {
    console.error('[SSR Error]', e.message)
    // Fallback: ship the empty shell and let the client hydrate
    try {
      await boot()
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        body: _template
          .replace('<!--app-html-->', '')
          .replace('<!--app-head-->', ''),
      }
    } catch {
      return { statusCode: 500, body: 'Internal Server Error' }
    }
  }
}
