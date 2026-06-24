<template>
  <div class="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
    <!-- Content -->
    <main class="flex-1 flex items-center justify-center py-12 px-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
import ThemeToggle from '../ui/ThemeToggle.vue'
</script>