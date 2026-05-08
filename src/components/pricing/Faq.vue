<template>
  <section class="py-24 px-6 section-alt">
    <div class="max-w-3xl mx-auto">

      <div class="text-center mb-14">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ t('pricing.faq.tagline') }}</p>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-4">
          {{ t('pricing.faq.h2') }}
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400">{{ t('pricing.faq.sub') }}</p>
      </div>

      <!-- FAQ accordion — generates FAQ rich result snippet in Google -->
      <div class="space-y-3">
        <div v-for="(item, i) in faqKeys" :key="i"
          class="card rounded-2xl overflow-hidden">
          <button
            class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
            @click="toggle(i)"
            :aria-expanded="open === i"
          >
            <span>{{ t(`pricing.faq.q${i}`) }}</span>
            <svg class="w-5 h-5 shrink-0 text-zinc-400 transition-transform duration-200"
              :class="open === i ? 'rotate-45' : ''"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
          <div v-show="open === i" class="px-6 pb-6">
            <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
              {{ t(`pricing.faq.a${i}`) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Still questions — reduce friction -->
      <div class="mt-12 text-center p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <p class="font-semibold mb-2">{{ t('pricing.faq.stillQuestion') }}</p>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-5">{{ t('pricing.faq.stillSub') }}</p>
        <a href="mailto:support@filesterr.com"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-bold text-sm hover:bg-brand-400 transition-colors shadow-glow">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          {{ t('pricing.faq.contactUs') }}
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 8 FAQ — enough to cover all objections and feed Google FAQ rich results
const faqKeys = Array.from({ length: 8 })
const open = ref(null)
const toggle = (i) => { open.value = open.value === i ? null : i }
</script>