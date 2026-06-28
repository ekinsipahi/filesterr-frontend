<template>
  <section class="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden" id="hero">

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

    <!-- ░░ İÇERİK ░░ -->
    <div class="relative max-w-7xl mx-auto px-6 w-full">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- Copy -->
        <div>
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-8">
            <span class="flex -space-x-1">
              <span v-for="n in 4" :key="n"
                class="w-4 h-4 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-white dark:border-zinc-950 inline-block" />
            </span>
            {{ $t('hero.badge', { count: '500,000+' }) }}
          </div>

          <h1 class="font-display text-5xl sm:text-6xl xl:text-[70px] font-extrabold leading-[1.03] tracking-tight mb-6">
            {{ $t('hero.h1a') }}<br/>
            {{ $t('hero.h1b') }}<br/>
            <span class="text-gradient">{{ $t('hero.h1c') }}</span>
          </h1>

          <p class="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg mb-8">
            {{ $t('hero.sub') }}
            <strong class="text-zinc-900 dark:text-white">{{ $t('hero.freeLabel') }}</strong>{{ $t('hero.noCreditCard') }}
          </p>

          <div class="flex flex-wrap gap-2 mb-10">
            <span v-for="pill in pills" :key="pill"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
              <svg class="w-3 h-3 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ pill }}
            </span>
          </div>

          <div class="flex flex-wrap gap-4 mb-6">
            <RouterLink :to="lp('register')" class="btn-primary-lg group">
              {{ $t('hero.cta1') }}
              <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </RouterLink>
            <a href="#features" class="btn-ghost-lg">{{ $t('hero.cta2') }}</a>
          </div>
          <p class="text-xs text-zinc-400">{{ $t('hero.microcopy') }}</p>
        </div>

        <!-- Upload widget -->
        <div class="relative">
          <!-- Glow halo — static, no animation -->
          <div class="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-500/20 via-transparent to-brand-400/10 pointer-events-none" />
          <div class="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">

            <!-- Toolbar -->
            <div class="flex items-center gap-2 px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <div class="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div class="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <div class="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <span class="ml-auto font-mono text-[11px] text-zinc-400">filesterr.com</span>
            </div>

            <!-- Upload widget -->
            <div class="p-5">
              <UploadWidget />
            </div>

            <!-- What you get strip -->
            <div class="border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/40 px-5 py-4">
              <p class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-3">{{ $t('hero2.afterUpload') }}</p>
              <div class="grid grid-cols-3 gap-3">
                <div class="flex flex-col gap-1">
                  <div class="w-7 h-7 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                    <svg class="w-3.5 h-3.5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                  </div>
                  <p class="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">{{ $t('hero2.shareLink') }}</p>
                  <p class="text-[10px] text-zinc-400 leading-tight">{{ $t('hero2.shareLinkSub') }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <div class="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center">
                    <svg class="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <p class="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">{{ $t('hero2.analytics') }}</p>
                  <p class="text-[10px] text-zinc-400 leading-tight">{{ $t('hero2.analyticsSub') }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <div class="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
                    <svg class="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </div>
                  <p class="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">{{ $t('hero2.deleteLink') }}</p>
                  <p class="text-[10px] text-zinc-400 leading-tight">{{ $t('hero2.deleteLinkSub') }}</p>
                </div>
              </div>
            </div>

            <!-- Live stat bar -->
            <div class="flex items-center justify-between px-5 py-3 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand-500 inline-block" style="box-shadow:0 0 0 3px rgba(34,163,102,.18)"/>
                <span class="text-[11px] text-zinc-500">{{ $t('hero2.noAccountNeeded') }}</span>
              </div>
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1 text-[11px] text-zinc-400">
                  <svg class="w-3 h-3 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  AES-256
                </span>
                <span class="flex items-center gap-1 text-[11px] text-zinc-400">
                  <svg class="w-3 h-3 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  {{ $t('hero2.anyFileType') }}
                </span>
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
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import UploadWidget from '../upload/UploadWidget.vue'
import { useLocalePath } from '../../composables/useLocalePath.js'

const { lp } = useLocalePath()
const { t } = useI18n()

const matrixCanvas = ref(null)

const pills = computed(() => [
  t('hero.pill1'), t('hero.pill2'), t('hero.pill3'),
  t('hero.pill4'), t('hero.pill5'), t('hero.pill6'),
])

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
  // Tail fade
  ctx.fillStyle = 'rgba(0,0,0,0.14)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.font = `${FONT_SZ}px monospace`

  for (let i = 0; i < cols; i++) {
    const char = CHARS[Math.floor(Math.random() * CHARS.length)]

    // Sağdan sola: kolon 0 en sağda, kolon (cols-1) en solda
    const x = canvas.width - i * FONT_SZ
    const y = drops[i] * FONT_SZ

    // Sağdan geliş — sağ tarafta daha yoğun, sola doğru söner
    const distFromRight = i / cols           // 0 = sağ kenar, 1 = sol kenar
    const crack = Math.max(0, 1 - distFromRight * 1.6)  // crack efekti: sağdan açılır
    const alpha  = opacities[i] * crack

    if (alpha < 0.008) continue

    // Normal char
    const isWhite = colors[i] === '#ffffff'
    ctx.fillStyle = isWhite
      ? `rgba(255,255,255,${alpha * 2.2})`
      : `rgba(34,163,102,${alpha * 2.8})`
    ctx.fillText(char, x, y)

    // Parlak baş (head glow — en üst char daha parlak)
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
/* Light modda sol taraf fade beyaz, dark modda koyu */
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