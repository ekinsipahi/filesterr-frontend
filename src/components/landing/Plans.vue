<template>
  <section id="pricing" class="py-28 px-6 section-alt">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-6">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ t('plans.tagline') }}</p>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-4">
          {{ t('plans.h2a') }}<br/><span class="text-gradient">{{ t('plans.h2b') }}</span>
        </h2>
        <p class="text-lg text-zinc-500 dark:text-zinc-400">{{ t('plans.sub') }}</p>
      </div>
      <!-- Toggle -->
      <div class="flex items-center justify-center gap-4 mb-14">
        <span class="text-sm font-medium" :class="billing==='monthly'?'text-zinc-900 dark:text-white':'text-zinc-400'">{{ t('plans.monthly') }}</span>
        <button @click="billing=billing==='monthly'?'yearly':'monthly'" class="relative w-12 h-6 rounded-full transition-colors" :class="billing==='yearly'?'bg-brand-500':'bg-zinc-300 dark:bg-zinc-700'">
          <span class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" :class="billing==='yearly'?'translate-x-6':'translate-x-0'" />
        </button>
        <span class="text-sm font-medium flex items-center gap-2" :class="billing==='yearly'?'text-zinc-900 dark:text-white':'text-zinc-400'">
          {{ t('plans.yearly') }}
          <span class="px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 text-xs font-bold">{{ t('plans.save') }}</span>
        </span>
      </div>
      <!-- Yearly bonus note -->
      <div v-if="billing==='yearly'" class="text-center mb-10">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-400 text-sm font-medium">
          🎉 {{ t('plans.yearlyNote') }}
        </span>
      </div>
      <!-- Cards -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
        <div v-for="plan in PLANS" :key="plan.slug" class="relative flex flex-col rounded-2xl border transition-all duration-300"
          :class="plan.featured ? 'bg-gradient-to-b from-brand-600 to-brand-700 border-brand-500 shadow-glow-lg scale-[1.03]' : 'card hover:shadow-glow hover:border-brand-400/30'">
          <div v-if="plan.badgeKey" class="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
            <span class="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md" :class="plan.featured?'bg-amber-400 text-amber-900':'bg-zinc-800 text-zinc-100'">
              {{ t(plan.badgeKey) }}
            </span>
          </div>
          <div class="p-7 flex flex-col gap-6 flex-1">
            <div>
              <p class="text-xs font-bold uppercase tracking-widest mb-2" :class="plan.featured?'text-brand-200':'text-zinc-400'">{{ plan.slug.toUpperCase() }}</p>
              <h3 class="font-display text-2xl font-extrabold mb-1" :class="plan.featured?'text-white':''">{{ t(`plans.${plan.slug}_name`) }}</h3>
              <div class="flex items-end gap-1 mb-1">
                <span class="font-display text-4xl font-black" :class="plan.featured?'text-white':''">
                  {{ plan.price[billing] === 0 ? t('plans.freeLabel') : `$${plan.price[billing].toFixed(2)}` }}
                </span>
                <span v-if="plan.price[billing]>0" class="text-sm mb-1.5" :class="plan.featured?'text-brand-200':'text-zinc-400'">{{ t('plans.perMonth') }}</span>
              </div>
              <p class="text-sm" :class="plan.featured?'text-brand-200':'text-zinc-500'">{{ t(`plans.${plan.slug}_tagline`) }}</p>
            </div>
            <ul class="space-y-3 flex-1">
              <li v-for="(_, fi) in plan.featureKeys" :key="fi" class="flex items-start gap-2.5 text-sm" :class="plan.featured?'text-brand-100':'text-zinc-600 dark:text-zinc-400'">
                <svg class="w-4 h-4 shrink-0 mt-0.5" :class="plan.featured?'text-brand-300':'text-brand-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                {{ t(`plans.${plan.slug}_f${fi+1}`) }}
              </li>
            </ul>
            <a :href="plan.ctaHref" class="block w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200" :class="plan.featured?'bg-white text-brand-700 hover:bg-brand-50 shadow-md':'btn-primary'">
              {{ t(`plans.${plan.slug}_cta`) }}
            </a>
          </div>
        </div>
      </div>
      <!-- Why upgrade -->
      <div class="mt-14 p-8 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-white">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="font-display text-2xl font-bold mb-4">{{ t('plans.whyTitle') }}</h3>
            <ul class="space-y-2.5">
              <li v-for="n in 5" :key="n" class="flex items-center gap-3 text-brand-100 text-sm">
                <div class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                {{ t(`plans.why${n}`) }}
              </li>
            </ul>
          </div>
          <div class="text-center md:text-right">
            <div class="font-display text-7xl font-black">10x</div>
            <div class="text-brand-200 text-lg">{{ t('plans.morePower') }}</div>
            <div class="text-brand-300 text-sm">{{ t('plans.vsAnon') }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { PLANS } from '../../data/plans.js'
const { t } = useI18n()
const billing = ref('monthly')
</script>