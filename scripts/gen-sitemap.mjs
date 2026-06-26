/**
 * Generates public/sitemap.xml at build time.
 * Run: node scripts/gen-sitemap.mjs
 * Netlify runs this before vite build so it ends up in dist/client/sitemap.xml.
 *
 * Rules:
 *  - MULTILINGUAL_PAGES: one <url> per locale (10 locales × N pages)
 *  - EN_ONLY_PAGES: single <url>, no hreflang
 *  - English URL uses no locale prefix (/ or /slug)
 *  - Other locales: /locale/ or /locale/slug
 */

import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const BASE      = 'https://filesterr.com'
const LOCALES   = ['en', 'tr', 'de', 'fr', 'es', 'ar', 'zh', 'pt', 'ja', 'ru']
const TODAY     = new Date().toISOString().slice(0, 10)

// ── Pages available in all 10 locales ────────────────────────────────────────
const MULTILINGUAL_PAGES = [
  // Core
  { slug: '',             priority: '1.0', changefreq: 'weekly'  },
  { slug: 'upload',       priority: '0.9', changefreq: 'weekly'  },
  { slug: 'features',     priority: '0.8', changefreq: 'monthly' },
  { slug: 'pricing',      priority: '0.8', changefreq: 'monthly' },
  { slug: 'analytics',    priority: '0.7', changefreq: 'monthly' },
  { slug: 'about',        priority: '0.6', changefreq: 'monthly' },
  { slug: 'docs',         priority: '0.7', changefreq: 'monthly' },
  { slug: 'blog',         priority: '0.6', changefreq: 'weekly'  },
  { slug: 'careers',      priority: '0.5', changefreq: 'monthly' },
  // SEO landing pages
  { slug: 'share-files',             priority: '0.8', changefreq: 'monthly' },
  { slug: 'best-file-sharing-sites', priority: '0.8', changefreq: 'monthly' },
  { slug: 'file-sharing-app',        priority: '0.8', changefreq: 'monthly' },
  { slug: 'cross-device-transfer',   priority: '0.8', changefreq: 'monthly' },
  { slug: 'secure-file-sharing',     priority: '0.8', changefreq: 'monthly' },
  { slug: 'file-sharing-no-login',   priority: '0.8', changefreq: 'monthly' },
  { slug: 'free-file-sharing',       priority: '0.8', changefreq: 'monthly' },
  { slug: 'large-file-sharing',      priority: '0.8', changefreq: 'monthly' },
  { slug: 'temporary-file-sharing',  priority: '0.8', changefreq: 'monthly' },
]

// ── English-only pages (legal/status) ────────────────────────────────────────
const EN_ONLY_PAGES = [
  { slug: 'terms',    priority: '0.4', changefreq: 'yearly' },
  { slug: 'privacy',  priority: '0.4', changefreq: 'yearly' },
  { slug: 'cookies',  priority: '0.3', changefreq: 'yearly' },
  { slug: 'gdpr',     priority: '0.3', changefreq: 'yearly' },
  { slug: 'refunds',  priority: '0.4', changefreq: 'yearly' },
  { slug: 'status',   priority: '0.5', changefreq: 'daily'  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function localeUrl(locale, slug) {
  if (locale === 'en') return slug === '' ? `${BASE}/` : `${BASE}/${slug}`
  return slug === '' ? `${BASE}/${locale}/` : `${BASE}/${locale}/${slug}`
}

function hreflangLines(slug) {
  const lines = LOCALES.map(l =>
    `    <xhtml:link rel="alternate" hreflang="${l}" href="${localeUrl(l, slug)}"/>`
  )
  lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl('en', slug)}"/>`)
  return lines.join('\n')
}

function urlBlock(loc, slug, priority, changefreq, multilingual) {
  const hreflang = multilingual ? `\n${hreflangLines(slug)}\n  ` : ''
  return `  <url>
    <loc>${loc}</loc>${hreflang}
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

// ── Build entries ─────────────────────────────────────────────────────────────
const entries = []

for (const page of MULTILINGUAL_PAGES) {
  for (const locale of LOCALES) {
    entries.push(urlBlock(localeUrl(locale, page.slug), page.slug, page.priority, page.changefreq, true))
  }
}

for (const page of EN_ONLY_PAGES) {
  entries.push(urlBlock(localeUrl('en', page.slug), page.slug, page.priority, page.changefreq, false))
}

// ── Write ─────────────────────────────────────────────────────────────────────
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${entries.join('\n\n')}

</urlset>`

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath   = join(__dirname, '..', 'public', 'sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')

const total = MULTILINGUAL_PAGES.length * LOCALES.length + EN_ONLY_PAGES.length
console.log(`✓ sitemap.xml — ${total} URLs → ${outPath}`)
