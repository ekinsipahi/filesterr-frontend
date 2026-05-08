<template>
  <AuthLayout>
    <div class="w-full max-w-md">
      <div class="card p-8 shadow-xl">

        <!-- Sent state -->
        <div v-if="sent" class="text-center py-4">
          <div class="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-5">
            <svg class="w-7 h-7 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <h1 class="font-display text-2xl font-extrabold mb-2">Check your email</h1>
          <p class="text-sm text-zinc-500 mb-6">
            If an account exists for <strong class="text-zinc-900 dark:text-white">{{ form.email }}</strong>,
            we've sent a reset link. Check your spam folder too.
          </p>
          <a href="/login" class="btn-primary text-sm">Back to Sign In</a>
        </div>

        <!-- Form state -->
        <template v-else>
          <div class="text-center mb-8">
            <h1 class="font-display text-2xl font-extrabold mb-2">Reset your password</h1>
            <p class="text-sm text-zinc-500 dark:text-zinc-400">We'll send a reset link to your email.</p>
          </div>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Email</label>
              <input
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                class="input"
                placeholder="you@example.com"
              />
            </div>

            <button type="submit" class="btn-primary w-full justify-center py-3 text-sm" :disabled="loading">
              <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {{ loading ? 'Sending...' : 'Send Reset Link' }}
            </button>
          </form>

          <p class="text-center text-sm text-zinc-500 mt-6">
            <a href="/login" class="text-brand-500 hover:underline">← Back to Sign In</a>
          </p>
        </template>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AuthLayout from '../../components/layout/AuthLayout.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Reset Password — Filesterr',
  meta: [{ name: 'robots', content: 'noindex' }],
})

const form = reactive({ email: '' })
const loading = ref(false)
const sent = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    const csrf = document.cookie.match(/csrftoken=([^;]+)/)?.[1] || ''
    await fetch('/api/v1/auth/password-reset/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrf },
      body: JSON.stringify({ email: form.email }),
    })
    // Always show success (security — don't leak if email exists)
    sent.value = true
  } finally {
    loading.value = false
  }
}
</script>