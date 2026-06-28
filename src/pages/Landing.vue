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
import { computed } from 'vue'

const { t } = useI18n()

useHead({
  title: computed(() => t('pageMeta.landing.title')),
  meta: [
    { name: 'description',        content: computed(() => t('pageMeta.landing.description')) },
    { property: 'og:title',       content: computed(() => t('pageMeta.landing.ogTitle')) },
    { property: 'og:description', content: computed(() => t('pageMeta.landing.ogDescription')) },
    { property: 'og:image',       content: 'https://filesterr.com/logo.png' },
    { name: 'twitter:card',       content: 'summary_large_image' },
    { name: 'twitter:title',      content: computed(() => t('pageMeta.landing.ogTitle')) },
    { name: 'twitter:description', content: computed(() => t('pageMeta.landing.ogDescription')) },
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