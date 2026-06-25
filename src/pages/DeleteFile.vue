<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-20">
    <div class="w-full max-w-md">
      <div class="card p-10 text-center shadow-2xl">

        <!-- Icon -->
        <div class="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-colors"
          :class="{
            'bg-red-50 dark:bg-red-900/20': state === 'confirm',
            'bg-brand-50 dark:bg-brand-900/20': state === 'deleted',
            'bg-zinc-100 dark:bg-zinc-800': state === 'loading',
          }">
          <svg v-if="state === 'confirm'" class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          <svg v-else-if="state === 'deleted'" class="w-7 h-7 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <svg v-else class="w-7 h-7 text-zinc-400 animate-spin-slow" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        </div>

        <!-- Confirm state -->
        <template v-if="state === 'confirm'">
          <h1 class="font-display text-2xl font-bold mb-2">{{ t('deleteFile.confirmTitle') }}</h1>
          <p class="text-zinc-400 text-sm mb-8 leading-relaxed">
            <i18n-t keypath="deleteFile.confirmBody" tag="span">
              <template #strong>
                <strong class="text-zinc-900 dark:text-white">{{ t('deleteFile.permanent') }}</strong>
              </template>
            </i18n-t>
          </p>
          <div class="flex gap-3">
            <a href="/" class="btn-ghost flex-1 justify-center">{{ t('deleteFile.cancel') }}</a>
            <button @click="deleteFile"
              class="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-semibold text-sm transition-all shadow-sm">
              {{ t('deleteFile.confirmBtn') }}
            </button>
          </div>
        </template>

        <!-- Loading state -->
        <template v-else-if="state === 'loading'">
          <h1 class="font-display text-xl font-bold mb-2">{{ t('deleteFile.deletingTitle') }}</h1>
          <p class="text-zinc-400 text-sm">{{ t('deleteFile.deletingBody') }}</p>
        </template>

        <!-- Deleted state -->
        <template v-else-if="state === 'deleted'">
          <h1 class="font-display text-2xl font-bold mb-2">{{ t('deleteFile.deletedTitle') }}</h1>
          <p class="text-zinc-400 text-sm mb-8">{{ t('deleteFile.deletedBody') }}</p>
          <a href="/" class="btn-primary w-full justify-center">{{ t('deleteFile.backToHome') }}</a>
        </template>

        <!-- Error state -->
        <template v-else-if="state === 'error'">
          <h1 class="font-display text-xl font-bold mb-2 text-red-500">{{ t('deleteFile.errorTitle') }}</h1>
          <p class="text-zinc-400 text-sm mb-8">{{ errorMsg }}</p>
          <a href="/" class="btn-ghost w-full justify-center">{{ t('deleteFile.goHome') }}</a>
        </template>

      </div>

      <!-- Logo -->
      <div class="text-center mt-8">
        <a href="/" class="font-display font-bold text-lg text-zinc-400 hover:text-brand-500 transition-colors">
          Filesterr
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()
const state = ref('confirm')
const errorMsg = ref('')

async function deleteFile() {
  state.value = 'loading'
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null
    const res = await fetch(`/api/v1/files/delete/${route.params.token}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || `Server error ${res.status}`)
    }
    state.value = 'deleted'
  } catch (e) {
    errorMsg.value = e.message || 'Could not delete the file. The link may have already been used.'
    state.value = 'error'
  }
}
</script>