<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">

    <section class="border-b border-zinc-200 dark:border-zinc-800 py-20 px-6 bg-zinc-50 dark:bg-zinc-900/50">
      <div class="max-w-3xl mx-auto">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Legal</p>
        <h1 class="font-display text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4">GDPR & Privacy</h1>
        <p class="text-sm text-zinc-400">Last updated: June 2025</p>
      </div>
    </section>

    <div class="max-w-3xl mx-auto px-6 py-16 space-y-12">

      <section v-for="section in sections" :key="section.title" class="space-y-3">
        <h2 class="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50">{{ section.title }}</h2>
        <p v-for="(p, i) in section.paras" :key="i" class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{{ p }}</p>
        <ul v-if="section.list" class="list-disc list-inside space-y-1 text-sm text-zinc-500 dark:text-zinc-400 pl-2">
          <li v-for="item in section.list" :key="item">{{ item }}</li>
        </ul>
      </section>

      <!-- Rights highlight -->
      <section>
        <h2 class="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Your Rights Under GDPR</h2>
        <div class="grid sm:grid-cols-2 gap-3">
          <div v-for="right in rights" :key="right.title"
            class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <p class="font-semibold text-sm text-zinc-800 dark:text-zinc-200 mb-1">{{ right.title }}</p>
            <p class="text-xs text-zinc-500 dark:text-zinc-400">{{ right.desc }}</p>
          </div>
        </div>
      </section>

      <section class="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 class="font-display text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">Contact Our DPO</h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          To exercise any of your rights, or if you have a privacy concern, contact us at
          <a href="mailto:privacy@filesterr.com" class="text-brand-500 hover:underline">privacy@filesterr.com</a>.
          We will respond within 30 days as required by GDPR.
        </p>
      </section>

    </div>
  </main>
</template>

<script setup>
import { useHead } from '@vueuse/head'
useHead({
  title: 'GDPR & Privacy — Filesterr',
  meta: [{ name: 'description', content: 'How Filesterr collects, stores, and protects your personal data under GDPR.' }],
})

const sections = [
  {
    title: '1. Who We Are',
    paras: [
      'Filesterr ("we", "us") is the data controller for personal data collected through this service. We are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR) and applicable data protection laws.',
    ],
  },
  {
    title: '2. Data We Collect',
    paras: ['We collect only the data necessary to provide the service:'],
    list: [
      'Account data: email address, hashed password, username.',
      'File metadata: filename, size, upload timestamp, download counts.',
      'File content: stored encrypted at rest in our cloud storage (Cloudflare R2).',
      'Usage data: IP address (anonymised after 24h), browser type, pages visited.',
      'Payment data: handled entirely by our payment processor — we do not store card numbers.',
    ],
  },
  {
    title: '3. Legal Basis for Processing',
    paras: [
      'We process your data under the following lawful bases: (a) Contract performance — to provide you with the file sharing service you signed up for. (b) Legitimate interests — to prevent abuse, detect fraud, and improve the service. (c) Consent — for optional analytics and marketing communications, which you may withdraw at any time.',
    ],
  },
  {
    title: '4. Data Retention',
    paras: [
      'Files shared with an expiry date are deleted automatically when they expire. Files without an expiry are retained until you delete them or close your account. Account data is deleted within 30 days of account closure. Anonymised analytics are retained for up to 2 years.',
    ],
  },
  {
    title: '5. Data Transfers',
    paras: [
      'We store data within the European Economic Area where possible. Our CDN and cloud storage (Cloudflare R2) may process data in data centres globally. Cloudflare is Privacy Shield certified and maintains appropriate safeguards under Standard Contractual Clauses.',
    ],
  },
  {
    title: '6. Third Parties',
    paras: [
      'We do not sell your personal data. We share data only with processors necessary to deliver the service (storage, CDN, payment processing, email delivery) under data processing agreements that require GDPR-equivalent protections.',
    ],
  },
  {
    title: '7. Security',
    paras: [
      'Files are stored encrypted at rest. All traffic is encrypted in transit via TLS 1.3. Access tokens are short-lived JWTs. We conduct regular security reviews and follow responsible disclosure practices.',
    ],
  },
]

const rights = [
  { title: 'Right of Access', desc: 'Request a copy of all personal data we hold about you.' },
  { title: 'Right to Rectification', desc: 'Correct inaccurate or incomplete personal data.' },
  { title: 'Right to Erasure', desc: 'Request deletion of your data ("right to be forgotten").' },
  { title: 'Right to Portability', desc: 'Receive your data in a machine-readable format.' },
  { title: 'Right to Restriction', desc: 'Request we stop processing your data in certain circumstances.' },
  { title: 'Right to Object', desc: 'Object to processing based on legitimate interests.' },
]
</script>
