// createApp.js
import { createSSRApp } from 'vue'
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import { createAppI18n, SUPPORTED_LOCALES, RTL_LOCALES } from './i18n/index.js'
import App from './App.vue'

const LOCALE_PATTERN = SUPPORTED_LOCALES.join('|')  // 'en|tr|de|fr|es|ar'

export function createApp(ssrLocale) {
  const i18n = createAppI18n(ssrLocale)

  const router = createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory()
      : createWebHistory(),
    routes: [
      {
        path: `/:locale(${LOCALE_PATTERN})?`,
        component: () => import('./components/layout/DefaultLayout.vue'),
        children: [
          { path: '',           name: 'home',      component: () => import('./pages/Landing.vue') },
          { path: 'features',   name: 'features',  component: () => import('./pages/Features.vue') },
          { path: 'pricing',    name: 'pricing',   component: () => import('./pages/Pricing.vue') },
          { path: 'analytics',  name: 'analytics', component: () => import('./pages/Analytics.vue') },
          { path: 'f/:id',      name: 'download',  component: () => import('./pages/Download.vue') },
          { path: 'delete/:token', name: 'delete', component: () => import('./pages/DeleteFile.vue') },
          { path: ':pathMatch(.*)*', name: 'notfound', component: () => import('./pages/NotFound.vue') },
        ]
      }
    ],
  })

  router.beforeEach((to) => {
    const localeParam = to.params.locale
    const locale = SUPPORTED_LOCALES.includes(localeParam)
      ? localeParam
      : i18n.global.locale.value

    i18n.global.locale.value = locale

    if (typeof document !== 'undefined') {
      document.documentElement.dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'
      document.documentElement.lang = locale
    }
  })

  const app = createSSRApp(App)
  app.use(router)
  app.use(i18n)

  return { app, router, i18n }
}