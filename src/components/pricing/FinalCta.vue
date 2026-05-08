<template>
  <section class="py-24 px-6">
    <div class="max-w-5xl mx-auto text-center">

      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-emerald-500 p-16">
        <!-- Noise texture -->
        <div class="absolute inset-0 opacity-[0.06]"
          style="background-image:url('data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E')" />

        <div class="relative">
          <!-- Pre-headline — curiosity gap -->
          <p class="text-white/70 text-sm font-bold uppercase tracking-widest mb-5">
            {{ t('pricing.cta.pre') }}
          </p>

          <h2 class="font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white mb-5 tracking-tight">
            {{ t('pricing.cta.h2') }}
          </h2>

          <p class="text-white/75 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {{ t('pricing.cta.sub') }}
          </p>

          <!-- Dual CTA — neuromarketing: give them 2 options, both move forward -->
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/register?plan=premium"
              class="px-8 py-4 rounded-xl bg-white text-brand-700 font-bold text-base hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              {{ t('pricing.cta.primary') }}
            </a>
            <a href="/register"
              class="px-8 py-4 rounded-xl bg-white/15 border border-white/30 text-white font-bold text-base hover:bg-white/25 transition-all">
              {{ t('pricing.cta.secondary') }}
            </a>
          </div>

          <!-- Social proof under CTA — reduces last-second hesitation -->
          <div class="flex flex-wrap items-center justify-center gap-6 mt-10">
            <div class="flex items-center gap-2 text-white/60 text-xs">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ t('pricing.cta.proof1') }}
            </div>
            <div class="flex items-center gap-2 text-white/60 text-xs">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ t('pricing.cta.proof2') }}
            </div>
            <div class="flex items-center gap-2 text-white/60 text-xs">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ t('pricing.cta.proof3') }}
            </div>
          </div>

          <p class="text-white/40 text-xs mt-6">{{ t('pricing.cta.microcopy') }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>