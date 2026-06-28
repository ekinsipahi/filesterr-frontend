<template>
  <section class="py-24 px-6">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl font-extrabold mb-4">{{ $t('analyticsPage.faqH2') }}</h2>
      </div>
      <div class="space-y-2">
        <div v-for="(faq, i) in faqs" :key="i" class="card overflow-hidden">
          <button class="w-full flex items-center justify-between px-6 py-5 text-left" @click="open = open === i ? null : i">
            <span class="font-semibold text-sm pr-4">{{ faq.q }}</span>
            <svg class="w-5 h-5 text-zinc-400 shrink-0 transition-transform" :class="open === i ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div v-if="open === i" class="px-6 pb-5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-4">{{ faq.a }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const open = ref(null)

const faqs = computed(() => [
  { q: t('analyticsPage.faq0_q'), a: t('analyticsPage.faq0_a') },
  { q: t('analyticsPage.faq1_q'), a: t('analyticsPage.faq1_a') },
  { q: t('analyticsPage.faq2_q'), a: t('analyticsPage.faq2_a') },
  { q: t('analyticsPage.faq3_q'), a: t('analyticsPage.faq3_a') },
  { q: t('analyticsPage.faq4_q'), a: t('analyticsPage.faq4_a') },
  { q: t('analyticsPage.faq5_q'), a: t('analyticsPage.faq5_a') },
])
</script>