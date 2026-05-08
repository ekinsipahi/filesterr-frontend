import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
import tr from './locales/tr.js'
import de from './locales/de.js'
import fr from './locales/fr.js'
import es from './locales/es.js'
import ar from './locales/ar.js'

export const SUPPORTED_LOCALES = ['en', 'tr', 'de', 'fr', 'es', 'ar']

export const LOCALE_NAMES = {
  en: 'English', tr: 'Türkçe', de: 'Deutsch',
  fr: 'Français', es: 'Español', ar: 'العربية',
}

export const LOCALE_FLAGS = {
  en: '🇺🇸', tr: '🇹🇷', de: '🇩🇪',
  fr: '🇫🇷', es: '🇪🇸', ar: '🇸🇦',
}

export const RTL_LOCALES = ['ar']

/** Client-side: localStorage → URL prefix → tarayıcı dili → 'en' */
function detectLocale() {
  if (typeof window === 'undefined') return 'en'

  const stored = localStorage.getItem('locale')
  if (stored && SUPPORTED_LOCALES.includes(stored)) return stored

  const urlSeg = location.pathname.split('/')[1]
  if (SUPPORTED_LOCALES.includes(urlSeg)) return urlSeg

  const browser = navigator.language?.slice(0, 2)
  if (browser && SUPPORTED_LOCALES.includes(browser)) return browser

  return 'en'
}

/**
 * SSR'da `ssrLocale` parametresi geçilir (entry-server.js'den).
 * Client'ta parametresiz çağrılır, detectLocale() devreye girer.
 */
export function createAppI18n(ssrLocale) {
  const locale = ssrLocale ?? detectLocale()

  // Client'ta başlangıçta dir/lang attribute'larını ayarla
  if (typeof document !== 'undefined') {
    document.documentElement.dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }

  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages: { en, tr, de, fr, es, ar },
  })
}