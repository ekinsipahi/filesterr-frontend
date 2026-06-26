<template>
  <div class="min-h-screen">
    <!-- BG decoration -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/5 dark:bg-brand-500/8 blur-[80px] rounded-full" />
    </div>

    <div class="max-w-xl mx-auto px-6 pt-28 pb-20">

      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-5">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-500" />
          {{ t('upload.badge') }}
        </div>
        <h1 class="font-display text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">
          {{ t('upload.heading') }} <span class="text-gradient">{{ t('upload.headingHighlight') }}</span>
        </h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          {{ t('upload.subtext', { limit: planLimitLabel }) }}
          <a href="/pricing" class="text-brand-500 hover:underline font-medium">{{ t('upload.upgrade') }}</a> {{ t('upload.upgradeFor') }}
        </p>
      </div>

      <!-- Upload widget card -->
      <div class="card p-5 shadow-xl">
        <UploadWidget />
      </div>

      <!-- Perks -->
      <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
        <div v-for="perk in perks" :key="perk" class="flex items-center gap-1.5 text-xs text-zinc-400">
          <svg class="w-3 h-3 text-brand-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          {{ perk }}
        </div>
      </div>

      <!-- Signup upsell (only shown when anonymous) -->
      <div v-if="!isLoggedIn" class="mt-8 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-zinc-900 dark:text-white">{{ t('upload.upsellTitle') }}</p>
            <p class="text-xs text-zinc-500 mt-0.5">{{ t('upload.upsellSub') }}</p>
          </div>
          <a href="/register" class="btn-primary text-xs py-2 px-3 shrink-0">{{ t('upload.freeSignup') }}</a>
        </div>
      </div>

    </div>

    <!-- SEO section — below the fold, informational -->
    <div class="max-w-xl mx-auto px-6 pb-16 mt-2">
      <div class="border-t border-zinc-100 dark:border-zinc-800/60 pt-10">
        <h2 class="text-lg font-display font-bold text-zinc-800 dark:text-zinc-200 mb-4">
          {{ t('upload.seoH2') }}
        </h2>
        <div class="space-y-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          <p>{{ t('upload.seoP1') }}</p>
          <p>{{ t('upload.seoP2') }}</p>
          <p>{{ t('upload.seoP3') }}</p>
        </div>
        <div class="flex flex-wrap gap-3 mt-5">
          <a href="/share-files" class="text-xs text-brand-500 hover:underline">Share files online →</a>
          <a href="/secure-file-sharing" class="text-xs text-brand-500 hover:underline">Secure file sharing →</a>
          <a href="/file-sharing-no-login" class="text-xs text-brand-500 hover:underline">File sharing no login →</a>
          <a href="/large-file-sharing" class="text-xs text-brand-500 hover:underline">Large file sharing →</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import UploadWidget from '../components/upload/UploadWidget.vue'
import { formatSize } from '../composables/useUpload.js'
import { getMe, setUserState } from '../api/index.js'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: 'Upload & Share Files Free — No Signup | Filesterr',
  meta: [
    { name: 'description',        content: 'Upload any file and get a shareable link in seconds. 200MB free, no account needed. Password protection, expiry dates, and real-time download analytics.' },
    { name: 'robots',             content: 'index, follow' },
    { property: 'og:title',       content: 'Upload & Share Files Free — No Signup | Filesterr' },
    { property: 'og:description', content: 'Upload any file. Share a link. See who downloads it. 200MB free — no account, no credit card.' },
    { property: 'og:image',       content: 'https://filesterr.com/logo.png' },
    { name: 'twitter:card',       content: 'summary_large_image' },
    { name: 'twitter:title',      content: 'Upload & Share Files Free — No Signup | Filesterr' },
    { name: 'twitter:description', content: 'Upload any file. Share a link. See who downloads it. 200MB free.' },
  ],
  link: [{ rel: 'canonical', href: 'https://filesterr.com/upload' }],
})

const PLAN_LIMITS = {
  anonymous: 200 * 1024 * 1024,
  free:      1   * 1024 * 1024 * 1024,
  premium:   5   * 1024 * 1024 * 1024,
  pro:       20  * 1024 * 1024 * 1024,
  promax:    50  * 1024 * 1024 * 1024,
}

const userPlan   = ref('anonymous')
const isLoggedIn = ref(false)

onMounted(async () => {
  if (window.__USER__?.plan) {
    userPlan.value   = window.__USER__.plan
    isLoggedIn.value = window.__USER__.isAuthenticated
    return
  }
  const token = localStorage.getItem('access_token')
  if (!token) return
  const user = await getMe()
  if (user?.plan) {
    userPlan.value   = user.plan
    isLoggedIn.value = true
    setUserState(user)
  }
})

const planLimitLabel = computed(() => formatSize(PLAN_LIMITS[userPlan.value] ?? PLAN_LIMITS.anonymous))

const perks = computed(() => [
  t('upload.perk1'),
  t('upload.perk2'),
  t('upload.perk3'),
  t('upload.perk4'),
])
</script>
