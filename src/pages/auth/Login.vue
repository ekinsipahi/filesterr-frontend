<template>
  <AuthLayout>
    <div class="w-full max-w-md">
      <div class="card p-8 shadow-xl">

        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="font-display text-2xl font-extrabold mb-2">Welcome back</h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">Sign in to your Filesterr account</p>
        </div>

        <!-- OAuth buttons -->
        <div class="space-y-3 mb-6">
          <a href="/auth/google/"
            class="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors text-sm font-medium">
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </a>
          <a href="/auth/github/"
            class="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors text-sm font-medium">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Continue with GitHub
          </a>
        </div>

        <!-- Divider -->
        <div class="relative mb-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-zinc-200 dark:border-zinc-700" />
          </div>
          <div class="relative flex justify-center">
            <span class="px-3 text-xs text-zinc-400 bg-white dark:bg-zinc-900">or continue with email</span>
          </div>
        </div>

        <!-- Form -->
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
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Password</label>
              <a href="/forgot" class="text-xs text-brand-500 hover:text-brand-400 hover:underline">Forgot password?</a>
            </div>
            <input
              v-model="form.password"
              type="password"
              required
              autocomplete="current-password"
              class="input"
              placeholder="••••••••"
            />
          </div>

          <!-- Error -->
          <div v-if="error" class="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p class="text-xs text-red-600 dark:text-red-400">{{ error }}</p>
          </div>

          <button
            type="submit"
            class="btn-primary w-full justify-center py-3 text-sm"
            :disabled="loading"
          >
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <!-- Switch to register -->
        <p class="text-center text-sm text-zinc-500 mt-6">
          Don't have an account?
          <a href="/register" class="text-brand-500 font-semibold hover:underline ml-1">Sign up free</a>
        </p>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '../../components/layout/AuthLayout.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Sign In — Filesterr',
  meta: [
    { name: 'description', content: 'Sign in to your Filesterr account to access your files, analytics, and settings.' },
    { name: 'robots', content: 'noindex' },
  ],
})

const router = useRouter()
const form = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref(null)

async function onSubmit() {
  loading.value = true
  error.value = null
  try {
    const csrf = document.cookie.match(/csrftoken=([^;]+)/)?.[1] || ''
    const res = await fetch('/api/v1/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrf },
      credentials: 'include',
      body: JSON.stringify({ email: form.email, password: form.password }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || data.detail || 'Invalid email or password.')
    }

    const data = await res.json()

    // Update window user state
    if (typeof window !== 'undefined' && data.user) {
      window.__USER__ = {
        isAuthenticated: true,
        isPro: data.user.plan === 'pro' || data.user.plan === 'enterprise',
        plan: data.user.plan,
      }
    }

    // Redirect to dashboard or intended page
    const redirect = new URLSearchParams(window.location.search).get('next') || '/dashboard'
    window.location.href = redirect
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>