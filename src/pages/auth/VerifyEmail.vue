<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
    <div class="w-full max-w-md text-center">

      <!-- Logo -->
      <a href="/" class="inline-flex items-center gap-2.5 mb-10">
        <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-glow">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span class="font-display font-bold text-xl tracking-tight text-zinc-900 dark:text-white">Filesterr</span>
      </a>

      <div class="card p-10">

        <!-- Loading -->
        <div v-if="status === 'loading'" class="flex flex-col items-center gap-4">
          <svg class="w-10 h-10 animate-spin text-brand-500" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ t('auth.verify.verifying') }}</p>
        </div>

        <!-- Success -->
        <div v-else-if="status === 'success'" class="flex flex-col items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mx-auto">
            <svg class="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div>
            <h1 class="font-display text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">{{ t('auth.verify.successTitle') }}</h1>
            <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ t('auth.verify.successBody') }}</p>
          </div>
        </div>

        <!-- Error -->
        <div v-else class="flex flex-col items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div>
            <h1 class="font-display text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">{{ t('auth.verify.errorTitle') }}</h1>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{{ error }}</p>
            <a href="/login" class="btn-primary text-sm">Back to Sign In</a>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { verifyEmail } from '../../api/index.js'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({ title: 'Verify Email — Filesterr' })

const status = ref('loading')
const error  = ref('')

onMounted(async () => {
  const token = new URLSearchParams(window.location.search).get('token')
  if (!token) {
    status.value = 'error'
    error.value  = 'No verification token found. Please use the link from your email.'
    return
  }
  try {
    const data = await verifyEmail(token)
    status.value = 'success'
    // Redirect to checkout (if plan was pending) or dashboard
    const pendingPlan = sessionStorage.getItem('oauth_plan')
      || sessionStorage.getItem('pending_plan')
    setTimeout(() => {
      if (pendingPlan && ['premium', 'pro', 'promax'].includes(pendingPlan)) {
        sessionStorage.removeItem('pending_plan')
        window.location.href = `/checkout?plan=${pendingPlan}`
      } else {
        window.location.href = '/dashboard'
      }
    }, 1500)
  } catch (e) {
    status.value = 'error'
    error.value  = e.message
  }
})
</script>
