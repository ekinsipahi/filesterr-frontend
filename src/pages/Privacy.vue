<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">
    <div class="max-w-3xl mx-auto px-6 py-16">
      <div class="mb-10">
        <h1 class="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-50 mb-2">Privacy Policy</h1>
        <p class="text-sm text-zinc-500">Last updated: June 2025</p>
      </div>

      <div class="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed">

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">1. Information We Collect</h2>
          <p>We collect the following information:</p>
          <ul class="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Account data:</strong> Email address, username, and authentication provider (email/Google/GitHub)</li>
            <li><strong>Files:</strong> Files you upload and their metadata (name, size, type)</li>
            <li><strong>Download analytics:</strong> IP address, country, device type, browser, referrer — collected when someone downloads your files</li>
            <li><strong>Device fingerprint:</strong> Browser fingerprint for anonymous upload attribution and bot/proxy detection</li>
            <li><strong>Payment data:</strong> Processed by Stripe or crypto payment processors — we do not store card numbers</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">2. How We Use Your Information</h2>
          <ul class="list-disc pl-6 space-y-1">
            <li>To provide and improve the Service</li>
            <li>To show you download analytics on your files</li>
            <li>To detect bots, proxies, and VPNs in download traffic</li>
            <li>To send transactional emails (password reset, verification, subscription reminders)</li>
            <li>To prevent abuse and enforce our Terms of Service</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">3. IP Address and Geolocation</h2>
          <p>When a file is downloaded, we log the downloader's IP address and derive geolocation data (country, ASN) using IPInfo. This data is associated with the file owner's analytics — not stored as a personal profile of the downloader. IP addresses are stored for up to 90 days.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">4. Cookies and Fingerprinting</h2>
          <p>We use browser fingerprinting (not traditional cookies) to attribute anonymous uploads to devices and detect repeat visitors. This fingerprint is a hash — it cannot be reversed to identify you personally. We do not use tracking cookies for advertising purposes.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">5. Data Sharing</h2>
          <p>We do not sell your personal data. We share data with:</p>
          <ul class="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Cloudflare R2:</strong> File storage provider</li>
            <li><strong>IPInfo:</strong> IP geolocation for analytics</li>
            <li><strong>Stripe:</strong> Payment processing</li>
            <li><strong>Resend:</strong> Transactional email delivery</li>
            <li><strong>Law enforcement:</strong> When required by law or to protect users from harm</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">6. Data Retention</h2>
          <ul class="list-disc pl-6 space-y-1">
            <li>Anonymous files: deleted after 24 hours</li>
            <li>Account data: retained while your account is active</li>
            <li>Download analytics: retained for up to 12 months</li>
            <li>IP logs: retained for up to 90 days</li>
            <li>Account deletion: your data is permanently deleted within 30 days</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">7. Your Rights (GDPR / CCPA)</h2>
          <p>You have the right to:</p>
          <ul class="list-disc pl-6 mt-2 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request deletion of your account and data</li>
            <li>Export your data</li>
            <li>Opt out of non-essential communications</li>
          </ul>
          <p class="mt-3">To exercise these rights, email us at <a href="mailto:privacy@filesterr.com" class="text-brand-600 hover:underline">privacy@filesterr.com</a>.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">8. Security</h2>
          <p>Files are stored in Cloudflare R2 with private access — all download URLs are short-lived signed URLs (60 seconds). We use HTTPS for all data in transit. Passwords are hashed using industry-standard algorithms.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">9. Children's Privacy</h2>
          <p>Filesterr is not intended for users under 13 years of age. We do not knowingly collect data from children.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy. We will notify registered users of significant changes via email. Continued use after changes constitutes acceptance.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">11. Contact</h2>
          <p>Privacy questions: <a href="mailto:privacy@filesterr.com" class="text-brand-600 hover:underline">privacy@filesterr.com</a></p>
        </section>

      </div>
    </div>
  </main>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

useHead({
  title: computed(() => t('pageMeta.privacy.title')),
  meta: [
    { name: 'description', content: computed(() => t('pageMeta.privacy.description')) },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://filesterr.com/privacy' }],
})
</script>
