<template>
  <div class="w-full select-none">

    <!-- ── IDLE: Drop zone ── -->
    <div v-if="stage === 'idle'"
      class="relative flex flex-col items-center gap-4 rounded-xl border-2 border-dashed p-8 cursor-pointer transition-colors duration-200"
      :class="dragging
        ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
        : 'border-zinc-200 dark:border-zinc-700 hover:border-brand-400/60 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40'"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="onDrop"
      @click="fileInputRef?.click()"
      role="button"
      tabindex="0"
      @keydown.enter="fileInputRef?.click()"
      @keydown.space.prevent="fileInputRef?.click()"
    >
      <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        :class="dragging ? 'bg-brand-100 dark:bg-brand-900/40' : 'bg-zinc-100 dark:bg-zinc-800'">
        <svg class="w-6 h-6" :class="dragging ? 'text-brand-500' : 'text-zinc-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
      </div>
      <div class="text-center">
        <p class="font-semibold text-zinc-800 dark:text-zinc-200 text-sm">
          {{ dragging ? 'Release to select' : 'Drop file here or click to browse' }}
        </p>
        <p class="text-xs text-zinc-400 mt-1">Up to {{ formatSize(sizeLimit) }} · Any file type</p>
      </div>
      <input ref="fileInputRef" type="file" class="hidden" @change="onSelect" />
    </div>

    <!-- ── CHECKING / HASHING ── -->
    <div v-else-if="stage === 'checking' || stage === 'hashing'" class="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div class="flex items-center gap-4 p-5">
        <div class="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5 text-zinc-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-zinc-900 dark:text-white truncate">{{ cachedFile?.name }}</p>
          <p class="text-xs text-zinc-400 mt-0.5">{{ stage === 'hashing' ? `Verifying integrity… ${hashProgress}%` : 'Checking file…' }}</p>
        </div>
      </div>
      <div v-if="stage === 'hashing'" class="h-1 bg-zinc-100 dark:bg-zinc-800">
        <div class="h-full bg-brand-500 transition-all duration-300" :style="`width:${hashProgress}%`" />
      </div>
    </div>

    <!-- ── CAPTCHA ── -->
    <div v-else-if="stage === 'captcha'" class="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <!-- File info row -->
      <div class="flex items-center gap-3 px-4 py-3.5 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
        <div class="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 text-[9px] font-bold text-zinc-500 uppercase">
          {{ fileExt }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-zinc-900 dark:text-white truncate">{{ cachedFile?.name }}</p>
          <p class="text-xs text-zinc-400">{{ readableSize }}</p>
        </div>
        <button @click="reset" class="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors" title="Remove file">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- CAPTCHA widget -->
      <div class="p-5">
        <p class="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Verify you're human</p>
        <div ref="turnstileContainer" class="cf-turnstile-container" />
        <p v-if="captchaError" class="text-xs text-red-500 mt-2 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 001.75-2.75L13.75 4a2 2 0 00-3.5 0L3.25 16.25A2 2 0 005.07 19z"/>
          </svg>
          {{ captchaError }}
        </p>
      </div>
    </div>

    <!-- ── READY: file selected + captcha passed ── -->
    <div v-else-if="stage === 'ready'" class="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <!-- File info -->
      <div class="flex items-center gap-3 px-4 py-3.5 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
        <div class="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 text-[9px] font-bold text-zinc-500 uppercase">
          {{ fileExt }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-zinc-900 dark:text-white truncate">{{ cachedFile?.name }}</p>
          <p class="text-xs text-zinc-400">{{ readableSize }}</p>
        </div>
        <span class="flex items-center gap-1 text-[10px] text-brand-600 dark:text-brand-400 font-medium shrink-0">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
          Verified
        </span>
        <button @click="reset" class="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors ml-1" title="Remove file">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Premium options (premium+ users only) -->
      <div v-if="isPremiumUser" class="px-4 pt-3.5 pb-1 border-b border-zinc-100 dark:border-zinc-800 space-y-3">
        <p class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Upload options</p>

        <!-- Password protection -->
        <div class="space-y-1.5">
          <label class="flex items-center gap-2.5 cursor-pointer group">
            <div class="relative w-4 h-4 shrink-0">
              <input type="checkbox" v-model="usePassword" class="peer sr-only" />
              <div class="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-600 peer-checked:bg-brand-500 peer-checked:border-brand-500 transition-colors flex items-center justify-center">
                <svg v-if="usePassword" class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
            <svg class="w-3.5 h-3.5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <span class="text-xs font-medium text-zinc-700 dark:text-zinc-300">Password protection</span>
          </label>
          <div v-if="usePassword" class="pl-6">
            <input v-model="uploadPassword" type="password" placeholder="Set a password…"
              class="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none focus:ring-1 focus:ring-brand-500/40 focus:border-brand-500 text-zinc-900 dark:text-white placeholder-zinc-400"/>
          </div>
        </div>

        <!-- One-time download -->
        <label class="flex items-center gap-2.5 cursor-pointer">
          <div class="relative w-4 h-4 shrink-0">
            <input type="checkbox" v-model="isOneTime" class="peer sr-only" />
            <div class="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-600 peer-checked:bg-brand-500 peer-checked:border-brand-500 transition-colors flex items-center justify-center">
              <svg v-if="isOneTime" class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
          <svg class="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
          </svg>
          <span class="text-xs font-medium text-zinc-700 dark:text-zinc-300">One-time download</span>
          <span class="text-[10px] text-zinc-400 ml-1">deleted after first download</span>
        </label>

        <!-- Expiry -->
        <div class="flex items-center gap-2.5">
          <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-xs text-zinc-600 dark:text-zinc-400">Expires:</span>
          <select v-model="expiresIn"
            class="text-xs px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 outline-none focus:ring-1 focus:ring-brand-500/40 cursor-pointer">
            <option :value="0">Never</option>
            <option :value="1">24 hours</option>
            <option :value="7">7 days</option>
            <option :value="30">30 days</option>
            <option :value="90">90 days</option>
          </select>
        </div>
      </div>

      <!-- Upload button -->
      <div class="p-4">
        <button @click="doUpload"
          class="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-400 active:scale-[0.98] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          Upload File
        </button>
      </div>
    </div>

    <!-- ── UPLOADING ── -->
    <div v-else-if="stage === 'uploading'" class="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div class="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800">
        <div class="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 text-[9px] font-bold text-zinc-500 uppercase">
          {{ fileExt }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-zinc-900 dark:text-white truncate">{{ cachedFile?.name }}</p>
          <p class="text-xs text-zinc-400">{{ readableSize }}</p>
        </div>
        <span class="text-sm font-bold text-brand-500 tabular-nums shrink-0">{{ uploadProgress }}%</span>
      </div>
      <div class="px-4 py-4">
        <div class="flex items-center justify-between text-xs text-zinc-400 mb-2">
          <span>Uploading…</span>
          <span>{{ uploadProgress }}% complete</span>
        </div>
        <div class="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div class="h-full bg-brand-500 rounded-full transition-all duration-300" :style="`width:${uploadProgress}%`" />
        </div>
      </div>
    </div>

    <!-- ── DONE ── -->
    <div v-else-if="stage === 'done' && result" class="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <!-- Success header -->
      <div class="flex items-center gap-3 px-4 py-3.5 bg-brand-50 dark:bg-brand-500/10 border-b border-brand-100 dark:border-brand-500/20">
        <div class="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-brand-700 dark:text-brand-300">Uploaded successfully</p>
          <p class="text-xs text-zinc-500 truncate">{{ result.name }}</p>
        </div>
        <button @click="reset" class="text-xs text-zinc-400 hover:text-zinc-600 transition-colors px-2 py-1 rounded-md hover:bg-white/60 dark:hover:bg-zinc-800 shrink-0">
          Upload another
        </button>
      </div>

      <!-- Share link + QR -->
      <div class="p-4 space-y-3">
        <div class="flex gap-3">
          <!-- QR code -->
          <div class="shrink-0 w-20 h-20 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white p-1 overflow-hidden">
            <img
              :src="`https://api.qrserver.com/v1/create-qr-code/?size=144x144&margin=0&data=${encodeURIComponent(origin + result.shareUrl)}`"
              alt="QR code"
              class="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          <!-- Link + actions -->
          <div class="flex-1 min-w-0 space-y-2">
            <p class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">Download link</p>
            <div class="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <span class="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate flex-1 min-w-0">
                {{ origin }}{{ result.shareUrl }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <button @click="copy(origin + result.shareUrl)"
                class="flex-1 text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5"
                :class="copied ? 'bg-brand-500 text-white' : 'bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 hover:bg-brand-200'">
                <svg v-if="!copied" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                {{ copied ? 'Copied!' : 'Copy link' }}
              </button>
              <a :href="origin + result.shareUrl" target="_blank" rel="noopener"
                class="text-xs px-3 py-1.5 rounded-lg font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                Open
              </a>
            </div>
          </div>
        </div>

        <!-- Delete link -->
        <div class="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800">
          <p class="text-xs text-zinc-400">Need to remove this file?</p>
          <a :href="result.deleteUrl"
            class="text-xs text-red-500 hover:text-red-400 font-medium flex items-center gap-1 transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Delete file
          </a>
        </div>
      </div>

      <!-- Anonymous claim banner -->
      <div v-if="result.isAnonymous" class="mx-4 mb-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 p-4">
        <div class="flex items-start gap-3">
          <svg class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-amber-800 dark:text-amber-300">This file expires in 24 hours</p>
            <p class="text-xs text-amber-700 dark:text-amber-400 mt-0.5 leading-relaxed">
              Create a free account to claim it and keep it permanently.
            </p>
            <a :href="`/register?claim=${result.fileId}`"
              class="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-400 px-2.5 py-1.5 rounded-lg transition-colors">
              Claim this file — free
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- ── CAPACITY LIMITED (upsell) ── -->
    <div v-if="stage === 'error' && errorCode === 'capacity_limited'"
         class="mt-3 p-5 rounded-xl bg-gradient-to-br from-brand-50 to-indigo-50 dark:from-brand-900/20 dark:to-indigo-900/20 border border-brand-200 dark:border-brand-700">
      <p class="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-1">
        Free uploads are currently at capacity.
      </p>
      <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        Demand is high right now. Premium members upload instantly, without limits.
      </p>
      <div class="flex gap-2 flex-wrap">
        <a href="/pricing"
           class="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors">
          Get Premium — from $4.99/mo
        </a>
        <button @click="reset"
                class="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          Try later
        </button>
      </div>
    </div>

    <!-- ── ERROR ── -->
    <div v-else-if="stage === 'error' && error" class="mt-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
      <svg class="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 001.75-2.75L13.75 4a2 2 0 00-3.5 0L3.25 16.25A2 2 0 005.07 19z"/>
      </svg>
      <div class="flex-1">
        <p class="text-sm text-red-700 dark:text-red-400">{{ error }}</p>
        <button @click="reset" class="text-xs text-red-500 hover:text-red-400 mt-1 underline">Try again</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useUpload, formatSize } from '../../composables/useUpload.js'
import { useClipboard } from '@vueuse/core'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'

const {
  cachedFile, fileHash, hashProgress, uploadProgress,
  isHashing, isUploading, result, error, errorCode, stage,
  readableSize, sizeLimit,
  acceptFile, upload, reset: rawReset,
} = useUpload()

const fileInputRef       = ref(null)
const dragging           = ref(false)
const turnstileContainer = ref(null)
const captchaToken       = ref('')
const captchaError       = ref('')
const turnstileWidgetId  = ref(null)
const origin = typeof window !== 'undefined' ? window.location.origin : 'https://filesterr.com'
const { copy, copied } = useClipboard()

// Premium upload options
const isPremiumUser  = ref(false)
const usePassword    = ref(false)
const uploadPassword = ref('')
const isOneTime      = ref(false)
const expiresIn      = ref(0)

const fileExt = computed(() => {
  const name = cachedFile.value?.name || ''
  const ext = name.split('.').pop()
  return (ext?.length <= 5 ? ext : ext?.slice(0, 4))?.toUpperCase() || '?'
})

// ── Turnstile integration ──────────────────────────────────────────────────

function loadTurnstileScript() {
  if (typeof window === 'undefined') return
  if (document.getElementById('cf-turnstile-script')) return
  const s = document.createElement('script')
  s.id = 'cf-turnstile-script'
  s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
  s.async = true
  document.head.appendChild(s)
}

function renderTurnstile() {
  if (!turnstileContainer.value || typeof window === 'undefined') return
  const tryRender = () => {
    if (!window.turnstile) { setTimeout(tryRender, 200); return }
    if (turnstileWidgetId.value !== null) {
      window.turnstile.reset(turnstileWidgetId.value)
      return
    }
    turnstileWidgetId.value = window.turnstile.render(turnstileContainer.value, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      callback: (token) => {
        captchaToken.value = token
        captchaError.value = ''
        stage.value = 'ready'
      },
      'error-callback': () => {
        captchaError.value = 'Verification failed. Please try again.'
        captchaToken.value = ''
      },
      'expired-callback': () => {
        captchaToken.value = ''
        stage.value = 'captcha'
      },
    })
  }
  tryRender()
}

// ── File input handling ──────────────────────────────────────────────────

async function onDrop(e) {
  dragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file) await handleFile(file)
}

async function onSelect(e) {
  const file = e.target.files?.[0]
  if (file) await handleFile(file)
  if (fileInputRef.value) fileInputRef.value.value = ''
}

async function handleFile(file) {
  captchaToken.value = ''
  captchaError.value = ''
  const ok = await acceptFile(file)
  if (ok) {
    await nextTick()
    renderTurnstile()
  }
}

// ── Upload ──────────────────────────────────────────────────────────────

async function doUpload() {
  if (!captchaToken.value) {
    captchaError.value = 'Please complete the CAPTCHA first.'
    stage.value = 'captcha'
    return
  }
  await upload(captchaToken.value, {
    password:  usePassword.value ? uploadPassword.value : undefined,
    isOneTime: isOneTime.value,
    expiresIn: expiresIn.value || undefined,
  })
}

// ── Reset ───────────────────────────────────────────────────────────────

function reset() {
  captchaToken.value = ''
  captchaError.value = ''
  usePassword.value    = false
  uploadPassword.value = ''
  isOneTime.value      = false
  expiresIn.value      = 0
  if (typeof window !== 'undefined' && window.turnstile && turnstileWidgetId.value !== null) {
    window.turnstile.remove(turnstileWidgetId.value)
    turnstileWidgetId.value = null
  }
  rawReset()
}

onMounted(() => {
  loadTurnstileScript()
  const plan = typeof window !== 'undefined' ? (window.__USER__?.plan ?? '') : ''
  isPremiumUser.value = ['premium', 'pro', 'promax'].includes(plan)
})

onUnmounted(() => {
  if (typeof window !== 'undefined' && window.turnstile && turnstileWidgetId.value !== null) {
    window.turnstile.remove(turnstileWidgetId.value)
  }
})
</script>
