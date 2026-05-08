<template>
  <section class="py-24 px-6">
    <div class="max-w-4xl mx-auto">
      <div class="card p-8 text-center mb-6">
        <p class="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">{{ t('trust.via') }}</p>
        <div class="flex flex-wrap items-center justify-center gap-5 mb-8">
          <!-- Stripe -->
          <div class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <svg class="h-5" viewBox="0 0 60 25" fill="none"><path d="M6.77 9.42c0-.88.73-1.22 1.93-1.22 1.73 0 3.9.52 5.63 1.46V5.1C12.47 4.42 10.7 4 8.7 4 4.27 4 1.33 6.37 1.33 9.65c0 5.17 7.1 4.33 7.1 6.56 0 1.04-.9 1.37-2.17 1.37-1.87 0-4.27-.77-6.17-1.82v4.67C1.77 21.2 3.7 22 5.63 22c4.57 0 7.67-2.3 7.67-5.63.03-5.59-7.53-4.58-6.53-6.95z" fill="#635BFF"/></svg>
            <span class="text-sm font-bold text-zinc-700 dark:text-zinc-200">Stripe</span>
          </div>
          <!-- Crypto -->
          <div class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <div class="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span class="text-white text-xs font-bold">₿</span>
            </div>
            <span class="text-sm font-bold text-zinc-700 dark:text-zinc-200">Crypto</span>
          </div>
          <!-- Polar -->
          <div class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <div class="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <span class="text-white text-xs font-bold">P</span>
            </div>
            <span class="text-sm font-bold text-zinc-700 dark:text-zinc-200">Polar</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div v-for="(badge, i) in t('trust.badges')" :key="i"
            class="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <svg class="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="badgeIcons[i]"/>
            </svg>
            {{ badge }}
          </div>
        </div>
      </div>

      <p class="text-center text-xs text-zinc-400">
        {{ t('trust.gdpr') }}
        <a href="/privacy" class="text-brand-500 hover:underline ml-1">{{ t('trust.privacy') }}</a> ·
        <a href="/terms" class="text-brand-500 hover:underline">{{ t('trust.terms') }}</a>
      </p>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const badgeIcons = [
  'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'M13 10V3L4 14h7v7l9-11h-7z',
  'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  'M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z',
]
</script>