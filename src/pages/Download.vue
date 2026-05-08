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
        <p class="font-semibold mb-2">File Not Found</p>
        <p class="text-sm text-zinc-500 mb-6">{{ error }}</p>
        <a href="/" class="btn-primary">Go Home</a>
      </div>

      <!-- File card -->
      <template v-else-if="file">
        <div class="card p-8 shadow-2xl">

          <!-- File header -->
          <div class="flex items-center gap-4 mb-8 pb-7 border-b border-zinc-100 dark:border-zinc-800">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center shadow-glow shrink-0">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div class="min-w-0">
              <h1 class="font-display text-xl font-bold truncate">{{ file.name }}</h1>
              <p class="text-sm text-zinc-400 mt-1">{{ formatSize(file.size) }} · {{ file.mimeType || 'file' }}</p>
            </div>
          </div>

          <!-- File meta -->
          <dl class="grid grid-cols-2 gap-4 mb-8">
            <div>
              <dt class="text-xs text-zinc-400 uppercase tracking-wider mb-1">Uploaded</dt>
              <dd class="text-sm font-medium">{{ formatDate(file.uploadedAt) }}</dd>
            </div>
            <div>
              <dt class="text-xs text-zinc-400 uppercase tracking-wider mb-1">Downloads</dt>
              <dd class="text-sm font-medium">{{ file.downloadsCount }}</dd>
            </div>
            <div v-if="file.expiresAt">
              <dt class="text-xs text-zinc-400 uppercase tracking-wider mb-1">Expires</dt>
              <dd class="text-sm font-medium" :class="isExpiringSoon ? 'text-amber-500' : ''">
                {{ formatDate(file.expiresAt) }}
              </dd>
            </div>
          </dl>

          <!-- Ad countdown gate -->
          <div v-if="showAd && !adDone" class="mb-6 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <div class="flex items-center justify-between text-xs text-zinc-500 mb-3">
              <span>Your download starts in {{ adCountdown }}s</span>
              <span class="text-brand-500 font-medium">{{ Math.round(((file.adDuration - adCountdown) / file.adDuration) * 100) }}%</span>
            </div>
            <div class="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div class="h-full bg-brand-500 rounded-full transition-all duration-1000"
                :style="`width:${((file.adDuration - adCountdown) / file.adDuration) * 100}%`" />
            </div>
            <!-- Ad placeholder -->
            <div class="mt-4 h-20 rounded-lg bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-xs text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-600">
              Advertisement
            </div>
            <p class="text-center text-xs text-zinc-400 mt-3">
              Skip ads →
              <a href="/register?plan=premium" class="text-brand-500 font-medium hover:underline">Get Premium</a>
            </p>
          </div>

          <!-- Download button -->
          <button @click="handleDownload"
            :disabled="(showAd && !adDone) || downloading"
            class="w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-3"
            :class="(showAd && !adDone)
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
              : 'btn-primary-lg text-base'">
            <svg v-if="!downloading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <svg v-else class="w-5 h-5 animate-spin-slow" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ downloading ? 'Starting download...' : 'Download File' }}
          </button>

          <!-- Download error -->
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
            <p class="text-sm font-semibold">Download without waiting</p>
            <p class="text-xs text-zinc-500 mt-0.5">Premium users skip all ads and download instantly.</p>
          </div>
          <a href="/register?plan=premium" class="btn-primary text-xs shrink-0">Go Premium</a>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const file = ref(null)
const loading = ref(true)
const error = ref(null)
const adCountdown = ref(0)
const adDone = ref(false)
const downloading = ref(false)
const downloadError = ref(null)
let timer = null

// Pro users skip ads — in real app check auth state
const userIsPro = typeof window !== 'undefined' && window.__USER__?.isPro

const showAd = computed(() => file.value?.requiresAd && !userIsPro)
const isExpiringSoon = computed(() => {
  if (!file.value?.expiresAt) return false
  return new Date(file.value.expiresAt) - Date.now() < 3 * 24 * 60 * 60 * 1000 // 3 days
})

onMounted(async () => {
  try {
    const res = await fetch(`/api/v1/files/${route.params.id}/info/`)
    if (!res.ok) throw new Error('File not found or has been deleted.')
    file.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

onUnmounted(() => { if (timer) clearInterval(timer) })

async function handleDownload() {
  if (!file.value) return

  // If ad required and not yet done — start countdown
  if (showAd.value && !adDone.value) {
    adCountdown.value = file.value.adDuration || 10
    timer = setInterval(() => {
      adCountdown.value--
      if (adCountdown.value <= 0) {
        clearInterval(timer)
        adDone.value = true
        // Auto-trigger download after ad completes
        triggerDownload()
      }
    }, 1000)
    return
  }

  triggerDownload()
}

async function triggerDownload() {
  downloading.value = true
  downloadError.value = null
  try {
    const res = await fetch(`/api/v1/files/${route.params.id}/download/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adCompleted: adDone.value }),
    })
    if (!res.ok) throw new Error('Download failed.')
    const { downloadUrl } = await res.json()
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = file.value.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } catch (e) {
    downloadError.value = e.message
  } finally {
    downloading.value = false
  }
}

function formatSize(b) {
  if (!b) return '—'
  if (b >= 1073741824) return `${(b / 1073741824).toFixed(1)} GB`
  if (b >= 1048576) return `${(b / 1048576).toFixed(1)} MB`
  return `${(b / 1024).toFixed(0)} KB`
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>