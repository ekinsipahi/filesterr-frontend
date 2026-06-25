<template>
  <section class="py-24 px-6">
    <div class="max-w-4xl mx-auto">
      <div class="card p-8 text-center mb-6">
        <p class="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">{{ t('trust.via') }}</p>

        <div class="flex flex-wrap items-center justify-center gap-4 mb-8">
          <!-- Stripe -->
          <div class="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <svg class="h-5 w-auto" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.77 9.42c0-.88.73-1.22 1.93-1.22 1.73 0 3.9.52 5.63 1.46V5.1C12.47 4.42 10.7 4 8.7 4 4.27 4 1.33 6.37 1.33 9.65c0 5.17 7.1 4.33 7.1 6.56 0 1.04-.9 1.37-2.17 1.37-1.87 0-4.27-.77-6.17-1.82v4.67C1.77 21.2 3.7 22 5.63 22c4.57 0 7.67-2.3 7.67-5.63.03-5.59-7.53-4.58-6.53-6.95z" fill="#635BFF"/>
              <path d="M22.57 7.07c-1.7 0-2.8.8-3.4 1.36l-.23-1.08h-3.83V26l4.35-.92.01-4.58c.63.46 1.56 1.1 3.1 1.1 3.13 0 5.98-2.52 5.98-8.09-.01-5.09-2.9-7.44-5.98-7.44zm-1.05 11.45c-1.03 0-1.64-.37-2.06-.82l-.03-6.47c.45-.5 1.08-.85 2.09-.85 1.6 0 2.7 1.8 2.7 4.06 0 2.31-1.08 4.08-2.7 4.08z" fill="#635BFF"/>
              <path d="M31.1 5.42l4.36-.93V1l-4.36.92v3.5zM31.1 7.35h4.36V21.5H31.1V7.35z" fill="#635BFF"/>
              <path d="M40.8 8.67l-.28-1.32h-3.77V21.5h4.35v-9.42c1.03-1.34 2.77-1.1 3.32-.92V7.35c-.57-.2-2.6-.57-3.62 1.32z" fill="#635BFF"/>
              <path d="M48.93 7.07c-2.82 0-4.53 1.33-4.53 3.37 0 3.33 4.58 2.8 4.58 4.22 0 .57-.52.75-1.33.75-1.18 0-2.7-.5-3.9-1.15v3.9c1.32.57 2.65.86 3.9.86 2.93 0 4.95-1.3 4.95-3.52 0-3.6-4.62-2.96-4.62-4.3 0-.47.4-.67 1.18-.67 1.07 0 2.35.45 3.37 1v-3.82a9.3 9.3 0 00-3.6-.64z" fill="#635BFF"/>
            </svg>
            <span class="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Stripe</span>
          </div>

          <!-- Crypto -->
          <div class="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <div class="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
              <span class="text-white text-xs font-black leading-none">₿</span>
            </div>
            <span class="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Crypto</span>
            <span class="text-[10px] font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-1.5 py-0.5 rounded-md">BTC · ETH · USDT</span>
          </div>
        </div>

        <!-- Trust badges -->
        <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div v-for="(badge, i) in t('trust.badges')" :key="i"
            class="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <svg class="w-3.5 h-3.5 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="badgeIcons[i]"/>
            </svg>
            <span>{{ badge }}</span>
          </div>
        </div>
      </div>

      <p class="text-center text-xs text-zinc-400">
        {{ t('trust.gdpr') }}
        <router-link to="/privacy" class="text-brand-500 hover:underline ml-1">{{ t('trust.privacy') }}</router-link>
        <span class="mx-1">·</span>
        <router-link to="/terms" class="text-brand-500 hover:underline">{{ t('trust.terms') }}</router-link>
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
