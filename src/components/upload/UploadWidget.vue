<template>
  <div class="w-full">

    <!-- ── IDLE / HASHING: Drop zone ── -->
    <template v-if="stage === 'idle' || stage === 'checking' || stage === 'hashing'">
      <div
        class="relative flex flex-col items-center justify-center gap-5 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-all duration-300 select-none"
        :class="[
          dragging
            ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/8 scale-[1.01]'
            : 'border-zinc-200 dark:border-zinc-700 hover:border-brand-400/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/40',
          stage === 'hashing' ? 'pointer-events-none' : '',
        ]"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="onDrop"
        @click="stage === 'idle' && fileInput?.click()"
      >
        <!-- Icon -->
        <div class="relative">
          <div class="absolute inset-0 bg-brand-500/15 blur-xl rounded-full" />
          <div class="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-glow transition-all duration-300"
            :class="stage === 'hashing' ? 'bg-amber-500' : 'bg-gradient-to-br from-brand-600 to-brand-400'">
            <svg v-if="stage !== 'hashing'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            <svg v-else class="w-7 h-7 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          </div>
        </div>

        <!-- Text -->
        <div class="text-center">
          <p class="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
            <template v-if="stage === 'idle'">
              {{ dragging ? 'Drop it here!' : 'Drop your file or click to browse' }}
            </template>
            <template v-else-if="stage === 'checking'">Checking file...</template>
            <template v-else-if="stage === 'hashing'">
              Verifying file integrity...
            </template>
          </p>
          <p class="text-xs text-zinc-400">
            <template v-if="stage === 'idle'">
              Up to {{ formatSize(sizeLimit) }} · Any file type
            </template>
            <template v-else-if="stage === 'hashing'">
              Computing hash · {{ hashProgress }}%
            </template>
          </p>
        </div>

        <!-- Hash progress bar -->
        <div v-if="stage === 'hashing'" class="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div class="h-full bg-amber-500 rounded-full transition-all duration-300" :style="`width:${hashProgress}%`" />
        </div>

        <input ref="fileInput" type="file" class="hidden" @change="onSelect" />
      </div>
    </template>

    <!-- ── READY: File cached, show details + Upload button ── -->
    <template v-else-if="stage === 'ready'">
      <div class="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <!-- File info row -->
        <div class="flex items-center gap-4 p-5 bg-zinc-50 dark:bg-zinc-800/50">
          <!-- File type icon -->
          <div class="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-zinc-900 dark:text-white truncate">{{ cachedFile?.name }}</p>
            <div class="flex items-center gap-3 mt-0.5">
              <p class="text-xs text-zinc-400">{{ readableSize }}</p>
              <!-- Hash badge -->
              <span class="inline-flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                <svg class="w-3 h-3 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                {{ fileHash?.slice(0, 8) }}…
              </span>
            </div>
          </div>
          <!-- Remove -->
          <button @click="reset" class="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-400 hover:text-zinc-600 transition-colors" title="Remove">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Upload button -->
        <div class="p-4 bg-white dark:bg-zinc-900">
          <button
            @click="upload"
            class="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 btn-primary-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            Upload File
          </button>
          <p class="text-center text-xs text-zinc-400 mt-2">File is cached locally — uploads only when you click</p>
        </div>
      </div>
    </template>

    <!-- ── UPLOADING ── -->
    <template v-else-if="stage === 'uploading'">
      <div class="rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-brand-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold">Uploading...</p>
            <p class="text-xs text-zinc-400 truncate">{{ cachedFile?.name }}</p>
          </div>
          <span class="font-bold text-brand-500 text-sm tabular-nums">{{ uploadProgress }}%</span>
        </div>
        <div class="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div class="h-full progress-bar rounded-full transition-all duration-300" :style="`width:${uploadProgress}%`" />
        </div>
      </div>
    </template>

    <!-- ── DONE ── -->
    <template v-else-if="stage === 'done' && result">
      <div class="rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/25 p-5 space-y-4">
        <!-- Success header -->
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shrink-0 shadow-glow">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-brand-700 dark:text-brand-300">Upload complete!</p>
            <p class="text-xs text-zinc-500 truncate max-w-[220px]">{{ result.name }}</p>
          </div>
          <button @click="reset" class="ml-auto text-xs text-zinc-400 hover:text-zinc-600 transition-colors px-2 py-1 rounded-lg hover:bg-white dark:hover:bg-zinc-800">
            Upload another
          </button>
        </div>

        <!-- Share link -->
        <div class="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-zinc-900 border border-brand-200 dark:border-brand-500/25">
          <svg class="w-4 h-4 text-brand-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
          </svg>
          <span class="text-xs font-mono text-zinc-600 dark:text-zinc-400 truncate flex-1">
            {{ origin }}{{ result.shareUrl }}
          </span>
          <button
            @click="copy(origin + result.shareUrl)"
            class="shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
            :class="copied ? 'bg-brand-500 text-white' : 'bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 hover:bg-brand-200'"
          >
            {{ copied ? '✓ Copied' : 'Copy' }}
          </button>
        </div>

        <!-- Delete link -->
        <p class="text-xs text-zinc-400 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          Want to remove it?
          <a :href="result.deleteUrl" class="text-red-500 hover:text-red-400 font-medium underline">Delete this file</a>
        </p>
      </div>
    </template>

    <!-- ── ERROR ── -->
    <div v-if="stage === 'error' && error" class="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
      <div class="flex items-start gap-3">
        <svg class="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 001.75-2.75L13.75 4a2 2 0 00-3.5 0L3.25 16.25A2 2 0 005.07 19z"/>
        </svg>
        <div class="flex-1">
          <p class="text-sm text-red-700 dark:text-red-400">{{ error }}</p>
          <button @click="reset" class="text-xs text-red-500 hover:text-red-400 mt-1 underline">Try again</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUpload, formatSize } from '../../composables/useUpload.js'
import { useClipboard } from '@vueuse/core'

const {
  cachedFile, fileHash, hashProgress, uploadProgress,
  isHashing, isUploading, result, error, stage,
  isReady, readableSize, sizeLimit,
  acceptFile, upload, reset,
} = useUpload()

const fileInput = ref(null)
const dragging = ref(false)
const origin = typeof window !== 'undefined' ? window.location.origin : 'https://filesterr.com'

const { copy, copied } = useClipboard()

async function onDrop(e) {
  dragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file) await acceptFile(file)
}

async function onSelect(e) {
  const file = e.target.files?.[0]
  if (file) await acceptFile(file)
  // Reset input so same file can be reselected after reset
  if (fileInput.value) fileInput.value.value = ''
}
</script>