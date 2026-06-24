import { readFileSync } from 'fs'
import { resolve } from 'path'

const LOCALES = ['tr', 'de', 'fr', 'es', 'ar']

// esbuild compiles ESM → CJS for Lambda, so import.meta.url is undefined.
// Use LAMBDA_TASK_ROOT (set by AWS/Netlify) or fall back to __dirname (CJS global).
// The function lands at /var/task/netlify/functions/ssr.js, so ../../ = /var/task/
/* global __dirname */
const SITE_ROOT = process.env.LAMBDA_TASK_ROOT
  || (typeof __dirname !== 'undefined' ? resolve(__dirname, '../..') : process.cwd())

const DIST_CLIENT = resolve(SITE_ROOT, 'dist/client')

let _template = null
let _render   = null

async function boot() {
  if (_template && _render) return
  _template = readFileSync(resolve(DIST_CLIENT, 'index.html'), 'utf-8')
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
    try {
      const tmpl = _template || readFileSync(resolve(DIST_CLIENT, 'index.html'), 'utf-8')
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        body: tmpl.replace('<!--app-html-->', '').replace('<!--app-head-->', ''),
      }
    } catch {
      return { statusCode: 500, body: 'Internal Server Error' }
    }
  }
}
