<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950">
    <main class="max-w-7xl mx-auto px-6 pt-28 pb-16">

      <!-- Header -->
      <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div class="flex items-center gap-3">
          <a href="/dashboard" class="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </a>
          <div>
            <h1 class="font-display text-2xl font-extrabold text-zinc-900 dark:text-white">Visitor Analytics</h1>
            <p class="text-sm text-zinc-400 mt-0.5">Fingerprint-level visitor intelligence — bot, proxy & VPN detection</p>
          </div>
        </div>

        <!-- Period selector -->
        <div class="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1 gap-0.5">
          <button v-for="d in [7, 30, 90]" :key="d"
            @click="changePeriod(d)"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            :class="period === d
              ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'">
            {{ d }}d
          </button>
        </div>
      </div>

      <!-- Pro gate -->
      <div v-if="planError" class="flex flex-col items-center justify-center py-32 text-center">
        <div class="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <h2 class="font-display text-xl font-bold text-zinc-900 dark:text-white mb-2">Pro Plan Required</h2>
        <p class="text-sm text-zinc-400 mb-6 max-w-sm">Visitor analytics with fingerprinting, bot detection, and heatmaps are available on Pro and Pro Max plans.</p>
        <a href="/checkout?plan=pro" class="btn-primary text-sm">Upgrade to Pro</a>
      </div>

      <!-- Loading skeleton -->
      <template v-else-if="loading">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-pulse">
          <div v-for="i in 8" :key="i" class="card p-5 h-28 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
        </div>
      </template>

      <template v-else-if="data">

        <!-- ── OVERVIEW CARDS ───────────────────────────────────────────── -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div v-for="stat in overviewStats" :key="stat.label" class="card p-5">
            <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">{{ stat.label }}</p>
            <p class="font-display text-2xl font-extrabold text-zinc-900 dark:text-white leading-none">
              {{ stat.value }}
            </p>
            <p v-if="stat.sub" class="text-xs mt-1.5 font-medium" :class="stat.subClass || 'text-zinc-400'">
              {{ stat.sub }}
            </p>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-6 mb-6">

          <!-- ── HEATMAP ────────────────────────────────────────────────── -->
          <div class="lg:col-span-2 card p-6 overflow-hidden">
            <div class="flex items-center justify-between mb-5">
              <div>
                <h2 class="font-semibold text-zinc-900 dark:text-white text-sm">Download Activity Heatmap</h2>
                <p class="text-xs text-zinc-400 mt-0.5">Hour of day × day of week (last {{ period }}d)</p>
              </div>
              <div class="flex items-center gap-1.5 text-[10px] text-zinc-400">
                <span>Low</span>
                <div class="flex gap-0.5">
                  <div v-for="i in 5" :key="i" class="w-3 h-3 rounded-sm" :style="`opacity: ${i * 0.2}; background: var(--color-brand-500, #6366f1)`" />
                </div>
                <span>High</span>
              </div>
            </div>

            <!-- Hour labels -->
            <div class="flex items-center gap-px mb-1 pl-8">
              <div v-for="h in hourLabels" :key="h" class="flex-1 text-center text-[9px] text-zinc-400">
                {{ h % 6 === 0 ? `${h}h` : '' }}
              </div>
            </div>

            <!-- Heatmap grid -->
            <div class="space-y-px">
              <div v-for="(day, di) in dayLabels" :key="day" class="flex items-center gap-px">
                <span class="w-8 text-[10px] text-zinc-400 shrink-0 text-right pr-2">{{ day }}</span>
                <div v-for="h in 24" :key="h" class="flex-1 aspect-square rounded-sm transition-colors cursor-default"
                  :style="heatmapCellStyle(di, h - 1)"
                  :title="`${day} ${h-1}:00 — ${heatmapValue(di, h - 1)} downloads`" />
              </div>
            </div>
          </div>

          <!-- ── COUNTRIES ──────────────────────────────────────────────── -->
          <div class="card p-6 flex flex-col">
            <h2 class="font-semibold text-zinc-900 dark:text-white text-sm mb-4">Top Countries</h2>
            <div v-if="data.countries.length === 0" class="flex-1 flex items-center justify-center text-xs text-zinc-400">
              No geo data yet
            </div>
            <div v-else class="space-y-2.5 flex-1 overflow-auto">
              <div v-for="(c, i) in data.countries" :key="c.code" class="flex items-center gap-3">
                <span class="text-xs text-zinc-400 w-4 shrink-0 text-right">{{ i + 1 }}</span>
                <CountryFlag :code="c.code" :width="20" :height="15" class="shrink-0" />
                <span class="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex-1 uppercase">{{ c.code }}</span>
                <div class="w-20 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div class="h-full bg-brand-500 rounded-full transition-all duration-700"
                    :style="`width: ${Math.round(c.count / data.countries[0].count * 100)}%`" />
                </div>
                <span class="text-xs text-zinc-500 w-10 text-right">{{ c.count.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-6">

          <!-- ── RECENT VISITORS ────────────────────────────────────────── -->
          <div class="lg:col-span-2 card overflow-hidden">
            <div class="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <h2 class="font-semibold text-zinc-900 dark:text-white text-sm">Recent Visitors</h2>
              <span class="text-xs text-zinc-400">{{ data.recent_visitors.length }} unique fingerprints</span>
            </div>

            <div v-if="data.recent_visitors.length === 0" class="px-5 py-12 text-center text-xs text-zinc-400">
              No visitor data yet — analytics populate as files are viewed.
            </div>

            <div v-else class="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-96 overflow-auto">
              <div v-for="v in data.recent_visitors" :key="v.visitor_id"
                class="px-5 py-3 flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">

                <!-- Device icon -->
                <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  :class="v.is_bot ? 'bg-red-50 dark:bg-red-900/20' : 'bg-zinc-100 dark:bg-zinc-800'">
                  <svg class="w-4 h-4" :class="v.is_bot ? 'text-red-500' : 'text-zinc-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="v.device === 'mobile'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    <path v-else-if="v.device === 'tablet'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>

                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate max-w-[140px]">
                      {{ v.visitor_id.slice(0, 8) }}…
                    </span>
                    <!-- Signal badges -->
                    <span v-if="v.is_returning" class="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">RETURNING</span>
                    <span v-if="v.is_bot" class="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400">BOT</span>
                    <span v-if="v.is_proxy" class="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">PROXY/VPN</span>
                    <span v-if="v.risk_score >= 60 && !v.is_bot && !v.is_proxy"
                      class="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">HIGH RISK</span>
                  </div>
                  <p class="text-[10px] text-zinc-400 mt-0.5">
                    {{ [v.browser, v.os].filter(Boolean).join(' · ') || 'Unknown browser' }}
                    · {{ v.event_count }} event{{ v.event_count !== 1 ? 's' : '' }}
                  </p>
                </div>

                <!-- Country + risk score -->
                <div class="flex items-center gap-2 shrink-0">
                  <CountryFlag v-if="v.country_code" :code="v.country_code" :width="20" :height="15" />
                  <div class="text-right">
                    <div class="text-[10px] font-bold" :class="riskColor(v.risk_score)">{{ v.risk_score }}</div>
                    <div class="text-[9px] text-zinc-400">risk</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── TOP FILES + DEVICES ────────────────────────────────────── -->
          <div class="space-y-4">

            <!-- Top files -->
            <div class="card p-5">
              <h2 class="font-semibold text-zinc-900 dark:text-white text-sm mb-4">Top Files</h2>
              <div v-if="data.top_files.length === 0" class="text-xs text-zinc-400 text-center py-4">No downloads yet</div>
              <div v-else class="space-y-2.5">
                <div v-for="f in data.top_files" :key="f.id" class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                  <span class="text-xs text-zinc-600 dark:text-zinc-300 flex-1 truncate" :title="f.name">{{ f.name }}</span>
                  <span class="text-xs font-bold text-zinc-900 dark:text-white shrink-0">{{ f.downloads.toLocaleString() }}</span>
                </div>
              </div>
            </div>

            <!-- Device breakdown -->
            <div class="card p-5">
              <h2 class="font-semibold text-zinc-900 dark:text-white text-sm mb-4">Devices</h2>
              <div class="space-y-2.5">
                <div v-for="[device, count] in deviceRows" :key="device" class="flex items-center gap-2.5">
                  <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="device === 'mobile'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    <path v-else-if="device === 'bot'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span class="text-xs text-zinc-600 dark:text-zinc-300 flex-1 capitalize">{{ device }}</span>
                  <div class="w-16 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-700"
                      :class="device === 'bot' ? 'bg-red-500' : 'bg-brand-500'"
                      :style="`width: ${Math.round(count / totalDevices * 100)}%`" />
                  </div>
                  <span class="text-xs text-zinc-500 w-8 text-right">{{ count }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </template>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import CountryFlag from '../components/CountryFlag.vue'

useHead({ title: 'Visitor Analytics — Filesterr', meta: [{ name: 'robots', content: 'noindex' }] })

const loading    = ref(true)
const planError  = ref(false)
const data       = ref(null)
const period     = ref(30)

const dayLabels  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hourLabels = Array.from({ length: 24 }, (_, i) => i)

// ── Computed ─────────────────────────────────────────────────────────────────

const overviewStats = computed(() => {
  if (!data.value) return []
  const o = data.value.overview
  return [
    { label: 'Total Views',        value: o.total_views.toLocaleString() },
    { label: 'Total Downloads',    value: o.total_downloads.toLocaleString() },
    { label: 'Unique Visitors',    value: o.unique_visitors.toLocaleString() },
    {
      label: 'Returning Visitors',
      value: o.returning_visitors.toLocaleString(),
      sub: `${o.returning_rate_pct}% return rate`,
      subClass: 'text-brand-500',
    },
    {
      label: 'Bot Traffic',
      value: o.bot_count.toLocaleString(),
      sub: `${o.bot_pct}% of events`,
      subClass: o.bot_pct > 10 ? 'text-red-500' : 'text-zinc-400',
    },
    {
      label: 'Proxy / VPN',
      value: o.proxy_count.toLocaleString(),
      sub: `${o.proxy_pct}% of events`,
      subClass: o.proxy_pct > 15 ? 'text-amber-500' : 'text-zinc-400',
    },
    {
      label: 'Human Visitors',
      value: (o.unique_visitors - o.bot_count).toLocaleString(),
      sub: `${(100 - o.bot_pct).toFixed(1)}% human`,
      subClass: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'Period',
      value: `${period.value}d`,
      sub: 'Select above to change',
    },
  ]
})

// Build heatmap lookup: { "day-hour": count }
const heatmapLookup = computed(() => {
  if (!data.value) return {}
  const max = Math.max(...data.value.heatmap.map(h => h.count), 1)
  const map = {}
  for (const h of data.value.heatmap) {
    map[`${h.day}-${h.hour}`] = { count: h.count, ratio: h.count / max }
  }
  return map
})

function heatmapValue(day, hour) {
  return heatmapLookup.value[`${day}-${hour}`]?.count ?? 0
}

function heatmapCellStyle(day, hour) {
  const cell = heatmapLookup.value[`${day}-${hour}`]
  if (!cell) return 'background: var(--heat-empty, rgba(99,102,241,0.06))'
  const alpha = 0.1 + cell.ratio * 0.9
  return `background: rgba(99,102,241,${alpha.toFixed(2)})`
}

const deviceRows = computed(() => {
  if (!data.value?.devices) return []
  return Object.entries(data.value.devices).sort((a, b) => b[1] - a[1])
})

const totalDevices = computed(() => deviceRows.value.reduce((s, [, c]) => s + c, 0))

function riskColor(score) {
  if (score >= 60) return 'text-red-500'
  if (score >= 30) return 'text-amber-500'
  return 'text-green-500'
}

// ── API calls ─────────────────────────────────────────────────────────────────

async function loadData() {
  loading.value = true
  planError.value = false
  try {
    const token = localStorage.getItem('access_token') ?? ''
    const res = await fetch(`/api/v1/analytics/visitors/?days=${period.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.status === 403) { planError.value = true; return }
    if (!res.ok) return
    data.value = await res.json()
  } finally {
    loading.value = false
  }
}

async function changePeriod(d) {
  period.value = d
  await loadData()
}

onMounted(loadData)
</script>
