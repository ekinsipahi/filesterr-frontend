// Plan data — i18n string keys ile birlikte kullanılır
// t(plan.nameKey) şeklinde çağrılır

export const PLANS = [
  {
    slug: 'anonymous',
    nameKey: 'plans.anonymous.name',
    taglineKey: 'plans.anonymous.tagline',
    featured: false,
    badge: null,
    price: { monthly: 0, yearly: 0 },
    storage: '1 GB',
    perFile: '1 GB',
    ads: 'More ads',
    analyticsLevel: 'Download count only',
    directLinks: false,
    passwordProtect: false,
    oneTimeLinks: false,
    expirable: false,
    visitorIntel: false,
    zipBatch: false,
    fullAnalytics: false,
    featureKeys: [
      'plans.anonymous.f1',
      'plans.anonymous.f2',
      'plans.anonymous.f3',
      'plans.anonymous.f4',
      'plans.anonymous.f5',
    ],
    ctaKey: 'plans.anonymous.cta',
    ctaHref: '#hero',
  },
  {
    slug: 'free',
    nameKey: 'plans.free.name',
    taglineKey: 'plans.free.tagline',
    featured: false,
    badge: null,
    price: { monthly: 0, yearly: 0 },
    storage: '10 GB',
    perFile: '5 GB',
    featureKeys: [
      'plans.free.f1',
      'plans.free.f2',
      'plans.free.f3',
      'plans.free.f4',
      'plans.free.f5',
    ],
    ctaKey: 'plans.free.cta',
    ctaHref: '/register',
  },
  {
    slug: 'premium',
    nameKey: 'plans.premium.name',
    taglineKey: 'plans.premium.tagline',
    featured: true,
    badgeKey: 'plans.popularBadge',
    price: { monthly: 3.89, yearly: 3.00 },
    storage: '150 GB',
    perFile: '50 GB',
    featureKeys: [
      'plans.premium.f1',
      'plans.premium.f2',
      'plans.premium.f3',
      'plans.premium.f4',
      'plans.premium.f5',
      'plans.premium.f6',
      'plans.premium.f7',
    ],
    ctaKey: 'plans.premium.cta',
    ctaHref: '/register?plan=premium',
  },
  {
    slug: 'pro',
    nameKey: 'plans.pro.name',
    taglineKey: 'plans.pro.tagline',
    featured: false,
    badgeKey: 'plans.bestValue',
    price: { monthly: 8.00, yearly: 6.00 },
    storage: '890 GB',
    perFile: '50 GB',
    featureKeys: [
      'plans.pro.f1',
      'plans.pro.f2',
      'plans.pro.f3',
      'plans.pro.f4',
      'plans.pro.f5',
      'plans.pro.f6',
      'plans.pro.f7',
      'plans.pro.f8',
      'plans.pro.f9',
      'plans.pro.f10',
    ],
    ctaKey: 'plans.pro.cta',
    ctaHref: '/register?plan=pro',
  },
]

export const WHY_UPGRADE_KEYS = [
  'plans.why1', 'plans.why2', 'plans.why3', 'plans.why4', 'plans.why5',
]

export const HERO_PILLS = [
  'hero.pill1', 'hero.pill2', 'hero.pill3',
  'hero.pill4', 'hero.pill5', 'hero.pill6',
]

export const FEATURES = [
  { iconBg: 'bg-brand-50 dark:bg-brand-900/20', iconColor: 'text-brand-500', glow: 'bg-brand-400/10', icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z', titleKey: 'features.item0.title', descKey: 'features.item0.desc' },
  { iconBg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-500', glow: 'bg-blue-400/10', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', titleKey: 'features.item1.title', descKey: 'features.item1.desc' },
  { iconBg: 'bg-violet-50 dark:bg-violet-900/20', iconColor: 'text-violet-500', glow: 'bg-violet-400/10', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', titleKey: 'features.item2.title', descKey: 'features.item2.desc' },
  { iconBg: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-500', glow: 'bg-amber-400/10', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', titleKey: 'features.item3.title', descKey: 'features.item3.desc' },
  { iconBg: 'bg-red-50 dark:bg-red-900/20', iconColor: 'text-red-500', glow: 'bg-red-400/10', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', titleKey: 'features.item4.title', descKey: 'features.item4.desc' },
  { iconBg: 'bg-zinc-100 dark:bg-zinc-800', iconColor: 'text-zinc-500', glow: 'bg-zinc-400/10', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16', titleKey: 'features.item5.title', descKey: 'features.item5.desc' },
]

export const STEPS = [
  { titleKey: 'features.step0.title', descKey: 'features.step0.desc' },
  { titleKey: 'features.step1.title', descKey: 'features.step1.desc' },
  { titleKey: 'features.step2.title', descKey: 'features.step2.desc' },
]

export const TRUST_BADGES = [
  { labelKey: 'trust.badge0', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { labelKey: 'trust.badge1', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { labelKey: 'trust.badge2', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { labelKey: 'trust.badge3', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { labelKey: 'trust.badge4', icon: 'M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z' },
]

export const REVIEW_COLORS = ['#6366f1','#22a366','#f59e0b','#ef4444','#8b5cf6','#0ea5e9']

export const ANALYTICS_ICON_STYLES = [
  { bg: 'bg-amber-50 dark:bg-amber-900/20', color: 'text-amber-500', icon: 'M13 10V3L4 14h7v7l9-11h-7z', badgeCls: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400' },
  { bg: 'bg-violet-50 dark:bg-violet-900/20', color: 'text-violet-500', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', badgeCls: 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' },
  { bg: 'bg-red-50 dark:bg-red-900/20', color: 'text-red-500', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636', badgeCls: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' },
  { bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-500', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', badgeCls: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' },
]

export const FOOTER_COLS = [
  { titleKey: 'footer.col0.title', links: [{ labelKey: 'footer.col0.l0', href: '#features' }, { labelKey: 'footer.col0.l1', href: '#pricing' }, { labelKey: 'footer.col0.l2', href: '#analytics' }, { labelKey: 'footer.col0.l3', href: '/docs' }] },
  { titleKey: 'footer.col1.title', links: [{ labelKey: 'footer.col1.l0', href: '/about' }, { labelKey: 'footer.col1.l1', href: '/blog' }, { labelKey: 'footer.col1.l2', href: '/careers' }, { labelKey: 'footer.col1.l3', href: '/status' }] },
  { titleKey: 'footer.col2.title', links: [{ labelKey: 'footer.col2.l0', href: '/privacy' }, { labelKey: 'footer.col2.l1', href: '/terms' }, { labelKey: 'footer.col2.l2', href: '/cookies' }, { labelKey: 'footer.col2.l3', href: '/gdpr' }] },
]

export const TICKER_ITEMS = [
  { value: '5,000+ TB', key: 'ticker.stored' },
  { value: '500K+',    key: 'ticker.users' },
  { value: '12M+',     key: 'ticker.uploaded' },
  { value: '99.99%',   key: 'ticker.uptime' },
  { value: '50+',      key: 'ticker.cdn' },
  { value: '4.8★',     key: 'ticker.rating' },
  { value: '< 1s',     key: 'ticker.speed' },
  { value: '256-bit',  key: 'ticker.encryption' },
]

export const REVIEW_KEYS = [
  { nameKey: 'reviews.r0.name', roleKey: 'reviews.r0.role', bodyKey: 'reviews.r0.body', stars: 5 },
  { nameKey: 'reviews.r1.name', roleKey: 'reviews.r1.role', bodyKey: 'reviews.r1.body', stars: 5 },
  { nameKey: 'reviews.r2.name', roleKey: 'reviews.r2.role', bodyKey: 'reviews.r2.body', stars: 5 },
  { nameKey: 'reviews.r3.name', roleKey: 'reviews.r3.role', bodyKey: 'reviews.r3.body', stars: 4 },
  { nameKey: 'reviews.r4.name', roleKey: 'reviews.r4.role', bodyKey: 'reviews.r4.body', stars: 5 },
  { nameKey: 'reviews.r5.name', roleKey: 'reviews.r5.role', bodyKey: 'reviews.r5.body', stars: 5 },
]

export const STAT_KEYS = [
  { value: '5000+ TB', key: 'stats.s0' },
  { value: '500K+',   key: 'stats.s1' },
  { value: '99.99%',  key: 'stats.s2' },
  { value: '< 50ms',  key: 'stats.s3' },
]

export const ANALYTICS_ITEM_KEYS = [
  { titleKey: 'analytics.item0.title', descKey: 'analytics.item0.desc', planKey: 'analytics.item0.plan' },
  { titleKey: 'analytics.item1.title', descKey: 'analytics.item1.desc', planKey: 'analytics.item1.plan' },
  { titleKey: 'analytics.item2.title', descKey: 'analytics.item2.desc', planKey: 'analytics.item2.plan' },
  { titleKey: 'analytics.item3.title', descKey: 'analytics.item3.desc', planKey: 'analytics.item3.plan' },
]