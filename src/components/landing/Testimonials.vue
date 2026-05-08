<template>
  <section id="testimonials" class="py-28 px-6 section-alt">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ t('reviews.tagline') }}</p>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-6">{{ t('reviews.h2') }}</h2>
        <div class="flex items-center justify-center gap-3">
          <div class="flex"><span v-for="n in 5" :key="n" class="text-2xl">⭐</span></div>
          <div class="text-left"><div class="font-bold">4.8 / 5</div><div class="text-xs text-zinc-500">{{ t('reviews.trustpilot', { count: '2,847' }) }}</div></div>
          <div class="ml-4 px-3 py-1.5 rounded-lg bg-[#00b67a] text-white text-xs font-bold">Trustpilot</div>
        </div>
      </div>
      <div class="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        <div v-for="(rv, i) in REVIEW_KEYS" :key="i" class="card-hover p-6 break-inside-avoid">
          <div class="flex gap-0.5 mb-4"><span v-for="s in rv.stars" :key="s" class="text-amber-400 text-sm">★</span></div>
          <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">"{{ t(`reviews.r${i}_body`) }}"</p>
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" :style="`background:${REVIEW_COLORS[i % REVIEW_COLORS.length]}`">
              {{ t(`reviews.r${i}_name`)[0] }}
            </div>
            <div><div class="text-sm font-semibold">{{ t(`reviews.r${i}_name`) }}</div><div class="text-xs text-zinc-400">{{ t(`reviews.r${i}_role`) }}</div></div>
            <span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-semibold">✓ Verified</span>
          </div>
        </div>
      </div>
      <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="(stat, i) in STAT_KEYS" :key="i" class="card p-6 text-center">
          <div class="font-display text-3xl font-extrabold text-gradient mb-1">{{ stat.value }}</div>
          <div class="text-sm text-zinc-500 dark:text-zinc-400">{{ t(stat.key) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { REVIEW_KEYS, REVIEW_COLORS, STAT_KEYS } from '../../data/plans.js'
const { t } = useI18n()
</script>