<template>
  <section id="features" class="py-28 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-20">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ t('features.tagline') }}</p>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
          {{ t('features.h2a') }}<br/><span class="text-gradient">{{ t('features.h2b') }}</span>
        </h2>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">{{ t('features.sub') }}</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        <div v-for="(f, i) in features" :key="i" class="group card-hover p-7 relative overflow-hidden">
          <div class="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" :class="f.glow" />
          <div class="relative">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" :class="f.iconBg">
              <svg class="w-6 h-6" :class="f.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" :d="f.icon"/>
              </svg>
            </div>
            <h3 class="font-display font-bold text-lg mb-2">{{ t(`features.item${i}_title`) }}</h3>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ t(`features.item${i}_desc`) }}</p>
          </div>
        </div>
      </div>
      <div class="mt-24">
        <h3 class="font-display text-3xl font-bold text-center mb-14">{{ t('features.howTitle') }}</h3>
        <div class="grid md:grid-cols-3 gap-10 relative">
          <div class="hidden md:block absolute top-8 left-[calc(16.6%+40px)] right-[calc(16.6%+40px)] h-px" style="background: linear-gradient(90deg, #22a366, #45be81, #22a366)" />
          <div v-for="(s, i) in steps" :key="i" class="flex flex-col items-center text-center gap-4">
            <div class="relative w-16 h-16 rounded-full bg-brand-500 text-white font-display font-bold text-xl flex items-center justify-center shadow-glow z-10">
              {{ i + 1 }}
              <div class="absolute inset-0 rounded-full bg-brand-400/20 animate-ping" style="animation-duration:2s" />
            </div>
            <h4 class="font-display font-semibold text-lg">{{ t(`features.step${i}_title`) }}</h4>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-[210px]">{{ t(`features.step${i}_desc`) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { FEATURES, STEPS } from '../../data/plans.js'
const { t } = useI18n()
const features = FEATURES
const steps = STEPS
</script>