<template>
  <div class="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
    <!-- Minimal header -->
    <header class="py-5 px-6 flex items-center justify-between max-w-7xl mx-auto w-full">
      <a href="/" class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-glow">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span class="font-display font-bold text-xl tracking-tight">Filesterr</span>
      </a>
      <ThemeToggle />
    </header>

    <!-- Content -->
    <main class="flex-1 flex items-center justify-center py-12 px-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
import ThemeToggle from '../ui/ThemeToggle.vue'
</script>