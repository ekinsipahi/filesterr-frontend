<template>
  <section class="py-24 px-6">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl font-extrabold mb-4">Frequently asked</h2>
      </div>
      <div class="space-y-2">
        <div v-for="(faq, i) in faqs" :key="i" class="card overflow-hidden">
          <button class="w-full flex items-center justify-between px-6 py-5 text-left" @click="open = open === i ? null : i">
            <span class="font-semibold text-sm pr-4">{{ faq.q }}</span>
            <svg class="w-5 h-5 text-zinc-400 shrink-0 transition-transform" :class="open === i ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div v-if="open === i" class="px-6 pb-5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-4">{{ faq.a }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue'
const open = ref(null)
const faqs = [
  { q:'Does the free plan include analytics?', a:'Yes. Free accounts get a real-time download feed with IP, location, and device data. Visitor fingerprinting, bot detection, and heatmaps require Premium or Pro.' },
  { q:'Can I detect if the same person downloads multiple times?', a:'Yes — Visitor Fingerprinting, available on Premium and Pro. We identify returning visitors across sessions, even incognito mode or after cookie clear.' },
  { q:'How accurate is the VPN and bot detection?', a:'Our database covers 99%+ of known datacenter IP ranges, major VPN providers, and Tor exit nodes. Updated daily. Users report 90%+ accuracy in real-world testing.' },
  { q:'Does analytics tracking work for anonymous uploads?', a:'Anonymous uploads (no account) only show a download count. For full analytics including real-time feed and visitor data, you need a free account or above.' },
  { q:'Can I export my analytics data?', a:'Pro plan users can export all download data as CSV. API access is also included on Pro for programmatic data retrieval.' },
  { q:'Is analytics GDPR compliant?', a:'Yes. Filesterr is GDPR compliant. We collect minimum data necessary, files are encrypted at rest with AES-256. We never sell your data.' },
]
</script>