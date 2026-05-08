<template>
  <div>

    <!-- ================================================================
         HERO — Pattern interrupt + benefit-first headline
         Neuro: Curiosity gap, specificity anchoring, social proof nudge
    ================================================================ -->
    <section class="relative min-h-[72vh] flex items-center pt-32 pb-20 px-6 overflow-hidden">
      <!-- BG -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[560px] bg-brand-500/8 dark:bg-brand-500/12 blur-[120px] rounded-full" />
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 blur-3xl rounded-full" />
        <div class="absolute inset-0 bg-grid opacity-60" />
      </div>

      <div class="relative max-w-5xl mx-auto text-center">
        <!-- Eyebrow — social proof + recency -->
        <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-8 animate-fade-in">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
          </span>
          Used by 500,000+ creators, developers & teams
        </div>

        <!-- H1 — keyword-rich, benefit-first, curiosity gap -->
        <h1 class="font-display text-5xl sm:text-6xl xl:text-[68px] font-extrabold leading-[1.04] tracking-tight mb-7 animate-slide-up">
          File Sharing That<br/>
          <span class="text-gradient">Actually Works for You</span>
        </h1>

        <!-- Sub — specificity, loss aversion nudge -->
        <p class="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style="animation-delay:.1s">
          Most file sharing tools just store files. Filesterr gives you
          <strong class="text-zinc-900 dark:text-white">real-time analytics, visitor intelligence, bot detection</strong>
          and ironclad security — all from a single shareable link.
        </p>

        <!-- CTAs — primary/secondary split -->
        <div class="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up" style="animation-delay:.2s">
          <a href="/register" class="btn-primary-lg group">
            Start Free — No Card Needed
            <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <a href="#feature-grid" class="btn-ghost-lg">See All Features</a>
        </div>

        <!-- Micro-proof strip — anchoring + specificity -->
        <div class="flex flex-wrap items-center justify-center gap-6 animate-fade-in" style="animation-delay:.35s">
          <div v-for="stat in heroStats" :key="stat.label" class="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <svg class="w-4 h-4 text-brand-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span><strong class="text-zinc-900 dark:text-white">{{ stat.val }}</strong> {{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>


    <!-- ================================================================
         FEATURE GRID — id="feature-grid" for anchor scroll
         Neuro: Category chunking, benefit titles (not feature names),
                hot badges create scarcity/social proof, micro-stats = specificity
    ================================================================ -->
    <section id="feature-grid" class="py-24 px-6 section-alt">
      <div class="max-w-7xl mx-auto">

        <div class="text-center mb-16">
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Everything You Need</p>
          <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
            Features Built Around<br/>
            <span class="text-gradient">What Matters Most</span>
          </h2>
          <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            No bloat. No mystery settings. Every feature ships with a clear reason to exist — and a result you can measure.
          </p>
        </div>

        <!-- 3-col grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(f, i) in featureCards"
            :key="i"
            class="group card-hover p-7 relative overflow-hidden"
            :class="{ 'ring-2 ring-brand-500/30 ring-offset-0': f.featured }"
          >
            <!-- Glow on hover -->
            <div class="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              :class="f.glow" />

            <!-- Hot badge — social proof / urgency -->
            <div v-if="f.badge"
              class="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
              :class="f.badgeCls">
              {{ f.badge }}
            </div>

            <div class="relative">
              <!-- Icon -->
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                :class="f.iconBg">
                <svg class="w-6 h-6" :class="f.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" :d="f.icon"/>
                </svg>
              </div>

              <!-- Title — benefit-first, search-friendly -->
              <h3 class="font-display font-bold text-lg mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
                {{ f.title }}
              </h3>

              <!-- Desc — specific, no fluff -->
              <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                {{ f.desc }}
              </p>

              <!-- Micro-stat — specificity drives conversion -->
              <div v-if="f.stat"
                class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                <svg class="w-3 h-3 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                {{ f.stat }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ================================================================
         DEEP DIVE — alternating bento rows, 2 features
         Neuro: Storytelling + pain → solution framing, visual anchoring
    ================================================================ -->
    <section class="py-24 px-6">
      <div class="max-w-7xl mx-auto space-y-24">

        <!-- Row 1: Analytics — pain/solution -->
        <div class="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Real-Time Intelligence</p>
            <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
              Stop Guessing<br/>
              <span class="text-gradient">Who Downloads Your Files</span>
            </h2>
            <p class="text-lg text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
              Every time someone opens your link, Filesterr captures their location, device, browser fingerprint, and whether they're a real person — or a bot. You get the full picture before they even finish downloading.
            </p>
            <!-- Benefit bullets — loss aversion framing -->
            <ul class="space-y-4 mb-8">
              <li v-for="b in analyticsBenefits" :key="b.text" class="flex items-start gap-3">
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
              <!-- Blur + upsell -->
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

        <!-- Row 2: Security — fear/relief framing -->
        <div class="grid lg:grid-cols-2 gap-14 items-center">
          <!-- Visual first on this row -->
          <div class="order-2 lg:order-1 relative">
            <div class="absolute -inset-4 bg-violet-500/5 blur-3xl rounded-3xl" />
            <div class="relative card shadow-xl p-8 space-y-5">
              <!-- Security feature list with status indicators -->
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
              Your Files, Your Rules —<br/>
              <span class="text-gradient">Zero Compromises</span>
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


    <!-- ================================================================
         COMPARISON TABLE — Anchoring + contrast effect
         Neuro: Decoy effect via Anonymous plan, "vs competitors" framing
    ================================================================ -->
    <section class="py-24 px-6 section-alt">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-14">
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Compare Plans</p>
          <h2 class="font-display text-4xl font-extrabold mb-4">
            See Exactly What You Get
          </h2>
          <p class="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            No hidden limits. No feature paywalls buried in fine print. Every tier is built to be a clear step up.
          </p>
        </div>

        <div class="card overflow-hidden shadow-xl">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-zinc-100 dark:border-zinc-800">
                  <th class="text-left p-5 font-semibold text-zinc-500 dark:text-zinc-400 w-48">Feature</th>
                  <th v-for="col in tableColumns" :key="col.label"
                    class="p-5 text-center font-bold"
                    :class="col.featured ? 'bg-brand-500/5 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400' : 'text-zinc-700 dark:text-zinc-200'">
                    <div>{{ col.label }}</div>
                    <div class="text-xs font-normal mt-1" :class="col.featured ? 'text-brand-500' : 'text-zinc-400'">
                      {{ col.price }}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-50 dark:divide-zinc-800/70">
                <tr v-for="row in tableRows" :key="row.label"
                  class="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td class="p-5 text-zinc-600 dark:text-zinc-400 font-medium">{{ row.label }}</td>
                  <td v-for="(val, ci) in row.values" :key="ci"
                    class="p-5 text-center"
                    :class="tableColumns[ci].featured ? 'bg-brand-500/5 dark:bg-brand-500/10' : ''">
                    <!-- Boolean -->
                    <template v-if="typeof val === 'boolean'">
                      <svg v-if="val" class="w-5 h-5 text-brand-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                      </svg>
                      <svg v-else class="w-5 h-5 text-zinc-300 dark:text-zinc-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </template>
                    <!-- Text -->
                    <template v-else>
                      <span class="font-medium" :class="tableColumns[ci].featured ? 'text-brand-700 dark:text-brand-300' : 'text-zinc-700 dark:text-zinc-300'">
                        {{ val }}
                      </span>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="text-center mt-8">
          <a href="/pricing" class="btn-primary inline-flex items-center gap-2">
            View Full Pricing
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>


    <!-- ================================================================
         HOW IT WORKS — Numbered steps
         Neuro: Effort illusion (3 steps = feels easy), momentum building
    ================================================================ -->
    <section class="py-24 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Up in Under 60 Seconds</p>
          <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
            From Upload to Intelligence<br/>
            <span class="text-gradient">in 3 Steps</span>
          </h2>
          <p class="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto text-lg">
            No installs. No config files. No engineering team required.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-10 relative">
          <!-- Connector line -->
          <div class="hidden md:block absolute top-8 left-[calc(16.6%+40px)] right-[calc(16.6%+40px)] h-px"
            style="background: linear-gradient(90deg, #22a366, #45be81, #22a366)" />

          <div v-for="(step, i) in howItWorks" :key="i" class="flex flex-col items-center text-center gap-4">
            <div class="relative w-16 h-16 rounded-full bg-brand-500 text-white font-display font-bold text-xl flex items-center justify-center shadow-glow z-10">
              {{ i + 1 }}
              <div class="absolute inset-0 rounded-full bg-brand-400/20 animate-ping" style="animation-duration:2.5s" />
            </div>
            <h3 class="font-display font-bold text-xl">{{ step.title }}</h3>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-[220px] leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>

        <!-- CTA under steps — momentum capture -->
        <div class="text-center mt-14">
          <a href="/register" class="btn-primary-lg inline-flex items-center gap-2 group">
            Try It Free Right Now
            <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <p class="text-xs text-zinc-400 mt-3">No credit card · 10 GB free forever · Cancel anytime</p>
        </div>
      </div>
    </section>


    <!-- ================================================================
         USE-CASE TABS — Content marketing SEO + segmentation
         Neuro: Identity matching ("this is for someone like me")
    ================================================================ -->
    <section class="py-24 px-6 section-alt">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Built for Every Workflow</p>
          <h2 class="font-display text-4xl font-extrabold mb-4">
            However You Share Files,<br/>
            <span class="text-gradient">Filesterr Has You Covered</span>
          </h2>
        </div>

        <!-- Tab nav -->
        <div class="flex flex-wrap justify-center gap-2 mb-10">
          <button
            v-for="(tab, i) in useCaseTabs"
            :key="i"
            @click="activeTab = i"
            class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            :class="activeTab === i
              ? 'bg-brand-500 text-white shadow-glow'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab content -->
        <div class="card p-10">
          <div class="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" :class="useCaseTabs[activeTab].iconBg">
                <svg class="w-6 h-6" :class="useCaseTabs[activeTab].iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" :d="useCaseTabs[activeTab].icon"/>
                </svg>
              </div>
              <h3 class="font-display text-2xl font-bold mb-3">{{ useCaseTabs[activeTab].title }}</h3>
              <p class="text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">{{ useCaseTabs[activeTab].desc }}</p>
              <ul class="space-y-2.5 mb-7">
                <li v-for="b in useCaseTabs[activeTab].bullets" :key="b" class="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ b }}
                </li>
              </ul>
              <a :href="useCaseTabs[activeTab].href" class="btn-primary inline-flex items-center gap-2 text-sm">
                {{ useCaseTabs[activeTab].cta }}
              </a>
            </div>

            <!-- Stat card -->
            <div class="grid grid-cols-2 gap-4">
              <div v-for="stat in useCaseTabs[activeTab].stats" :key="stat.label"
                class="rounded-2xl p-6 text-center"
                :class="stat.highlight ? 'bg-brand-500 text-white' : 'bg-zinc-50 dark:bg-zinc-800'">
                <div class="font-display text-3xl font-black mb-1" :class="stat.highlight ? 'text-white' : 'text-zinc-900 dark:text-white'">
                  {{ stat.val }}
                </div>
                <div class="text-xs font-medium" :class="stat.highlight ? 'text-brand-100' : 'text-zinc-500 dark:text-zinc-400'">
                  {{ stat.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ================================================================
         FAQ — SEO content, keyword targeting
         Neuro: Objection removal, authority framing
    ================================================================ -->
    <section class="py-24 px-6">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-14">
          <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Common Questions</p>
          <h2 class="font-display text-4xl font-extrabold mb-4">
            Everything You Wanted to Ask
          </h2>
          <p class="text-zinc-500 dark:text-zinc-400">
            If it's not here, our team responds in under 2 hours on average.
          </p>
        </div>

        <div class="space-y-3">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="card overflow-hidden"
          >
            <button
              @click="openFaq = openFaq === i ? null : i"
              class="w-full flex items-center justify-between p-6 text-left gap-4"
            >
              <span class="font-semibold text-zinc-900 dark:text-white text-sm sm:text-base">{{ faq.q }}</span>
              <div class="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 transition-transform duration-200"
                :class="openFaq === i ? 'rotate-45' : ''">
                <svg class="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
                </svg>
              </div>
            </button>
            <div v-if="openFaq === i" class="px-6 pb-6">
              <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ================================================================
         FINAL CTA — Urgency + loss aversion + zero risk
         Neuro: "Free" removes friction, "no card" removes risk,
                "500k+" social proof flips hesitation
    ================================================================ -->
    <section class="py-24 px-6 section-alt">
      <div class="max-w-5xl mx-auto text-center">
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-emerald-500 p-14 sm:p-20">
          <div class="absolute inset-0 opacity-[0.06]"
            style="background-image:url('data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E')" />
          <div class="relative">
            <p class="text-white/70 text-xs font-bold uppercase tracking-widest mb-5">Join 500,000+ Users</p>
            <h2 class="font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white mb-5 tracking-tight">
              Your Files Deserve Better<br/>Than a Generic Link
            </h2>
            <p class="text-white/75 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Start free. Upgrade when you need it. Downgrade anytime you want. The risk is zero — the upside isn't.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <a href="/register"
                class="px-8 py-4 rounded-xl bg-white text-brand-700 font-bold text-base hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Start Free — No Card Needed
              </a>
              <a href="/pricing"
                class="px-8 py-4 rounded-xl bg-white/15 border border-white/30 text-white font-bold text-base hover:bg-white/25 transition-all">
                See Plans & Pricing
              </a>
            </div>
            <p class="text-white/50 text-xs mt-8">10 GB free forever · 256-bit encryption · GDPR compliant</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeTab = ref(0)
const openFaq   = ref(null)

/* ── SSR-safe SEO ── */
const isSsr = import.meta.env.SSR
if (!isSsr) {
  document.title = 'Filesterr Features — File Sharing, Analytics & Visitor Intelligence'

  const setMeta = (attr, key, content) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`)
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
    el.setAttribute('content', content)
  }
  const setLink = (rel, href) => {
    let el = document.querySelector(`link[rel="${rel}"]`)
    if (!el) { el = document.createElement('link'); el.rel = rel; document.head.appendChild(el) }
    el.href = href
  }

  setMeta('name', 'description',
    'Explore every Filesterr feature: real-time file analytics, visitor fingerprinting, bot & VPN detection, password protection, expiring links, and more. Free file sharing, upgraded.')
  setMeta('name', 'keywords',
    'file sharing features, file download analytics, visitor tracking, bot detection, VPN detection, secure file sharing, password protected file sharing, expiring download links')
  setMeta('property', 'og:title',       'Filesterr Features — File Sharing, Analytics & Visitor Intelligence')
  setMeta('property', 'og:description', 'Real-time download analytics, visitor fingerprinting, bot detection, and enterprise-grade security — all in one file sharing platform.')
  setMeta('property', 'og:url',         'https://filesterr.com/features')
  setMeta('property', 'og:type',        'website')
  setMeta('property', 'og:image',       'https://filesterr.com/og/features.png')
  setMeta('name', 'twitter:card',        'summary_large_image')
  setMeta('name', 'twitter:title',       'Filesterr Features — The Smartest File Sharing Platform')
  setMeta('name', 'twitter:description', 'Analytics, visitor intelligence, bot detection, secure sharing — see every feature Filesterr has to offer.')
  setLink('canonical', 'https://filesterr.com/features')

  /* JSON-LD */
  const ld = document.createElement('script')
  ld.type = 'application/ld+json'
  ld.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Filesterr Features',
    description: 'All features of the Filesterr file sharing and analytics platform.',
    url: 'https://filesterr.com/features',
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Filesterr',
      applicationCategory: 'BusinessApplication',
      featureList: [
        'Real-time file download analytics',
        'Visitor fingerprinting across sessions',
        'Bot and datacenter IP detection',
        'VPN and proxy detection',
        'Password-protected file sharing',
        'Expiring download links',
        'One-time download links',
        'Geographic download heatmaps',
        '256-bit AES encryption',
        'Direct download links',
        'API access',
        'Bulk ZIP downloads',
      ],
    },
  })
  document.head.appendChild(ld)
}

/* ── Data ── */

const heroStats = [
  { val: '99.99%',  label: 'uptime SLA' },
  { val: '< 50ms',  label: 'global latency' },
  { val: '256-bit', label: 'AES encryption' },
  { val: '50+',     label: 'CDN locations' },
]

const featureCards = [
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    iconBg: 'bg-brand-50 dark:bg-brand-900/20', iconColor: 'text-brand-500',
    glow: 'bg-brand-400/10',
    title: 'Real-Time Download Analytics',
    desc: 'See every download the moment it happens — country, city, device, browser, and time. Know your audience, not just your numbers.',
    stat: 'Live feed, zero delay',
    badge: '★ Most Used', badgeCls: 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-brand-700',
    featured: true,
  },
  {
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    iconBg: 'bg-violet-50 dark:bg-violet-900/20', iconColor: 'text-violet-500',
    glow: 'bg-violet-400/10',
    title: 'Visitor Fingerprinting Across Sessions',
    desc: 'Identify returning visitors even if they use a different browser or clear their cookies. Know who keeps coming back.',
    stat: 'Works across incognito & VPNs',
    badge: null, badgeCls: '', featured: false,
  },
  {
    icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
    iconBg: 'bg-red-50 dark:bg-red-900/20', iconColor: 'text-red-500',
    glow: 'bg-red-400/10',
    title: 'Bot & Datacenter IP Detection',
    desc: 'Automatically flag crawlers, scrapers, and datacenter traffic so your download stats reflect real human interest — not noise.',
    stat: '99.2% bot detection accuracy',
    badge: 'Pro', badgeCls: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
    featured: false,
  },
  {
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
    iconBg: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-500',
    glow: 'bg-amber-400/10',
    title: 'VPN & Proxy Detection',
    desc: 'Know when someone is masking their real location. Useful for content restrictions, fraud prevention, and honest geo-analytics.',
    stat: 'Covers 2,000+ known VPN ranges',
    badge: null, badgeCls: '', featured: false,
  },
  {
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    iconBg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-500',
    glow: 'bg-blue-400/10',
    title: 'Password-Protected File Sharing',
    desc: 'Add a password to any file in one click. Only the right people get in. No account required on their end.',
    stat: 'Set in under 5 seconds',
    badge: null, badgeCls: '', featured: false,
  },
  {
    icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    iconBg: 'bg-zinc-100 dark:bg-zinc-800', iconColor: 'text-zinc-500',
    glow: 'bg-zinc-400/10',
    title: 'Auto-Expiring & One-Time Links',
    desc: 'Set a download link to expire after N days, N downloads, or self-destruct after a single use. Total control, zero maintenance.',
    stat: 'Custom expiry per file',
    badge: null, badgeCls: '', featured: false,
  },
  {
    icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/20', iconColor: 'text-emerald-500',
    glow: 'bg-emerald-400/10',
    title: 'Direct, Clean Download Links',
    desc: 'Share a URL that goes straight to the file — no redirect pages, no "wait 5 seconds", no ads between your user and their download.',
    stat: 'Available on Premium & Pro',
    badge: null, badgeCls: '', featured: false,
  },
  {
    icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/20', iconColor: 'text-indigo-500',
    glow: 'bg-indigo-400/10',
    title: 'Bulk Upload & ZIP Batch Downloads',
    desc: 'Upload entire folders, bundle multiple files into one shareable ZIP, and let your recipients download everything in one click.',
    stat: 'Up to 50 GB per file on Pro',
    badge: null, badgeCls: '', featured: false,
  },
  {
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    iconBg: 'bg-pink-50 dark:bg-pink-900/20', iconColor: 'text-pink-500',
    glow: 'bg-pink-400/10',
    title: 'Developer API Access',
    desc: 'Integrate Filesterr directly into your product. Upload files, generate links, and pull analytics data programmatically — full REST API with docs.',
    stat: 'Full REST API · Webhook support',
    badge: 'Pro', badgeCls: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
    featured: false,
  },
]

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
  { label: 'AES-256 Encryption at Rest',   desc: 'All files stored fully encrypted', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-500' },
  { label: 'Password Protection',           desc: 'Per-file password, set in one click', icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z', bg: 'bg-violet-50 dark:bg-violet-900/20', color: 'text-violet-500' },
  { label: 'Expiring Download Links',       desc: 'Auto-delete after date or # of uses', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', bg: 'bg-amber-50 dark:bg-amber-900/20', color: 'text-amber-500' },
  { label: 'One-Time Download Links',       desc: 'Link self-destructs after first open', icon: 'M13 10V3L4 14h7v7l9-11h-7z', bg: 'bg-red-50 dark:bg-red-900/20', color: 'text-red-500' },
  { label: 'GDPR & CCPA Compliant',         desc: 'No data sold, full user control', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', bg: 'bg-emerald-50 dark:bg-emerald-900/20', color: 'text-emerald-500' },
]

const securityBenefits = [
  'Password-protect any file in under 5 seconds',
  'Set download links to expire after a date or number of uses',
  'One-time links that vanish after the first click',
  '256-bit AES encryption at rest and in transit',
  'GDPR & CCPA compliant — your data stays yours',
]

const tableColumns = [
  { label: 'Free',    price: 'Forever free', featured: false },
  { label: 'Premium', price: '$3.89/mo',     featured: true  },
  { label: 'Pro',     price: '$8.00/mo',     featured: false },
]

const tableRows = [
  { label: 'Storage',               values: ['10 GB',  '150 GB',  '890 GB'] },
  { label: 'Max file size',         values: ['5 GB',   '50 GB',   '50 GB'] },
  { label: 'Download analytics',    values: [true,     true,      true] },
  { label: 'Direct download links', values: [false,    true,      true] },
  { label: 'Password protection',   values: [false,    true,      true] },
  { label: 'Expiring links',        values: [false,    true,      true] },
  { label: 'One-time links',        values: [false,    true,      true] },
  { label: 'Visitor fingerprint',   values: [false,    true,      true] },
  { label: 'Bot detection',         values: [false,    false,     true] },
  { label: 'VPN/proxy detection',   values: [false,    false,     true] },
  { label: 'API access',            values: [false,    false,     true] },
  { label: 'ZIP batch download',    values: [false,    true,      true] },
]

const howItWorks = [
  {
    title: 'Upload Your File',
    desc: 'Drag and drop anything — up to 50 GB — and your file is live in seconds.',
  },
  {
    title: 'Share the Link',
    desc: 'Copy your unique URL, add a password if needed, and send it anywhere.',
  },
  {
    title: 'Watch the Intelligence Roll In',
    desc: 'Real-time analytics show you exactly who clicked, when, from where — and if they\'re real.',
  },
]

const useCaseTabs = [
  {
    label: 'Freelancers',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    iconBg: 'bg-brand-50 dark:bg-brand-900/20', iconColor: 'text-brand-500',
    title: 'Deliver Client Work That Feels Premium',
    desc: 'Stop sending WeTransfer links that expire in a week. Give clients a clean, branded experience with analytics that prove you delivered.',
    bullets: [
      'Know exactly when a client opens your files',
      'Password-protect deliverables by project',
      'Set auto-expiry so stale links don\'t float around',
    ],
    stats: [
      { val: '10 GB', label: 'Free storage', highlight: false },
      { val: '∞',     label: 'Link sharing', highlight: true  },
      { val: '100%',  label: 'Uptime SLA',   highlight: false },
      { val: '$0',    label: 'To start',     highlight: false },
    ],
    cta: 'Start as a Freelancer →',
    href: '/register',
  },
  {
    label: 'Developers',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/20', iconColor: 'text-indigo-500',
    title: 'Integrate File Sharing Into Your App via API',
    desc: 'Full REST API, webhook events, and a developer-first design. Add file sharing and analytics to any product in hours, not weeks.',
    bullets: [
      'Upload, manage, and share files programmatically',
      'Receive webhooks on download events',
      'Pull analytics data into your own dashboards',
    ],
    stats: [
      { val: 'REST', label: 'API architecture', highlight: false },
      { val: '< 50ms', label: 'Avg response time', highlight: true  },
      { val: '50+',    label: 'CDN locations',     highlight: false },
      { val: '99.99%', label: 'SLA uptime',        highlight: false },
    ],
    cta: 'Read the API Docs →',
    href: '/docs',
  },
  {
    label: 'Content Creators',
    icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z',
    iconBg: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-500',
    title: 'Know Which Content Actually Gets Watched',
    desc: 'Share Lightroom presets, video templates, or sample packs and see in real time who downloads them, where they\'re from, and whether they come back.',
    bullets: [
      'See download spikes correlate with your posts',
      'Identify your top geographic markets',
      'Track returning fans across sessions',
    ],
    stats: [
      { val: '12M+',  label: 'Files uploaded',    highlight: false },
      { val: '4.8★',  label: 'Average rating',    highlight: true  },
      { val: '500K+', label: 'Active users',       highlight: false },
      { val: '5 TB',  label: 'Daily transfers',    highlight: false },
    ],
    cta: 'Start Sharing Content →',
    href: '/register',
  },
  {
    label: 'Teams',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    iconBg: 'bg-violet-50 dark:bg-violet-900/20', iconColor: 'text-violet-500',
    title: 'Secure File Distribution Across Your Entire Team',
    desc: 'Send proposals, contracts, and reports to clients with confidence. Know who opened what, when — and lock down access the moment a deal closes.',
    bullets: [
      'Distribute files with role-based access logic',
      'Audit every download with timestamps and IPs',
      'Revoke links instantly if plans change',
    ],
    stats: [
      { val: '890 GB', label: 'Pro storage',  highlight: false },
      { val: '256-bit', label: 'Encryption',  highlight: true  },
      { val: 'GDPR',    label: 'Compliant',   highlight: false },
      { val: '$8/mo',   label: 'Pro plan',    highlight: false },
    ],
    cta: 'Try Teams →',
    href: '/register?plan=pro',
  },
]

const faqs = [
  {
    q: 'How is Filesterr different from Google Drive or Dropbox?',
    a: 'Google Drive and Dropbox are storage tools built for collaboration. Filesterr is built for sharing — specifically, for understanding what happens after you share. You get real-time analytics, visitor fingerprinting, bot detection, and security controls that Google Drive simply doesn\'t offer.',
  },
  {
    q: 'Does visitor fingerprinting work even if someone uses a VPN or incognito mode?',
    a: 'Yes. Filesterr\'s fingerprinting uses a combination of browser signals, canvas fingerprint, timezone, and other non-IP signals to identify the same visitor across sessions — including incognito. VPN usage is flagged separately so you can see both the masked and probable real origin.',
  },
  {
    q: 'Can I use Filesterr for commercial file delivery?',
    a: 'Absolutely. Thousands of freelancers and small businesses use Filesterr to deliver client work, sell digital products, and distribute internal assets. The Pro plan includes API access for fully automated delivery pipelines.',
  },
  {
    q: 'What happens when a file expires?',
    a: 'When a download link expires (by date or by download count), the link returns a 410 Gone response. The file itself is not automatically deleted from your storage — you remain in control of the original. You can always generate a new link.',
  },
  {
    q: 'Is the free plan really free forever?',
    a: 'Yes. 10 GB of storage and unlimited file sharing is free indefinitely. No trial period, no credit card, no catch. You upgrade only when you need features like visitor intelligence, direct links, or extra storage.',
  },
  {
    q: 'How accurate is the bot detection?',
    a: 'Filesterr\'s bot detection runs against a continuously updated database of known datacenter IP ranges, user-agent patterns, and behavioral signals. In internal testing, it correctly identifies over 99% of non-human download events. False positives (real humans flagged as bots) are under 0.1%.',
  },
  {
    q: 'Can I integrate Filesterr with my existing tools?',
    a: 'Pro users get full API access with REST endpoints for uploading, managing, and sharing files, plus webhook events for download notifications. You can pipe data into Zapier, Slack, your CRM, or any custom dashboard.',
  },
]
</script>