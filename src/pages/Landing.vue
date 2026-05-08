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
import LandingPlans       from '../components/landing/Plans.vue'
import LandingAnalytics   from '../components/landing/Analytics.vue'
import LandingTestimonials from '../components/landing/Testimonials.vue'
import LandingTrust       from '../components/landing/Trust.vue'
import LandingFinalCta    from '../components/landing/FinalCta.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
      { '@type': 'Offer', name: 'Premium',   price: '3.89', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Pro',       price: '8.00', priceCurrency: 'USD' },
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