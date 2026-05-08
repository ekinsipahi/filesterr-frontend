<template>
  <section class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Who uses it</p>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold mb-5">Built for people who<br/><span class="text-gradient">need to know.</span></h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="uc in useCases" :key="uc.role" class="card-hover p-7 group">
          <div class="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" :class="uc.iconBg">
            <svg class="w-5 h-5" :class="uc.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" :d="uc.icon"/></svg>
          </div>
          <div class="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">{{ uc.role }}</div>
          <h3 class="font-display font-bold text-lg mb-3">{{ uc.title }}</h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ uc.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const useCases = [
  { role:'Sales & Marketing', title:"Know when a prospect opens your deck", desc:"Stop the 'Did you get it?' email. Get notified the second someone downloads your proposal.", iconBg:'bg-brand-50 dark:bg-brand-900/20', iconColor:'text-brand-500', icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { role:'Freelancers & Designers', title:"Know when clients view deliverables", desc:"Track every time a client opens your design files. Follow up at exactly the right moment.", iconBg:'bg-violet-50 dark:bg-violet-900/20', iconColor:'text-violet-500', icon:'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
  { role:'Security & Compliance', title:"Audit who accessed sensitive files", desc:"Full download audit log with IP, location, device, and timestamp. Know who accessed what, forever.", iconBg:'bg-emerald-50 dark:bg-emerald-900/20', iconColor:'text-emerald-500', icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { role:'Indie Developers', title:"See who's really interested", desc:"That person who downloaded your demo 5 times from 3 different devices? Filesterr identifies them for you.", iconBg:'bg-amber-50 dark:bg-amber-900/20', iconColor:'text-amber-500', icon:'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { role:'Content Creators', title:"Understand your real audience", desc:"Strip bot downloads from your stats. Get accurate geographic reach on content people actually consume.", iconBg:'bg-red-50 dark:bg-red-900/20', iconColor:'text-red-500', icon:'M15 10l4.553-2.069A1 1 0 0121 8.82V15a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  { role:'Agencies & Teams', title:"Client-ready analytics reports", desc:"Export download data as CSV. Show clients exactly how many real humans engaged — bots already filtered.", iconBg:'bg-blue-50 dark:bg-blue-900/20', iconColor:'text-blue-500', icon:'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
]
</script>