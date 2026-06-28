<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">

    <!-- Hero -->
    <section class="border-b border-zinc-200 dark:border-zinc-800 py-20 px-6 bg-zinc-50 dark:bg-zinc-900/50">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Filesterr Blog</p>
        <h1 class="font-display text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4">
          Product updates, tips &amp; insights
        </h1>
        <p class="text-lg text-zinc-500 dark:text-zinc-400">
          Stories from the team building the smartest file sharing platform on the web.
        </p>
      </div>
    </section>

    <div class="max-w-3xl mx-auto px-6 py-20 text-center">
      <div class="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/40 flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
        </svg>
      </div>
      <h2 class="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">We're writing. Almost.</h2>
      <p class="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-8">
        Our first posts are in the works. Follow us on X for product updates in the meantime.
      </p>
      <a href="https://x.com/filesterr" target="_blank" rel="noopener"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors shadow">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        Follow @filesterr
      </a>
    </div>

  </main>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

useHead({
  title: computed(() => t('pageMeta.blog.title')),
  meta: [{ name: 'description', content: computed(() => t('pageMeta.blog.description')) }],
})
</script>
