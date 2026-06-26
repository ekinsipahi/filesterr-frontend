<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-20">
    <div class="w-full max-w-lg space-y-4">

      <!-- Loading skeleton -->
      <div v-if="loading" class="card p-10 animate-pulse">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 shrink-0" />
          <div class="flex-1 space-y-2">
            <div class="h-5 bg-zinc-100 dark:bg-zinc-800 rounded w-3/4" />
            <div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-1/2" />
          </div>
        </div>
        <div class="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="card p-10 text-center">
        <div class="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
          <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 001.75-2.75L13.75 4a2 2 0 00-3.5 0L3.25 16.25A2 2 0 005.07 19z"/>
          </svg>
        </div>
        <p class="font-semibold mb-2">{{ t('download.notFound') }}</p>
        <p class="text-sm text-zinc-500 mb-6">{{ error }}</p>
        <a href="/" class="btn-primary">{{ t('download.goHome') }}</a>
      </div>

      <!-- File card -->
      <template v-else-if="file">
        <div class="card p-8 shadow-2xl">

          <!-- File header -->
          <div class="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              :class="fileType(file.mimeType).bg">
              <svg class="w-7 h-7" :class="fileType(file.mimeType).icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="fileType(file.mimeType).path"/>
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <h1 class="font-display text-xl font-bold truncate">{{ file.name }}</h1>
              <p class="text-sm text-zinc-400 mt-1">{{ formatSize(file.size) }} · {{ friendlyMime(file.mimeType) }}</p>
              <div class="flex items-center gap-2 mt-2 flex-wrap">
                <span v-if="file.isPasswordProtected"
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-[10px] font-bold">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  {{ t('download.passwordProtected') }}
                </span>
                <span v-if="file.isOneTime"
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-[10px] font-bold">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
                  </svg>
                  {{ t('download.oneTimeDownload') }}
                </span>
              </div>
            </div>
          </div>

          <!-- File meta -->
          <dl class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <dt class="text-xs text-zinc-400 uppercase tracking-wider mb-1">{{ t('download.uploaded') }}</dt>
              <dd class="text-sm font-medium">{{ formatDate(file.uploadedAt) }}</dd>
            </div>
            <div>
              <dt class="text-xs text-zinc-400 uppercase tracking-wider mb-1">{{ t('download.downloads') }}</dt>
              <dd class="text-sm font-medium">{{ file.downloadsCount }}</dd>
            </div>
            <div v-if="file.expiresAt">
              <dt class="text-xs text-zinc-400 uppercase tracking-wider mb-1">{{ t('download.expires') }}</dt>
              <dd class="text-sm font-medium" :class="isExpiringSoon ? 'text-amber-500' : ''">
                {{ formatDate(file.expiresAt) }}
              </dd>
            </div>
          </dl>

          <!-- One-time warning -->
          <div v-if="file.isOneTime && !downloadStarted" class="mb-5 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
            <svg class="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
            <div>
              <p class="text-xs font-bold text-red-700 dark:text-red-400">{{ t('download.oneTimeWarningTitle') }}</p>
              <p class="text-xs text-red-600 dark:text-red-300 mt-0.5">{{ t('download.oneTimeWarningBody') }}</p>
            </div>
          </div>

          <!-- Password gate -->
          <div v-if="file.isPasswordProtected && !passwordUnlocked" class="mb-5">
            <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              <svg class="inline w-3.5 h-3.5 mr-1 mb-0.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              {{ t('download.passwordLabel') }}
            </label>
            <div class="flex gap-2">
              <input v-model="password" type="password" :placeholder="t('download.passwordPlaceholder')"
                @keydown.enter="unlockPassword"
                class="flex-1 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
                :class="passwordError ? 'border-red-400 dark:border-red-600' : ''" />
              <button @click="unlockPassword" :disabled="!password || checkingPassword"
                class="btn-primary px-5 py-3 text-sm shrink-0">
                <svg v-if="checkingPassword" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <span v-else>{{ t('download.unlock') }}</span>
              </button>
            </div>
            <p v-if="passwordError" class="text-xs text-red-500 mt-2">{{ passwordError }}</p>
          </div>

          <!-- ── Ad countdown (anonymous / free users only) ─────────────────── -->
          <div v-if="showAdTimer && !adTimerDone"
            class="mb-6 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">

            <!-- Timer bar -->
            <div class="px-5 pt-4 pb-3">
              <div class="flex items-center justify-between text-xs text-zinc-500 mb-2">
                <span>Your download starts in <span class="font-bold text-zinc-700 dark:text-zinc-300 tabular-nums">{{ adCountdown }}s</span></span>
                <span class="text-brand-500 font-medium">{{ timerPct }}% complete</span>
              </div>
              <div class="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div class="h-full bg-brand-500 rounded-full transition-all duration-1000"
                  :style="`width:${timerPct}%`" />
              </div>
            </div>

            <!-- In-page push ad zone -->
            <div class="border-t border-zinc-100 dark:border-zinc-800 px-5 py-4 bg-zinc-50 dark:bg-zinc-800/40">
              <p class="text-[10px] text-zinc-400 uppercase tracking-wider mb-2 font-medium">Advertisement</p>
              <AdZone zone="inpage_push" container-class="min-h-[60px]" />
            </div>

            <!-- Skip upsell -->
            <div class="border-t border-zinc-100 dark:border-zinc-800 px-5 py-3 flex items-center justify-between">
              <p class="text-xs text-zinc-400">Skip all ads and timers</p>
              <a href="/pricing" class="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                Get Premium →
              </a>
            </div>
          </div>

          <!-- Download button -->
          <button @click="handleDownload"
            :disabled="downloadBtnDisabled"
            class="w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-3"
            :class="downloadBtnDisabled
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
              : 'btn-primary-lg text-base'">
            <svg v-if="!downloading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ downloadBtnLabel }}
          </button>

          <div v-if="downloadError" class="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p class="text-xs text-red-600 dark:text-red-400">{{ downloadError }}</p>
          </div>
        </div>

        <!-- Upsell card -->
        <div class="card p-5 flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold">{{ t('download.upsellTitle') }}</p>
            <p class="text-xs text-zinc-500 mt-0.5">{{ t('download.upsellSub') }}</p>
          </div>
          <a href="/pricing" class="btn-primary text-xs shrink-0">{{ t('download.goPremium') }}</a>
        </div>

        <!-- Popunder (fires invisibly on page load for non-premium users) -->
        <AdZone v-if="showBannerAd" zone="popunder" class="hidden" />

        <!-- Bottom banner ad (all non-premium users) -->
        <div v-if="showBannerAd" class="flex justify-center">
          <AdZone :zone="isMobile ? 'banner_mobile' : 'banner_728x90'" />
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import AdZone from '../components/ads/AdZone.vue'

const { t } = useI18n()
const route = useRoute()
const file  = ref(null)

useHead(computed(() => ({
  title: file.value ? `${file.value.name} — Download on Filesterr` : 'Download File — Filesterr',
  meta: [
    { name: 'description',        content: file.value ? `Download "${file.value.name}" on Filesterr — fast, secure file sharing.` : 'Secure file download powered by Filesterr.' },
    { name: 'robots',             content: 'noindex, follow' },
    { property: 'og:title',       content: file.value ? `${file.value.name} — Filesterr` : 'File Download — Filesterr' },
    { property: 'og:description', content: 'Secure file sharing powered by Filesterr.' },
    { property: 'og:image',       content: 'https://filesterr.com/logo.png' },
  ],
})))

// ── State ─────────────────────────────────────────────────────────────────────
const loading       = ref(true)
const error         = ref(null)
const adCountdown   = ref(0)
const adTimerDone   = ref(false)
const adDuration    = ref(0)
const downloading   = ref(false)
const downloadError = ref(null)
const downloadStarted = ref(false)

const password        = ref('')
const passwordUnlocked = ref(false)
const passwordError   = ref('')
const checkingPassword = ref(false)

let timer = null

// ── User / plan detection ─────────────────────────────────────────────────────
const userPlan = typeof window !== 'undefined'
  ? (window.__USER__?.plan ?? localStorage.getItem('cached_user') ? (() => { try { return JSON.parse(localStorage.getItem('cached_user'))?.plan } catch { return '' } })() : '')
  : ''
const isPremium  = ['premium', 'pro', 'promax'].includes(userPlan)
const isFree     = userPlan === 'free'
const isMobile   = typeof window !== 'undefined' && /android|iphone|ipod/i.test(navigator.userAgent)

// Timer durations by plan
function timerForPlan(plan) {
  if (['premium', 'pro', 'promax'].includes(plan)) return 0   // skip
  if (plan === 'free') return 20
  return 30  // anonymous
}

// ── Computed ──────────────────────────────────────────────────────────────────
const showAdTimer = computed(() => adDuration.value > 0)
const showBannerAd = computed(() => !isPremium)

const timerPct = computed(() => {
  if (adDuration.value === 0) return 100
  return Math.round(((adDuration.value - adCountdown.value) / adDuration.value) * 100)
})

const isExpiringSoon = computed(() => {
  if (!file.value?.expiresAt) return false
  return new Date(file.value.expiresAt) - Date.now() < 3 * 24 * 60 * 60 * 1000
})

const needsPassword = computed(() => file.value?.isPasswordProtected && !passwordUnlocked.value)

const downloadBtnDisabled = computed(() => {
  if (needsPassword.value) return true
  if (showAdTimer.value && !adTimerDone.value) return true
  if (downloading.value) return true
  return false
})

const downloadBtnLabel = computed(() => {
  if (downloading.value) return t('download.btnStarting')
  if (needsPassword.value) return t('download.btnEnterPassword')
  if (showAdTimer.value && !adTimerDone.value) return `Wait ${adCountdown.value}s…`
  return t('download.btnDownload')
})

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(async () => {
  try {
    const res = await fetch(`/api/v1/files/public/${route.params.id}/`)
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      throw new Error(d.error?.message || 'File not found or has been deleted.')
    }
    const data = await res.json()
    file.value = {
      name:                data.original_name,
      size:                data.size,
      mimeType:            data.mime_type,
      downloadsCount:      data.download_count,
      uploadedAt:          data.created_at,
      expiresAt:           data.expires_at,
      shareToken:          data.share_token,
      isPasswordProtected: !!data.is_password_protected,
      isOneTime:           !!data.is_one_time,
    }

    // Start ad timer after file loads
    const dur = timerForPlan(userPlan)
    adDuration.value  = dur
    adCountdown.value = dur

    if (dur > 0) {
      timer = setInterval(() => {
        adCountdown.value--
        if (adCountdown.value <= 0) {
          clearInterval(timer)
          adTimerDone.value = true
        }
      }, 1000)
    } else {
      adTimerDone.value = true
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

onUnmounted(() => { if (timer) clearInterval(timer) })

// ── Actions ───────────────────────────────────────────────────────────────────
function unlockPassword() {
  if (!password.value) return
  passwordError.value   = ''
  passwordUnlocked.value = true
}

async function handleDownload() {
  if (!file.value || downloadBtnDisabled.value) return
  await triggerDownload()
}

async function triggerDownload() {
  downloading.value  = true
  downloadError.value = null
  try {
    fetch('/api/v1/analytics/event/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ share_token: file.value.shareToken, event_type: 'download' }),
    }).catch(() => {})

    const passwordParam = file.value.isPasswordProtected
      ? `?password=${encodeURIComponent(password.value)}`
      : ''
    const apiUrl = `/api/v1/files/public/${route.params.id}/download/${passwordParam}`
    const res    = await fetch(apiUrl)

    if (res.status === 403) {
      const d = await res.json().catch(() => ({}))
      passwordUnlocked.value = false
      passwordError.value    = t('download.passwordError')
      return
    }
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      throw new Error(d.detail || d.error?.message || 'Download failed.')
    }

    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const { url } = await res.json()
      const a = document.createElement('a')
      a.href = url; a.rel = 'noopener'
      document.body.appendChild(a); a.click(); document.body.removeChild(a)
    } else {
      const blob      = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a         = document.createElement('a')
      a.href     = objectUrl
      a.download = file.value.name
      document.body.appendChild(a); a.click(); document.body.removeChild(a)
      URL.revokeObjectURL(objectUrl)
    }
    downloadStarted.value = true
  } catch (e) {
    downloadError.value = e.message
  } finally {
    downloading.value = false
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatSize(b) {
  if (!b) return '—'
  if (b >= 1073741824) return `${(b / 1073741824).toFixed(1)} GB`
  if (b >= 1048576)    return `${(b / 1048576).toFixed(1)} MB`
  return `${(b / 1024).toFixed(0)} KB`
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function friendlyMime(mime) {
  if (!mime) return 'File'
  const map = {
    'application/pdf': 'PDF',
    'application/zip': 'ZIP Archive',
    'application/x-rar-compressed': 'RAR Archive',
    'application/x-7z-compressed': '7-Zip Archive',
    'application/x-tar': 'TAR Archive',
    'application/msword': 'Word Document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document',
    'application/vnd.ms-excel': 'Excel Spreadsheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel Spreadsheet',
    'text/plain': 'Text File',
    'text/csv': 'CSV File',
  }
  if (map[mime]) return map[mime]
  if (mime.startsWith('image/')) return mime.replace('image/', '').toUpperCase() + ' Image'
  if (mime.startsWith('video/')) return mime.replace('video/', '').toUpperCase() + ' Video'
  if (mime.startsWith('audio/')) return mime.replace('audio/', '').toUpperCase() + ' Audio'
  return mime.split('/')[1]?.toUpperCase() || 'File'
}

function fileType(mime) {
  if (!mime) return defaults()
  if (mime.startsWith('image/')) return { bg: 'bg-gradient-to-br from-emerald-500 to-teal-400', icon: 'text-white', path: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' }
  if (mime.startsWith('video/')) return { bg: 'bg-gradient-to-br from-blue-500 to-indigo-400', icon: 'text-white', path: 'M15 10l4.553-2.276A1 1 0 0121 8.382v7.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' }
  if (mime.startsWith('audio/')) return { bg: 'bg-gradient-to-br from-purple-500 to-violet-400', icon: 'text-white', path: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' }
  if (mime === 'application/pdf') return { bg: 'bg-gradient-to-br from-red-500 to-rose-400', icon: 'text-white', path: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  if (mime.includes('zip') || mime.includes('rar') || mime.includes('tar') || mime.includes('7z')) return { bg: 'bg-gradient-to-br from-amber-500 to-orange-400', icon: 'text-white', path: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' }
  if (mime.includes('spreadsheet') || mime.includes('excel') || mime === 'text/csv') return { bg: 'bg-gradient-to-br from-green-500 to-emerald-400', icon: 'text-white', path: 'M3 10h18M3 14h18M10 3v18M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z' }
  if (mime.includes('word') || mime.includes('document')) return { bg: 'bg-gradient-to-br from-blue-600 to-blue-400', icon: 'text-white', path: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  if (mime.startsWith('text/') || mime.includes('json') || mime.includes('xml')) return { bg: 'bg-gradient-to-br from-zinc-500 to-zinc-400', icon: 'text-white', path: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }
  return defaults()
}
function defaults() {
  return { bg: 'bg-gradient-to-br from-brand-600 to-brand-400 shadow-glow', icon: 'text-white', path: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
}
</script>
