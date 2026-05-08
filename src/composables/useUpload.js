/**
 * useUpload
 *
 * Client-side pipeline:
 * 1. File picked/dropped → cache it in memory
 * 2. Client-side checks: size, type blacklist, name
 * 3. MD5 hash (SparkMD5 via CDN or inline)
 * 4. User clicks Upload → send to backend
 *
 * Backend receives: hash (dedup check), chunks
 */

import { ref, computed } from 'vue'

// Max sizes per plan
const LIMITS = {
  anonymous: 1   * 1024 * 1024 * 1024,  // 1 GB
  free:      5   * 1024 * 1024 * 1024,  // 5 GB
  premium:   50  * 1024 * 1024 * 1024,  // 50 GB
  pro:       Infinity,
}

const BLOCKED_EXTENSIONS = [
  '.exe', '.msi', '.bat', '.cmd', '.com', '.scr', '.pif',
  '.vbs', '.js', '.jse', '.wsf', '.wsh', '.ps1', '.reg',
]

const CHUNK_SIZE = 5 * 1024 * 1024  // 5 MB

// MD5 — inline implementation (no dep needed for this)
// We use SubtleCrypto SHA-256 for hash (MD5 not available in SubtleCrypto)
async function computeHash(file) {
  // Read first 1MB + last 1MB + middle 1MB for speed
  // Full hash would be too slow for large files in browser
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

  // Combine and hash with SHA-256
  const combined = new Uint8Array(chunks.reduce((acc, c) => acc + c.byteLength, 0))
  let offset = 0
  for (const chunk of chunks) {
    combined.set(new Uint8Array(chunk), offset)
    offset += chunk.byteLength
  }

  const hashBuffer = await crypto.subtle.digest('SHA-256', combined)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function useUpload(planOverride = null) {
  // State
  const cachedFile = ref(null)        // File object in memory
  const fileHash = ref(null)          // SHA-256 hash
  const hashProgress = ref(0)         // 0-100 while hashing
  const isHashing = ref(false)
  const uploadProgress = ref(0)       // 0-100 while uploading
  const isUploading = ref(false)
  const result = ref(null)            // { shareUrl, deleteUrl, name, size }
  const error = ref(null)
  const stage = ref('idle')           // idle | checking | hashing | ready | uploading | done | error

  // Derived
  const plan = computed(() => {
    if (planOverride) return planOverride
    if (typeof window !== 'undefined') return window.__USER__?.plan || 'anonymous'
    return 'anonymous'
  })

  const sizeLimit = computed(() => LIMITS[plan.value] ?? LIMITS.anonymous)

  const readableSize = computed(() => {
    if (!cachedFile.value) return ''
    return formatSize(cachedFile.value.size)
  })

  const isReady = computed(() => stage.value === 'ready')

  // ── Step 1: Accept file ──
  async function acceptFile(file) {
    error.value = null
    result.value = null
    fileHash.value = null
    stage.value = 'checking'

    // Size check
    if (file.size > sizeLimit.value) {
      const limit = formatSize(sizeLimit.value)
      error.value = `File too large. Your plan allows up to ${limit}. Upgrade for larger uploads.`
      stage.value = 'error'
      return false
    }

    // Empty file
    if (file.size === 0) {
      error.value = 'File is empty.'
      stage.value = 'error'
      return false
    }

    // Extension blacklist
    const ext = '.' + file.name.split('.').pop().toLowerCase()
    if (BLOCKED_EXTENSIONS.includes(ext)) {
      error.value = `File type "${ext}" is not allowed for security reasons.`
      stage.value = 'error'
      return false
    }

    // Cache the file
    cachedFile.value = file
    stage.value = 'hashing'

    // ── Step 2: Hash ──
    isHashing.value = true
    hashProgress.value = 0
    try {
      // Simulate progress (hashing is fast, just UX)
      const ticker = setInterval(() => {
        if (hashProgress.value < 85) hashProgress.value += 15
      }, 80)

      fileHash.value = await computeHash(file)

      clearInterval(ticker)
      hashProgress.value = 100
    } catch (e) {
      error.value = 'Could not read file. Please try again.'
      stage.value = 'error'
      return false
    } finally {
      isHashing.value = false
    }

    stage.value = 'ready'
    return true
  }

  // ── Step 3: Upload (called by user clicking button) ──
  async function upload() {
    if (!cachedFile.value || !fileHash.value) {
      error.value = 'No file selected.'
      return false
    }

    error.value = null
    isUploading.value = true
    stage.value = 'uploading'
    uploadProgress.value = 0

    try {
      const csrf = getCsrf()
      const headers = { 'Content-Type': 'application/json', 'X-CSRFToken': csrf }

      // 1. Init — send hash for dedup check
      const initRes = await fetch('/api/v1/files/upload/init/', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          filename: cachedFile.value.name,
          size: cachedFile.value.size,
          type: cachedFile.value.type || 'application/octet-stream',
          hash: fileHash.value,
          plan: plan.value,
        }),
      })

      if (!initRes.ok) {
        const d = await initRes.json().catch(() => ({}))
        throw new Error(d.error || `Server error ${initRes.status}`)
      }

      const { uploadId, alreadyExists, shareUrl: existingUrl, deleteUrl: existingDeleteUrl } = await initRes.json()

      // Dedup: same hash already on server
      if (alreadyExists) {
        result.value = { name: cachedFile.value.name, size: cachedFile.value.size, shareUrl: existingUrl, deleteUrl: existingDeleteUrl }
        uploadProgress.value = 100
        stage.value = 'done'
        return true
      }

      // 2. Upload chunks
      const total = Math.ceil(cachedFile.value.size / CHUNK_SIZE)
      for (let i = 0; i < total; i++) {
        const start = i * CHUNK_SIZE
        const end = Math.min(start + CHUNK_SIZE, cachedFile.value.size)
        const fd = new FormData()
        fd.append('upload_id', uploadId)
        fd.append('chunk_index', String(i))
        fd.append('total_chunks', String(total))
        fd.append('chunk', cachedFile.value.slice(start, end))

        const chunkRes = await fetch('/api/v1/files/upload/chunk/', {
          method: 'POST',
          headers: { 'X-CSRFToken': csrf },
          body: fd,
        })

        if (!chunkRes.ok) throw new Error(`Chunk ${i} failed`)
        uploadProgress.value = Math.round(((i + 1) / total) * 100)
      }

      // 3. Finalize
      const finalRes = await fetch('/api/v1/files/upload/finalize/', {
        method: 'POST',
        headers,
        body: JSON.stringify({ upload_id: uploadId, hash: fileHash.value }),
      })

      if (!finalRes.ok) throw new Error('Finalize failed')
      const data = await finalRes.json()

      result.value = {
        name: cachedFile.value.name,
        size: cachedFile.value.size,
        shareUrl: data.shareUrl,
        deleteUrl: data.deleteUrl,
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
    cachedFile.value = null
    fileHash.value = null
    hashProgress.value = 0
    uploadProgress.value = 0
    isHashing.value = false
    isUploading.value = false
    result.value = null
    error.value = null
    stage.value = 'idle'
  }

  return {
    // State
    cachedFile, fileHash, hashProgress, uploadProgress,
    isHashing, isUploading, result, error, stage,
    isReady, readableSize, sizeLimit,
    // Actions
    acceptFile, upload, reset,
  }
}

// ── Helpers ──
function getCsrf() {
  return document.cookie.match(/csrftoken=([^;]+)/)?.[1] || ''
}

export function formatSize(bytes) {
  if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(1)} GB`
  if (bytes >= 1048576)    return `${(bytes / 1048576).toFixed(1)} MB`
  return `${(bytes / 1024).toFixed(0)} KB`
}