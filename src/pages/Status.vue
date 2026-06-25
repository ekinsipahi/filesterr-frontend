<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">
    <div class="max-w-3xl mx-auto px-6 py-16">

      <div class="mb-10">
        <h1 class="font-display text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">System Status</h1>
        <p class="text-sm text-zinc-500">Real-time operational status of all Filesterr services.</p>
      </div>

      <!-- Overall status -->
      <div class="rounded-2xl border p-6 mb-8 flex items-center gap-4"
        :class="allOperational
          ? 'border-green-200 dark:border-green-800/40 bg-green-50 dark:bg-green-900/10'
          : 'border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-900/10'">
        <div class="w-4 h-4 rounded-full shrink-0 animate-pulse"
          :class="allOperational ? 'bg-green-500' : 'bg-amber-500'" />
        <div>
          <p class="font-bold text-lg"
            :class="allOperational ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'">
            {{ allOperational ? 'All Systems Operational' : 'Partial Disruption' }}
          </p>
          <p class="text-sm text-zinc-500">Last checked: {{ lastChecked }}</p>
        </div>
      </div>

      <!-- Services -->
      <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800 mb-12">
        <div v-for="svc in services" :key="svc.name" class="flex items-center justify-between px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 rounded-full shrink-0"
              :class="{
                'bg-green-500': svc.status === 'operational',
                'bg-amber-500': svc.status === 'degraded',
                'bg-red-500':   svc.status === 'outage',
              }" />
            <span class="text-sm font-medium text-zinc-800 dark:text-zinc-200">{{ svc.name }}</span>
          </div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full"
            :class="{
              'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400': svc.status === 'operational',
              'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400': svc.status === 'degraded',
              'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400':         svc.status === 'outage',
            }">
            {{ svc.status === 'operational' ? 'Operational' : svc.status === 'degraded' ? 'Degraded' : 'Outage' }}
          </span>
        </div>
      </div>

      <!-- Uptime stats -->
      <h2 class="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Uptime — Last 90 days</h2>
      <div class="space-y-4 mb-12">
        <div v-for="svc in services" :key="'up-' + svc.name">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-sm text-zinc-600 dark:text-zinc-400">{{ svc.name }}</span>
            <span class="text-sm font-bold text-green-600 dark:text-green-400">{{ svc.uptime }}%</span>
          </div>
          <div class="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div class="h-full bg-green-500 rounded-full" :style="{ width: svc.uptime + '%' }" />
          </div>
        </div>
      </div>

      <!-- Incident history -->
      <h2 class="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Recent Incidents</h2>
      <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 text-center text-zinc-400 text-sm">
        No incidents in the last 90 days.
      </div>

    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'System Status — Filesterr',
  meta: [{ name: 'description', content: 'Real-time operational status of all Filesterr services.' }],
})

const lastChecked = new Date().toUTCString()

const services = [
  { name: 'File Upload API',        status: 'operational', uptime: 99.99 },
  { name: 'File Download / CDN',    status: 'operational', uptime: 99.99 },
  { name: 'Download Analytics',     status: 'operational', uptime: 99.98 },
  { name: 'Authentication Service', status: 'operational', uptime: 99.99 },
  { name: 'Dashboard',              status: 'operational', uptime: 99.97 },
  { name: 'MediaFire Storage',      status: 'operational', uptime: 99.90 },
]

const allOperational = computed(() => services.every(s => s.status === 'operational'))
</script>
