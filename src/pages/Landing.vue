<template>
  <main>
    <LandingHero />
    <LandingTicker />
    <LandingValueProps />
    <LandingPlans />
    <LandingAnalytics />
    <LandingTestimonials />
    <LandingTrust />
    <LandingFinalCta />
  </main>
</template>

<script setup>
import LandingHero        from '../components/landing/Hero.vue'
import LandingTicker      from '../components/landing/Ticker.vue'
import LandingValueProps  from '../components/landing/ValueProps.vue'
import LandingPlans       from '../components/pricing/Plans.vue'
import LandingAnalytics   from '../components/landing/Analytics.vue'
import LandingTestimonials from '../components/landing/Testimonials.vue'
import LandingTrust       from '../components/landing/Trust.vue'
import LandingFinalCta    from '../components/landing/FinalCta.vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'

const { t } = useI18n()

useHead({
  title: 'Filesterr — Free File Sharing with Download Analytics',
  meta: [
    { name: 'description',        content: 'Share any file in seconds. See exactly who downloads it — country, device, bot or real person. 200MB free, no signup. Upgrade for 50GB, analytics & more.' },
    { property: 'og:title',       content: 'Filesterr — Free File Sharing with Download Analytics' },
    { property: 'og:description', content: 'Upload any file. Share a link. See who downloads it — real-time analytics, bot & proxy detection. 200MB free, no account.' },
    { property: 'og:image',       content: 'https://filesterr.com/logo.png' },
    { name: 'twitter:card',       content: 'summary_large_image' },
    { name: 'twitter:title',      content: 'Filesterr — Free File Sharing with Download Analytics' },
    { name: 'twitter:description', content: 'Upload any file. Share a link. See who downloads it — real-time analytics, bot & proxy detection. 200MB free.' },
  ],
  link: [{ rel: 'canonical', href: 'https://filesterr.com' }],
})

if (!import.meta.env.SSR) {
  const s = document.createElement('script')
  s.type = 'application/ld+json'
  s.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Filesterr',
    description: 'Fast, secure file sharing with advanced download analytics and visitor detection.',
    applicationCategory: 'UtilitiesApplication',
    offers: [
      { '@type': 'Offer', name: 'Anonymous', price: '0',    priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Free',      price: '0',    priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Premium',   price: '3.99', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Pro',       price: '7.99', priceCurrency: 'USD' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2847',
      bestRating: '5',
    },
  })
  document.head.appendChild(s)
}
</script>