<template>
  <main class="overflow-hidden">

    <!-- ── Hero ── -->
    <section class="relative min-h-[70vh] flex items-center justify-center px-6 py-24 bg-white dark:bg-zinc-950">
      <!-- Ambient glow -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-3xl" />
      </div>

      <div class="relative max-w-3xl mx-auto text-center">
        <!-- Linksterr badge -->
        <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 mb-8 animate-fade-in">
          <img src="/linksterr.ico" alt="Linksterr" class="w-4 h-4 rounded-sm object-contain" />
          <span class="text-xs font-semibold text-zinc-600 dark:text-zinc-400">From the creators of</span>
          <a href="https://linksterr.com" target="_blank" rel="noopener" class="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">Linksterr</a>
        </div>

        <h1 class="text-5xl md:text-6xl font-display font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight mb-6 animate-slide-up">
          We built the file sharing tool<br>
          <span class="text-brand-500">we always needed.</span>
        </h1>

        <p class="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto animate-slide-up animation-delay-100">
          Filesterr isn't another file host. It's the answer to the question nobody was asking loudly enough:
          <em>"Who actually downloaded my file?"</em>
        </p>
      </div>
    </section>

    <!-- ── Origin story ── -->
    <section class="py-24 px-6 bg-zinc-50 dark:bg-zinc-900">
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div class="reveal">
            <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Our Story</p>
            <h2 class="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
              It started with a link shortener.
            </h2>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              We built <a href="https://linksterr.com" target="_blank" rel="noopener" class="text-brand-500 font-semibold hover:underline">Linksterr</a>
              — a link shortening platform where creators could share links and actually earn money from them.
              The response was overwhelming.
            </p>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Then came the messages: <em>"This is great — can you do the same for files?"</em>
              Not just hosting. Analytics. Tracking. Real intelligence about who's on the other end of that download link.
            </p>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              So we built it ourselves. Filesterr launched because we were tired of sharing files blindly.
              Now you don't have to either.
            </p>
          </div>

          <!-- Stats card -->
          <div class="reveal animation-delay-200">
            <div class="card p-8 space-y-6">
              <div v-for="stat in stats" :key="stat.label" class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :class="stat.bg">
                  <span class="text-xl">{{ stat.emoji }}</span>
                </div>
                <div>
                  <p class="text-2xl font-display font-extrabold text-zinc-900 dark:text-zinc-50">{{ stat.value }}</p>
                  <p class="text-sm text-zinc-500">{{ stat.label }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Why we're different ── -->
    <section class="py-24 px-6 bg-white dark:bg-zinc-950">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 reveal">
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-3">Why Filesterr</p>
          <h2 class="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100">
            File sharing is broken.<br>We fixed it.
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(card, i) in cards" :key="card.title"
            class="card p-6 reveal"
            :style="`animation-delay: ${i * 100}ms`">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4" :class="card.bg">
              <span class="text-xl">{{ card.emoji }}</span>
            </div>
            <h3 class="font-bold text-zinc-900 dark:text-zinc-100 mb-2">{{ card.title }}</h3>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ card.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Built for you ── -->
    <section class="py-24 px-6 bg-zinc-50 dark:bg-zinc-900">
      <div class="max-w-3xl mx-auto text-center reveal">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Built for you</p>
        <h2 class="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          Every feature exists because<br>a real user asked for it.
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-12 max-w-xl mx-auto">
          Password-protected files. One-time download links. Real-time analytics. Bot & VPN detection.
          We didn't invent a product — we listened to 50,000 users across Linksterr and built what they needed.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3 mb-10">
          <span v-for="tag in tags" :key="tag"
            class="px-3 py-1.5 rounded-full text-sm font-medium bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-800">
            {{ tag }}
          </span>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/upload" class="btn-primary px-6 py-3 text-base">Try It Free — No Signup</a>
          <a href="https://linksterr.com" target="_blank" rel="noopener"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <img src="/linksterr.ico" alt="" class="w-4 h-4 rounded-sm object-contain" />
            Visit Linksterr
          </a>
        </div>
      </div>
    </section>

    <!-- ── Team / closing ── -->
    <section class="py-24 px-6 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
      <div class="max-w-xl mx-auto text-center reveal">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-400 flex items-center justify-center mx-auto mb-6 shadow-glow">
          <span class="text-white font-display font-black text-2xl">F</span>
        </div>
        <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Filesterr is an independent product by the Linksterr team. We're a small, focused team that
          builds tools we'd use ourselves. No VC money, no growth-hacking. Just software that works.
        </p>
        <p class="mt-4 text-sm text-zinc-400">
          Questions?
          <a href="mailto:hello@filesterr.com" class="text-brand-500 hover:underline">hello@filesterr.com</a>
        </p>
      </div>
    </section>

  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'About Filesterr — Built by the Creators of Linksterr',
  meta: [
    { name: 'description', content: 'Filesterr was built by the team behind Linksterr — a link shortener trusted by 50,000+ users. We built the file sharing tool we always needed: with real analytics, bot detection, and download intelligence.' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'About Filesterr — Built by the Creators of Linksterr' },
    { property: 'og:description', content: 'The file sharing platform built by the Linksterr team. Download analytics, visitor intelligence, and privacy-first architecture.' },
    { property: 'og:image', content: 'https://filesterr.com/logo.png' },
  ],
  link: [{ rel: 'canonical', href: 'https://filesterr.com/about' }],
})

const stats = [
  { emoji: '📁', value: '2M+',    label: 'Files shared',            bg: 'bg-brand-50 dark:bg-brand-900/20' },
  { emoji: '👤', value: '50K+',   label: 'Active users',            bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { emoji: '🌍', value: '120+',   label: 'Countries reached',       bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { emoji: '⚡', value: '99.99%', label: 'Uptime SLA',              bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
]

const cards = [
  {
    emoji: '📊',
    title: 'Analytics-first',
    body: 'Most file hosts give you a link. We give you a window into every person who uses it — country, device, bot or human.',
    bg: 'bg-brand-50 dark:bg-brand-900/20',
  },
  {
    emoji: '🔒',
    title: 'Privacy by default',
    body: 'Password protection, one-time links, expiry dates. Your files, your rules — no one gets in without permission.',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    emoji: '🤖',
    title: 'Bot & proxy detection',
    body: 'Our fingerprinting engine catches bots, VPNs, and datacenter IPs. Know the difference between real humans and automated traffic.',
    bg: 'bg-red-50 dark:bg-red-900/20',
  },
]

const tags = [
  'Download Analytics', 'Password Protection', 'One-Time Links',
  'Bot Detection', 'VPN Detection', 'Expiring Links',
  'Folder Organization', 'Visitor Fingerprinting', 'Real-time Tracking',
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
    { threshold: 0.15 }
  )
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in  { animation: fade-in  0.6s ease both; }
.animate-slide-up { animation: slide-up 0.7s ease both; }
.animation-delay-100 { animation-delay: 100ms; }
.animation-delay-200 { animation-delay: 200ms; }

.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
