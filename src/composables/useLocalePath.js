import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

/**
 * useLocalePath
 *
 * Returns a `lp(name, params?)` function that builds a locale-prefixed
 * RouterLink `to` object.
 *
 * Usage in template:
 *   <RouterLink :to="lp('pricing')">Pricing</RouterLink>
 *   <RouterLink :to="lp('download', { id: file.id })">Download</RouterLink>
 *
 * For external/anchor links (e.g. /#testimonials) just use plain <a>.
 */
export function useLocalePath() {
  const { locale } = useI18n()
  const route = useRoute()

  function lp(name, params = {}) {
    const localeParam = locale.value === 'en' ? undefined : locale.value
    return {
      name,
      params: {
        ...(localeParam ? { locale: localeParam } : {}),
        ...params,
      },
    }
  }

  // Also expose current locale prefix for <a href> anchors like /#testimonials
  function localePath(path) {
    if (locale.value === 'en') return path
    // If path starts with /, prefix with locale
    if (path.startsWith('/')) return `/${locale.value}${path}`
    return path
  }

  return { lp, localePath, locale }
}