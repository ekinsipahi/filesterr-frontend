<template>
  <section class="relative min-h-[72vh] flex items-center pt-32 pb-20 px-6 overflow-hidden">

    <!-- ░░ MATRIX CANVAS — sağdan sola akan arka plan ░░ -->
    <canvas
      ref="matrixCanvas"
      class="absolute inset-0 w-full h-full pointer-events-none"
      style="opacity: 0.55; mix-blend-mode: normal;"
    />

    <!-- Soft vignette — kenarlarda söndür -->
    <div class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(var(--bg-base-rgb,10,10,10), 0.82) 100%);" />

    <!-- Sol taraf fade — içerik okunsun diye -->
    <div class="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
      style="background: linear-gradient(to right, var(--hero-fade, rgba(255,255,255,0.92)) 0%, transparent 100%);" />

    <!-- Sağ üst blur glow -->
    <div class="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
      style="background: radial-gradient(ellipse at top right, rgba(34,163,102,0.06) 0%, transparent 70%);" />

    <div class="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

    <div class="relative max-w-7xl mx-auto w-full">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Copy -->
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-8">
            <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            {{ $t('analyticsPage.heroBadge') }}
          </div>
          <h1 class="font-display text-5xl sm:text-6xl xl:text-[66px] font-extrabold leading-[1.04] tracking-tight mb-6">
            {{ $t('analyticsPage.heroH1a') }}<br/>Start <span class="text-gradient">{{ $t('analyticsPage.heroH1b') }}</span>
          </h1>
          <p class="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg mb-8">
            Every file you share becomes a data source. See
            <strong class="text-zinc-900 dark:text-white">{{ $t('analyticsPage.heroStrongText') }}</strong>,
            from where, with what device — and whether they were a bot, a VPN, or a real person.
          </p>
          <div class="flex flex-wrap gap-3 mb-10">
            <span v-for="pill in pills" :key="pill"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
              <svg class="w-3 h-3 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ pill }}
            </span>
          </div>
          <div class="flex flex-wrap gap-4">
            <a href="/register?plan=pro" class="btn-primary-lg group">
              {{ $t('analyticsPage.heroCtaBtn') }}
              <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a href="#features" class="btn-ghost-lg">{{ $t('analyticsPage.heroSeeBtn') }}</a>
          </div>
          <p class="text-xs text-zinc-400 mt-4">{{ $t('analyticsPage.heroMicro') }}</p>
        </div>

        <!-- Live feed mock -->
        <div class="relative">
          <div class="absolute -inset-6 bg-brand-500/8 blur-3xl rounded-3xl" />
          <div class="relative card shadow-2xl overflow-hidden">
            <div class="flex items-center gap-2 px-5 py-3.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-red-400/80" />
                <div class="w-3 h-3 rounded-full bg-amber-400/80" />
                <div class="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <span class="ml-2 font-mono text-xs text-zinc-400">filesterr.com / analytics</span>
              <span class="ml-auto flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{{ $t('analyticsPage.liveLabel') }}
              </span>
            </div>
            <div class="grid grid-cols-3 divide-x divide-zinc-100 dark:divide-zinc-800 border-b border-zinc-100 dark:border-zinc-800">
              <div v-for="stat in stats" :key="stat.label" class="p-4 text-center">
                <div class="font-display text-2xl font-bold" :class="stat.color">{{ stat.value }}</div>
                <div class="text-xs text-zinc-400 mt-0.5">{{ stat.label }}</div>
              </div>
            </div>
            <div class="divide-y divide-zinc-50 dark:divide-zinc-800/40">
              <div v-for="(v, i) in feedRows" :key="i"
                class="flex items-center gap-4 px-5 py-3.5 transition-colors"
                :class="i === 0 ? 'bg-brand-50/60 dark:bg-brand-500/5' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/30'">
                <span class="text-lg shrink-0">{{ v.flag }}</span>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-sm font-medium truncate">{{ v.city }}</span>
                    <span v-if="v.badge" class="text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0" :class="v.badgeColor">{{ v.badge }}</span>
                    <span v-if="i === 0" class="text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 shrink-0">{{ $t('analyticsPage.newLabel') }}</span>
                  </div>
                  <div class="text-xs text-zinc-400 font-mono">{{ v.ip }}</div>
                </div>
                <div class="text-right shrink-0">
                  <div class="text-xs text-zinc-500">{{ v.time }}</div>
                  <div class="text-xs text-zinc-400">{{ v.device }}</div>
                </div>
              </div>
            </div>
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
                <a href="/register?plan=pro" class="btn-primary text-xs">{{ $t('analyticsPage.unlockDataBtn') }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const matrixCanvas = ref(null)

const pills = computed(() => [
  t('analyticsPage.pill0'), t('analyticsPage.pill1'), t('analyticsPage.pill2'),
  t('analyticsPage.pill3'), t('analyticsPage.pill4'), t('analyticsPage.pill5'),
])
const stats = computed(() => [
  { value: '24', label: t('analyticsPage.statTotalDownloads'), color: '' },
  { value: '17', label: t('analyticsPage.statUniqueVisitors'),  color: '' },
  { value: '3',  label: t('analyticsPage.statFlaggedIPs'),      color: 'text-red-500' },
])
const feedRows = [
  { flag:'🇺🇸', city:'New York, US',    ip:'104.28.x.x',  time:'just now',   device:'Chrome / Mac',  badge:'Returning', badgeColor:'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400' },
  { flag:'🇩🇪', city:'Berlin, DE',      ip:'185.220.x.x', time:'8 min ago',  device:'Firefox / Win', badge:'VPN',       badgeColor:'bg-amber-100 dark:bg-amber-900/30 text-amber-700' },
  { flag:'🇬🇧', city:'London, GB',      ip:'91.108.x.x',  time:'15 min ago', device:'Safari / iOS',  badge:null,        badgeColor:'' },
  { flag:'🚫',  city:'Datacenter — US', ip:'23.94.x.x',   time:'22 min ago', device:'curl/7.68',     badge:'Bot',       badgeColor:'bg-red-100 dark:bg-red-900/30 text-red-700' },
]

// ── Matrix rain ──────────────────────────────────────────
const CHARS   = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ'
const BRAND   = '#22a366'
const FONT_SZ = 14

let ctx, cols, drops, speeds, opacities, colors, raf

function initMatrix(canvas) {
  ctx  = canvas.getContext('2d')
  cols = Math.ceil(canvas.width / FONT_SZ) + 2
  drops    = []
  speeds   = []
  opacities= []
  colors   = []
  for (let i = 0; i < cols; i++) {
    drops[i]     = Math.random() * -(canvas.height / FONT_SZ)
    speeds[i]    = 0.25 + Math.random() * 0.6
    opacities[i] = 0.05 + Math.random() * 0.20
    colors[i]    = Math.random() < 0.12 ? '#ffffff' : BRAND
  }
}

function drawMatrix(canvas) {
  ctx.fillStyle = 'rgba(0,0,0,0.14)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.font = `${FONT_SZ}px monospace`

  for (let i = 0; i < cols; i++) {
    const char = CHARS[Math.floor(Math.random() * CHARS.length)]
    const x = canvas.width - i * FONT_SZ
    const y = drops[i] * FONT_SZ
    const distFromRight = i / cols
    const crack = Math.max(0, 1 - distFromRight * 1.6)
    const alpha  = opacities[i] * crack

    if (alpha < 0.008) continue

    const isWhite = colors[i] === '#ffffff'
    ctx.fillStyle = isWhite
      ? `rgba(255,255,255,${alpha * 2.2})`
      : `rgba(34,163,102,${alpha * 2.8})`
    ctx.fillText(char, x, y)

    if (Math.random() > 0.6) {
      ctx.fillStyle = `rgba(180,255,210,${Math.min(crack * 0.7, 0.85)})`
      ctx.fillText(char, x, y)
    }

    drops[i] += speeds[i]
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = Math.random() * -30
    }
  }
}

function loop() {
  const canvas = matrixCanvas.value
  if (!canvas) return
  drawMatrix(canvas)
  raf = requestAnimationFrame(loop)
}

function resize() {
  const canvas = matrixCanvas.value
  if (!canvas) return
  canvas.width  = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  initMatrix(canvas)
}

onMounted(() => {
  if (typeof window === 'undefined') return
  const canvas = matrixCanvas.value
  if (!canvas) return
  canvas.width  = canvas.offsetWidth  || canvas.parentElement.offsetWidth
  canvas.height = canvas.offsetHeight || 700
  initMatrix(canvas)
  loop()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  if (typeof window !== 'undefined') window.removeEventListener('resize', resize)
})
</script>

<style scoped>
section {
  --hero-fade: rgba(255, 255, 255, 0.94);
}

:global(.dark) section,
.dark section {
  --hero-fade: rgba(9, 9, 11, 0.92);
}

@media (prefers-reduced-motion: reduce) {
  canvas { display: none; }
}
</style>