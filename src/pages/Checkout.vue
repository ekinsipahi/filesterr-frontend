<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">

    <!-- Top bar -->
    <header class="glass border-b border-zinc-200 dark:border-white/5">
      <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center shadow-glow">
            <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
          </div>
          <span class="font-display font-bold text-lg tracking-tight">Filesterr</span>
        </a>

        <!-- Step indicator -->
        <div class="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
          <span class="flex items-center gap-1.5">
            <span class="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </span>
            Create account
          </span>
          <div class="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
          <span class="flex items-center gap-1.5 text-zinc-900 dark:text-white font-semibold">
            <span class="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-[10px]">2</span>
            Choose payment
          </span>
          <div class="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
          <span class="flex items-center gap-1.5">
            <span class="w-5 h-5 rounded-full border-2 border-zinc-300 dark:border-zinc-600 text-zinc-400 flex items-center justify-center font-bold text-[10px]">3</span>
            All set
          </span>
        </div>

        <a href="/dashboard" class="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
          Skip for now →
        </a>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 max-w-5xl mx-auto w-full px-6 py-10">

      <!-- Invalid plan guard -->
      <div v-if="plan && !planData" class="flex flex-col items-center justify-center py-32 text-center">
        <p class="text-zinc-400 mb-4">Invalid plan selected.</p>
        <a href="/pricing" class="btn-primary text-sm">View Plans</a>
      </div>
      <div v-else-if="!plan" class="flex flex-col items-center justify-center py-32 text-center">
        <p class="text-zinc-400 mb-4">Loading...</p>
      </div>

      <template v-else-if="planData">

        <!-- Header -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            :class="plan === 'promax'
              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
              : plan === 'pro'
                ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            {{ plan === 'promax' ? 'Pro Max Plan' : plan === 'pro' ? 'Pro Plan' : 'Premium Plan' }}
          </div>
          <h1 class="font-display text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">
            Activate your plan
          </h1>
          <p class="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mx-auto">
            Choose how you'd like to pay. All methods unlock your plan instantly after confirmation.
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-6">

          <!-- Payment options — left 2/3 -->
          <div class="lg:col-span-2 space-y-4">

            <!-- Crypto -->
            <div class="card p-6 border-2 border-brand-500 relative overflow-hidden">
              <!-- Glow bg -->
              <div class="absolute inset-0 bg-brand-500/3 dark:bg-brand-500/5 pointer-events-none" />

              <div class="flex items-start justify-between gap-4 mb-5">
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                    <!-- Bitcoin-ish icon -->
                    <svg class="w-6 h-6 text-brand-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-bold text-zinc-900 dark:text-white">Pay with Crypto</h3>
                    <p class="text-xs text-zinc-400 mt-0.5">One-time or recurring via crypto wallet</p>
                  </div>
                </div>
                <span class="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-semibold">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                  Available
                </span>
              </div>

              <!-- Accepted coins -->
              <div class="flex flex-wrap gap-2 mb-5">
                <span v-for="coin in coins" :key="coin.symbol"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  <span>{{ coin.emoji }}</span>
                  {{ coin.symbol }}
                </span>
              </div>

              <div class="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 mb-5 text-sm text-zinc-500 dark:text-zinc-400 space-y-2">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Plan activates after 1 confirmation on-chain
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  Non-custodial · you keep your keys
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Auto-renew by sending again before expiry
                </div>
              </div>

              <!-- Error message -->
              <p v-if="cryptoError" class="mb-3 text-sm text-red-500 dark:text-red-400 text-center">{{ cryptoError }}</p>

              <button
                @click="startCryptoPayment"
                :disabled="cryptoLoading"
                class="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <svg v-if="cryptoLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                {{ cryptoLoading ? 'Preparing payment…' : 'Continue with Crypto' }}
              </button>
            </div>

            <!-- Polar.sh — coming soon -->
            <div class="card p-6 opacity-60 relative select-none">
              <div class="absolute inset-0 rounded-2xl backdrop-blur-[1px]" />

              <div class="flex items-start justify-between gap-4 mb-5">
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                    <svg class="w-6 h-6 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      Subscribe with Polar.sh
                    </h3>
                    <p class="text-xs text-zinc-400 mt-0.5">Card, Apple Pay, Google Pay — recurring billing</p>
                  </div>
                </div>
                <span class="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-xs font-semibold">
                  Coming soon
                </span>
              </div>

              <div class="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 mb-5 text-sm text-zinc-400 space-y-2">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                  Credit / debit card
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Cancel anytime from dashboard
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  Managed billing via Polar.sh
                </div>
              </div>

              <button disabled class="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 font-semibold text-sm cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>

          <!-- Plan summary sidebar -->
          <div class="space-y-4">
            <div class="card p-5 sticky top-6">
              <h3 class="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-4">Order summary</h3>

              <!-- Plan name -->
              <div class="flex items-center gap-3 mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  :class="plan === 'promax'
                    ? 'bg-purple-50 dark:bg-purple-900/20'
                    : plan === 'pro'
                      ? 'bg-violet-50 dark:bg-violet-900/20'
                      : 'bg-amber-50 dark:bg-amber-900/20'">
                  <svg class="w-5 h-5"
                    :class="plan === 'promax' ? 'text-purple-500' : plan === 'pro' ? 'text-violet-500' : 'text-amber-500'"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-bold text-zinc-900 dark:text-white capitalize">{{ planData.slug === 'promax' ? 'Pro Max' : planData.slug }} Plan</p>
                  <p class="text-xs text-zinc-400">
                    {{ billingMode === 'annual' ? 'Annual billing' : 'Monthly billing' }}
                  </p>
                </div>
              </div>

              <!-- Billing toggle -->
              <div class="flex items-center gap-3 mb-5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800">
                <button
                  @click="billingMode = 'monthly'"
                  class="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  :class="billingMode === 'monthly'
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'"
                >Monthly</button>
                <button
                  @click="billingMode = 'annual'"
                  class="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1"
                  :class="billingMode === 'annual'
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'"
                >
                  Annual
                  <span class="px-1.5 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-[10px] font-bold leading-none">-20%</span>
                </button>
              </div>

              <!-- 12+1 months perk (annual only) -->
              <div v-if="billingMode === 'annual'" class="mb-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800">
                <svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                </svg>
                <span class="text-xs font-semibold text-brand-700 dark:text-brand-300">12+1 months — 1 month free!</span>
              </div>

              <!-- Features -->
              <ul class="space-y-2.5 mb-5">
                <li v-for="f in planFeatures" :key="f" class="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ f }}
                </li>
              </ul>

              <!-- Price -->
              <div class="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
                <template v-if="billingMode === 'monthly'">
                  <div class="flex items-end justify-between">
                    <span class="text-sm text-zinc-500">Monthly</span>
                    <div class="text-right">
                      <span class="text-2xl font-extrabold text-zinc-900 dark:text-white">${{ planData.price.monthly }}</span>
                      <span class="text-xs text-zinc-400">/mo</span>
                    </div>
                  </div>
                  <p class="text-xs text-zinc-400 mt-1.5">Billed monthly. Switch to annual to save 20%.</p>
                </template>
                <template v-else>
                  <div class="flex items-end justify-between">
                    <span class="text-sm text-zinc-500">Annual total</span>
                    <div class="text-right">
                      <span class="text-2xl font-extrabold text-zinc-900 dark:text-white">${{ annualTotal }}</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between mt-1.5">
                    <span class="text-xs text-zinc-400">${{ monthlyEquiv }}/mo × 12 months</span>
                    <span class="text-xs font-semibold text-brand-500">Save ${{ (planData.price.monthly * 12 - Number(annualTotal)).toFixed(2) }}</span>
                  </div>
                  <p class="text-xs text-zinc-400 mt-1.5">Billed once per year. Includes 1 bonus month.</p>
                </template>
              </div>
            </div>

            <!-- Skip -->
            <div class="card p-4 text-center">
              <p class="text-xs text-zinc-400 mb-2">Not ready to commit?</p>
              <a href="/dashboard" class="text-sm font-semibold text-brand-500 hover:underline">
                Continue with Free plan →
              </a>
            </div>
          </div>

        </div>

      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { PLANS } from '../data/plans.js'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Checkout — Filesterr',
  meta: [{ name: 'robots', content: 'noindex' }],
})

const plan = ref(null)
const billingMode = ref('monthly') // 'monthly' | 'annual'

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  plan.value = params.get('plan')
  if (params.get('billing') === 'annual') billingMode.value = 'annual'
})

const planData = computed(() =>
  PLANS.find(p => p.slug === plan.value) ?? null
)

const annualTotal    = computed(() => planData.value ? (planData.value.price.yearly * 12).toFixed(2) : '0.00')
const monthlyEquiv   = computed(() => planData.value?.price.yearly.toFixed(2) ?? '0.00')
const displayPrice   = computed(() => billingMode.value === 'annual' ? annualTotal.value : (planData.value?.price.monthly.toFixed(2) ?? '0.00'))

const planFeatures = computed(() => {
  const p = planData.value
  if (!p) return []
  return [
    `${p.storage} storage`,
    `${p.perFile} per file`,
    'No ads on downloads',
    'Password protection',
    'One-time & expirable links',
    p.slug === 'promax' ? 'Priority CDN speed' : 'Advanced analytics',
    'Direct download links',
  ]
})

const coins = [
  { symbol: 'BTC',  emoji: '₿' },
  { symbol: 'ETH',  emoji: 'Ξ' },
  { symbol: 'USDT', emoji: '₮' },
  { symbol: 'SOL',  emoji: '◎' },
  { symbol: 'BNB',  emoji: '⬡' },
  { symbol: 'USDC', emoji: '$' },
]

const cryptoLoading = ref(false)
const cryptoError   = ref('')

async function startCryptoPayment() {
  if (!planData.value) return
  cryptoLoading.value = true
  cryptoError.value   = ''

  try {
    const token = localStorage.getItem('access_token') ?? ''
    const resp  = await fetch('/api/v1/payments/create/', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        plan:           plan.value,
        billing_period: billingMode.value,
      }),
    })

    const data = await resp.json()

    if (!resp.ok) {
      cryptoError.value = data?.error?.message || 'Payment could not be started. Please try again.'
      return
    }

    // Redirect to NOWPayments invoice page
    window.location.href = data.invoice_url
  } catch {
    cryptoError.value = 'Network error. Please check your connection and try again.'
  } finally {
    cryptoLoading.value = false
  }
}
</script>
