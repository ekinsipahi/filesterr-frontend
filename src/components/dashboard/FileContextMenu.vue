<template>
  <Teleport to="body">
    <Transition name="ctx-pop">
      <div v-if="file"
        ref="menuEl"
        class="fixed z-[9999] select-none min-w-[210px] rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl shadow-black/20 py-1.5 overflow-hidden"
        :style="menuStyle"
        @click.stop
        @contextmenu.prevent>

        <!-- Copy Link -->
        <button class="ctx-item" @click="act('copy-link')">
          <svg class="ctx-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
          </svg>
          Copy Link
          <kbd class="ml-auto ctx-kbd">⌘C</kbd>
        </button>

        <!-- Open Page -->
        <a :href="`/f/${file.share_token}`" target="_blank" rel="noopener" class="ctx-item" @click="emit('close')">
          <svg class="ctx-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Open Page
        </a>

        <!-- Download -->
        <a :href="`/api/v1/files/public/${file.share_token}/download/`" :download="file.original_name" class="ctx-item" @click="emit('close')">
          <svg class="ctx-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Download
        </a>

        <div class="ctx-sep" />

        <!-- Move to folder -->
        <button v-if="canUseFolders" class="ctx-item" @click="act('move')">
          <svg class="ctx-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
          </svg>
          Move to Folder
        </button>

        <!-- Set / Change password -->
        <button v-if="canSetPassword" class="ctx-item" @click="act('set-password')">
          <svg class="ctx-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          {{ file.is_password_protected ? 'Change Password' : 'Set Password' }}
          <span v-if="file.is_password_protected" class="ml-auto w-2 h-2 rounded-full bg-amber-400 shrink-0" />
        </button>

        <!-- Select / Deselect -->
        <button class="ctx-item" @click="act('toggle-select')">
          <svg class="ctx-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isSelected" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ isSelected ? 'Deselect' : 'Select' }}
        </button>

        <div class="ctx-sep" />

        <!-- Delete -->
        <button class="ctx-item !text-red-500 hover:!bg-red-50 dark:hover:!bg-red-900/20" @click="act('delete')">
          <svg class="ctx-icon !text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          Delete
          <kbd class="ml-auto ctx-kbd !text-red-300">Del</kbd>
        </button>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  file:           { type: Object, default: null },
  x:              { type: Number, default: 0 },
  y:              { type: Number, default: 0 },
  isSelected:     { type: Boolean, default: false },
  canUseFolders:  { type: Boolean, default: false },
  canSetPassword: { type: Boolean, default: false },
})

const emit = defineEmits(['close', 'copy-link', 'move', 'set-password', 'toggle-select', 'delete'])

const menuEl = ref(null)

const menuStyle = computed(() => {
  if (!props.file) return {}
  const W = window.innerWidth
  const H = window.innerHeight
  const menuW = 220
  const menuH = 300
  const left = props.x + menuW > W - 12 ? props.x - menuW : props.x
  const top  = props.y + menuH > H - 12 ? props.y - menuH : props.y
  return { left: `${Math.max(8, left)}px`, top: `${Math.max(8, top)}px` }
})

function act(event) {
  emit(event, props.file)
  emit('close')
}

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}
function onPointer(e) {
  if (menuEl.value && !menuEl.value.contains(e.target)) emit('close')
}
function onScroll() {
  emit('close')
}

watch(() => props.file, (val) => {
  if (val) {
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('scroll', onScroll, { passive: true, capture: true })
  } else {
    document.removeEventListener('keydown', onKey)
    document.removeEventListener('pointerdown', onPointer)
    document.removeEventListener('scroll', onScroll, { capture: true })
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.removeEventListener('pointerdown', onPointer)
  document.removeEventListener('scroll', onScroll, { capture: true })
})
</script>

<style scoped>
.ctx-item {
  @apply w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-zinc-700 dark:text-zinc-300
         hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-left;
}
.ctx-icon {
  @apply w-3.5 h-3.5 shrink-0 text-zinc-400;
}
.ctx-sep {
  @apply h-px bg-zinc-100 dark:bg-zinc-800 my-1;
}
.ctx-kbd {
  @apply text-[10px] text-zinc-300 dark:text-zinc-600 font-mono;
}

/* Pop-in animation */
.ctx-pop-enter-active { transition: opacity 0.08s ease, transform 0.1s ease; }
.ctx-pop-leave-active { transition: opacity 0.06s ease; }
.ctx-pop-enter-from   { opacity: 0; transform: scale(0.94) translateY(-4px); }
.ctx-pop-leave-to     { opacity: 0; }
</style>
