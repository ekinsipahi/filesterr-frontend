import express from 'express'
import { createServer as createViteServer } from 'vite'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { networkInterfaces } from 'os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const PORT = process.env.PORT || 3001
const LOCALES = ['tr', 'de', 'fr', 'es', 'ar']

// WSL'de gerçek eth0 IP'sini bul
function getNetworkIP() {
  const nets = networkInterfaces()
  const candidates = []
  for (const [name, addrs] of Object.entries(nets)) {
    for (const addr of addrs) {
      if (addr.family === 'IPv4' && !addr.internal) {
        candidates.push({ name, ip: addr.address })
      }
    }
  }
  // eth0 varsa onu al (WSL), yoksa ilk bulduğu
  const eth0 = candidates.find(c => c.name === 'eth0')
  return eth0 ? eth0.ip : candidates[0]?.ip || '0.0.0.0'
}

async function start() {
  const app = express()
  const networkIP = getNetworkIP()

  const vite = await createViteServer({
    root: ROOT,
    server: {
      middlewareMode: true,
      // HMR: WSL'de browser localhost'ta, Vite WSL IP'sinde
      // host: localhost = browser WebSocket'i buraya açar
      hmr: {
        host: 'localhost',
        port: 24678,
        protocol: 'ws',
        clientPort: 24678,
      },
      watch: {
        // WSL'de inotify çalışmaz — polling zorunlu
        usePolling: true,
        interval: 300,
      },
    },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    const url = req.originalUrl
    const parts = url.split('/')
    const locale = LOCALES.includes(parts[1]) ? parts[1] : 'en'

    try {
      let template = readFileSync(resolve(ROOT, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      const { render } = await vite.ssrLoadModule('/src/entry-server.js')
      const { html: appHtml } = await render(url, locale)

      const html = template
        .replace('<!--app-html-->', appHtml)
        .replace('<!--app-head-->', `<meta name="language" content="${locale}"/>`)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error('\x1b[31m[SSR Error]\x1b[0m', e.message)
      // HMR script'i hata sayfasında da çalışır — save edince düzelir
      res.status(500).end(`<!DOCTYPE html><html><body style="font-family:monospace;padding:2rem;background:#0c1018;color:#f87171">
<h2>SSR Error</h2><pre style="white-space:pre-wrap;font-size:13px">${e.stack}</pre>
<script type="module" src="/@vite/client"></script>
</body></html>`)
    }
  })

  app.listen(PORT, '0.0.0.0', () => {
    console.log('')
    console.log('  \x1b[32m🚀 VaultDrop\x1b[0m SSR dev server')
    console.log('  \x1b[2m──────────────────────────────\x1b[0m')
    console.log(`  ➜  \x1b[1mLocal:\x1b[0m    \x1b[36mhttp://localhost:${PORT}\x1b[0m`)
    console.log(`  ➜  \x1b[1mNetwork:\x1b[0m  \x1b[36mhttp://${networkIP}:${PORT}\x1b[0m`)
    console.log(`  ➜  \x1b[1mHMR:\x1b[0m      \x1b[33mws://localhost:24678\x1b[0m`)
    console.log('  \x1b[2m──────────────────────────────\x1b[0m')
    console.log('  \x1b[2mWSL mode: polling watcher active\x1b[0m')
    console.log('')
  })
}

start()