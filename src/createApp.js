import { createSSRApp } from 'vue'
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import { createAppI18n, SUPPORTED_LOCALES, RTL_LOCALES } from './i18n/index.js'
import App from './App.vue'

const LOCALE_PATTERN = SUPPORTED_LOCALES.join('|')

export function createApp(ssrLocale) {
  const i18n = createAppI18n(ssrLocale || 'en')

  const router = createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory()
      : createWebHistory(),
    routes: [
      {
        path: `/:locale(${LOCALE_PATTERN})?`,
        component: () => import('./components/layout/DefaultLayout.vue'),
        children: [
          // ── Public pages ──
          { path: '',              name: 'home',      component: () => import('./pages/Landing.vue') },
          { path: 'features',      name: 'features',  component: () => import('./pages/Features.vue') },
          { path: 'pricing',       name: 'pricing',   component: () => import('./pages/Pricing.vue') },
          { path: 'analytics',     name: 'analytics', component: () => import('./pages/Analytics.vue') },
          { path: 'upload',        name: 'upload',    component: () => import('./pages/Upload.vue') },

          // ── Auth ── (kendi layout'u var, DefaultLayout dışında)
          { path: 'login',         name: 'login',     component: () => import('./pages/auth/Login.vue'),    meta: { layout: 'auth', redirectIfAuth: true } },
          { path: 'register',      name: 'register',  component: () => import('./pages/auth/Register.vue'), meta: { layout: 'auth', redirectIfAuth: true } },
          { path: 'forgot',        name: 'forgot',    component: () => import('./pages/auth/Forgot.vue'),   meta: { layout: 'auth' } },

          // ── File actions ──
          { path: 'f/:id',         name: 'download',  component: () => import('./pages/Download.vue') },
          { path: 'delete/:token', name: 'delete',    component: () => import('./pages/DeleteFile.vue') },

          // ── 404 ──
          { path: ':pathMatch(.*)*', name: 'notfound', component: () => import('./pages/NotFound.vue') },
        ],
      },
    ],
  })

  // ── Locale sync + redirect-if-auth guard ──
  router.beforeEach((to) => {
    // 1. Sync i18n locale from URL param
    const localeParam = to.params.locale
    const locale = SUPPORTED_LOCALES.includes(localeParam)
      ? localeParam
      : i18n.global.locale.value

    i18n.global.locale.value = locale

    if (typeof document !== 'undefined') {
      document.documentElement.dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'
      document.documentElement.lang = locale
    }

    // 2. Redirect already-logged-in users away from auth pages
    if (to.meta.redirectIfAuth && typeof window !== 'undefined') {
      const isAuth = window.__USER__?.isAuthenticated
      if (isAuth) {
        return { name: 'home', params: to.params }
      }
    }
  })

  const app = createSSRApp(App)
  app.use(router)
  app.use(i18n)

  return { app, router, i18n }
}