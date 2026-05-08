<template>
  <section class="py-24 px-6">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Up in Under 60 Seconds</p>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">
          From Upload to Intelligence<br/><span class="text-gradient">in 3 Steps</span>
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto text-lg">
          No installs. No config files. No engineering team required.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-10 relative">
        <div class="hidden md:block absolute top-8 left-[calc(16.6%+40px)] right-[calc(16.6%+40px)] h-px"
          style="background: linear-gradient(90deg, #22a366, #45be81, #22a366)" />
        <div v-for="(step, i) in steps" :key="i" class="flex flex-col items-center text-center gap-4">
          <div class="relative w-16 h-16 rounded-full bg-brand-500 text-white font-display font-bold text-xl flex items-center justify-center shadow-glow z-10">
            {{ i + 1 }}
            <div class="absolute inset-0 rounded-full bg-brand-400/20 animate-ping" style="animation-duration:2.5s" />
          </div>
          <h3 class="font-display font-bold text-xl">{{ step.title }}</h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-[220px] leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>

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
</template>

<script setup>
const steps = [
  { title: 'Upload Your File',                desc: 'Drag and drop anything — up to 50 GB — and your file is live in seconds.' },
  { title: 'Share the Link',                  desc: 'Copy your unique URL, add a password if needed, and send it anywhere.' },
  { title: 'Watch the Intelligence Roll In',  desc: "Real-time analytics show you exactly who clicked, when, from where — and if they're real." },
]
</script>