<template>
<Teleport to="body" :disabled="!isMounted">
    <Transition name="loader">
      <div v-if="loading" class="loader-backdrop" aria-hidden="true">
        <!-- Progress bar -->
        <div class="loader-bar">
          <div class="loader-bar-fill" :style="{ width: progress + '%' }" />
        </div>

        <!-- Center logo + spinner -->
        <div class="loader-center">
          <div class="loader-logo">
            <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
          </div>
          <div class="loader-ring" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isMounted = ref(false)
const loading = ref(false)
const progress = ref(0)

let progressTimer = null
let doneTimer = null
let startTime = 0

function startLoad() {
  clearTimeout(doneTimer)
  clearInterval(progressTimer)
  progress.value = 0
  loading.value = true
  startTime = Date.now()

  progressTimer = setInterval(() => {
    if (progress.value < 85) {
      progress.value += Math.random() * 18
      if (progress.value > 85) progress.value = 85
    }
  }, 120)
}

function finishLoad() {
  clearInterval(progressTimer)
  progress.value = 100

  const elapsed = Date.now() - startTime
  const minDelay = Math.max(0, 350 - elapsed)

  doneTimer = setTimeout(() => {
    loading.value = false
    progress.value = 0
  }, minDelay + 380)
}

const router = useRouter()
router.beforeEach(() => startLoad())
router.afterEach(() => finishLoad())

onMounted(() => {
  isMounted.value = true
})
</script>

<style>
.loader-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--loader-bg, #0a0a0a);
  display: flex;
  align-items: center;
  justify-content: center;
}

:root.dark .loader-backdrop { --loader-bg: #0a0a0a; }
:root:not(.dark) .loader-backdrop { --loader-bg: #f9fafb; }

/* ── Progress bar ── */
.loader-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2.5px;
  background: transparent;
}
.loader-bar-fill {
  height: 100%;
  background: #22a366;
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 12px rgba(34, 163, 102, 0.7);
  transition: width 0.12s ease;
}

/* ── Logo + ring ── */
.loader-center {
  position: relative;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-logo {
  color: #22a366;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: logo-pulse 1.6s ease-in-out infinite;
}

.loader-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #22a366;
  border-right-color: rgba(34, 163, 102, 0.3);
  animation: spin 0.9s linear infinite;
}

/* ── Transitions ── */
.loader-enter-active { transition: opacity 0.15s ease; }
.loader-leave-active { transition: opacity 0.3s ease 0.05s; }
.loader-enter-from,
.loader-leave-to     { opacity: 0; }

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes logo-pulse {
  0%, 100% { opacity: 1;    transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(0.92); }
}
</style>