<template>
  <section id="features" class="py-24 px-6 section-alt">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ $t('analyticsPage.featTagline') }}</p>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">{{ $t('analyticsPage.featH2a') }}<br/><span class="text-gradient">{{ $t('analyticsPage.featH2b') }}</span></h2>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">{{ $t('analyticsPage.featSub') }}</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div v-for="feat in features" :key="feat.title" class="card-hover p-7 group">
          <div class="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" :class="feat.iconBg">
            <svg class="w-5 h-5" :class="feat.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" :d="feat.icon"/>
            </svg>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase" :class="feat.planBadge">{{ feat.plan }}</span>
          <h3 class="font-display font-bold text-base mt-3 mb-2">{{ feat.title }}</h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ feat.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const features = computed(() => [
  { title: t('analyticsPage.feat0_title'), desc: t('analyticsPage.feat0_desc'), plan: t('analyticsPage.feat0_plan'), planBadge:'bg-zinc-100 dark:bg-zinc-800 text-zinc-500', iconBg:'bg-amber-50 dark:bg-amber-900/20', iconColor:'text-amber-500', icon:'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: t('analyticsPage.feat1_title'), desc: t('analyticsPage.feat1_desc'), plan: t('analyticsPage.feat1_plan'), planBadge:'bg-brand-50 dark:bg-brand-900/30 text-brand-600', iconBg:'bg-violet-50 dark:bg-violet-900/20', iconColor:'text-violet-500', icon:'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  { title: t('analyticsPage.feat2_title'), desc: t('analyticsPage.feat2_desc'), plan: t('analyticsPage.feat2_plan'), planBadge:'bg-amber-50 dark:bg-amber-900/30 text-amber-700', iconBg:'bg-red-50 dark:bg-red-900/20', iconColor:'text-red-500', icon:'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' },
  { title: t('analyticsPage.feat3_title'), desc: t('analyticsPage.feat3_desc'), plan: t('analyticsPage.feat3_plan'), planBadge:'bg-amber-50 dark:bg-amber-900/30 text-amber-700', iconBg:'bg-blue-50 dark:bg-blue-900/20', iconColor:'text-blue-500', icon:'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064' },
])
</script>