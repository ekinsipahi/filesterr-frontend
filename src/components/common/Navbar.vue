<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-5'"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2.5 shrink-0">
        <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-glow">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span class="font-display font-bold text-xl tracking-tight">Filesterr</span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-7">
        <a v-for="l in navLinks" :key="l.key" :href="l.href"
          class="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-brand-500 transition-colors">
          {{ t(`nav.${l.key}`) }}
        </a>
      </nav>

      <!-- Right -->
      <div class="flex items-center gap-2">
        <!-- Lang switcher -->
        <div class="relative" ref="langEl">
          <button @click="langOpen = !langOpen"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <span>{{ flags[locale] }}</span>
            <span class="hidden sm:block font-medium">{{ localeNames[locale] }}</span>
            <svg class="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <Transition name="drop">
            <div v-if="langOpen"
              class="absolute right-0 top-full mt-2 w-44 card shadow-xl overflow-hidden z-50">
              <button v-for="loc in supportedLocales" :key="loc"
                @click="switchLocale(loc)"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                :class="loc === locale ? 'text-brand-600 dark:text-brand-400 font-semibold bg-brand-50 dark:bg-brand-900/20' : 'text-zinc-700 dark:text-zinc-300'">
                <span>{{ flags[loc] }}</span>
                <span>{{ localeNames[loc] }}</span>
                <svg v-if="loc === locale" class="w-3.5 h-3.5 ml-auto text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
              </button>
            </div>
          </Transition>
        </div>

        <!-- Theme toggle -->
        <button @click="toggle"
          class="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          :aria-label="isDark ? 'Light mode' : 'Dark mode'">
          <svg v-if="isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </button>

        <a href="/login" class="hidden sm:block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-brand-500 transition-colors px-3 py-2">
          {{ t('nav.signin') }}
        </a>
        <a href="/register" class="btn-primary text-sm">
          {{ t('nav.getStarted') }}
        </a>

        <!-- Mobile burger -->
        <button class="md:hidden p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          @click="mobileOpen = !mobileOpen">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="mob">
      <div v-if="mobileOpen" class="md:hidden glass border-t border-zinc-100 dark:border-white/5 px-6 py-4 flex flex-col gap-3">
        <a v-for="l in navLinks" :key="l.key" :href="l.href"
          class="text-sm font-medium text-zinc-600 dark:text-zinc-300 py-1.5"
          @click="mobileOpen = false">
          {{ t(`nav.${l.key}`) }}
        </a>
        <div class="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex gap-3">
          <a href="/login" class="btn-ghost text-sm flex-1 justify-center">{{ t('nav.signin') }}</a>
          <a href="/register" class="btn-primary text-sm flex-1 justify-center">{{ t('nav.getStarted') }}</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../../composables/useTheme.js'
import { SUPPORTED_LOCALES, LOCALE_NAMES, LOCALE_FLAGS } from '../../i18n/index.js'
import { onClickOutside } from '@vueuse/core'

const { t, locale } = useI18n()
const { isDark, init, toggle } = useTheme()
const scrolled = ref(false)
const mobileOpen = ref(false)
const langOpen = ref(false)
const langEl = ref(null)

const supportedLocales = SUPPORTED_LOCALES
const localeNames = LOCALE_NAMES
const flags = LOCALE_FLAGS

const navLinks = [
  { key: 'features', href: '#features' },
  { key: 'pricing', href: '#pricing' },
  { key: 'analytics', href: '#analytics' },
  { key: 'reviews', href: '#testimonials' },
]

function switchLocale(loc) {
  locale.value = loc
  langOpen.value = false
  localStorage.setItem('locale', loc)
  // Update URL prefix
  const newPath = loc === 'en' ? '/' : `/${loc}`
  history.pushState({}, '', newPath)
  // RTL
  document.documentElement.dir = ['ar'].includes(loc) ? 'rtl' : 'ltr'
  document.documentElement.lang = loc
}

let scrollHandler
onMounted(() => {
  init()
  scrollHandler = () => { scrolled.value = window.scrollY > 30 }
  window.addEventListener('scroll', scrollHandler, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', scrollHandler))
onClickOutside(langEl, () => { langOpen.value = false })
</script>

<style scoped>
.drop-enter-active, .drop-leave-active { transition: opacity 0.14s ease, transform 0.14s ease; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-4px); }
.mob-enter-active, .mob-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.mob-enter-from, .mob-leave-to { opacity: 0; transform: translateY(-6px); }
</style>