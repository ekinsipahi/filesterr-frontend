<template>
  <div>
    <!-- ===== HERO ===== -->
    <section class="relative min-h-[72vh] flex items-center pt-32 pb-20 px-6 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/8 dark:bg-brand-500/12 blur-[120px] rounded-full" />
        <div class="absolute inset-0 bg-grid opacity-50" />
      </div>
      <div class="relative max-w-7xl mx-auto w-full">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-8">
              <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Live analytics — updated in real time
            </div>
            <h1 class="font-display text-5xl sm:text-6xl xl:text-[66px] font-extrabold leading-[1.04] tracking-tight mb-6">
              Stop guessing.<br/>
              Start <span class="text-gradient">knowing.</span>
            </h1>
            <p class="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg mb-8">
              Every file you share becomes a data source. See
              <strong class="text-zinc-900 dark:text-white">who downloaded it</strong>,
              from where, with what device — and whether they were a bot, a VPN, or a real person.
            </p>
            <div class="flex flex-wrap gap-3 mb-10">
              <span v-for="pill in heroPills" :key="pill"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                <svg class="w-3 h-3 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                {{ pill }}
              </span>
            </div>
            <div class="flex flex-wrap gap-4">
              <a href="/register?plan=pro" class="btn-primary-lg group">
                Start tracking free
                <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a href="#features" class="btn-ghost-lg">See what you get</a>
            </div>
            <p class="text-xs text-zinc-400 mt-4">Free tier includes basic stats · No credit card required</p>
          </div>

          <!-- Live feed mock -->
          <div class="relative">
            <div class="absolute -inset-6 bg-brand-500/8 blur-3xl rounded-3xl" />
            <div class="relative card shadow-2xl overflow-hidden">
              <!-- Title bar -->
              <div class="flex items-center gap-2 px-5 py-3.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                <div class="flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-400/80" />
                  <div class="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div class="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <span class="ml-2 font-mono text-xs text-zinc-400">filesterr.com / analytics</span>
                <span class="ml-auto flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />LIVE
                </span>
              </div>
              <!-- Stats row -->
              <div class="grid grid-cols-3 divide-x divide-zinc-100 dark:divide-zinc-800 border-b border-zinc-100 dark:border-zinc-800">
                <div v-for="stat in heroStats" :key="stat.label" class="p-4 text-center">
                  <div class="font-display text-2xl font-bold" :class="stat.color || ''">{{ stat.value }}</div>
                  <div class="text-xs text-zinc-400 mt-0.5">{{ stat.label }}</div>
                </div>
              </div>
              <!-- Feed rows -->
              <div class="divide-y divide-zinc-50 dark:divide-zinc-800/40">
                <div v-for="(v, i) in feedRows" :key="i"
                  class="flex items-center gap-4 px-5 py-3.5 transition-colors"
                  :class="i === 0 ? 'bg-brand-50/60 dark:bg-brand-500/5' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/30'">
                  <span class="text-lg shrink-0">{{ v.flag }}</span>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-sm font-medium truncate">{{ v.city }}</span>
                      <span v-if="v.badge" class="text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0" :class="v.badgeColor">{{ v.badge }}</span>
                      <span v-if="i === 0" class="text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 shrink-0">New</span>
                    </div>
                    <div class="text-xs text-zinc-400 font-mono">{{ v.ip }}</div>
                  </div>
                  <div class="text-right shrink-0">
                    <div class="text-xs text-zinc-500">{{ v.time }}</div>
                    <div class="text-xs text-zinc-400">{{ v.device }}</div>
                  </div>
                </div>
              </div>
              <!-- Blurred CTA row -->
              <div class="relative px-5 py-4 border-t border-zinc-100 dark:border-zinc-800">
                <div class="blur-sm pointer-events-none space-y-3">
                  <div v-for="n in 3" :key="n" class="flex items-center gap-4">
                    <div class="w-6 h-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    <div class="flex-1 space-y-1.5">
                      <div class="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-28" />
                      <div class="h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded w-16" />
                    </div>
                    <div class="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-14" />
                  </div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <a href="/register?plan=pro" class="btn-primary text-xs">Unlock all data →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SOCIAL PROOF TICKER ===== -->
    <div class="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 py-4">
      <div class="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8">
        <div v-for="proof in socialProof" :key="proof.label" class="flex items-center gap-2 text-sm">
          <span class="text-brand-500 font-bold text-base">{{ proof.value }}</span>
          <span class="text-zinc-500">{{ proof.label }}</span>
        </div>
      </div>
    </div>

    <!-- ===== PAIN → GAIN SECTION ===== -->
    <section class="py-24 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">The problem</p>
          <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
            You send files blind.<br/><span class="text-gradient">We fix that.</span>
          </h2>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Before -->
          <div class="card p-8 border-red-200 dark:border-red-800/40">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
              <h3 class="font-display font-bold text-lg text-red-600 dark:text-red-400">Before Filesterr</h3>
            </div>
            <ul class="space-y-3">
              <li v-for="pain in painPoints" :key="pain" class="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <svg class="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                {{ pain }}
              </li>
            </ul>
          </div>
          <!-- After -->
          <div class="card p-8 border-brand-200 dark:border-brand-500/30 bg-brand-50/40 dark:bg-brand-500/5">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 class="font-display font-bold text-lg text-brand-600 dark:text-brand-400">With Filesterr Analytics</h3>
            </div>
            <ul class="space-y-3">
              <li v-for="gain in gainPoints" :key="gain" class="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <svg class="w-4 h-4 text-brand-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                {{ gain }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FEATURE DEEP DIVE ===== -->
    <section id="features" class="py-24 px-6 section-alt">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Intelligence layer</p>
          <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
            See beyond the<br/><span class="text-gradient">download count.</span>
          </h2>
          <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Other platforms tell you how many times a file was downloaded. We tell you everything else.
          </p>
        </div>

        <div class="space-y-6">
          <div v-for="(feat, i) in deepFeatures" :key="i"
            class="grid lg:grid-cols-2 gap-10 items-center"
            :class="i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''">
            <!-- Text -->
            <div :class="i % 2 === 1 ? 'lg:col-start-2' : ''">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6" :class="feat.planBadge">
                {{ feat.plan }}
              </div>
              <h3 class="font-display text-2xl sm:text-3xl font-extrabold mb-4">{{ feat.title }}</h3>
              <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">{{ feat.desc }}</p>
              <ul class="space-y-2.5 mb-8">
                <li v-for="point in feat.points" :key="point" class="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  <svg class="w-4 h-4 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ point }}
                </li>
              </ul>
              <a :href="feat.cta.href" class="btn-primary inline-flex items-center gap-2">
                {{ feat.cta.label }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>

            <!-- Visual card -->
            <div :class="i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''" class="relative">
              <div class="absolute -inset-4 rounded-3xl opacity-50" :class="feat.glowColor" />
              <div class="relative card p-6 shadow-xl">
                <div class="flex items-center justify-between mb-5">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="feat.iconBg">
                      <svg class="w-4 h-4" :class="feat.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" :d="feat.icon"/>
                      </svg>
                    </div>
                    <span class="text-sm font-semibold">{{ feat.cardTitle }}</span>
                  </div>
                  <span class="text-xs text-zinc-400">{{ feat.cardSub }}</span>
                </div>
                <!-- dynamic mini-widget per feature -->
                <component :is="feat.widget" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== USE CASES ===== -->
    <section class="py-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Who uses it</p>
          <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
            Built for people who<br/><span class="text-gradient">need to know.</span>
          </h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="uc in useCases" :key="uc.role" class="card-hover p-7 group">
            <div class="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" :class="uc.iconBg">
              <svg class="w-5 h-5" :class="uc.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" :d="uc.icon"/>
              </svg>
            </div>
            <div class="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">{{ uc.role }}</div>
            <h3 class="font-display font-bold text-lg mb-3">{{ uc.title }}</h3>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ uc.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PLAN COMPARISON ===== -->
    <section class="py-24 px-6 section-alt">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-14">
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Pricing</p>
          <h2 class="font-display text-4xl font-extrabold mb-4">
            Analytics for <span class="text-gradient">every level</span>
          </h2>
          <p class="text-zinc-500 dark:text-zinc-400">Start free. Unlock more as you grow.</p>
        </div>
        <div class="card overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-zinc-100 dark:border-zinc-800">
                <th class="p-5 text-left font-semibold text-zinc-500">Feature</th>
                <th v-for="plan in comparisonPlans" :key="plan.name"
                  class="p-5 text-center font-bold"
                  :class="plan.featured ? 'text-brand-600 dark:text-brand-400' : ''">
                  {{ plan.name }}
                  <div v-if="plan.price" class="text-xs font-normal text-zinc-400 mt-0.5">${{ plan.price }}/mo</div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-50 dark:divide-zinc-800/50">
              <tr v-for="row in comparisonRows" :key="row.label" class="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                <td class="p-5 text-zinc-700 dark:text-zinc-300">{{ row.label }}</td>
                <td v-for="(val, pi) in row.values" :key="pi" class="p-5 text-center">
                  <span v-if="val === true" class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/40">
                    <svg class="w-3 h-3 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  <span v-else-if="val === false" class="text-zinc-300 dark:text-zinc-600">—</span>
                  <span v-else class="font-medium text-zinc-700 dark:text-zinc-300">{{ val }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <a href="/register" class="btn-primary-lg">Get started free</a>
          <a href="/register?plan=pro" class="btn-ghost-lg">Go Pro — $8/mo</a>
        </div>
      </div>
    </section>

    <!-- ===== TESTIMONIALS STRIP ===== -->
    <section class="py-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">What users say</p>
          <h2 class="font-display text-4xl font-extrabold">Real results. Real users.</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-5">
          <div v-for="quote in analyticsQuotes" :key="quote.name" class="card-hover p-7">
            <div class="flex gap-0.5 mb-4">
              <span v-for="s in 5" :key="s" class="text-amber-400 text-sm">★</span>
            </div>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">"{{ quote.body }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" :style="`background:${quote.color}`">{{ quote.name[0] }}</div>
              <div>
                <div class="text-sm font-semibold">{{ quote.name }}</div>
                <div class="text-xs text-zinc-400">{{ quote.role }}</div>
              </div>
              <span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 font-semibold">✓ Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FINAL CTA ===== -->
    <section class="py-24 px-6 section-alt">
      <div class="max-w-4xl mx-auto">
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-emerald-500 p-14 text-center">
          <div class="absolute inset-0 bg-grid opacity-10" />
          <div class="relative">
            <p class="text-white/70 text-xs font-bold uppercase tracking-widest mb-4">Start in 30 seconds</p>
            <h2 class="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Know exactly who<br/>opens your files.
            </h2>
            <p class="text-white/75 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Join 500,000+ users who never send files blind again. Free plan includes real-time download feed.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <a href="/register" class="px-8 py-4 rounded-xl bg-white text-brand-700 font-bold text-base hover:bg-brand-50 transition-all shadow-lg hover:-translate-y-0.5">
                Create Free Account — 10GB
              </a>
              <a href="/register?plan=pro" class="px-8 py-4 rounded-xl bg-white/15 border border-white/30 text-white font-bold text-base hover:bg-white/25 transition-all">
                Go Pro — Full Intelligence
              </a>
            </div>
            <p class="text-white/50 text-xs mt-6">Free forever · No credit card · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FAQ ===== -->
    <section class="py-24 px-6">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="font-display text-3xl font-extrabold mb-4">Frequently asked</h2>
        </div>
        <div class="space-y-2">
          <div v-for="(faq, i) in faqs" :key="i" class="card overflow-hidden">
            <button class="w-full flex items-center justify-between px-6 py-5 text-left" @click="openFaq = openFaq === i ? null : i">
              <span class="font-semibold text-sm pr-4">{{ faq.q }}</span>
              <svg class="w-5 h-5 text-zinc-400 shrink-0 transition-transform" :class="openFaq === i ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div v-if="openFaq === i" class="px-6 pb-5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-4">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, defineComponent, h } from 'vue'

const isSsr = import.meta.env.SSR

/* ── JSON-LD ── */
/* ── Head / SEO ── */
if (!isSsr) {
  // Title
  document.title = 'File Download Analytics & Visitor Intelligence — Filesterr'

  const setMeta = (attr, key, content) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, key)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  const setLink = (rel, href) => {
    let el = document.querySelector(`link[rel="${rel}"]`)
    if (!el) {
      el = document.createElement('link')
      el.rel = rel
      document.head.appendChild(el)
    }
    el.href = href
  }

  // Standard meta
  setMeta('name', 'description', 'See who downloads your files, where they are, and when — in real time. Detect bots, VPNs, and returning visitors. The smartest file analytics on the web.')
  setMeta('name', 'keywords', 'file download analytics, visitor tracking, bot detection, VPN detection, file sharing analytics, download statistics')

  // Open Graph
  setMeta('property', 'og:title',       'File Download Analytics & Visitor Intelligence — Filesterr')
  setMeta('property', 'og:description', 'See who downloads your files, where they are, and when — in real time. Detect bots, VPNs, and returning visitors.')
  setMeta('property', 'og:url',         'https://filesterr.com/analytics')
  setMeta('property', 'og:type',        'website')
  setMeta('property', 'og:image',       'https://filesterr.com/og/analytics.png')

  // Twitter
  setMeta('name', 'twitter:card',        'summary_large_image')
  setMeta('name', 'twitter:title',       'File Download Analytics & Visitor Intelligence — Filesterr')
  setMeta('name', 'twitter:description', 'See who downloads your files, where they are, and when — in real time.')

  // Canonical
  setLink('canonical', 'https://filesterr.com/analytics')

  /* ── JSON-LD ── */
  const s = document.createElement('script')
  s.type = 'application/ld+json'
  s.text = JSON.stringify({ /* ... mevcut JSON-LD ... */ })
  document.head.appendChild(s)
}

/* ── Data ── */
const openFaq = ref(null)

const heroPills = [
  'Real-time feed', 'Visitor fingerprinting', 'Bot detection',
  'VPN / proxy flags', 'Geographic heatmaps', 'API access',
]

const heroStats = [
  { value: '24', label: 'Total downloads', color: '' },
  { value: '17', label: 'Unique visitors', color: '' },
  { value: '3',  label: 'Flagged IPs',     color: 'text-red-500' },
]

const feedRows = [
  { flag: '🇺🇸', city: 'New York, US',     ip: '104.28.x.x', time: 'just now',  device: 'Chrome / Mac',  badge: 'Returning', badgeColor: 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400' },
  { flag: '🇩🇪', city: 'Berlin, DE',       ip: '185.220.x.x',time: '8 min ago', device: 'Firefox / Win', badge: 'VPN',       badgeColor: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700' },
  { flag: '🇬🇧', city: 'London, GB',       ip: '91.108.x.x', time: '15 min ago',device: 'Safari / iOS',  badge: null,        badgeColor: '' },
  { flag: '🚫', city: 'Datacenter — US',   ip: '23.94.x.x',  time: '22 min ago',device: 'curl/7.68',     badge: 'Bot',       badgeColor: 'bg-red-100 dark:bg-red-900/30 text-red-700' },
]

const socialProof = [
  { value: '500K+',   label: 'users track downloads' },
  { value: '12M+',    label: 'files monitored' },
  { value: '99.99%',  label: 'uptime SLA' },
  { value: '< 1s',    label: 'analytics latency' },
  { value: '4.8★',    label: 'Trustpilot rating' },
]

const painPoints = [
  '"Did they even open it?" — you never know',
  'No idea if bots are skewing your download count',
  'Can\'t tell if the same person downloaded 10 times',
  'Zero visibility on VPN or proxy downloads',
  'No data on where in the world your files go',
]

const gainPoints = [
  'See every download — name, IP, location, device, timestamp',
  'Bot and datacenter traffic automatically flagged',
  'Fingerprint returning visitors across sessions and incognito',
  'VPN, proxy, and Tor exit node detection built in',
  'Geographic heatmap of every download, updated live',
]

/* ── Mini widgets (inline components for feature cards) ── */
const FeedWidget = defineComponent({
  render() {
    return h('div', { class: 'space-y-2.5' }, [
      ...['New York, US — Chrome', 'Berlin, DE — Firefox (VPN)', 'London, GB — Safari'].map((row, i) =>
        h('div', { class: 'flex items-center gap-3 text-xs py-2 border-b border-zinc-50 dark:border-zinc-800/50' }, [
          h('span', { class: 'text-base' }, ['🇺🇸','🇩🇪','🇬🇧'][i]),
          h('span', { class: 'flex-1 text-zinc-600 dark:text-zinc-400' }, row),
          h('span', { class: 'text-zinc-400' }, ['just now','8m','15m'][i]),
        ])
      ),
    ])
  }
})

const FingerprintWidget = defineComponent({
  render() {
    return h('div', { class: 'space-y-3' }, [
      h('div', { class: 'flex items-center gap-3 p-3 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20' }, [
        h('div', { class: 'w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold shrink-0' }, 'JD'),
        h('div', { class: 'flex-1' }, [
          h('div', { class: 'text-xs font-semibold text-brand-700 dark:text-brand-300' }, 'Returning visitor'),
          h('div', { class: 'text-xs text-zinc-400' }, 'Seen 5 times · 3 sessions · incognito + VPN'),
        ]),
      ]),
      h('div', { class: 'grid grid-cols-3 gap-2 text-xs text-center' }, [
        ['5', 'Total visits'], ['3', 'Sessions'], ['2', 'Devices'],
      ].map(([v, l]) =>
        h('div', { class: 'p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800' }, [
          h('div', { class: 'font-bold text-sm text-zinc-900 dark:text-white' }, v),
          h('div', { class: 'text-zinc-400 mt-0.5' }, l),
        ])
      )),
    ])
  }
})

const BotWidget = defineComponent({
  render() {
    return h('div', { class: 'space-y-2' }, [
      { label: 'Real visitor — Chrome / Mac', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700', tag: 'Clean' },
      { label: 'Datacenter IP — curl/7.68',   color: 'bg-red-100 dark:bg-red-900/30 text-red-700',            tag: 'Bot' },
      { label: 'NordVPN exit node',            color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700',      tag: 'VPN' },
    ].map(row =>
      h('div', { class: 'flex items-center gap-3 text-xs py-2.5 border-b border-zinc-50 dark:border-zinc-800/50 last:border-0' }, [
        h('span', { class: 'flex-1 text-zinc-600 dark:text-zinc-400' }, row.label),
        h('span', { class: `px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${row.color}` }, row.tag),
      ])
    ))
  }
})

const HeatmapWidget = defineComponent({
  render() {
    const dots = [
      { top: '20%', left: '22%', size: 14, opacity: 0.9 },
      { top: '30%', left: '48%', size: 10, opacity: 0.7 },
      { top: '25%', left: '72%', size: 8, opacity: 0.6 },
      { top: '55%', left: '30%', size: 6, opacity: 0.5 },
      { top: '60%', left: '60%', size: 7, opacity: 0.55 },
    ]
    return h('div', {
      class: 'relative rounded-xl overflow-hidden bg-zinc-900',
      style: 'height: 120px'
    }, [
      h('div', { class: 'absolute inset-0 flex items-center justify-center text-zinc-700 text-xs font-mono' }, '— world heatmap —'),
      ...dots.map(d =>
        h('div', {
          class: 'absolute rounded-full bg-brand-500',
          style: `top:${d.top};left:${d.left};width:${d.size}px;height:${d.size}px;opacity:${d.opacity};transform:translate(-50%,-50%)`
        })
      ),
    ])
  }
})

const deepFeatures = [
  {
    plan: 'Free+', planBadge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300',
    title: 'Real-time download feed',
    desc: 'See every download the moment it happens. Location, IP, device, browser, and exact timestamp — all in a live-updating feed.',
    points: ['Timestamped to the second', 'Country, city, ISP data', 'Device and browser detection', 'Available on free plan'],
    cta: { label: 'Start free', href: '/register' },
    glowColor: 'bg-brand-500/5', iconBg: 'bg-amber-50 dark:bg-amber-900/20',
    iconColor: 'text-amber-500', icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    cardTitle: 'Live downloads', cardSub: 'project-brief.pdf',
    widget: FeedWidget,
  },
  {
    plan: 'Premium+', planBadge: 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400',
    title: 'Visitor fingerprinting',
    desc: 'Our fingerprinting engine identifies returning visitors across sessions — even if they switch browsers, clear cookies, or use incognito mode.',
    points: ['Works across incognito tabs', 'Survives cookie clears', 'Tracks across VPN switches', 'Identifies warm leads automatically'],
    cta: { label: 'Try Premium', href: '/register?plan=premium' },
    glowColor: 'bg-violet-500/5', iconBg: 'bg-violet-50 dark:bg-violet-900/20',
    iconColor: 'text-violet-500', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    cardTitle: 'Fingerprint profile', cardSub: 'visitor_4a2f91',
    widget: FingerprintWidget,
  },
  {
    plan: 'Pro only', planBadge: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    title: 'Bot & VPN detection',
    desc: 'Automatically classify every download as a real human, a VPN user, a datacenter IP, or a bot. Clean your analytics from noise in one click.',
    points: ['Datacenter IP detection', 'VPN & proxy provider database', 'Tor exit node flagging', 'curl / headless browser detection'],
    cta: { label: 'Go Pro', href: '/register?plan=pro' },
    glowColor: 'bg-red-500/5', iconBg: 'bg-red-50 dark:bg-red-900/20',
    iconColor: 'text-red-500', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
    cardTitle: 'Traffic classification', cardSub: 'last 24 hours',
    widget: BotWidget,
  },
  {
    plan: 'Pro only', planBadge: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    title: 'Geographic heatmaps',
    desc: 'Visualize where in the world your files are accessed. See clusters, spot unexpected regions, and understand your audience at a glance.',
    points: ['Country & city granularity', 'Updates live as downloads happen', 'Exportable as CSV or PNG', 'Filter by date range or file'],
    cta: { label: 'Go Pro', href: '/register?plan=pro' },
    glowColor: 'bg-blue-500/5', iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-500', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
    cardTitle: 'Download heatmap', cardSub: 'global · last 7 days',
    widget: HeatmapWidget,
  },
]

const useCases = [
  {
    role: 'Sales & Marketing',
    title: 'Know when a prospect opens your deck',
    desc: 'Stop the "Did you get it?" email. Get notified the second someone downloads your proposal, and see if they came back for another look.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    iconBg: 'bg-brand-50 dark:bg-brand-900/20', iconColor: 'text-brand-500',
  },
  {
    role: 'Freelancers & Designers',
    title: 'Know when clients view deliverables',
    desc: 'Track every time a client opens your design files. Follow up at exactly the right moment — not too early, not after they\'ve moved on.',
    icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
    iconBg: 'bg-violet-50 dark:bg-violet-900/20', iconColor: 'text-violet-500',
  },
  {
    role: 'Security & Compliance',
    title: 'Audit who accessed sensitive files',
    desc: 'Full download audit log with IP, location, device, and timestamp. Know exactly who accessed what and when — forever.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/20', iconColor: 'text-emerald-500',
  },
  {
    role: 'Indie Developers',
    title: 'See who\'s really interested in your product',
    desc: 'That person who downloaded your demo 5 times from 3 different devices? That\'s a warm lead. Filesterr identifies them for you.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    iconBg: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-500',
  },
  {
    role: 'Content Creators',
    title: 'Understand your real audience',
    desc: 'Strip bot downloads from your stats. Get accurate geographic reach. Know which pieces of content your real fans actually consume.',
    icon: 'M15 10l4.553-2.069A1 1 0 0121 8.82V15a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    iconBg: 'bg-red-50 dark:bg-red-900/20', iconColor: 'text-red-500',
  },
  {
    role: 'Agencies & Teams',
    title: 'Client-ready analytics reports',
    desc: 'Export download data as CSV. Show clients exactly how many real humans engaged with their assets — bots already filtered out.',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    iconBg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-500',
  },
]

const comparisonPlans = [
  { name: 'Anonymous', price: null, featured: false },
  { name: 'Free',      price: null, featured: false },
  { name: 'Premium',   price: '3.89', featured: false },
  { name: 'Pro',       price: '8.00', featured: true },
]

const comparisonRows = [
  { label: 'Download count',           values: [true,  true,  true,  true]  },
  { label: 'Real-time feed',           values: [false, true,  true,  true]  },
  { label: 'IP & location data',       values: [false, true,  true,  true]  },
  { label: 'Device & browser info',    values: [false, true,  true,  true]  },
  { label: 'Visitor fingerprinting',   values: [false, false, true,  true]  },
  { label: 'Bot detection',            values: [false, false, false, true]  },
  { label: 'VPN / proxy detection',    values: [false, false, false, true]  },
  { label: 'Geographic heatmaps',      values: [false, false, false, true]  },
  { label: 'API access',               values: [false, false, false, true]  },
  { label: 'Data retention',           values: ['7d', '30d', '90d', '365d'] },
]

const analyticsQuotes = [
  {
    name: 'Yuki N.', role: 'Security Researcher', color: '#8b5cf6',
    body: 'The bot detection and proxy flagging are solid. It caught 90%+ of common VPNs correctly. Finally real data.',
  },
  {
    name: 'Marcus T.', role: 'Indie Developer', color: '#22a366',
    body: 'I can see when the same person downloads my demo multiple times — a warm lead I never would have known about.',
  },
  {
    name: 'Sarah K.', role: 'Marketing Director', color: '#6366f1',
    body: 'Filesterr\'s analytics finally let us see if people open the files we send. Absolute game changer for our team.',
  },
]

const faqs = [
  { q: 'Does the free plan include analytics?', a: 'Yes. Free accounts get a real-time download feed with IP, location, and device data. Visitor fingerprinting, bot detection, and heatmaps require Premium or Pro.' },
  { q: 'Can I detect if the same person downloads multiple times?', a: 'Yes — this is Visitor Fingerprinting, available on Premium and Pro plans. We identify returning visitors across sessions, even if they use incognito mode or clear cookies.' },
  { q: 'How accurate is the VPN and bot detection?', a: 'Our database covers 99%+ of known datacenter IP ranges, major VPN providers, and Tor exit nodes. We update it daily. Our users report 90%+ accuracy in real-world testing.' },
  { q: 'Does analytics tracking work for anonymous uploads?', a: 'Anonymous uploads (no account) only show a download count. For full analytics including real-time feed and visitor data, you need a free account or above.' },
  { q: 'Can I export my analytics data?', a: 'Pro plan users can export all download data as CSV. API access is also included on Pro for programmatic data retrieval.' },
  { q: 'Is analytics GDPR compliant?', a: 'Yes. Filesterr is GDPR compliant. We collect the minimum data necessary to provide analytics, and files are encrypted at rest with AES-256. We never sell your data.' },
]
</script>