<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">
    <div class="bg-gradient-to-b from-emerald-50/40 to-transparent dark:from-emerald-950/20 dark:to-transparent pt-20 pb-12">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-6">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          {{ c.eyebrow }}
        </div>
        <h1 class="text-4xl sm:text-5xl font-display font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-4 leading-tight">{{ c.h1 }}</h1>
        <p class="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">{{ c.intro }}</p>
        <a href="/upload" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-base transition-colors shadow-lg shadow-brand-500/25">
          {{ c.cta }} →
        </a>
        <p class="mt-3 text-xs text-zinc-400">{{ c.ctaSub }}</p>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-6 py-12 space-y-14">

      <!-- Free tiers breakdown -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="tier in c.tiers" :key="tier.label" class="p-5 rounded-xl border-2 transition-colors" :class="tier.highlight ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30' : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40'">
          <p class="text-xs font-bold uppercase tracking-wide" :class="tier.highlight ? 'text-brand-600 dark:text-brand-400' : 'text-zinc-500'">{{ tier.label }}</p>
          <p class="text-2xl font-display font-extrabold mt-1" :class="tier.highlight ? 'text-brand-700 dark:text-brand-300' : 'text-zinc-900 dark:text-zinc-100'">{{ tier.storage }}</p>
          <ul class="mt-3 space-y-1">
            <li v-for="f in tier.features" :key="f" class="text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
              <svg class="w-3 h-3 shrink-0" :class="tier.highlight ? 'text-brand-500' : 'text-zinc-400'" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              {{ f }}
            </li>
          </ul>
        </div>
      </div>

      <section v-for="section in c.sections" :key="section.h2">
        <h2 class="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-4">{{ section.h2 }}</h2>
        <div class="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p v-for="p in section.paragraphs" :key="p">{{ p }}</p>
        </div>
        <ul v-if="section.bullets" class="mt-4 space-y-2">
          <li v-for="b in section.bullets" :key="b" class="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 text-sm">
            <svg class="w-4 h-4 text-brand-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
            {{ b }}
          </li>
        </ul>
      </section>

      <div class="rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
        <p class="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">{{ c.relatedTitle }}</p>
        <div class="flex flex-wrap gap-3">
          <a href="/pricing" class="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">{{ c.linkPricing }}</a>
          <a href="/upload" class="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">{{ c.linkUpload }}</a>
        </div>
      </div>

      <div class="text-center py-6">
        <a href="/upload" class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg transition-colors shadow-xl shadow-brand-500/20">
          {{ c.cta }} →
        </a>
        <p class="mt-3 text-sm text-zinc-400">{{ c.ctaSub }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const route = useRoute()
const locale = computed(() => route.params.locale || 'en')

const content = {
  en: {
    eyebrow: 'Free forever · No credit card',
    h1: 'Free File Sharing That\'s Actually Free — No Hidden Limits, No Fake Trial',
    intro: '1GB free for anonymous uploads. 10GB free with a registered account. No credit card, no expiring trial, no surprise paywall at 30 days. Filesterr\'s free tier is genuinely free.',
    cta: 'Start Sharing Free',
    ctaSub: 'No credit card · Free forever · Upgrade when ready',
    tiers: [
      { label: 'Anonymous (no account)', storage: '1GB', highlight: false, features: ['Per upload', 'Instant link', 'Expires in 24h', 'All file types'] },
      { label: 'Free Account', storage: '10GB', highlight: true, features: ['Total storage', 'Files persist', 'Basic analytics', 'Email support'] },
    ],
    sections: [
      {
        h2: 'What does "free file sharing" actually mean on Filesterr?',
        paragraphs: [
          'There are two levels of free on Filesterr. The first: completely anonymous, no account, no email. Upload up to 1GB per file, get an instant link, file expires after 24 hours. Zero strings.',
          'The second: create a free account (no credit card) and get 10GB of persistent storage, basic download statistics, and fewer ads. The free account is genuinely free — not a 14-day trial, not "free until we decide it isn\'t."',
        ],
        bullets: [
          '1GB per anonymous upload — no signup, no email',
          '10GB total storage with a free registered account',
          'Files persist indefinitely on registered accounts (not just 24 hours)',
          'Basic download statistics on the free account',
          'No credit card ever required for either free tier',
          'Upgrade to paid only if you need more storage or advanced analytics',
        ],
      },
      {
        h2: 'Free large file sharing websites: what to actually expect',
        paragraphs: [
          'Be honest about what "free" means on most platforms. WeTransfer free: 2GB limit, ad-heavy download pages, no analytics. Dropbox free: 2GB storage, requires both sender and recipient to have accounts for most features. Google Drive: 15GB storage but shared with Gmail and Photos, requires Google accounts.',
          'Filesterr free gives you 10GB of dedicated file storage, a clean anonymous upload path that doesn\'t require accounts, and basic analytics. No ads on the sender side, a brief countdown on the recipient side (eliminated on paid plans).',
        ],
      },
      {
        h2: 'When to upgrade from free file sharing',
        paragraphs: [
          'The free plan covers casual file sharing perfectly. When you need more, the upgrade decision is easy: Premium gives you 150GB storage, 50GB per file, and zero ads on recipient pages. Pro adds 890GB, visitor fingerprinting, VPN/bot detection, and heatmaps.',
          'Start free. Upgrade if your needs grow. There\'s no pressure and no arbitrary feature limits on the free tier that exist just to push you toward paying.',
        ],
        bullets: [
          'Premium (150GB): large files, zero ads, password protection',
          'Pro (890GB): full analytics suite, visitor fingerprinting, bot detection',
          'Pro Max (2TB): maximum power for teams and heavy users',
          'All paid plans: 30-day money back guarantee',
        ],
      },
    ],
    relatedTitle: 'Compare options:',
    linkPricing: 'View All Pricing Plans →',
    linkUpload: 'Upload a File Free Now →',
  },
  tr: {
    eyebrow: 'Sonsuza kadar ücretsiz · Kredi kartı yok',
    h1: 'Gerçekten Ücretsiz Dosya Paylaşımı — Gizli Limit Yok, Sahte Deneme Yok',
    intro: 'Anonim yüklemeler için 1 GB ücretsiz. Kayıtlı hesapla 10 GB ücretsiz. Kredi kartı yok, süresi dolan deneme yok.',
    cta: 'Ücretsiz Paylaşmaya Başla',
    ctaSub: 'Kredi kartı yok · Sonsuza kadar ücretsiz',
    tiers: [
      { label: 'Anonim (hesap yok)', storage: '1GB', highlight: false, features: ['Yükleme başına', 'Anında bağlantı', '24 saatte sona erer', 'Tüm dosya türleri'] },
      { label: 'Ücretsiz Hesap', storage: '10GB', highlight: true, features: ['Toplam depolama', 'Dosyalar kalıcı', 'Temel analitik', 'E-posta desteği'] },
    ],
    sections: [
      {
        h2: 'Filesterr\'de "ücretsiz dosya paylaşımı" gerçekte ne anlama gelir?',
        paragraphs: [
          'Filesterr\'de iki ücretsiz seviye vardır. Birincisi: tamamen anonim, hesap yok, e-posta yok. Dosya başına 1 GB\'a kadar yükleyin, anında bağlantı alın, dosya 24 saat sonra sona erer. Hiçbir koşul yok.',
          'İkincisi: ücretsiz bir hesap oluşturun (kredi kartı gerekmez) ve 10 GB kalıcı depolama, temel indirme istatistikleri ve daha az reklam alın. Ücretsiz hesap gerçekten ücretsizdir — 14 günlük deneme değil, "biz karar verene kadar ücretsiz" de değil.',
        ],
        bullets: [
          'Anonim yükleme başına 1 GB — kayıt yok, e-posta yok',
          'Ücretsiz kayıtlı hesapla toplam 10 GB depolama',
          'Kayıtlı hesaplarda dosyalar süresiz olarak saklanır (sadece 24 saat değil)',
          'Ücretsiz hesapta temel indirme istatistikleri',
          'Her iki ücretsiz katman için de asla kredi kartı gerekmez',
          'Yalnızca daha fazla depolama veya gelişmiş analitik ihtiyacınız varsa ücretliye geçin',
        ],
      },
      {
        h2: 'Ücretsiz büyük dosya paylaşım siteleri: gerçekten ne beklenmeli',
        paragraphs: [
          'Çoğu platformda "ücretsiz"in ne anlama geldiğine dürüstçe bakalım. WeTransfer ücretsiz: 2 GB sınırı, reklam dolu indirme sayfaları, analitik yok. Dropbox ücretsiz: 2 GB depolama, çoğu özellik için hem gönderenin hem alıcının hesap sahibi olması gerekiyor. Google Drive: 15 GB depolama ancak Gmail ve Fotoğraflar ile paylaşılıyor, Google hesabı gerekiyor.',
          'Filesterr ücretsiz katmanı size 10 GB özel dosya depolama, hesap gerektirmeyen temiz bir anonim yükleme yolu ve temel analitik sunar. Gönderici tarafında reklam yok, alıcı tarafında kısa bir geri sayım var (ücretli planlarda tamamen kaldırılıyor).',
        ],
      },
      {
        h2: 'Ücretsiz dosya paylaşımından ne zaman yükseltme yapmalı',
        paragraphs: [
          'Ücretsiz plan günlük dosya paylaşımını mükemmel şekilde karşılar. Daha fazlasına ihtiyaç duyduğunuzda yükseltme kararı kolaydır: Premium size 150 GB depolama, dosya başına 50 GB ve alıcı sayfalarında sıfır reklam sunar. Pro ise 890 GB, ziyaretçi parmak izi, VPN/bot tespiti ve ısı haritaları ekler.',
          'Ücretsiz başlayın. İhtiyaçlarınız büyüdükçe yükseltin. Hiçbir baskı yok ve sizi ödemeye zorlamak için yapay özellik kısıtlaması yok.',
        ],
        bullets: [
          'Premium (150GB): büyük dosyalar, sıfır reklam, şifre koruması',
          'Pro (890GB): tam analitik paketi, ziyaretçi parmak izi, bot tespiti',
          'Pro Max (2TB): ekipler ve yoğun kullanıcılar için maksimum güç',
          'Tüm ücretli planlar: 30 günlük para iade garantisi',
        ],
      },
    ],
    relatedTitle: 'Seçenekleri karşılaştır:',
    linkPricing: 'Tüm Fiyatlandırma Planlarını Görüntüle →',
    linkUpload: 'Şimdi Ücretsiz Dosya Yükle →',
  },
  de: {
    eyebrow: 'Für immer kostenlos · Keine Kreditkarte',
    h1: 'Kostenlose Dateifreigabe, die wirklich kostenlos ist — keine versteckten Limits',
    intro: '1 GB kostenlos für anonyme Uploads. 10 GB kostenlos mit registriertem Konto. Keine Kreditkarte, keine ablaufende Testversion.',
    cta: 'Kostenlos teilen starten',
    ctaSub: 'Keine Kreditkarte · Für immer kostenlos',
    tiers: [
      { label: 'Anonym (kein Konto)', storage: '1 GB', highlight: false, features: ['Pro Upload', 'Sofortiger Link', 'Läuft in 24h ab', 'Alle Dateitypen'] },
      { label: 'Kostenloses Konto', storage: '10 GB', highlight: true, features: ['Gesamtspeicher', 'Dateien bleiben', 'Grundlegende Analysen', 'E-Mail-Support'] },
    ],
    sections: [
      {
        h2: 'Was bedeutet „kostenlose Dateifreigabe" bei Filesterr wirklich?',
        paragraphs: [
          'Bei Filesterr gibt es zwei kostenlose Stufen. Die erste: vollständig anonym, kein Konto, keine E-Mail-Adresse. Laden Sie bis zu 1 GB pro Datei hoch, erhalten Sie sofort einen Link — die Datei läuft nach 24 Stunden ab. Keine Bedingungen.',
          'Die zweite: Erstellen Sie ein kostenloses Konto (keine Kreditkarte erforderlich) und erhalten Sie 10 GB dauerhaften Speicher, grundlegende Download-Statistiken und weniger Werbung. Das kostenlose Konto ist wirklich kostenlos — keine 14-Tage-Testversion, kein „kostenlos bis wir es anders entscheiden".',
        ],
        bullets: [
          '1 GB pro anonymem Upload — keine Registrierung, keine E-Mail',
          '10 GB Gesamtspeicher mit kostenlosem registriertem Konto',
          'Dateien bleiben auf registrierten Konten dauerhaft gespeichert (nicht nur 24 Stunden)',
          'Grundlegende Download-Statistiken beim kostenlosen Konto',
          'Für keine der beiden kostenlosen Stufen wird je eine Kreditkarte benötigt',
          'Nur dann upgraden, wenn Sie mehr Speicher oder erweiterte Analysen benötigen',
        ],
      },
      {
        h2: 'Kostenlose Dienste für große Dateien: Was Sie wirklich erwarten können',
        paragraphs: [
          'Seien Sie ehrlich darüber, was „kostenlos" bei den meisten Plattformen bedeutet. WeTransfer kostenlos: 2-GB-Limit, werbeintensive Download-Seiten, keine Analysen. Dropbox kostenlos: 2 GB Speicher, für die meisten Funktionen müssen sowohl Sender als auch Empfänger ein Konto haben. Google Drive: 15 GB Speicher, aber geteilt mit Gmail und Fotos, erfordert Google-Konten.',
          'Filesterr kostenlos bietet Ihnen 10 GB dedizierten Dateispeicher, einen sauberen anonymen Upload-Pfad ohne Konten und grundlegende Analysen. Keine Werbung auf der Absenderseite, ein kurzer Countdown auf der Empfängerseite (bei kostenpflichtigen Plänen entfernt).',
        ],
      },
      {
        h2: 'Wann Sie von der kostenlosen Dateifreigabe upgraden sollten',
        paragraphs: [
          'Der kostenlose Plan deckt gelegentliches Teilen von Dateien perfekt ab. Wenn Sie mehr benötigen, ist die Upgrade-Entscheidung einfach: Premium bietet Ihnen 150 GB Speicher, 50 GB pro Datei und null Werbung auf Empfängerseiten. Pro fügt 890 GB, Besucher-Fingerprinting, VPN/Bot-Erkennung und Heatmaps hinzu.',
          'Starten Sie kostenlos. Upgraden Sie, wenn Ihre Anforderungen wachsen. Kein Druck und keine willkürlichen Funktionsbeschränkungen im kostenlosen Tarif, die nur dazu dienen, Sie zur Zahlung zu drängen.',
        ],
        bullets: [
          'Premium (150GB): große Dateien, null Werbung, Passwortschutz',
          'Pro (890GB): vollständige Analyse-Suite, Besucher-Fingerprinting, Bot-Erkennung',
          'Pro Max (2TB): maximale Leistung für Teams und Power-User',
          'Alle kostenpflichtigen Pläne: 30 Tage Geld-zurück-Garantie',
        ],
      },
    ],
    relatedTitle: 'Optionen vergleichen:',
    linkPricing: 'Alle Preispläne anzeigen →',
    linkUpload: 'Jetzt kostenlos Datei hochladen →',
  },
  fr: {
    eyebrow: 'Gratuit pour toujours · Sans carte bancaire',
    h1: 'Partage de fichiers gratuit — vraiment gratuit, sans limites cachées ni faux essai',
    intro: '1 Go gratuit pour les uploads anonymes. 10 Go gratuit avec un compte enregistré. Pas de carte bancaire, pas d\'essai limité dans le temps.',
    cta: 'Commencer à partager gratuitement',
    ctaSub: 'Sans carte bancaire · Gratuit pour toujours',
    tiers: [
      { label: 'Anonyme (sans compte)', storage: '1 Go', highlight: false, features: ['Par upload', 'Lien instantané', 'Expire en 24h', 'Tous types de fichiers'] },
      { label: 'Compte gratuit', storage: '10 Go', highlight: true, features: ['Stockage total', 'Fichiers persistants', 'Analyses basiques', 'Support e-mail'] },
    ],
    sections: [
      {
        h2: 'Que signifie concrètement « partage gratuit » sur Filesterr ?',
        paragraphs: [
          'Filesterr propose deux niveaux gratuits. Le premier : totalement anonyme, sans compte ni adresse e-mail. Uploadez jusqu\'à 1 Go par fichier, obtenez un lien instantané, le fichier expire au bout de 24 heures. Sans aucune condition.',
          'Le second : créez un compte gratuit (sans carte bancaire) et bénéficiez de 10 Go de stockage persistant, de statistiques de téléchargement basiques et de moins de publicités. Le compte gratuit est vraiment gratuit — pas un essai de 14 jours, pas un « gratuit jusqu\'à ce qu\'on décide que ça ne l\'est plus ».',
        ],
        bullets: [
          '1 Go par upload anonyme — sans inscription, sans e-mail',
          '10 Go de stockage total avec un compte gratuit enregistré',
          'Les fichiers sont conservés indéfiniment sur les comptes enregistrés (pas seulement 24 heures)',
          'Statistiques de téléchargement basiques sur le compte gratuit',
          'Aucune carte bancaire requise pour aucun des deux niveaux gratuits',
          'Passez au payant uniquement si vous avez besoin de plus de stockage ou d\'analyses avancées',
        ],
      },
      {
        h2: 'Sites gratuits de partage de grands fichiers : à quoi s\'attendre vraiment',
        paragraphs: [
          'Soyons honnêtes sur ce que signifie « gratuit » sur la plupart des plateformes. WeTransfer gratuit : limite de 2 Go, pages de téléchargement bourrées de publicités, pas d\'analyses. Dropbox gratuit : 2 Go de stockage, nécessite que l\'expéditeur et le destinataire aient tous les deux un compte pour la plupart des fonctionnalités. Google Drive : 15 Go de stockage partagé avec Gmail et Photos, nécessite des comptes Google.',
          'Filesterr gratuit vous offre 10 Go de stockage dédié, un chemin d\'upload anonyme qui ne nécessite pas de compte, et des analyses basiques. Pas de publicités côté expéditeur, un court compte à rebours côté destinataire (supprimé sur les plans payants).',
        ],
      },
      {
        h2: 'Quand passer à un plan payant pour le partage de fichiers',
        paragraphs: [
          'Le plan gratuit couvre parfaitement le partage de fichiers occasionnel. Quand vous avez besoin de plus, la décision de passer au niveau supérieur est simple : Premium vous offre 150 Go de stockage, 50 Go par fichier et zéro publicité sur les pages destinataires. Pro ajoute 890 Go, le fingerprinting des visiteurs, la détection VPN/bot et les heatmaps.',
          'Commencez gratuitement. Upgradez si vos besoins évoluent. Aucune pression et aucune limitation artificielle sur le niveau gratuit destinée à vous pousser à payer.',
        ],
        bullets: [
          'Premium (150GB) : grands fichiers, zéro publicité, protection par mot de passe',
          'Pro (890GB) : suite d\'analyses complète, fingerprinting des visiteurs, détection de bots',
          'Pro Max (2TB) : puissance maximale pour les équipes et les utilisateurs intensifs',
          'Tous les plans payants : garantie satisfait ou remboursé 30 jours',
        ],
      },
    ],
    relatedTitle: 'Comparer les options :',
    linkPricing: 'Voir tous les plans →',
    linkUpload: 'Uploader gratuitement maintenant →',
  },
  es: {
    eyebrow: 'Gratis para siempre · Sin tarjeta',
    h1: 'Compartir Archivos Gratis de Verdad — Sin Límites Ocultos, Sin Prueba Falsa',
    intro: '1 GB gratis para subidas anónimas. 10 GB gratis con cuenta registrada. Sin tarjeta, sin período de prueba.',
    cta: 'Empezar a compartir gratis',
    ctaSub: 'Sin tarjeta · Gratis para siempre',
    tiers: [
      { label: 'Anónimo (sin cuenta)', storage: '1 GB', highlight: false, features: ['Por subida', 'Enlace instantáneo', 'Expira en 24h', 'Todos los tipos'] },
      { label: 'Cuenta gratuita', storage: '10 GB', highlight: true, features: ['Almacenamiento total', 'Archivos persistentes', 'Analíticas básicas', 'Soporte por email'] },
    ],
    sections: [
      {
        h2: '¿Qué significa realmente "compartir archivos gratis" en Filesterr?',
        paragraphs: [
          'En Filesterr hay dos niveles gratuitos. El primero: completamente anónimo, sin cuenta, sin correo electrónico. Sube hasta 1 GB por archivo, obtén un enlace al instante, el archivo expira a las 24 horas. Sin condiciones.',
          'El segundo: crea una cuenta gratuita (sin tarjeta de crédito) y obtén 10 GB de almacenamiento persistente, estadísticas básicas de descargas y menos publicidad. La cuenta gratuita es genuinamente gratuita — no es una prueba de 14 días ni un "gratis hasta que nosotros decidamos que no lo es".',
        ],
        bullets: [
          '1 GB por subida anónima — sin registro, sin correo electrónico',
          '10 GB de almacenamiento total con una cuenta registrada gratuita',
          'Los archivos se conservan indefinidamente en cuentas registradas (no solo 24 horas)',
          'Estadísticas básicas de descarga en la cuenta gratuita',
          'Nunca se requiere tarjeta de crédito para ninguno de los dos niveles gratuitos',
          'Actualiza a un plan de pago solo si necesitas más almacenamiento o analíticas avanzadas',
        ],
      },
      {
        h2: 'Sitios para compartir archivos grandes gratis: qué esperar realmente',
        paragraphs: [
          'Seamos honestos sobre lo que significa "gratis" en la mayoría de las plataformas. WeTransfer gratis: límite de 2 GB, páginas de descarga llenas de anuncios, sin analíticas. Dropbox gratis: 2 GB de almacenamiento, requiere que tanto el emisor como el receptor tengan cuentas para la mayoría de las funciones. Google Drive: 15 GB de almacenamiento compartido con Gmail y Fotos, requiere cuentas de Google.',
          'Filesterr gratuito te da 10 GB de almacenamiento dedicado, un proceso de subida anónima limpio que no requiere cuentas y analíticas básicas. Sin anuncios del lado del emisor, una breve cuenta regresiva del lado del receptor (eliminada en los planes de pago).',
        ],
      },
      {
        h2: 'Cuándo actualizar desde el nivel gratuito de compartición de archivos',
        paragraphs: [
          'El plan gratuito cubre perfectamente el uso casual. Cuando necesites más, la decisión de actualizar es sencilla: Premium te da 150 GB de almacenamiento, 50 GB por archivo y cero anuncios en las páginas de los destinatarios. Pro agrega 890 GB, fingerprinting de visitantes, detección de VPN/bots y mapas de calor.',
          'Comienza gratis. Actualiza si tus necesidades crecen. Sin presión y sin límites de funciones arbitrarios en el nivel gratuito que solo existen para empujarte a pagar.',
        ],
        bullets: [
          'Premium (150GB): archivos grandes, cero anuncios, protección con contraseña',
          'Pro (890GB): suite completa de analíticas, fingerprinting de visitantes, detección de bots',
          'Pro Max (2TB): máximo rendimiento para equipos y usuarios intensivos',
          'Todos los planes de pago: garantía de devolución de dinero de 30 días',
        ],
      },
    ],
    relatedTitle: 'Comparar opciones:',
    linkPricing: 'Ver todos los planes →',
    linkUpload: 'Subir gratis ahora →',
  },
  ar: {
    eyebrow: 'مجاني للأبد · لا بطاقة ائتمان',
    h1: 'مشاركة ملفات مجانية فعلاً — لا حدود مخفية، لا تجربة مزيفة',
    intro: '1 جيجابايت مجاناً للرفع المجهول. 10 جيجابايت مجاناً مع حساب مسجل. لا بطاقة ائتمان، لا تجربة منتهية.',
    cta: 'ابدأ المشاركة المجانية',
    ctaSub: 'لا بطاقة ائتمان · مجاني للأبد',
    tiers: [
      { label: 'مجهول (بدون حساب)', storage: '1 جيجابايت', highlight: false, features: ['لكل رفع', 'رابط فوري', 'ينتهي في 24 ساعة', 'جميع أنواع الملفات'] },
      { label: 'حساب مجاني', storage: '10 جيجابايت', highlight: true, features: ['إجمالي التخزين', 'الملفات تبقى', 'تحليلات أساسية', 'دعم البريد الإلكتروني'] },
    ],
    sections: [
      {
        h2: 'ماذا يعني "مشاركة الملفات المجانية" فعلاً في Filesterr؟',
        paragraphs: [
          'يوجد في Filesterr مستويان من الخدمة المجانية. الأول: مجهول الهوية تماماً، بدون حساب أو بريد إلكتروني. ارفع ما يصل إلى 1 جيجابايت لكل ملف، احصل على رابط فوري، وينتهي الملف بعد 24 ساعة. لا توجد أي شروط.',
          'الثاني: أنشئ حساباً مجانياً (بدون بطاقة ائتمان) واحصل على 10 جيجابايت من التخزين الدائم وإحصائيات التنزيل الأساسية وإعلانات أقل. الحساب المجاني مجاني فعلاً — ليس تجربة لمدة 14 يوماً، وليس "مجانياً حتى نقرر غير ذلك".',
        ],
        bullets: [
          '1 جيجابايت لكل رفع مجهول — بدون تسجيل أو بريد إلكتروني',
          '10 جيجابايت إجمالي تخزين مع حساب مسجل مجاني',
          'تبقى الملفات إلى أجل غير مسمى في الحسابات المسجلة (ليس 24 ساعة فقط)',
          'إحصائيات التنزيل الأساسية في الحساب المجاني',
          'لا تُطلب بطاقة ائتمان أبداً لأي من المستويين المجانيين',
          'انتقل إلى الخطة المدفوعة فقط إذا كنت تحتاج مزيداً من التخزين أو التحليلات المتقدمة',
        ],
      },
      {
        h2: 'مواقع مشاركة الملفات الكبيرة المجانية: ما يمكن توقعه فعلاً',
        paragraphs: [
          'لنكن صادقين بشأن ما يعنيه "المجاني" في معظم المنصات. WeTransfer المجاني: حد 2 جيجابايت، صفحات تنزيل مليئة بالإعلانات، لا تحليلات. Dropbox المجاني: 2 جيجابايت تخزين، يتطلب من المرسل والمستلم كليهما امتلاك حسابات لمعظم الميزات. Google Drive: 15 جيجابايت تخزين مشترك مع Gmail والصور، ويتطلب حسابات Google.',
          'يمنحك Filesterr المجاني 10 جيجابايت من التخزين المخصص للملفات، ومساراً للرفع المجهول لا يتطلب حسابات، وتحليلات أساسية. لا إعلانات على جانب المرسل، وعد تنازلي مختصر على جانب المستلم (يُزال في الخطط المدفوعة).',
        ],
      },
      {
        h2: 'متى تترقى من خطة مشاركة الملفات المجانية',
        paragraphs: [
          'تغطي الخطة المجانية الاستخدام العادي لمشاركة الملفات بشكل مثالي. عندما تحتاج إلى المزيد، يكون قرار الترقية سهلاً: يمنحك Premium تخزيناً بسعة 150 جيجابايت و50 جيجابايت لكل ملف وصفر إعلانات على صفحات المستلمين. Pro يضيف 890 جيجابايت وبصمة الزائر وكشف VPN والبوت وخرائط الحرارة.',
          'ابدأ مجاناً. ارتقِ إذا نمت احتياجاتك. لا ضغط ولا قيود تعسفية على الميزات في المستوى المجاني موجودة فقط لدفعك نحو الدفع.',
        ],
        bullets: [
          'Premium (150GB): ملفات كبيرة، صفر إعلانات، حماية بكلمة مرور',
          'Pro (890GB): مجموعة تحليلات كاملة، بصمة الزائر، كشف البوت',
          'Pro Max (2TB): أقصى قدرة للفرق والمستخدمين المكثفين',
          'جميع الخطط المدفوعة: ضمان استرداد الأموال لمدة 30 يوماً',
        ],
      },
    ],
    relatedTitle: 'مقارنة الخيارات:',
    linkPricing: 'عرض جميع خطط الأسعار →',
    linkUpload: 'رفع مجاناً الآن →',
  },
  zh: {
    eyebrow: '永久免费 · 无需信用卡',
    h1: '真正免费的文件共享 — 无隐藏限制，无假试用',
    intro: '匿名上传免费1GB。注册账户免费10GB。无需信用卡，无到期试用，无30天后的意外付费墙。',
    cta: '开始免费分享',
    ctaSub: '无需信用卡 · 永久免费',
    tiers: [
      { label: '匿名（无账户）', storage: '1GB', highlight: false, features: ['每次上传', '即时链接', '24小时后过期', '所有文件类型'] },
      { label: '免费账户', storage: '10GB', highlight: true, features: ['总存储空间', '文件永久保存', '基本分析', '邮件支持'] },
    ],
    sections: [
      {
        h2: 'Filesterr上的"免费文件共享"究竟意味着什么？',
        paragraphs: [
          'Filesterr有两个免费级别。第一个：完全匿名，无需账户，无需邮箱。每个文件最多上传1GB，立即获取链接，文件24小时后过期。没有任何附加条件。',
          '第二个：创建免费账户（无需信用卡），获得10GB永久存储空间、基本下载统计和更少广告。免费账户是真正免费的——不是14天试用，也不是"我们决定之前免费"。',
        ],
        bullets: [
          '匿名上传每次1GB——无需注册，无需邮箱',
          '免费注册账户总存储空间10GB',
          '注册账户上的文件永久保存（不只是24小时）',
          '免费账户的基本下载统计',
          '两个免费级别都从不需要信用卡',
          '只有在需要更多存储空间或高级分析时才升级到付费版',
        ],
      },
      {
        h2: '免费大文件共享网站：真实预期',
        paragraphs: [
          '让我们诚实面对大多数平台上"免费"的含义。WeTransfer免费版：2GB限制，下载页面充斥广告，无分析功能。Dropbox免费版：2GB存储，大多数功能需要发送方和接收方都有账户。Google Drive：15GB存储空间，但与Gmail和相册共享，需要Google账户。',
          'Filesterr免费版为您提供10GB专用文件存储、无需账户的简洁匿名上传路径以及基本分析。发送方侧无广告，接收方侧有短暂倒计时（付费计划中已消除）。',
        ],
      },
      {
        h2: '何时从免费文件共享升级',
        paragraphs: [
          '免费计划完全满足日常文件共享需求。当您需要更多时，升级决定很简单：Premium提供150GB存储、每个文件50GB以及接收方页面零广告。Pro增加890GB、访客指纹识别、VPN/机器人检测和热力图。',
          '从免费开始。需求增长时再升级。没有任何压力，也没有仅仅为了推动您付费而设置的人为功能限制。',
        ],
        bullets: [
          'Premium (150GB)：大文件、零广告、密码保护',
          'Pro (890GB)：完整分析套件、访客指纹识别、机器人检测',
          'Pro Max (2TB)：为团队和重度用户提供最大能力',
          '所有付费计划：30天退款保证',
        ],
      },
    ],
    relatedTitle: '比较选项：',
    linkPricing: '查看所有价格方案 →',
    linkUpload: '立即免费上传 →',
  },
  pt: {
    eyebrow: 'Grátis para sempre · Sem cartão',
    h1: 'Compartilhamento Gratuito que é Realmente Gratuito — Sem Limites Ocultos',
    intro: '1GB grátis para uploads anônimos. 10GB grátis com conta registrada. Sem cartão, sem período de teste.',
    cta: 'Começar a compartilhar grátis',
    ctaSub: 'Sem cartão · Grátis para sempre',
    tiers: [
      { label: 'Anônimo (sem conta)', storage: '1GB', highlight: false, features: ['Por upload', 'Link instantâneo', 'Expira em 24h', 'Todos os tipos'] },
      { label: 'Conta gratuita', storage: '10GB', highlight: true, features: ['Armazenamento total', 'Arquivos persistentes', 'Análises básicas', 'Suporte por e-mail'] },
    ],
    sections: [
      {
        h2: 'O que significa "compartilhamento gratuito" no Filesterr de verdade?',
        paragraphs: [
          'No Filesterr existem dois níveis gratuitos. O primeiro: completamente anônimo, sem conta, sem e-mail. Faça upload de até 1GB por arquivo, receba um link instantâneo e o arquivo expira após 24 horas. Sem nenhuma condição.',
          'O segundo: crie uma conta gratuita (sem cartão de crédito) e obtenha 10GB de armazenamento persistente, estatísticas básicas de download e menos anúncios. A conta gratuita é genuinamente gratuita — não é um teste de 14 dias, não é "grátis até decidirmos que não é mais".',
        ],
        bullets: [
          '1GB por upload anônimo — sem cadastro, sem e-mail',
          '10GB de armazenamento total com uma conta registrada gratuita',
          'Arquivos salvos indefinidamente em contas registradas (não apenas 24 horas)',
          'Estatísticas básicas de download na conta gratuita',
          'Nunca é necessário cartão de crédito para nenhum dos dois níveis gratuitos',
          'Faça upgrade para o pago apenas se precisar de mais armazenamento ou análises avançadas',
        ],
      },
      {
        h2: 'Sites gratuitos para compartilhamento de arquivos grandes: o que realmente esperar',
        paragraphs: [
          'Vamos ser honestos sobre o que "gratuito" significa na maioria das plataformas. WeTransfer gratuito: limite de 2GB, páginas de download cheias de anúncios, sem análises. Dropbox gratuito: 2GB de armazenamento, requer que tanto o remetente quanto o destinatário tenham contas para a maioria das funcionalidades. Google Drive: 15GB de armazenamento compartilhado com Gmail e Fotos, requer contas Google.',
          'O Filesterr gratuito oferece 10GB de armazenamento dedicado, um caminho de upload anônimo limpo que não exige contas e análises básicas. Sem anúncios do lado do remetente, uma breve contagem regressiva do lado do destinatário (eliminada nos planos pagos).',
        ],
      },
      {
        h2: 'Quando fazer upgrade do plano gratuito de compartilhamento de arquivos',
        paragraphs: [
          'O plano gratuito cobre perfeitamente o compartilhamento casual de arquivos. Quando você precisar de mais, a decisão de upgrade é fácil: o Premium oferece 150GB de armazenamento, 50GB por arquivo e zero anúncios nas páginas dos destinatários. O Pro adiciona 890GB, fingerprinting de visitantes, detecção de VPN/bot e mapas de calor.',
          'Comece gratuitamente. Faça upgrade se suas necessidades crescerem. Sem pressão e sem limites arbitrários de funcionalidades no nível gratuito que existem apenas para empurrá-lo a pagar.',
        ],
        bullets: [
          'Premium (150GB): arquivos grandes, zero anúncios, proteção por senha',
          'Pro (890GB): suite completa de análises, fingerprinting de visitantes, detecção de bots',
          'Pro Max (2TB): máximo poder para equipes e usuários intensivos',
          'Todos os planos pagos: garantia de reembolso de 30 dias',
        ],
      },
    ],
    relatedTitle: 'Comparar opções:',
    linkPricing: 'Ver todos os planos →',
    linkUpload: 'Fazer upload grátis agora →',
  },
  ja: {
    eyebrow: '永久無料 · クレジットカード不要',
    h1: '本当に無料のファイル共有 — 隠れた制限なし、偽のトライアルなし',
    intro: '匿名アップロードは1GB無料。登録アカウントは10GB無料。クレジットカード不要、期限切れトライアルなし。',
    cta: '無料で共有を始める',
    ctaSub: 'クレジットカード不要 · 永久無料',
    tiers: [
      { label: '匿名（アカウントなし）', storage: '1GB', highlight: false, features: ['アップロードごと', '即時リンク', '24時間で期限切れ', 'すべてのファイル形式'] },
      { label: '無料アカウント', storage: '10GB', highlight: true, features: ['総ストレージ', 'ファイルが永続', '基本分析', 'メールサポート'] },
    ],
    sections: [
      {
        h2: 'Filesterrの「無料ファイル共有」が実際に意味すること',
        paragraphs: [
          'Filesterrには2つの無料レベルがあります。1つ目：完全に匿名で、アカウントもメールアドレスも不要です。ファイルあたり最大1GBをアップロードし、即時リンクを取得できます。ファイルは24時間後に期限切れになります。条件は一切ありません。',
          '2つ目：無料アカウントを作成（クレジットカード不要）すると、10GBの永続ストレージ、基本的なダウンロード統計、そして広告が少ない環境が手に入ります。無料アカウントは本当に無料です——14日間のトライアルでも、「私たちが決めるまで無料」でもありません。',
        ],
        bullets: [
          '匿名アップロードごとに1GB——サインアップもメールも不要',
          '無料登録アカウントで合計10GBのストレージ',
          '登録アカウントのファイルは無期限に保存されます（24時間だけでなく）',
          '無料アカウントでの基本ダウンロード統計',
          'どちらの無料ティアでもクレジットカードは一切不要',
          'より多くのストレージや高度な分析が必要な場合のみ有料にアップグレード',
        ],
      },
      {
        h2: '無料の大容量ファイル共有サービス：実際に期待できること',
        paragraphs: [
          'ほとんどのプラットフォームで「無料」が何を意味するか正直に見てみましょう。WeTransfer無料版：2GB制限、広告だらけのダウンロードページ、分析機能なし。Dropbox無料版：2GBストレージ、多くの機能で送信者と受信者の両方がアカウントを持つ必要があります。Google Drive：15GBストレージですがGmailや写真と共有、Googleアカウントが必要です。',
          'Filesterrの無料プランは、10GBの専用ファイルストレージ、アカウント不要のクリーンな匿名アップロード、そして基本分析を提供します。送信者側に広告はなく、受信者側には短いカウントダウンがあります（有料プランでは廃止）。',
        ],
      },
      {
        h2: '無料ファイル共有からアップグレードするタイミング',
        paragraphs: [
          '無料プランはカジュアルなファイル共有に完全対応しています。さらに必要になった場合、アップグレードの判断は簡単です：Premiumは150GBのストレージ、ファイルあたり50GB、受信者ページの広告ゼロを提供します。Proは890GB、訪問者フィンガープリント、VPN/ボット検出、ヒートマップを追加します。',
          '無料から始めてください。ニーズが大きくなったらアップグレードしてください。無料ティアに課金を促すだけの恣意的な機能制限はなく、プレッシャーもありません。',
        ],
        bullets: [
          'Premium (150GB)：大容量ファイル、広告ゼロ、パスワード保護',
          'Pro (890GB)：フル分析スイート、訪問者フィンガープリント、ボット検出',
          'Pro Max (2TB)：チームや重度ユーザー向けの最大パワー',
          '全有料プラン：30日間返金保証',
        ],
      },
    ],
    relatedTitle: 'オプションを比較:',
    linkPricing: 'すべての料金プランを見る →',
    linkUpload: '今すぐ無料でアップロード →',
  },
  ru: {
    eyebrow: 'Бесплатно навсегда · Без кредитной карты',
    h1: 'Бесплатный обмен файлами, который действительно бесплатный — без скрытых лимитов',
    intro: '1 ГБ бесплатно для анонимных загрузок. 10 ГБ бесплатно с зарегистрированным аккаунтом. Без кредитной карты.',
    cta: 'Начать делиться бесплатно',
    ctaSub: 'Без кредитной карты · Бесплатно навсегда',
    tiers: [
      { label: 'Анонимно (без аккаунта)', storage: '1 ГБ', highlight: false, features: ['На загрузку', 'Мгновенная ссылка', 'Истекает за 24ч', 'Все типы файлов'] },
      { label: 'Бесплатный аккаунт', storage: '10 ГБ', highlight: true, features: ['Общее хранилище', 'Файлы сохраняются', 'Базовая аналитика', 'Поддержка по e-mail'] },
    ],
    sections: [
      {
        h2: 'Что на самом деле означает «бесплатный обмен файлами» на Filesterr?',
        paragraphs: [
          'На Filesterr есть два уровня бесплатного использования. Первый: полностью анонимно, без аккаунта и электронной почты. Загружайте до 1 ГБ на файл, получайте мгновенную ссылку — файл истекает через 24 часа. Без каких-либо условий.',
          'Второй: создайте бесплатный аккаунт (без кредитной карты) и получите 10 ГБ постоянного хранилища, базовую статистику загрузок и меньше рекламы. Бесплатный аккаунт действительно бесплатный — не 14-дневный пробный период, не «бесплатно, пока мы не решим иначе».',
        ],
        bullets: [
          '1 ГБ на каждую анонимную загрузку — без регистрации и электронной почты',
          '10 ГБ общего хранилища с бесплатным зарегистрированным аккаунтом',
          'Файлы на зарегистрированных аккаунтах хранятся бессрочно (не только 24 часа)',
          'Базовая статистика загрузок в бесплатном аккаунте',
          'Кредитная карта никогда не требуется ни для одного из бесплатных уровней',
          'Переходите на платный план только если нужно больше хранилища или расширенная аналитика',
        ],
      },
      {
        h2: 'Бесплатный обмен большими файлами: чего ожидать на самом деле',
        paragraphs: [
          'Будем честны насчёт того, что «бесплатно» означает на большинстве платформ. WeTransfer бесплатно: лимит 2 ГБ, страницы загрузки, заваленные рекламой, без аналитики. Dropbox бесплатно: 2 ГБ хранилища, для большинства функций нужны аккаунты и у отправителя, и у получателя. Google Drive: 15 ГБ хранилища, но общее с Gmail и Фото, требуются аккаунты Google.',
          'Бесплатный Filesterr даёт вам 10 ГБ выделенного хранилища для файлов, чистый путь анонимной загрузки без аккаунтов и базовую аналитику. Нет рекламы со стороны отправителя, короткий обратный отсчёт со стороны получателя (убирается в платных планах).',
        ],
      },
      {
        h2: 'Когда переходить с бесплатного обмена файлами на платный',
        paragraphs: [
          'Бесплатный план отлично подходит для обычного обмена файлами. Когда нужно больше, решение об апгрейде простое: Premium даёт 150 ГБ хранилища, 50 ГБ на файл и ноль рекламы на страницах получателей. Pro добавляет 890 ГБ, цифровой отпечаток посетителя, обнаружение VPN/ботов и тепловые карты.',
          'Начните бесплатно. Переходите на платный, когда вырастут потребности. Никакого давления и никаких искусственных ограничений функций на бесплатном уровне, созданных только для того, чтобы заставить вас платить.',
        ],
        bullets: [
          'Premium (150GB): большие файлы, ноль рекламы, защита паролем',
          'Pro (890GB): полный набор аналитики, цифровой отпечаток, обнаружение ботов',
          'Pro Max (2TB): максимальная мощность для команд и активных пользователей',
          'Все платные планы: гарантия возврата денег в течение 30 дней',
        ],
      },
    ],
    relatedTitle: 'Сравните варианты:',
    linkPricing: 'Посмотреть все тарифы →',
    linkUpload: 'Загрузить бесплатно сейчас →',
  },
}

const c = computed(() => content[locale.value] || content.en)

const metaContent = {
  en: { title: 'Free File Sharing — 1GB Anonymous, 10GB Free Account | Filesterr', description: 'Genuinely free file sharing: 1GB anonymous uploads with no account, or 10GB free with a registered account. No credit card, no trial, no expiry on the free plan.' },
  tr: { title: 'Ücretsiz Dosya Paylaşımı — 1 GB Anonim, 10 GB Ücretsiz Hesap | Filesterr', description: 'Gerçekten ücretsiz dosya paylaşımı: hesap olmadan 1 GB anonim yükleme veya kayıtlı hesapla 10 GB ücretsiz.' },
  de: { title: 'Kostenlose Dateifreigabe — 1 GB anonym, 10 GB kostenloses Konto | Filesterr', description: 'Wirklich kostenlose Dateifreigabe: 1 GB ohne Konto oder 10 GB mit kostenlosem registriertem Konto. Keine Kreditkarte nötig.' },
  fr: { title: 'Partage de fichiers gratuit — 1 Go anonyme, 10 Go compte gratuit | Filesterr', description: 'Partage vraiment gratuit : 1 Go sans compte, ou 10 Go avec compte enregistré gratuit. Pas de carte bancaire.' },
  es: { title: 'Compartir archivos gratis — 1 GB anónimo, 10 GB cuenta gratis | Filesterr', description: 'Compartición genuinamente gratuita: 1 GB anónimo sin cuenta, o 10 GB gratis con cuenta registrada. Sin tarjeta de crédito.' },
  ar: { title: 'مشاركة الملفات المجانية — 1 جيجابايت مجهول، 10 جيجابايت حساب مجاني | Filesterr', description: 'مشاركة مجانية حقيقية: 1 جيجابايت رفع مجهول بدون حساب، أو 10 جيجابايت مجاناً مع حساب مسجل. لا بطاقة ائتمان.' },
  zh: { title: '免费文件共享 — 1GB匿名，10GB免费账户 | Filesterr', description: '真正免费的文件共享：无账户1GB匿名上传，或注册账户免费10GB。无需信用卡，无试用期。' },
  pt: { title: 'Compartilhamento de Arquivos Grátis — 1GB Anônimo, 10GB Conta Grátis | Filesterr', description: 'Compartilhamento genuinamente grátis: 1GB anônimo sem conta, ou 10GB grátis com conta registrada. Sem cartão de crédito.' },
  ja: { title: '無料ファイル共有 — 匿名1GB、無料アカウント10GB | Filesterr', description: '本当に無料のファイル共有：アカウントなしで匿名1GB、または登録アカウントで10GB無料。クレジットカード不要。' },
  ru: { title: 'Бесплатный обмен файлами — 1 ГБ анонимно, 10 ГБ бесплатный аккаунт | Filesterr', description: 'По-настоящему бесплатный обмен: 1 ГБ анонимно без аккаунта или 10 ГБ с бесплатным зарегистрированным аккаунтом. Без кредитной карты.' },
}

const meta = computed(() => metaContent[locale.value] || metaContent.en)
const canonicalLocale = computed(() => locale.value && locale.value !== 'en' ? `/${locale.value}/free-file-sharing` : '/free-file-sharing')

useHead({
  title: computed(() => meta.value.title),
  meta: [
    { name: 'description', content: computed(() => meta.value.description) },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: computed(() => `https://filesterr.com${canonicalLocale.value}`) }],
})
</script>
