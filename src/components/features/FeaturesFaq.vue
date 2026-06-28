<template>
  <section class="py-24 px-6">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-14">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ $t('featuresFaq.tagline') }}</p>
        <h2 class="font-display text-4xl font-extrabold mb-4">{{ $t('featuresFaq.h2') }}</h2>
        <p class="text-zinc-500 dark:text-zinc-400">{{ $t('featuresFaq.sub') }}</p>
      </div>

      <div class="space-y-3">
        <div v-for="(faq, i) in faqs" :key="i" class="card overflow-hidden">
          <button @click="open = open === i ? null : i"
            class="w-full flex items-center justify-between p-6 text-left gap-4">
            <span class="font-semibold text-zinc-900 dark:text-white text-sm sm:text-base">{{ faq.q }}</span>
            <div class="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 transition-transform duration-200"
              :class="open === i ? 'rotate-45' : ''">
              <svg class="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
              </svg>
            </div>
          </button>
          <div v-if="open === i" class="px-6 pb-6">
            <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ faq.a }}</p>
          </div>
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
  { q: t('featuresFaq.q0'), a: t('featuresFaq.a0') },
  { q: t('featuresFaq.q1'), a: t('featuresFaq.a1') },
  { q: t('featuresFaq.q2'), a: t('featuresFaq.a2') },
  { q: t('featuresFaq.q3'), a: t('featuresFaq.a3') },
  { q: t('featuresFaq.q4'), a: t('featuresFaq.a4') },
  { q: t('featuresFaq.q5'), a: t('featuresFaq.a5') },
  { q: t('featuresFaq.q6'), a: t('featuresFaq.a6') },
])
</script>