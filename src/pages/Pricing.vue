<template>
  <main>
    <PricingHero />
    <PricingComparison />
    <PricingPlans />
    <PricingWhyPay />
    <PricingFaq />
    <PricingFinalCta />
  </main>
</template>

<script setup>
import PricingHero       from '../components/pricing/Hero.vue'
import PricingComparison from '../components/pricing/Comparison.vue'
import PricingPlans      from '../components/pricing/Plans.vue'
import PricingWhyPay     from '../components/pricing/WhyPay.vue'
import PricingFaq        from '../components/pricing/Faq.vue'
import PricingFinalCta   from '../components/pricing/FinalCta.vue'
import { useHead }       from '@vueuse/head'
import { useI18n }       from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('pricing.meta.title'),
  meta: [
    { name: 'description',        content: t('pricing.meta.description') },
    { name: 'keywords',           content: t('pricing.meta.keywords') },
    { property: 'og:title',       content: t('pricing.meta.ogTitle') },
    { property: 'og:description', content: t('pricing.meta.ogDescription') },
    { property: 'og:type',        content: 'website' },
    { name: 'twitter:card',       content: 'summary_large_image' },
    { name: 'twitter:title',      content: t('pricing.meta.ogTitle') },
    { name: 'twitter:description',content: t('pricing.meta.ogDescription') },
    { name: 'robots',             content: 'index, follow' },
  ],
  link: [
    { rel: 'canonical', href: 'https://filesterr.com/pricing' },
  ],
})

if (!import.meta.env.SSR) {
  const s = document.createElement('script')
  s.type = 'application/ld+json'
  s.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Filesterr Pricing',
    description: 'Fast, secure file sharing with analytics. Plans starting at $0 — free forever, no credit card required.',
    url: 'https://filesterr.com/pricing',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem', position: 1,
          item: { '@type': 'Offer', name: 'Free Plan', price: '0', priceCurrency: 'USD', description: 'Upload & share files instantly. No account needed.' },
        },
        {
          '@type': 'ListItem', position: 2,
          item: { '@type': 'Offer', name: 'Premium', price: '3.89', priceCurrency: 'USD', description: 'Larger uploads, password protection, custom expiry.' },
        },
        {
          '@type': 'ListItem', position: 3,
          item: { '@type': 'Offer', name: 'Pro', price: '8.00', priceCurrency: 'USD', description: 'Full analytics, visitor detection, IP flagging, team features.' },
        },
      ],
    },
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