<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">

    <section class="border-b border-zinc-200 dark:border-zinc-800 py-20 px-6 bg-zinc-50 dark:bg-zinc-900/50">
      <div class="max-w-3xl mx-auto">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Legal</p>
        <h1 class="font-display text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4">Cookie Policy</h1>
        <p class="text-sm text-zinc-400">Last updated: June 2025</p>
      </div>
    </section>

    <div class="max-w-3xl mx-auto px-6 py-16 space-y-12 prose-legal">

      <section v-for="section in sections" :key="section.title" class="space-y-3">
        <h2 class="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50">{{ section.title }}</h2>
        <p v-for="(p, i) in section.paras" :key="i" class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{{ p }}</p>
        <ul v-if="section.items" class="space-y-2 mt-2">
          <li v-for="item in section.items" :key="item.name"
            class="rounded-xl border border-zinc-200 dark:border-zinc-800 px-5 py-3">
            <span class="font-semibold text-zinc-800 dark:text-zinc-200 text-sm">{{ item.name }}</span>
            <span class="text-zinc-400 mx-2">—</span>
            <span class="text-zinc-500 dark:text-zinc-400 text-sm">{{ item.desc }}</span>
          </li>
        </ul>
      </section>

      <section class="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 class="font-display text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">Contact</h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Questions about this policy? Email us at
          <a href="mailto:privacy@filesterr.com" class="text-brand-500 hover:underline">privacy@filesterr.com</a>.
        </p>
      </section>

    </div>
  </main>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

useHead({
  title: computed(() => t('pageMeta.cookies.title')),
  meta: [{ name: 'description', content: computed(() => t('pageMeta.cookies.description')) }],
})

const sections = [
  {
    title: '1. What Are Cookies',
    paras: [
      'Cookies are small text files placed on your device when you visit a website. They allow websites to remember your preferences, keep you signed in, and understand how you use the site.',
    ],
  },
  {
    title: '2. Cookies We Use',
    paras: ['We use a minimal set of cookies necessary for the service to function and to understand aggregate usage patterns.'],
    items: [
      { name: 'auth_token',      desc: 'Session cookie. Keeps you signed in. Expires when you log out or after 30 days.' },
      { name: 'refresh_token',   desc: 'HTTP-only cookie used to obtain new access tokens securely.' },
      { name: 'theme',           desc: 'Stores your dark/light mode preference. No expiry.' },
      { name: 'locale',          desc: 'Stores your language preference. No expiry.' },
      { name: '_ga / _gid',      desc: 'Google Analytics. Aggregate, anonymised traffic statistics. Expires after 2 years / 24 hours.' },
    ],
  },
  {
    title: '3. Cookies We Do Not Use',
    paras: [
      'We do not use advertising cookies, cross-site tracking cookies, or sell your browsing behaviour to third parties.',
    ],
  },
  {
    title: '4. Third-Party Services',
    paras: [
      'Our analytics provider (Google Analytics) may set their own cookies. These are governed by Google\'s privacy policy. We have enabled IP anonymisation and do not share personally identifiable data.',
    ],
  },
  {
    title: '5. Managing Cookies',
    paras: [
      'You can disable cookies through your browser settings at any time. Disabling essential cookies (auth_token, refresh_token) will prevent you from staying signed in.',
      'Most browsers allow you to block third-party cookies specifically — this will disable analytics without affecting core functionality.',
    ],
  },
  {
    title: '6. Changes to This Policy',
    paras: [
      'We may update this policy as we add new features. Material changes will be communicated via the dashboard or email. Continued use of the service after changes constitutes acceptance.',
    ],
  },
]
</script>
