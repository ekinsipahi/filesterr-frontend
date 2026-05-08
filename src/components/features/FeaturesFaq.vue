<template>
  <section class="py-24 px-6">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-14">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Common Questions</p>
        <h2 class="font-display text-4xl font-extrabold mb-4">Everything You Wanted to Ask</h2>
        <p class="text-zinc-500 dark:text-zinc-400">If it's not here, our team responds in under 2 hours on average.</p>
      </div>

      <div class="space-y-3">
        <div v-for="(faq, i) in faqs" :key="i" class="card overflow-hidden">
          <button @click="open = open === i ? null : i"
            class="w-full flex items-center justify-between p-6 text-left gap-4">
            <span class="font-semibold text-zinc-900 dark:text-white text-sm sm:text-base">{{ faq.q }}</span>
            <div class="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 transition-transform duration-200"
              :class="open === i ? 'rotate-45' : ''">
              <svg class="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
              </svg>
            </div>
          </button>
          <div v-if="open === i" class="px-6 pb-6">
            <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(null)

const faqs = [
  { q: 'How is Filesterr different from Google Drive or Dropbox?', a: "Google Drive and Dropbox are storage tools built for collaboration. Filesterr is built for sharing — specifically, for understanding what happens after you share. You get real-time analytics, visitor fingerprinting, bot detection, and security controls that Google Drive simply doesn't offer." },
  { q: 'Does visitor fingerprinting work even if someone uses a VPN or incognito mode?', a: "Yes. Filesterr's fingerprinting uses a combination of browser signals, canvas fingerprint, timezone, and other non-IP signals to identify the same visitor across sessions — including incognito. VPN usage is flagged separately so you can see both the masked and probable real origin." },
  { q: 'Can I use Filesterr for commercial file delivery?', a: 'Absolutely. Thousands of freelancers and small businesses use Filesterr to deliver client work, sell digital products, and distribute internal assets. The Pro plan includes API access for fully automated delivery pipelines.' },
  { q: 'What happens when a file expires?', a: 'When a download link expires (by date or by download count), the link returns a 410 Gone response. The file itself is not automatically deleted from your storage — you remain in control of the original. You can always generate a new link.' },
  { q: 'Is the free plan really free forever?', a: 'Yes. 10 GB of storage and unlimited file sharing is free indefinitely. No trial period, no credit card, no catch. You upgrade only when you need features like visitor intelligence, direct links, or extra storage.' },
  { q: 'How accurate is the bot detection?', a: "Filesterr's bot detection runs against a continuously updated database of known datacenter IP ranges, user-agent patterns, and behavioral signals. In internal testing, it correctly identifies over 99% of non-human download events. False positives (real humans flagged as bots) are under 0.1%." },
  { q: 'Can I integrate Filesterr with my existing tools?', a: 'Pro users get full API access with REST endpoints for uploading, managing, and sharing files, plus webhook events for download notifications. You can pipe data into Zapier, Slack, your CRM, or any custom dashboard.' },
]
</script>