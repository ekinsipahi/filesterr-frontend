<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">
    <!-- Hero with pain-point framing -->
    <div class="bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-950/20 dark:to-transparent pt-20 pb-12">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/25 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-6">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
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

      <!-- Pain → Solution callout -->
      <div class="rounded-2xl bg-zinc-900 dark:bg-zinc-800 text-white p-8">
        <p class="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">{{ c.scenarioLabel }}</p>
        <div class="space-y-3">
          <p class="text-base text-zinc-300">😩 {{ c.pain1 }}</p>
          <p class="text-base text-zinc-300">😩 {{ c.pain2 }}</p>
          <p class="text-base text-zinc-300">😩 {{ c.pain3 }}</p>
          <div class="pt-3 border-t border-zinc-700">
            <p class="text-brand-400 font-semibold text-lg">✓ {{ c.solution }}</p>
          </div>
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

      <!-- Steps -->
      <div class="space-y-4">
        <h2 class="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100">{{ c.howTitle }}</h2>
        <div class="grid gap-4">
          <div v-for="(step, i) in c.steps" :key="i" class="flex items-start gap-4 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <div class="w-8 h-8 rounded-full bg-brand-500 text-white font-bold text-sm flex items-center justify-center shrink-0">{{ i + 1 }}</div>
            <div>
              <p class="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{{ step.title }}</p>
              <p class="text-zinc-500 dark:text-zinc-400 text-sm mt-0.5">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
        <p class="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">{{ c.relatedTitle }}</p>
        <div class="flex flex-wrap gap-3">
          <a href="/features" class="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">{{ c.linkFeatures }}</a>
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
    eyebrow: 'Android → Mac · Phone → PC · Any combo, zero apps',
    h1: 'Your File Is on Your Android. It Needs to Be on a Mac. 30 Seconds.',
    intro: 'You Googled "file transfer app android to mac" and found 15 apps, all requiring installs. Here\'s the alternative: upload from your Android browser, share a link, open on Mac. Zero apps, zero cables, zero accounts.',
    cta: 'Transfer a File Now',
    ctaSub: 'Free · No app · No account · 30 seconds',
    scenarioLabel: 'The problem you\'ve lived',
    pain1: 'You searched "file transfer app android to mac" and got a wall of app store installs.',
    pain2: 'Bluetooth that needs pairing, fails mid-transfer, or just... doesn\'t connect.',
    pain3: '"I\'ll just email myself a 200MB video." (Don\'t do this.)',
    solution: 'Upload from your Android browser. Share the link. Your Mac, iPhone, or PC opens it. Done.',
    sections: [
      {
        h2: 'File transfer app android to mac — without any app at all',
        paragraphs: [
          'The search for a file transfer app android to mac sends most people down a rabbit hole of ADB utilities, MTP drivers, and third-party sync apps that require installs on both ends. The actual solution is simpler: Filesterr is a cross platform file sharing app alternative that lives entirely in your browser. Open filesterr.com on your Android, upload your file, copy the link, open the link on your Mac. Done in 30 seconds.',
          'The same approach works as a file transfer app android to iphone replacement. Upload from your Android, share the link via WhatsApp or iMessage — your iPhone opens the link in Safari and downloads the file directly. No Bluetooth proximity requirement, no NFC tap ritual, no matching app ecosystems needed.',
          'This is what file transfer cross platform actually means: the file moves between any devices, any operating systems, without any shared infrastructure between them other than a URL. Your Android doesn\'t need to know your Mac exists. Your Mac doesn\'t need to know you own an Android.',
        ],
        bullets: [
          'Android to Mac: works perfectly, always — no drivers, no cables',
          'Android to iPhone: share link via WhatsApp or iMessage, done',
          'Phone to PC: open browser, upload, share link — 30 seconds',
          'Any combination: Android, iPhone, Mac, Windows, Linux, tablets',
          'Files up to 50GB on Pro plan',
        ],
      },
      {
        h2: 'The cross platform file sharing app that isn\'t an app',
        paragraphs: [
          'Every cross platform file sharing app on the market has the same core problem: it requires installation on at least one end, often both. The best ones — Send Anywhere, Snapdrop, LocalSend — are excellent for specific scenarios. But they all assume something: same network, or an app on the receiving end, or active simultaneous connection during transfer.',
          'Filesterr removes all assumptions. It\'s a file sharing app between android and ios alternatives that works asynchronously — upload now, download later, from anywhere. The file sits on Filesterr\'s CDN and your link works until you delete it or it expires. Your recipient downloads it at their convenience, from their device, in their timezone.',
          'For the file transfer app phone to pc use case specifically: open Chrome on your Android, go to filesterr.com, drag and drop or tap to upload, copy the link, paste it in an email or message to yourself — your PC opens the link in any browser and downloads the file. The entire process is faster than finding a USB cable.',
        ],
        bullets: [
          'Works from any distance — same room or different countries',
          'No physical connection or device pairing needed',
          'Available immediately — no "preparing transfer" delays',
          'Link stays active so recipient can download when convenient',
          'No simultaneous connection required — true async transfer',
        ],
      },
      {
        h2: 'Why Filesterr beats every cable, Bluetooth, and dedicated transfer app',
        paragraphs: [
          'AirDrop requires both devices to be Apple, nearby, and with WiFi on. Bluetooth transfer above 50MB is agony. USB cables require the right connector — and if you\'re transferring to someone else\'s computer, forget it entirely. These are hardware constraints. Filesterr has zero hardware requirements.',
          'Dedicated file transfer apps are better than cables but still imperfect. They often need ports forwarded, both devices on the same network, or an active peer-to-peer connection that drops if either device sleeps. Filesterr doesn\'t care. Upload from your phone\'s 4G connection, your recipient downloads on their office WiFi hours later. The internet is the network.',
          'This is the real scenario most people face: you\'re at a meeting, you took a photo of the whiteboard, your colleague needs it on their laptop — and they use a different OS than you. Or you shot a video at a wedding and six people on six different devices need a copy. Filesterr handles all of these in under 30 seconds with a single upload and a shareable link.',
        ],
      },
    ],
    howTitle: 'How it works in 3 steps',
    steps: [
      { title: 'Open filesterr.com on your phone', desc: 'Works in Safari, Chrome, Samsung Internet — any mobile browser on any OS' },
      { title: 'Upload your file', desc: 'Tap to select from camera roll, files app, or anywhere on your device' },
      { title: 'Share the link', desc: 'Copy the link and send via WhatsApp, iMessage, email, or paste anywhere — recipient downloads on Mac, PC, iPhone, or any device' },
    ],
    relatedTitle: 'Explore more:',
    linkFeatures: 'All Features →',
    linkUpload: 'Try It Now →',
  },
  tr: {
    eyebrow: 'Telefon → Mac · Android → PC · Her kombinasyon',
    h1: 'Dosya Telefonunuzda. Mac\'iniz İhtiyaç Duyuyor. 30 Saniye.',
    intro: 'Kablo yok. Bluetooth müzakeresi yok. Filesterr her platform, her zaman çalışan en hızlı platformlar arası dosya transferidir.',
    cta: 'Şimdi Dosya Aktar',
    ctaSub: 'Ücretsiz · Uygulama yok · Hesap yok · 30 saniye',
    scenarioLabel: 'Yaşadığınız sorun',
    pain1: 'Kablolar. Doğru kablo. USB-C mi? Lightning mı? Mac\'inizde o port var mı?',
    pain2: 'Eşleştirme gerektiren, aktarım ortasında başarısız olan Bluetooth.',
    pain3: '"200MB videoyu kendime e-postayla gönderirim." (Bunu yapmayın.)',
    solution: 'Telefonunuzdan Filesterr\'a bırakın. Arkadaşınız Mac\'inde linki açsın. Bitti.',
    sections: [
      {
        h2: 'Android\'den Mac\'e dosya transferi — hiçbir uygulama olmadan',
        paragraphs: [
          '"Android\'den Mac\'e dosya transfer uygulaması" araması çoğu insanı ADB araçları, MTP sürücüleri ve her iki cihaza da kurulum gerektiren üçüncü taraf uygulamaların labirentine sürükler. Gerçek çözüm çok daha basit: Filesterr, tamamen tarayıcınızda çalışan platformlar arası bir dosya paylaşım alternatifidir. Android\'inizde filesterr.com\'u açın, dosyanızı yükleyin, linki kopyalayın, Mac\'inizde açın. 30 saniyede tamam.',
          'Aynı yöntem Android\'den iPhone\'a dosya transferinde de çalışır. Android\'inizden yükleyin, linki WhatsApp veya iMessage ile paylaşın — iPhone\'unuz Safari\'de linki açar ve dosyayı doğrudan indirir. Bluetooth yakınlık şartı yok, NFC dokunma ritüeli yok, eşleşen uygulama ekosistemi gerekmez.',
          'Platformlar arası dosya transferi gerçekte budur: dosya herhangi bir cihaz ile herhangi bir işletim sistemi arasında, aralarında yalnızca bir URL dışında ortak bir altyapı olmadan taşınır. Android\'iniz Mac\'inizin var olduğunu bilmek zorunda değil. Mac\'iniz Android kullandığınızı bilmek zorunda değil.',
        ],
        bullets: [
          'Android\'den Mac\'e: her zaman mükemmel çalışır — sürücü yok, kablo yok',
          'Android\'den iPhone\'a: WhatsApp veya iMessage ile link paylaşın, tamam',
          'Telefondan PC\'ye: tarayıcıyı açın, yükleyin, linki paylaşın — 30 saniye',
          'Her kombinasyon: Android, iPhone, Mac, Windows, Linux, tabletler',
          'Pro planda 50 GB\'a kadar dosya',
        ],
      },
      {
        h2: 'Uygulama olmayan platformlar arası dosya paylaşım uygulaması',
        paragraphs: [
          'Piyasadaki her platformlar arası dosya paylaşım uygulamasının aynı temel sorunu vardır: en az bir cihaza, çoğunlukla her ikisine de kurulum gerektirir. En iyileri — Send Anywhere, Snapdrop, LocalSend — belirli senaryolar için mükemmeldir. Ama hepsi bir şeyi varsayar: aynı ağ, alıcı tarafta bir uygulama veya transfer sırasında aktif eşzamanlı bağlantı.',
          'Filesterr tüm varsayımları ortadan kaldırır. Android ile iOS arasında asenkron çalışan bir dosya paylaşım alternatifidir — şimdi yükleyin, sonra indirin, herhangi bir yerden. Dosya Filesterr\'ın CDN\'inde bekler ve linkiniz siz silene veya süresi dolana kadar çalışır. Alıcınız kendi cihazından, kendi saat diliminde, uygun olduğunda indirir.',
          'Telefondan PC\'ye dosya transferi kullanım senaryosu için: Android\'inizde Chrome\'u açın, filesterr.com\'a gidin, sürükleyip bırakın veya yüklemek için dokunun, linki kopyalayın, kendinize e-posta veya mesajda yapıştırın — PC\'niz herhangi bir tarayıcıda linki açar ve dosyayı indirir. Tüm süreç bir USB kablosu bulmaktan daha hızlıdır.',
        ],
        bullets: [
          'Her mesafeden çalışır — aynı oda veya farklı ülkeler',
          'Fiziksel bağlantı veya cihaz eşleştirmesi gerekmez',
          'Anında kullanılabilir — "transfer hazırlanıyor" gecikmesi yok',
          'Link aktif kalır, alıcı uygun olduğunda indirebilir',
          'Eşzamanlı bağlantı gerekmez — gerçek asenkron transfer',
        ],
      },
      {
        h2: 'Filesterr her kablo, Bluetooth ve özel transfer uygulamasını neden geçer',
        paragraphs: [
          'AirDrop her iki cihazın da Apple olmasını, yakın olmalarını ve WiFi\'nin açık olmasını gerektirir. 50 MB üzerinde Bluetooth transferi işkencedir. USB kabloları doğru bağlayıcıyı gerektirir — ve başka birinin bilgisayarına transfer ediyorsanız, tamamen unutun. Bunlar donanım kısıtlamalarıdır. Filesterr\'ın sıfır donanım gereksinimi vardır.',
          'Özel dosya transfer uygulamaları kablolardan daha iyidir ama hâlâ kusurludur. Çoğu zaman yönlendirilen portlar, her iki cihazın aynı ağda olması veya herhangi bir cihaz uyursa düşen aktif eşler arası bağlantı gerektirir. Filesterr önemsemez. Telefonunuzun 4G bağlantısından yükleyin, alıcınız saatler sonra ofis WiFi\'nde indirir. İnternet ağdır.',
          'İnsanların gerçekten karşılaştığı senaryo budur: toplantıdasınız, tahtanın fotoğrafını çektiniz, meslektaşınızın dizüstünde olması gerekiyor — ve sizden farklı bir işletim sistemi kullanıyor. Ya da bir düğünde video çektiniz ve altı farklı cihazda altı kişinin kopyası olması gerekiyor. Filesterr bunların hepsini tek bir yükleme ve paylaşılabilir bir linkle 30 saniyeden kısa sürede halleder.',
        ],
      },
    ],
    howTitle: '3 adımda nasıl çalışır',
    steps: [
      { title: 'Telefonunuzda filesterr.com\'u açın', desc: 'Safari, Chrome, Samsung Internet\'te çalışır' },
      { title: 'Dosyanızı yükleyin', desc: 'Kamera rullosundan seçmek için dokunun' },
      { title: 'Bağlantıyı paylaşın', desc: 'WhatsApp veya iMessage ile gönderin — alıcı herhangi bir cihazda indirir' },
    ],
    relatedTitle: 'Daha fazlasını keşfedin:',
    linkFeatures: 'Tüm Özellikler →',
    linkUpload: 'Şimdi Dene →',
  },
  de: {
    eyebrow: 'Telefon → Mac · Android → PC · Jede Kombination',
    h1: 'Datei auf dem Telefon. Mac braucht sie. 30 Sekunden.',
    intro: 'Kein Kabel. Keine Bluetooth-Verhandlung. Filesterr ist die schnellste plattformübergreifende Dateiübertragung.',
    cta: 'Datei jetzt übertragen',
    ctaSub: 'Kostenlos · Keine App · Kein Konto · 30 Sekunden',
    scenarioLabel: 'Das Problem, das Sie kennen',
    pain1: 'Kabel. Das richtige Kabel. USB-C? Lightning? Hat Ihr Mac diesen Anschluss?',
    pain2: 'Bluetooth, das Kopplung erfordert und beim Transfer abbricht.',
    pain3: '"Ich schicke mir das 200MB-Video einfach per E-Mail." (Tu das nicht.)',
    solution: 'Legen Sie es von Ihrem Telefon auf Filesterr ab. Freund öffnet den Link auf dem Mac. Fertig.',
    sections: [
      {
        h2: 'Dateiübertragung Android zu Mac — ganz ohne App',
        paragraphs: [
          'Die Suche nach einer Dateiübertragungs-App von Android zu Mac führt die meisten Menschen in ein Labyrinth aus ADB-Utilities, MTP-Treibern und Drittanbieter-Apps, die auf beiden Seiten installiert werden müssen. Die eigentliche Lösung ist einfacher: Filesterr ist eine plattformübergreifende Alternative, die vollständig in Ihrem Browser läuft. Öffnen Sie filesterr.com auf Ihrem Android, laden Sie die Datei hoch, kopieren Sie den Link, öffnen Sie ihn auf dem Mac. In 30 Sekunden erledigt.',
          'Der gleiche Ansatz funktioniert als Ersatz für eine Dateiübertragungs-App von Android zu iPhone. Laden Sie von Ihrem Android hoch, teilen Sie den Link per WhatsApp oder iMessage — Ihr iPhone öffnet den Link in Safari und lädt die Datei direkt herunter. Keine Bluetooth-Näherungsanforderung, kein NFC-Tipp-Ritual, keine passenden App-Ökosysteme erforderlich.',
          'Das ist, was plattformübergreifende Dateiübertragung tatsächlich bedeutet: Die Datei bewegt sich zwischen beliebigen Geräten und Betriebssystemen, ohne gemeinsame Infrastruktur außer einer URL. Ihr Android muss nicht wissen, dass Ihr Mac existiert. Ihr Mac muss nicht wissen, dass Sie ein Android besitzen.',
        ],
        bullets: [
          'Android zu Mac: funktioniert immer perfekt — keine Treiber, keine Kabel',
          'Android zu iPhone: Link per WhatsApp oder iMessage teilen, fertig',
          'Telefon zu PC: Browser öffnen, hochladen, Link teilen — 30 Sekunden',
          'Jede Kombination: Android, iPhone, Mac, Windows, Linux, Tablets',
          'Dateien bis zu 50 GB im Pro-Plan',
        ],
      },
      {
        h2: 'Die plattformübergreifende Dateifreigabe-App, die keine App ist',
        paragraphs: [
          'Jede plattformübergreifende Dateifreigabe-App auf dem Markt hat dasselbe Kernproblem: Sie erfordert eine Installation auf mindestens einer Seite, oft auf beiden. Die besten — Send Anywhere, Snapdrop, LocalSend — sind für bestimmte Szenarien hervorragend. Aber sie setzen alle etwas voraus: dasselbe Netzwerk, eine App auf der Empfängerseite oder eine aktive gleichzeitige Verbindung während der Übertragung.',
          'Filesterr beseitigt alle Annahmen. Es ist eine asynchron arbeitende Alternative zur Dateifreigabe zwischen Android und iOS — jetzt hochladen, später herunterladen, von überall. Die Datei liegt auf Filesterrs CDN und Ihr Link funktioniert, bis Sie ihn löschen oder er abläuft. Ihr Empfänger lädt es zu einem günstigen Zeitpunkt von seinem Gerät in seiner Zeitzone herunter.',
          'Für den Anwendungsfall Dateiübertragung Telefon zu PC: Öffnen Sie Chrome auf Ihrem Android, gehen Sie zu filesterr.com, ziehen Sie die Datei hinein oder tippen Sie zum Hochladen, kopieren Sie den Link, fügen Sie ihn in eine E-Mail oder Nachricht an sich selbst ein — Ihr PC öffnet den Link in einem beliebigen Browser und lädt die Datei herunter. Der gesamte Vorgang ist schneller als das Suchen eines USB-Kabels.',
        ],
        bullets: [
          'Funktioniert aus beliebiger Entfernung — gleiches Zimmer oder verschiedene Länder',
          'Keine physische Verbindung oder Gerätekopplung erforderlich',
          'Sofort verfügbar — keine Verzögerungen durch "Transfer wird vorbereitet"',
          'Link bleibt aktiv, Empfänger kann nach Belieben herunterladen',
          'Keine gleichzeitige Verbindung erforderlich — echte asynchrone Übertragung',
        ],
      },
      {
        h2: 'Warum Filesterr jedes Kabel, Bluetooth und jede Übertragungs-App schlägt',
        paragraphs: [
          'AirDrop erfordert, dass beide Geräte Apple sind, in der Nähe und mit aktiviertem WiFi. Bluetooth-Übertragungen über 50 MB sind eine Qual. USB-Kabel erfordern den richtigen Anschluss — und wenn Sie auf den Computer einer anderen Person übertragen, vergessen Sie es ganz. Das sind Hardwareeinschränkungen. Filesterr hat keinerlei Hardwareanforderungen.',
          'Dedizierte Dateiübertragungs-Apps sind besser als Kabel, aber noch nicht perfekt. Sie benötigen oft weitergeleitete Ports, beide Geräte im selben Netzwerk oder eine aktive Peer-to-Peer-Verbindung, die abbricht, wenn ein Gerät in den Ruhezustand geht. Filesterr ist das egal. Laden Sie über die 4G-Verbindung Ihres Telefons hoch, Ihr Empfänger lädt Stunden später über das Büro-WiFi herunter. Das Internet ist das Netzwerk.',
          'Das ist das reale Szenario, mit dem die meisten Menschen konfrontiert sind: Sie sind in einem Meeting, haben ein Foto der Tafel gemacht, Ihr Kollege braucht es auf seinem Laptop — und er verwendet ein anderes Betriebssystem als Sie. Oder Sie haben ein Video auf einer Hochzeit aufgenommen und sechs Personen auf sechs verschiedenen Geräten brauchen eine Kopie. Filesterr erledigt all das in unter 30 Sekunden mit einem einzigen Upload und einem teilbaren Link.',
        ],
      },
    ],
    howTitle: 'Wie es in 3 Schritten funktioniert',
    steps: [
      { title: 'Öffnen Sie filesterr.com auf Ihrem Telefon', desc: 'Funktioniert in Safari, Chrome, jedem mobilen Browser' },
      { title: 'Laden Sie Ihre Datei hoch', desc: 'Tippen Sie, um aus der Kamerarolle zu wählen' },
      { title: 'Teilen Sie den Link', desc: 'Per WhatsApp oder E-Mail senden — Empfänger lädt auf jedem Gerät herunter' },
    ],
    relatedTitle: 'Mehr entdecken:',
    linkFeatures: 'Alle Funktionen →',
    linkUpload: 'Jetzt ausprobieren →',
  },
  fr: {
    eyebrow: 'Téléphone → Mac · Android → PC · N\'importe quelle combo',
    h1: 'Le fichier est sur votre téléphone. Le Mac en a besoin. 30 secondes.',
    intro: 'Pas de câble. Pas de négociation Bluetooth. Filesterr est le transfert de fichiers multi-appareils le plus rapide.',
    cta: 'Transférer un fichier maintenant',
    ctaSub: 'Gratuit · Sans app · Sans compte · 30 secondes',
    scenarioLabel: 'Le problème que vous connaissez',
    pain1: 'Les câbles. Le bon câble. USB-C ? Lightning ? Votre Mac a-t-il ce port ?',
    pain2: 'Bluetooth qui nécessite un jumelage et échoue en cours de transfert.',
    pain3: '"Je vais juste m\'envoyer la vidéo de 200 Mo par e-mail." (Ne faites pas ça.)',
    solution: 'Déposez-le sur Filesterr depuis votre téléphone. Votre ami ouvre le lien sur son Mac. Terminé.',
    sections: [
      {
        h2: 'Transférer des fichiers d\'Android vers Mac — sans aucune application',
        paragraphs: [
          'La recherche d\'une application de transfert de fichiers d\'Android vers Mac entraîne la plupart des gens dans un labyrinthe d\'utilitaires ADB, de pilotes MTP et d\'applications de synchronisation tierces nécessitant une installation des deux côtés. La vraie solution est plus simple : Filesterr est une alternative de partage de fichiers multi-plateformes qui fonctionne entièrement dans votre navigateur. Ouvrez filesterr.com sur votre Android, uploadez votre fichier, copiez le lien, ouvrez-le sur votre Mac. Terminé en 30 secondes.',
          'La même approche fonctionne comme remplacement d\'une application de transfert Android vers iPhone. Uploadez depuis votre Android, partagez le lien via WhatsApp ou iMessage — votre iPhone ouvre le lien dans Safari et télécharge le fichier directement. Aucune exigence de proximité Bluetooth, aucun rituel NFC, aucun écosystème d\'applications commun nécessaire.',
          'C\'est ce que le transfert de fichiers multi-plateformes signifie réellement : le fichier se déplace entre n\'importe quels appareils, n\'importe quels systèmes d\'exploitation, sans aucune infrastructure partagée entre eux autre qu\'une URL. Votre Android n\'a pas besoin de savoir que votre Mac existe. Votre Mac n\'a pas besoin de savoir que vous possédez un Android.',
        ],
        bullets: [
          'Android vers Mac : fonctionne parfaitement, toujours — pas de pilotes, pas de câbles',
          'Android vers iPhone : partager le lien via WhatsApp ou iMessage, c\'est fait',
          'Téléphone vers PC : ouvrir le navigateur, uploader, partager le lien — 30 secondes',
          'N\'importe quelle combinaison : Android, iPhone, Mac, Windows, Linux, tablettes',
          'Fichiers jusqu\'à 50 Go sur le plan Pro',
        ],
      },
      {
        h2: 'L\'application de partage multi-plateformes qui n\'est pas une application',
        paragraphs: [
          'Chaque application de partage de fichiers multi-plateformes sur le marché a le même problème fondamental : elle nécessite une installation sur au moins un côté, souvent les deux. Les meilleures — Send Anywhere, Snapdrop, LocalSend — sont excellentes pour des scénarios spécifiques. Mais elles supposent toutes quelque chose : le même réseau, une application côté récepteur, ou une connexion simultanée active pendant le transfert.',
          'Filesterr supprime toutes les suppositions. C\'est une alternative asynchrone au partage de fichiers entre Android et iOS — uploadez maintenant, téléchargez plus tard, de n\'importe où. Le fichier repose sur le CDN de Filesterr et votre lien fonctionne jusqu\'à ce que vous le supprimiez ou qu\'il expire. Votre destinataire le télécharge à sa convenance, depuis son appareil, dans son fuseau horaire.',
          'Pour le cas d\'usage de transfert de fichiers téléphone vers PC : ouvrez Chrome sur votre Android, allez sur filesterr.com, glissez-déposez ou appuyez pour uploader, copiez le lien, collez-le dans un e-mail ou un message à vous-même — votre PC ouvre le lien dans n\'importe quel navigateur et télécharge le fichier. L\'ensemble du processus est plus rapide que de trouver un câble USB.',
        ],
        bullets: [
          'Fonctionne depuis n\'importe quelle distance — même pièce ou pays différents',
          'Aucune connexion physique ou jumelage d\'appareils nécessaire',
          'Disponible immédiatement — pas de délais de "préparation du transfert"',
          'Le lien reste actif pour que le destinataire télécharge quand c\'est pratique',
          'Aucune connexion simultanée requise — vrai transfert asynchrone',
        ],
      },
      {
        h2: 'Pourquoi Filesterr surpasse tous les câbles, Bluetooth et applications de transfert',
        paragraphs: [
          'AirDrop nécessite que les deux appareils soient Apple, proches l\'un de l\'autre, et avec le WiFi activé. Le transfert Bluetooth au-delà de 50 Mo est une véritable torture. Les câbles USB nécessitent le bon connecteur — et si vous transférez sur l\'ordinateur de quelqu\'un d\'autre, oubliez complètement. Ce sont des contraintes matérielles. Filesterr n\'a aucune exigence matérielle.',
          'Les applications de transfert de fichiers dédiées sont meilleures que les câbles mais toujours imparfaites. Elles nécessitent souvent des ports redirigés, les deux appareils sur le même réseau, ou une connexion peer-to-peer active qui se coupe si l\'un des appareils se met en veille. Filesterr s\'en moque. Uploadez depuis la connexion 4G de votre téléphone, votre destinataire télécharge sur son WiFi de bureau des heures plus tard. Internet est le réseau.',
          'C\'est le vrai scénario auquel la plupart des gens font face : vous êtes en réunion, vous avez pris une photo du tableau blanc, votre collègue en a besoin sur son ordinateur portable — et il utilise un OS différent du vôtre. Ou vous avez filmé une vidéo lors d\'un mariage et six personnes sur six appareils différents en ont besoin d\'une copie. Filesterr gère tout cela en moins de 30 secondes avec un seul upload et un lien partageable.',
        ],
      },
    ],
    howTitle: 'Comment ça marche en 3 étapes',
    steps: [
      { title: 'Ouvrez filesterr.com sur votre téléphone', desc: 'Fonctionne dans Safari, Chrome, n\'importe quel navigateur mobile' },
      { title: 'Uploadez votre fichier', desc: 'Appuyez pour sélectionner depuis la pellicule' },
      { title: 'Partagez le lien', desc: 'Envoyez via WhatsApp ou e-mail — le destinataire télécharge sur n\'importe quel appareil' },
    ],
    relatedTitle: 'Explorer davantage:',
    linkFeatures: 'Toutes les fonctionnalités →',
    linkUpload: 'Essayer maintenant →',
  },
  es: {
    eyebrow: 'Teléfono → Mac · Android → PC · Cualquier combinación',
    h1: 'El archivo está en tu teléfono. Tu Mac lo necesita. 30 segundos.',
    intro: 'Sin cable. Sin negociación Bluetooth. Filesterr es la transferencia de archivos entre dispositivos más rápida.',
    cta: 'Transferir un archivo ahora',
    ctaSub: 'Gratis · Sin app · Sin cuenta · 30 segundos',
    scenarioLabel: 'El problema que conoces',
    pain1: 'Cables. El cable correcto. ¿USB-C? ¿Lightning? ¿Tu Mac tiene ese puerto?',
    pain2: 'Bluetooth que requiere emparejamiento y falla durante la transferencia.',
    pain3: '"Me enviaré el video de 200MB por correo." (No hagas esto.)',
    solution: 'Súbelo a Filesterr desde tu teléfono. Tu amigo abre el enlace en su Mac. Listo.',
    sections: [
      {
        h2: 'Transferir archivos de Android a Mac — sin ninguna aplicación',
        paragraphs: [
          'La búsqueda de una app para transferir archivos de Android a Mac lleva a la mayoría de la gente por un laberinto de utilidades ADB, controladores MTP y apps de sincronización de terceros que requieren instalación en ambos extremos. La solución real es más simple: Filesterr es una alternativa de uso compartido de archivos entre plataformas que vive completamente en tu navegador. Abre filesterr.com en tu Android, sube tu archivo, copia el enlace, ábrelo en tu Mac. Listo en 30 segundos.',
          'El mismo enfoque funciona como reemplazo de una app de transferencia de Android a iPhone. Sube desde tu Android, comparte el enlace por WhatsApp o iMessage — tu iPhone abre el enlace en Safari y descarga el archivo directamente. Sin requisito de proximidad Bluetooth, sin ritual de toque NFC, sin necesidad de ecosistemas de apps coincidentes.',
          'Esto es lo que realmente significa la transferencia de archivos multiplataforma: el archivo se mueve entre cualquier dispositivo, cualquier sistema operativo, sin ninguna infraestructura compartida entre ellos más que una URL. Tu Android no necesita saber que existe tu Mac. Tu Mac no necesita saber que tienes un Android.',
        ],
        bullets: [
          'Android a Mac: funciona perfectamente, siempre — sin controladores, sin cables',
          'Android a iPhone: comparte enlace por WhatsApp o iMessage, listo',
          'Teléfono a PC: abre el navegador, sube, comparte enlace — 30 segundos',
          'Cualquier combinación: Android, iPhone, Mac, Windows, Linux, tablets',
          'Archivos de hasta 50 GB en el plan Pro',
        ],
      },
      {
        h2: 'La app de uso compartido multiplataforma que no es una app',
        paragraphs: [
          'Cada app de uso compartido de archivos multiplataforma en el mercado tiene el mismo problema central: requiere instalación en al menos un extremo, con frecuencia en ambos. Las mejores — Send Anywhere, Snapdrop, LocalSend — son excelentes para escenarios específicos. Pero todas asumen algo: la misma red, una app en el extremo receptor, o una conexión simultánea activa durante la transferencia.',
          'Filesterr elimina todas las suposiciones. Es una alternativa asíncrona al uso compartido de archivos entre Android e iOS — sube ahora, descarga después, desde cualquier lugar. El archivo reside en el CDN de Filesterr y tu enlace funciona hasta que lo borres o expire. Tu destinatario lo descarga a su conveniencia, desde su dispositivo, en su zona horaria.',
          'Para el caso de uso específico de transferencia de archivos de teléfono a PC: abre Chrome en tu Android, ve a filesterr.com, arrastra y suelta o toca para subir, copia el enlace, pégalo en un correo o mensaje a ti mismo — tu PC abre el enlace en cualquier navegador y descarga el archivo. Todo el proceso es más rápido que encontrar un cable USB.',
        ],
        bullets: [
          'Funciona desde cualquier distancia — misma habitación o distintos países',
          'No se necesita conexión física ni emparejamiento de dispositivos',
          'Disponible de inmediato — sin demoras de "preparando transferencia"',
          'El enlace permanece activo para que el destinatario descargue cuando le convenga',
          'No se requiere conexión simultánea — transferencia verdaderamente asíncrona',
        ],
      },
      {
        h2: 'Por qué Filesterr supera a cualquier cable, Bluetooth y app de transferencia',
        paragraphs: [
          'AirDrop requiere que ambos dispositivos sean Apple, estén cerca y tengan el WiFi activado. La transferencia Bluetooth por encima de 50 MB es una agonía. Los cables USB requieren el conector correcto — y si estás transfiriendo a la computadora de otra persona, olvídalo por completo. Estas son limitaciones de hardware. Filesterr no tiene ningún requisito de hardware.',
          'Las apps de transferencia de archivos dedicadas son mejores que los cables pero aún imperfectas. A menudo necesitan puertos redirigidos, ambos dispositivos en la misma red, o una conexión peer-to-peer activa que se cae si algún dispositivo se duerme. A Filesterr no le importa. Sube desde la conexión 4G de tu teléfono, tu destinatario descarga en el WiFi de su oficina horas después. Internet es la red.',
          'Este es el escenario real al que se enfrenta la mayoría de la gente: estás en una reunión, tomaste una foto de la pizarra, tu colega la necesita en su laptop — y usa un sistema operativo diferente al tuyo. O grabaste un video en una boda y seis personas en seis dispositivos diferentes necesitan una copia. Filesterr maneja todo esto en menos de 30 segundos con una sola subida y un enlace compartible.',
        ],
      },
    ],
    howTitle: 'Cómo funciona en 3 pasos',
    steps: [
      { title: 'Abre filesterr.com en tu teléfono', desc: 'Funciona en Safari, Chrome, cualquier navegador móvil' },
      { title: 'Sube tu archivo', desc: 'Toca para seleccionar del carrete de fotos' },
      { title: 'Comparte el enlace', desc: 'Envía por WhatsApp o email — el destinatario descarga en cualquier dispositivo' },
    ],
    relatedTitle: 'Explorar más:',
    linkFeatures: 'Todas las funciones →',
    linkUpload: 'Probar ahora →',
  },
  ar: {
    eyebrow: 'هاتف → Mac · Android → PC · أي مجموعة',
    h1: 'الملف على هاتفك. Mac يحتاجه. 30 ثانية.',
    intro: 'لا كابل. لا مفاوضة Bluetooth. Filesterr هو أسرع نقل للملفات بين الأجهزة.',
    cta: 'انقل ملفاً الآن',
    ctaSub: 'مجاني · بدون تطبيق · بدون حساب · 30 ثانية',
    scenarioLabel: 'المشكلة التي عشتها',
    pain1: 'الكابلات. الكابل الصحيح. USB-C؟ Lightning؟ هل Mac لديك يحتوي على ذلك المنفذ؟',
    pain2: 'Bluetooth الذي يحتاج إلى إقران ويفشل في منتصف النقل.',
    pain3: '"سأرسل مقطع 200 ميغابايت لنفسي بالبريد الإلكتروني." (لا تفعل هذا.)',
    solution: 'أفلته على Filesterr من هاتفك. صديقك يفتح الرابط على Mac. انتهى.',
    sections: [
      {
        h2: 'نقل الملفات من Android إلى Mac — بدون أي تطبيق',
        paragraphs: [
          'يقود البحث عن تطبيق لنقل الملفات من Android إلى Mac معظم الناس إلى متاهة من أدوات ADB وبرامج تشغيل MTP وتطبيقات المزامنة التابعة لجهات خارجية التي تتطلب التثبيت على كلا الطرفين. الحل الفعلي أبسط من ذلك: Filesterr هو بديل مشاركة الملفات عبر المنصات يعمل بالكامل في متصفحك. افتح filesterr.com على Android الخاص بك، ارفع ملفك، انسخ الرابط، افتحه على Mac. تم في 30 ثانية.',
          'يعمل نفس النهج كبديل لتطبيق نقل الملفات من Android إلى iPhone. ارفع من Android وشارك الرابط عبر WhatsApp أو iMessage — يفتح iPhone الرابط في Safari ويحمّل الملف مباشرةً. لا يوجد شرط قرب Bluetooth، ولا طقوس NFC، ولا حاجة لأنظمة تطبيقات متطابقة.',
          'هذا ما يعنيه نقل الملفات عبر المنصات فعلاً: يتنقل الملف بين أي أجهزة وأنظمة تشغيل، دون أي بنية تحتية مشتركة بينها سوى رابط URL. لا يحتاج Android إلى معرفة وجود Mac. ولا يحتاج Mac إلى معرفة أنك تمتلك Android.',
        ],
        bullets: [
          'Android إلى Mac: يعمل بشكل مثالي دائماً — بدون برامج تشغيل أو كابلات',
          'Android إلى iPhone: شارك الرابط عبر WhatsApp أو iMessage، تم',
          'هاتف إلى PC: افتح المتصفح، ارفع، شارك الرابط — 30 ثانية',
          'أي مجموعة: Android وiPhone وMac وWindows وLinux والأجهزة اللوحية',
          'ملفات حتى 50 جيجابايت في خطة Pro',
        ],
      },
      {
        h2: 'تطبيق مشاركة الملفات متعدد المنصات الذي ليس تطبيقاً',
        paragraphs: [
          'كل تطبيق لمشاركة الملفات عبر المنصات في السوق يعاني من نفس المشكلة الجوهرية: يتطلب التثبيت على طرف واحد على الأقل، وفي الغالب على كليهما. أفضلها — Send Anywhere وSnapdrop وLocalSend — ممتازة لسيناريوهات محددة. لكنها جميعاً تفترض شيئاً ما: نفس الشبكة، أو تطبيق على الطرف المستقبل، أو اتصال متزامن نشط أثناء النقل.',
          'يزيل Filesterr جميع هذه الافتراضات. إنه بديل غير متزامن لمشاركة الملفات بين Android وiOS — ارفع الآن، حمّل لاحقاً، من أي مكان. يجلس الملف على CDN الخاص بـ Filesterr ويعمل رابطك حتى تحذفه أو ينتهي تاريخ صلاحيته. يحمّله المستلم في وقت مناسب له، من جهازه، في منطقته الزمنية.',
          'لحالة استخدام نقل الملفات من الهاتف إلى PC تحديداً: افتح Chrome على Android، اذهب إلى filesterr.com، اسحب وأفلت أو اضغط للرفع، انسخ الرابط، الصقه في بريد إلكتروني أو رسالة لنفسك — يفتح PC الرابط في أي متصفح ويحمّل الملف. العملية بأكملها أسرع من البحث عن كابل USB.',
        ],
        bullets: [
          'يعمل من أي مسافة — نفس الغرفة أو دول مختلفة',
          'لا حاجة لاتصال مادي أو إقران أجهزة',
          'متاح فوراً — لا تأخيرات بسبب "تجهيز النقل"',
          'يبقى الرابط نشطاً حتى يحمّل المستلم في وقت مناسب',
          'لا يلزم اتصال متزامن — نقل غير متزامن حقيقي',
        ],
      },
      {
        h2: 'لماذا يتفوق Filesterr على كل كابل وBluetooth وتطبيق نقل متخصص',
        paragraphs: [
          'يتطلب AirDrop أن يكون كلا الجهازين من Apple، وقريبَين من بعضهما، مع تشغيل WiFi. نقل Bluetooth فوق 50 ميغابايت عذاب حقيقي. تتطلب كابلات USB الموصّل الصحيح — وإذا كنت تنقل إلى حاسوب شخص آخر، فانسَ الأمر تماماً. هذه قيود تقنية. Filesterr لا يحتاج إلى أي متطلبات تقنية.',
          'تطبيقات نقل الملفات المتخصصة أفضل من الكابلات لكنها لا تزال غير مثالية. كثيراً ما تحتاج إلى إعادة توجيه المنافذ، أو كلا الجهازين على نفس الشبكة، أو اتصال نشط من طرف إلى طرف ينقطع إذا أُغلق أي من الجهازين. لا يهم Filesterr. ارفع من خلال اتصال 4G بهاتفك، ويحمّل المستلم على WiFi مكتبه بعد ساعات. الإنترنت هو الشبكة.',
          'هذا هو السيناريو الحقيقي الذي يواجهه معظم الناس: أنت في اجتماع، التقطت صورة للسبورة، يحتاج زميلك إليها على حاسوبه المحمول — وهو يستخدم نظام تشغيل مختلفاً عنك. أو صوّرت مقطعاً في حفل زفاف وستة أشخاص على ستة أجهزة مختلفة يحتاجون إلى نسخة. يتعامل Filesterr مع كل هذا في أقل من 30 ثانية برفع واحد ورابط قابل للمشاركة.',
        ],
      },
    ],
    howTitle: 'كيف يعمل في 3 خطوات',
    steps: [
      { title: 'افتح filesterr.com على هاتفك', desc: 'يعمل في Safari وChrome وأي متصفح جوال' },
      { title: 'ارفع ملفك', desc: 'اضغط للاختيار من مكتبة الصور' },
      { title: 'شارك الرابط', desc: 'أرسل عبر WhatsApp أو البريد — المستلم يحمّل على أي جهاز' },
    ],
    relatedTitle: 'استكشف المزيد:',
    linkFeatures: 'كل الميزات →',
    linkUpload: 'جرّب الآن →',
  },
  zh: {
    eyebrow: '手机 → Mac · Android → PC · 任意组合',
    h1: '文件在你手机上。Mac需要它。30秒搞定。',
    intro: '无需数据线。无需蓝牙配对。Filesterr是真正有效的最快跨设备文件传输方式。',
    cta: '立即传输文件',
    ctaSub: '免费 · 无需应用 · 无需账户 · 30秒',
    scenarioLabel: '你经历过的痛点',
    pain1: '数据线。正确的数据线。是USB-C？还是Lightning？你的Mac有那个接口吗？',
    pain2: '需要配对、传输中途失败的蓝牙。',
    pain3: '"我就把200MB的视频发邮件给自己吧。"（别这样做。）',
    solution: '从手机上传到Filesterr。朋友在Mac上打开链接。完成。',
    sections: [
      {
        h2: 'Android传文件到Mac — 完全不需要任何应用',
        paragraphs: [
          '搜索"Android到Mac文件传输应用"会把大多数人带进一个充斥着ADB工具、MTP驱动和需要两端都安装的第三方同步应用的迷宫。真正的解决方案更简单：Filesterr是一个完全运行在浏览器中的跨平台文件共享替代方案。在你的Android上打开filesterr.com，上传文件，复制链接，在Mac上打开链接。30秒完成。',
          '同样的方法也适用于从Android传文件到iPhone。从Android上传，通过WhatsApp或微信（WeChat）分享链接——你的iPhone在Safari中打开链接并直接下载文件。无需蓝牙近距离要求，无需NFC碰一碰，无需匹配的应用生态系统。',
          '这才是跨平台文件传输的真正含义：文件在任意设备、任意操作系统之间移动，它们之间除了一个URL之外不需要任何共享基础设施。你的Android不需要知道你的Mac存在。你的Mac不需要知道你拥有Android。',
        ],
        bullets: [
          'Android到Mac：始终完美运行 — 无需驱动，无需数据线',
          'Android到iPhone：通过WhatsApp或微信分享链接，搞定',
          '手机到PC：打开浏览器，上传，分享链接 — 30秒',
          '任意组合：Android、iPhone、Mac、Windows、Linux、平板',
          'Pro计划支持最大50GB文件',
        ],
      },
      {
        h2: '那个不是应用的跨平台文件共享"应用"',
        paragraphs: [
          '市面上每一款跨平台文件共享应用都有同样的核心问题：至少需要在一端安装，通常两端都要。最好的那些——Send Anywhere、Snapdrop、LocalSend——在特定场景下非常出色。但它们都有前提假设：同一网络，或接收端有应用，或传输过程中需要保持同时连接。',
          'Filesterr消除了所有假设。它是一个异步工作的Android与iOS之间文件共享替代方案——现在上传，之后下载，从任何地方。文件存放在Filesterr的CDN上，你的链接在你删除或过期之前一直有效。你的接收方在方便的时候，从自己的设备，在自己的时区下载。',
          '对于手机到PC的文件传输场景：在Android上打开Chrome，访问filesterr.com，拖放或点击上传，复制链接，粘贴到给自己的邮件或消息中——你的PC在任意浏览器中打开链接并下载文件。整个过程比找到一根USB数据线还快。',
        ],
        bullets: [
          '任何距离都能工作 — 同一房间或不同国家',
          '无需物理连接或设备配对',
          '立即可用 — 无"正在准备传输"的延迟',
          '链接保持活跃，接收方可在方便时下载',
          '无需同时连接 — 真正的异步传输',
        ],
      },
      {
        h2: 'Filesterr为何胜过所有数据线、蓝牙和专用传输应用',
        paragraphs: [
          'AirDrop要求两台设备都是Apple设备，彼此靠近，且WiFi开启。超过50MB的蓝牙传输简直是煎熬。USB数据线需要正确的接口——如果你是要传到别人的电脑，就完全放弃吧。这些都是硬件限制。Filesterr没有任何硬件要求。',
          '专用文件传输应用比数据线好，但仍不完美。它们通常需要端口转发、两台设备在同一网络，或在任一设备休眠时就会断开的点对点连接。Filesterr不在乎这些。用手机的4G连接上传，接收方几小时后在办公室WiFi上下载。互联网就是网络。',
          '这是大多数人真实面临的场景：你在开会，拍了白板的照片，同事需要在他的笔记本上查看——而他用的是和你不同的操作系统。或者你在婚礼上拍了视频，六个人六台不同设备都需要一份。Filesterr只需一次上传和一个可分享的链接，30秒内处理所有这些情况。',
        ],
      },
    ],
    howTitle: '3步操作',
    steps: [
      { title: '在手机上打开filesterr.com', desc: '在Safari、Chrome、任何移动浏览器中运行' },
      { title: '上传你的文件', desc: '点击从相册选择' },
      { title: '分享链接', desc: '通过WhatsApp或微信发送 — 接收方在任何设备上下载' },
    ],
    relatedTitle: '了解更多：',
    linkFeatures: '所有功能 →',
    linkUpload: '立即试用 →',
  },
  pt: {
    eyebrow: 'Celular → Mac · Android → PC · Qualquer combinação',
    h1: 'O Arquivo Está no Seu Celular. O Mac Precisa Dele. 30 Segundos.',
    intro: 'Sem cabo. Sem negociação Bluetooth. O Filesterr é a transferência de arquivos entre dispositivos mais rápida.',
    cta: 'Transferir um Arquivo Agora',
    ctaSub: 'Grátis · Sem app · Sem conta · 30 segundos',
    scenarioLabel: 'O problema que você já viveu',
    pain1: 'Cabos. O cabo certo. É USB-C? Lightning? Seu Mac tem essa entrada?',
    pain2: 'Bluetooth que precisa de pareamento e falha no meio da transferência.',
    pain3: '"Vou só me enviar esse vídeo de 200MB por e-mail." (Não faça isso.)',
    solution: 'Jogue no Filesterr pelo celular. Seu amigo abre o link no Mac. Pronto.',
    sections: [
      {
        h2: 'Transferir arquivos do Android para o Mac — sem nenhum aplicativo',
        paragraphs: [
          'A busca por um app para transferir arquivos do Android para o Mac leva a maioria das pessoas por um labirinto de utilitários ADB, drivers MTP e apps de sincronização de terceiros que exigem instalação nos dois lados. A solução real é mais simples: o Filesterr é uma alternativa de compartilhamento de arquivos multiplataforma que funciona inteiramente no seu navegador. Abra o filesterr.com no seu Android, suba o arquivo, copie o link, abra no Mac. Pronto em 30 segundos.',
          'A mesma abordagem funciona como substituta de um app de transferência do Android para o iPhone. Suba do seu Android, compartilhe o link pelo WhatsApp ou iMessage — seu iPhone abre o link no Safari e baixa o arquivo diretamente. Sem exigência de proximidade Bluetooth, sem ritual de toque NFC, sem necessidade de ecossistemas de apps compatíveis.',
          'É isso que transferência de arquivos multiplataforma realmente significa: o arquivo se move entre quaisquer dispositivos, quaisquer sistemas operacionais, sem nenhuma infraestrutura compartilhada entre eles além de uma URL. Seu Android não precisa saber que seu Mac existe. Seu Mac não precisa saber que você tem um Android.',
        ],
        bullets: [
          'Android para Mac: funciona perfeitamente, sempre — sem drivers, sem cabos',
          'Android para iPhone: compartilhe o link pelo WhatsApp ou iMessage, pronto',
          'Celular para PC: abra o navegador, suba, compartilhe o link — 30 segundos',
          'Qualquer combinação: Android, iPhone, Mac, Windows, Linux, tablets',
          'Arquivos de até 50 GB no plano Pro',
        ],
      },
      {
        h2: 'O app de compartilhamento multiplataforma que não é um app',
        paragraphs: [
          'Todo app de compartilhamento de arquivos multiplataforma no mercado tem o mesmo problema central: exige instalação em pelo menos um lado, frequentemente nos dois. Os melhores — Send Anywhere, Snapdrop, LocalSend — são excelentes para cenários específicos. Mas todos pressupõem algo: mesma rede, ou um app no lado do receptor, ou uma conexão simultânea ativa durante a transferência.',
          'O Filesterr remove todas as suposições. É uma alternativa assíncrona ao compartilhamento de arquivos entre Android e iOS — suba agora, baixe depois, de qualquer lugar. O arquivo fica no CDN do Filesterr e seu link funciona até você excluí-lo ou ele expirar. Seu destinatário baixa quando for conveniente, do próprio dispositivo, no próprio fuso horário.',
          'Para o caso de uso específico de transferência de celular para PC: abra o Chrome no seu Android, acesse filesterr.com, arraste e solte ou toque para subir, copie o link, cole num e-mail ou mensagem para você mesmo — seu PC abre o link em qualquer navegador e baixa o arquivo. O processo inteiro é mais rápido do que encontrar um cabo USB.',
        ],
        bullets: [
          'Funciona de qualquer distância — mesma sala ou países diferentes',
          'Sem necessidade de conexão física ou pareamento de dispositivos',
          'Disponível imediatamente — sem atrasos de "preparando transferência"',
          'Link continua ativo para o destinatário baixar quando for conveniente',
          'Sem necessidade de conexão simultânea — transferência verdadeiramente assíncrona',
        ],
      },
      {
        h2: 'Por que o Filesterr supera qualquer cabo, Bluetooth e app de transferência',
        paragraphs: [
          'O AirDrop exige que os dois dispositivos sejam Apple, estejam próximos e com WiFi ligado. Transferência Bluetooth acima de 50 MB é uma agonia. Cabos USB exigem o conector certo — e se você estiver transferindo para o computador de outra pessoa, esqueça completamente. Estas são restrições de hardware. O Filesterr não tem nenhum requisito de hardware.',
          'Apps dedicados de transferência de arquivos são melhores que cabos, mas ainda imperfeitos. Muitas vezes precisam de portas encaminhadas, os dois dispositivos na mesma rede, ou uma conexão peer-to-peer ativa que cai se algum dispositivo dormir. O Filesterr não liga para isso. Suba pela conexão 4G do seu celular, seu destinatário baixa no WiFi do escritório horas depois. A internet é a rede.',
          'Este é o cenário real que a maioria das pessoas enfrenta: você está numa reunião, tirou uma foto do quadro branco, seu colega precisa no notebook — e usa um sistema operacional diferente do seu. Ou você gravou um vídeo num casamento e seis pessoas em seis dispositivos diferentes precisam de uma cópia. O Filesterr resolve tudo isso em menos de 30 segundos com um único upload e um link compartilhável.',
        ],
      },
    ],
    howTitle: 'Como funciona em 3 passos',
    steps: [
      { title: 'Abra filesterr.com no celular', desc: 'Funciona no Safari, Chrome, qualquer navegador mobile' },
      { title: 'Faça upload do arquivo', desc: 'Toque para selecionar da galeria de fotos' },
      { title: 'Compartilhe o link', desc: 'Envie pelo WhatsApp ou e-mail — destinatário baixa em qualquer dispositivo' },
    ],
    relatedTitle: 'Explorar mais:',
    linkFeatures: 'Todos os Recursos →',
    linkUpload: 'Experimentar Agora →',
  },
  ja: {
    eyebrow: 'スマホ → Mac · Android → PC · あらゆる組み合わせ',
    h1: 'ファイルがスマホにある。Macがそれを必要としている。30秒で解決。',
    intro: 'ケーブル不要。Bluetoothのペアリング不要。FilesterrはAndroid→Mac、iPhone→PCなどあらゆる組み合わせで機能する最速のクロスデバイスファイル転送です。',
    cta: 'ファイルを今すぐ転送',
    ctaSub: '無料 · アプリ不要 · アカウント不要 · 30秒',
    scenarioLabel: 'あなたが経験した問題',
    pain1: 'ケーブル。正しいケーブル。USB-C？Lightning？MacにそのポートはありますかL？',
    pain2: 'ペアリングが必要で転送中に失敗するBluetooth。',
    pain3: '「200MBのビデオを自分にメールすればいいか」（これはやめてください）',
    solution: 'スマホからFilesterrにドロップ。友達がMacでリンクを開く。完了。',
    sections: [
      {
        h2: 'AndroidからMacへのファイル転送 — アプリなしで',
        paragraphs: [
          '「AndroidからMacへのファイル転送アプリ」を検索すると、ほとんどの方がADBユーティリティ、MTPドライバー、両端にインストールが必要なサードパーティの同期アプリの迷宮に迷い込みます。実際の解決策はもっとシンプルです。FilesterrはブラウザだけでV動作するクロスプラットフォームのファイル共有サービスです。AndroidでFilesterr.comを開き、ファイルをアップロードし、リンクをコピーして、MacでそのリンクをBrowserで開くだけです。30秒で完了します。',
          '同じアプローチはAndroidからiPhoneへのファイル転送の代替としても機能します。Androidからアップロードし、WhatsAppやLINEでリンクを共有すると、iPhoneがSafariでリンクを開いてファイルを直接ダウンロードします。Bluetoothの近接要件なし、NFCのタップ儀式なし、共通のアプリエコシステムも不要です。',
          'これがクロスプラットフォームのファイル転送が本当に意味することです。ファイルはURLだけを共通インフラとして、任意のデバイス間、任意のオペレーティングシステム間を移動します。AndroidはMacの存在を知る必要がありません。MacはAndroidをお持ちであることを知る必要がありません。',
        ],
        bullets: [
          'AndroidからMacへ：常に完璧に機能 — ドライバーもケーブルも不要',
          'AndroidからiPhoneへ：WhatsAppやLINEでリンクを共有するだけ',
          'スマホからPCへ：ブラウザを開き、アップロードし、リンクを共有 — 30秒',
          'あらゆる組み合わせ：Android、iPhone、Mac、Windows、Linux、タブレット',
          'Proプランでは最大50GBまでのファイル',
        ],
      },
      {
        h2: 'アプリではないクロスプラットフォームのファイル共有サービス',
        paragraphs: [
          '市場に出回っているクロスプラットフォームのファイル共有アプリには、同じ根本的な問題があります。少なくとも一方、多くの場合は両方にインストールが必要です。優れたもの——Send Anywhere、Snapdrop、LocalSend——は特定のシナリオには優秀です。しかしそれらはすべて何かを前提としています。同じネットワーク、受信側にアプリ、または転送中の同時接続です。',
          'Filesterrはすべての前提を取り除きます。AndroidとiOS間のファイル共有を非同期で行う代替サービスです——今アップロードして、後でどこからでもダウンロードできます。ファイルはFilesterrのCDNに置かれ、削除するか期限切れになるまでリンクが機能します。受信者は自分のデバイスから、自分のタイムゾーンで、都合の良いときにダウンロードします。',
          'スマホからPCへのファイル転送のユースケースについて具体的に言うと：AndroidでChromeを開き、filesterr.comにアクセスし、ドラッグ＆ドロップまたはタップしてアップロードし、リンクをコピーして自分へのメールやメッセージに貼り付けます——PCは任意のブラウザでリンクを開いてファイルをダウンロードします。プロセス全体がUSBケーブルを探すより速いです。',
        ],
        bullets: [
          'どんな距離でも機能 — 同じ部屋でも別の国でも',
          '物理的な接続やデバイスのペアリングが不要',
          'すぐに利用可能 — 「転送を準備中」の遅延なし',
          'リンクは有効なまま、受信者が都合の良いときにダウンロード可能',
          '同時接続不要 — 真の非同期転送',
        ],
      },
      {
        h2: 'FilesterrがあらゆるケーブルBluetooth専用転送アプリより優れている理由',
        paragraphs: [
          'AirDropは両方のデバイスがApple製品で、近くにあり、WiFiがオンである必要があります。50MBを超えるBluetooth転送は苦痛です。USBケーブルは正しいコネクタが必要です——他の人のコンピューターに転送する場合は完全に諦めてください。これらはハードウェアの制約です。Filesterrにはハードウェア要件がゼロです。',
          '専用ファイル転送アプリはケーブルより優れていますが、それでもまだ不完全です。多くの場合、ポートの転送、同じネットワーク上の両デバイス、またはどちらかのデバイスがスリープすると切断されるアクティブなピアツーピア接続が必要です。Filesterrは気にしません。スマホの4G接続からアップロードし、受信者は数時間後にオフィスのWiFiでダウンロードします。インターネットがネットワークです。',
          'これがほとんどの方が直面する実際のシナリオです。会議中にホワイトボードの写真を撮り、同僚がノートパソコンで必要としている——でも彼らはあなたとは異なるOSを使っています。または結婚式でビデオを撮影し、6台の異なるデバイスの6人がコピーを必要としています。Filesterrは1回のアップロードと共有可能なリンクで、これらすべてを30秒以内に処理します。',
        ],
      },
    ],
    howTitle: '3ステップでの使い方',
    steps: [
      { title: 'スマホでfilesterr.comを開く', desc: 'Safari、Chrome、どのモバイルブラウザでも動作' },
      { title: 'ファイルをアップロード', desc: 'カメラロールから選択するにはタップ' },
      { title: 'リンクを共有', desc: 'WhatsAppやLINEで送信 — 受信者は任意のデバイスでダウンロード' },
    ],
    relatedTitle: 'さらに探索:',
    linkFeatures: 'すべての機能 →',
    linkUpload: '今すぐ試す →',
  },
  ru: {
    eyebrow: 'Телефон → Mac · Android → PC · Любая комбинация',
    h1: 'Файл на телефоне. Mac нуждается в нём. 30 секунд.',
    intro: 'Без кабеля. Без сопряжения Bluetooth. Filesterr — самая быстрая кросс-устройственная передача файлов.',
    cta: 'Передать файл сейчас',
    ctaSub: 'Бесплатно · Без приложения · Без аккаунта · 30 секунд',
    scenarioLabel: 'Проблема, с которой вы сталкивались',
    pain1: 'Кабели. Правильный кабель. USB-C? Lightning? Есть ли у вашего Mac этот разъём?',
    pain2: 'Bluetooth, который требует сопряжения и отваливается в середине передачи.',
    pain3: '"Я просто отправлю себе видео на 200 МБ по почте." (Не делайте этого.)',
    solution: 'Загрузите на Filesterr с телефона. Друг открывает ссылку на Mac. Готово.',
    sections: [
      {
        h2: 'Передача файлов с Android на Mac — без единого приложения',
        paragraphs: [
          'Поиск приложения для передачи файлов с Android на Mac ведёт большинство людей в лабиринт утилит ADB, драйверов MTP и сторонних приложений синхронизации, требующих установки на обоих устройствах. Реальное решение проще: Filesterr — это кроссплатформенная альтернатива для обмена файлами, которая работает полностью в браузере. Откройте filesterr.com на Android, загрузите файл, скопируйте ссылку, откройте на Mac. Готово за 30 секунд.',
          'Тот же подход работает как замена приложения для передачи файлов с Android на iPhone. Загрузите с Android, поделитесь ссылкой через WhatsApp или iMessage — iPhone откроет ссылку в Safari и скачает файл напрямую. Никаких требований к близости Bluetooth, никаких ритуалов NFC, никаких совпадающих экосистем приложений.',
          'Вот что на самом деле означает кроссплатформенная передача файлов: файл перемещается между любыми устройствами, любыми операционными системами, без какой-либо общей инфраструктуры между ними, кроме URL. Вашему Android не нужно знать, что существует Mac. Вашему Mac не нужно знать, что вы владеете Android.',
        ],
        bullets: [
          'Android на Mac: работает идеально всегда — без драйверов и кабелей',
          'Android на iPhone: отправьте ссылку через WhatsApp или iMessage, готово',
          'Телефон на PC: откройте браузер, загрузите, поделитесь ссылкой — 30 секунд',
          'Любая комбинация: Android, iPhone, Mac, Windows, Linux, планшеты',
          'Файлы до 50 ГБ на плане Pro',
        ],
      },
      {
        h2: 'Кроссплатформенный сервис обмена файлами, который не является приложением',
        paragraphs: [
          'У каждого кроссплатформенного приложения для обмена файлами на рынке одна и та же главная проблема: оно требует установки как минимум на одном конце, часто на обоих. Лучшие из них — Send Anywhere, Snapdrop, LocalSend — отлично подходят для конкретных сценариев. Но все они что-то предполагают: одну сеть, приложение на стороне получателя или активное одновременное соединение во время передачи.',
          'Filesterr устраняет все предположения. Это асинхронная альтернатива обмену файлами между Android и iOS — загружайте сейчас, скачивайте позже, откуда угодно. Файл хранится на CDN Filesterr, и ваша ссылка работает до тех пор, пока вы её не удалите или она не истечёт. Ваш получатель скачивает в удобное время, со своего устройства, в своём часовом поясе.',
          'Конкретно для сценария передачи файлов с телефона на PC: откройте Chrome на Android, перейдите на filesterr.com, перетащите файл или нажмите для загрузки, скопируйте ссылку, вставьте в письмо или сообщение себе — PC откроет ссылку в любом браузере и скачает файл. Весь процесс быстрее, чем найти кабель USB.',
        ],
        bullets: [
          'Работает на любом расстоянии — одна комната или разные страны',
          'Не нужно физическое соединение или сопряжение устройств',
          'Доступно немедленно — никаких задержек "подготовки передачи"',
          'Ссылка остаётся активной, получатель скачивает когда удобно',
          'Не нужно одновременное соединение — настоящая асинхронная передача',
        ],
      },
      {
        h2: 'Почему Filesterr лучше любого кабеля, Bluetooth и специального приложения',
        paragraphs: [
          'AirDrop требует, чтобы оба устройства были Apple, находились рядом и имели включённый WiFi. Передача по Bluetooth свыше 50 МБ — это мучение. Кабели USB требуют правильного разъёма — а если вы передаёте на чужой компьютер, забудьте об этом полностью. Это аппаратные ограничения. У Filesterr нулевые аппаратные требования.',
          'Специализированные приложения для передачи файлов лучше кабелей, но всё ещё несовершенны. Им часто нужна переадресация портов, оба устройства в одной сети или активное P2P-соединение, которое обрывается, если одно из устройств засыпает. Filesterr не волнует. Загружайте через 4G-соединение телефона, ваш получатель скачивает через офисный WiFi несколько часов спустя. Интернет — это и есть сеть.',
          'Вот реальный сценарий, с которым сталкивается большинство людей: вы на совещании, сфотографировали доску, коллеге нужно это на ноутбуке — и у него другая ОС, чем у вас. Или вы сняли видео на свадьбе, и шести людям на шести разных устройствах нужна копия. Filesterr справляется со всем этим менее чем за 30 секунд с одной загрузкой и ссылкой для совместного использования.',
        ],
      },
    ],
    howTitle: 'Как это работает за 3 шага',
    steps: [
      { title: 'Откройте filesterr.com на телефоне', desc: 'Работает в Safari, Chrome, любом мобильном браузере' },
      { title: 'Загрузите файл', desc: 'Нажмите, чтобы выбрать из галереи' },
      { title: 'Поделитесь ссылкой', desc: 'Отправьте в WhatsApp или по почте — получатель скачивает на любом устройстве' },
    ],
    relatedTitle: 'Узнайте больше:',
    linkFeatures: 'Все функции →',
    linkUpload: 'Попробовать сейчас →',
  },
}

const c = computed(() => content[locale.value] || content.en)

const metaContent = {
  en: { title: 'Cross-Device File Transfer — Phone to Mac, Android to PC | Filesterr', description: 'Transfer files between any devices in 30 seconds. No cable, no app, no account. Android to Mac, iPhone to PC — upload from phone, share link, done. Free.' },
  tr: { title: 'Platformlar Arası Dosya Aktarımı — Telefon\'dan Mac\'e, Android\'den PC\'ye | Filesterr', description: '30 saniyede cihazlar arasında dosya aktarın. Kablo, uygulama veya hesap gerekmez.' },
  de: { title: 'Geräteübergreifende Dateiübertragung — Telefon zu Mac, Android zu PC | Filesterr', description: 'Dateien in 30 Sekunden zwischen Geräten übertragen. Kein Kabel, keine App, kein Konto.' },
  fr: { title: 'Transfert de fichiers multi-appareils — Téléphone vers Mac, Android vers PC | Filesterr', description: 'Transférez des fichiers entre n\'importe quels appareils en 30 secondes. Sans câble, sans app, sans compte.' },
  es: { title: 'Transferencia entre dispositivos — Teléfono a Mac, Android a PC | Filesterr', description: 'Transfiere archivos entre cualquier dispositivo en 30 segundos. Sin cable, sin app, sin cuenta.' },
  ar: { title: 'نقل الملفات بين الأجهزة — هاتف إلى Mac، Android إلى PC | Filesterr', description: 'انقل الملفات بين أي أجهزة في 30 ثانية. بدون كابل، بدون تطبيق، بدون حساب.' },
  zh: { title: '跨设备文件传输 — 手机到Mac，Android到PC | Filesterr', description: '30秒内在任何设备间传输文件。无需数据线、应用或账户。Android到Mac，iPhone到PC。' },
  pt: { title: 'Transferência entre Dispositivos — Celular para Mac, Android para PC | Filesterr', description: 'Transfira arquivos entre qualquer dispositivo em 30 segundos. Sem cabo, sem app, sem conta.' },
  ja: { title: 'クロスデバイスファイル転送 — スマホからMac、AndroidからPC | Filesterr', description: '30秒で任意のデバイス間でファイルを転送。ケーブル不要、アプリ不要、アカウント不要。' },
  ru: { title: 'Передача файлов между устройствами — телефон на Mac, Android на PC | Filesterr', description: 'Передавайте файлы между любыми устройствами за 30 секунд. Без кабеля, без приложения, без аккаунта.' },
}

const meta = computed(() => metaContent[locale.value] || metaContent.en)
const canonicalLocale = computed(() => locale.value && locale.value !== 'en' ? `/${locale.value}/cross-device-transfer` : '/cross-device-transfer')

useHead({
  title: computed(() => meta.value.title),
  meta: [
    { name: 'description', content: computed(() => meta.value.description) },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: computed(() => `https://filesterr.com${canonicalLocale.value}`) }],
})
</script>
