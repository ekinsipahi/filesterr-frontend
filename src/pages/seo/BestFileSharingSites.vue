<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">
    <div class="bg-gradient-to-b from-zinc-50 to-transparent dark:from-zinc-900/40 dark:to-transparent pt-20 pb-12">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/25 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-6">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          {{ c.eyebrow }}
        </div>
        <h1 class="text-4xl sm:text-5xl font-display font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-4 leading-tight">
          {{ c.h1 }}
        </h1>
        <p class="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">{{ c.intro }}</p>
        <a href="/upload" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-base transition-colors shadow-lg shadow-brand-500/25">
          {{ c.cta }} →
        </a>
        <p class="mt-3 text-xs text-zinc-400">{{ c.ctaSub }}</p>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-6 py-12 space-y-14">
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

      <!-- Comparison table (EN only fully rendered, others get text) -->
      <div v-if="c.comparison" class="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <table class="w-full text-sm">
          <thead class="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th class="text-left px-4 py-3 text-zinc-500 font-semibold">{{ c.comparison.feature }}</th>
              <th class="px-4 py-3 text-zinc-500 font-semibold text-center">Filesterr</th>
              <th class="px-4 py-3 text-zinc-500 font-semibold text-center">WeTransfer</th>
              <th class="px-4 py-3 text-zinc-500 font-semibold text-center">Google Drive</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800">
            <tr v-for="row in c.comparison.rows" :key="row.label" class="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
              <td class="px-4 py-3 text-zinc-700 dark:text-zinc-300 font-medium">{{ row.label }}</td>
              <td class="px-4 py-3 text-center text-brand-600 dark:text-brand-400 font-semibold">{{ row.filesterr }}</td>
              <td class="px-4 py-3 text-center text-zinc-500">{{ row.wetransfer }}</td>
              <td class="px-4 py-3 text-center text-zinc-500">{{ row.gdrive }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
        <p class="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">{{ c.relatedTitle }}</p>
        <div class="flex flex-wrap gap-3">
          <a href="/features" class="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">{{ c.linkFeatures }}</a>
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

const comparisonRows = [
  { label: 'Max free file size', filesterr: '1 GB (anon)', wetransfer: '2 GB', gdrive: '15 GB total' },
  { label: 'No account needed', filesterr: '✓ Always', wetransfer: '✓ Basic', gdrive: '✗ Required' },
  { label: 'Recipient account', filesterr: '✓ Never', wetransfer: '✓ Never', gdrive: '✗ Often' },
  { label: 'Download analytics', filesterr: '✓ Full', wetransfer: '✗ None', gdrive: '✗ None' },
  { label: 'Ads on download page', filesterr: 'Free only', wetransfer: '✗ Yes', gdrive: '✗ No' },
  { label: 'Password protection', filesterr: '✓ Paid', wetransfer: '✓ Paid', gdrive: '✗ No' },
  { label: 'Expiry dates', filesterr: '✓ Yes', wetransfer: '✓ Yes', gdrive: '✗ Manual' },
]

const content = {
  en: {
    eyebrow: 'Best file sharing sites 2025 — honest comparison',
    h1: 'The Best File Sharing Sites in 2025 — And Why Filesterr Beats Them All',
    intro: 'WeTransfer, Google Drive, Dropbox, Send Anywhere — they all work. But none were built for quick anonymous sharing with real analytics. Here\'s the honest comparison you\'re actually looking for.',
    cta: 'Try Filesterr Free',
    ctaSub: 'No credit card · No account needed to start',
    sections: [
      {
        h2: 'What makes the best file sharing platforms actually good?',
        paragraphs: [
          'Most "best file sharing sites 2025" roundups are affiliate link farms. Let\'s be honest about what actually matters when you need to share a file fast: speed of upload, ease for the recipient, no unnecessary friction, and some visibility into whether the file was actually downloaded.',
          'The best file sharing platforms share a few traits: no account required for a quick transfer, no spam countdowns forcing recipients to wait, a link that works on any device, and real analytics. Most file sharing websites check one or two of these boxes. Filesterr checks all of them.',
          'What Reddit communities consistently complain about in best file sharing site reddit threads: ads on download pages, required recipient accounts, and no way to know if the file was actually received. Those pain points are exactly what Filesterr was built to eliminate. If you\'ve been browsing free file sharing sites reddit discussions, you\'ve seen Filesterr recommended for precisely these reasons.',
        ],
        bullets: [
          'Zero friction for sender and recipient',
          'Works without accounts on both ends',
          'No 30-second ad countdown timers',
          'Encrypted transfer and storage',
          'Analytics so you know the file was received',
        ],
      },
      {
        h2: 'Best file sharing sites 2025: the full comparison',
        paragraphs: [
          'Here\'s how the major file transfer platforms actually stack up in 2025. WeTransfer is the name everyone knows — it works for large file sharing websites use cases, but it plasters ads on every download page and gives you zero insight into who downloaded. Google Drive is ubiquitous, but it requires recipient accounts for some file types and has no sharing analytics. Dropbox Transfer is polished but expensive if you go above their free tier.',
          'Send Anywhere has the cross-platform angle covered with its device-to-device approach, but it requires both sides to be actively connected during transfer — useful for real-time sharing, not useful if your recipient is in a different timezone. Among file sharing applications that work asynchronously, Filesterr is the clear choice.',
          'Filesterr was built for the gap none of these cover: instant sharing with no friction, a file sharing platform free tier that\'s genuinely useful (1GB anonymous, no countdown, no account), and the analytics layer that tells you what happens after you hit send. Among secure file sharing websites, Filesterr also stands out by offering AES-256 encryption plus genuine anonymous uploads that leave no identity trail.',
        ],
      },
      {
        h2: 'File sharing applications: browser vs. native app',
        paragraphs: [
          'The file sharing applications debate — native app vs. browser — is largely settled in 2025. Browser-based file sharing platforms load instantly, require no install, and work identically across every OS. The recipient never has to download anything. For most use cases, a well-built web app is superior to a dedicated file transfer platform with a 50MB install footprint.',
          'Filesterr is fully browser-based. It\'s not a file sharing platform free of features — it\'s a complete sharing solution with analytics, password protection, expiry dates, and CDN delivery. The advantage is that your recipient can access any file you share from any device, any browser, anywhere in the world.',
        ],
        bullets: [
          'No app install for sender or recipient',
          'Works on every OS: Windows, Mac, Android, iOS',
          'Files delivered via global CDN — fast anywhere',
          'Password protection available on paid plans',
          'Expiry dates let you control how long files stay live',
        ],
      },
    ],
    comparison: {
      feature: 'Feature',
      rows: comparisonRows,
    },
    relatedTitle: 'Explore more:',
    linkFeatures: 'Full Feature List →',
    linkPricing: 'Compare Plans & Pricing →',
    linkUpload: 'Upload a File Now →',
  },
  tr: {
    eyebrow: 'Hızlı paylaşımlar için #1',
    h1: '2025\'in En İyi Dosya Paylaşım Siteleri — Filesterr Neden Öne Çıkıyor',
    intro: 'WeTransfer, Google Drive, Dropbox — hepsi çalışır. Ancak hiçbiri gerçek analitikle hızlı, anonim paylaşım için tasarlanmadı. İşte gerçekten aradığınız dürüst karşılaştırma.',
    cta: 'Filesterr\'ı Ücretsiz Dene',
    ctaSub: 'Kredi kartı yok · Başlamak için hesap gerekmez',
    sections: [
      {
        h2: 'Dosya paylaşım sitelerini gerçekten iyi yapan nedir?',
        paragraphs: [
          'Çoğu "2025\'in en iyi dosya paylaşım siteleri" derlemesi bağlı kuruluş bağlantısı çiftlikleridir. Hızlı bir dosya paylaşmanız gerektiğinde gerçekte önemli olan şeyler hakkında dürüst olalım: yükleme hızı, alıcı için kolaylık, gereksiz sürtünme yok ve dosyanın gerçekten indirilip indirilmediğine dair görünürlük.',
          'En iyi dosya paylaşım platformlarının birkaç ortak özelliği vardır: hızlı aktarım için hesap gerekmez, alıcıları bekletecek spam geri sayımlar yoktur, her cihazda çalışan bir bağlantı ve gerçek analitik. Çoğu dosya paylaşım sitesi bu özelliklerden bir veya ikisini karşılar. Filesterr hepsini karşılar.',
          'Reddit topluluklarının en iyi dosya paylaşım sitesi tartışmalarında sürekli şikayet ettiği konular: indirme sayfalarındaki reklamlar, zorunlu alıcı hesapları ve dosyanın gerçekten alınıp alınmadığını bilmenin hiçbir yolunun olmaması. Bu sorunlar tam olarak Filesterr\'ın ortadan kaldırmak için tasarlandığı şeylerdir.',
        ],
        bullets: [
          'Gönderici ve alıcı için sıfır sürtünme',
          'Her iki tarafta da hesap olmadan çalışır',
          '30 saniyelik reklam geri sayım zamanlayıcısı yok',
          'Şifreli aktarım ve depolama',
          'Dosyanın alındığını bilmek için analitik',
        ],
      },
      {
        h2: '2025\'in en iyi dosya paylaşım siteleri: tam karşılaştırma',
        paragraphs: [
          'İşte büyük dosya aktarım platformlarının 2025\'te gerçekte nasıl sıralandığı. WeTransfer herkesin bildiği addır — büyük dosya paylaşımı için işe yarar, ancak her indirme sayfasına reklam koyar ve kimin indirdiği hakkında sıfır bilgi verir. Google Drive her yerde bulunur, ancak bazı dosya türleri için alıcı hesabı gerektirir ve paylaşım analitiği yoktur. Dropbox Transfer şık görünür ancak ücretsiz katmanın üzerine çıkarsanız pahalıdır.',
          'Send Anywhere, her iki tarafın da aktarım sırasında aktif olarak bağlı olmasını gerektiren cihazdan cihaza yaklaşımıyla platformlar arası konuyu ele alır. Gerçek zamanlı paylaşım için kullanışlıdır, ancak alıcınız farklı bir saat dilimindeyse kullanışlı değildir. Eşzamansız çalışan dosya paylaşım uygulamaları arasında Filesterr açık ara en iyi seçimdir.',
          'Filesterr, bunların hiçbirinin karşılamadığı boşluk için tasarlandı: gerçek anlamda kullanışlı ücretsiz bir katmanla (1 GB anonim, geri sayım yok, hesap yok) anında sürtünmesiz paylaşım ve gönderdikten sonra ne olduğunu söyleyen analitik katmanı. Güvenli dosya paylaşım siteleri arasında Filesterr, AES-256 şifreleme ve kimlik izi bırakmayan gerçek anonim yüklemeler sunarak da öne çıkar.',
        ],
      },
      {
        h2: 'Dosya paylaşım uygulamaları: tarayıcı mı yoksa yerel uygulama mı?',
        paragraphs: [
          'Dosya paylaşım uygulamaları tartışması — yerel uygulama mı yoksa tarayıcı mı — 2025\'te büyük ölçüde çözüme kavuştu. Tarayıcı tabanlı dosya paylaşım platformları anında yüklenir, kurulum gerektirmez ve her işletim sisteminde aynı şekilde çalışır. Alıcının hiçbir şey indirmesi gerekmez. Çoğu kullanım durumu için, iyi yapılmış bir web uygulaması, 50 MB kurulum boyutu olan özel bir dosya aktarım platformundan daha üstündür.',
          'Filesterr tamamen tarayıcı tabanlıdır. Özellikten yoksun bir platform değil — analitik, şifre koruması, son kullanma tarihleri ve CDN teslimatı olan eksiksiz bir paylaşım çözümüdür. Avantajı şudur: alıcınız, dünyanın herhangi bir yerindeki herhangi bir cihazdan, herhangi bir tarayıcıdan paylaştığınız herhangi bir dosyaya erişebilir.',
        ],
        bullets: [
          'Gönderici veya alıcı için uygulama kurulumu yok',
          'Her işletim sisteminde çalışır: Windows, Mac, Android, iOS',
          'Dosyalar küresel CDN üzerinden teslim edilir — her yerde hızlı',
          'Ücretli planlarda şifre koruması mevcut',
          'Son kullanma tarihleri dosyaların ne kadar süre aktif kalacağını belirlemenizi sağlar',
        ],
      },
    ],
    relatedTitle: 'Daha fazlasını keşfedin:',
    linkFeatures: 'Tüm Özellikler →',
    linkPricing: 'Plan ve Fiyatları Karşılaştır →',
    linkUpload: 'Şimdi Dosya Yükle →',
  },
  de: {
    eyebrow: 'Bewertet als #1 für schnelles Teilen',
    h1: 'Die besten Datei-Sharing-Websites 2025 — Warum Filesterr vorne liegt',
    intro: 'WeTransfer, Google Drive, Dropbox — sie funktionieren alle. Aber keines wurde für schnelles, anonymes Sharing mit echten Analytics entwickelt. Hier ist der ehrliche Vergleich, nach dem Sie wirklich suchen.',
    cta: 'Filesterr kostenlos testen',
    ctaSub: 'Keine Kreditkarte · Kein Konto zum Starten nötig',
    sections: [
      {
        h2: 'Was macht eine File-Sharing-Website wirklich gut?',
        paragraphs: [
          'Die meisten „beste File-Sharing-Seiten 2025"-Zusammenstellungen sind Affiliate-Link-Farmen. Seien wir ehrlich darüber, was wirklich zählt, wenn Sie eine Datei schnell teilen müssen: Upload-Geschwindigkeit, Einfachheit für den Empfänger, keine unnötige Reibung und Einblick darüber, ob die Datei tatsächlich heruntergeladen wurde.',
          'Die besten Dateifreigabe-Plattformen haben einige gemeinsame Merkmale: kein Konto für eine schnelle Übertragung erforderlich, keine Spam-Countdowns, die Empfänger warten lassen, ein Link, der auf jedem Gerät funktioniert, und echte Analytics. Die meisten Dateifreigabe-Websites erfüllen ein oder zwei dieser Kriterien. Filesterr erfüllt alle.',
          'Was Reddit-Communitys in Threads über die besten Dateifreigabe-Seiten immer wieder kritisieren: Werbung auf Download-Seiten, erforderliche Empfängerkonten und keine Möglichkeit zu wissen, ob die Datei tatsächlich empfangen wurde. Diese Probleme sind genau das, wofür Filesterr entwickelt wurde.',
        ],
        bullets: [
          'Keine Reibung für Sender und Empfänger',
          'Funktioniert ohne Konten auf beiden Seiten',
          'Keine 30-sekündigen Werbe-Countdown-Timer',
          'Verschlüsselter Transfer und Speicher',
          'Analytics, damit Sie wissen, ob die Datei empfangen wurde',
        ],
      },
      {
        h2: 'Beste Datei-Sharing-Seiten 2025: der vollständige Vergleich',
        paragraphs: [
          'So schneiden die großen Dateiübertragungsplattformen in 2025 tatsächlich ab. WeTransfer ist der bekannte Name — er funktioniert für große Dateifreigaben, schaltet aber auf jeder Download-Seite Werbung und gibt Ihnen null Einblick darüber, wer heruntergeladen hat. Google Drive ist allgegenwärtig, erfordert aber für manche Dateitypen Empfängerkonten und bietet keine Sharing-Analytics. Dropbox Transfer ist ausgereift, aber teuer, sobald man über das kostenlose Kontingent hinausgeht.',
          'Send Anywhere deckt den plattformübergreifenden Bereich mit seinem Gerät-zu-Gerät-Ansatz ab, erfordert aber, dass beide Seiten während der Übertragung aktiv verbunden sind. Unter Dateifreigabe-Apps, die asynchron funktionieren, ist Filesterr die klare Wahl.',
          'Filesterr wurde für die Lücke entwickelt, die keine dieser Optionen abdeckt: sofortiges Teilen ohne Reibung, eine kostenlose Stufe, die wirklich nützlich ist (1 GB anonym, kein Countdown, kein Konto), und die Analytics-Ebene, die Ihnen sagt, was nach dem Senden passiert. Unter sicheren Dateifreigabe-Websites zeichnet sich Filesterr durch AES-256-Verschlüsselung und echte anonyme Uploads ohne Identitätsspur aus.',
        ],
      },
      {
        h2: 'Dateifreigabe-Apps: Browser vs. native App',
        paragraphs: [
          'Die Debatte über Dateifreigabe-Apps — native App vs. Browser — ist 2025 weitgehend entschieden. Browser-basierte Plattformen laden sofort, erfordern keine Installation und funktionieren auf jedem Betriebssystem identisch. Der Empfänger muss nie etwas herunterladen. Für die meisten Anwendungsfälle ist eine gut gemachte Web-App einer dedizierten Dateiübertragungs-Plattform mit 50-MB-Installationsgröße überlegen.',
          'Filesterr ist vollständig browserbasiert. Es ist keine funktionsarme Plattform — es ist eine vollständige Sharing-Lösung mit Analytics, Passwortschutz, Ablaufdaten und CDN-Lieferung. Der Vorteil: Ihr Empfänger kann jede von Ihnen geteilte Datei von jedem Gerät, jedem Browser, überall auf der Welt abrufen.',
        ],
        bullets: [
          'Keine App-Installation für Sender oder Empfänger',
          'Funktioniert auf jedem Betriebssystem: Windows, Mac, Android, iOS',
          'Dateien werden über globales CDN geliefert — überall schnell',
          'Passwortschutz auf bezahlten Plänen verfügbar',
          'Ablaufdaten lassen Sie steuern, wie lange Dateien aktiv bleiben',
        ],
      },
    ],
    relatedTitle: 'Mehr entdecken:',
    linkFeatures: 'Alle Funktionen →',
    linkPricing: 'Pläne & Preise vergleichen →',
    linkUpload: 'Jetzt Datei hochladen →',
  },
  fr: {
    eyebrow: 'Classé #1 pour le partage rapide',
    h1: 'Les meilleurs sites de partage de fichiers en 2025 — Pourquoi Filesterr se démarque',
    intro: 'WeTransfer, Google Drive, Dropbox — tous fonctionnent. Mais aucun n\'a été conçu pour le partage rapide et anonyme avec de véritables analyses. Voici la comparaison honnête que vous cherchez vraiment.',
    cta: 'Essayer Filesterr gratuitement',
    ctaSub: 'Pas de carte bancaire · Aucun compte requis',
    sections: [
      {
        h2: 'Qu\'est-ce qui rend un site de partage vraiment bon ?',
        paragraphs: [
          'La plupart des articles "meilleurs sites de partage de fichiers 2025" sont des fermes de liens d\'affiliation. Soyons honnêtes sur ce qui compte vraiment quand vous avez besoin de partager un fichier rapidement : vitesse d\'upload, facilité pour le destinataire, aucune friction inutile, et une visibilité sur le fait que le fichier ait bien été téléchargé.',
          'Les meilleures plateformes de partage de fichiers partagent quelques caractéristiques : aucun compte requis pour un transfert rapide, pas de comptes à rebours publicitaires forçant les destinataires à attendre, un lien qui fonctionne sur n\'importe quel appareil, et de vraies analyses. La plupart des sites de partage cochent une ou deux de ces cases. Filesterr les coche toutes.',
          'Ce que les communautés Reddit critiquent constamment dans les discussions sur les meilleurs sites de partage : les publicités sur les pages de téléchargement, les comptes destinataires obligatoires, et aucun moyen de savoir si le fichier a bien été reçu. Ces points de douleur sont exactement ce que Filesterr a été conçu pour éliminer.',
        ],
        bullets: [
          'Aucune friction pour l\'expéditeur et le destinataire',
          'Fonctionne sans comptes des deux côtés',
          'Pas de minuteries publicitaires de 30 secondes',
          'Transfert et stockage chiffrés',
          'Analyses pour savoir si le fichier a été reçu',
        ],
      },
      {
        h2: 'Meilleurs sites de partage 2025 : la comparaison complète',
        paragraphs: [
          'Voici comment les grandes plateformes de transfert de fichiers se comparent réellement en 2025. WeTransfer est le nom que tout le monde connaît — il fonctionne pour les grands partages, mais colle des publicités sur chaque page de téléchargement et vous donne zéro insight sur qui a téléchargé. Google Drive est omniprésent, mais nécessite des comptes pour certains types de fichiers et n\'offre aucune analyse de partage. Dropbox Transfer est soigné mais cher dès qu\'on dépasse le niveau gratuit.',
          'Send Anywhere couvre l\'aspect multiplateforme avec son approche appareil-à-appareil, mais exige que les deux côtés soient activement connectés pendant le transfert. Parmi les applications de partage qui fonctionnent en asynchrone, Filesterr est le choix évident.',
          'Filesterr a été conçu pour la lacune qu\'aucun de ces services ne couvre : partage instantané sans friction, un niveau gratuit réellement utile (1 Go anonyme, pas de compte à rebours, pas de compte), et la couche d\'analyse qui vous dit ce qui se passe après l\'envoi. Parmi les sites de partage sécurisé, Filesterr se distingue également par son chiffrement AES-256 et des uploads anonymes qui ne laissent aucune trace d\'identité.',
        ],
      },
      {
        h2: 'Applications de partage : navigateur vs. application native',
        paragraphs: [
          'Le débat sur les applications de partage de fichiers — app native vs. navigateur — est largement tranché en 2025. Les plateformes basées sur le navigateur se chargent instantanément, ne nécessitent aucune installation et fonctionnent identiquement sur tous les systèmes d\'exploitation. Le destinataire n\'a jamais besoin de télécharger quoi que ce soit. Pour la plupart des cas d\'usage, une bonne application web est supérieure à une plateforme dédiée avec 50 Mo d\'installation.',
          'Filesterr est entièrement basé sur le navigateur. Ce n\'est pas une plateforme dépourvue de fonctionnalités — c\'est une solution de partage complète avec analyses, protection par mot de passe, dates d\'expiration et livraison CDN. L\'avantage : votre destinataire peut accéder à n\'importe quel fichier que vous partagez depuis n\'importe quel appareil, n\'importe quel navigateur, partout dans le monde.',
        ],
        bullets: [
          'Aucune installation d\'app pour l\'expéditeur ou le destinataire',
          'Fonctionne sur tous les systèmes : Windows, Mac, Android, iOS',
          'Fichiers livrés via CDN mondial — rapide partout',
          'Protection par mot de passe sur les plans payants',
          'Les dates d\'expiration vous permettent de contrôler la durée de vie des fichiers',
        ],
      },
    ],
    relatedTitle: 'Explorer davantage:',
    linkFeatures: 'Toutes les fonctionnalités →',
    linkPricing: 'Comparer plans & tarifs →',
    linkUpload: 'Uploader un fichier maintenant →',
  },
  es: {
    eyebrow: 'Valorado #1 para compartir rápido',
    h1: 'Los mejores sitios para compartir archivos en 2025 — Por qué Filesterr los supera',
    intro: 'WeTransfer, Google Drive, Dropbox — todos funcionan. Pero ninguno fue construido para compartir rápido y anónimo con analíticas reales. Aquí está la comparación honesta que realmente estás buscando.',
    cta: 'Probar Filesterr gratis',
    ctaSub: 'Sin tarjeta de crédito · Sin cuenta para empezar',
    sections: [
      {
        h2: '¿Qué hace realmente bueno a un sitio para compartir archivos?',
        paragraphs: [
          'La mayoría de los artículos "mejores sitios para compartir archivos 2025" son granjas de enlaces de afiliados. Seamos honestos sobre lo que realmente importa cuando necesitas compartir un archivo rápido: velocidad de subida, facilidad para el destinatario, sin fricción innecesaria, y visibilidad sobre si el archivo fue descargado.',
          'Las mejores plataformas de compartición comparten algunas características: sin cuenta para una transferencia rápida, sin cuentas regresivas de spam que hacen esperar a los destinatarios, un enlace que funciona en cualquier dispositivo, y analíticas reales. La mayoría de los sitios cumplen uno o dos de estos criterios. Filesterr los cumple todos.',
          'Lo que las comunidades de Reddit critican constantemente en los debates sobre los mejores sitios: anuncios en las páginas de descarga, cuentas de destinatario obligatorias, y ninguna forma de saber si el archivo fue realmente recibido. Esos problemas son exactamente lo que Filesterr fue diseñado para eliminar.',
        ],
        bullets: [
          'Sin fricción para el remitente y el destinatario',
          'Funciona sin cuentas en ambos lados',
          'Sin temporizadores de anuncios de 30 segundos',
          'Transferencia y almacenamiento cifrados',
          'Analíticas para saber si el archivo fue recibido',
        ],
      },
      {
        h2: 'Mejores sitios para compartir archivos 2025: la comparación completa',
        paragraphs: [
          'Así es como se comparan realmente las grandes plataformas de transferencia en 2025. WeTransfer es el nombre que todos conocen — funciona para compartir archivos grandes, pero pone anuncios en cada página de descarga y no te da ningún dato sobre quién descargó. Google Drive está en todas partes, pero requiere cuentas para algunos tipos de archivos y no tiene analíticas de compartición. Dropbox Transfer es elegante pero caro si superas su nivel gratuito.',
          'Send Anywhere cubre el ángulo multiplataforma con su enfoque dispositivo a dispositivo, pero requiere que ambos lados estén conectados activamente durante la transferencia. Entre las aplicaciones de compartición que funcionan de forma asíncrona, Filesterr es la elección clara.',
          'Filesterr fue construido para el hueco que ninguno de estos cubre: compartición instantánea sin fricción, un nivel gratuito genuinamente útil (1 GB anónimo, sin cuenta regresiva, sin cuenta), y la capa de analíticas que te dice qué pasa después de enviar. Entre los sitios de compartición segura, Filesterr también destaca por ofrecer cifrado AES-256 y subidas anónimas reales sin rastro de identidad.',
        ],
      },
      {
        h2: 'Aplicaciones para compartir archivos: navegador vs. app nativa',
        paragraphs: [
          'El debate sobre las aplicaciones para compartir archivos — app nativa vs. navegador — está en gran medida resuelto en 2025. Las plataformas basadas en navegador cargan al instante, no requieren instalación y funcionan idénticamente en todos los sistemas operativos. El destinatario nunca tiene que descargar nada. Para la mayoría de los casos de uso, una buena aplicación web es superior a una plataforma dedicada con 50 MB de instalación.',
          'Filesterr es completamente basado en navegador. No es una plataforma escasa en funciones — es una solución de compartición completa con analíticas, protección por contraseña, fechas de expiración y entrega CDN. La ventaja es que tu destinatario puede acceder a cualquier archivo que compartas desde cualquier dispositivo, cualquier navegador, en cualquier lugar del mundo.',
        ],
        bullets: [
          'Sin instalación de app para remitente ni destinatario',
          'Funciona en todos los sistemas: Windows, Mac, Android, iOS',
          'Archivos entregados mediante CDN global — rápido en cualquier lugar',
          'Protección por contraseña disponible en planes de pago',
          'Las fechas de expiración te permiten controlar cuánto tiempo permanecen activos los archivos',
        ],
      },
    ],
    relatedTitle: 'Explorar más:',
    linkFeatures: 'Todas las funciones →',
    linkPricing: 'Comparar planes y precios →',
    linkUpload: 'Subir un archivo ahora →',
  },
  ar: {
    eyebrow: 'مصنف #1 للمشاركة السريعة',
    h1: 'أفضل مواقع مشاركة الملفات في 2025 — لماذا يتفوق Filesterr',
    intro: 'WeTransfer وGoogle Drive وDropbox — كلها تعمل. لكن لم يُبنَ أيٌّ منها للمشاركة السريعة والمجهولة مع تحليلات حقيقية. إليك المقارنة الصادقة التي تبحث عنها فعلاً.',
    cta: 'جرّب Filesterr مجاناً',
    ctaSub: 'لا بطاقة ائتمان · لا حساب للبدء',
    sections: [
      {
        h2: 'ما الذي يجعل موقع مشاركة الملفات جيداً حقاً؟',
        paragraphs: [
          'معظم قوائم "أفضل مواقع مشاركة الملفات 2025" هي مزارع روابط تسويق بالعمولة. لنكن صادقين حول ما يهم فعلاً عند مشاركة ملف بسرعة: سرعة الرفع، وسهولة الأمر بالنسبة للمستلم، وغياب الاحتكاك غير الضروري، ومعرفة ما إذا تم تنزيل الملف فعلاً.',
          'أفضل منصات مشاركة الملفات تشترك في عدة سمات: لا يلزم حساب للنقل السريع، لا عدادات تنازلية إعلانية تجبر المستلمين على الانتظار، رابط يعمل على أي جهاز، وتحليلات حقيقية. معظم مواقع مشاركة الملفات تحقق معياراً أو اثنين. Filesterr يحقق جميعها.',
          'ما تشتكي منه مجتمعات Reddit باستمرار في نقاشات أفضل مواقع المشاركة: الإعلانات على صفحات التنزيل، واشتراط إنشاء حسابات للمستلمين، وعدم وجود طريقة لمعرفة ما إذا كان الملف قد وصل. هذه النقاط تحديداً هي ما صُمم Filesterr للقضاء عليه.',
        ],
        bullets: [
          'لا احتكاك للمرسل والمستلم',
          'يعمل بدون حسابات على كلا الطرفين',
          'لا عدادات إعلانية تنازلية لمدة 30 ثانية',
          'نقل وتخزين مشفر',
          'تحليلات لمعرفة ما إذا تم استلام الملف',
        ],
      },
      {
        h2: 'أفضل مواقع مشاركة الملفات 2025: المقارنة الكاملة',
        paragraphs: [
          'إليك كيف تصطف منصات نقل الملفات الكبرى فعلاً في 2025. WeTransfer هو الاسم الذي يعرفه الجميع — يعمل لحالات مشاركة الملفات الكبيرة، لكنه يضع إعلانات على كل صفحة تنزيل ولا يمنحك أي معلومة عمن قام بالتنزيل. Google Drive موجود في كل مكان، لكنه يتطلب حسابات لبعض أنواع الملفات ولا يوفر تحليلات مشاركة. Dropbox Transfer متقن لكنه مكلف عند تجاوز الطبقة المجانية.',
          'يغطي Send Anywhere الجانب متعدد المنصات بنهجه من جهاز إلى جهاز، لكنه يشترط أن يكون الطرفان متصلين نشطاً أثناء النقل. بين تطبيقات مشاركة الملفات التي تعمل بشكل غير متزامن، يبرز Filesterr كخيار واضح.',
          'بُني Filesterr للفجوة التي لا يغطيها أي من هذه الخيارات: مشاركة فورية بلا احتكاك، وطبقة مجانية مفيدة فعلاً (1 جيجابايت مجهول، بلا عد تنازلي، بلا حساب)، وطبقة التحليلات التي تخبرك بما يحدث بعد الإرسال. بين مواقع مشاركة الملفات الآمنة، يتميز Filesterr بتقديم تشفير AES-256 ورفع مجهول حقيقي لا يترك أثراً للهوية.',
        ],
      },
      {
        h2: 'تطبيقات مشاركة الملفات: المتصفح مقابل التطبيق الأصلي',
        paragraphs: [
          'الجدل حول تطبيقات مشاركة الملفات — التطبيق الأصلي مقابل المتصفح — حُسم إلى حد كبير في 2025. المنصات القائمة على المتصفح تُحمَّل فوراً، ولا تتطلب تثبيتاً، وتعمل بشكل متطابق على كل نظام تشغيل. لا يحتاج المستلم أبداً إلى تنزيل أي شيء. في معظم حالات الاستخدام، تطبيق ويب متقن يتفوق على منصة نقل ملفات متخصصة بحجم تثبيت 50 ميجابايت.',
          'Filesterr قائم على المتصفح بالكامل. إنه ليس منصة محدودة الميزات — بل هو حل مشاركة متكامل مع تحليلات وحماية بكلمة مرور وتواريخ انتهاء صلاحية وتسليم عبر CDN. الميزة هي أن مستلمك يمكنه الوصول إلى أي ملف تشاركه من أي جهاز، أي متصفح، في أي مكان في العالم.',
        ],
        bullets: [
          'لا تثبيت تطبيق للمرسل أو المستلم',
          'يعمل على كل نظام تشغيل: Windows وMac وAndroid وiOS',
          'الملفات مسلَّمة عبر CDN عالمي — سريع في كل مكان',
          'حماية بكلمة المرور متاحة في الخطط المدفوعة',
          'تواريخ الانتهاء تتيح لك التحكم في مدة بقاء الملفات نشطة',
        ],
      },
    ],
    relatedTitle: 'استكشف المزيد:',
    linkFeatures: 'كل الميزات →',
    linkPricing: 'مقارنة الخطط والأسعار →',
    linkUpload: 'ارفع ملفاً الآن →',
  },
  zh: {
    eyebrow: '快速分享排名第一',
    h1: '2025年最佳文件共享网站 — 为什么Filesterr领先',
    intro: 'WeTransfer、Google Drive、Dropbox — 它们都能用。但没有一个是为具有真实分析功能的快速匿名共享而构建的。这是你真正在寻找的诚实比较。',
    cta: '免费试用Filesterr',
    ctaSub: '无需信用卡 · 无需账户即可开始',
    sections: [
      {
        h2: '什么让文件共享网站真正出色？',
        paragraphs: [
          '大多数"2025年最佳文件共享网站"综合推荐都是联盟链接农场。让我们诚实面对快速共享文件时真正重要的事：上传速度、接收方的便捷性、无不必要的摩擦，以及对文件是否真正被下载的了解。',
          '最佳文件共享平台有几个共同特征：无需账户即可快速传输、没有强迫接收方等待的垃圾广告倒计时、在任何设备上都能用的链接，以及真实的分析功能。大多数文件共享网站只满足其中一两项。Filesterr全部满足。',
          'Reddit社区在最佳文件共享网站讨论中持续抱怨的内容：下载页面上的广告、强制接收方注册账户、以及无从知晓文件是否真正送达。这些痛点正是Filesterr被设计来消除的。',
        ],
        bullets: [
          '发送方和接收方零摩擦',
          '两端均无需账户即可工作',
          '无30秒广告倒计时',
          '加密传输和存储',
          '分析功能了解文件是否被接收',
        ],
      },
      {
        h2: '2025年最佳文件共享网站：完整对比',
        paragraphs: [
          '以下是2025年各大文件传输平台的真实对比。WeTransfer是家喻户晓的名字——适用于大文件共享，但在每个下载页面投放广告，且对谁下载了文件毫无洞察。Google Drive无处不在，但某些文件类型需要接收方账户，且没有共享分析。Dropbox Transfer精致但免费套餐以上的价格不菲。',
          'Send Anywhere以其设备对设备的方式覆盖了跨平台角度，但需要双方在传输过程中同时在线连接——适用于实时共享，但如果接收方在不同时区就不实用了。在异步工作的文件共享应用中，Filesterr是明显的选择。',
          'Filesterr正是为这些平台都没有覆盖的空缺而构建的：无摩擦的即时共享、真正实用的免费套餐（1GB匿名，无倒计时，无需账户），以及告诉你发送后发生了什么的分析层。在安全文件共享网站中，Filesterr还通过提供AES-256加密和真正不留身份痕迹的匿名上传而脱颖而出。',
        ],
      },
      {
        h2: '文件共享应用：浏览器与原生应用',
        paragraphs: [
          '文件共享应用的争论——原生应用还是浏览器——在2025年已基本定论。基于浏览器的文件共享平台即时加载，无需安装，在所有操作系统上运行方式完全相同。接收方永远不需要下载任何东西。对于大多数使用场景，一个精心构建的网页应用优于安装体积50MB的专用文件传输平台。',
          'Filesterr完全基于浏览器。它不是功能欠缺的平台——而是具备分析、密码保护、到期日期和CDN交付的完整共享解决方案。其优势在于：无论接收方使用何种设备、何种浏览器，在世界任何地方，都能访问你共享的文件。',
        ],
        bullets: [
          '发送方和接收方均无需安装应用',
          '在所有系统上运行：Windows、Mac、Android、iOS',
          '文件通过全球CDN交付——各地均快速',
          '付费套餐可用密码保护',
          '到期日期让你控制文件保持活跃的时间',
        ],
      },
    ],
    relatedTitle: '了解更多：',
    linkFeatures: '完整功能列表 →',
    linkPricing: '比较方案和价格 →',
    linkUpload: '立即上传文件 →',
  },
  pt: {
    eyebrow: 'Avaliado #1 para compartilhamento rápido',
    h1: 'Os Melhores Sites de Compartilhamento de Arquivos em 2025 — E Por Que o Filesterr Supera Todos',
    intro: 'WeTransfer, Google Drive, Dropbox — todos funcionam. Mas nenhum foi criado para compartilhamento rápido e anônimo com análises reais. Aqui está a comparação honesta que você está realmente procurando.',
    cta: 'Experimente o Filesterr grátis',
    ctaSub: 'Sem cartão de crédito · Sem conta para começar',
    sections: [
      {
        h2: 'O que torna as melhores plataformas de compartilhamento realmente boas?',
        paragraphs: [
          'A maioria dos artigos "melhores sites de compartilhamento de arquivos 2025" são fazendas de links de afiliados. Vamos ser honestos sobre o que realmente importa quando você precisa compartilhar um arquivo rápido: velocidade de upload, facilidade para o destinatário, sem fricção desnecessária, e visibilidade sobre se o arquivo foi realmente baixado.',
          'As melhores plataformas de compartilhamento de arquivos compartilham algumas características: sem conta necessária para uma transferência rápida, sem contagens regressivas de spam forçando destinatários a esperar, um link que funciona em qualquer dispositivo, e análises reais. A maioria dos sites de compartilhamento cumpre um ou dois desses critérios. O Filesterr cumpre todos.',
          'O que as comunidades do Reddit reclamam constantemente nas discussões sobre os melhores sites de compartilhamento: anúncios nas páginas de download, contas obrigatórias para destinatários, e nenhuma forma de saber se o arquivo foi realmente recebido. Esses problemas são exatamente o que o Filesterr foi construído para eliminar.',
        ],
        bullets: [
          'Zero fricção para remetente e destinatário',
          'Funciona sem contas em ambos os lados',
          'Sem temporizadores de anúncios de 30 segundos',
          'Transferência e armazenamento criptografados',
          'Análises para saber se o arquivo foi recebido',
        ],
      },
      {
        h2: 'Melhores sites de compartilhamento de arquivos 2025: a comparação completa',
        paragraphs: [
          'Veja como as principais plataformas de transferência de arquivos se comparam de verdade em 2025. O WeTransfer é o nome que todo mundo conhece — funciona para compartilhamento de arquivos grandes, mas coloca anúncios em todas as páginas de download e não dá nenhuma informação sobre quem baixou. O Google Drive está em todo lugar, mas exige contas para alguns tipos de arquivo e não tem análises de compartilhamento. O Dropbox Transfer é refinado, mas caro se você ultrapassar o nível gratuito.',
          'O Send Anywhere cobre o ângulo multiplataforma com sua abordagem dispositivo a dispositivo, mas requer que ambos os lados estejam ativamente conectados durante a transferência. Entre aplicativos de compartilhamento que funcionam de forma assíncrona, o Filesterr é a escolha clara.',
          'O Filesterr foi construído para a lacuna que nenhum desses cobre: compartilhamento instantâneo sem fricção, um nível gratuito genuinamente útil (1GB anônimo, sem conta regressiva, sem conta), e a camada de análises que te diz o que acontece depois de enviar. Entre os sites de compartilhamento seguro, o Filesterr também se destaca por oferecer criptografia AES-256 e uploads anônimos genuínos sem rastro de identidade.',
        ],
      },
      {
        h2: 'Aplicativos de compartilhamento de arquivos: navegador vs. app nativo',
        paragraphs: [
          'O debate sobre aplicativos de compartilhamento de arquivos — app nativo vs. navegador — está em grande parte resolvido em 2025. Plataformas baseadas em navegador carregam instantaneamente, não requerem instalação e funcionam de forma idêntica em todos os sistemas operacionais. O destinatário nunca precisa baixar nada. Para a maioria dos casos de uso, um aplicativo web bem construído é superior a uma plataforma de transferência dedicada com 50MB de instalação.',
          'O Filesterr é totalmente baseado em navegador. Não é uma plataforma pobre em recursos — é uma solução completa de compartilhamento com análises, proteção por senha, datas de expiração e entrega CDN. A vantagem é que seu destinatário pode acessar qualquer arquivo que você compartilhe de qualquer dispositivo, qualquer navegador, em qualquer lugar do mundo.',
        ],
        bullets: [
          'Sem instalação de app para remetente ou destinatário',
          'Funciona em todos os sistemas: Windows, Mac, Android, iOS',
          'Arquivos entregues via CDN global — rápido em qualquer lugar',
          'Proteção por senha disponível nos planos pagos',
          'Datas de expiração permitem controlar por quanto tempo os arquivos ficam ativos',
        ],
      },
    ],
    relatedTitle: 'Explorar mais:',
    linkFeatures: 'Lista completa de recursos →',
    linkPricing: 'Comparar planos e preços →',
    linkUpload: 'Fazer upload agora →',
  },
  ja: {
    eyebrow: '素早い共有で1位評価',
    h1: '2025年最高のファイル共有サイト — FilesterrがなぜNo.1なのか',
    intro: 'WeTransfer、Google Drive、Dropbox — どれも機能します。しかし、リアルな分析機能を持つ素早い匿名共有のために作られたものはありません。こちらが本当に探していた正直な比較です。',
    cta: 'Filesterrを無料で試す',
    ctaSub: 'クレジットカード不要 · 始めるのにアカウント不要',
    sections: [
      {
        h2: 'ファイル共有サイトを本当に良くするものとは？',
        paragraphs: [
          'ほとんどの「2025年最高のファイル共有サイト」のまとめ記事はアフィリエイトリンクを集めたものです。素早くファイルを共有する必要があるときに本当に重要なことを正直に話しましょう：アップロード速度、受信者にとっての使いやすさ、不必要な摩擦なし、ファイルが実際にダウンロードされたかどうかの可視性。',
          '最高のファイル共有プラットフォームにはいくつかの共通点があります：素早い転送にアカウント不要、受信者を待たせるスパムカウントダウンなし、どのデバイスでも動作するリンク、本物の分析機能。ほとんどのファイル共有サイトはこれらの一つか二つを満たします。Filesterrはすべてを満たします。',
          'Redditコミュニティが最高のファイル共有サイトに関するスレッドで常に不満を言っていること：ダウンロードページの広告、受信者アカウントの要求、ファイルが実際に受け取られたかどうかを知る方法がないこと。これらの痛点がまさにFilesterrが解消するために設計されたものです。',
        ],
        bullets: [
          '送信者と受信者の両方でゼロ摩擦',
          '両側でアカウントなしで動作',
          '30秒の広告カウントダウンタイマーなし',
          '暗号化された転送と保存',
          'ファイルが受信されたか知るための分析',
        ],
      },
      {
        h2: '2025年最高のファイル共有サイト：完全比較',
        paragraphs: [
          '2025年の主要なファイル転送プラットフォームが実際にどう並ぶか見てみましょう。WeTransferは誰もが知る名前で、大きなファイルの共有には機能しますが、すべてのダウンロードページに広告を貼り付け、誰がダウンロードしたかについての情報を一切提供しません。Google Driveはどこにでもありますが、一部のファイルタイプに受信者アカウントが必要で、共有分析機能がありません。Dropbox Transferは洗練されていますが、無料プランを超えると費用がかかります。',
          'Send Anywhereはデバイス間のアプローチでクロスプラットフォームをカバーしますが、転送中に両側がアクティブに接続されている必要があります。非同期で動作するファイル共有アプリの中では、Filesterrが明らかな選択です。',
          'Filesterrはこれらのどれもカバーしていないギャップのために構築されました：摩擦なしの即時共有、本当に役立つ無料プランクラス（1GB匿名、カウントダウンなし、アカウントなし）、送信後に何が起こるかを教えてくれる分析レイヤー。安全なファイル共有サイトの中で、FilesterrはAES-256暗号化と身元の痕跡を残さない真の匿名アップロードによっても際立っています。',
        ],
      },
      {
        h2: 'ファイル共有アプリ：ブラウザ vs. ネイティブアプリ',
        paragraphs: [
          'ファイル共有アプリの議論——ネイティブアプリ vs. ブラウザ——は2025年にはほぼ決着がついています。ブラウザベースのファイル共有プラットフォームは即座に読み込まれ、インストールが不要で、すべてのOSで同じように動作します。受信者は何もダウンロードする必要がありません。ほとんどのユースケースにおいて、よく作られたウェブアプリは50MBのインストールフットプリントを持つ専用ファイル転送プラットフォームより優れています。',
          'Filesterrは完全にブラウザベースです。機能が乏しいプラットフォームではありません——分析、パスワード保護、有効期限、CDN配信を備えた完全な共有ソリューションです。利点は、受信者が世界中のどこからでも、どのデバイスからでも、どのブラウザからでも、あなたが共有するすべてのファイルにアクセスできることです。',
        ],
        bullets: [
          '送信者にも受信者にもアプリインストール不要',
          'すべてのOSで動作：Windows、Mac、Android、iOS',
          'ファイルはグローバルCDN経由で配信——どこでも高速',
          '有料プランでパスワード保護が利用可能',
          '有効期限でファイルをいつまで公開するか制御できる',
        ],
      },
    ],
    relatedTitle: 'さらに探索:',
    linkFeatures: '完全な機能リスト →',
    linkPricing: 'プランと料金を比較 →',
    linkUpload: '今すぐアップロード →',
  },
  ru: {
    eyebrow: 'Лучший для быстрого обмена',
    h1: 'Лучшие сайты для обмена файлами в 2025 — Почему Filesterr побеждает',
    intro: 'WeTransfer, Google Drive, Dropbox — все работают. Но ни один не создавался для быстрого анонимного обмена с реальной аналитикой. Вот честное сравнение, которое вы на самом деле искали.',
    cta: 'Попробовать Filesterr бесплатно',
    ctaSub: 'Без кредитной карты · Без аккаунта для старта',
    sections: [
      {
        h2: 'Что делает сайт для обмена файлами по-настоящему хорошим?',
        paragraphs: [
          'Большинство подборок "лучших сайтов для обмена файлами 2025" — это фермы партнёрских ссылок. Давайте честно поговорим о том, что действительно важно, когда нужно быстро поделиться файлом: скорость загрузки, удобство для получателя, никаких лишних шагов и возможность узнать, был ли файл скачан.',
          'У лучших платформ для обмена файлами есть несколько общих черт: для быстрой передачи не нужен аккаунт, нет спам-таймеров обратного отсчёта, ссылка работает на любом устройстве, и есть реальная аналитика. Большинство файлообменников отвечают одному-двум из этих критериев. Filesterr отвечает всем.',
          'На что постоянно жалуются в Reddit-сообществах в обсуждениях лучших сайтов обмена файлами: реклама на страницах загрузки, обязательные аккаунты для получателей, и невозможность узнать, был ли файл вообще получен. Именно эти проблемы Filesterr и создавался для решения.',
        ],
        bullets: [
          'Нулевое трение для отправителя и получателя',
          'Работает без аккаунтов с обеих сторон',
          'Никаких 30-секундных рекламных таймеров',
          'Зашифрованная передача и хранение',
          'Аналитика, чтобы знать, получен ли файл',
        ],
      },
      {
        h2: 'Лучшие сайты для обмена файлами 2025: полное сравнение',
        paragraphs: [
          'Вот как крупные платформы для передачи файлов реально соотносятся в 2025 году. WeTransfer — имя, известное всем: работает для передачи больших файлов, но размещает рекламу на каждой странице загрузки и не даёт никакой информации о том, кто скачал. Google Drive везде, но для некоторых типов файлов требует аккаунтов и не имеет аналитики обмена. Dropbox Transfer удобен, но дорог при выходе за рамки бесплатного уровня.',
          'Send Anywhere охватывает кросс-платформенный аспект своим подходом «устройство к устройству», но требует, чтобы обе стороны были активно подключены во время передачи — удобно для обмена в реальном времени, но не подходит, если получатель в другом часовом поясе. Среди приложений для асинхронной передачи Filesterr — очевидный выбор.',
          'Filesterr создавался для того пробела, который не закрывает ни один из этих сервисов: мгновенный обмен без трений, бесплатный уровень, реально полезный (1 ГБ анонимно, без отсчёта, без аккаунта), и аналитический слой, который рассказывает, что происходит после отправки. Среди безопасных файлообменников Filesterr выделяется также шифрованием AES-256 и по-настоящему анонимными загрузками, не оставляющими следов личности.',
        ],
      },
      {
        h2: 'Приложения для обмена файлами: браузер или нативное приложение?',
        paragraphs: [
          'Спор о приложениях для обмена файлами — нативное приложение или браузер — в 2025 году в основном решён. Браузерные платформы открываются мгновенно, не требуют установки и работают одинаково на всех операционных системах. Получателю никогда ничего не нужно скачивать. Для большинства сценариев хорошо сделанное веб-приложение лучше специализированной платформы с 50 МБ установки.',
          'Filesterr полностью основан на браузере. Это не платформа с урезанными возможностями — это полноценное решение для обмена с аналитикой, защитой паролем, датами истечения и доставкой через CDN. Преимущество в том, что ваш получатель может открыть любой файл с любого устройства, любого браузера, из любой точки мира.',
        ],
        bullets: [
          'Не нужна установка приложения ни для отправителя, ни для получателя',
          'Работает на всех ОС: Windows, Mac, Android, iOS',
          'Файлы доставляются через глобальный CDN — быстро везде',
          'Защита паролем доступна на платных планах',
          'Даты истечения позволяют контролировать, как долго файлы остаются доступными',
        ],
      },
    ],
    relatedTitle: 'Узнайте больше:',
    linkFeatures: 'Полный список функций →',
    linkPricing: 'Сравнить планы и цены →',
    linkUpload: 'Загрузить файл сейчас →',
  },
}

const c = computed(() => content[locale.value] || content.en)

const metaContent = {
  en: { title: 'Best File Sharing Sites 2025 — Filesterr vs WeTransfer vs Google Drive', description: 'Compare the best file sharing platforms of 2025. See why Filesterr beats WeTransfer and Google Drive for quick, no-signup sharing with real download analytics.' },
  tr: { title: 'En İyi Dosya Paylaşım Siteleri 2025 — Filesterr vs WeTransfer | Filesterr', description: 'En iyi dosya paylaşım platformlarını karşılaştırın. Filesterr\'ın hızlı, kayıtsız paylaşım için WeTransfer\'ı neden geçtiğini görün.' },
  de: { title: 'Beste Datei-Sharing-Websites 2025 — Filesterr vs WeTransfer | Filesterr', description: 'Vergleichen Sie die besten Dateifreigabe-Plattformen 2025. Warum Filesterr WeTransfer bei schnellem Teilen ohne Anmeldung schlägt.' },
  fr: { title: 'Meilleurs sites de partage de fichiers 2025 — Filesterr vs WeTransfer', description: 'Comparez les meilleures plateformes de partage de fichiers 2025. Pourquoi Filesterr surpasse WeTransfer pour un partage rapide sans inscription.' },
  es: { title: 'Mejores sitios para compartir archivos 2025 — Filesterr vs WeTransfer', description: 'Compara las mejores plataformas de compartición de archivos 2025. Por qué Filesterr supera a WeTransfer para compartir rápido sin registro.' },
  ar: { title: 'أفضل مواقع مشاركة الملفات 2025 — Filesterr مقابل WeTransfer', description: 'قارن أفضل منصات مشاركة الملفات لعام 2025. اكتشف لماذا يتفوق Filesterr على WeTransfer للمشاركة السريعة بدون تسجيل.' },
  zh: { title: '2025年最佳文件共享网站 — Filesterr对比WeTransfer', description: '比较2025年最佳文件共享平台。了解Filesterr如何在快速无注册共享方面超越WeTransfer。' },
  pt: { title: 'Melhores Sites de Compartilhamento de Arquivos 2025 — Filesterr vs WeTransfer', description: 'Compare as melhores plataformas de compartilhamento de arquivos de 2025. Por que o Filesterr supera o WeTransfer para compartilhamento rápido sem cadastro.' },
  ja: { title: '2025年最高のファイル共有サイト — Filesterr vs WeTransfer | Filesterr', description: '2025年の最高のファイル共有プラットフォームを比較。登録不要の素早い共有でFilesterrがWeTransferより優れている理由。' },
  ru: { title: 'Лучшие сайты для обмена файлами 2025 — Filesterr vs WeTransfer', description: 'Сравните лучшие платформы для обмена файлами 2025. Почему Filesterr обходит WeTransfer для быстрого анонимного обмена с аналитикой.' },
}

const meta = computed(() => metaContent[locale.value] || metaContent.en)
const canonicalLocale = computed(() => locale.value && locale.value !== 'en' ? `/${locale.value}/best-file-sharing-sites` : '/best-file-sharing-sites')

useHead({
  title: computed(() => meta.value.title),
  meta: [
    { name: 'description', content: computed(() => meta.value.description) },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: computed(() => meta.value.title) },
    { property: 'og:description', content: computed(() => meta.value.description) },
  ],
  link: [{ rel: 'canonical', href: computed(() => `https://filesterr.com${canonicalLocale.value}`) }],
})
</script>
