/**
 * Netlify build sırasında dist/client/_redirects oluşturur.
 *
 * Netlify'ın [[redirects]] bloğu env var substitution desteklemez,
 * bu yüzden DJANGO_API_URL değerini build zamanında yerleştiriyoruz.
 *
 * Kullanım (netlify.toml build.command sonuna ekle):
 *   && node scripts/gen-redirects.mjs
 *
 * Gerekli env var:
 *   DJANGO_API_URL=https://filesterr-api.onrender.com
 */

import fs from 'fs'
import path from 'path'

const apiUrl = process.env.DJANGO_API_URL
if (!apiUrl) {
  console.error('[gen-redirects] DJANGO_API_URL env var is not set — aborting')
  process.exit(1)
}

const clean = apiUrl.replace(/\/$/, '')

const lines = [
  // Django API + static proxy — force=true (splat proxy)
  `/api/*     ${clean}/api/:splat     200!`,
  `/media/*   ${clean}/media/:splat   200!`,
  `/admin/*   ${clean}/admin/:splat   200!`,
  `/static/*  ${clean}/static/:splat  200!`,

  // Static assets — serve directly from CDN
  `/assets/* /assets/:splat 200`,

  // SPA fallback → Netlify SSR function
  `/*  /.netlify/functions/ssr  200`,
]

const outPath = path.resolve('dist/client/_redirects')
fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8')
console.log(`[gen-redirects] Written ${outPath}`)
console.log(`[gen-redirects] API URL: ${clean}`)
