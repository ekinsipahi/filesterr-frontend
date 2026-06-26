<template>
  <section class="py-20 px-6">
    <div class="max-w-5xl mx-auto">

      <div class="text-center mb-14">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ t('pricing.comparison.tagline') }}</p>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-4">
          {{ t('pricing.comparison.h2a') }}<br/>
          <span class="text-gradient">{{ t('pricing.comparison.h2b') }}</span>
        </h2>
        <p class="text-lg text-zinc-500 dark:text-zinc-400">{{ t('pricing.comparison.sub') }}</p>
      </div>

      <!-- Comparison table — structured data for Google rich results -->
      <div class="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800">
              <th class="text-left px-6 py-5 text-zinc-500 dark:text-zinc-400 font-medium w-2/5">
                {{ t('pricing.comparison.feature') }}
              </th>
              <th v-for="col in columns" :key="col.slug"
                class="px-4 py-5 font-display font-bold text-center"
                :class="col.featured ? 'bg-brand-600 text-white rounded-t-xl' : 'text-zinc-900 dark:text-white'">
                <div>{{ col.name }}</div>
                <div class="font-normal text-xs mt-0.5"
                  :class="col.featured ? 'text-brand-200' : 'text-zinc-500'">
                  {{ col.price }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in rows" :key="ri"
              class="border-b border-zinc-100 dark:border-zinc-800/60 last:border-0 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
              <td class="px-6 py-4 text-zinc-700 dark:text-zinc-300 font-medium">
                {{ t(`pricing.comparison.rows.${row.key}`) }}
              </td>
              <td v-for="(col, ci) in columns" :key="ci"
                class="px-4 py-4 text-center"
                :class="col.featured ? 'bg-brand-600/5 dark:bg-brand-500/8' : ''">
                <!-- String value -->
                <span v-if="typeof row.values[col.slug] === 'string'"
                  class="text-xs font-semibold"
                  :class="col.featured ? 'text-brand-600 dark:text-brand-400' : 'text-zinc-600 dark:text-zinc-400'">
                  {{ row.values[col.slug] }}
                </span>
                <!-- Boolean check/cross -->
                <template v-else>
                  <svg v-if="row.values[col.slug]" class="w-5 h-5 mx-auto"
                    :class="col.featured ? 'text-brand-500' : 'text-brand-500'"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                  <svg v-else class="w-4 h-4 mx-auto text-zinc-300 dark:text-zinc-700"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const columns = [
  { slug: 'anon',    name: 'Anonymous', price: 'Free',    featured: false },
  { slug: 'free',    name: 'Free',      price: 'Free',    featured: false },
  { slug: 'premium', name: 'Premium',   price: '$3.99/mo', featured: true },
  { slug: 'pro',     name: 'Pro',       price: '$7.99/mo', featured: false },
]

// Neuromarketing: most impactful rows first — keep eyes on value diff
const rows = [
  { key: 'maxFileSize',     values: { anon: '2 GB', free: '10 GB', premium: '50 GB', pro: '100 GB' } },
  { key: 'storage',         values: { anon: '5 GB', free: '20 GB', premium: '200 GB', pro: '1 TB' } },
  { key: 'bandwidth',       values: { anon: '10 GB', free: '50 GB', premium: '500 GB', pro: 'Unlimited' } },
  { key: 'downloadAnalytics', values: { anon: false, free: false, premium: true, pro: true } },
  { key: 'visitorIdentification', values: { anon: false, free: false, premium: false, pro: true } },
  { key: 'ipFlagging',      values: { anon: false, free: false, premium: false, pro: true } },
  { key: 'passwordProtect', values: { anon: false, free: false, premium: true, pro: true } },
  { key: 'customExpiry',    values: { anon: false, free: false, premium: true, pro: true } },
  { key: 'customDomain',    values: { anon: false, free: false, premium: false, pro: true } },
  { key: 'apiAccess',       values: { anon: false, free: false, premium: false, pro: true } },
  { key: 'prioritySupport', values: { anon: false, free: false, premium: false, pro: true } },
  { key: 'noAds',           values: { anon: false, free: false, premium: true, pro: true } },
]
</script>