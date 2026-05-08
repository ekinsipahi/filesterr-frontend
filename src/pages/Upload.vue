<template>
  <div class="min-h-screen flex flex-col">
    <!-- Full-screen hero upload -->
    <section class="flex-1 flex items-center justify-center px-6 py-32">
      <!-- BG -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-500/6 dark:bg-brand-500/10 blur-[100px] rounded-full" />
        <div class="absolute inset-0 bg-grid opacity-40" />
      </div>

      <div class="relative w-full max-w-xl">
        <!-- Header -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Anonymous · No account needed
          </div>
          <h1 class="font-display text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            Drop a file.<br/>
            <span class="text-gradient">Get a link.</span>
          </h1>
          <p class="text-zinc-500 dark:text-zinc-400">
            Up to 1GB free · <a href="/pricing" class="text-brand-500 hover:underline font-medium">Upgrade</a> for 50GB+
          </p>
        </div>

        <!-- Upload widget -->
        <div class="card p-6 shadow-2xl">
          <!-- Window chrome -->
          <div class="flex items-center gap-2 mb-5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div class="w-3 h-3 rounded-full bg-red-400/80" />
            <div class="w-3 h-3 rounded-full bg-amber-400/80" />
            <div class="w-3 h-3 rounded-full bg-green-400/80" />
            <span class="ml-auto font-mono text-xs text-zinc-400">filesterr.com/upload</span>
          </div>

          <UploadWidget />
        </div>

        <!-- Perks row -->
        <div class="flex flex-wrap justify-center gap-5 mt-8">
          <div v-for="perk in perks" :key="perk" class="flex items-center gap-1.5 text-xs text-zinc-400">
            <svg class="w-3.5 h-3.5 text-brand-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            {{ perk }}
          </div>
        </div>

        <!-- Signup upsell -->
        <div class="mt-8 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-center">
          <p class="text-sm font-semibold mb-1">Want 10GB free + download analytics?</p>
          <p class="text-xs text-zinc-500 mb-4">Free account includes real-time download feed, visitor location, and device info.</p>
          <a href="/register" class="btn-primary text-sm">Create Free Account</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import UploadWidget from '../components/upload/UploadWidget.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Upload a File — Filesterr',
  meta: [
    { name: 'description', content: 'Upload any file anonymously. Get a shareable link instantly. Up to 1GB free — no account needed. Create a free account for 10GB and real-time download analytics.' },
    { property: 'og:title', content: 'Upload a File — Filesterr' },
    { property: 'og:description', content: 'Get a shareable link in seconds. Track who downloads it. No account needed.' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://filesterr.com/upload' }],
})

const perks = [
  'Delete link included',
  'Any file type',
  'Instant CDN delivery',
  'AES-256 encrypted',
]
</script>