<template>
  <section class="py-24 px-6">
    <div class="max-w-7xl mx-auto">

      <div class="text-center mb-16">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ t('pricing.why.tagline') }}</p>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
          {{ t('pricing.why.h2a') }}<br/>
          <span class="text-gradient">{{ t('pricing.why.h2b') }}</span>
        </h2>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">{{ t('pricing.why.sub') }}</p>
      </div>

      <!-- Value blocks — each one hits a different objection -->
      <div class="grid md:grid-cols-3 gap-6 mb-16">
        <div v-for="(block, i) in valueBlocks" :key="i" class="card-hover p-8 group">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110" :class="block.iconBg">
            <svg class="w-7 h-7" :class="block.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" :d="block.icon"/>
            </svg>
          </div>
          <h3 class="font-display text-xl font-bold mb-3">{{ t(`pricing.why.block${i}_title`) }}</h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{{ t(`pricing.why.block${i}_desc`) }}</p>
          <!-- Proof stat — neuromarketing: concrete numbers beat adjectives -->
          <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <span class="font-display text-3xl font-black text-brand-500">{{ block.stat }}</span>
            <span class="text-sm text-zinc-400 ml-2">{{ t(`pricing.why.block${i}_statLabel`) }}</span>
          </div>
        </div>
      </div>

      <!-- vs competitor callout — "10x more power" style, but with anchoring comparison -->
      <div class="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-10 text-white">
        <div class="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 class="font-display text-2xl font-bold mb-6">{{ t('pricing.why.vsTitle') }}</h3>
            <ul class="space-y-3">
              <li v-for="n in 5" :key="n" class="flex items-center gap-3 text-brand-100 text-sm">
                <div class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                {{ t(`pricing.why.vs${n}`) }}
              </li>
            </ul>
          </div>
          <div class="text-center md:text-right">
            <div class="font-display text-8xl font-black leading-none">10x</div>
            <div class="text-brand-200 text-xl font-semibold mt-2">{{ t('pricing.why.morePower') }}</div>
            <div class="text-brand-300 text-sm mt-1">{{ t('pricing.why.vsAnon') }}</div>
            <a href="#plans" class="inline-block mt-8 px-8 py-3.5 rounded-xl bg-white text-brand-700 font-bold text-sm hover:bg-brand-50 transition-all shadow-lg">
              {{ t('pricing.why.seePlans') }}
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Neuromarketing: address the 3 core objections — Trust, Value, Speed
const valueBlocks = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    iconBg: 'bg-brand-100 dark:bg-brand-500/15',
    iconColor: 'text-brand-600 dark:text-brand-400',
    stat: '99.9%',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    iconBg: 'bg-amber-100 dark:bg-amber-500/15',
    iconColor: 'text-amber-600 dark:text-amber-400',
    stat: '<2s',
  },
  {
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/15',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    stat: '2,847+',
  },
]
</script>