<template>
  <section class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">What users say</p>
        <h2 class="font-display text-4xl font-extrabold">Real results. Real users.</h2>
      </div>
      <div class="grid md:grid-cols-3 gap-5">
        <div v-for="q in quotes" :key="q.name" class="card-hover p-7">
          <div class="flex gap-0.5 mb-4"><span v-for="s in 5" :key="s" class="text-amber-400 text-sm">★</span></div>
          <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">"{{ q.body }}"</p>
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" :style="`background:${q.color}`">{{ q.name[0] }}</div>
            <div><div class="text-sm font-semibold">{{ q.name }}</div><div class="text-xs text-zinc-400">{{ q.role }}</div></div>
            <span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-semibold">✓ Verified</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const quotes = [
  { name:'Yuki N.',   role:'Security Researcher', color:'#8b5cf6', body:'The bot detection and proxy flagging are solid. It caught 90%+ of common VPNs correctly. Finally real data.' },
  { name:'Marcus T.', role:'Indie Developer',      color:'#22a366', body:"I can see when the same person downloads my demo multiple times — a warm lead I never would have known about." },
  { name:'Sarah K.',  role:'Marketing Director',   color:'#6366f1', body:"Filesterr's analytics finally let us see if people open the files we send. Absolute game changer for our team." },
]
</script>