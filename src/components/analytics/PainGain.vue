<template>
  <section class="py-24 px-6">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">The problem</p>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">You send files blind.<br/><span class="text-gradient">We fix that.</span></h2>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="card p-8 border-red-200 dark:border-red-800/40">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </div>
            <h3 class="font-display font-bold text-lg text-red-600 dark:text-red-400">Before Filesterr</h3>
          </div>
          <ul class="space-y-3">
            <li v-for="pain in painPoints" :key="pain" class="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <svg class="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>
              {{ pain }}
            </li>
          </ul>
        </div>
        <div class="card p-8 border-brand-200 dark:border-brand-500/30 bg-brand-50/40 dark:bg-brand-500/5">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 class="font-display font-bold text-lg text-brand-600 dark:text-brand-400">With Filesterr Analytics</h3>
          </div>
          <ul class="space-y-3">
            <li v-for="gain in gainPoints" :key="gain" class="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <svg class="w-4 h-4 text-brand-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
              {{ gain }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const painPoints = ["\"Did they even open it?\" — you never know","No idea if bots are skewing your download count","Can't tell if the same person downloaded 10 times","Zero visibility on VPN or proxy downloads","No data on where in the world your files go"]
const gainPoints = ["See every download — IP, location, device, timestamp","Bot and datacenter traffic automatically flagged","Fingerprint returning visitors across sessions and incognito","VPN, proxy, and Tor exit node detection built in","Geographic heatmap of every download, updated live"]
</script>