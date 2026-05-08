import './style.css'
import { createApp } from './createApp.js'
import { useTheme } from './composables/useTheme.js'

const { app, router } = createApp()

router.isReady().then(() => {
  app.mount('#app')

  // Mount sonrası çağır — hydration tamamlandıktan sonra
  const { init } = useTheme()
  init()
})