<template>
  <div>
    <FeaturesHero />
    <FeaturesGrid />
    <FeaturesDeepDive />
    <FeaturesCompareTable />
    <FeaturesHowItWorks />
    <FeaturesUseCaseTabs />
    <FeaturesFaq />
  </div>
</template>

<script setup>
import FeaturesHero         from '../components/features/FeaturesHero.vue'
import FeaturesGrid         from '../components/features/FeaturesGrid.vue'
import FeaturesDeepDive     from '../components/features/FeaturesDeepDive.vue'
import FeaturesCompareTable from '../components/features/FeaturesCompareTable.vue'
import FeaturesHowItWorks   from '../components/features/FeaturesHowItWorks.vue'
import FeaturesUseCaseTabs  from '../components/features/FeaturesUseCaseTabs.vue'
import FeaturesFaq          from '../components/features/FeaturesFaq.vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

useHead({
  title: computed(() => t('pageMeta.features.title')),
  meta: [
    { name: 'description', content: computed(() => t('pageMeta.features.description')) },
    { name: 'robots',      content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://filesterr.com/features' }],
})

if (!import.meta.env.SSR) {
  const ld = document.createElement('script')
  ld.type = 'application/ld+json'
  ld.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Filesterr Features',
    url: 'https://filesterr.com/features',
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Filesterr',
      applicationCategory: 'BusinessApplication',
      featureList: [
        'Real-time file download analytics', 'Visitor fingerprinting across sessions',
        'Bot and datacenter IP detection', 'VPN and proxy detection',
        'Password-protected file sharing', 'Expiring download links',
        'One-time download links', 'Geographic download heatmaps',
        '256-bit AES encryption', 'Direct download links', 'API access', 'Bulk ZIP downloads',
      ],
    },
  })
  document.head.appendChild(ld)
}
</script>