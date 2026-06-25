import { readFileSync } from 'fs'
import { resolve } from 'path'

const LOCALES = ['tr', 'de', 'fr', 'es', 'ar']

/* global __dirname */
const SITE_ROOT = process.env.LAMBDA_TASK_ROOT
  || (typeof __dirname !== 'undefined' ? resolve(__dirname, '../..') : process.cwd())

const DIST_CLIENT = resolve(SITE_ROOT, 'dist/client')

// Static text files served directly (bypass SSR rendering)
const TEXT_FILES = {
  '/sitemap.xml': 'application/xml; charset=utf-8',
  '/robots.txt':  'text/plain; charset=utf-8',
}

// Static binary files served base64-encoded
const BINARY_FILES = {
  '/logo.png':      'image/png',
  '/favicon.ico':   'image/x-icon',
  '/favicon.svg':   'image/svg+xml',
  '/linksterr.ico': 'image/x-icon',
}

let _template = null
let _render   = null

async function boot() {
  if (_template && _render) return
  _template = readFileSync(resolve(DIST_CLIENT, 'index.html'), 'utf-8')
  const mod = await import('../../dist/server/entry-server.js')
  _render   = mod.render
}

export const handler = async (event) => {
  const url = (event.path || '/').split('?')[0]

  // ── Serve static text files directly ────────────────────────────────────────
  if (TEXT_FILES[url]) {
    try {
      const body = readFileSync(resolve(DIST_CLIENT, url.slice(1)), 'utf-8')
      return {
        statusCode: 200,
        headers: { 'Content-Type': TEXT_FILES[url], 'Cache-Control': 'public, max-age=3600' },
        body,
      }
    } catch {
      return { statusCode: 404, body: 'Not Found' }
    }
  }

  // ── Serve static binary files (base64) ──────────────────────────────────────
  if (BINARY_FILES[url]) {
    try {
      const body = readFileSync(resolve(DIST_CLIENT, url.slice(1)))
      return {
        statusCode: 200,
        headers: { 'Content-Type': BINARY_FILES[url], 'Cache-Control': 'public, max-age=86400' },
        body: body.toString('base64'),
        isBase64Encoded: true,
      }
    } catch {
      return { statusCode: 404, body: 'Not Found' }
    }
  }

  // ── SSR for all page routes ──────────────────────────────────────────────────
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
