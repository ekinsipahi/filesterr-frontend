<template>
  <section class="py-24 px-6 section-alt">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-14">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Compare Plans</p>
        <h2 class="font-display text-4xl font-extrabold mb-4">See Exactly What You Get</h2>
        <p class="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
          No hidden limits. No feature paywalls buried in fine print. Every tier is built to be a clear step up.
        </p>
      </div>

      <div class="card overflow-hidden shadow-xl">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-zinc-100 dark:border-zinc-800">
                <th class="text-left p-5 font-semibold text-zinc-500 dark:text-zinc-400 w-48">Feature</th>
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
          View Full Pricing
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const tableColumns = [
  { label: 'Free',    price: 'Forever free', featured: false },
  { label: 'Premium', price: '$3.89/mo',     featured: true  },
  { label: 'Pro',     price: '$8.00/mo',     featured: false },
]
const tableRows = [
  { label: 'Storage',               values: ['10 GB',  '150 GB', '890 GB'] },
  { label: 'Max file size',         values: ['5 GB',   '50 GB',  '50 GB'] },
  { label: 'Download analytics',    values: [true,     true,     true] },
  { label: 'Direct download links', values: [false,    true,     true] },
  { label: 'Password protection',   values: [false,    true,     true] },
  { label: 'Expiring links',        values: [false,    true,     true] },
  { label: 'One-time links',        values: [false,    true,     true] },
  { label: 'Visitor fingerprint',   values: [false,    true,     true] },
  { label: 'Bot detection',         values: [false,    false,    true] },
  { label: 'VPN/proxy detection',   values: [false,    false,    true] },
  { label: 'API access',            values: [false,    false,    true] },
  { label: 'ZIP batch download',    values: [false,    true,     true] },
]
</script>