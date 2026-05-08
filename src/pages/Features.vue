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

if (!import.meta.env.SSR) {
  document.title = 'Filesterr Features — File Sharing, Analytics & Visitor Intelligence'

  const setMeta = (attr, key, content) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`)
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
    el.setAttribute('content', content)
  }
  const setLink = (rel, href) => {
    let el = document.querySelector(`link[rel="${rel}"]`)
    if (!el) { el = document.createElement('link'); el.rel = rel; document.head.appendChild(el) }
    el.href = href
  }

  setMeta('name',     'description',       'Explore every Filesterr feature: real-time file analytics, visitor fingerprinting, bot & VPN detection, password protection, expiring links, and more.')
  setMeta('property', 'og:title',          'Filesterr Features — File Sharing, Analytics & Visitor Intelligence')
  setMeta('property', 'og:description',    'Real-time download analytics, visitor fingerprinting, bot detection, and enterprise-grade security — all in one file sharing platform.')
  setMeta('property', 'og:url',            'https://filesterr.com/features')
  setMeta('property', 'og:type',           'website')
  setMeta('property', 'og:image',          'https://filesterr.com/og/features.png')
  setMeta('name',     'twitter:card',      'summary_large_image')
  setMeta('name',     'twitter:title',     'Filesterr Features — The Smartest File Sharing Platform')
  setLink('canonical', 'https://filesterr.com/features')

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