<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">

    <!-- Hero -->
    <section class="border-b border-zinc-200 dark:border-zinc-800 py-16 px-6 bg-zinc-50 dark:bg-zinc-900/50">
      <div class="max-w-4xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-6">
          REST API
        </div>
        <h1 class="font-display text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4">{{ $t('docsPage.h1') }}</h1>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Programmatic access to file uploads, analytics, and more. Available on <strong class="text-zinc-900 dark:text-white">Pro</strong> and <strong class="text-zinc-900 dark:text-white">Pro Max</strong> plans.
        </p>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-6 py-14 space-y-16">

      <!-- API Key management -->
      <section>
        <h2 class="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-3">
          <svg class="w-6 h-6 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
          </svg>
          Your API Key
        </h2>

        <!-- Not logged in -->
        <div v-if="!isAuth" class="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 text-center">
          <p class="text-zinc-500 dark:text-zinc-400 mb-4">{{ $t('docsPage.signInToManage') }}</p>
          <a href="/login" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-sm hover:bg-brand-400 transition-colors">{{ $t('docsPage.signIn') }}</a>
        </div>

        <!-- Not Pro -->
        <div v-else-if="!isPro" class="rounded-2xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-900/10 p-8">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="font-semibold text-amber-900 dark:text-amber-300 mb-1">{{ $t('docsPage.proRequired') }}</p>
              <p class="text-sm text-amber-700 dark:text-amber-400 mb-4">{{ $t('docsPage.proRequiredSub') }}</p>
              <a href="/pricing" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-400 transition-colors">{{ $t('docsPage.upgradePlan') }}</a>
            </div>
          </div>
        </div>

        <!-- Pro user — key management -->
        <div v-else class="space-y-4">
          <!-- Key display -->
          <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{{ $t('docsPage.apiKey') }}</span>
              <span class="text-xs px-2 py-0.5 rounded-full font-semibold"
                :class="apiKey ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'">
                {{ apiKey ? $t('docsPage.statusActive') : $t('docsPage.statusNotGenerated') }}
              </span>
            </div>

            <div v-if="apiKey" class="flex items-center gap-3">
              <code class="flex-1 font-mono text-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-800 dark:text-zinc-200 truncate">
                {{ showKey ? apiKey : apiKey.slice(0, 8) + '•'.repeat(32) }}
              </code>
              <button @click="showKey = !showKey"
                class="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500"
                :title="showKey ? $t('docsPage.hideKey') : $t('docsPage.revealKey')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="showKey" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
              <button @click="copyKey"
                class="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500"
                :title="$t('docsPage.copyKey')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
            <p v-else class="text-sm text-zinc-500 dark:text-zinc-400">{{ $t('docsPage.noKeyYet') }}</p>

            <div class="flex gap-3 mt-5">
              <button @click="generateKey" :disabled="loading"
                class="px-4 py-2 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-400 disabled:opacity-50 transition-colors">
                {{ apiKey ? $t('docsPage.regenerateKey') : $t('docsPage.generateKey') }}
              </button>
              <button v-if="apiKey" @click="revokeKey" :disabled="loading"
                class="px-4 py-2 rounded-xl border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 disabled:opacity-50 transition-colors">
                {{ $t('docsPage.revoke') }}
              </button>
            </div>

            <p v-if="copied" class="text-xs text-green-600 dark:text-green-400 mt-3">{{ $t('docsPage.copiedClipboard') }}</p>
            <p v-if="error" class="text-xs text-red-500 mt-3">{{ error }}</p>
          </div>

          <p class="text-xs text-zinc-400">
            {{ $t('docsPage.keepSecretNote') }}
          </p>
        </div>
      </section>

      <!-- Authentication -->
      <section>
        <h2 class="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{{ $t('docsPage.authH2') }}</h2>
        <p class="text-zinc-500 dark:text-zinc-400 mb-6">Pass your API key in the <code class="text-brand-600 dark:text-brand-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm">Authorization</code> header on every request.</p>

        <div class="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden">
          <div class="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
            <span class="w-3 h-3 rounded-full bg-red-500/70" />
            <span class="w-3 h-3 rounded-full bg-amber-500/70" />
            <span class="w-3 h-3 rounded-full bg-green-500/70" />
            <span class="ml-2 text-xs text-zinc-500 font-mono">Shell</span>
          </div>
          <pre class="px-5 py-4 text-sm font-mono text-zinc-300 overflow-x-auto">curl https://filesterr.com/api/v1/files/ \
  -H <span class="text-green-400">"Authorization: Bearer fstr_YOUR_API_KEY"</span></pre>
        </div>
      </section>

      <!-- Base URL -->
      <section>
        <h2 class="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{{ $t('docsPage.baseUrlH2') }}</h2>
        <div class="rounded-2xl bg-zinc-950 border border-zinc-800 px-5 py-4 font-mono text-sm text-brand-400">
          https://filesterr.com/api/v1/
        </div>
      </section>

      <!-- Endpoints -->
      <section>
        <h2 class="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">{{ $t('docsPage.endpointsH2') }}</h2>

        <div class="space-y-4">
          <div v-for="ep in endpoints" :key="ep.method + ep.path"
            class="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <button @click="ep._open = !ep._open"
              class="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
              <span class="px-2.5 py-0.5 rounded-lg text-xs font-bold font-mono w-16 text-center shrink-0"
                :class="methodClass(ep.method)">{{ ep.method }}</span>
              <code class="text-sm font-mono text-zinc-800 dark:text-zinc-200 flex-1">{{ ep.path }}</code>
              <span class="text-xs text-zinc-400 hidden sm:block">{{ ep.summary }}</span>
              <svg class="w-4 h-4 text-zinc-400 shrink-0 transition-transform"
                :class="ep._open ? 'rotate-45' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
            </button>

            <div v-if="ep._open" class="border-t border-zinc-200 dark:border-zinc-800 px-6 py-5 space-y-5 bg-zinc-50 dark:bg-zinc-900/30">
              <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ ep.description }}</p>

              <div v-if="ep.params" class="space-y-2">
                <p class="text-xs font-bold uppercase tracking-widest text-zinc-400">Parameters</p>
                <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
                  <div v-for="p in ep.params" :key="p.name" class="flex items-start gap-4 px-4 py-3">
                    <code class="text-xs font-mono text-brand-600 dark:text-brand-400 w-32 shrink-0">{{ p.name }}</code>
                    <span class="text-xs text-zinc-500 w-16 shrink-0">{{ p.type }}</span>
                    <span class="text-xs text-zinc-500">{{ p.desc }}</span>
                  </div>
                </div>
              </div>

              <div v-if="ep.example">
                <p class="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Example</p>
                <div class="rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden">
                  <pre class="px-4 py-3 text-xs font-mono text-zinc-300 overflow-x-auto">{{ ep.example }}</pre>
                </div>
              </div>

              <div v-if="ep.response">
                <p class="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Response</p>
                <div class="rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden">
                  <pre class="px-4 py-3 text-xs font-mono text-zinc-300 overflow-x-auto">{{ ep.response }}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Rate limits -->
      <section>
        <h2 class="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">{{ $t('docsPage.rateLimitsH2') }}</h2>
        <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
          <div v-for="row in rateLimits" :key="row.plan" class="flex items-center gap-4 px-6 py-4">
            <span class="w-20 text-sm font-semibold text-zinc-700 dark:text-zinc-300">{{ row.plan }}</span>
            <span class="text-sm text-zinc-500">{{ row.limit }}</span>
          </div>
        </div>
      </section>

      <!-- Error codes -->
      <section class="pb-12">
        <h2 class="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">{{ $t('docsPage.errorsH2') }}</h2>
        <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
          <div v-for="e in errors" :key="e.code" class="flex items-start gap-4 px-6 py-4">
            <code class="text-sm font-mono font-bold w-12 shrink-0"
              :class="e.code >= 500 ? 'text-red-500' : e.code >= 400 ? 'text-amber-500' : 'text-green-500'">
              {{ e.code }}
            </code>
            <div>
              <p class="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{{ e.title }}</p>
              <p class="text-xs text-zinc-500 mt-0.5">{{ e.desc }}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: computed(() => t('pageMeta.docs.title')),
  meta: [
    { name: 'description', content: computed(() => t('pageMeta.docs.description')) },
    { name: 'robots', content: 'index, follow' },
  ],
})

const isAuth  = ref(false)
const isPro   = ref(false)
const apiKey  = ref(null)
const showKey = ref(false)
const copied  = ref(false)
const loading = ref(false)
const error   = ref('')

onMounted(async () => {
  const token = localStorage.getItem('access_token')
  if (!token) return
  isAuth.value = true
  try {
    const res = await fetch('/api/v1/auth/me/', { headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) return
    const data = await res.json()
    isPro.value   = ['pro', 'promax'].includes(data.plan)
    apiKey.value  = data.api_key ?? null
  } catch {}
})

async function generateKey() {
  loading.value = true
  error.value   = ''
  try {
    const token = localStorage.getItem('access_token')
    const res = await fetch('/api/v1/auth/api-key/', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) { error.value = 'Failed to generate key.'; return }
    const data = await res.json()
    apiKey.value  = data.api_key
    showKey.value = true
  } catch { error.value = 'Network error.' }
  finally   { loading.value = false }
}

async function revokeKey() {
  if (!confirm(t('docsPage.revokeConfirm'))) return
  loading.value = true
  error.value   = ''
  try {
    const token = localStorage.getItem('access_token')
    await fetch('/api/v1/auth/api-key/', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    apiKey.value  = null
    showKey.value = false
  } catch { error.value = 'Network error.' }
  finally   { loading.value = false }
}

function copyKey() {
  if (!apiKey.value) return
  navigator.clipboard.writeText(apiKey.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function methodClass(m) {
  return {
    GET:    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    POST:   'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    DELETE: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    PATCH:  'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  }[m] ?? 'bg-zinc-100 text-zinc-600'
}

const endpoints = reactive([
  {
    method: 'GET', path: '/files/', summary: 'List your files', _open: false,
    description: 'Returns a paginated list of all files owned by the authenticated user.',
    params: [
      { name: 'page',   type: 'integer', desc: 'Page number (default: 1)' },
      { name: 'search', type: 'string',  desc: 'Filter by filename' },
    ],
    example: `curl https://filesterr.com/api/v1/files/ \\
  -H "Authorization: Bearer fstr_YOUR_KEY"`,
    response: `{
  "count": 12,
  "results": [
    {
      "id": "uuid",
      "original_name": "report.pdf",
      "size": 204800,
      "share_token": "abc123",
      "storage_backend": "r2",
      "created_at": "2025-06-01T10:00:00Z",
      "download_count": 5
    }
  ]
}`,
  },
  {
    method: 'POST', path: '/files/upload/', summary: 'Upload a file', _open: false,
    description: 'Upload a file. Premium+ plans are required for files over 1 GB. The response includes a shareable link and a private delete token.',
    params: [
      { name: 'file',     type: 'file',   desc: 'The file to upload (multipart/form-data)' },
      { name: 'password', type: 'string', desc: 'Optional password to protect the download link' },
      { name: 'expires_in', type: 'integer', desc: 'Auto-delete after N hours (0 = never, Premium+)' },
      { name: 'one_time', type: 'boolean', desc: 'Delete after first download (Premium+)' },
    ],
    example: `curl -X POST https://filesterr.com/api/v1/files/upload/ \\
  -H "Authorization: Bearer fstr_YOUR_KEY" \\
  -F "file=@/path/to/report.pdf" \\
  -F "expires_in=72"`,
    response: `{
  "id": "uuid",
  "original_name": "report.pdf",
  "share_url": "https://filesterr.com/f/abc123",
  "delete_token": "del_xyz789",
  "size": 204800,
  "expires_at": "2025-06-04T10:00:00Z"
}`,
  },
  {
    method: 'GET', path: '/files/{id}/', summary: 'Get file details', _open: false,
    description: 'Retrieve metadata for a specific file you own.',
    example: `curl https://filesterr.com/api/v1/files/YOUR_FILE_ID/ \\
  -H "Authorization: Bearer fstr_YOUR_KEY"`,
    response: `{
  "id": "uuid",
  "original_name": "report.pdf",
  "size": 204800,
  "share_token": "abc123",
  "download_count": 5,
  "created_at": "2025-06-01T10:00:00Z",
  "expires_at": null
}`,
  },
  {
    method: 'DELETE', path: '/files/delete/{share_token}/', summary: 'Delete a file', _open: false,
    description: 'Permanently delete a file. This also removes it from the CDN and any associated analytics.',
    example: `curl -X DELETE https://filesterr.com/api/v1/files/delete/SHARE_TOKEN/ \\
  -H "Authorization: Bearer fstr_YOUR_KEY"`,
    response: `204 No Content`,
  },
  {
    method: 'GET', path: '/analytics/overview/', summary: 'Analytics overview', _open: false,
    description: 'Returns download counts, unique visitor counts, and top-performing files for your account.',
    example: `curl https://filesterr.com/api/v1/analytics/overview/ \\
  -H "Authorization: Bearer fstr_YOUR_KEY"`,
    response: `{
  "total_downloads": 1284,
  "unique_visitors": 943,
  "flagged_ips": 12,
  "top_files": [
    { "id": "uuid", "name": "launch.zip", "downloads": 340 }
  ]
}`,
  },
  {
    method: 'GET', path: '/auth/me/', summary: 'Current user', _open: false,
    description: 'Returns the authenticated user\'s profile, plan details, and storage usage.',
    example: `curl https://filesterr.com/api/v1/auth/me/ \\
  -H "Authorization: Bearer fstr_YOUR_KEY"`,
    response: `{
  "id": "uuid",
  "email": "you@example.com",
  "plan": "pro",
  "api_key": "fstr_...",
  "plan_config": {
    "storage_limit_gb": 500,
    "file_size_limit_gb": 20,
    "ads": false
  }
}`,
  },
])

const rateLimits = [
  { plan: 'Pro',     limit: '300 requests / minute' },
  { plan: 'Pro Max', limit: '600 requests / minute' },
]

const errors = [
  { code: 200, title: 'OK',           desc: 'Request succeeded.' },
  { code: 201, title: 'Created',      desc: 'Resource created successfully.' },
  { code: 204, title: 'No Content',   desc: 'Action completed, no body returned.' },
  { code: 400, title: 'Bad Request',  desc: 'Invalid or missing parameters.' },
  { code: 401, title: 'Unauthorized', desc: 'Missing or invalid API key.' },
  { code: 403, title: 'Forbidden',    desc: 'Plan does not allow this action.' },
  { code: 404, title: 'Not Found',    desc: 'Resource does not exist.' },
  { code: 429, title: 'Too Many Requests', desc: 'Rate limit exceeded. Retry after the indicated delay.' },
  { code: 500, title: 'Server Error', desc: 'Something went wrong on our end. Try again shortly.' },
]
</script>
