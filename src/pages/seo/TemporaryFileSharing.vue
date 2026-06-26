<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">
    <div class="bg-gradient-to-b from-orange-50/40 to-transparent dark:from-orange-950/20 dark:to-transparent pt-20 pb-12">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-500/15 border border-orange-200 dark:border-orange-500/25 text-orange-700 dark:text-orange-400 text-xs font-semibold mb-6">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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

      <!-- Expiry options visual -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div v-for="opt in c.expiryOptions" :key="opt.label" class="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
          <p class="text-xl font-display font-extrabold text-zinc-900 dark:text-zinc-100">{{ opt.value }}</p>
          <p class="text-xs text-zinc-500 mt-0.5">{{ opt.label }}</p>
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
          <a href="/features" class="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">{{ c.linkFeatures }}</a>
          <a href="/pricing" class="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">{{ c.linkPricing }}</a>
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
    eyebrow: 'Set expiry · Auto-delete · One-time links',
    h1: 'Temporary File Sharing — Files That Exist Only as Long as They Need To',
    intro: 'Not everything should live forever online. Set an expiry date on your file link and it self-destructs. Use a one-time download link and the file vanishes the moment it\'s downloaded. Full control over how long your files are accessible.',
    cta: 'Create a Temporary File Share',
    ctaSub: 'Free · Expiry controls on all plans · One-time links on Premium+',
    expiryOptions: [
      { value: '24h', label: 'Auto on anonymous uploads' },
      { value: '7 days', label: 'Custom expiry' },
      { value: '30 days', label: 'Custom expiry' },
      { value: '1 download', label: 'One-time link' },
    ],
    sections: [
      {
        h2: 'Why temporary file sharing matters',
        paragraphs: [
          'Permanent file links create permanent risk. A contract you sent to a client five years ago. A personal photo shared for a specific occasion. A software build that was replaced by a newer version. These files shouldn\'t be accessible forever.',
          'Filesterr gives you precise control: set an expiry date (hours, days, or a specific date), or use a one-time download link that permanently deletes the file the moment it\'s accessed. No lingering links. No stale files.',
        ],
        bullets: [
          'Anonymous uploads expire automatically in 24 hours',
          'Set custom expiry dates: 1 hour, 24 hours, 7 days, 30 days, or a specific date',
          'One-time download links — file permanently deleted after first download',
          'Manual delete: every upload includes a private delete link',
          'Expiry visible to recipient on the download page',
        ],
      },
      {
        h2: 'One-time download links: share once, then it\'s gone',
        paragraphs: [
          'A one-time download link is exactly what it sounds like: the file can be downloaded exactly once. After that, the link returns a 404 and the file is permanently deleted from our servers.',
          'This is ideal for confidential document delivery, software license keys, time-sensitive credentials, or any situation where you need certainty that only one person got the file — and that it can\'t be reshared.',
        ],
        bullets: [
          'File permanently deleted after first download — zero retention',
          'Recipient can\'t share the link and have it work a second time',
          'Perfect for licenses, credentials, confidential docs',
          'Combine with password protection for maximum security',
          'Available on Premium and Pro plans',
        ],
      },
      {
        h2: 'Temporary file sharing for specific use cases',
        paragraphs: [
          'Time-limited file shares solve real problems: you want your client to be able to download a deliverable for two weeks after project completion, then the link stops working. You\'re distributing a beta build to testers for 48 hours. You\'re sharing a personal document that should only be available for the next 24 hours.',
          'Filesterr handles all of these with a single toggle when you upload. No code, no API call, no manual cleanup.',
        ],
        bullets: [
          'Client deliverables with a defined access window',
          'Beta builds and test files with short lifespans',
          'Personal or sensitive documents shared temporarily',
          'Contest or event files that expire after the event',
          'Secure document delivery with automatic cleanup',
        ],
      },
    ],
    relatedTitle: 'Explore more:',
    linkFeatures: 'All Sharing Features →',
    linkPricing: 'Expiry & One-Time Links — Which Plan? →',
  },
  tr: {
    eyebrow: 'Son kullanma tarihi · Otomatik silme · Tek kullanımlık bağlantılar',
    h1: 'Geçici Dosya Paylaşımı — Yalnızca Gerektiği Sürece Var Olan Dosyalar',
    intro: 'Her şeyin sonsuza kadar online olmasına gerek yok. Dosya bağlantınıza son kullanma tarihi belirleyin ve kendiliğinden silinsin. Tek kullanımlık indirme bağlantısı kullanın; dosya indirildiği anda yok olsun. Dosyalarınıza ne kadar süre erişilebileceği tamamen sizin kontrolünüzde.',
    cta: 'Geçici Dosya Paylaşımı Oluştur',
    ctaSub: 'Ücretsiz · Tüm planlarda son kullanma tarihi · Premium ve üzerinde tek kullanımlık bağlantı',
    expiryOptions: [
      { value: '24s', label: 'Anonim yüklemelerde otomatik' },
      { value: '7 gün', label: 'Özel son kullanma' },
      { value: '30 gün', label: 'Özel son kullanma' },
      { value: '1 indirme', label: 'Tek kullanımlık bağlantı' },
    ],
    sections: [
      {
        h2: 'Neden geçici dosya paylaşımı önemlidir',
        paragraphs: [
          'Kalıcı dosya bağlantıları kalıcı risk yaratır. Beş yıl önce bir müşteriye gönderdiğiniz sözleşme. Özel bir an için paylaşılan kişisel bir fotoğraf. Daha yeni bir sürümle değiştirilen bir yazılım derlemesi. Bu dosyaların sonsuza kadar erişilebilir olması gerekmez.',
          'Filesterr size tam kontrol sağlar: son kullanma tarihi belirleyin (saat, gün veya belirli bir tarih) ya da erişildiği anda dosyayı kalıcı olarak silen tek kullanımlık indirme bağlantısı kullanın. Asılı kalan bağlantı yok. Bayatlamış dosya yok.',
        ],
        bullets: [
          'Anonim yüklemeler 24 saatte otomatik olarak sona erer',
          'Özel son kullanma tarihleri belirleyin: 1 saat, 24 saat, 7 gün, 30 gün veya belirli bir tarih',
          'Tek kullanımlık indirme bağlantıları — ilk indirmeden sonra dosya kalıcı olarak silinir',
          'Manuel silme: her yükleme özel bir silme bağlantısı içerir',
          'Son kullanma tarihi, indirme sayfasında alıcıya gösterilir',
        ],
      },
      {
        h2: 'Tek kullanımlık indirme bağlantıları: bir kez paylaş, sonra yok olsun',
        paragraphs: [
          'Tek kullanımlık indirme bağlantısı tam olarak adının çağrıştırdığı şeydir: dosya yalnızca bir kez indirilebilir. Bundan sonra bağlantı 404 döndürür ve dosya sunucularımızdan kalıcı olarak silinir.',
          'Bu özellik; gizli belge teslimi, yazılım lisans anahtarları, zaman açısından kritik kimlik bilgileri veya dosyayı yalnızca tek bir kişinin aldığından emin olmanız gereken her durum için idealdir — ve dosyanın yeniden paylaşılması mümkün olmaz.',
        ],
        bullets: [
          'İlk indirmeden sonra dosya kalıcı olarak silinir — sıfır saklama',
          'Alıcı bağlantıyı paylaşsa bile ikinci kez çalışmaz',
          'Lisanslar, kimlik bilgileri ve gizli belgeler için mükemmel',
          'Maksimum güvenlik için şifre korumasıyla birleştirin',
          'Premium ve Pro planlarda kullanılabilir',
        ],
      },
      {
        h2: 'Belirli kullanım senaryoları için geçici dosya paylaşımı',
        paragraphs: [
          'Süreli dosya paylaşımı gerçek sorunları çözer: müşterinizin proje tamamlandıktan iki hafta sonrasına kadar bir teslimatı indirebilmesini, ardından bağlantının çalışmayı durdurmasını isteyebilirsiniz. Beta derlemenizi 48 saat boyunca test kullanıcılarına dağıtıyorsunuzdur. Yalnızca önümüzdeki 24 saat içinde erişilebilir olması gereken kişisel bir belge paylaşıyorsunuzdur.',
          'Filesterr tüm bunları yükleme sırasında tek bir düğmeyle halleder. Kod yok, API çağrısı yok, manuel temizlik yok.',
        ],
        bullets: [
          'Belirli bir erişim penceresi olan müşteri teslimatları',
          'Kısa ömürlü beta derlemeleri ve test dosyaları',
          'Geçici olarak paylaşılan kişisel veya hassas belgeler',
          'Etkinlik sonrasında sona eren yarışma veya etkinlik dosyaları',
          'Otomatik temizleme ile güvenli belge teslimi',
        ],
      },
    ],
    relatedTitle: 'Daha fazlasını keşfedin:',
    linkFeatures: 'Tüm Paylaşım Özellikleri →',
    linkPricing: 'Son Kullanma Tarihi ve Tek Kullanımlık Bağlantılar — Hangi Plan? →',
  },
  de: {
    eyebrow: 'Ablaufdatum setzen · Auto-Löschen · Einmalige Links',
    h1: 'Temporäre Dateifreigabe — Dateien, die nur so lange existieren, wie sie müssen',
    intro: 'Nicht alles muss für immer online sein. Legen Sie ein Ablaufdatum für Ihren Dateilink fest und er zerstört sich selbst. Nutzen Sie einen einmaligen Download-Link, und die Datei verschwindet im Moment des Downloads. Volle Kontrolle darüber, wie lange Ihre Dateien zugänglich sind.',
    cta: 'Temporäre Dateifreigabe erstellen',
    ctaSub: 'Kostenlos · Ablaufkontrollen auf allen Plänen · Einmalige Links ab Premium',
    expiryOptions: [
      { value: '24h', label: 'Auto bei anonymen Uploads' },
      { value: '7 Tage', label: 'Benutzerdefiniertes Ablaufdatum' },
      { value: '30 Tage', label: 'Benutzerdefiniertes Ablaufdatum' },
      { value: '1 Download', label: 'Einmaliger Link' },
    ],
    sections: [
      {
        h2: 'Warum temporäre Dateifreigabe wichtig ist',
        paragraphs: [
          'Permanente Dateilinks erzeugen permanente Risiken. Ein Vertrag, den Sie vor fünf Jahren an einen Kunden geschickt haben. Ein persönliches Foto, das für einen bestimmten Anlass geteilt wurde. Ein Software-Build, der durch eine neuere Version ersetzt wurde. Diese Dateien sollten nicht für immer zugänglich sein.',
          'Filesterr gibt Ihnen präzise Kontrolle: Legen Sie ein Ablaufdatum fest (Stunden, Tage oder ein bestimmtes Datum), oder verwenden Sie einen einmaligen Download-Link, der die Datei im Moment des Zugriffs dauerhaft löscht. Keine veralteten Links. Keine veralteten Dateien.',
        ],
        bullets: [
          'Anonyme Uploads laufen automatisch nach 24 Stunden ab',
          'Benutzerdefinierte Ablaufdaten: 1 Stunde, 24 Stunden, 7 Tage, 30 Tage oder ein bestimmtes Datum',
          'Einmalige Download-Links — Datei nach erstem Download dauerhaft gelöscht',
          'Manuelles Löschen: jeder Upload enthält einen privaten Löschlink',
          'Ablaufdatum für den Empfänger auf der Download-Seite sichtbar',
        ],
      },
      {
        h2: 'Einmalige Download-Links: einmal teilen, dann ist es weg',
        paragraphs: [
          'Ein einmaliger Download-Link ist genau das, wonach er klingt: Die Datei kann genau einmal heruntergeladen werden. Danach gibt der Link einen 404-Fehler zurück und die Datei wird dauerhaft von unseren Servern gelöscht.',
          'Dies ist ideal für die Zustellung vertraulicher Dokumente, Software-Lizenzschlüssel, zeitkritische Zugangsdaten oder jede Situation, in der Sie sicherstellen müssen, dass nur eine Person die Datei erhalten hat — und dass sie nicht weiterverteilt werden kann.',
        ],
        bullets: [
          'Datei nach erstem Download dauerhaft gelöscht — null Aufbewahrung',
          'Empfänger kann den Link nicht teilen und ihn ein zweites Mal nutzen',
          'Perfekt für Lizenzen, Zugangsdaten und vertrauliche Dokumente',
          'Kombinieren Sie es mit Passwortschutz für maximale Sicherheit',
          'Verfügbar auf Premium- und Pro-Plänen',
        ],
      },
      {
        h2: 'Temporäre Dateifreigabe für spezifische Anwendungsfälle',
        paragraphs: [
          'Zeitlich begrenzte Dateifreigaben lösen reale Probleme: Sie möchten, dass Ihr Kunde eine Lieferung zwei Wochen nach Projektabschluss herunterladen kann, danach hört der Link auf zu funktionieren. Sie verteilen einen Beta-Build für 48 Stunden an Tester. Sie teilen ein persönliches Dokument, das nur für die nächsten 24 Stunden verfügbar sein soll.',
          'Filesterr erledigt all das mit einem einzigen Schalter beim Upload. Kein Code, kein API-Aufruf, keine manuelle Bereinigung.',
        ],
        bullets: [
          'Kundenlieferungen mit einem definierten Zugriffsfenster',
          'Beta-Builds und Testdateien mit kurzer Lebensdauer',
          'Persönliche oder sensible Dokumente vorübergehend geteilt',
          'Wettbewerbs- oder Veranstaltungsdateien, die nach der Veranstaltung ablaufen',
          'Sichere Dokumentenzustellung mit automatischer Bereinigung',
        ],
      },
    ],
    relatedTitle: 'Mehr entdecken:',
    linkFeatures: 'Alle Freigabefunktionen →',
    linkPricing: 'Ablaufdatum & Einmalige Links — Welcher Plan? →',
  },
  fr: {
    eyebrow: 'Définir l\'expiration · Suppression auto · Liens uniques',
    h1: 'Partage temporaire de fichiers — Des fichiers qui n\'existent qu\'aussi longtemps que nécessaire',
    intro: 'Tout ne doit pas vivre éternellement en ligne. Définissez une date d\'expiration sur votre lien et il s\'auto-détruit. Utilisez un lien de téléchargement unique et le fichier disparaît au moment du téléchargement. Contrôle total sur la durée d\'accessibilité de vos fichiers.',
    cta: 'Créer un partage temporaire',
    ctaSub: 'Gratuit · Contrôles d\'expiration sur tous les plans · Liens uniques à partir de Premium',
    expiryOptions: [
      { value: '24h', label: 'Auto sur uploads anonymes' },
      { value: '7 jours', label: 'Expiration personnalisée' },
      { value: '30 jours', label: 'Expiration personnalisée' },
      { value: '1 téléchargement', label: 'Lien unique' },
    ],
    sections: [
      {
        h2: 'Pourquoi le partage temporaire de fichiers est important',
        paragraphs: [
          'Les liens de fichiers permanents créent des risques permanents. Un contrat envoyé à un client il y a cinq ans. Une photo personnelle partagée pour une occasion précise. Une version logicielle remplacée par une version plus récente. Ces fichiers ne devraient pas rester accessibles indéfiniment.',
          'Filesterr vous offre un contrôle précis : définissez une date d\'expiration (heures, jours ou une date spécifique), ou utilisez un lien de téléchargement unique qui supprime définitivement le fichier dès qu\'il est consulté. Aucun lien qui traîne. Aucun fichier obsolète.',
        ],
        bullets: [
          'Les uploads anonymes expirent automatiquement en 24 heures',
          'Définissez des dates d\'expiration personnalisées : 1 heure, 24 heures, 7 jours, 30 jours ou une date spécifique',
          'Liens de téléchargement uniques — fichier supprimé définitivement après le premier téléchargement',
          'Suppression manuelle : chaque upload inclut un lien de suppression privé',
          'La date d\'expiration est visible par le destinataire sur la page de téléchargement',
        ],
      },
      {
        h2: 'Liens de téléchargement uniques : partagez une fois, puis c\'est terminé',
        paragraphs: [
          'Un lien de téléchargement unique est exactement ce que son nom indique : le fichier ne peut être téléchargé qu\'une seule fois. Ensuite, le lien renvoie une erreur 404 et le fichier est supprimé définitivement de nos serveurs.',
          'C\'est idéal pour la livraison de documents confidentiels, les clés de licence logicielle, les identifiants sensibles au temps, ou toute situation où vous avez besoin de la certitude qu\'une seule personne a obtenu le fichier — et qu\'il ne peut pas être repartagé.',
        ],
        bullets: [
          'Fichier supprimé définitivement après le premier téléchargement — zéro rétention',
          'Le destinataire ne peut pas partager le lien et l\'utiliser une deuxième fois',
          'Parfait pour les licences, identifiants et documents confidentiels',
          'Combinez avec la protection par mot de passe pour une sécurité maximale',
          'Disponible sur les plans Premium et Pro',
        ],
      },
      {
        h2: 'Partage temporaire de fichiers pour des cas d\'usage spécifiques',
        paragraphs: [
          'Les partages de fichiers à durée limitée résolvent de vrais problèmes : vous souhaitez que votre client puisse télécharger un livrable pendant deux semaines après la fin du projet, puis le lien cesse de fonctionner. Vous distribuez une version bêta à des testeurs pendant 48 heures. Vous partagez un document personnel qui ne doit être disponible que pour les 24 prochaines heures.',
          'Filesterr gère tout cela avec un simple bouton lors de l\'upload. Aucun code, aucun appel API, aucun nettoyage manuel.',
        ],
        bullets: [
          'Livrables clients avec une fenêtre d\'accès définie',
          'Versions bêta et fichiers de test à courte durée de vie',
          'Documents personnels ou sensibles partagés temporairement',
          'Fichiers de concours ou d\'événements qui expirent après l\'événement',
          'Livraison sécurisée de documents avec nettoyage automatique',
        ],
      },
    ],
    relatedTitle: 'Explorer davantage :',
    linkFeatures: 'Toutes les fonctionnalités de partage →',
    linkPricing: 'Expiration & Liens uniques — Quel plan ? →',
  },
  es: {
    eyebrow: 'Establecer expiración · Auto-eliminar · Links únicos',
    h1: 'Compartir Archivos Temporalmente — Archivos que Existen Solo el Tiempo Necesario',
    intro: 'No todo debería vivir para siempre online. Establece una fecha de expiración en tu enlace y se autodestruye. Usa un link de descarga único y el archivo desaparece en el momento de la descarga. Control total sobre cuánto tiempo son accesibles tus archivos.',
    cta: 'Crear un compartir temporal',
    ctaSub: 'Gratis · Controles de expiración en todos los planes · Links únicos en Premium y superior',
    expiryOptions: [
      { value: '24h', label: 'Auto en subidas anónimas' },
      { value: '7 días', label: 'Expiración personalizada' },
      { value: '30 días', label: 'Expiración personalizada' },
      { value: '1 descarga', label: 'Link único' },
    ],
    sections: [
      {
        h2: 'Por qué importa compartir archivos temporalmente',
        paragraphs: [
          'Los enlaces permanentes crean riesgos permanentes. Un contrato que enviaste a un cliente hace cinco años. Una foto personal compartida para una ocasión específica. Una versión de software reemplazada por una más nueva. Estos archivos no deberían ser accesibles para siempre.',
          'Filesterr te da control preciso: establece una fecha de expiración (horas, días o una fecha específica), o usa un link de descarga único que elimina permanentemente el archivo en el momento en que se accede. Sin enlaces que se queden flotando. Sin archivos obsoletos.',
        ],
        bullets: [
          'Las subidas anónimas expiran automáticamente en 24 horas',
          'Establece fechas de expiración personalizadas: 1 hora, 24 horas, 7 días, 30 días o una fecha específica',
          'Links únicos de descarga — archivo eliminado permanentemente tras la primera descarga',
          'Eliminación manual: cada subida incluye un enlace privado de eliminación',
          'La fecha de expiración es visible para el destinatario en la página de descarga',
        ],
      },
      {
        h2: 'Links únicos de descarga: comparte una vez, luego desaparece',
        paragraphs: [
          'Un link de descarga único es exactamente lo que suena: el archivo puede descargarse exactamente una vez. Después de eso, el enlace devuelve un 404 y el archivo se elimina permanentemente de nuestros servidores.',
          'Esto es ideal para la entrega de documentos confidenciales, claves de licencia de software, credenciales sensibles al tiempo, o cualquier situación donde necesites la certeza de que solo una persona obtuvo el archivo — y que no puede ser recompartido.',
        ],
        bullets: [
          'Archivo eliminado permanentemente tras la primera descarga — cero retención',
          'El destinatario no puede compartir el link y que funcione una segunda vez',
          'Perfecto para licencias, credenciales y documentos confidenciales',
          'Combínalo con protección por contraseña para máxima seguridad',
          'Disponible en los planes Premium y Pro',
        ],
      },
      {
        h2: 'Compartir archivos temporalmente para casos de uso específicos',
        paragraphs: [
          'Los compartires de archivos con tiempo limitado resuelven problemas reales: quieres que tu cliente pueda descargar un entregable durante dos semanas después de completar el proyecto, luego el enlace deja de funcionar. Estás distribuyendo una versión beta a testers durante 48 horas. Estás compartiendo un documento personal que solo debería estar disponible durante las próximas 24 horas.',
          'Filesterr maneja todo esto con un solo interruptor al subir. Sin código, sin llamada a la API, sin limpieza manual.',
        ],
        bullets: [
          'Entregables para clientes con una ventana de acceso definida',
          'Versiones beta y archivos de prueba con corta vida útil',
          'Documentos personales o sensibles compartidos temporalmente',
          'Archivos de concursos o eventos que expiran tras el evento',
          'Entrega segura de documentos con limpieza automática',
        ],
      },
    ],
    relatedTitle: 'Explorar más:',
    linkFeatures: 'Todas las funciones de compartir →',
    linkPricing: 'Expiración y Links únicos — ¿Qué plan? →',
  },
  ar: {
    eyebrow: 'تحديد انتهاء الصلاحية · حذف تلقائي · روابط لمرة واحدة',
    h1: 'المشاركة المؤقتة للملفات — ملفات تتواجد فقط طالما احتاجت',
    intro: 'ليس كل شيء يجب أن يعيش إلى الأبد عبر الإنترنت. حدد تاريخ انتهاء صلاحية رابط ملفك وسيدمر نفسه. استخدم رابط تنزيل لمرة واحدة ويختفي الملف في لحظة تنزيله. تحكم كامل في مدة إمكانية الوصول إلى ملفاتك.',
    cta: 'إنشاء مشاركة مؤقتة للملف',
    ctaSub: 'مجاني · عناصر تحكم الانتهاء في جميع الخطط · روابط لمرة واحدة في Premium وما فوق',
    expiryOptions: [
      { value: '24 ساعة', label: 'تلقائي للرفع المجهول' },
      { value: '7 أيام', label: 'انتهاء مخصص' },
      { value: '30 يوماً', label: 'انتهاء مخصص' },
      { value: '1 تنزيل', label: 'رابط لمرة واحدة' },
    ],
    sections: [
      {
        h2: 'لماذا تهم مشاركة الملفات المؤقتة',
        paragraphs: [
          'روابط الملفات الدائمة تخلق مخاطر دائمة. عقد أرسلته إلى عميل منذ خمس سنوات. صورة شخصية شاركتها لمناسبة محددة. إصدار برنامج تم استبداله بإصدار أحدث. هذه الملفات لا ينبغي أن تكون متاحة إلى الأبد.',
          'يمنحك Filesterr تحكماً دقيقاً: حدد تاريخ انتهاء الصلاحية (ساعات أو أيام أو تاريخ محدد)، أو استخدم رابط تنزيل لمرة واحدة يحذف الملف نهائياً في اللحظة التي يُتاح فيها. لا روابط معلقة. لا ملفات قديمة.',
        ],
        bullets: [
          'تنتهي صلاحية الرفع المجهول تلقائياً خلال 24 ساعة',
          'حدد تواريخ انتهاء مخصصة: ساعة واحدة، 24 ساعة، 7 أيام، 30 يوماً أو تاريخ محدد',
          'روابط تنزيل لمرة واحدة — حذف دائم للملف بعد أول تنزيل',
          'الحذف اليدوي: كل رفع يتضمن رابط حذف خاص',
          'تاريخ انتهاء الصلاحية مرئي للمستلم في صفحة التنزيل',
        ],
      },
      {
        h2: 'روابط التنزيل لمرة واحدة: شارك مرة، ثم يختفي',
        paragraphs: [
          'رابط التنزيل لمرة واحدة هو بالضبط ما يوحي به اسمه: يمكن تنزيل الملف مرة واحدة فقط. بعد ذلك يعيد الرابط خطأ 404 ويُحذف الملف نهائياً من خوادمنا.',
          'هذا مثالي لتسليم المستندات السرية، ومفاتيح ترخيص البرامج، وبيانات الاعتماد الحساسة للوقت، أو أي موقف تحتاج فيه إلى التأكد من أن شخصاً واحداً فقط حصل على الملف — وأنه لا يمكن إعادة مشاركته.',
        ],
        bullets: [
          'الملف محذوف نهائياً بعد أول تنزيل — صفر احتفاظ',
          'لا يمكن للمستلم مشاركة الرابط وجعله يعمل مرة ثانية',
          'مثالي للتراخيص وبيانات الاعتماد والمستندات السرية',
          'ادمجه مع حماية بكلمة مرور لأقصى قدر من الأمان',
          'متاح في خطتي Premium و Pro',
        ],
      },
      {
        h2: 'مشاركة الملفات المؤقتة لحالات استخدام محددة',
        paragraphs: [
          'مشاركات الملفات المحدودة بالوقت تحل مشاكل حقيقية: تريد أن يتمكن عميلك من تنزيل تسليم ما لمدة أسبوعين بعد اكتمال المشروع، ثم يتوقف الرابط عن العمل. أنت توزع إصداراً تجريبياً على المختبرين لمدة 48 ساعة. أنت تشارك وثيقة شخصية يجب أن تكون متاحة فقط خلال الـ 24 ساعة القادمة.',
          'يتعامل Filesterr مع كل هذه الحالات بزر واحد عند الرفع. لا كود، لا استدعاء API، لا تنظيف يدوي.',
        ],
        bullets: [
          'تسليمات العملاء مع نافذة وصول محددة',
          'الإصدارات التجريبية وملفات الاختبار ذات العمر القصير',
          'المستندات الشخصية أو الحساسة المشاركة مؤقتاً',
          'ملفات المسابقات أو الفعاليات التي تنتهي صلاحيتها بعد الفعالية',
          'تسليم آمن للمستندات مع تنظيف تلقائي',
        ],
      },
    ],
    relatedTitle: 'استكشف المزيد:',
    linkFeatures: 'كل ميزات المشاركة →',
    linkPricing: 'انتهاء الصلاحية والروابط لمرة واحدة — أي خطة؟ →',
  },
  zh: {
    eyebrow: '设置过期 · 自动删除 · 一次性链接',
    h1: '临时文件共享 — 仅在需要时存在的文件',
    intro: '不是所有内容都需要永远在线。为文件链接设置过期日期，它会自我销毁。使用一次性下载链接，文件下载后即消失。完全掌控您的文件可访问的时长。',
    cta: '创建临时文件共享',
    ctaSub: '免费 · 所有方案均有过期控制 · Premium 及以上方案支持一次性链接',
    expiryOptions: [
      { value: '24小时', label: '匿名上传自动' },
      { value: '7天', label: '自定义过期' },
      { value: '30天', label: '自定义过期' },
      { value: '1次下载', label: '一次性链接' },
    ],
    sections: [
      {
        h2: '为什么临时文件共享很重要',
        paragraphs: [
          '永久文件链接会产生永久风险。五年前发给客户的合同。为特定场合分享的个人照片。已被更新版本取代的软件构建。这些文件不应该永远可访问。',
          'Filesterr 为您提供精确控制：设置过期日期（小时、天数或特定日期），或使用一次性下载链接，在被访问的瞬间永久删除文件。没有残留链接。没有过时文件。',
        ],
        bullets: [
          '匿名上传在24小时后自动过期',
          '设置自定义过期日期：1小时、24小时、7天、30天或特定日期',
          '一次性下载链接 — 首次下载后文件永久删除',
          '手动删除：每次上传包含私密删除链接',
          '过期日期在下载页面对接收方可见',
        ],
      },
      {
        h2: '一次性下载链接：分享一次，然后消失',
        paragraphs: [
          '一次性下载链接名副其实：文件只能被下载一次。此后，链接返回404错误，文件从我们的服务器上永久删除。',
          '这非常适合机密文件交付、软件许可证密钥、时效性凭据，或任何您需要确认只有一个人获得了文件的情况——并且该文件无法被再次分享。',
        ],
        bullets: [
          '首次下载后文件永久删除 — 零保留',
          '接收方无法分享链接并让其第二次生效',
          '非常适合许可证、凭据和机密文档',
          '与密码保护结合以实现最高安全性',
          '在 Premium 和 Pro 方案中可用',
        ],
      },
      {
        h2: '针对特定使用场景的临时文件共享',
        paragraphs: [
          '限时文件共享解决真实问题：您希望客户能在项目完成后两周内下载交付物，之后链接停止工作。您正在向测试人员分发48小时的测试版构建。您正在分享一份只应在未来24小时内可用的个人文档。',
          'Filesterr 在上传时通过单个开关处理所有这些情况。无需代码，无需 API 调用，无需手动清理。',
        ],
        bullets: [
          '具有明确访问窗口的客户交付物',
          '具有短暂生命周期的测试版构建和测试文件',
          '临时分享的个人或敏感文档',
          '活动结束后过期的竞赛或活动文件',
          '具有自动清理的安全文档交付',
        ],
      },
    ],
    relatedTitle: '了解更多：',
    linkFeatures: '所有共享功能 →',
    linkPricing: '过期与一次性链接 — 哪个方案？ →',
  },
  pt: {
    eyebrow: 'Definir expiração · Exclusão automática · Links únicos',
    h1: 'Compartilhamento Temporário de Arquivos — Arquivos que Existem Só o Tempo Necessário',
    intro: 'Nem tudo precisa ficar online para sempre. Defina uma data de expiração no link do arquivo e ele se auto-destrói. Use um link de download único e o arquivo desaparece no momento em que é baixado. Controle total sobre por quanto tempo seus arquivos ficam acessíveis.',
    cta: 'Criar compartilhamento temporário',
    ctaSub: 'Grátis · Controles de expiração em todos os planos · Links únicos no Premium e superior',
    expiryOptions: [
      { value: '24h', label: 'Auto em uploads anônimos' },
      { value: '7 dias', label: 'Expiração personalizada' },
      { value: '30 dias', label: 'Expiração personalizada' },
      { value: '1 download', label: 'Link único' },
    ],
    sections: [
      {
        h2: 'Por que o compartilhamento temporário de arquivos importa',
        paragraphs: [
          'Links permanentes criam riscos permanentes. Um contrato que você enviou a um cliente há cinco anos. Uma foto pessoal compartilhada para uma ocasião específica. Uma versão de software substituída por uma versão mais nova. Esses arquivos não deveriam ser acessíveis para sempre.',
          'O Filesterr oferece controle preciso: defina uma data de expiração (horas, dias ou uma data específica), ou use um link de download único que exclui permanentemente o arquivo no momento em que é acessado. Sem links persistentes. Sem arquivos desatualizados.',
        ],
        bullets: [
          'Uploads anônimos expiram automaticamente em 24 horas',
          'Defina datas de expiração personalizadas: 1 hora, 24 horas, 7 dias, 30 dias ou uma data específica',
          'Links de download únicos — arquivo excluído permanentemente após o primeiro download',
          'Exclusão manual: cada upload inclui um link privado de exclusão',
          'Data de expiração visível para o destinatário na página de download',
        ],
      },
      {
        h2: 'Links de download únicos: compartilhe uma vez, depois some',
        paragraphs: [
          'Um link de download único é exatamente o que parece: o arquivo pode ser baixado exatamente uma vez. Depois disso, o link retorna um 404 e o arquivo é excluído permanentemente dos nossos servidores.',
          'Isso é ideal para entrega de documentos confidenciais, chaves de licença de software, credenciais com prazo de validade, ou qualquer situação em que você precise ter certeza de que apenas uma pessoa recebeu o arquivo — e que ele não pode ser redistribuído.',
        ],
        bullets: [
          'Arquivo excluído permanentemente após o primeiro download — retenção zero',
          'O destinatário não pode compartilhar o link e fazê-lo funcionar uma segunda vez',
          'Perfeito para licenças, credenciais e documentos confidenciais',
          'Combine com proteção por senha para máxima segurança',
          'Disponível nos planos Premium e Pro',
        ],
      },
      {
        h2: 'Compartilhamento temporário de arquivos para casos de uso específicos',
        paragraphs: [
          'Compartilhamentos de arquivos com prazo resolvem problemas reais: você quer que seu cliente consiga baixar uma entrega por duas semanas após a conclusão do projeto, depois o link para de funcionar. Você está distribuindo uma versão beta para testadores por 48 horas. Você está compartilhando um documento pessoal que só deve estar disponível pelas próximas 24 horas.',
          'O Filesterr resolve tudo isso com um único botão no momento do upload. Sem código, sem chamada de API, sem limpeza manual.',
        ],
        bullets: [
          'Entregas para clientes com uma janela de acesso definida',
          'Versões beta e arquivos de teste com vida útil curta',
          'Documentos pessoais ou sensíveis compartilhados temporariamente',
          'Arquivos de concursos ou eventos que expiram após o evento',
          'Entrega segura de documentos com limpeza automática',
        ],
      },
    ],
    relatedTitle: 'Explorar mais:',
    linkFeatures: 'Todos os recursos de compartilhamento →',
    linkPricing: 'Expiração e Links únicos — Qual plano? →',
  },
  ja: {
    eyebrow: '有効期限設定 · 自動削除 · ワンタイムリンク',
    h1: '一時的なファイル共有 — 必要な間だけ存在するファイル',
    intro: 'すべてがオンラインで永遠に存在する必要はありません。ファイルリンクに有効期限を設定すると、自動で削除されます。ワンタイムダウンロードリンクを使用すると、ダウンロードされた瞬間にファイルが消えます。ファイルにアクセスできる期間を完全にコントロールできます。',
    cta: '一時的なファイル共有を作成',
    ctaSub: '無料 · 全プランで有効期限制御 · ワンタイムリンクはPremium以上',
    expiryOptions: [
      { value: '24時間', label: '匿名アップロードで自動' },
      { value: '7日間', label: 'カスタム期限' },
      { value: '30日間', label: 'カスタム期限' },
      { value: '1回のDL', label: 'ワンタイムリンク' },
    ],
    sections: [
      {
        h2: '一時的なファイル共有がなぜ重要か',
        paragraphs: [
          '永続的なファイルリンクは永続的なリスクをもたらします。5年前にクライアントに送った契約書。特定の機会のために共有した個人的な写真。新しいバージョンに置き換えられたソフトウェアのビルド。これらのファイルは永久にアクセス可能である必要はありません。',
          'Filesterrは正確な制御を提供します。有効期限（時間、日数、または特定の日付）を設定するか、アクセスされた瞬間にファイルを完全に削除するワンタイムダウンロードリンクをご利用ください。残留リンクはありません。古いファイルもありません。',
        ],
        bullets: [
          '匿名アップロードは24時間後に自動的に期限切れになります',
          'カスタム有効期限を設定：1時間、24時間、7日間、30日間、または特定の日付',
          'ワンタイムダウンロードリンク — 初回ダウンロード後にファイルを永久削除',
          '手動削除：すべてのアップロードにプライベート削除リンクが付属',
          '有効期限はダウンロードページで受信者に表示されます',
        ],
      },
      {
        h2: 'ワンタイムダウンロードリンク：一度共有したら消える',
        paragraphs: [
          'ワンタイムダウンロードリンクはその名の通りです。ファイルはちょうど一度だけダウンロードできます。その後、リンクは404を返し、ファイルはサーバーから永久に削除されます。',
          'これは機密文書の配信、ソフトウェアライセンスキー、時間的制約のある認証情報、またはファイルを取得した人物が一人だけであることを確認する必要があるあらゆる状況に最適です。そして再共有できないことが保証されます。',
        ],
        bullets: [
          '初回ダウンロード後にファイルを永久削除 — ゼロ保存',
          '受信者がリンクを共有しても2回目は機能しません',
          'ライセンス、認証情報、機密文書に最適',
          '最大のセキュリティのためにパスワード保護と組み合わせ可能',
          'PremiumプランとProプランで利用可能',
        ],
      },
      {
        h2: '特定のユースケースのための一時的なファイル共有',
        paragraphs: [
          '期限付きファイル共有は現実の問題を解決します。プロジェクト完了後2週間はクライアントが成果物をダウンロードできるようにしたいが、その後はリンクを機能停止させたい。48時間テスターにベータビルドを配布している。次の24時間だけ利用可能であるべき個人文書を共有している。',
          'Filesterrはアップロード時の単一のトグルでこれらすべてに対応します。コードも、API呼び出しも、手動のクリーンアップも不要です。',
        ],
        bullets: [
          '定義されたアクセスウィンドウを持つクライアント成果物',
          '短い有効期間のベータビルドとテストファイル',
          '一時的に共有される個人または機密文書',
          'イベント後に期限切れになるコンテストやイベントのファイル',
          '自動クリーンアップによる安全な文書配信',
        ],
      },
    ],
    relatedTitle: 'さらに詳しく:',
    linkFeatures: 'すべての共有機能 →',
    linkPricing: '有効期限とワンタイムリンク — どのプラン？ →',
  },
  ru: {
    eyebrow: 'Установить срок действия · Автоудаление · Одноразовые ссылки',
    h1: 'Временный обмен файлами — файлы, которые существуют ровно столько, сколько нужно',
    intro: 'Не всему нужно жить в сети вечно. Установите дату истечения срока действия для ссылки на файл, и она самоуничтожится. Используйте одноразовую ссылку для скачивания — файл исчезнет в момент загрузки. Полный контроль над тем, как долго ваши файлы остаются доступными.',
    cta: 'Создать временный обмен файлом',
    ctaSub: 'Бесплатно · Контроль срока на всех планах · Одноразовые ссылки на Premium и выше',
    expiryOptions: [
      { value: '24ч', label: 'Авто для анонимных загрузок' },
      { value: '7 дней', label: 'Пользовательский срок' },
      { value: '30 дней', label: 'Пользовательский срок' },
      { value: '1 загрузка', label: 'Одноразовая ссылка' },
    ],
    sections: [
      {
        h2: 'Почему временный обмен файлами важен',
        paragraphs: [
          'Постоянные ссылки на файлы создают постоянные риски. Договор, отправленный клиенту пять лет назад. Личная фотография, размещённая для конкретного случая. Сборка программы, которую заменила более новая версия. Эти файлы не должны быть доступны вечно.',
          'Filesterr даёт вам точный контроль: установите срок действия (часы, дни или конкретную дату) или используйте одноразовую ссылку для скачивания, которая навсегда удаляет файл в момент обращения к нему. Никаких зависших ссылок. Никаких устаревших файлов.',
        ],
        bullets: [
          'Анонимные загрузки автоматически истекают через 24 часа',
          'Устанавливайте произвольные сроки: 1 час, 24 часа, 7 дней, 30 дней или конкретная дата',
          'Одноразовые ссылки для скачивания — файл навсегда удаляется после первой загрузки',
          'Ручное удаление: каждая загрузка включает приватную ссылку для удаления',
          'Срок действия виден получателю на странице скачивания',
        ],
      },
      {
        h2: 'Одноразовые ссылки: поделитесь один раз — и файл исчезнет',
        paragraphs: [
          'Одноразовая ссылка для скачивания — именно то, что следует из названия: файл можно скачать ровно один раз. После этого ссылка возвращает 404, а файл навсегда удаляется с наших серверов.',
          'Это идеально подходит для доставки конфиденциальных документов, ключей лицензий программного обеспечения, срочных учётных данных или любой ситуации, когда вам нужна уверенность, что файл получил только один человек — и что его невозможно переслать.',
        ],
        bullets: [
          'Файл навсегда удаляется после первой загрузки — нулевое хранение',
          'Получатель не может передать ссылку так, чтобы она сработала второй раз',
          'Идеально для лицензий, учётных данных и конфиденциальных документов',
          'Сочетайте с защитой паролем для максимальной безопасности',
          'Доступно на планах Premium и Pro',
        ],
      },
      {
        h2: 'Временный обмен файлами для конкретных сценариев',
        paragraphs: [
          'Ограниченные по времени ссылки решают реальные задачи: вы хотите, чтобы клиент мог скачать результат работы в течение двух недель после завершения проекта, а затем ссылка переставала работать. Вы распространяете бета-сборку среди тестировщиков на 48 часов. Вы делитесь личным документом, который должен быть доступен только ближайшие 24 часа.',
          'Filesterr справляется со всем этим с помощью одного переключателя при загрузке. Никакого кода, никаких вызовов API, никакой ручной очистки.',
        ],
        bullets: [
          'Клиентские результаты с заданным окном доступа',
          'Бета-сборки и тестовые файлы с коротким сроком жизни',
          'Личные или конфиденциальные документы, переданные на время',
          'Файлы конкурсов или мероприятий, срок которых истекает после события',
          'Безопасная доставка документов с автоматической очисткой',
        ],
      },
    ],
    relatedTitle: 'Узнать больше:',
    linkFeatures: 'Все функции обмена →',
    linkPricing: 'Срок действия и одноразовые ссылки — какой план? →',
  },
}

const c = computed(() => content[locale.value] || content.en)

const metaContent = {
  en: { title: 'Temporary File Sharing — Expiry Dates & One-Time Download Links | Filesterr', description: 'Share files that auto-delete. Set expiry dates or use one-time download links that permanently delete files after download. Free, no account required.' },
  tr: { title: 'Geçici Dosya Paylaşımı — Son Kullanma Tarihleri ve Tek Kullanımlık Bağlantılar | Filesterr', description: 'Otomatik olarak silinen dosyaları paylaşın. Son kullanma tarihleri belirleyin veya indirmeden sonra kalıcı olarak silinen tek kullanımlık bağlantılar kullanın.' },
  de: { title: 'Temporäre Dateifreigabe — Ablaufdaten & einmalige Download-Links | Filesterr', description: 'Dateien teilen, die sich automatisch löschen. Ablaufdaten setzen oder einmalige Links nutzen, die Dateien nach dem Download permanent löschen.' },
  fr: { title: 'Partage temporaire de fichiers — Dates d\'expiration & liens uniques | Filesterr', description: 'Partagez des fichiers qui s\'auto-suppriment. Définissez des dates d\'expiration ou utilisez des liens uniques qui suppriment définitivement les fichiers après téléchargement.' },
  es: { title: 'Compartir archivos temporalmente — Fechas de expiración y links únicos | Filesterr', description: 'Comparte archivos que se auto-eliminan. Establece fechas de expiración o usa links únicos que eliminan permanentemente los archivos tras la descarga.' },
  ar: { title: 'مشاركة الملفات المؤقتة — تواريخ الانتهاء وروابط التنزيل الفردية | Filesterr', description: 'شارك الملفات التي تحذف نفسها تلقائياً. حدد تواريخ الانتهاء أو استخدم روابط لمرة واحدة تحذف الملفات بعد التنزيل.' },
  zh: { title: '临时文件共享 — 过期日期和一次性下载链接 | Filesterr', description: '共享会自动删除的文件。设置过期日期或使用下载后永久删除文件的一次性链接。免费，无需账户。' },
  pt: { title: 'Compartilhamento Temporário de Arquivos — Datas de Expiração e Links Únicos | Filesterr', description: 'Compartilhe arquivos que se auto-excluem. Defina datas de expiração ou use links únicos que excluem permanentemente os arquivos após o download.' },
  ja: { title: '一時的なファイル共有 — 有効期限とワンタイムダウンロードリンク | Filesterr', description: '自動削除されるファイルを共有。有効期限を設定するか、ダウンロード後にファイルを永久削除するワンタイムリンクを使用。無料、アカウント不要。' },
  ru: { title: 'Временный обмен файлами — сроки действия и одноразовые ссылки | Filesterr', description: 'Делитесь файлами, которые автоудаляются. Устанавливайте сроки действия или используйте одноразовые ссылки, которые удаляют файлы после скачивания.' },
}

const meta = computed(() => metaContent[locale.value] || metaContent.en)
const canonicalLocale = computed(() => locale.value && locale.value !== 'en' ? `/${locale.value}/temporary-file-sharing` : '/temporary-file-sharing')

useHead({
  title: computed(() => meta.value.title),
  meta: [
    { name: 'description', content: computed(() => meta.value.description) },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: computed(() => `https://filesterr.com${canonicalLocale.value}`) }],
})
</script>
