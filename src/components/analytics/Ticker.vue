<template>
  <div class="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 py-4">
    <div class="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8">
      <div v-for="p in proof" :key="p.label" class="flex items-center gap-2 text-sm">
        <span class="text-brand-500 font-bold text-base">{{ p.value }}</span>
        <span class="text-zinc-500 dark:text-zinc-400">{{ p.label }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const proof = computed(() => [
  { value:'500K+',  label: t('analyticsPage.tickerLabel0') },
  { value:'12M+',   label: t('analyticsPage.tickerLabel1') },
  { value:'99.99%', label: t('analyticsPage.tickerLabel2') },
  { value:'< 1s',   label: t('analyticsPage.tickerLabel3') },
  { value:'4.8★',   label: t('analyticsPage.tickerLabel4') },
])
</script>