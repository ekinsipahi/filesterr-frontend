<template>
  <section class="relative pt-32 pb-20 px-6 overflow-hidden">
    <!-- BG atmosphere -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/10 dark:bg-brand-500/15 blur-[140px] rounded-full animate-glow-pulse" />
      <div class="absolute inset-0 bg-grid opacity-40" />
    </div>

    <div class="relative max-w-4xl mx-auto text-center">
      <!-- Social proof anchor — neuromarketing: anchors trust BEFORE price -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-8 animate-fade-in">
        <span class="flex -space-x-1">
          <span v-for="n in 4" :key="n" class="w-4 h-4 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-white dark:border-zinc-950 inline-block" />
        </span>
        {{ t('pricing.hero.badge') }}
      </div>

      <!-- H1 — primary SEO keyword target -->
      <h1 class="font-display text-5xl sm:text-6xl xl:text-[68px] font-extrabold leading-[1.04] tracking-tight mb-6 animate-slide-up">
        {{ t('pricing.hero.h1a') }}<br/>
        <span class="text-gradient">{{ t('pricing.hero.h1b') }}</span>
      </h1>

      <p class="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10 animate-slide-up" style="animation-delay:.1s">
        {{ t('pricing.hero.sub') }}
        <strong class="text-zinc-900 dark:text-white">{{ t('pricing.hero.subHighlight') }}</strong>
      </p>

      <!-- Trust trio — fast scan, neuromarketing: reduces risk perception -->
      <div class="flex flex-wrap items-center justify-center gap-6 animate-fade-in" style="animation-delay:.2s">
        <div v-for="(item, i) in trustItems" :key="i" class="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
          {{ t(`pricing.hero.trust${i + 1}`) }}
        </div>
      </div>

      <!-- Price anchor — neuromarketing: seeing free first makes paid feel cheap -->
      <div class="mt-12 inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm animate-fade-in" style="animation-delay:.3s">
        <span class="text-zinc-500 dark:text-zinc-400 text-sm">{{ t('pricing.hero.startingFrom') }}</span>
        <span class="font-display text-3xl font-black text-zinc-900 dark:text-white">{{ t('pricing.hero.freeLabel') }}</span>
        <span class="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />
        <span class="text-zinc-500 dark:text-zinc-400 text-sm">{{ t('pricing.hero.paidFrom') }}</span>
        <span class="font-display text-3xl font-black text-brand-500">$3.89<span class="text-base font-normal text-zinc-400">/mo</span></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const trustItems = [0, 1, 2, 3]
</script>