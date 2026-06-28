<template>
  <section class="py-24 px-6 section-alt">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-14">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ $t('analyticsPage.compTagline') }}</p>
        <h2 class="font-display text-4xl font-extrabold mb-4">{{ $t('analyticsPage.compH2a') }} <span class="text-gradient">{{ $t('analyticsPage.compH2b') }}</span></h2>
        <p class="text-zinc-500 dark:text-zinc-400">{{ $t('analyticsPage.compSub') }}</p>
      </div>
      <div class="card overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-zinc-100 dark:border-zinc-800">
              <th class="p-5 text-left font-semibold text-zinc-500">{{ $t('analyticsPage.compFeature') }}</th>
              <th v-for="plan in plans" :key="plan.name" class="p-5 text-center font-bold" :class="plan.featured ? 'text-brand-600 dark:text-brand-400' : ''">
                {{ plan.name }}
                <div v-if="plan.price" class="text-xs font-normal text-zinc-400 mt-0.5">${{ plan.price }}/mo</div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-50 dark:divide-zinc-800/50">
            <tr v-for="row in rows" :key="row.label" class="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
              <td class="p-5 text-zinc-700 dark:text-zinc-300">{{ row.label }}</td>
              <td v-for="(val, pi) in row.values" :key="pi" class="p-5 text-center">
                <span v-if="val === true" class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/40">
                  <svg class="w-3 h-3 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </span>
                <span v-else-if="val === false" class="text-zinc-300 dark:text-zinc-600">—</span>
                <span v-else class="font-medium text-zinc-700 dark:text-zinc-300">{{ val }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-wrap justify-center gap-4 mt-8">
        <a href="/register" class="btn-primary-lg">{{ $t('analyticsPage.compGetStarted') }}</a>
        <a href="/pricing" class="btn-ghost-lg">{{ $t('analyticsPage.compViewPlans') }}</a>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const plans = [
  { name:'Anonymous', price:null,   featured:false },
  { name:'Free',      price:null,   featured:false },
  { name:'Premium',   price:'3.99', featured:false },
  { name:'Pro',       price:'7.99', featured:true  },
]
const rows = computed(() => [
  { label: t('analyticsPage.compRow0'), values:[true,  true,  true,  true]  },
  { label: t('analyticsPage.compRow1'), values:[false, true,  true,  true]  },
  { label: t('analyticsPage.compRow2'), values:[false, true,  true,  true]  },
  { label: t('analyticsPage.compRow3'), values:[false, true,  true,  true]  },
  { label: t('analyticsPage.compRow4'), values:[false, false, true,  true]  },
  { label: t('analyticsPage.compRow5'), values:[false, false, false, true]  },
  { label: t('analyticsPage.compRow6'), values:[false, false, false, true]  },
  { label: t('analyticsPage.compRow7'), values:[false, false, false, true]  },
  { label: t('analyticsPage.compRow8'), values:[false, false, false, true]  },
  { label: t('analyticsPage.compRow9'), values:['7d', '30d', '90d', '365d'] },
])
</script>