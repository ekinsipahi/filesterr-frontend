<template>
  <AuthLayout>
    <div class="w-full max-w-md">
      <div class="card p-8 shadow-xl">

        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="font-display text-2xl font-extrabold mb-2">Get started free</h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">
            10GB storage · Real-time analytics · No credit card
          </p>
        </div>

        <!-- Plan badge if from pricing -->
        <div v-if="selectedPlan" class="mb-6 p-3.5 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div>
            <p class="text-xs font-bold text-brand-700 dark:text-brand-400 capitalize">{{ selectedPlan }} plan selected</p>
            <p class="text-xs text-zinc-500">You can upgrade after creating your account</p>
          </div>
        </div>

        <!-- OAuth -->
        <div class="space-y-3 mb-6">
          <a :href="`/auth/google/${selectedPlan ? `?plan=${selectedPlan}` : ''}`"
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
            <span class="px-3 text-xs text-zinc-400 bg-white dark:bg-zinc-900">or register with email</span>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="onSubmit" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Full name</label>
            <input
              v-model="form.name"
              type="text"
              required
              autocomplete="name"
              class="input"
              placeholder="John Doe"
            />
          </div>
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
            <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Password</label>
            <input
              v-model="form.password"
              type="password"
              required
              minlength="8"
              autocomplete="new-password"
              class="input"
              placeholder="At least 8 characters"
            />
            <!-- Strength indicator -->
            <div class="flex gap-1 mt-2">
              <div v-for="n in 4" :key="n"
                class="flex-1 h-1 rounded-full transition-colors duration-300"
                :class="passwordStrength >= n ? strengthColors[passwordStrength - 1] : 'bg-zinc-200 dark:bg-zinc-700'"
              />
            </div>
            <p v-if="form.password" class="text-[10px] mt-1.5" :class="strengthTextColors[passwordStrength - 1]">
              {{ strengthLabels[passwordStrength - 1] }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Confirm password</label>
            <input
              v-model="form.confirm"
              type="password"
              required
              autocomplete="new-password"
              class="input"
              :class="form.confirm && form.confirm !== form.password ? 'border-red-400 focus:ring-red-500/20' : ''"
              placeholder="••••••••"
            />
            <p v-if="form.confirm && form.confirm !== form.password" class="text-[10px] text-red-500 mt-1">Passwords don't match</p>
          </div>

          <!-- Error -->
          <div v-if="error" class="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p class="text-xs text-red-600 dark:text-red-400">{{ error }}</p>
          </div>

          <button
            type="submit"
            class="btn-primary w-full justify-center py-3 text-sm"
            :disabled="loading || (form.confirm && form.confirm !== form.password)"
          >
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ loading ? 'Creating account...' : 'Create Free Account' }}
          </button>

          <p class="text-center text-xs text-zinc-400">
            By signing up you agree to our
            <a href="/terms" class="text-brand-500 hover:underline">Terms</a> and
            <a href="/privacy" class="text-brand-500 hover:underline">Privacy Policy</a>.
          </p>
        </form>

        <!-- Switch to login -->
        <p class="text-center text-sm text-zinc-500 mt-6">
          Already have an account?
          <a href="/login" class="text-brand-500 font-semibold hover:underline ml-1">Sign in</a>
        </p>
      </div>

      <!-- What you get -->
      <div class="mt-6 grid grid-cols-3 gap-3">
        <div v-for="perk in perks" :key="perk.label" class="text-center p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div class="text-xl mb-1">{{ perk.icon }}</div>
          <div class="text-xs font-semibold text-zinc-900 dark:text-white">{{ perk.value }}</div>
          <div class="text-[10px] text-zinc-400 mt-0.5">{{ perk.label }}</div>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import AuthLayout from '../../components/layout/AuthLayout.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Create Free Account — Filesterr',
  meta: [
    { name: 'description', content: 'Create a free Filesterr account. Get 10GB storage, real-time download analytics, and visitor tracking. No credit card required.' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://filesterr.com/register' }],
})

// Get selected plan from URL query param (?plan=premium)
const selectedPlan = typeof window !== 'undefined'
  ? new URLSearchParams(window.location.search).get('plan')
  : null

const form = reactive({ name: '', email: '', password: '', confirm: '' })
const loading = ref(false)
const error = ref(null)

// Password strength
const passwordStrength = computed(() => {
  const p = form.password
  if (!p) return 0
  let score = 0
  if (p.length >= 8)  score++
  if (p.length >= 12) score++
  if (/[A-Z]/.test(p) && /[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  return Math.max(1, score)
})

const strengthColors  = ['bg-red-400',   'bg-amber-400', 'bg-yellow-400', 'bg-brand-500']
const strengthTextColors = ['text-red-500','text-amber-500','text-yellow-600','text-brand-500']
const strengthLabels  = ['Weak',          'Fair',          'Good',           'Strong']

const perks = [
  { icon: '📦', value: '10GB', label: 'Free storage' },
  { icon: '📊', value: 'Live', label: 'Analytics' },
  { icon: '🔒', value: 'AES-256', label: 'Encrypted' },
]

async function onSubmit() {
  if (form.password !== form.confirm) {
    error.value = "Passwords don't match."
    return
  }

  loading.value = true
  error.value = null

  try {
    const csrf = document.cookie.match(/csrftoken=([^;]+)/)?.[1] || ''
    const res = await fetch('/api/v1/auth/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrf },
      credentials: 'include',
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        plan: selectedPlan || 'free',
      }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      // Handle field errors
      if (data.email) throw new Error(`Email: ${Array.isArray(data.email) ? data.email[0] : data.email}`)
      if (data.password) throw new Error(`Password: ${Array.isArray(data.password) ? data.password[0] : data.password}`)
      throw new Error(data.error || data.detail || 'Registration failed. Please try again.')
    }

    // Redirect to dashboard after successful registration
    window.location.href = '/dashboard'
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>