/**
 * useUpload
 *
 * Pipeline:
 * 1. File picked/dropped → validate size against user's plan
 * 2. Compute SHA-256 partial hash (UX indicator)
 * 3. User clicks Upload → POST multipart to /api/v1/files/upload/
 * 4. On success → result with shareUrl, deleteUrl, isAnonymous flag
 *
 * Plan limits mirror backend PLAN_CONFIG.file_size_limit exactly.
 */
import { ref, computed, onMounted } from 'vue'

// Must match backend PLAN_CONFIG['file_size_limit']
const PLAN_FILE_LIMITS = {
  anonymous: 200  * 1024 * 1024,          // 200 MB
  free:        1  * 1024 * 1024 * 1024,   // 1 GB
  premium:     5  * 1024 * 1024 * 1024,   // 5 GB
  pro:        20  * 1024 * 1024 * 1024,   // 20 GB
  promax:     50  * 1024 * 1024 * 1024,   // 50 GB
}

async function computeHash(file) {
  const MB = 1024 * 1024
  const chunks = []
  if (file.size <= 3 * MB) {
    chunks.push(await file.arrayBuffer())
  } else {
    chunks.push(await file.slice(0, MB).arrayBuffer())
    const mid = Math.floor(file.size / 2)
    chunks.push(await file.slice(mid, mid + MB).arrayBuffer())
    chunks.push(await file.slice(file.size - MB).arrayBuffer())
  }
  const combined = new Uint8Array(chunks.reduce((acc, c) => acc + c.byteLength, 0))
  let offset = 0
  for (const chunk of chunks) { combined.set(new Uint8Array(chunk), offset); offset += chunk.byteLength }
  const buf = await crypto.subtle.digest('SHA-256', combined)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export function useUpload() {
  const cachedFile     = ref(null)
  const fileHash       = ref(null)
  const hashProgress   = ref(0)
  const isHashing      = ref(false)
  const uploadProgress = ref(0)
  const isUploading    = ref(false)
  const result         = ref(null)
  const error          = ref(null)
  const stage          = ref('idle') // idle|checking|hashing|ready|uploading|done|error

  // entry-client.js populates window.__USER__ before mount; fall back to localStorage cache
  function _resolvePlan() {
    if (typeof window === 'undefined') return 'anonymous'
    if (window.__USER__?.plan) return window.__USER__.plan
    try {
      const cached = JSON.parse(localStorage.getItem('cached_user') || 'null')
      if (cached?.plan) return cached.plan
    } catch {}
    return 'anonymous'
  }

  const plan      = ref(_resolvePlan())
  const sizeLimit = computed(() => PLAN_FILE_LIMITS[plan.value] ?? PLAN_FILE_LIMITS.anonymous)

  onMounted(() => {
    // Re-read after mount in case window.__USER__ updated after SSR hydration
    plan.value = _resolvePlan()
  })
  const readableSize = computed(() => cachedFile.value ? formatSize(cachedFile.value.size) : '')
  const isReady   = computed(() => stage.value === 'ready' || stage.value === 'captcha')

  // ── Step 1: Accept file ─────────────────────────────────────────────────
  async function acceptFile(file) {
    error.value  = null
    result.value = null
    fileHash.value = null
    stage.value  = 'checking'

    if (file.size === 0) {
      error.value = 'File is empty.'
      stage.value = 'error'
      return false
    }

    if (file.size > sizeLimit.value) {
      const planName = plan.value === 'anonymous' ? 'anonymous users' : `your ${plan.value} plan`
      error.value = `File exceeds the ${formatSize(sizeLimit.value)} limit for ${planName}.`
      if (plan.value === 'anonymous' || plan.value === 'free') {
        error.value += ' Upgrade for larger uploads.'
      }
      stage.value = 'error'
      return false
    }

    cachedFile.value = file
    stage.value      = 'hashing'
    isHashing.value  = true
    hashProgress.value = 0

    try {
      const ticker = setInterval(() => {
        if (hashProgress.value < 85) hashProgress.value += 18
      }, 70)
      fileHash.value = await computeHash(file)
      clearInterval(ticker)
      hashProgress.value = 100
    } catch {
      error.value = 'Could not read file. Please try again.'
      stage.value = 'error'
      return false
    } finally {
      isHashing.value = false
    }

    stage.value = 'captcha'
    return true
  }

  // ── Step 2: Upload ──────────────────────────────────────────────────────
  async function upload(captchaToken = '', options = {}) {
    if (!cachedFile.value) { error.value = 'No file selected.'; return false }

    error.value      = null
    isUploading.value = true
    stage.value      = 'uploading'
    uploadProgress.value = 0

    try {
      const fd = new FormData()
      fd.append('file', cachedFile.value)
      if (captchaToken)       fd.append('cf_turnstile_response', captchaToken)
      if (options.password)   fd.append('password', options.password)
      if (options.isOneTime)  fd.append('is_one_time', 'true')
      if (options.expiresIn)  fd.append('expires_in', String(options.expiresIn))

      const token = typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') ?? '' : ''
      const csrf  = typeof document !== 'undefined' ? (document.cookie.match(/csrftoken=([^;]+)/)?.[1] ?? '') : ''

      const data = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/v1/files/upload/')
        if (token)  xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        if (csrf)   xhr.setRequestHeader('X-CSRFToken', csrf)

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) uploadProgress.value = Math.min(99, Math.round((e.loaded / e.total) * 100))
        }

        xhr.onload = () => {
          uploadProgress.value = 100
          try {
            const json = JSON.parse(xhr.responseText)
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(json)
            } else {
              reject(new Error(json?.error?.message || `Upload failed (${xhr.status})`))
            }
          } catch {
            reject(new Error(`Upload failed (${xhr.status})`))
          }
        }
        xhr.onerror = () => reject(new Error('Network error. Please check your connection.'))
        xhr.send(fd)
      })

      result.value = {
        name:        data.original_name,
        size:        data.size,
        shareUrl:    `/f/${data.share_token}`,
        deleteUrl:   `/delete/${data.share_token}`,
        isAnonymous: data.is_anonymous,
        fileId:      data.id,
        visitorId:   typeof localStorage !== 'undefined' ? getCookieVisitorId() : null,
      }

      stage.value = 'done'
      return true
    } catch (e) {
      error.value = e.message || 'Upload failed. Please try again.'
      stage.value = 'error'
      return false
    } finally {
      isUploading.value = false
    }
  }

  function reset() {
    cachedFile.value     = null
    fileHash.value       = null
    hashProgress.value   = 0
    uploadProgress.value = 0
    isHashing.value      = false
    isUploading.value    = false
    result.value         = null
    error.value          = null
    stage.value          = 'idle'
  }

  return {
    cachedFile, fileHash, hashProgress, uploadProgress,
    isHashing, isUploading, result, error, stage,
    isReady, readableSize, sizeLimit,
    acceptFile, upload, reset,
  }
}

export function formatSize(bytes) {
  if (!bytes) return '0 B'
  if (bytes >= 1099511627776) return `${(bytes / 1099511627776).toFixed(1)} TB`
  if (bytes >= 1073741824)    return `${(bytes / 1073741824).toFixed(1)} GB`
  if (bytes >= 1048576)       return `${(bytes / 1048576).toFixed(1)} MB`
  return `${Math.round(bytes / 1024)} KB`
}

function getCookieVisitorId() {
  return document.cookie.match(/fstr_vid=([^;]+)/)?.[1] ?? null
}
