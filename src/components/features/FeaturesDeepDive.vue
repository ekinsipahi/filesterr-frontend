<template>
  <section class="py-24 px-6">
    <div class="max-w-7xl mx-auto space-y-24">

      <!-- Analytics row -->
      <div class="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Real-Time Intelligence</p>
          <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
            Stop Guessing<br/><span class="text-gradient">Who Downloads Your Files</span>
          </h2>
          <p class="text-lg text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
            Every time someone opens your link, Filesterr captures their location, device, browser fingerprint, and whether they're a real person — or a bot. You get the full picture before they even finish downloading.
          </p>
          <ul class="space-y-4 mb-8">
            <li v-for="b in analyticsBenefits" :key="b.title" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5" :class="b.bg">
                <svg class="w-4 h-4" :class="b.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" :d="b.icon"/>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-sm mb-0.5">{{ b.title }}</p>
                <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ b.text }}</p>
              </div>
            </li>
          </ul>
          <a href="/register?plan=premium" class="btn-primary inline-flex items-center gap-2">
            Get Visitor Intelligence
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>

        <!-- Dashboard mock -->
        <div class="relative">
          <div class="absolute -inset-4 bg-brand-500/5 blur-3xl rounded-3xl" />
          <div class="relative card shadow-xl overflow-hidden">
            <div class="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span class="font-semibold text-sm">project-brief.pdf</span>
              <span class="text-xs px-2 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-medium">24 downloads</span>
            </div>
            <div class="grid grid-cols-3 divide-x divide-zinc-100 dark:divide-zinc-800 border-b border-zinc-100 dark:border-zinc-800">
              <div class="p-4 text-center"><div class="font-display text-2xl font-bold">24</div><div class="text-xs text-zinc-400 mt-0.5">Downloads</div></div>
              <div class="p-4 text-center"><div class="font-display text-2xl font-bold">17</div><div class="text-xs text-zinc-400 mt-0.5">Unique visitors</div></div>
              <div class="p-4 text-center"><div class="font-display text-2xl font-bold text-red-500">3</div><div class="text-xs text-zinc-400 mt-0.5">Flagged IPs</div></div>
            </div>
            <div class="divide-y divide-zinc-50 dark:divide-zinc-800/50">
              <div v-for="v in mockVisitors" :key="v.ip" class="flex items-center gap-4 px-6 py-3.5">
                <span class="text-xl">{{ v.flag }}</span>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium truncate">{{ v.city }}</span>
                    <span v-if="v.badge" class="text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase" :class="v.badgeColor">{{ v.badge }}</span>
                  </div>
                  <div class="text-xs text-zinc-400 font-mono">{{ v.ip }}</div>
                </div>
                <div class="text-right shrink-0">
                  <div class="text-xs text-zinc-500">{{ v.time }}</div>
                  <div class="text-xs text-zinc-400">{{ v.device }}</div>
                </div>
              </div>
            </div>
            <div class="relative px-6 py-4 border-t border-zinc-100 dark:border-zinc-800">
              <div class="blur-sm pointer-events-none">
                <div v-for="n in 3" :key="n" class="flex items-center gap-4 py-3">
                  <div class="w-6 h-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                  <div class="flex-1 space-y-1.5">
                    <div class="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-32" />
                    <div class="h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded w-20" />
                  </div>
                  <div class="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-16" />
                </div>
              </div>
              <div class="absolute inset-0 flex items-center justify-center">
                <a href="/register?plan=pro" class="btn-primary text-xs">Unlock Full Intel →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Security row -->
      <div class="grid lg:grid-cols-2 gap-14 items-center">
        <div class="order-2 lg:order-1 relative">
          <div class="absolute -inset-4 bg-violet-500/5 blur-3xl rounded-3xl" />
          <div class="relative card shadow-xl p-8 space-y-5">
            <div v-for="sec in securityMock" :key="sec.label"
              class="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="sec.bg">
                <svg class="w-5 h-5" :class="sec.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" :d="sec.icon"/>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold">{{ sec.label }}</p>
                <p class="text-xs text-zinc-500 dark:text-zinc-400">{{ sec.desc }}</p>
              </div>
              <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <div class="w-2 h-2 rounded-full bg-emerald-500" />
                Active
              </div>
            </div>
          </div>
        </div>

        <div class="order-1 lg:order-2">
          <p class="text-xs font-bold text-violet-500 uppercase tracking-widest mb-4">Enterprise-Grade Security</p>
          <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
            Your Files, Your Rules —<br/><span class="text-gradient">Zero Compromises</span>
          </h2>
          <p class="text-lg text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
            Password protection, expiry dates, one-time links, and 256-bit AES encryption at rest. Share with confidence knowing only the right person — at the right time — gets access.
          </p>
          <ul class="space-y-3 mb-8">
            <li v-for="b in securityBenefits" :key="b" class="flex items-center gap-3 text-sm">
              <svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-zinc-700 dark:text-zinc-300">{{ b }}</span>
            </li>
          </ul>
          <a href="/register" class="btn-primary inline-flex items-center gap-2">
            Secure Your Files Now
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const analyticsBenefits = [
  { title: 'Know who your real audience is', text: 'Location, device, OS, browser — full context for every download event.', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', bg: 'bg-brand-50 dark:bg-brand-900/20', color: 'text-brand-500' },
  { title: 'Catch bots inflating your stats', text: 'Datacenter IPs, curl requests, and known crawlers are automatically flagged — not counted.', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636', bg: 'bg-red-50 dark:bg-red-900/20', color: 'text-red-500' },
  { title: 'Spot returning visitors instantly', text: 'Session fingerprinting tracks the same person across multiple downloads and browsers.', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', bg: 'bg-violet-50 dark:bg-violet-900/20', color: 'text-violet-500' },
]
const mockVisitors = [
  { flag: '🇺🇸', city: 'New York, US',   ip: '104.28.x.x',  time: '2 min ago',  device: 'Chrome / Mac',  badge: 'Returning', badgeColor: 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400' },
  { flag: '🇩🇪', city: 'Berlin, DE',     ip: '185.220.x.x', time: '8 min ago',  device: 'Firefox / Win', badge: 'VPN',       badgeColor: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700' },
  { flag: '🇬🇧', city: 'London, GB',     ip: '91.108.x.x',  time: '15 min ago', device: 'Safari / iOS',  badge: null,        badgeColor: '' },
  { flag: '🚫', city: 'Datacenter — US', ip: '23.94.x.x',   time: '22 min ago', device: 'curl/7.68',     badge: 'Bot',       badgeColor: 'bg-red-100 dark:bg-red-900/30 text-red-700' },
]
const securityMock = [
  { label: 'AES-256 Encryption at Rest',  desc: 'All files stored fully encrypted',    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', bg: 'bg-blue-50 dark:bg-blue-900/20',    color: 'text-blue-500' },
  { label: 'Password Protection',          desc: 'Per-file password, set in one click', icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z', bg: 'bg-violet-50 dark:bg-violet-900/20', color: 'text-violet-500' },
  { label: 'Expiring Download Links',      desc: 'Auto-delete after date or # of uses', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', bg: 'bg-amber-50 dark:bg-amber-900/20',  color: 'text-amber-500' },
  { label: 'One-Time Download Links',      desc: 'Link self-destructs after first open', icon: 'M13 10V3L4 14h7v7l9-11h-7z', bg: 'bg-red-50 dark:bg-red-900/20',      color: 'text-red-500' },
  { label: 'GDPR & CCPA Compliant',        desc: 'No data sold, full user control',     icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', bg: 'bg-emerald-50 dark:bg-emerald-900/20', color: 'text-emerald-500' },
]
const securityBenefits = [
  'Password-protect any file in under 5 seconds',
  'Set download links to expire after a date or number of uses',
  'One-time links that vanish after the first click',
  '256-bit AES encryption at rest and in transit',
  'GDPR & CCPA compliant — your data stays yours',
]
</script>