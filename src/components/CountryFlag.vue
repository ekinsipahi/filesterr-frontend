<template>
  <img
    v-if="code"
    :src="`https://flagcdn.com/24x18/${code.toLowerCase()}.png`"
    :srcset="`https://flagcdn.com/48x36/${code.toLowerCase()}.png 2x`"
    :alt="code"
    :title="code"
    class="inline-block rounded-sm object-cover shrink-0"
    :style="{ width: `${width}px`, height: `${height}px` }"
    @error="failed = true"
  />
  <span v-else-if="failed" class="inline-block text-zinc-400 text-xs">—</span>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  code:   { type: String, default: '' },
  width:  { type: Number, default: 24 },
  height: { type: Number, default: 18 },
})

const failed = ref(false)
</script>
