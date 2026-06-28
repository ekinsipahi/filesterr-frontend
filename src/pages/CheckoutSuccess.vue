<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center px-6">

    <div class="max-w-md w-full text-center">

      <!-- Polling: waiting -->
      <template v-if="paymentStatus === 'waiting' || paymentStatus === 'confirming' || paymentStatus === 'pending'">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
          <svg class="w-10 h-10 text-amber-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        </div>
        <h1 class="font-display text-2xl font-extrabold text-zinc-900 dark:text-white mb-3">
          {{ $t('checkoutSuccessPage.waitingH1') }}
        </h1>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
          {{ $t('checkoutSuccessPage.waitingP') }}
        </p>
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-sm font-semibold">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          {{ $t('checkoutSuccessPage.checkingEvery') }}
        </div>
      </template>

      <!-- Success -->
      <template v-else-if="paymentStatus === 'finished' || paymentStatus === 'confirmed'">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center">
          <svg class="w-10 h-10 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h1 class="font-display text-2xl font-extrabold text-zinc-900 dark:text-white mb-3">
          {{ $t('checkoutSuccessPage.successH1') }}
        </h1>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm mb-8">
          {{ $t('checkoutSuccessPage.successP', { plan: planLabel }) }}
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/dashboard" class="btn-primary px-8 py-3">{{ $t('checkoutSuccessPage.toDashboard') }}</a>
          <a href="/upload" class="btn-secondary px-8 py-3">{{ $t('checkoutSuccessPage.uploadFile') }}</a>
        </div>
      </template>

      <!-- Failed / expired -->
      <template v-else-if="paymentStatus === 'failed' || paymentStatus === 'expired'">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        <h1 class="font-display text-2xl font-extrabold text-zinc-900 dark:text-white mb-3">
          {{ $t('checkoutSuccessPage.failedH1', { status: paymentStatus === 'expired' ? $t('checkoutSuccessPage.failedExpired') : $t('checkoutSuccessPage.failedFailed') }) }}
        </h1>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm mb-8">
          {{ $t('checkoutSuccessPage.failedP') }}
        </p>
        <a :href="`/checkout?plan=${plan}&billing=${billing}`" class="btn-primary px-8 py-3">
          {{ $t('checkoutSuccessPage.tryAgain') }}
        </a>
      </template>

      <!-- Unknown / loading -->
      <template v-else>
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <svg class="w-10 h-10 text-zinc-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        </div>
        <p class="text-zinc-400 text-sm">{{ $t('checkoutSuccessPage.checkingStatus') }}</p>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: computed(() => t('pageMeta.checkoutSuccess.title')),
  meta: [{ name: 'robots', content: 'noindex' }],
})

const paymentId     = ref(null)
const paymentStatus = ref(null)
const plan          = ref('')
const billing       = ref('monthly')

const POLL_INTERVAL = 10_000   // 10 seconds
const MAX_POLLS     = 36       // stop after 6 minutes
let pollCount = 0
let timer     = null

const TERMINAL = new Set(['finished', 'confirmed', 'failed', 'expired', 'refunded'])

const planLabel = computed(() => {
  const m = { premium: 'Premium', pro: 'Pro', promax: 'Pro Max' }
  return m[plan.value] || plan.value
})

async function fetchStatus() {
  if (!paymentId.value) return
  try {
    const token = localStorage.getItem('access_token') ?? ''
    const resp  = await fetch(`/api/v1/payments/${paymentId.value}/status/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!resp.ok) return
    const data     = await resp.json()
    paymentStatus.value = data.status
    plan.value          = data.plan || plan.value
    billing.value       = data.billing_period || billing.value

    if (TERMINAL.has(data.status)) {
      clearInterval(timer)
    }
  } catch {
    // ignore transient errors — keep polling
  }
}

async function poll() {
  pollCount++
  await fetchStatus()
  if (pollCount >= MAX_POLLS) clearInterval(timer)
}

onMounted(async () => {
  const params    = new URLSearchParams(window.location.search)
  paymentId.value = params.get('payment_id')
  plan.value      = params.get('plan') || ''
  billing.value   = params.get('billing') || 'monthly'

  if (!paymentId.value) {
    paymentStatus.value = 'failed'
    return
  }

  await fetchStatus()
  if (!TERMINAL.has(paymentStatus.value)) {
    timer = setInterval(poll, POLL_INTERVAL)
  }
})

onUnmounted(() => clearInterval(timer))
</script>
