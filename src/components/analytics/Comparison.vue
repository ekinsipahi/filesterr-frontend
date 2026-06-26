<template>
  <section class="py-24 px-6 section-alt">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-14">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Pricing</p>
        <h2 class="font-display text-4xl font-extrabold mb-4">Analytics for <span class="text-gradient">every level</span></h2>
        <p class="text-zinc-500 dark:text-zinc-400">Start free. Unlock more as you grow.</p>
      </div>
      <div class="card overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-zinc-100 dark:border-zinc-800">
              <th class="p-5 text-left font-semibold text-zinc-500">Feature</th>
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
        <a href="/register" class="btn-primary-lg">Get started free</a>
        <a href="/pricing" class="btn-ghost-lg">View all plans</a>
      </div>
    </div>
  </section>
</template>
<script setup>
const plans = [
  { name:'Anonymous', price:null, featured:false },
  { name:'Free',      price:null, featured:false },
  { name:'Premium',   price:'3.99', featured:false },
  { name:'Pro',       price:'7.99', featured:true },
]
const rows = [
  { label:'Download count',         values:[true,  true,  true,  true]  },
  { label:'Real-time feed',         values:[false, true,  true,  true]  },
  { label:'IP & location data',     values:[false, true,  true,  true]  },
  { label:'Device & browser info',  values:[false, true,  true,  true]  },
  { label:'Visitor fingerprinting', values:[false, false, true,  true]  },
  { label:'Bot detection',          values:[false, false, false, true]  },
  { label:'VPN / proxy detection',  values:[false, false, false, true]  },
  { label:'Geographic heatmaps',    values:[false, false, false, true]  },
  { label:'API access',             values:[false, false, false, true]  },
  { label:'Data retention',         values:['7d', '30d', '90d', '365d'] },
]
</script>