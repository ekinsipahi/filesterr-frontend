<template>
  <footer class="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-16 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
        <div class="col-span-2">
          <div class="flex items-center gap-2.5 mb-4">
            <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-glow">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
            </div>
            <span class="font-display font-bold text-xl">Filesterr</span>
          </div>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed mb-6">{{ t('footer.tagline') }}</p>
          <div class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#00b67a]/10 border border-[#00b67a]/20">
            <span class="text-xs font-bold text-[#00b67a]">{{ t('footer.trustpilot') }}</span>
          </div>
        </div>
        <div v-for="(col, ci) in FOOTER_COLS" :key="ci">
          <h4 class="text-xs font-bold uppercase tracking-wider mb-5">{{ t(`footer.col${ci}_title`) }}</h4>
          <ul class="space-y-3">
            <li v-for="(link, li) in col.links" :key="li">
              <a :href="link.href" class="text-sm text-zinc-500 dark:text-zinc-400 hover:text-brand-500 transition-colors">{{ t(`footer.col${ci}_l${li}`) }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-zinc-400">{{ t('footer.rights', { year: new Date().getFullYear() }) }}</p>
        <div class="flex items-center gap-4">
          <a href="https://twitter.com" class="text-zinc-400 hover:text-brand-500 transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://github.com" class="text-zinc-400 hover:text-brand-500 transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { FOOTER_COLS } from '../../data/plans.js'
const { t } = useI18n()
</script>