<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">
    <div class="bg-gradient-to-b from-violet-50/40 to-transparent dark:from-violet-950/20 dark:to-transparent pt-20 pb-12">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/15 border border-violet-200 dark:border-violet-500/25 text-violet-700 dark:text-violet-400 text-xs font-semibold mb-6">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
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

      <!-- File size limits by plan -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div v-for="plan in c.plans" :key="plan.name" class="text-center p-4 rounded-xl border-2 transition-colors" :class="plan.highlight ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30' : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40'">
          <p class="text-xs font-semibold" :class="plan.highlight ? 'text-brand-600 dark:text-brand-400' : 'text-zinc-500'">{{ plan.name }}</p>
          <p class="text-xl font-display font-extrabold mt-1" :class="plan.highlight ? 'text-brand-700 dark:text-brand-300' : 'text-zinc-900 dark:text-zinc-100'">{{ plan.size }}</p>
          <p class="text-xs text-zinc-500 mt-0.5">{{ plan.sub }}</p>
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
          <a href="/features" class="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">{{ c.linkFeatures }}</a>
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
    eyebrow: 'Up to 50GB per file · Global CDN · Instant links',
    h1: 'Large File Sharing Without the Headache — ZIP Files, Videos, Datasets Up to 50GB',
    intro: 'Email blocks files over 25MB. Most free tiers cap at 2GB. Filesterr handles files up to 50GB on Pro plans, with global CDN delivery and a download link ready before the progress bar finishes.',
    cta: 'Upload a Large File Free',
    ctaSub: 'Start free · Scale up when ready',
    plans: [
      { name: 'Anonymous', size: '1GB', sub: 'per file, no account', highlight: false },
      { name: 'Free', size: '5GB', sub: 'per file', highlight: false },
      { name: 'Premium', size: '50GB', sub: 'per file', highlight: false },
      { name: 'Pro', size: '50GB', sub: 'per file + analytics', highlight: true },
    ],
    sections: [
      {
        h2: 'Why large file sharing is still broken in 2025',
        paragraphs: [
          'Every method people use to share large files comes with compromises. Email: 25MB limit, universally. AirDrop: Apple-only and requires proximity. Google Drive: requires both parties to have Google accounts, slow for externals. Dropbox shared links: fine until the 2GB free tier runs out.',
          'Filesterr is designed specifically for large file transfers. Upload a 4K video, a raw photography archive, a dataset ZIP, or a software installer. Get a link immediately. Your recipient downloads from a global CDN.',
        ],
        bullets: [
          'Up to 1GB free for anonymous uploads — no account',
          'Up to 5GB per file on the free registered account',
          'Up to 50GB per file on Premium and Pro plans',
          'Global CDN — fast download anywhere in the world',
          'No "preparing download" delays — link works immediately',
          'ZIP batch downloads available on Premium+ for multiple files',
        ],
      },
      {
        h2: 'Best use cases for large file online transfer',
        paragraphs: [
          'Video files: a single 4K video from a modern smartphone can exceed 1GB. A finished edit from a professional camera can be 20-50GB. Filesterr handles both.',
          'Design and creative work: PSDs, After Effects project files, Figma exports, font bundles — creative professionals regularly deal with files that email can\'t handle.',
        ],
        bullets: [
          '4K video files up to 50GB — wedding films, corporate videos, short films',
          'Raw photo archives — professional photography shoots',
          'Software installers and development builds',
          'Dataset ZIPs — research, data science, ML training sets',
          'Architecture and CAD files — large project deliverables',
          'Game builds and large executables',
        ],
      },
      {
        h2: 'Large file transfer with no compromise on security',
        paragraphs: [
          'Large doesn\'t mean unprotected. Every file on Filesterr — whether 1KB or 50GB — is encrypted at rest with AES-256. You can add password protection to any large file share, set an expiry date so the file auto-deletes, or use a one-time download link so only the intended recipient can get it.',
          'For Pro users, you also get download analytics on your large files: know when your client downloaded that 10GB source file, from what IP, and on what device.',
        ],
      },
    ],
    relatedTitle: 'Learn more:',
    linkPricing: 'Compare Plans by File Size →',
    linkFeatures: 'All Sharing Features →',
  },
  tr: {
    eyebrow: 'Dosya başına 50 GB\'a kadar · Global CDN',
    h1: 'Büyük Dosya Paylaşımı — ZIP, Video, Veri Setleri 50 GB\'a Kadar',
    intro: 'E-posta 25 MB\'ın üzerindeki dosyaları engeller. Çoğu ücretsiz katman 2 GB ile sınırlıdır. Filesterr Pro planlarında dosya başına 50 GB\'ı destekler.',
    cta: 'Büyük Dosyayı Ücretsiz Yükle',
    ctaSub: 'Ücretsiz başla · Hazır olunca büyüt',
    plans: [
      { name: 'Anonim', size: '1 GB', sub: 'dosya başına', highlight: false },
      { name: 'Ücretsiz', size: '5 GB', sub: 'dosya başına', highlight: false },
      { name: 'Premium', size: '50 GB', sub: 'dosya başına', highlight: false },
      { name: 'Pro', size: '50 GB', sub: 'dosya başına + analitik', highlight: true },
    ],
    sections: [
      {
        h2: '2025\'te büyük dosya paylaşımı neden hâlâ sorunlu',
        paragraphs: [
          'İnsanların büyük dosya paylaşmak için kullandığı her yöntem bir uzlaşı gerektirir. E-posta: evrensel olarak 25 MB sınırı. AirDrop: yalnızca Apple cihazlarda ve yakınlık gerektirir. Google Drive: her iki tarafın da Google hesabına sahip olmasını gerektirir, harici kullanıcılar için yavaştır. Dropbox paylaşım linkleri: 2 GB ücretsiz katman dolana kadar işe yarar.',
          'Filesterr özellikle büyük dosya aktarımları için tasarlandı. Bir 4K video, ham fotoğraf arşivi, veri seti ZIP\'i veya yazılım yükleyicisi yükleyin. Anında bir link alın. Alıcınız global CDN üzerinden indirir.',
        ],
        bullets: [
          'Anonim yüklemeler için 1 GB ücretsiz — hesap gerekmez',
          'Ücretsiz kayıtlı hesapta dosya başına 5 GB',
          'Premium ve Pro planlarda dosya başına 50 GB',
          'Global CDN — dünyanın her yerinde hızlı indirme',
          '"İndirme hazırlanıyor" gecikmesi yok — link anında çalışır',
          'Premium ve üzerinde birden fazla dosya için ZIP toplu indirme',
        ],
      },
      {
        h2: 'Büyük dosya online aktarımı için en iyi kullanım senaryoları',
        paragraphs: [
          'Video dosyaları: modern bir akıllı telefondan çekilen tek bir 4K video 1 GB\'ı aşabilir. Profesyonel bir kameradan tamamlanmış bir kurgu 20-50 GB olabilir. Filesterr her ikisini de karşılar.',
          'Tasarım ve yaratıcı çalışmalar: PSD\'ler, After Effects proje dosyaları, Figma dışa aktarımları, font paketleri — yaratıcı profesyoneller düzenli olarak e-postanın kaldıramayacağı dosyalarla çalışır.',
        ],
        bullets: [
          '50 GB\'a kadar 4K video dosyaları — düğün filmleri, kurumsal videolar, kısa filmler',
          'Ham fotoğraf arşivleri — profesyonel fotoğraf çekimleri',
          'Yazılım yükleyicileri ve geliştirme derlemeleri',
          'Veri seti ZIP\'leri — araştırma, veri bilimi, makine öğrenmesi eğitim setleri',
          'Mimari ve CAD dosyaları — büyük proje teslimatları',
          'Oyun derlemeleri ve büyük çalıştırılabilir dosyalar',
        ],
      },
      {
        h2: 'Güvenlikten taviz vermeden büyük dosya aktarımı',
        paragraphs: [
          'Büyük olmak korumasız olmak demek değildir. Filesterr\'daki her dosya — ister 1 KB ister 50 GB olsun — AES-256 ile depolamada şifrelenir. Herhangi bir büyük dosya paylaşımına şifre koruması ekleyebilir, dosyanın otomatik silinmesi için bir son kullanma tarihi belirleyebilir ya da yalnızca hedeflenen alıcının erişebilmesi için tek kullanımlık indirme linki kullanabilirsiniz.',
          'Pro kullanıcılar ayrıca büyük dosyalar üzerinde indirme analitiğine de sahip olur: müşterinizin o 10 GB\'lık kaynak dosyayı ne zaman, hangi IP\'den ve hangi cihazda indirdiğini öğrenin.',
        ],
      },
    ],
    relatedTitle: 'Daha fazla öğren:',
    linkPricing: 'Planları Dosya Boyutuna Göre Karşılaştır →',
    linkFeatures: 'Tüm Paylaşım Özellikleri →',
  },
  de: {
    eyebrow: 'Bis zu 50 GB pro Datei · Globales CDN',
    h1: 'Große Dateien teilen ohne Kopfschmerzen — ZIPs, Videos, Datensätze bis 50 GB',
    intro: 'E-Mail blockiert Dateien über 25 MB. Die meisten kostenlosen Konten haben 2 GB Limit. Filesterr verarbeitet bis zu 50 GB pro Datei auf Pro-Plänen.',
    cta: 'Große Datei kostenlos hochladen',
    ctaSub: 'Kostenlos starten · Upgraden wenn nötig',
    plans: [
      { name: 'Anonym', size: '1 GB', sub: 'pro Datei', highlight: false },
      { name: 'Kostenlos', size: '5 GB', sub: 'pro Datei', highlight: false },
      { name: 'Premium', size: '50 GB', sub: 'pro Datei', highlight: false },
      { name: 'Pro', size: '50 GB', sub: 'pro Datei + Analysen', highlight: true },
    ],
    sections: [
      {
        h2: 'Warum das Teilen großer Dateien im Jahr 2025 noch immer problematisch ist',
        paragraphs: [
          'Jede Methode, die Menschen zum Teilen großer Dateien verwenden, bringt Kompromisse mit sich. E-Mail: 25 MB Limit, universell. AirDrop: nur für Apple-Geräte und erfordert räumliche Nähe. Google Drive: erfordert Google-Konten auf beiden Seiten, langsam für externe Empfänger. Dropbox-Freigabelinks: funktionieren gut, bis das kostenlose Kontingent von 2 GB aufgebraucht ist.',
          'Filesterr wurde speziell für große Dateiübertragungen entwickelt. Laden Sie ein 4K-Video, ein RAW-Fotoarchiv, einen Datensatz-ZIP oder ein Software-Installationsprogramm hoch. Erhalten Sie sofort einen Link. Ihr Empfänger lädt über ein globales CDN herunter.',
        ],
        bullets: [
          'Bis zu 1 GB kostenlos für anonyme Uploads — kein Konto erforderlich',
          'Bis zu 5 GB pro Datei mit kostenlosem registrierten Konto',
          'Bis zu 50 GB pro Datei auf Premium- und Pro-Plänen',
          'Globales CDN — schnelle Downloads überall auf der Welt',
          'Keine Verzögerungen beim "Download wird vorbereitet" — Link funktioniert sofort',
          'ZIP-Batch-Downloads auf Premium+ für mehrere Dateien verfügbar',
        ],
      },
      {
        h2: 'Die besten Anwendungsfälle für große Dateiübertragungen online',
        paragraphs: [
          'Videodateien: ein einzelnes 4K-Video von einem modernen Smartphone kann 1 GB überschreiten. Ein fertig geschnittenes Video von einer professionellen Kamera kann 20-50 GB groß sein. Filesterr bewältigt beides.',
          'Design und kreative Arbeit: PSDs, After Effects-Projektdateien, Figma-Exporte, Schriftpakete — Kreativprofis haben regelmäßig mit Dateien zu tun, die per E-Mail nicht zu übermitteln sind.',
        ],
        bullets: [
          '4K-Videodateien bis zu 50 GB — Hochzeitsfilme, Unternehmensvideos, Kurzfilme',
          'RAW-Fotoarchive — professionelle Fotoshootings',
          'Software-Installationsprogramme und Entwicklungs-Builds',
          'Datensatz-ZIPs — Forschung, Data Science, ML-Trainingsdaten',
          'Architektur- und CAD-Dateien — große Projektlieferungen',
          'Spiele-Builds und große ausführbare Dateien',
        ],
      },
      {
        h2: 'Große Dateiübertragungen ohne Kompromisse bei der Sicherheit',
        paragraphs: [
          'Große Dateien bedeuten nicht ungeschützte Dateien. Jede Datei auf Filesterr — ob 1 KB oder 50 GB — wird im Ruhezustand mit AES-256 verschlüsselt. Sie können jedem großen Dateifreigabe-Link einen Passwortschutz hinzufügen, ein Ablaufdatum festlegen, sodass die Datei automatisch gelöscht wird, oder einen Einmal-Download-Link verwenden, damit nur der beabsichtigte Empfänger darauf zugreifen kann.',
          'Pro-Nutzer erhalten zusätzlich Download-Analysen für ihre großen Dateien: Erfahren Sie, wann Ihr Kunde diese 10 GB große Quelldatei heruntergeladen hat, von welcher IP-Adresse und mit welchem Gerät.',
        ],
      },
    ],
    relatedTitle: 'Mehr erfahren:',
    linkPricing: 'Pläne nach Dateigröße vergleichen →',
    linkFeatures: 'Alle Freigabefunktionen →',
  },
  fr: {
    eyebrow: 'Jusqu\'à 50 Go par fichier · CDN mondial',
    h1: 'Partager de gros fichiers sans prise de tête — ZIP, vidéos, datasets jusqu\'à 50 Go',
    intro: 'L\'e-mail bloque les fichiers au-delà de 25 Mo. La plupart des plans gratuits plafonnent à 2 Go. Filesterr gère jusqu\'à 50 Go par fichier sur les plans Pro.',
    cta: 'Uploader un gros fichier gratuitement',
    ctaSub: 'Démarrer gratuitement · Passer au niveau supérieur quand prêt',
    plans: [
      { name: 'Anonyme', size: '1 Go', sub: 'par fichier', highlight: false },
      { name: 'Gratuit', size: '5 Go', sub: 'par fichier', highlight: false },
      { name: 'Premium', size: '50 Go', sub: 'par fichier', highlight: false },
      { name: 'Pro', size: '50 Go', sub: 'par fichier + analytics', highlight: true },
    ],
    sections: [
      {
        h2: 'Pourquoi le partage de gros fichiers est encore compliqué en 2025',
        paragraphs: [
          'Chaque méthode utilisée pour partager de gros fichiers implique des compromis. L\'e-mail : limite de 25 Mo, universellement. AirDrop : réservé aux appareils Apple et nécessite une proximité physique. Google Drive : exige des comptes Google des deux côtés, lent pour les destinataires externes. Les liens Dropbox : pratiques jusqu\'à épuisement des 2 Go gratuits.',
          'Filesterr a été conçu spécifiquement pour les transferts de fichiers volumineux. Uploadez une vidéo 4K, une archive de photos brutes, un dataset ZIP ou un installateur logiciel. Obtenez un lien instantanément. Votre destinataire télécharge depuis un CDN mondial.',
        ],
        bullets: [
          'Jusqu\'à 1 Go gratuit pour les uploads anonymes — sans compte',
          'Jusqu\'à 5 Go par fichier avec un compte gratuit',
          'Jusqu\'à 50 Go par fichier sur les plans Premium et Pro',
          'CDN mondial — téléchargements rapides partout dans le monde',
          'Aucun délai de "préparation du téléchargement" — le lien fonctionne immédiatement',
          'Téléchargements ZIP en lot disponibles sur Premium+ pour plusieurs fichiers',
        ],
      },
      {
        h2: 'Les meilleurs cas d\'usage pour le transfert de gros fichiers en ligne',
        paragraphs: [
          'Fichiers vidéo : une seule vidéo 4K filmée avec un smartphone moderne peut dépasser 1 Go. Un montage finalisé depuis une caméra professionnelle peut peser 20 à 50 Go. Filesterr gère les deux.',
          'Design et travail créatif : PSD, fichiers de projet After Effects, exports Figma, packs de polices — les professionnels créatifs manipulent régulièrement des fichiers que l\'e-mail ne peut pas prendre en charge.',
        ],
        bullets: [
          'Fichiers vidéo 4K jusqu\'à 50 Go — films de mariage, vidéos corporate, courts-métrages',
          'Archives de photos brutes — séances photo professionnelles',
          'Installateurs logiciels et builds de développement',
          'Datasets ZIP — recherche, data science, ensembles d\'entraînement ML',
          'Fichiers d\'architecture et CAD — livrables de grands projets',
          'Builds de jeux et exécutables volumineux',
        ],
      },
      {
        h2: 'Transfert de gros fichiers sans compromis sur la sécurité',
        paragraphs: [
          'Volumineux ne signifie pas sans protection. Chaque fichier sur Filesterr — qu\'il fasse 1 Ko ou 50 Go — est chiffré au repos avec AES-256. Vous pouvez ajouter une protection par mot de passe à n\'importe quel partage de fichier volumineux, définir une date d\'expiration pour que le fichier se supprime automatiquement, ou utiliser un lien de téléchargement unique pour que seul le destinataire prévu puisse y accéder.',
          'Pour les utilisateurs Pro, vous bénéficiez également d\'analytics de téléchargement sur vos gros fichiers : sachez quand votre client a téléchargé ce fichier source de 10 Go, depuis quelle adresse IP et sur quel appareil.',
        ],
      },
    ],
    relatedTitle: 'En savoir plus :',
    linkPricing: 'Comparer les plans par taille de fichier →',
    linkFeatures: 'Toutes les fonctionnalités →',
  },
  es: {
    eyebrow: 'Hasta 50 GB por archivo · CDN global',
    h1: 'Compartir Archivos Grandes Sin Complicaciones — ZIPs, Vídeos, Datasets hasta 50 GB',
    intro: 'El email bloquea archivos de más de 25 MB. La mayoría de los planes gratuitos limitan a 2 GB. Filesterr maneja hasta 50 GB por archivo en planes Pro.',
    cta: 'Subir archivo grande gratis',
    ctaSub: 'Empieza gratis · Escala cuando necesites',
    plans: [
      { name: 'Anónimo', size: '1 GB', sub: 'por archivo', highlight: false },
      { name: 'Gratis', size: '5 GB', sub: 'por archivo', highlight: false },
      { name: 'Premium', size: '50 GB', sub: 'por archivo', highlight: false },
      { name: 'Pro', size: '50 GB', sub: 'por archivo + analíticas', highlight: true },
    ],
    sections: [
      {
        h2: 'Por qué compartir archivos grandes sigue siendo un problema en 2025',
        paragraphs: [
          'Cada método que la gente usa para compartir archivos grandes implica compromisos. Email: límite de 25 MB, sin excepción. AirDrop: exclusivo de Apple y requiere proximidad física. Google Drive: requiere cuentas de Google en ambos lados, lento para destinatarios externos. Los enlaces de Dropbox: funcionan bien hasta que se agota el nivel gratuito de 2 GB.',
          'Filesterr fue diseñado específicamente para transferencias de archivos grandes. Sube un video 4K, un archivo de fotografía en raw, un dataset ZIP o un instalador de software. Obtén un enlace de inmediato. Tu destinatario descarga desde un CDN global.',
        ],
        bullets: [
          'Hasta 1 GB gratis para subidas anónimas — sin cuenta',
          'Hasta 5 GB por archivo con cuenta gratuita registrada',
          'Hasta 50 GB por archivo en planes Premium y Pro',
          'CDN global — descarga rápida en cualquier parte del mundo',
          'Sin demoras de "preparando descarga" — el enlace funciona de inmediato',
          'Descargas ZIP en lote disponibles en Premium+ para múltiples archivos',
        ],
      },
      {
        h2: 'Los mejores casos de uso para transferir archivos grandes en línea',
        paragraphs: [
          'Archivos de video: un solo video 4K grabado con un smartphone moderno puede superar 1 GB. Un montaje finalizado desde una cámara profesional puede pesar entre 20 y 50 GB. Filesterr maneja ambos casos.',
          'Diseño y trabajo creativo: PSDs, archivos de proyecto de After Effects, exportaciones de Figma, paquetes de fuentes — los profesionales creativos lidian habitualmente con archivos que el email no puede manejar.',
        ],
        bullets: [
          'Archivos de video 4K de hasta 50 GB — películas de bodas, videos corporativos, cortometrajes',
          'Archivos de fotos en raw — sesiones de fotografía profesional',
          'Instaladores de software y builds de desarrollo',
          'Datasets ZIP — investigación, ciencia de datos, conjuntos de entrenamiento de ML',
          'Archivos de arquitectura y CAD — entregables de grandes proyectos',
          'Builds de videojuegos y ejecutables de gran tamaño',
        ],
      },
      {
        h2: 'Transferencia de archivos grandes sin comprometer la seguridad',
        paragraphs: [
          'Grande no significa desprotegido. Cada archivo en Filesterr — ya sea de 1 KB o 50 GB — está cifrado en reposo con AES-256. Puedes agregar protección por contraseña a cualquier archivo compartido de gran tamaño, establecer una fecha de vencimiento para que el archivo se elimine automáticamente, o usar un enlace de descarga de un solo uso para que solo el destinatario previsto pueda acceder a él.',
          'Los usuarios Pro también obtienen analíticas de descarga sobre sus archivos grandes: sabe cuándo tu cliente descargó ese archivo fuente de 10 GB, desde qué IP y en qué dispositivo.',
        ],
      },
    ],
    relatedTitle: 'Más información:',
    linkPricing: 'Comparar planes por tamaño →',
    linkFeatures: 'Todas las funciones →',
  },
  ar: {
    eyebrow: 'حتى 50 جيجابايت لكل ملف · CDN عالمي',
    h1: 'مشاركة الملفات الكبيرة بدون صداع — ZIP، فيديو، بيانات حتى 50 جيجابايت',
    intro: 'البريد الإلكتروني يحظر الملفات التي تزيد على 25 ميغابايت. معظم المستويات المجانية تقتصر على 2 جيجابايت. يدعم Filesterr حتى 50 جيجابايت لكل ملف في خطط Pro.',
    cta: 'ارفع ملفاً كبيراً مجاناً',
    ctaSub: 'ابدأ مجاناً · توسّع عند الحاجة',
    plans: [
      { name: 'مجهول', size: '1 جيجابايت', sub: 'لكل ملف', highlight: false },
      { name: 'مجاني', size: '5 جيجابايت', sub: 'لكل ملف', highlight: false },
      { name: 'Premium', size: '50 جيجابايت', sub: 'لكل ملف', highlight: false },
      { name: 'Pro', size: '50 جيجابايت', sub: 'لكل ملف + تحليلات', highlight: true },
    ],
    sections: [
      {
        h2: 'لماذا لا تزال مشاركة الملفات الكبيرة أمراً صعباً في 2025',
        paragraphs: [
          'كل طريقة يستخدمها الناس لمشاركة الملفات الكبيرة تأتي مع تنازلات. البريد الإلكتروني: حد 25 ميغابايت بشكل عام. AirDrop: مخصص لأجهزة Apple فقط ويتطلب القرب الجسدي. Google Drive: يستلزم امتلاك حسابات Google من كلا الطرفين وبطيء بالنسبة للمستخدمين الخارجيين. روابط Dropbox المشتركة: مناسبة حتى ينفد الحد المجاني البالغ 2 جيجابايت.',
          'صُمم Filesterr خصيصاً لنقل الملفات الكبيرة. ارفع فيديو 4K أو أرشيف صور بتنسيق RAW أو ملف ZIP لمجموعة بيانات أو مثبّت برنامج. احصل على رابط فوراً. يقوم المستلم بالتنزيل من خلال CDN عالمي.',
        ],
        bullets: [
          'حتى 1 جيجابايت مجاناً للرفع المجهول — بدون حساب',
          'حتى 5 جيجابايت لكل ملف مع حساب مجاني مسجَّل',
          'حتى 50 جيجابايت لكل ملف في خطط Premium وPro',
          'CDN عالمي — تنزيل سريع من أي مكان في العالم',
          'لا تأخيرات "جاري تحضير التنزيل" — الرابط يعمل فوراً',
          'تنزيلات ZIP المجمّعة متاحة في Premium فما فوق لملفات متعددة',
        ],
      },
      {
        h2: 'أفضل حالات الاستخدام لنقل الملفات الكبيرة عبر الإنترنت',
        paragraphs: [
          'ملفات الفيديو: فيديو 4K واحد من هاتف ذكي حديث يمكن أن يتجاوز 1 جيجابايت. مشروع مونتاج منتهٍ من كاميرا احترافية قد يبلغ 20-50 جيجابايت. يتعامل Filesterr مع الحالتين.',
          'التصميم والعمل الإبداعي: ملفات PSD وملفات مشاريع After Effects وصادرات Figma وحزم الخطوط — يتعامل المحترفون الإبداعيون بانتظام مع ملفات لا يستطيع البريد الإلكتروني التعامل معها.',
        ],
        bullets: [
          'ملفات فيديو 4K حتى 50 جيجابايت — أفلام الأعراس والفيديوهات المؤسسية والأفلام القصيرة',
          'أرشيفات الصور الخام — جلسات التصوير الاحترافية',
          'مثبّتات البرامج وإصدارات التطوير',
          'ملفات ZIP لمجموعات البيانات — الأبحاث وعلم البيانات ومجموعات تدريب الذكاء الاصطناعي',
          'ملفات الهندسة المعمارية وCAD — تسليمات المشاريع الكبيرة',
          'إصدارات الألعاب والملفات التنفيذية الكبيرة',
        ],
      },
      {
        h2: 'نقل الملفات الكبيرة دون التنازل عن الأمان',
        paragraphs: [
          'الحجم الكبير لا يعني غياب الحماية. كل ملف على Filesterr — سواء كان 1 كيلوبايت أو 50 جيجابايت — مشفَّر في حالة السكون باستخدام AES-256. يمكنك إضافة حماية بكلمة مرور لأي مشاركة ملف كبيرة، وتعيين تاريخ انتهاء صلاحية لحذف الملف تلقائياً، أو استخدام رابط تنزيل لمرة واحدة حتى يتمكن المستلم المقصود فقط من الوصول إليه.',
          'يحصل مستخدمو Pro أيضاً على تحليلات التنزيل لملفاتهم الكبيرة: اعرف متى قام عميلك بتنزيل ملف المصدر الذي يبلغ 10 جيجابايت، ومن أي عنوان IP، وعلى أي جهاز.',
        ],
      },
    ],
    relatedTitle: 'اعرف المزيد:',
    linkPricing: 'مقارنة الخطط حسب حجم الملف →',
    linkFeatures: 'كل ميزات المشاركة →',
  },
  zh: {
    eyebrow: '每文件最大50GB · 全球CDN',
    h1: '大文件共享无烦恼 — ZIP、视频、数据集最大50GB',
    intro: '电子邮件阻止超过25MB的文件。大多数免费套餐限制为2GB。Filesterr Pro计划支持每文件最大50GB。',
    cta: '免费上传大文件',
    ctaSub: '免费开始 · 随需升级',
    plans: [
      { name: '匿名', size: '1GB', sub: '每文件', highlight: false },
      { name: '免费', size: '5GB', sub: '每文件', highlight: false },
      { name: 'Premium', size: '50GB', sub: '每文件', highlight: false },
      { name: 'Pro', size: '50GB', sub: '每文件+分析', highlight: true },
    ],
    sections: [
      {
        h2: '为什么2025年大文件共享依然是个难题',
        paragraphs: [
          '人们用于共享大文件的每种方法都存在妥协。电子邮件：普遍限制25MB。AirDrop：仅限Apple设备且需要物理距离接近。Google Drive：双方都需要Google账户，对外部接收者速度较慢。Dropbox共享链接：在2GB免费配额用完之前还算可用。',
          'Filesterr专为大文件传输而设计。上传一个4K视频、原始摄影档案、数据集ZIP或软件安装包，立即获得分享链接。接收方通过全球CDN下载。',
        ],
        bullets: [
          '匿名上传最多1GB免费 — 无需账户',
          '免费注册账户每文件最多5GB',
          'Premium和Pro计划每文件最多50GB',
          '全球CDN — 在世界任何地方快速下载',
          '无"正在准备下载"延迟 — 链接即时可用',
          'Premium及以上支持ZIP批量下载多个文件',
        ],
      },
      {
        h2: '大文件在线传输的最佳使用场景',
        paragraphs: [
          '视频文件：一部现代智能手机拍摄的4K视频可能超过1GB。专业摄像机的成品剪辑可达20-50GB。Filesterr两者都能处理。',
          '设计与创意工作：PSD文件、After Effects项目文件、Figma导出、字体包 — 创意专业人士经常需要处理电子邮件无法传输的文件。',
        ],
        bullets: [
          '4K视频文件最大50GB — 婚礼影片、企业视频、短片',
          '原始照片档案 — 专业摄影拍摄成果',
          '软件安装包和开发构建版本',
          '数据集ZIP — 研究、数据科学、机器学习训练集',
          '建筑和CAD文件 — 大型项目交付物',
          '游戏构建版本和大型可执行文件',
        ],
      },
      {
        h2: '大文件传输，安全性毫不妥协',
        paragraphs: [
          '文件大并不意味着缺乏保护。Filesterr上的每个文件 — 无论是1KB还是50GB — 都使用AES-256进行静态加密。您可以为任何大文件共享添加密码保护，设置到期日期使文件自动删除，或使用一次性下载链接确保只有指定接收方才能获取文件。',
          'Pro用户还可以获得大文件的下载分析：了解客户何时下载了那个10GB的源文件，来自哪个IP，使用的是什么设备。',
        ],
      },
    ],
    relatedTitle: '了解更多：',
    linkPricing: '按文件大小比较方案 →',
    linkFeatures: '所有共享功能 →',
  },
  pt: {
    eyebrow: 'Até 50GB por arquivo · CDN global',
    h1: 'Compartilhar Arquivos Grandes Sem Dor de Cabeça — ZIPs, Vídeos, Datasets até 50GB',
    intro: 'O e-mail bloqueia arquivos acima de 25MB. A maioria dos planos gratuitos limita a 2GB. O Filesterr suporta até 50GB por arquivo nos planos Pro.',
    cta: 'Fazer Upload de Arquivo Grande Grátis',
    ctaSub: 'Comece grátis · Escale quando precisar',
    plans: [
      { name: 'Anônimo', size: '1GB', sub: 'por arquivo', highlight: false },
      { name: 'Grátis', size: '5GB', sub: 'por arquivo', highlight: false },
      { name: 'Premium', size: '50GB', sub: 'por arquivo', highlight: false },
      { name: 'Pro', size: '50GB', sub: 'por arquivo + análises', highlight: true },
    ],
    sections: [
      {
        h2: 'Por que o compartilhamento de arquivos grandes ainda é complicado em 2025',
        paragraphs: [
          'Cada método que as pessoas usam para compartilhar arquivos grandes vem com compromissos. E-mail: limite de 25MB, universalmente. AirDrop: exclusivo para Apple e requer proximidade física. Google Drive: exige contas Google em ambos os lados, lento para destinatários externos. Links compartilhados do Dropbox: funcionam bem até o limite gratuito de 2GB acabar.',
          'O Filesterr foi projetado especificamente para transferências de arquivos grandes. Faça upload de um vídeo 4K, um arquivo de fotos RAW, um dataset ZIP ou um instalador de software. Receba um link imediatamente. Seu destinatário faz o download por um CDN global.',
        ],
        bullets: [
          'Até 1GB grátis para uploads anônimos — sem conta',
          'Até 5GB por arquivo com conta gratuita cadastrada',
          'Até 50GB por arquivo nos planos Premium e Pro',
          'CDN global — download rápido em qualquer lugar do mundo',
          'Sem atrasos de "preparando download" — o link funciona imediatamente',
          'Downloads ZIP em lote disponíveis no Premium+ para múltiplos arquivos',
        ],
      },
      {
        h2: 'Melhores casos de uso para transferência de arquivos grandes online',
        paragraphs: [
          'Arquivos de vídeo: um único vídeo 4K gravado por um smartphone moderno pode ultrapassar 1GB. Uma edição finalizada de uma câmera profissional pode ter entre 20 e 50GB. O Filesterr lida com os dois.',
          'Design e trabalho criativo: PSDs, arquivos de projeto do After Effects, exportações do Figma, pacotes de fontes — profissionais criativos lidam regularmente com arquivos que o e-mail não consegue transmitir.',
        ],
        bullets: [
          'Arquivos de vídeo 4K de até 50GB — filmes de casamento, vídeos corporativos, curtas-metragens',
          'Arquivos de fotos RAW — sessões de fotografia profissional',
          'Instaladores de software e builds de desenvolvimento',
          'Datasets ZIP — pesquisa, ciência de dados, conjuntos de treinamento de ML',
          'Arquivos de arquitetura e CAD — entregas de grandes projetos',
          'Builds de jogos e executáveis de grande porte',
        ],
      },
      {
        h2: 'Transferência de arquivos grandes sem abrir mão da segurança',
        paragraphs: [
          'Grande não significa desprotegido. Cada arquivo no Filesterr — seja 1KB ou 50GB — é criptografado em repouso com AES-256. Você pode adicionar proteção por senha a qualquer compartilhamento de arquivo grande, definir uma data de expiração para que o arquivo seja excluído automaticamente, ou usar um link de download de uso único para que somente o destinatário pretendido possa acessá-lo.',
          'Para usuários Pro, você também obtém análises de download dos seus arquivos grandes: saiba quando seu cliente baixou aquele arquivo fonte de 10GB, de qual IP e em qual dispositivo.',
        ],
      },
    ],
    relatedTitle: 'Saiba mais:',
    linkPricing: 'Comparar planos por tamanho →',
    linkFeatures: 'Todos os recursos de compartilhamento →',
  },
  ja: {
    eyebrow: 'ファイルあたり最大50GB · グローバルCDN',
    h1: 'ストレスなしの大容量ファイル共有 — ZIP、動画、データセット最大50GB',
    intro: 'メールは25MB以上のファイルをブロックします。ほとんどの無料プランは2GB上限です。FilesterrはProプランでファイルあたり最大50GBをサポートします。',
    cta: '大容量ファイルを無料でアップロード',
    ctaSub: '無料で始める · 必要に応じてアップグレード',
    plans: [
      { name: '匿名', size: '1GB', sub: 'ファイルあたり', highlight: false },
      { name: '無料', size: '5GB', sub: 'ファイルあたり', highlight: false },
      { name: 'Premium', size: '50GB', sub: 'ファイルあたり', highlight: false },
      { name: 'Pro', size: '50GB', sub: 'ファイルあたり+分析', highlight: true },
    ],
    sections: [
      {
        h2: '2025年でも大容量ファイルの共有が難しい理由',
        paragraphs: [
          '人々が大容量ファイルを共有するために使用するすべての方法には妥協が伴います。メール：一般的に25MBの制限があります。AirDrop：Appleデバイス専用で、物理的な近接が必要です。Google Drive：双方がGoogleアカウントを持つ必要があり、外部の受信者には速度が遅くなります。Dropboxの共有リンク：2GBの無料枠がなくなるまでは使えます。',
          'Filesterrは大容量ファイルの転送を専門に設計されています。4K動画、RAW写真アーカイブ、データセットZIP、またはソフトウェアインストーラーをアップロードしてください。すぐにリンクが発行されます。受信者はグローバルCDNからダウンロードします。',
        ],
        bullets: [
          '匿名アップロードで最大1GB無料 — アカウント不要',
          '無料登録アカウントでファイルあたり最大5GB',
          'PremiumおよびProプランでファイルあたり最大50GB',
          'グローバルCDN — 世界中どこでも高速ダウンロード',
          '「ダウンロードを準備中」の遅延なし — リンクはすぐに機能します',
          'Premium以上では複数ファイルのZIPバッチダウンロードが利用可能',
        ],
      },
      {
        h2: '大容量ファイルのオンライン転送に最適なユースケース',
        paragraphs: [
          '動画ファイル：最新のスマートフォンで撮影した4K動画1本が1GBを超えることがあります。プロ用カメラからの完成した編集動画は20〜50GBになることもあります。Filesterrはどちらにも対応しています。',
          'デザインとクリエイティブワーク：PSD、After Effectsのプロジェクトファイル、Figmaのエクスポート、フォントバンドル — クリエイティブな専門家は、メールでは送れないファイルを日常的に扱っています。',
        ],
        bullets: [
          '最大50GBの4K動画ファイル — ウェディングフィルム、企業動画、短編映画',
          'RAW写真アーカイブ — プロの撮影データ',
          'ソフトウェアインストーラーと開発ビルド',
          'データセットZIP — 研究、データサイエンス、機械学習の訓練データ',
          '建築およびCADファイル — 大型プロジェクトの納品物',
          'ゲームビルドと大容量の実行ファイル',
        ],
      },
      {
        h2: 'セキュリティに妥協しない大容量ファイル転送',
        paragraphs: [
          'ファイルが大きいからといって、保護されていないわけではありません。Filesterr上のすべてのファイル — 1KBでも50GBでも — は、AES-256で保存時に暗号化されています。大容量ファイルの共有にパスワード保護を追加したり、ファイルが自動削除されるように有効期限を設定したり、指定した受信者だけがアクセスできるワンタイムダウンロードリンクを使用することができます。',
          'Proユーザーは、大容量ファイルのダウンロード分析も利用できます：クライアントがその10GBのソースファイルをいつ、どのIPから、どのデバイスでダウンロードしたかを確認できます。',
        ],
      },
    ],
    relatedTitle: 'さらに詳しく:',
    linkPricing: 'ファイルサイズ別にプランを比較 →',
    linkFeatures: 'すべての共有機能 →',
  },
  ru: {
    eyebrow: 'До 50 ГБ за файл · Глобальный CDN',
    h1: 'Передача больших файлов без головной боли — ZIP, видео, датасеты до 50 ГБ',
    intro: 'Почта блокирует файлы больше 25 МБ. Большинство бесплатных тарифов ограничены 2 ГБ. Filesterr поддерживает до 50 ГБ за файл на планах Pro.',
    cta: 'Загрузить большой файл бесплатно',
    ctaSub: 'Начните бесплатно · Обновите когда нужно',
    plans: [
      { name: 'Анонимно', size: '1 ГБ', sub: 'за файл', highlight: false },
      { name: 'Бесплатно', size: '5 ГБ', sub: 'за файл', highlight: false },
      { name: 'Premium', size: '50 ГБ', sub: 'за файл', highlight: false },
      { name: 'Pro', size: '50 ГБ', sub: 'за файл + аналитика', highlight: true },
    ],
    sections: [
      {
        h2: 'Почему обмен большими файлами по-прежнему остаётся проблемой в 2025 году',
        paragraphs: [
          'Каждый способ, которым люди пользуются для отправки больших файлов, связан с компромиссами. Почта: ограничение 25 МБ повсеместно. AirDrop: только для устройств Apple и требует физической близости. Google Drive: требует аккаунты Google с обеих сторон, медленно работает для внешних получателей. Публичные ссылки Dropbox: удобны, пока не кончается бесплатный лимит в 2 ГБ.',
          'Filesterr создан специально для передачи больших файлов. Загрузите 4K-видео, архив RAW-фотографий, ZIP с датасетом или установщик программы. Получите ссылку немедленно. Ваш получатель скачивает файл с глобального CDN.',
        ],
        bullets: [
          'До 1 ГБ бесплатно для анонимных загрузок — без аккаунта',
          'До 5 ГБ за файл на бесплатном зарегистрированном аккаунте',
          'До 50 ГБ за файл на планах Premium и Pro',
          'Глобальный CDN — быстрая загрузка из любой точки мира',
          'Никаких задержек «подготовки скачивания» — ссылка работает мгновенно',
          'ZIP-пакеты для нескольких файлов доступны на Premium и выше',
        ],
      },
      {
        h2: 'Лучшие сценарии использования для онлайн-передачи больших файлов',
        paragraphs: [
          'Видеофайлы: одно 4K-видео с современного смартфона может превышать 1 ГБ. Готовый монтаж с профессиональной камеры может весить 20-50 ГБ. Filesterr справляется с обоими случаями.',
          'Дизайн и творческие проекты: PSD-файлы, проекты After Effects, экспорты из Figma, наборы шрифтов — творческие специалисты регулярно работают с файлами, которые невозможно отправить по почте.',
        ],
        bullets: [
          '4K-видеофайлы до 50 ГБ — свадебные фильмы, корпоративные видео, короткометражки',
          'Архивы RAW-фотографий — профессиональные фотосессии',
          'Установщики программ и сборки для разработчиков',
          'ZIP-архивы датасетов — исследования, data science, обучающие выборки для ML',
          'Архитектурные файлы и CAD — крупные проектные материалы',
          'Игровые сборки и крупные исполняемые файлы',
        ],
      },
      {
        h2: 'Передача больших файлов без компромиссов с безопасностью',
        paragraphs: [
          'Большой размер не означает незащищённость. Каждый файл на Filesterr — будь то 1 КБ или 50 ГБ — зашифрован в состоянии покоя по алгоритму AES-256. Вы можете добавить защиту паролем к любой ссылке на большой файл, задать дату истечения срока действия для автоматического удаления, или использовать одноразовую ссылку для скачивания, чтобы только нужный получатель мог получить доступ.',
          'Пользователи Pro также получают аналитику скачивания своих больших файлов: узнайте, когда ваш клиент скачал тот самый исходный файл на 10 ГБ, с какого IP-адреса и с какого устройства.',
        ],
      },
    ],
    relatedTitle: 'Узнать больше:',
    linkPricing: 'Сравнить планы по размеру файлов →',
    linkFeatures: 'Все функции обмена →',
  },
}

const c = computed(() => content[locale.value] || content.en)

const metaContent = {
  en: { title: 'Large File Sharing — Transfer ZIP Files & Videos Up to 50GB | Filesterr', description: 'Share large files online up to 50GB. Upload ZIP files, 4K videos, RAW photos, and datasets. Global CDN delivery, no account required for up to 1GB free.' },
  tr: { title: 'Büyük Dosya Paylaşımı — 50 GB\'a Kadar ZIP ve Video Aktarımı | Filesterr', description: 'Büyük dosyaları online paylaşın, 50 GB\'a kadar. ZIP, 4K video, fotoğraf arşivleri yükleyin. Global CDN teslimatı, 1 GB\'a kadar hesap gerekmez.' },
  de: { title: 'Große Dateien teilen — ZIP-Dateien & Videos bis zu 50 GB übertragen | Filesterr', description: 'Große Dateien online teilen bis zu 50 GB. ZIPs, 4K-Videos, RAW-Fotos hochladen. Globale CDN-Lieferung, bis 1 GB kein Konto nötig.' },
  fr: { title: 'Partager de gros fichiers — ZIPs et vidéos jusqu\'à 50 Go | Filesterr', description: 'Partagez de gros fichiers en ligne jusqu\'à 50 Go. Uploadez des ZIPs, vidéos 4K, photos RAW. Livraison CDN mondiale, sans compte jusqu\'à 1 Go.' },
  es: { title: 'Compartir archivos grandes — ZIP y vídeos hasta 50 GB | Filesterr', description: 'Comparte archivos grandes online hasta 50 GB. Sube ZIPs, vídeos 4K, fotos RAW. Entrega CDN global, sin cuenta hasta 1 GB gratis.' },
  ar: { title: 'مشاركة الملفات الكبيرة — نقل ZIP وفيديو حتى 50 جيجابايت | Filesterr', description: 'شارك ملفات كبيرة عبر الإنترنت حتى 50 جيجابايت. ارفع ZIP وفيديو 4K وصور RAW. تسليم CDN عالمي، بدون حساب حتى 1 جيجابايت مجاناً.' },
  zh: { title: '大文件共享 — 传输ZIP文件和视频最大50GB | Filesterr', description: '在线共享最大50GB的大文件。上传ZIP文件、4K视频、RAW照片和数据集。全球CDN交付，最多1GB无需账户。' },
  pt: { title: 'Compartilhar Arquivos Grandes — ZIPs e Vídeos até 50GB | Filesterr', description: 'Compartilhe arquivos grandes online até 50GB. Faça upload de ZIPs, vídeos 4K, fotos RAW. Entrega CDN global, sem conta até 1GB grátis.' },
  ja: { title: '大容量ファイル共有 — ZIPファイルと動画を50GBまで転送 | Filesterr', description: '最大50GBの大容量ファイルをオンラインで共有。ZIP、4K動画、RAW写真をアップロード。グローバルCDN配信、1GBまでアカウント不要。' },
  ru: { title: 'Передача больших файлов — ZIP и видео до 50 ГБ | Filesterr', description: 'Делитесь большими файлами онлайн до 50 ГБ. Загружайте ZIP, 4K видео, RAW фото. Глобальная CDN-доставка, до 1 ГБ без аккаунта.' },
}

const meta = computed(() => metaContent[locale.value] || metaContent.en)
const canonicalLocale = computed(() => locale.value && locale.value !== 'en' ? `/${locale.value}/large-file-sharing` : '/large-file-sharing')

useHead({
  title: computed(() => meta.value.title),
  meta: [
    { name: 'description', content: computed(() => meta.value.description) },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: computed(() => `https://filesterr.com${canonicalLocale.value}`) }],
})
</script>
