<template>
  <section class="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">

    <!-- Icon -->
    <div class="relative mb-8">
      <div class="w-40 h-40 rounded-full bg-brand-500/8 dark:bg-brand-500/10 flex items-center justify-center">
        <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center shadow-glow">
          <svg class="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z M18.364 18.364L5.636 5.636"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- 404 number -->
    <div class="font-display text-[96px] font-black leading-none tracking-tight text-gradient mb-4">
      404
    </div>

    <h1 class="font-display text-2xl font-bold text-zinc-900 dark:text-white mb-3">
      {{ t('notfound.title') }}
    </h1>
    <p class="text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed mb-10">
      {{ t('notfound.sub') }}
    </p>

    <!-- Actions -->
    <div class="flex flex-wrap gap-4 justify-center mb-12">
      <RouterLink to="/" class="btn-primary-lg group">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        {{ t('notfound.home') }}
      </RouterLink>
      <RouterLink to="/#hero" class="btn-ghost-lg">
        {{ t('notfound.upload') }}
      </RouterLink>
    </div>

    <!-- Quick links -->
    <div class="flex flex-wrap gap-2 justify-center">
      <a v-for="link in quickLinks" :key="link.href" :href="link.href"
        class="px-4 py-2 rounded-full text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
        {{ link.label }}
      </a>
    </div>

  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { computed } from 'vue'

const { t } = useI18n()

useHead({
  title: computed(() => t('pageMeta.notFound.title')),
  meta: [{ name: 'robots', content: 'noindex' }],
})

const quickLinks = computed(() => [
  { href: '/features',  label: t('notFoundPage.quickLink0') },
  { href: '/pricing',   label: t('notFoundPage.quickLink1') },
  { href: '/analytics', label: t('notFoundPage.quickLink2') },
  { href: '/register',  label: t('notFoundPage.quickLink3') },
])
</script>