import './style.css'
import { createApp } from './createApp.js'
import { useTheme } from './composables/useTheme.js'
import { getMe, setUserState } from './api/index.js'

async function start() {
  const { app, router } = createApp()

  // Initialize user state BEFORE mounting so all components see the correct plan/auth on first render.
  // If a valid access token exists but window.__USER__ isn't populated (page reload, direct nav),
  // fetch the user now. Falls back to localStorage cache if API is temporarily unreachable.
  const accessToken = localStorage.getItem('access_token')
  if (accessToken && !window.__USER__?.isAuthenticated) {
    try {
      await getMe() // sets window.__USER__ + updates cache
    } catch {
      // Network error — getMe() already falls back to cached_user internally
    }
  }

  await router.isReady()
  app.mount('#app')

  const { init } = useTheme()
  init()
}

start()
