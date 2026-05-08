<template>
  <section id="analytics" class="py-28 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ t('analytics.tagline') }}</p>
          <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-6">{{ t('analytics.h2a') }}<br/><span class="text-gradient">{{ t('analytics.h2b') }}</span></h2>
          <p class="text-lg text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed">{{ t('analytics.sub') }}</p>
          <div class="space-y-5">
            <div v-for="(item, i) in ANALYTICS_ITEM_KEYS" :key="i" class="flex gap-4">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5" :class="ANALYTICS_ICON_STYLES[i].bg">
                <svg class="w-5 h-5" :class="ANALYTICS_ICON_STYLES[i].color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" :d="ANALYTICS_ICON_STYLES[i].icon"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold mb-1">{{ t(`analytics.item${i}_title`) }}</h4>
                <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ t(`analytics.item${i}_desc`) }}</p>
                <span class="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-semibold" :class="ANALYTICS_ICON_STYLES[i].badgeCls">{{ t(`analytics.item${i}_plan`) }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Dashboard mock -->
        <div class="relative">
          <div class="absolute -inset-4 bg-brand-500/5 blur-3xl rounded-3xl" />
          <div class="relative card shadow-2xl overflow-hidden">
            <div class="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span class="font-semibold text-sm">project-brief.pdf</span>
              <span class="text-xs px-2 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-medium">24 {{ t('analytics.totalDownloads').toLowerCase() }}</span>
            </div>
            <div class="grid grid-cols-3 divide-x divide-zinc-100 dark:divide-zinc-800 border-b border-zinc-100 dark:border-zinc-800">
              <div class="p-4 text-center"><div class="font-display text-2xl font-bold">24</div><div class="text-xs text-zinc-400 mt-0.5">{{ t('analytics.totalDownloads') }}</div></div>
              <div class="p-4 text-center"><div class="font-display text-2xl font-bold">17</div><div class="text-xs text-zinc-400 mt-0.5">{{ t('analytics.uniqueVisitors') }}</div></div>
              <div class="p-4 text-center"><div class="font-display text-2xl font-bold text-red-500">3</div><div class="text-xs text-zinc-400 mt-0.5">{{ t('analytics.flaggedIps') }}</div></div>
            </div>
            <div class="divide-y divide-zinc-50 dark:divide-zinc-800/50">
              <div v-for="v in visitors" :key="v.ip" class="flex items-center gap-4 px-6 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                <span class="text-xl">{{ v.flag }}</span>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium truncate">{{ v.city }}</span>
                    <span v-if="v.badge" class="text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase" :class="v.badgeColor">{{ v.badge }}</span>
                  </div>
                  <div class="text-xs text-zinc-400 font-mono">{{ v.ip }}</div>
                </div>
                <div class="text-right shrink-0"><div class="text-xs text-zinc-500">{{ v.time }}</div><div class="text-xs text-zinc-400">{{ v.device }}</div></div>
              </div>
            </div>
            <div class="relative px-6 py-4 border-t border-zinc-100 dark:border-zinc-800">
              <div class="blur-sm pointer-events-none">
                <div v-for="n in 3" :key="n" class="flex items-center gap-4 py-3">
                  <div class="w-6 h-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                  <div class="flex-1 space-y-1.5"><div class="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-32" /><div class="h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded w-20" /></div>
                  <div class="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-16" />
                </div>
              </div>
              <div class="absolute inset-0 flex items-center justify-center">
                <a href="/register?plan=pro" class="btn-primary text-xs">{{ t('analytics.unlockCta') }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { ANALYTICS_ITEM_KEYS, ANALYTICS_ICON_STYLES } from '../../data/plans.js'
const { t } = useI18n()
const visitors = [
  { flag: '🇺🇸', city: 'New York, US', ip: '104.28.x.x', time: '2 min ago', device: 'Chrome / Mac', badge: 'Returning', badgeColor: 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400' },
  { flag: '🇩🇪', city: 'Berlin, DE', ip: '185.220.x.x', time: '8 min ago', device: 'Firefox / Win', badge: 'VPN', badgeColor: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700' },
  { flag: '🇬🇧', city: 'London, GB', ip: '91.108.x.x', time: '15 min ago', device: 'Safari / iOS', badge: null, badgeColor: '' },
  { flag: '🚫', city: 'Datacenter — US', ip: '23.94.x.x', time: '22 min ago', device: 'curl/7.68', badge: 'Bot', badgeColor: 'bg-red-100 dark:bg-red-900/30 text-red-700' },
]
</script>