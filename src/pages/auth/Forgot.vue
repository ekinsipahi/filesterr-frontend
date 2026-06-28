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
          <h1 class="font-display text-2xl font-extrabold mb-2">{{ t('auth.forgot.checkEmailTitle') }}</h1>
          <p class="text-sm text-zinc-500 mb-6">
            <i18n-t keypath="auth.forgot.checkEmailBody" tag="span">
              <template #email>
                <strong class="text-zinc-900 dark:text-white">{{ form.email }}</strong>
              </template>
            </i18n-t>
          </p>
          <a href="/login" class="btn-primary text-sm">{{ t('auth.forgot.backToSignIn') }}</a>
        </div>

        <!-- Form state -->
        <template v-else>
          <div class="text-center mb-8">
            <h1 class="font-display text-2xl font-extrabold mb-2">{{ t('auth.forgot.title') }}</h1>
            <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ t('auth.forgot.subtitle') }}</p>
          </div>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">{{ t('auth.forgot.emailLabel') }}</label>
              <input
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                class="input"
                :placeholder="t('auth.forgot.emailPlaceholder')"
              />
            </div>

            <button type="submit" class="btn-primary w-full justify-center py-3 text-sm" :disabled="loading">
              <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {{ loading ? t('auth.forgot.sending') : t('auth.forgot.sendBtn') }}
            </button>
          </form>

          <p class="text-center text-sm text-zinc-500 mt-6">
            <a href="/login" class="text-brand-500 hover:underline">{{ t('auth.forgot.backLink') }}</a>
          </p>
        </template>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import AuthLayout from '../../components/layout/AuthLayout.vue'
import { forgotPassword } from '../../api/index.js'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: computed(() => t('pageMeta.forgot.title')),
  meta: [{ name: 'robots', content: 'noindex' }],
})

const form = reactive({ email: '' })
const loading = ref(false)
const sent = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    await forgotPassword(form.email)
    sent.value = true
  } catch {
    // Always show success — don't leak whether email exists
    sent.value = true
  } finally {
    loading.value = false
  }
}
</script>
