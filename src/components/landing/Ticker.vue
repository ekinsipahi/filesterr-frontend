<template>
  <div class="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 py-4 overflow-hidden select-none">
    <div class="flex animate-ticker whitespace-nowrap">
      <span v-for="(item, i) in doubled" :key="i"
        class="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 px-10">
        <span class="text-brand-500 font-bold text-base">{{ item.value }}</span>
        {{ t(item.key) }}
        <span class="text-zinc-300 dark:text-zinc-700 mx-4">·</span>
      </span>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { TICKER_ITEMS } from '../../data/plans.js'
const { t } = useI18n()
const doubled = computed(() => [...TICKER_ITEMS, ...TICKER_ITEMS])
</script>