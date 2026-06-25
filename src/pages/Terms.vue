<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">
    <div class="max-w-3xl mx-auto px-6 py-16">
      <div class="mb-10">
        <h1 class="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-50 mb-2">Terms of Service</h1>
        <p class="text-sm text-zinc-500">Last updated: June 2025</p>
      </div>

      <div class="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed">

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using Filesterr ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">2. Description of Service</h2>
          <p>Filesterr is a file sharing platform that allows users to upload, share, and track files. We offer free and paid plans with varying storage limits and features.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">3. User Accounts</h2>
          <p>You may use the Service without an account (guest/anonymous mode) with limited features. Registered accounts provide additional storage, analytics, and premium features. You are responsible for maintaining the confidentiality of your account credentials.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">4. Acceptable Use</h2>
          <p>You agree not to use the Service to upload, share, or distribute:</p>
          <ul class="list-disc pl-6 mt-2 space-y-1">
            <li>Illegal content of any kind</li>
            <li>Malware, viruses, or harmful software</li>
            <li>Content that infringes on intellectual property rights</li>
            <li>Child sexual abuse material (CSAM) — zero tolerance, immediately reported to authorities</li>
            <li>Content that violates any applicable laws</li>
          </ul>
          <p class="mt-3">We reserve the right to remove any content and terminate accounts that violate these rules without notice.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">5. File Storage and Retention</h2>
          <p>Anonymous uploads are automatically deleted after <strong>24 hours</strong>. Free plan files are retained as long as the account is active. Paid plan files are retained per plan terms. We reserve the right to delete files that violate our policies or after extended inactivity.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">6. Payments and Subscriptions</h2>
          <p>Paid plans are billed in advance on a monthly or annual basis. Payments processed via Stripe are subject to Stripe's terms. Crypto payments are non-refundable. Subscriptions do not auto-renew — you must manually renew before expiry.</p>
          <p class="mt-2">Upon expiry of a paid plan, your account reverts to the Free plan. Your files and data are preserved.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">7. Analytics and Tracking</h2>
          <p>Filesterr collects download analytics on your behalf when users download your files. This data is processed to provide you with insights. We do not sell this data to third parties. See our <router-link to="/privacy" class="text-brand-600 hover:underline">Privacy Policy</router-link> for details.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">8. Intellectual Property</h2>
          <p>You retain ownership of all files you upload. By uploading, you grant Filesterr a limited license to store and serve your files to deliver the Service. We do not claim ownership of your content.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">9. Limitation of Liability</h2>
          <p>The Service is provided "as is" without warranties of any kind. Filesterr shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">10. Termination</h2>
          <p>You may delete your account at any time. We may suspend or terminate your account for violations of these Terms. Upon termination, your files will be deleted within 30 days.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">11. Changes to Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms. We will notify registered users of significant changes via email.</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">12. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:legal@filesterr.com" class="text-brand-600 hover:underline">legal@filesterr.com</a>.</p>
        </section>

      </div>
    </div>
  </main>
</template>

<script setup>
import { useHead } from '@vueuse/head'
useHead({
  title: 'Terms of Service — Filesterr',
  meta: [
    { name: 'description', content: 'Read the Filesterr Terms of Service — acceptable use, storage policies, payments, and more.' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://filesterr.com/terms' }],
})
</script>
