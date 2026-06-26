<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">
    <div class="bg-gradient-to-b from-brand-50/40 to-transparent dark:from-brand-950/20 dark:to-transparent pt-20 pb-12">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/25 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-6">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
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

      <!-- No-friction callout -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div v-for="step in c.noFriction" :key="step.label" class="text-center p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
          <div class="text-3xl mb-2">{{ step.emoji }}</div>
          <p class="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{{ step.label }}</p>
          <p class="text-xs text-zinc-500 mt-1">{{ step.sub }}</p>
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
    eyebrow: 'No signup wall · No email required',
    h1: 'File Sharing Without Login — Just Drop, Share, Done',
    intro: 'Every file sharing site that demands an account before you can share a file is stealing your time. Filesterr doesn\'t. Drop a file, get a link, share it. Zero registration required.',
    cta: 'Upload a File Free — No Signup',
    ctaSub: 'Anonymous · No email · No password · 1GB free',
    noFriction: [
      { emoji: '📁', label: 'Drop your file', sub: 'Any file type, up to 1GB' },
      { emoji: '🔗', label: 'Get your link', sub: 'Instantly, no waiting' },
      { emoji: '📤', label: 'Share anywhere', sub: 'Works for any recipient' },
    ],
    sections: [
      {
        h2: 'Why file sharing sites with no registration actually matter',
        paragraphs: [
          'Every time a file sharing site forces you to create an account, three things happen: you spend 2-3 minutes on a form, you give away your email to a mailing list, and the person receiving the file might also have to create an account before downloading.',
          'None of that should be required to move a file from one place to another. Filesterr believes in zero-friction sharing. You have a file. Someone needs it. The tool should stay out of the way.',
        ],
        bullets: [
          'No signup for sender — upload anonymously from the homepage',
          'No signup for recipient — download link works in any browser',
          'No email required, no spam, no mailing list',
          'No app to install on either end',
          'Anonymous uploads get 1GB free — enough for most use cases',
        ],
      },
      {
        h2: 'What you actually get without creating an account',
        paragraphs: [
          'Anonymous uploads on Filesterr aren\'t a crippled free tier. You get: instant link generation, 1GB per upload, any file type supported, a private delete link included with every upload, and a clean download page for your recipient.',
          'The only thing you give up vs. a registered account is storage persistence (anonymous files expire after 24 hours) and analytics. If you share a lot, a free registered account gets you 10GB and basic analytics — still no credit card.',
        ],
        bullets: [
          '1GB per upload, completely free',
          'Any file type — no restrictions on format',
          'Instant CDN delivery for your recipient',
          'Delete link included — remove the file anytime',
          'Files expire after 24 hours (create a free account to keep them longer)',
        ],
      },
      {
        h2: 'The best free file sharing site no registration: what to look for',
        paragraphs: [
          'Most "no registration" file sites compensate by showing your recipient a 30-60 second ad countdown before the download starts. Filesterr shows a short countdown on free/anonymous uploads, but it\'s brief — and on Premium it\'s gone entirely.',
          'No site that makes your recipients wait 60 seconds through ads is really "friction free." Filesterr keeps it honest: a short countdown on the free tier, zero on paid, and the option to upgrade for your most important shares.',
        ],
      },
    ],
    relatedTitle: 'Learn more:',
    linkFeatures: 'Full Feature Overview →',
    linkPricing: 'Free vs. Paid — What\'s the Difference →',
  },
  tr: {
    eyebrow: 'Kayıt duvarı yok · E-posta gerekmez',
    h1: 'Giriş Yapmadan Dosya Paylaşımı — Sadece Bırak, Paylaş, Bitti',
    intro: 'Her dosya paylaşmadan önce hesap isteyen site zamanınızı çalıyor. Filesterr yapmıyor. Dosyayı bırakın, bağlantıyı alın, paylaşın.',
    cta: 'Ücretsiz Dosya Yükle — Kayıt Yok',
    ctaSub: 'Anonim · E-posta yok · Şifre yok · 1 GB ücretsiz',
    noFriction: [
      { emoji: '📁', label: 'Dosyanızı bırakın', sub: '1 GB\'a kadar her türlü dosya' },
      { emoji: '🔗', label: 'Bağlantınızı alın', sub: 'Anında, bekleme yok' },
      { emoji: '📤', label: 'Her yerden paylaşın', sub: 'Her alıcı için çalışır' },
    ],
    sections: [
      {
        h2: 'Kayıtsız dosya paylaşım siteleri neden gerçekten önemli',
        paragraphs: [
          'Her dosya paylaşım sitesi hesap oluşturmaya zorladığında üç şey olur: bir forma 2-3 dakika harcarsınız, e-postanızı bir posta listesine verirsiniz ve dosyayı alan kişinin de indirmeden önce hesap oluşturması gerekebilir.',
          'Bir dosyayı bir yerden başka bir yere taşımak için bunların hiçbiri gerekli olmamalı. Filesterr sıfır sürtünmeli paylaşıma inanır. Bir dosyanız var. Birisinin ihtiyacı var. Araç yolunuzun dışında durmalı.',
        ],
        bullets: [
          'Gönderici için kayıt yok — ana sayfadan anonim yükle',
          'Alıcı için kayıt yok — bağlantı her tarayıcıda çalışır',
          'E-posta gerekmez, spam yok, posta listesi yok',
          'Her iki tarafta da uygulama kurulumu yok',
          'Anonim yüklemeler 1 GB ücretsiz — çoğu kullanım için yeterli',
        ],
      },
      {
        h2: 'Hesap oluşturmadan gerçekte ne elde edersiniz',
        paragraphs: [
          'Filesterr\'daki anonim yüklemeler kısıtlanmış bir ücretsiz katman değildir. Şunları elde edersiniz: anında bağlantı oluşturma, yükleme başına 1 GB, desteklenen her dosya türü, her yüklemeyle birlikte özel bir silme bağlantısı ve alıcınız için temiz bir indirme sayfası.',
          'Kayıtlı bir hesaba kıyasla yalnızca depolama kalıcılığından (anonim dosyalar 24 saat sonra sona erer) ve analitiğden vazgeçersiniz. Çok paylaşıyorsanız, ücretsiz kayıtlı hesap size 10 GB ve temel analitik sağlar — yine de kredi kartı gerekmez.',
        ],
        bullets: [
          'Yükleme başına 1 GB, tamamen ücretsiz',
          'Her dosya türü — format kısıtlaması yok',
          'Alıcınız için anında CDN teslimatı',
          'Silme bağlantısı dahil — dosyayı istediğiniz zaman kaldırın',
          'Dosyalar 24 saat sonra sona erer (daha uzun süre saklamak için ücretsiz hesap oluşturun)',
        ],
      },
      {
        h2: 'Kayıtsız en iyi ücretsiz dosya paylaşım sitesi: nelere bakmalı',
        paragraphs: [
          'Çoğu "kayıtsız" dosya sitesi, indirme başlamadan önce alıcınıza 30-60 saniyelik bir reklam geri sayımı göstererek bunu telafi eder. Filesterr, ücretsiz/anonim yüklemelerde kısa bir geri sayım gösterir, ancak bu kısadır — Premium\'da ise tamamen ortadan kalkar.',
          'Alıcılarınızı reklamlar arasında 60 saniye bekleten hiçbir site gerçekten "sürtünmesiz" değildir. Filesterr dürüst tutar: ücretsiz kademede kısa bir geri sayım, ücretli kademede sıfır ve en önemli paylaşımlarınız için yükseltme seçeneği.',
        ],
      },
    ],
    relatedTitle: 'Daha fazla öğren:',
    linkFeatures: 'Tüm Özelliklere Genel Bakış →',
    linkPricing: 'Ücretsiz vs. Ücretli — Fark Nedir →',
  },
  de: {
    eyebrow: 'Keine Anmeldung · Keine E-Mail nötig',
    h1: 'Dateien teilen ohne Login — Ablegen, teilen, fertig',
    intro: 'Jede Seite, die ein Konto verlangt, bevor Sie eine Datei teilen können, stiehlt Ihre Zeit. Filesterr nicht.',
    cta: 'Datei kostenlos hochladen — ohne Anmeldung',
    ctaSub: 'Anonym · Keine E-Mail · Kein Passwort · 1 GB gratis',
    noFriction: [
      { emoji: '📁', label: 'Datei ablegen', sub: 'Jeden Dateityp, bis zu 1 GB' },
      { emoji: '🔗', label: 'Link erhalten', sub: 'Sofort, kein Warten' },
      { emoji: '📤', label: 'Überall teilen', sub: 'Für jeden Empfänger' },
    ],
    sections: [
      {
        h2: 'Warum Dateifreigabe-Seiten ohne Registrierung wirklich wichtig sind',
        paragraphs: [
          'Jedes Mal, wenn ein File-Sharing-Dienst Sie zur Kontoerstellung zwingt, passieren drei Dinge: Sie verbringen 2-3 Minuten mit einem Formular, Sie geben Ihre E-Mail-Adresse an eine Mailingliste weiter, und die empfangende Person muss möglicherweise ebenfalls ein Konto erstellen, bevor sie herunterladen kann.',
          'Nichts davon sollte erforderlich sein, um eine Datei von einem Ort zum anderen zu übertragen. Filesterr glaubt an reibungslose Übertragung. Sie haben eine Datei. Jemand braucht sie. Das Werkzeug sollte nicht im Weg stehen.',
        ],
        bullets: [
          'Keine Anmeldung für Absender — anonym von der Startseite hochladen',
          'Keine Anmeldung für Empfänger — Link funktioniert in jedem Browser',
          'Keine E-Mail erforderlich, kein Spam, keine Mailingliste',
          'Keine App-Installation auf beiden Seiten',
          'Anonyme Uploads erhalten 1 GB gratis — genug für die meisten Anwendungsfälle',
        ],
      },
      {
        h2: 'Was Sie ohne Kontoerstellung tatsächlich erhalten',
        paragraphs: [
          'Anonyme Uploads bei Filesterr sind kein eingeschränkter Gratis-Tarif. Sie erhalten: sofortige Linkerzeugung, 1 GB pro Upload, Unterstützung aller Dateitypen, einen privaten Löschlink bei jedem Upload und eine übersichtliche Download-Seite für Ihren Empfänger.',
          'Das Einzige, worauf Sie im Vergleich zu einem registrierten Konto verzichten, ist die Speicherpersistenz (anonyme Dateien laufen nach 24 Stunden ab) und Analysen. Wenn Sie viel teilen, erhalten Sie mit einem kostenlosen registrierten Konto 10 GB und grundlegende Analysen — immer noch ohne Kreditkarte.',
        ],
        bullets: [
          '1 GB pro Upload, völlig kostenlos',
          'Jeder Dateityp — keine Format-Einschränkungen',
          'Sofortige CDN-Lieferung für Ihren Empfänger',
          'Löschlink inklusive — Datei jederzeit entfernen',
          'Dateien laufen nach 24 Stunden ab (kostenloses Konto erstellen, um sie länger zu behalten)',
        ],
      },
      {
        h2: 'Die beste kostenlose Dateifreigabe ohne Registrierung: worauf Sie achten sollten',
        paragraphs: [
          'Die meisten "ohne Registrierung"-Dateiseiten kompensieren dies, indem sie Ihrem Empfänger einen 30-60-sekündigen Werbe-Countdown vor dem Download anzeigen. Filesterr zeigt bei kostenlosen/anonymen Uploads einen kurzen Countdown — er ist jedoch kurz, und bei Premium entfällt er vollständig.',
          'Keine Seite, die Ihre Empfänger 60 Sekunden durch Werbung warten lässt, ist wirklich "reibungsfrei". Filesterr bleibt ehrlich: ein kurzer Countdown im Gratis-Tarif, null im bezahlten Tarif und die Option zum Upgrade für Ihre wichtigsten Shares.',
        ],
      },
    ],
    relatedTitle: 'Mehr erfahren:',
    linkFeatures: 'Vollständige Funktionsübersicht →',
    linkPricing: 'Kostenlos vs. Bezahlt — Was ist der Unterschied →',
  },
  fr: {
    eyebrow: 'Sans mur d\'inscription · Sans e-mail',
    h1: 'Partage de fichiers sans connexion — Déposez, partagez, terminé',
    intro: 'Chaque site qui exige un compte avant que vous puissiez partager un fichier vole votre temps. Filesterr non.',
    cta: 'Uploader gratuitement — Sans inscription',
    ctaSub: 'Anonyme · Sans e-mail · Sans mot de passe · 1 Go gratuit',
    noFriction: [
      { emoji: '📁', label: 'Déposez votre fichier', sub: 'Tout type, jusqu\'à 1 Go' },
      { emoji: '🔗', label: 'Obtenez votre lien', sub: 'Instantanément' },
      { emoji: '📤', label: 'Partagez partout', sub: 'Pour tout destinataire' },
    ],
    sections: [
      {
        h2: 'Pourquoi les sites de partage sans inscription comptent vraiment',
        paragraphs: [
          'Chaque fois qu\'un site de partage de fichiers vous oblige à créer un compte, trois choses se produisent : vous passez 2-3 minutes sur un formulaire, vous donnez votre e-mail à une liste de diffusion, et la personne qui reçoit le fichier devra peut-être aussi créer un compte avant de télécharger.',
          'Rien de tout cela ne devrait être nécessaire pour déplacer un fichier d\'un endroit à un autre. Filesterr croit au partage sans friction. Vous avez un fichier. Quelqu\'un en a besoin. L\'outil doit s\'effacer.',
        ],
        bullets: [
          'Sans inscription pour l\'expéditeur — upload anonyme depuis la page d\'accueil',
          'Sans inscription pour le destinataire — le lien fonctionne dans tout navigateur',
          'Sans e-mail, sans spam, sans liste de diffusion',
          'Sans installation d\'application des deux côtés',
          'Les uploads anonymes bénéficient de 1 Go gratuit — suffisant pour la plupart des usages',
        ],
      },
      {
        h2: 'Ce que vous obtenez réellement sans créer de compte',
        paragraphs: [
          'Les uploads anonymes sur Filesterr ne sont pas un niveau gratuit bridé. Vous obtenez : génération instantanée de lien, 1 Go par upload, tous types de fichiers pris en charge, un lien de suppression privé inclus avec chaque upload, et une page de téléchargement claire pour votre destinataire.',
          'La seule chose à laquelle vous renoncez par rapport à un compte enregistré est la persistance du stockage (les fichiers anonymes expirent après 24 heures) et les analyses. Si vous partagez beaucoup, un compte gratuit enregistré vous donne 10 Go et des analyses de base — toujours sans carte bancaire.',
        ],
        bullets: [
          '1 Go par upload, totalement gratuit',
          'Tout type de fichier — aucune restriction de format',
          'Livraison CDN instantanée pour votre destinataire',
          'Lien de suppression inclus — supprimez le fichier à tout moment',
          'Les fichiers expirent après 24 heures (créez un compte gratuit pour les conserver plus longtemps)',
        ],
      },
      {
        h2: 'Le meilleur site de partage gratuit sans inscription : ce qu\'il faut rechercher',
        paragraphs: [
          'La plupart des sites "sans inscription" compensent en affichant à votre destinataire un compte à rebours publicitaire de 30 à 60 secondes avant le début du téléchargement. Filesterr affiche un court compte à rebours sur les uploads gratuits/anonymes, mais il est bref — et avec Premium, il disparaît entièrement.',
          'Aucun site qui fait attendre vos destinataires 60 secondes à travers des publicités n\'est vraiment "sans friction". Filesterr reste honnête : un court compte à rebours sur le niveau gratuit, zéro sur le payant, et la possibilité de passer à la version supérieure pour vos partages les plus importants.',
        ],
      },
    ],
    relatedTitle: 'En savoir plus :',
    linkFeatures: 'Aperçu complet des fonctionnalités →',
    linkPricing: 'Gratuit vs. Payant — Quelle est la différence →',
  },
  es: {
    eyebrow: 'Sin barrera de registro · Sin e-mail',
    h1: 'Compartir Archivos Sin Login — Solo Sube, Comparte, Listo',
    intro: 'Cada sitio que exige una cuenta antes de compartir un archivo te roba el tiempo. Filesterr no.',
    cta: 'Subir archivo gratis — Sin registro',
    ctaSub: 'Anónimo · Sin e-mail · Sin contraseña · 1 GB gratis',
    noFriction: [
      { emoji: '📁', label: 'Sube tu archivo', sub: 'Cualquier tipo, hasta 1 GB' },
      { emoji: '🔗', label: 'Obtén tu enlace', sub: 'Instantáneamente' },
      { emoji: '📤', label: 'Comparte en cualquier lugar', sub: 'Para cualquier destinatario' },
    ],
    sections: [
      {
        h2: 'Por qué los sitios de compartición sin registro realmente importan',
        paragraphs: [
          'Cada vez que un sitio de compartición de archivos te obliga a crear una cuenta, pasan tres cosas: gastas 2-3 minutos en un formulario, le das tu correo a una lista de mailing, y la persona que recibe el archivo también podría tener que crear una cuenta antes de descargar.',
          'Nada de eso debería ser necesario para mover un archivo de un lugar a otro. Filesterr cree en el compartir sin fricciones. Tienes un archivo. Alguien lo necesita. La herramienta debe quitarse del camino.',
        ],
        bullets: [
          'Sin registro para el remitente — sube anónimamente desde la página de inicio',
          'Sin registro para el destinatario — el enlace funciona en cualquier navegador',
          'Sin e-mail, sin spam, sin lista de correo',
          'Sin instalar ninguna app en ningún extremo',
          'Las subidas anónimas tienen 1 GB gratis — suficiente para la mayoría de los casos',
        ],
      },
      {
        h2: 'Lo que realmente obtienes sin crear una cuenta',
        paragraphs: [
          'Las subidas anónimas en Filesterr no son un nivel gratuito recortado. Obtienes: generación instantánea de enlace, 1 GB por subida, cualquier tipo de archivo soportado, un enlace de eliminación privado incluido con cada subida, y una página de descarga limpia para tu destinatario.',
          'Lo único a lo que renuncias frente a una cuenta registrada es la persistencia del almacenamiento (los archivos anónimos expiran después de 24 horas) y las estadísticas. Si compartes mucho, una cuenta registrada gratuita te da 10 GB y estadísticas básicas — sin tarjeta de crédito.',
        ],
        bullets: [
          '1 GB por subida, completamente gratis',
          'Cualquier tipo de archivo — sin restricciones de formato',
          'Entrega CDN instantánea para tu destinatario',
          'Enlace de eliminación incluido — borra el archivo cuando quieras',
          'Los archivos expiran a las 24 horas (crea una cuenta gratis para conservarlos más tiempo)',
        ],
      },
      {
        h2: 'El mejor sitio gratuito para compartir archivos sin registro: qué buscar',
        paragraphs: [
          'La mayoría de los sitios "sin registro" compensan mostrando a tu destinatario una cuenta regresiva de anuncios de 30-60 segundos antes de que comience la descarga. Filesterr muestra una cuenta regresiva breve en las subidas gratuitas/anónimas, pero es corta — y con Premium desaparece por completo.',
          'Ningún sitio que haga esperar a tus destinatarios 60 segundos entre anuncios es realmente "sin fricciones". Filesterr lo mantiene honesto: una cuenta regresiva corta en el nivel gratuito, cero en el de pago, y la opción de actualizar para tus comparticiones más importantes.',
        ],
      },
    ],
    relatedTitle: 'Saber más:',
    linkFeatures: 'Vista general completa de funciones →',
    linkPricing: 'Gratis vs. De pago — ¿Cuál es la diferencia →',
  },
  ar: {
    eyebrow: 'لا جدار تسجيل · لا يلزم بريد',
    h1: 'مشاركة الملفات بدون تسجيل دخول — أفلت، شارك، انتهى',
    intro: 'كل موقع يطلب حساباً قبل مشاركة ملف يسرق وقتك. Filesterr لا يفعل ذلك.',
    cta: 'رفع ملف مجاناً — بدون تسجيل',
    ctaSub: 'مجهول · بدون بريد · بدون كلمة مرور · 1 جيجابايت مجاناً',
    noFriction: [
      { emoji: '📁', label: 'أفلت ملفك', sub: 'أي نوع، حتى 1 جيجابايت' },
      { emoji: '🔗', label: 'احصل على رابطك', sub: 'فوراً بدون انتظار' },
      { emoji: '📤', label: 'شارك في أي مكان', sub: 'لأي مستلم' },
    ],
    sections: [
      {
        h2: 'لماذا تهم مواقع مشاركة الملفات بدون تسجيل حقاً',
        paragraphs: [
          'في كل مرة يفرض فيها موقع مشاركة الملفات إنشاء حساب، تحدث ثلاثة أشياء: تقضي 2-3 دقائق في ملء استمارة، وتعطي بريدك الإلكتروني لقائمة بريدية، وقد يضطر الشخص المستلم أيضاً إلى إنشاء حساب قبل التنزيل.',
          'لا ينبغي أن يكون أي من ذلك ضرورياً لنقل ملف من مكان إلى آخر. يؤمن Filesterr بالمشاركة دون احتكاك. لديك ملف. يحتاجه شخص ما. يجب أن تبقى الأداة بعيدة عن الطريق.',
        ],
        bullets: [
          'لا تسجيل للمرسل — ارفع بشكل مجهول من الصفحة الرئيسية',
          'لا تسجيل للمستلم — الرابط يعمل في أي متصفح',
          'لا بريد إلكتروني مطلوب، لا بريد مزعج، لا قائمة بريدية',
          'لا تثبيت تطبيق على أي طرف',
          'الرفع المجهول يحصل على 1 جيجابايت مجاناً — كافٍ لمعظم حالات الاستخدام',
        ],
      },
      {
        h2: 'ما الذي تحصل عليه فعلاً دون إنشاء حساب',
        paragraphs: [
          'الرفع المجهول على Filesterr ليس طبقة مجانية مقيدة. ستحصل على: توليد رابط فوري، 1 جيجابايت لكل رفع، دعم لجميع أنواع الملفات، رابط حذف خاص مرفق مع كل رفع، وصفحة تنزيل نظيفة لمستلمك.',
          'الشيء الوحيد الذي تتخلى عنه مقارنة بحساب مسجل هو استمرارية التخزين (تنتهي صلاحية الملفات المجهولة بعد 24 ساعة) والتحليلات. إذا كنت تشارك كثيراً، يمنحك الحساب المجاني المسجل 10 جيجابايت وتحليلات أساسية — لا يزال بدون بطاقة ائتمان.',
        ],
        bullets: [
          '1 جيجابايت لكل رفع، مجاناً تماماً',
          'أي نوع ملف — بدون قيود على الصيغة',
          'تسليم CDN فوري لمستلمك',
          'رابط الحذف مشمول — احذف الملف في أي وقت',
          'تنتهي صلاحية الملفات بعد 24 ساعة (أنشئ حساباً مجانياً للاحتفاظ بها لفترة أطول)',
        ],
      },
      {
        h2: 'أفضل موقع مجاني لمشاركة الملفات بدون تسجيل: ما الذي تبحث عنه',
        paragraphs: [
          'تعوّض معظم مواقع الملفات "بدون تسجيل" بعرض عداد تنازلي للإعلانات مدته 30-60 ثانية على مستلمك قبل بدء التنزيل. يعرض Filesterr عداداً تنازلياً قصيراً على الرفع المجاني/المجهول، لكنه وجيز — وفي Premium يختفي تماماً.',
          'لا يوجد موقع يجعل مستلميك ينتظرون 60 ثانية عبر الإعلانات ويكون "خالياً من الاحتكاك" حقاً. يحافظ Filesterr على الصدق: عداد تنازلي قصير في الطبقة المجانية، صفر في المدفوعة، وخيار الترقية لأهم مشاركاتك.',
        ],
      },
    ],
    relatedTitle: 'اعرف المزيد:',
    linkFeatures: 'نظرة عامة كاملة على الميزات →',
    linkPricing: 'مجاني مقابل مدفوع — ما الفرق →',
  },
  zh: {
    eyebrow: '无注册墙 · 无需邮箱',
    h1: '无需登录的文件共享 — 拖放、分享、完成',
    intro: '每个在分享文件前要求创建账户的网站都在浪费你的时间。Filesterr不这样。',
    cta: '免费上传 — 无需注册',
    ctaSub: '匿名 · 无邮箱 · 无密码 · 1GB免费',
    noFriction: [
      { emoji: '📁', label: '拖放文件', sub: '任意类型，最大1GB' },
      { emoji: '🔗', label: '获取链接', sub: '即时，无需等待' },
      { emoji: '📤', label: '随处分享', sub: '适用于任何接收方' },
    ],
    sections: [
      {
        h2: '无需注册的文件共享网站为何真正重要',
        paragraphs: [
          '每次文件共享网站强制您创建账户时，都会发生三件事：您花2-3分钟填写表格，将邮箱提供给邮件列表，而接收文件的人在下载前可能也需要创建账户。',
          '移动一个文件从一处到另一处，本不应该需要这些。Filesterr信奉零摩擦共享。您有文件，有人需要它，工具应该让路。',
        ],
        bullets: [
          '发送方无需注册 — 从首页匿名上传',
          '接收方无需注册 — 链接在任何浏览器中可用',
          '无需邮箱，无垃圾邮件，无邮件列表',
          '两端均无需安装应用',
          '匿名上传免费获得1GB — 足够应对大多数使用场景',
        ],
      },
      {
        h2: '不创建账户您实际能获得什么',
        paragraphs: [
          'Filesterr上的匿名上传并非受限的免费层级。您可以获得：即时链接生成、每次上传1GB空间、支持任意文件类型、每次上传附带私密删除链接，以及为接收方提供简洁的下载页面。',
          '与注册账户相比，您唯一放弃的是存储持久性（匿名文件24小时后过期）和数据统计。如果您经常分享，免费注册账户可获得10GB空间和基本统计功能 — 仍然无需信用卡。',
        ],
        bullets: [
          '每次上传1GB，完全免费',
          '任意文件类型 — 无格式限制',
          '为接收方提供即时CDN传输',
          '附带删除链接 — 随时删除文件',
          '文件24小时后过期（创建免费账户可延长保存时间）',
        ],
      },
      {
        h2: '最佳免费无注册文件共享网站：该关注什么',
        paragraphs: [
          '大多数"无注册"文件网站通过在下载开始前向接收方展示30-60秒的广告倒计时来弥补。Filesterr在免费/匿名上传时显示简短倒计时，但时间很短 — 而在Premium版本中完全消除。',
          '任何让接收方在广告中等待60秒的网站都不是真正的"无摩擦"。Filesterr保持诚实：免费层级有简短倒计时，付费层级为零，并为您最重要的分享提供升级选项。',
        ],
      },
    ],
    relatedTitle: '了解更多：',
    linkFeatures: '完整功能概述 →',
    linkPricing: '免费与付费 — 有什么区别 →',
  },
  pt: {
    eyebrow: 'Sem barreira de cadastro · Sem e-mail necessário',
    h1: 'Compartilhar Arquivos Sem Login — Solte, Compartilhe, Pronto',
    intro: 'Cada site que exige uma conta antes de compartilhar um arquivo rouba seu tempo. O Filesterr não.',
    cta: 'Fazer Upload Grátis — Sem Cadastro',
    ctaSub: 'Anônimo · Sem e-mail · Sem senha · 1GB grátis',
    noFriction: [
      { emoji: '📁', label: 'Solte seu arquivo', sub: 'Qualquer tipo, até 1GB' },
      { emoji: '🔗', label: 'Obtenha seu link', sub: 'Instantaneamente' },
      { emoji: '📤', label: 'Compartilhe em qualquer lugar', sub: 'Para qualquer destinatário' },
    ],
    sections: [
      {
        h2: 'Por que sites de compartilhamento sem cadastro realmente importam',
        paragraphs: [
          'Toda vez que um site de compartilhamento de arquivos obriga você a criar uma conta, três coisas acontecem: você passa 2-3 minutos preenchendo um formulário, entrega seu e-mail para uma lista de mailing, e a pessoa que vai receber o arquivo também pode precisar criar uma conta antes de baixar.',
          'Nada disso deveria ser necessário para mover um arquivo de um lugar para outro. O Filesterr acredita no compartilhamento sem atritos. Você tem um arquivo. Alguém precisa dele. A ferramenta deve sair do caminho.',
        ],
        bullets: [
          'Sem cadastro para o remetente — upload anônimo direto da página inicial',
          'Sem cadastro para o destinatário — o link funciona em qualquer navegador',
          'Sem e-mail, sem spam, sem lista de mailing',
          'Sem instalação de app em nenhum dos lados',
          'Uploads anônimos têm 1GB grátis — suficiente para a maioria dos casos',
        ],
      },
      {
        h2: 'O que você realmente obtém sem criar uma conta',
        paragraphs: [
          'Os uploads anônimos no Filesterr não são um nível gratuito limitado. Você recebe: geração instantânea de link, 1GB por upload, suporte a qualquer tipo de arquivo, um link de exclusão privado incluído em cada upload, e uma página de download limpa para o seu destinatário.',
          'A única coisa que você abre mão em relação a uma conta registrada é a persistência do armazenamento (arquivos anônimos expiram após 24 horas) e as estatísticas. Se você compartilha muito, uma conta registrada gratuita oferece 10GB e estatísticas básicas — ainda sem cartão de crédito.',
        ],
        bullets: [
          '1GB por upload, completamente grátis',
          'Qualquer tipo de arquivo — sem restrições de formato',
          'Entrega CDN instantânea para o seu destinatário',
          'Link de exclusão incluído — remova o arquivo quando quiser',
          'Arquivos expiram após 24 horas (crie uma conta grátis para mantê-los por mais tempo)',
        ],
      },
      {
        h2: 'O melhor site gratuito de compartilhamento sem cadastro: o que procurar',
        paragraphs: [
          'A maioria dos sites "sem cadastro" compensam exibindo ao seu destinatário uma contagem regressiva de anúncios de 30-60 segundos antes do início do download. O Filesterr exibe uma breve contagem regressiva em uploads gratuitos/anônimos, mas ela é curta — e no Premium desaparece completamente.',
          'Nenhum site que faz seus destinatários esperarem 60 segundos entre anúncios é realmente "sem atrito". O Filesterr mantém a honestidade: uma breve contagem regressiva no nível gratuito, zero no pago, e a opção de fazer upgrade para seus compartilhamentos mais importantes.',
        ],
      },
    ],
    relatedTitle: 'Saiba mais:',
    linkFeatures: 'Visão geral completa de recursos →',
    linkPricing: 'Grátis vs. Pago — Qual é a diferença →',
  },
  ja: {
    eyebrow: '登録不要 · メール不要',
    h1: 'ログインなしのファイル共有 — ドロップ、共有、完了',
    intro: 'ファイルを共有する前にアカウントを要求するすべてのサイトはあなたの時間を奪っています。Filesterrは違います。',
    cta: '無料でアップロード — 登録なし',
    ctaSub: '匿名 · メール不要 · パスワード不要 · 1GB無料',
    noFriction: [
      { emoji: '📁', label: 'ファイルをドロップ', sub: '任意の種類、最大1GB' },
      { emoji: '🔗', label: 'リンクを取得', sub: '即座に' },
      { emoji: '📤', label: 'どこでも共有', sub: 'どんな受信者にも' },
    ],
    sections: [
      {
        h2: '登録不要のファイル共有サイトが本当に重要な理由',
        paragraphs: [
          'ファイル共有サイトがアカウント作成を強制するたびに、3つのことが起こります。フォームに2〜3分かかります。メールアドレスをメーリングリストに提供します。そして、ファイルを受け取る相手もダウンロード前にアカウントを作成しなければならない場合があります。',
          'ファイルをある場所から別の場所に移動するために、これらは一切必要ないはずです。Filesterrはゼロフリクション共有を信念としています。あなたにはファイルがあります。誰かがそれを必要としています。ツールは邪魔をすべきではありません。',
        ],
        bullets: [
          '送信者の登録不要 — ホームページから匿名でアップロード',
          '受信者の登録不要 — どのブラウザでもリンクが動作します',
          'メール不要、スパムなし、メーリングリストなし',
          '両端でアプリのインストール不要',
          '匿名アップロードで1GB無料 — ほとんどの用途に十分です',
        ],
      },
      {
        h2: 'アカウントを作成せずに実際に得られるもの',
        paragraphs: [
          'Filesterrの匿名アップロードは、機能が制限された無料プランではありません。即時リンク生成、アップロードあたり1GB、すべてのファイル形式に対応、各アップロードに含まれるプライベート削除リンク、そして受信者向けの清潔なダウンロードページを利用できます。',
          '登録済みアカウントと比較して唯一手放すのは、ストレージの永続性（匿名ファイルは24時間後に期限切れ）と分析機能です。頻繁に共有する場合、無料の登録済みアカウントで10GBと基本的な分析が利用できます — それでもクレジットカードは不要です。',
        ],
        bullets: [
          'アップロードあたり1GB、完全無料',
          'あらゆるファイル形式 — フォーマット制限なし',
          '受信者への即時CDN配信',
          '削除リンク付き — いつでもファイルを削除可能',
          'ファイルは24時間後に期限切れ（長く保持するには無料アカウントを作成してください）',
        ],
      },
      {
        h2: '登録不要の最高の無料ファイル共有サイト：何を見るべきか',
        paragraphs: [
          'ほとんどの「登録不要」ファイルサイトは、ダウンロードが始まる前に受信者に30〜60秒の広告カウントダウンを表示することで補っています。Filesterrは無料/匿名アップロードで短いカウントダウンを表示しますが、それは短く — Premiumでは完全になくなります。',
          '受信者を広告で60秒待たせるサイトは、本当の意味での「フリクションフリー」ではありません。Filesterrは誠実さを保ちます。無料プランでは短いカウントダウン、有料プランではゼロ、そして最も重要な共有のためのアップグレードオプションがあります。',
        ],
      },
    ],
    relatedTitle: 'さらに詳しく:',
    linkFeatures: '機能の完全な概要 →',
    linkPricing: '無料 vs. 有料 — 違いは何か →',
  },
  ru: {
    eyebrow: 'Без стены регистрации · Без e-mail',
    h1: 'Обмен файлами без входа в систему — Загрузите, поделитесь, готово',
    intro: 'Каждый сайт, требующий аккаунт перед обменом файлом, крадёт ваше время. Filesterr не делает этого.',
    cta: 'Загрузить бесплатно — без регистрации',
    ctaSub: 'Анонимно · Без e-mail · Без пароля · 1 ГБ бесплатно',
    noFriction: [
      { emoji: '📁', label: 'Загрузите файл', sub: 'Любой тип, до 1 ГБ' },
      { emoji: '🔗', label: 'Получите ссылку', sub: 'Мгновенно' },
      { emoji: '📤', label: 'Поделитесь везде', sub: 'Для любого получателя' },
    ],
    sections: [
      {
        h2: 'Почему сайты обмена файлами без регистрации действительно важны',
        paragraphs: [
          'Каждый раз, когда файлообменник требует создать аккаунт, происходят три вещи: вы тратите 2-3 минуты на заполнение формы, отдаёте свой email в список рассылки, а человек, получающий файл, тоже может быть вынужден зарегистрироваться перед скачиванием.',
          'Ничего из этого не должно быть нужно, чтобы переместить файл из одного места в другое. Filesterr верит в обмен без трений. У вас есть файл. Кому-то он нужен. Инструмент должен не мешать.',
        ],
        bullets: [
          'Без регистрации для отправителя — анонимная загрузка с главной страницы',
          'Без регистрации для получателя — ссылка работает в любом браузере',
          'Без e-mail, без спама, без списков рассылки',
          'Без установки приложений с обеих сторон',
          'Анонимные загрузки — 1 ГБ бесплатно, достаточно для большинства случаев',
        ],
      },
      {
        h2: 'Что вы реально получаете без создания аккаунта',
        paragraphs: [
          'Анонимные загрузки на Filesterr — это не урезанный бесплатный тариф. Вы получаете: мгновенную генерацию ссылки, 1 ГБ на загрузку, поддержку любых типов файлов, приватную ссылку на удаление с каждой загрузкой и чистую страницу скачивания для получателя.',
          'Единственное, от чего вы отказываетесь по сравнению с зарегистрированным аккаунтом, — это постоянное хранение (анонимные файлы исчезают через 24 часа) и аналитика. Если вы часто делитесь файлами, бесплатный зарегистрированный аккаунт даёт вам 10 ГБ и базовую аналитику — по-прежнему без банковской карты.',
        ],
        bullets: [
          '1 ГБ на загрузку, полностью бесплатно',
          'Любой тип файла — без ограничений по формату',
          'Мгновенная доставка через CDN для получателя',
          'Ссылка на удаление включена — удалите файл в любой момент',
          'Файлы исчезают через 24 часа (создайте бесплатный аккаунт, чтобы хранить дольше)',
        ],
      },
      {
        h2: 'Лучший бесплатный файлообменник без регистрации: на что обращать внимание',
        paragraphs: [
          'Большинство сайтов "без регистрации" компенсируют это тем, что показывают получателю 30-60-секундный рекламный обратный отсчёт перед началом скачивания. Filesterr показывает короткий обратный отсчёт для бесплатных/анонимных загрузок, но он краткий — а в Premium он полностью исчезает.',
          'Ни один сайт, заставляющий получателей ждать 60 секунд через рекламу, не является по-настоящему "без трений". Filesterr остаётся честным: короткий отсчёт на бесплатном тарифе, ноль на платном и возможность перейти на Premium для самых важных файлов.',
        ],
      },
    ],
    relatedTitle: 'Узнать больше:',
    linkFeatures: 'Полный обзор функций →',
    linkPricing: 'Бесплатно vs. Платно — В чём разница →',
  },
}

const c = computed(() => content[locale.value] || content.en)

const metaContent = {
  en: { title: 'File Sharing Without Login — No Account, No Email Required | Filesterr', description: 'Share files without creating an account. No registration, no email required. Drop a file, get a link, share it. Free up to 1GB, works in any browser instantly.' },
  tr: { title: 'Giriş Yapmadan Dosya Paylaşımı — Hesap Gerekmez | Filesterr', description: 'Hesap oluşturmadan dosya paylaşın. Kayıt yok, e-posta gerekmez. Dosya bırakın, bağlantı alın, paylaşın. 1 GB\'a kadar ücretsiz.' },
  de: { title: 'Dateien teilen ohne Login — Kein Konto, keine E-Mail nötig | Filesterr', description: 'Dateien ohne Konto teilen. Keine Registrierung, keine E-Mail nötig. Datei ablegen, Link erhalten, teilen. Bis 1 GB kostenlos.' },
  fr: { title: 'Partage de fichiers sans connexion — Sans compte, sans e-mail | Filesterr', description: 'Partagez des fichiers sans créer de compte. Pas d\'inscription, pas d\'e-mail. Déposez un fichier, obtenez un lien, partagez. Gratuit jusqu\'à 1 Go.' },
  es: { title: 'Compartir archivos sin login — Sin cuenta, sin e-mail | Filesterr', description: 'Comparte archivos sin crear cuenta. Sin registro, sin e-mail. Sube un archivo, obtén un enlace, comparte. Gratis hasta 1 GB.' },
  ar: { title: 'مشاركة الملفات بدون تسجيل دخول — بدون حساب، بدون بريد | Filesterr', description: 'شارك الملفات بدون إنشاء حساب. لا تسجيل، لا بريد إلكتروني. أفلت ملفاً، احصل على رابط، شارك. مجاناً حتى 1 جيجابايت.' },
  zh: { title: '无需登录的文件共享 — 无账户，无邮箱 | Filesterr', description: '无需创建账户即可共享文件。无需注册，无需邮箱。拖放文件，获取链接，分享。免费最大1GB。' },
  pt: { title: 'Compartilhar Arquivos Sem Login — Sem Conta, Sem E-mail | Filesterr', description: 'Compartilhe arquivos sem criar conta. Sem cadastro, sem e-mail. Solte um arquivo, obtenha um link, compartilhe. Grátis até 1GB.' },
  ja: { title: 'ログインなしのファイル共有 — アカウント不要、メール不要 | Filesterr', description: 'アカウントなしでファイルを共有。登録不要、メール不要。ファイルをドロップ、リンクを取得、共有。1GBまで無料。' },
  ru: { title: 'Обмен файлами без входа — без аккаунта, без e-mail | Filesterr', description: 'Делитесь файлами без создания аккаунта. Без регистрации, без e-mail. Загрузите файл, получите ссылку, поделитесь. Бесплатно до 1 ГБ.' },
}

const meta = computed(() => metaContent[locale.value] || metaContent.en)
const canonicalLocale = computed(() => locale.value && locale.value !== 'en' ? `/${locale.value}/file-sharing-no-login` : '/file-sharing-no-login')

useHead({
  title: computed(() => meta.value.title),
  meta: [
    { name: 'description', content: computed(() => meta.value.description) },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: computed(() => `https://filesterr.com${canonicalLocale.value}`) }],
})
</script>
