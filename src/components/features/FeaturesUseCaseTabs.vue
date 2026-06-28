<template>
  <section class="py-24 px-6 section-alt">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">{{ $t('featuresUseCases.tagline') }}</p>
        <h2 class="font-display text-4xl font-extrabold mb-4">
          {{ $t('featuresUseCases.h2a') }}<br/><span class="text-gradient">{{ $t('featuresUseCases.h2b') }}</span>
        </h2>
      </div>

      <div class="flex flex-wrap justify-center gap-2 mb-10">
        <button v-for="(tab, i) in tabs" :key="i" @click="active = i"
          class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          :class="active === i ? 'bg-brand-500 text-white shadow-glow' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'">
          {{ tab.label }}
        </button>
      </div>

      <div class="card p-10">
        <div class="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" :class="tabs[active].iconBg">
              <svg class="w-6 h-6" :class="tabs[active].iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" :d="tabs[active].icon"/>
              </svg>
            </div>
            <h3 class="font-display text-2xl font-bold mb-3">{{ tabs[active].title }}</h3>
            <p class="text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">{{ tabs[active].desc }}</p>
            <ul class="space-y-2.5 mb-7">
              <li v-for="b in tabs[active].bullets" :key="b" class="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                {{ b }}
              </li>
            </ul>
            <a :href="tabs[active].href" class="btn-primary inline-flex items-center gap-2 text-sm">{{ tabs[active].cta }}</a>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="stat in tabs[active].stats" :key="stat.label"
              class="rounded-2xl p-6 text-center"
              :class="stat.highlight ? 'bg-brand-500 text-white' : 'bg-zinc-50 dark:bg-zinc-800'">
              <div class="font-display text-3xl font-black mb-1" :class="stat.highlight ? 'text-white' : 'text-zinc-900 dark:text-white'">{{ stat.val }}</div>
              <div class="text-xs font-medium" :class="stat.highlight ? 'text-brand-100' : 'text-zinc-500 dark:text-zinc-400'">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const active = ref(0)

const tabs = computed(() => [
  { label: t('featuresUseCases.tab0'), icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', iconBg: 'bg-brand-50 dark:bg-brand-900/20', iconColor: 'text-brand-500', title: t('featuresUseCases.tab0_title'), desc: t('featuresUseCases.tab0_desc'), bullets: [t('featuresUseCases.tab0_bullet0'), t('featuresUseCases.tab0_bullet1'), t('featuresUseCases.tab0_bullet2')], stats: [{ val: '10 GB', label: t('featuresUseCases.tab0_stat0'), highlight: false }, { val: '∞', label: t('featuresUseCases.tab0_stat1'), highlight: true }, { val: '100%', label: t('featuresUseCases.tab0_stat2'), highlight: false }, { val: '$0', label: t('featuresUseCases.tab0_stat3'), highlight: false }], cta: t('featuresUseCases.tab0_cta'), href: '/register' },
  { label: t('featuresUseCases.tab1'), icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', iconBg: 'bg-indigo-50 dark:bg-indigo-900/20', iconColor: 'text-indigo-500', title: t('featuresUseCases.tab1_title'), desc: t('featuresUseCases.tab1_desc'), bullets: [t('featuresUseCases.tab1_bullet0'), t('featuresUseCases.tab1_bullet1'), t('featuresUseCases.tab1_bullet2')], stats: [{ val: 'REST', label: t('featuresUseCases.tab1_stat0'), highlight: false }, { val: '< 50ms', label: t('featuresUseCases.tab1_stat1'), highlight: true }, { val: '50+', label: t('featuresUseCases.tab1_stat2'), highlight: false }, { val: '99.99%', label: t('featuresUseCases.tab1_stat3'), highlight: false }], cta: t('featuresUseCases.tab1_cta'), href: '/docs' },
  { label: t('featuresUseCases.tab2'), icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z', iconBg: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-500', title: t('featuresUseCases.tab2_title'), desc: t('featuresUseCases.tab2_desc'), bullets: [t('featuresUseCases.tab2_bullet0'), t('featuresUseCases.tab2_bullet1'), t('featuresUseCases.tab2_bullet2')], stats: [{ val: '12M+', label: t('featuresUseCases.tab2_stat0'), highlight: false }, { val: '4.8★', label: t('featuresUseCases.tab2_stat1'), highlight: true }, { val: '500K+', label: t('featuresUseCases.tab2_stat2'), highlight: false }, { val: '5 TB', label: t('featuresUseCases.tab2_stat3'), highlight: false }], cta: t('featuresUseCases.tab2_cta'), href: '/register' },
  { label: t('featuresUseCases.tab3'), icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', iconBg: 'bg-violet-50 dark:bg-violet-900/20', iconColor: 'text-violet-500', title: t('featuresUseCases.tab3_title'), desc: t('featuresUseCases.tab3_desc'), bullets: [t('featuresUseCases.tab3_bullet0'), t('featuresUseCases.tab3_bullet1'), t('featuresUseCases.tab3_bullet2')], stats: [{ val: '890 GB', label: t('featuresUseCases.tab3_stat0'), highlight: false }, { val: '256-bit', label: t('featuresUseCases.tab3_stat1'), highlight: true }, { val: 'GDPR', label: t('featuresUseCases.tab3_stat2'), highlight: false }, { val: '$8/mo', label: t('featuresUseCases.tab3_stat3'), highlight: false }], cta: t('featuresUseCases.tab3_cta'), href: '/register?plan=pro' },
])
</script>