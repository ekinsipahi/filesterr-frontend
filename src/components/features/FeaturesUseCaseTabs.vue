<template>
  <section class="py-24 px-6 section-alt">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Built for Every Workflow</p>
        <h2 class="font-display text-4xl font-extrabold mb-4">
          However You Share Files,<br/><span class="text-gradient">Filesterr Has You Covered</span>
        </h2>
      </div>

      <div class="flex flex-wrap justify-center gap-2 mb-10">
        <button v-for="(tab, i) in tabs" :key="i" @click="active = i"
          class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          :class="active === i ? 'bg-brand-500 text-white shadow-glow' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'">
          {{ tab.label }}
        </button>
      </div>

      <div class="card p-10">
        <div class="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" :class="tabs[active].iconBg">
              <svg class="w-6 h-6" :class="tabs[active].iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" :d="tabs[active].icon"/>
              </svg>
            </div>
            <h3 class="font-display text-2xl font-bold mb-3">{{ tabs[active].title }}</h3>
            <p class="text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">{{ tabs[active].desc }}</p>
            <ul class="space-y-2.5 mb-7">
              <li v-for="b in tabs[active].bullets" :key="b" class="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                {{ b }}
              </li>
            </ul>
            <a :href="tabs[active].href" class="btn-primary inline-flex items-center gap-2 text-sm">{{ tabs[active].cta }}</a>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="stat in tabs[active].stats" :key="stat.label"
              class="rounded-2xl p-6 text-center"
              :class="stat.highlight ? 'bg-brand-500 text-white' : 'bg-zinc-50 dark:bg-zinc-800'">
              <div class="font-display text-3xl font-black mb-1" :class="stat.highlight ? 'text-white' : 'text-zinc-900 dark:text-white'">{{ stat.val }}</div>
              <div class="text-xs font-medium" :class="stat.highlight ? 'text-brand-100' : 'text-zinc-500 dark:text-zinc-400'">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)

const tabs = [
  { label: 'Freelancers', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', iconBg: 'bg-brand-50 dark:bg-brand-900/20', iconColor: 'text-brand-500', title: 'Deliver Client Work That Feels Premium', desc: "Stop sending WeTransfer links that expire in a week. Give clients a clean, branded experience with analytics that prove you delivered.", bullets: ['Know exactly when a client opens your files', 'Password-protect deliverables by project', "Set auto-expiry so stale links don't float around"], stats: [{ val: '10 GB', label: 'Free storage', highlight: false }, { val: '∞', label: 'Link sharing', highlight: true }, { val: '100%', label: 'Uptime SLA', highlight: false }, { val: '$0', label: 'To start', highlight: false }], cta: 'Start as a Freelancer →', href: '/register' },
  { label: 'Developers', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', iconBg: 'bg-indigo-50 dark:bg-indigo-900/20', iconColor: 'text-indigo-500', title: 'Integrate File Sharing Into Your App via API', desc: 'Full REST API, webhook events, and a developer-first design. Add file sharing and analytics to any product in hours, not weeks.', bullets: ['Upload, manage, and share files programmatically', 'Receive webhooks on download events', 'Pull analytics data into your own dashboards'], stats: [{ val: 'REST', label: 'API architecture', highlight: false }, { val: '< 50ms', label: 'Avg response time', highlight: true }, { val: '50+', label: 'CDN locations', highlight: false }, { val: '99.99%', label: 'SLA uptime', highlight: false }], cta: 'Read the API Docs →', href: '/docs' },
  { label: 'Content Creators', icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z', iconBg: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-500', title: 'Know Which Content Actually Gets Watched', desc: "Share Lightroom presets, video templates, or sample packs and see in real time who downloads them, where they're from, and whether they come back.", bullets: ['See download spikes correlate with your posts', 'Identify your top geographic markets', 'Track returning fans across sessions'], stats: [{ val: '12M+', label: 'Files uploaded', highlight: false }, { val: '4.8★', label: 'Average rating', highlight: true }, { val: '500K+', label: 'Active users', highlight: false }, { val: '5 TB', label: 'Daily transfers', highlight: false }], cta: 'Start Sharing Content →', href: '/register' },
  { label: 'Teams', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', iconBg: 'bg-violet-50 dark:bg-violet-900/20', iconColor: 'text-violet-500', title: 'Secure File Distribution Across Your Entire Team', desc: 'Send proposals, contracts, and reports to clients with confidence. Know who opened what, when — and lock down access the moment a deal closes.', bullets: ['Distribute files with role-based access logic', 'Audit every download with timestamps and IPs', 'Revoke links instantly if plans change'], stats: [{ val: '890 GB', label: 'Pro storage', highlight: false }, { val: '256-bit', label: 'Encryption', highlight: true }, { val: 'GDPR', label: 'Compliant', highlight: false }, { val: '$8/mo', label: 'Pro plan', highlight: false }], cta: 'Try Teams →', href: '/register?plan=pro' },
]
</script>