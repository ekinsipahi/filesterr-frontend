<template>
  <section class="py-24 px-6">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ $t('featuresHowItWorks.tagline') }}</p>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
          {{ $t('featuresHowItWorks.h2a') }}<br/><span class="text-gradient">{{ $t('featuresHowItWorks.h2b') }}</span>
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto text-lg">
          {{ $t('featuresHowItWorks.sub') }}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-10 relative">
        <div class="hidden md:block absolute top-8 left-[calc(16.6%+40px)] right-[calc(16.6%+40px)] h-px"
          style="background: linear-gradient(90deg, #22a366, #45be81, #22a366)" />
        <div v-for="(step, i) in steps" :key="i" class="flex flex-col items-center text-center gap-4">
          <div class="relative w-16 h-16 rounded-full bg-brand-500 text-white font-display font-bold text-xl flex items-center justify-center shadow-glow z-10">
            {{ i + 1 }}
            <div class="absolute inset-0 rounded-full bg-brand-400/20 animate-ping" style="animation-duration:2.5s" />
          </div>
          <h3 class="font-display font-bold text-xl">{{ step.title }}</h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-[220px] leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>

      <div class="text-center mt-14">
        <a href="/register" class="btn-primary-lg inline-flex items-center gap-2 group">
          {{ $t('featuresHowItWorks.ctaBtn') }}
          <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
        <p class="text-xs text-zinc-400 mt-3">{{ $t('featuresHowItWorks.ctaMicro') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const steps = computed(() => [
  { title: t('featuresHowItWorks.step0_title'), desc: t('featuresHowItWorks.step0_desc') },
  { title: t('featuresHowItWorks.step1_title'), desc: t('featuresHowItWorks.step1_desc') },
  { title: t('featuresHowItWorks.step2_title'), desc: t('featuresHowItWorks.step2_desc') },
])
</script>