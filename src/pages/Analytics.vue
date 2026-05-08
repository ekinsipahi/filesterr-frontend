<template>
  <div>
    <AnalyticsHero />
    <AnalyticsTicker />
    <AnalyticsPainGain />
    <AnalyticsFeatures />
    <AnalyticsUseCases />
    <AnalyticsComparison />
    <AnalyticsTestimonials />
    <AnalyticsFinalCta />
    <AnalyticsFaq />
  </div>
</template>

<script setup>
import AnalyticsHero         from '../components/analytics/Hero.vue'
import AnalyticsTicker       from '../components/analytics/Ticker.vue'
import AnalyticsPainGain     from '../components/analytics/PainGain.vue'
import AnalyticsFeatures     from '../components/analytics/Features.vue'
import AnalyticsUseCases     from '../components/analytics/UseCases.vue'
import AnalyticsComparison   from '../components/analytics/Comparison.vue'
import AnalyticsTestimonials from '../components/analytics/Testimonials.vue'
import AnalyticsFinalCta     from '../components/analytics/FinalCta.vue'
import AnalyticsFaq          from '../components/analytics/Faq.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'File Download Analytics & Visitor Intelligence — Filesterr',
  meta: [
    { name: 'description',         content: 'See who downloads your files, where they are, and when — in real time. Detect bots, VPNs, and returning visitors. The smartest file analytics on the web.' },
    { name: 'keywords',            content: 'file download analytics, visitor tracking, bot detection, VPN detection, file sharing analytics, download statistics' },
    { property: 'og:title',        content: 'File Download Analytics & Visitor Intelligence — Filesterr' },
    { property: 'og:description',  content: 'See who downloads your files, where they are, and when — in real time. Detect bots, VPNs, and returning visitors.' },
    { property: 'og:url',          content: 'https://filesterr.com/analytics' },
    { property: 'og:type',         content: 'website' },
    { property: 'og:image',        content: 'https://filesterr.com/og/analytics.png' },
    { name: 'twitter:card',        content: 'summary_large_image' },
    { name: 'twitter:title',       content: 'File Download Analytics & Visitor Intelligence — Filesterr' },
    { name: 'twitter:description', content: 'See who downloads your files, where they are, and when — in real time.' },
    { name: 'robots',              content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://filesterr.com/analytics' }],
})

if (!import.meta.env.SSR) {
  const s = document.createElement('script')
  s.type = 'application/ld+json'
  s.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Filesterr — File Download Analytics',
    description: 'Real-time download analytics, visitor fingerprinting, bot detection, VPN detection, and geographic heatmaps for every file you share.',
    url: 'https://filesterr.com/analytics',
  })
  document.head.appendChild(s)
}
</script>