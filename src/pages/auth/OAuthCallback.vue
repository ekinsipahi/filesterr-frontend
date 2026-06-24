<template>
  <AuthLayout>
    <div class="w-full max-w-md">
      <div class="card p-8 shadow-xl text-center">

        <!-- Error -->
        <div v-if="error">
          <div class="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-5">
            <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <h1 class="font-display text-xl font-extrabold mb-2">Sign in failed</h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{{ error }}</p>
          <a href="/login" class="btn-primary text-sm">Back to Sign In</a>
        </div>

        <!-- Loading -->
        <div v-else>
          <svg class="w-10 h-10 animate-spin mx-auto text-brand-500" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-4">Completing sign in...</p>
        </div>

      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from '../../components/layout/AuthLayout.vue'
import { handleOAuthCallback } from '../../api/index.js'

const route = useRoute()
const error = ref(null)

onMounted(async () => {
  const provider = route.params.provider
  const code = route.query.code
  const state = route.query.state ?? ''

  if (!code) {
    error.value = 'No authorization code received from the provider.'
    return
  }

  try {
    await handleOAuthCallback(provider, code, state)
    const oauthPlan = sessionStorage.getItem('oauth_plan')
    sessionStorage.removeItem('oauth_plan')
    if (oauthPlan && ['premium', 'pro', 'promax'].includes(oauthPlan)) {
      window.location.href = `/checkout?plan=${oauthPlan}`
    } else {
      const next = sessionStorage.getItem('oauth_redirect') || '/dashboard'
      sessionStorage.removeItem('oauth_redirect')
      window.location.href = next
    }
  } catch (e) {
    error.value = e.message
  }
})
</script>
