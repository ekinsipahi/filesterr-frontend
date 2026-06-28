<template>
  <section class="relative min-h-[72vh] flex items-center pt-32 pb-20 px-6 overflow-hidden">
    <!-- Statik bg katmanları -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[560px] bg-brand-500/8 dark:bg-brand-500/12 blur-[120px] rounded-full" />
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 blur-3xl rounded-full" />
      <div class="absolute inset-0 bg-grid opacity-60" />
    </div>

    <!-- Çark + zincir arka plan -->
    <FeaturesGearBg />

    <div class="relative max-w-5xl mx-auto text-center">
      <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-8 animate-fade-in">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
          <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
        </span>
        {{ $t('featuresHero.badge') }}
      </div>

      <h1 class="font-display text-5xl sm:text-6xl xl:text-[68px] font-extrabold leading-[1.04] tracking-tight mb-7 animate-slide-up">
        {{ $t('featuresHero.h1a') }}<br/>
        <span class="text-gradient">{{ $t('featuresHero.h1b') }}</span>
      </h1>

      <p class="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style="animation-delay:.1s">
        Most file sharing tools just store files. Filesterr gives you
        <strong class="text-zinc-900 dark:text-white">real-time analytics, visitor intelligence, bot detection</strong>
        and ironclad security — all from a single shareable link.
      </p>

      <div class="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up" style="animation-delay:.2s">
        <a href="/register" class="btn-primary-lg group">
          {{ $t('featuresHero.cta1') }}
          <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
        <a href="#feature-grid" class="btn-ghost-lg">{{ $t('featuresHero.cta2') }}</a>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-6 animate-fade-in" style="animation-delay:.35s">
        <div v-for="stat in heroStats" :key="stat.label" class="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <svg class="w-4 h-4 text-brand-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span><strong class="text-zinc-900 dark:text-white">{{ stat.val }}</strong> {{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FeaturesGearBg from './FeaturesGearBg.vue'

const { t } = useI18n()

const heroStats = computed(() => [
  { val: '99.99%',  label: t('featuresHero.stat0') },
  { val: '< 50ms',  label: t('featuresHero.stat1') },
  { val: '256-bit', label: t('featuresHero.stat2') },
  { val: '50+',     label: t('featuresHero.stat3') },
])
</script>