<template>
  <AuthLayout>
    <div class="w-full max-w-md">
      <div class="card p-8 shadow-xl">

        <!-- Success -->
        <div v-if="done" class="text-center py-4">
          <div class="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-5">
            <svg class="w-7 h-7 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h1 class="font-display text-2xl font-extrabold mb-2">{{ t('auth.reset.successTitle') }}</h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{{ t('auth.reset.successBody') }}</p>
          <a href="/login" class="btn-primary text-sm">{{ t('auth.reset.signInBtn') }}</a>
        </div>

        <!-- No token in URL -->
        <div v-else-if="!token" class="text-center py-4">
          <h1 class="font-display text-xl font-extrabold text-red-600 mb-3">{{ t('auth.reset.invalidTitle') }}</h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{{ t('auth.reset.invalidBody') }}</p>
          <a href="/forgot" class="btn-primary text-sm">{{ t('auth.reset.requestNewLink') }}</a>
        </div>

        <!-- Form -->
        <template v-else>
          <div class="text-center mb-8">
            <h1 class="font-display text-2xl font-extrabold mb-2">{{ t('auth.reset.title') }}</h1>
            <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ t('auth.reset.subtitle') }}</p>
          </div>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">{{ t('auth.reset.newPasswordLabel') }}</label>
              <input
                v-model="form.password"
                type="password"
                required
                minlength="8"
                autocomplete="new-password"
                class="input"
                :placeholder="t('auth.reset.passwordPlaceholder')"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">{{ t('auth.reset.confirmLabel') }}</label>
              <input
                v-model="form.confirm"
                type="password"
                required
                autocomplete="new-password"
                class="input"
                :class="form.confirm && form.confirm !== form.password ? 'border-red-400 focus:ring-red-500/20' : ''"
                :placeholder="t('auth.reset.confirmPlaceholder')"
              />
              <p v-if="form.confirm && form.confirm !== form.password" class="text-[10px] text-red-500 mt-1">
                {{ t('auth.reset.passwordMismatch') }}
              </p>
            </div>

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
              {{ loading ? t('auth.reset.saving') : t('auth.reset.setPasswordBtn') }}
            </button>
          </form>
        </template>

      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AuthLayout from '../../components/layout/AuthLayout.vue'
import { resetPassword } from '../../api/index.js'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: 'Set New Password — Filesterr',
  meta: [{ name: 'robots', content: 'noindex' }],
})

const token = typeof window !== 'undefined'
  ? new URLSearchParams(window.location.search).get('token')
  : null

const form = reactive({ password: '', confirm: '' })
const loading = ref(false)
const error = ref(null)
const done = ref(false)

async function onSubmit() {
  if (form.password !== form.confirm) {
    error.value = t('auth.reset.passwordMismatch')
    return
  }
  loading.value = true
  error.value = null
  try {
    await resetPassword(token, form.password)
    done.value = true
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
