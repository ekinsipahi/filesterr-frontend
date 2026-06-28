<template>
  <section id="feature-grid" class="py-24 px-6 section-alt">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ $t('featuresGrid.tagline') }}</p>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
          {{ $t('featuresGrid.h2a') }}<br/>
          <span class="text-gradient">{{ $t('featuresGrid.h2b') }}</span>
        </h2>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          {{ $t('featuresGrid.sub') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(f, i) in featureCards" :key="i"
          class="group card-hover p-7 relative overflow-hidden"
          :class="{ 'ring-2 ring-brand-500/30 ring-offset-0': f.featured }"
        >
          <div class="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" :class="f.glow" />
          <div v-if="f.badge"
            class="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
            :class="f.badgeCls">
            {{ f.badge }}
          </div>
          <div class="relative">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" :class="f.iconBg">
              <svg class="w-6 h-6" :class="f.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" :d="f.icon"/>
              </svg>
            </div>
            <h3 class="font-display font-bold text-lg mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">{{ f.title }}</h3>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{{ f.desc }}</p>
            <div v-if="f.stat" class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              <svg class="w-3 h-3 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ f.stat }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const featureCards = computed(() => [
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', iconBg: 'bg-brand-50 dark:bg-brand-900/20', iconColor: 'text-brand-500', glow: 'bg-brand-400/10', title: t('featuresGrid.card0_title'), desc: t('featuresGrid.card0_desc'), stat: t('featuresGrid.card0_stat'), badge: t('featuresGrid.card0_badge'), badgeCls: 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-brand-700', featured: true },
  { icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', iconBg: 'bg-violet-50 dark:bg-violet-900/20', iconColor: 'text-violet-500', glow: 'bg-violet-400/10', title: t('featuresGrid.card1_title'), desc: t('featuresGrid.card1_desc'), stat: t('featuresGrid.card1_stat'), badge: null, badgeCls: '', featured: false },
  { icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636', iconBg: 'bg-red-50 dark:bg-red-900/20', iconColor: 'text-red-500', glow: 'bg-red-400/10', title: t('featuresGrid.card2_title'), desc: t('featuresGrid.card2_desc'), stat: t('featuresGrid.card2_stat'), badge: t('featuresGrid.card2_badge'), badgeCls: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700', featured: false },
  { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', iconBg: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-500', glow: 'bg-amber-400/10', title: t('featuresGrid.card3_title'), desc: t('featuresGrid.card3_desc'), stat: t('featuresGrid.card3_stat'), badge: null, badgeCls: '', featured: false },
  { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', iconBg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-500', glow: 'bg-blue-400/10', title: t('featuresGrid.card4_title'), desc: t('featuresGrid.card4_desc'), stat: t('featuresGrid.card4_stat'), badge: null, badgeCls: '', featured: false },
  { icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16', iconBg: 'bg-zinc-100 dark:bg-zinc-800', iconColor: 'text-zinc-500', glow: 'bg-zinc-400/10', title: t('featuresGrid.card5_title'), desc: t('featuresGrid.card5_desc'), stat: t('featuresGrid.card5_stat'), badge: null, badgeCls: '', featured: false },
  { icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z', iconBg: 'bg-emerald-50 dark:bg-emerald-900/20', iconColor: 'text-emerald-500', glow: 'bg-emerald-400/10', title: t('featuresGrid.card6_title'), desc: t('featuresGrid.card6_desc'), stat: t('featuresGrid.card6_stat'), badge: null, badgeCls: '', featured: false },
  { icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', iconBg: 'bg-indigo-50 dark:bg-indigo-900/20', iconColor: 'text-indigo-500', glow: 'bg-indigo-400/10', title: t('featuresGrid.card7_title'), desc: t('featuresGrid.card7_desc'), stat: t('featuresGrid.card7_stat'), badge: null, badgeCls: '', featured: false },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', iconBg: 'bg-pink-50 dark:bg-pink-900/20', iconColor: 'text-pink-500', glow: 'bg-pink-400/10', title: t('featuresGrid.card8_title'), desc: t('featuresGrid.card8_desc'), stat: t('featuresGrid.card8_stat'), badge: t('featuresGrid.card8_badge'), badgeCls: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700', featured: false },
])
</script>