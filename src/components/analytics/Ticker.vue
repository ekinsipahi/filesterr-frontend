<template>
  <div class="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 py-4">
    <div class="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8">
      <div v-for="p in proof" :key="p.label" class="flex items-center gap-2 text-sm">
        <span class="text-brand-500 font-bold text-base">{{ p.value }}</span>
        <span class="text-zinc-500 dark:text-zinc-400">{{ p.label }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const proof = [
  { value:'500K+',  label:'users track downloads' },
  { value:'12M+',   label:'files monitored' },
  { value:'99.99%', label:'uptime SLA' },
  { value:'< 1s',   label:'analytics latency' },
  { value:'4.8★',   label:'Trustpilot rating' },
]
</script>