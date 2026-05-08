import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))

const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

export default defineConfig({
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
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
})