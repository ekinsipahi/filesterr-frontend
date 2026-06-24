<template>
  <section id="plans" class="py-20 px-6 section-alt">
    <div class="max-w-7xl mx-auto">

      <!-- Billing toggle -->
      <div class="flex items-center justify-center gap-4 mb-14">
        <span class="text-sm font-medium" :class="billing === 'monthly' ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'">
          {{ t('plans.monthly') }}
        </span>
        <button
          @click="billing = billing === 'monthly' ? 'yearly' : 'monthly'"
          class="relative w-12 h-6 rounded-full transition-colors"
          :class="billing === 'yearly' ? 'bg-brand-500' : 'bg-zinc-300 dark:bg-zinc-700'"
          :aria-label="t('plans.toggleLabel')"
        >
          <span class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
            :class="billing === 'yearly' ? 'translate-x-6' : 'translate-x-0'" />
        </button>
        <span class="text-sm font-medium flex items-center gap-2" :class="billing === 'yearly' ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'">
          {{ t('plans.yearly') }}
          <span class="px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 text-xs font-bold">
            {{ t('plans.save') }}
          </span>
        </span>
      </div>

      <!-- Yearly bonus — loss aversion nudge -->
      <div v-if="billing === 'yearly'" class="text-center mb-10">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-400 text-sm font-medium">
          🎉 {{ t('plans.yearlyNote') }}
        </span>
      </div>

      <!-- Plan cards -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-start">
        <div
          v-for="plan in PLANS" :key="plan.slug"
          class="relative flex flex-col rounded-2xl border transition-all duration-300"
          :class="plan.featured
            ? 'bg-gradient-to-b from-brand-600 to-brand-700 border-brand-500 shadow-glow-lg scale-[1.03]'
            : 'card hover:shadow-glow hover:border-brand-400/30'"
        >
          <!-- Badge -->
          <div v-if="plan.badgeKey" class="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center px-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-md whitespace-nowrap"
              :class="plan.featured ? 'bg-amber-400 text-amber-900' : 'bg-zinc-800 text-zinc-100'">
              {{ t(plan.badgeKey) }}
            </span>
          </div>

          <div class="p-7 flex flex-col gap-6 flex-1">
            <!-- Plan header -->
            <div>
              <p class="text-xs font-bold uppercase tracking-widest mb-2"
                :class="plan.featured ? 'text-brand-200' : 'text-zinc-400'">
                {{ plan.slug.toUpperCase() }}
              </p>
              <h2 class="font-display text-2xl font-extrabold mb-1"
                :class="plan.featured ? 'text-white' : ''">
                {{ t(`plans.${plan.slug}_name`) }}
              </h2>

              <!-- Price — neuromarketing: big number = perceived value anchor -->
              <div class="flex items-end gap-1 mb-1">
                <span class="font-display text-4xl font-black"
                  :class="plan.featured ? 'text-white' : ''">
                  {{ plan.price[billing] === 0 ? t('plans.freeLabel') : `$${plan.price[billing].toFixed(2)}` }}
                </span>
                <span v-if="plan.price[billing] > 0" class="text-sm mb-1.5"
                  :class="plan.featured ? 'text-brand-200' : 'text-zinc-400'">
                  {{ t('plans.perMonth') }}
                </span>
              </div>

              <!-- Yearly equivalent per-day — makes price feel trivial -->
              <p v-if="plan.price[billing] > 0 && billing === 'yearly'" class="text-xs mb-1"
                :class="plan.featured ? 'text-brand-300' : 'text-brand-500'">
                ≈ ${{ (plan.price[billing] / 30).toFixed(2) }} {{ t('plans.perDay') }}
              </p>

              <p class="text-sm" :class="plan.featured ? 'text-brand-200' : 'text-zinc-500'">
                {{ t(`plans.${plan.slug}_tagline`) }}
              </p>
            </div>

            <!-- Features -->
            <ul class="space-y-3 flex-1">
              <!-- Storage and per-file come directly from plans.js -->
              <li class="flex items-start gap-2.5 text-sm" :class="plan.featured ? 'text-brand-100' : 'text-zinc-600 dark:text-zinc-400'">
                <svg class="w-4 h-4 shrink-0 mt-0.5" :class="plan.featured ? 'text-brand-300' : 'text-brand-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                {{ plan.storage }} storage
              </li>
              <li class="flex items-start gap-2.5 text-sm" :class="plan.featured ? 'text-brand-100' : 'text-zinc-600 dark:text-zinc-400'">
                <svg class="w-4 h-4 shrink-0 mt-0.5" :class="plan.featured ? 'text-brand-300' : 'text-brand-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                {{ plan.perFile }} per file
              </li>
              <!-- Retention -->
              <li v-if="plan.retention" class="flex items-start gap-2.5 text-sm">
                <template v-if="plan.retention === 'Forever'">
                  <span class="shrink-0 mt-0.5 text-base leading-none font-black" :class="plan.featured ? 'text-brand-300' : 'text-brand-500'">∞</span>
                  <span :class="plan.featured ? 'text-brand-100' : 'text-zinc-600 dark:text-zinc-400'">
                    <strong :class="plan.featured ? 'text-white' : 'text-zinc-900 dark:text-white'">Files kept forever</strong> — never auto-deleted
                  </span>
                </template>
                <template v-else>
                  <svg class="w-4 h-4 shrink-0 mt-0.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span :class="plan.featured ? 'text-brand-100' : 'text-zinc-600 dark:text-zinc-400'">Files kept for {{ plan.retention }}</span>
                </template>
              </li>
              <!-- Rest of features from i18n (skip f1/f2 which were storage/perFile) -->
              <li v-for="(_, fi) in plan.featureKeys.slice(2)" :key="fi"
                class="flex items-start gap-2.5 text-sm"
                :class="plan.featured ? 'text-brand-100' : 'text-zinc-600 dark:text-zinc-400'">
                <svg class="w-4 h-4 shrink-0 mt-0.5" :class="plan.featured ? 'text-brand-300' : 'text-brand-500'"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                {{ t(`plans.${plan.slug}_f${fi + 3}`) }}
              </li>
            </ul>

            <!-- CTA -->
            <a :href="ctaHref(plan)"
              class="block w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
              :class="plan.featured ? 'bg-white text-brand-700 hover:bg-brand-50 shadow-md' : 'btn-primary'">
              {{ t(`plans.${plan.slug}_cta`) }}
            </a>
          </div>
        </div>
      </div>

      <!-- Money-back / risk-removal guarantee -->
      <div class="mt-10 text-center">
        <p class="text-sm text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-2">
          <svg class="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          {{ t('pricing.plans.guarantee') }}
        </p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { PLANS } from '../../data/plans.js'

const { t } = useI18n()
const billing = ref('monthly')
const isAuth = ref(false)

onMounted(() => {
  isAuth.value = !!window.__USER__?.isAuthenticated || !!localStorage.getItem('access_token')
})

function ctaHref(plan) {
  if (!plan.price.monthly) return plan.ctaHref
  const annualSuffix = billing.value === 'yearly' ? '&billing=annual' : ''
  if (isAuth.value) return `/checkout?plan=${plan.slug}${annualSuffix}`
  const base = plan.ctaHref  // e.g. /register?plan=premium
  return billing.value === 'yearly' ? `${base}&billing=annual` : base
}
</script>