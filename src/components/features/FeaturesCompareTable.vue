<template>
  <section class="py-24 px-6 section-alt">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-14">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ $t('featuresCompare.tagline') }}</p>
        <h2 class="font-display text-4xl font-extrabold mb-4">{{ $t('featuresCompare.h2') }}</h2>
        <p class="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
          {{ $t('featuresCompare.sub') }}
        </p>
      </div>

      <div class="card overflow-hidden shadow-xl">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-zinc-100 dark:border-zinc-800">
                <th class="text-left p-5 font-semibold text-zinc-500 dark:text-zinc-400 w-48">{{ $t('pricing.comparison.feature') }}</th>
                <th v-for="col in tableColumns" :key="col.label"
                  class="p-5 text-center font-bold"
                  :class="col.featured ? 'bg-brand-500/5 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400' : 'text-zinc-700 dark:text-zinc-200'">
                  <div>{{ col.label }}</div>
                  <div class="text-xs font-normal mt-1" :class="col.featured ? 'text-brand-500' : 'text-zinc-400'">{{ col.price }}</div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-50 dark:divide-zinc-800/70">
              <tr v-for="row in tableRows" :key="row.label" class="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                <td class="p-5 text-zinc-600 dark:text-zinc-400 font-medium">{{ row.label }}</td>
                <td v-for="(val, ci) in row.values" :key="ci"
                  class="p-5 text-center"
                  :class="tableColumns[ci].featured ? 'bg-brand-500/5 dark:bg-brand-500/10' : ''">
                  <template v-if="typeof val === 'boolean'">
                    <svg v-if="val" class="w-5 h-5 text-brand-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                    </svg>
                    <svg v-else class="w-5 h-5 text-zinc-300 dark:text-zinc-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </template>
                  <template v-else>
                    <span class="font-medium" :class="tableColumns[ci].featured ? 'text-brand-700 dark:text-brand-300' : 'text-zinc-700 dark:text-zinc-300'">{{ val }}</span>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="text-center mt-8">
        <a href="/pricing" class="btn-primary inline-flex items-center gap-2">
          {{ $t('featuresCompare.viewPricingBtn') }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const tableColumns = computed(() => [
  { label: t('featuresCompare.colFree'),    price: t('featuresCompare.colFreePrice'), featured: false },
  { label: t('featuresCompare.colPremium'), price: '$3.99/mo',                        featured: true  },
  { label: t('featuresCompare.colPro'),     price: '$7.99/mo',                        featured: false },
])
const tableRows = computed(() => [
  { label: t('featuresCompare.row0'),  values: ['10 GB',  '150 GB', '890 GB'] },
  { label: t('featuresCompare.row1'),  values: ['5 GB',   '50 GB',  '50 GB'] },
  { label: t('featuresCompare.row2'),  values: [true,     true,     true] },
  { label: t('featuresCompare.row3'),  values: [false,    true,     true] },
  { label: t('featuresCompare.row4'),  values: [false,    true,     true] },
  { label: t('featuresCompare.row5'),  values: [false,    true,     true] },
  { label: t('featuresCompare.row6'),  values: [false,    true,     true] },
  { label: t('featuresCompare.row7'),  values: [false,    true,     true] },
  { label: t('featuresCompare.row8'),  values: [false,    false,    true] },
  { label: t('featuresCompare.row9'),  values: [false,    false,    true] },
  { label: t('featuresCompare.row10'), values: [false,    false,    true] },
  { label: t('featuresCompare.row11'), values: [false,    true,     true] },
])
</script>