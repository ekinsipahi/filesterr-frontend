import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))

const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(resolve(__dirname, 'tailwind.config.js')),
        autoprefixer(),
      ],
    },
  },
  // Bundle all deps into the SSR output so the server is self-contained
  // (required for Netlify Functions and Railway/Render deploys)
  ssr: isSsrBuild ? { noExternal: true } : {},
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
    proxy: {
      '/api': {
        target: process.env.API_TARGET || 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
}))