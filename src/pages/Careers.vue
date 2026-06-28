<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">

    <!-- Hero -->
    <section class="border-b border-zinc-200 dark:border-zinc-800 py-20 px-6 bg-zinc-50 dark:bg-zinc-900/50">
      <div class="max-w-3xl mx-auto">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ $t('careersPage.tagline') }}</p>
        <h1 class="font-display text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4">
          {{ $t('careersPage.h1') }}
        </h1>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl">
          {{ $t('careersPage.sub') }}
        </p>
      </div>
    </section>

    <div class="max-w-3xl mx-auto px-6 py-16 space-y-14">

      <!-- Values -->
      <section>
        <h2 class="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">{{ $t('careersPage.valuesH2') }}</h2>
        <div class="grid sm:grid-cols-3 gap-4">
          <div v-for="v in values" :key="v.title" class="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
            <div class="text-2xl mb-3">{{ v.emoji }}</div>
            <p class="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{{ v.title }}</p>
            <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ v.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Open roles -->
      <section>
        <h2 class="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">{{ $t('careersPage.openRolesH2') }}</h2>
        <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-10 text-center">
          <p class="text-zinc-500 dark:text-zinc-400 mb-2">{{ $t('careersPage.noOpenRoles') }}</p>
          <p class="text-sm text-zinc-400">{{ $t('careersPage.sendNote') }}</p>
          <a href="mailto:careers@filesterr.com"
            class="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-sm hover:bg-brand-400 transition-colors">
            careers@filesterr.com
          </a>
        </div>
      </section>

    </div>
  </main>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

useHead({
  title: computed(() => t('pageMeta.careers.title')),
  meta: [{ name: 'description', content: computed(() => t('pageMeta.careers.description')) }],
})

const values = computed(() => [
  { emoji: '🔬', title: t('careersPage.val0_title'), desc: t('careersPage.val0_desc') },
  { emoji: '🌍', title: t('careersPage.val1_title'), desc: t('careersPage.val1_desc') },
  { emoji: '🛠️', title: t('careersPage.val2_title'), desc: t('careersPage.val2_desc') },
])
</script>
