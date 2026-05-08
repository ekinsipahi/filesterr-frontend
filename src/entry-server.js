import { renderToString } from 'vue/server-renderer'
import { createApp } from './createApp.js'

export async function render(url, locale) {
  const { app, router } = createApp(locale)

  await router.push(url)
  await router.isReady()

  const html = await renderToString(app)
  return { html }
}