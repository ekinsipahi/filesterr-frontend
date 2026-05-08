<template>
  <section id="hero" class="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
    <!-- BG -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-brand-500/8 dark:bg-brand-500/12 blur-[120px] rounded-full animate-glow-pulse" />
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 blur-3xl rounded-full" />
      <div class="absolute inset-0 bg-grid opacity-60" />
    </div>

    <div class="relative max-w-7xl mx-auto px-6 w-full">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- Copy -->
        <div>
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-8 animate-fade-in">
            <span class="flex -space-x-1">
              <span v-for="n in 4" :key="n"
                class="w-4 h-4 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-white dark:border-zinc-950 inline-block" />
            </span>
            {{ t('hero.badge', { count: '500,000+' }) }}
          </div>

          <h1 class="font-display text-5xl sm:text-6xl xl:text-[70px] font-extrabold leading-[1.03] tracking-tight mb-6 animate-slide-up">
            {{ t('hero.h1a') }}<br/>
            {{ t('hero.h1b') }}<br/>
            <span class="text-gradient">{{ t('hero.h1c') }}</span>
          </h1>

          <p class="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg mb-8 animate-slide-up" style="animation-delay:.1s">
            {{ t('hero.sub', { free: '' }) }}
            <strong class="text-zinc-900 dark:text-white">{{ t('hero.freeHighlight') }}</strong>
            {{ ' ' }}free, no credit card needed.
          </p>

          <!-- Pills -->
          <div class="flex flex-wrap gap-2 mb-10 animate-fade-in" style="animation-delay:.2s">
            <span v-for="(pill, pi) in pillKeys" :key="pill"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
              <svg class="w-3 h-3 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ t(`hero.pill${pi+1}`) }}
            </span>
          </div>

          <div class="flex flex-wrap gap-4 mb-6 animate-slide-up" style="animation-delay:.3s">
            <a href="/register" class="btn-primary-lg group">
              {{ t('hero.cta1') }}
              <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a href="#features" class="btn-ghost-lg">{{ t('hero.cta2') }}</a>
          </div>

          <p class="text-xs text-zinc-400 animate-fade-in" style="animation-delay:.5s">
            {{ t('hero.microcopy') }}
          </p>
        </div>

        <!-- Upload widget -->
        <div class="relative animate-float">
          <div class="absolute -inset-6 bg-brand-500/10 blur-3xl rounded-3xl animate-glow-pulse" />
          <div class="relative card p-8 shadow-2xl">
            <!-- Window chrome -->
            <div class="flex items-center gap-2 mb-6 pb-5 border-b border-zinc-100 dark:border-zinc-800">
              <div class="w-3 h-3 rounded-full bg-red-400/80" />
              <div class="w-3 h-3 rounded-full bg-amber-400/80" />
              <div class="w-3 h-3 rounded-full bg-green-400/80" />
              <span class="ml-auto font-mono text-xs text-zinc-400">vaultdrop.io</span>
            </div>

            <!-- Drop zone -->
            <div
              class="flex flex-col items-center justify-center gap-5 rounded-xl border-2 border-dashed p-12 cursor-pointer transition-all duration-300"
              :class="dragging
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/8'
                : 'border-zinc-200 dark:border-zinc-700 hover:border-brand-400/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'"
              @dragover.prevent="dragging = true"
              @dragleave.prevent="dragging = false"
              @drop.prevent="onDrop"
              @click="fileInput?.click()"
            >
              <div class="relative">
                <div class="absolute inset-0 bg-brand-500/20 blur-xl rounded-full" />
                <div class="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center shadow-glow">
                  <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
              </div>
              <div class="text-center">
                <p class="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                  {{ dragging ? t('hero.dropping') : t('hero.dropHint') }}
                </p>
                <p class="text-sm text-zinc-500">
                  {{ t('hero.dropOr') }} <span class="text-brand-500 font-medium">{{ t('hero.browse') }}</span>
                </p>
                <p class="text-xs text-zinc-400 mt-2">{{ t('hero.dropSub') }}</p>
              </div>
              <input ref="fileInput" type="file" class="hidden" @change="onSelect" />
            </div>

            <!-- Progress -->
            <div v-if="isUploading" class="mt-5 space-y-2">
              <div class="flex justify-between text-xs text-zinc-500">
                <span>{{ t('hero.uploading') }}</span>
                <span class="font-bold text-brand-500">{{ progress }}%</span>
              </div>
              <div class="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div class="h-full progress-bar rounded-full transition-all" :style="`width:${progress}%`" />
              </div>
            </div>

            <!-- Result -->
            <div v-if="result && !isUploading" class="mt-5 space-y-3">
              <div class="p-4 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shrink-0">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-brand-700 dark:text-brand-400">{{ t('hero.success') }}</p>
                    <p class="text-xs text-brand-600/70 dark:text-brand-500/70 truncate max-w-[200px]">{{ result.name }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-brand-200 dark:border-brand-500/20">
                  <span class="text-xs font-mono text-zinc-600 dark:text-zinc-400 truncate flex-1">{{ shareUrl }}</span>
                  <button @click="copyLink"
                    class="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-400 transition-colors">
                    {{ copied ? t('hero.copied') : t('hero.copyLink') }}
                  </button>
                </div>
              </div>
              <p class="text-xs text-zinc-400 text-center">
                {{ t('hero.deleteHint') }}
                <a :href="result.deleteUrl" class="text-red-500 hover:text-red-400 font-medium underline ml-1">
                  {{ t('hero.deleteLink') }}
                </a>
              </p>
            </div>

            <!-- Error -->
            <div v-if="uploadError" class="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p class="text-xs text-red-600 dark:text-red-400">{{ uploadError }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { HERO_PILLS } from '../../data/plans.js'

const { t } = useI18n()
const pillKeys = HERO_PILLS

const fileInput = ref(null)
const dragging = ref(false)
const isUploading = ref(false)
const progress = ref(0)
const uploadError = ref(null)
const copied = ref(false)
const result = ref(null)
const shareUrl = ref('')

const CHUNK = 5 * 1024 * 1024

async function handle(file) {
  uploadError.value = null
  result.value = null

  if (file.size > 1024 * 1024 * 1024) {
    uploadError.value = t('hero.errorSize')
    return
  }

  isUploading.value = true
  progress.value = 0

  try {
    const csrf = document.cookie.match(/csrftoken=([^;]+)/)?.[1] || ''
    const headers = { 'Content-Type': 'application/json', 'X-CSRFToken': csrf }

    const { uploadId } = await fetch('/api/v1/files/upload/init/', {
      method: 'POST', headers,
      body: JSON.stringify({ filename: file.name, size: file.size, type: file.type }),
    }).then(r => r.json())

    const total = Math.ceil(file.size / CHUNK)
    for (let i = 0; i < total; i++) {
      const fd = new FormData()
      fd.append('upload_id', uploadId)
      fd.append('chunk_index', String(i))
      fd.append('total_chunks', String(total))
      fd.append('chunk', file.slice(i * CHUNK, Math.min((i + 1) * CHUNK, file.size)))
      await fetch('/api/v1/files/upload/chunk/', {
        method: 'POST', headers: { 'X-CSRFToken': csrf }, body: fd,
      })
      progress.value = Math.round(((i + 1) / total) * 100)
    }

    const res = await fetch('/api/v1/files/upload/finalize/', {
      method: 'POST', headers,
      body: JSON.stringify({ upload_id: uploadId }),
    }).then(r => r.json())

    result.value = res
    shareUrl.value = window.location.origin + res.shareUrl
  } catch {
    uploadError.value = t('hero.errorGeneric')
  } finally {
    isUploading.value = false
  }
}

const onDrop = (e) => { dragging.value = false; const f = e.dataTransfer?.files[0]; if (f) handle(f) }
const onSelect = (e) => { const f = e.target.files?.[0]; if (f) handle(f) }

async function copyLink() {
  await navigator.clipboard.writeText(shareUrl.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>