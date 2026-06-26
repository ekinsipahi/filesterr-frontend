<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">
    <div class="bg-gradient-to-b from-brand-50/40 to-transparent dark:from-zinc-900/30 dark:to-transparent pt-20 pb-12">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-semibold mb-6">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
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
    eyebrow: 'No file sharing app needed — your browser does it better',
    h1: 'Looking for the Best File Sharing App? You Don\'t Need One.',
    intro: 'Stop searching for a file sharing app for Android or iOS. Filesterr runs entirely in your browser — faster, lighter, and more capable than any native app you\'ll find on the app store.',
    cta: 'Upload a File Free',
    ctaSub: 'Works on Android, iPhone, Mac, Windows — any browser',
    sections: [
      {
        h2: 'The file transfer app for Android, iPhone, iOS, and Windows — that isn\'t an app',
        paragraphs: [
          'Looking for the best file transfer app for Android? You don\'t need one. Looking for a file transfer app for iPhone or a file sharing app for iOS? Same answer. Filesterr works in Safari, Chrome, Firefox, and every other mobile browser — no install, no permissions, no storage eaten from your device.',
          'The same is true on iOS. A file sharing app ios users find in the App Store typically wants access to your photos, contacts, and sometimes location. Filesterr works as a file transfer app iphone users already have: Safari. Open the browser, upload the file, copy the link, send it. No permissions requested, no storage used, no account created. The file sharing app for Windows argument is identical — every Windows machine ships with a browser, so the dedicated file sharing app windows users install is often unnecessary.',
          'The best file sharing app reddit threads recommend are mostly just mobile apps that do exactly what your browser already does. The difference is that Filesterr\'s web-based approach means your recipient never has to install anything either. You share a link. They click it. The file downloads. No "you need to install X to view this file" friction.',
        ],
        bullets: [
          'No app download for sender or recipient',
          'Works on Chrome, Safari, Firefox, Edge — any modern browser',
          'No camera, contacts, or storage permissions requested',
          'Instant upload from Android or iPhone camera roll',
          'Share the link via WhatsApp, iMessage, email, or anywhere',
        ],
      },
      {
        h2: 'Why browser-based beats every easy file sharing app',
        paragraphs: [
          'Every easy file sharing app on the market has the same problem: it requires the other person to also have the app. AirDrop only works Apple-to-Apple. Bluetooth transfer stalls above a few MB. Most transfer apps require both devices to be on the same network or actively connected during transfer.',
          'Filesterr works asynchronously and cross-platform. Upload from your Android at noon, your recipient downloads from their Mac at midnight in a different country. The file waiting in between is the entire point. No active connection required, no proximity needed, no matching app ecosystem.',
          'For professionals who send files to clients and contractors, an easy file sharing app is the wrong tool — because clients don\'t want to install anything. Filesterr links work in any browser. That\'s the difference between a solution and an obstacle.',
        ],
        bullets: [
          'Cross-platform: Android to Mac, iPhone to Windows, anything to anything',
          'No proximity required — works across countries and time zones',
          'No pairing, no handshake, no waiting for Bluetooth discovery',
          'Files stay available for hours or days, not just during transfer',
          'Recipients never install anything — just open a link',
        ],
      },
      {
        h2: 'What Filesterr gives you that no file sharing app can match',
        paragraphs: [
          'Native file sharing apps tell you the file was sent. Filesterr tells you whether it was downloaded, from which device, and from what location. For anyone sending proposals, deliverables, or contracts, this visibility is the difference between guessing and knowing.',
          'Download analytics, optional password protection, expiry dates, and one-time download links — all available without any app installation. You get more control over your files from a browser tab than any file transfer app android or iOS has ever offered.',
        ],
        bullets: [
          'Real-time download analytics — who, when, from where',
          'Password-protected links for sensitive files',
          'Auto-expiry: files delete themselves on a schedule you set',
          'One-time download links — file destroyed after first access',
          'Works from any device, any OS, any browser',
        ],
      },
    ],
    relatedTitle: 'Read more:',
    linkFeatures: 'All Features →',
    linkPricing: 'Pricing →',
  },
  tr: {
    eyebrow: 'Herhangi bir tarayıcıda çalışır — uygulama gerekmez',
    h1: 'En İyi Dosya Paylaşım Uygulaması Zaten Sahip Olduğunuz: Tarayıcınız',
    intro: 'Android veya iPhone için doğru dosya paylaşım uygulamasını aramayı bırakın. Filesterr tamamen tarayıcınızda çalışır — mağazada bulacağınız herhangi bir uygulamadan daha hızlı, daha hafif ve daha yetenekli.',
    cta: 'Ücretsiz Dosya Yükle',
    ctaSub: 'Android, iPhone, Mac, Windows\'ta çalışır — tüm tarayıcılarda',
    sections: [
      {
        h2: 'Android, iPhone, iOS ve Windows için dosya aktarım uygulaması — uygulama olmadan',
        paragraphs: [
          'Android için en iyi dosya aktarım uygulamasını mı arıyorsunuz? Gerekmiyor. iPhone için dosya aktarım uygulaması veya iOS için dosya paylaşım uygulaması mı? Cevap aynı. Filesterr Safari, Chrome, Firefox ve diğer tüm mobil tarayıcılarda çalışır — kurulum yok, izin yok, cihazınızdan depolama alanı tüketilmez.',
          'iOS\'ta da durum aynı. App Store\'da iOS kullanıcılarının bulduğu dosya paylaşım uygulamaları genellikle fotoğraflarınıza, kişilerinize ve hatta konumunuza erişmek ister. Filesterr, iPhone kullanıcılarının zaten sahip olduğu dosya aktarım aracı olarak çalışır: Safari. Tarayıcıyı açın, dosyayı yükleyin, bağlantıyı kopyalayın, gönderin. Hiçbir izin istenmez, depolama kullanılmaz, hesap oluşturulmaz. Windows için dosya paylaşım uygulaması tartışması da aynıdır — her Windows makinesinde bir tarayıcı bulunur, dolayısıyla özel uygulama çoğu zaman gereksizdir.',
          'Reddit\'teki dosya paylaşım uygulaması önerilerinin büyük çoğunluğu, tarayıcınızın zaten yaptığı şeyleri yapan mobil uygulamalardır. Fark şu: Filesterr\'ın web tabanlı yaklaşımı, alıcının da hiçbir şey yüklemesine gerek kalmamasını sağlar. Siz bir bağlantı paylaşırsınız. Onlar tıklar. Dosya indirilir. "Bu dosyayı görüntülemek için X\'i yüklemeniz gerekiyor" sürtüşmesi yoktur.',
        ],
        bullets: [
          'Gönderici veya alıcı için uygulama indirme yok',
          'Chrome, Safari, Firefox, Edge\'de çalışır — tüm modern tarayıcılarda',
          'Kamera, kişiler veya depolama izinleri istenmez',
          'Android veya iPhone kamera rullosundan anında yükleme',
          'Bağlantıyı WhatsApp, iMessage, e-posta veya her yerden paylaşın',
        ],
      },
      {
        h2: 'Tarayıcı tabanlı yaklaşım neden tüm kolay dosya paylaşım uygulamalarını geride bırakır',
        paragraphs: [
          'Piyasadaki her kolay dosya paylaşım uygulaması aynı sorunu taşır: diğer kişinin de uygulamaya sahip olmasını gerektirir. AirDrop yalnızca Apple\'dan Apple\'a çalışır. Bluetooth aktarımı birkaç MB\'ın üzerinde takılır. Çoğu aktarım uygulaması her iki cihazın da aynı ağda olmasını veya aktarım sırasında aktif olarak bağlı bulunmasını gerektirir.',
          'Filesterr eş zamansız ve çoklu platform şeklinde çalışır. Android\'inizden öğlen yükleyin, alıcınız farklı bir ülkede gece yarısı Mac\'inden indirsin. Aradaki bekleyen dosya tam da bu yüzden var. Aktif bağlantı gerekmez, yakınlık şartı yoktur, eşleşen bir uygulama ekosistemine ihtiyaç duyulmaz.',
          'Müşterilere ve taşeronlara dosya gönderen profesyoneller için kolay dosya paylaşım uygulaması yanlış araçtır — çünkü müşteriler hiçbir şey yüklemek istemez. Filesterr bağlantıları her tarayıcıda çalışır. Bu, bir çözüm ile bir engel arasındaki farktır.',
        ],
        bullets: [
          'Çoklu platform: Android\'den Mac\'e, iPhone\'dan Windows\'a, her şeyden her şeye',
          'Yakınlık şartı yok — ülkeler ve saat dilimleri arasında çalışır',
          'Eşleşme yok, el sıkışma yok, Bluetooth keşfi için bekleme yok',
          'Dosyalar saatler veya günler boyunca erişilebilir kalır, yalnızca aktarım sırasında değil',
          'Alıcılar hiçbir şey yüklemez — sadece bir bağlantıya tıklar',
        ],
      },
      {
        h2: 'Filesterr\'ın hiçbir dosya paylaşım uygulamasının eşleşemeyeceği özellikleri',
        paragraphs: [
          'Yerel dosya paylaşım uygulamaları size dosyanın gönderildiğini söyler. Filesterr, indirilip indirilmediğini, hangi cihazdan ve nereden indirildiğini söyler. Teklif, teslimat veya sözleşme gönderen herkes için bu görünürlük, tahmin etmek ile bilmek arasındaki farktır.',
          'İndirme analitiği, isteğe bağlı şifre koruması, son kullanma tarihleri ve tek kullanımlık indirme bağlantıları — tümü herhangi bir uygulama kurulumu gerektirmeden kullanılabilir. Android veya iOS dosya aktarım uygulamalarının hiçbirinin sunmadığı kadar fazla kontrolü bir tarayıcı sekmesinden elde edersiniz.',
        ],
        bullets: [
          'Gerçek zamanlı indirme analitiği — kim, ne zaman, nereden',
          'Hassas dosyalar için şifre korumalı bağlantılar',
          'Otomatik süre sonu: dosyalar belirlediğiniz programa göre silinir',
          'Tek kullanımlık indirme bağlantıları — ilk erişimden sonra dosya imha edilir',
          'Her cihazdan, her işletim sisteminden, her tarayıcıdan çalışır',
        ],
      },
    ],
    relatedTitle: 'Daha fazla oku:',
    linkFeatures: 'Tüm Özellikler →',
    linkPricing: 'Fiyatlandırma →',
  },
  de: {
    eyebrow: 'Funktioniert in jedem Browser — keine App nötig',
    h1: 'Die beste Dateifreigabe-App ist die, die Sie bereits haben — Ihren Browser',
    intro: 'Hören Sie auf, nach der richtigen Dateiübertragungs-App für Android oder iPhone zu suchen. Filesterr läuft vollständig in Ihrem Browser — schneller, leichter und leistungsfähiger als jede native App im App Store.',
    cta: 'Datei kostenlos hochladen',
    ctaSub: 'Funktioniert auf Android, iPhone, Mac, Windows — in jedem Browser',
    sections: [
      {
        h2: 'Die Dateiübertragungs-App für Android, iPhone, iOS und Windows — die keine App ist',
        paragraphs: [
          'Suchen Sie nach der besten Dateiübertragungs-App für Android? Sie brauchen keine. Suchen Sie nach einer Dateiübertragungs-App für iPhone oder einer Dateifreigabe-App für iOS? Gleiche Antwort. Filesterr funktioniert in Safari, Chrome, Firefox und jedem anderen mobilen Browser — keine Installation, keine Berechtigungen, kein Speicherplatz auf Ihrem Gerät verbraucht.',
          'Dasselbe gilt für iOS. Eine Dateifreigabe-App, die iOS-Nutzer im App Store finden, möchte in der Regel Zugriff auf Fotos, Kontakte und manchmal den Standort. Filesterr funktioniert als Dateiübertragungs-App, die iPhone-Nutzer bereits haben: Safari. Öffnen Sie den Browser, laden Sie die Datei hoch, kopieren Sie den Link, senden Sie ihn. Keine Berechtigungen angefordert, kein Speicher belegt, kein Konto erstellt. Das Argument für eine Dateifreigabe-App für Windows ist identisch — jeder Windows-Rechner wird mit einem Browser ausgeliefert, sodass die spezielle App oft überflüssig ist.',
          'Die besten Dateifreigabe-Apps, die Reddit-Threads empfehlen, sind meist mobile Anwendungen, die genau das tun, was Ihr Browser bereits kann. Der Unterschied besteht darin, dass Filesters webbasierter Ansatz bedeutet, dass auch Ihr Empfänger niemals etwas installieren muss. Sie teilen einen Link. Der Empfänger klickt darauf. Die Datei wird heruntergeladen. Kein "Sie müssen X installieren, um diese Datei anzuzeigen".',
        ],
        bullets: [
          'Kein App-Download für Sender oder Empfänger',
          'Funktioniert auf Chrome, Safari, Firefox, Edge — jedem modernen Browser',
          'Keine Kamera-, Kontakt- oder Speicherzugriffsanfragen',
          'Sofortiger Upload von Android oder iPhone',
          'Link teilen per WhatsApp, iMessage, E-Mail oder überall',
        ],
      },
      {
        h2: 'Warum der browserbasierte Ansatz jede einfache Dateifreigabe-App übertrifft',
        paragraphs: [
          'Jede einfache Dateifreigabe-App auf dem Markt hat dasselbe Problem: Sie erfordert, dass auch die andere Person die App hat. AirDrop funktioniert nur Apple-zu-Apple. Bluetooth-Übertragung kommt bei wenigen MB ins Stocken. Die meisten Übertragungs-Apps erfordern, dass beide Geräte im selben Netzwerk sind oder während der Übertragung aktiv verbunden bleiben.',
          'Filesterr funktioniert asynchron und plattformübergreifend. Laden Sie von Ihrem Android mittags hoch, Ihr Empfänger lädt um Mitternacht in einem anderen Land von seinem Mac herunter. Die dazwischen wartende Datei ist der eigentliche Zweck. Keine aktive Verbindung erforderlich, keine Nähe nötig, kein übereinstimmendes App-Ökosystem.',
          'Für Fachleute, die Dateien an Kunden und Auftragnehmer senden, ist eine einfache Dateifreigabe-App das falsche Werkzeug — denn Kunden möchten nichts installieren. Filesterr-Links funktionieren in jedem Browser. Das ist der Unterschied zwischen einer Lösung und einem Hindernis.',
        ],
        bullets: [
          'Plattformübergreifend: Android zu Mac, iPhone zu Windows, alles zu allem',
          'Keine Nähe erforderlich — funktioniert über Länder und Zeitzonen hinweg',
          'Kein Pairing, kein Handshake, kein Warten auf Bluetooth-Erkennung',
          'Dateien bleiben stunden- oder tagelang verfügbar, nicht nur während der Übertragung',
          'Empfänger installieren niemals etwas — sie öffnen einfach einen Link',
        ],
      },
      {
        h2: 'Was Filesterr Ihnen bietet, das keine Dateifreigabe-App erreichen kann',
        paragraphs: [
          'Native Dateifreigabe-Apps teilen Ihnen mit, dass die Datei gesendet wurde. Filesterr teilt Ihnen mit, ob sie heruntergeladen wurde, von welchem Gerät und von welchem Standort. Für alle, die Angebote, Liefergegenstände oder Verträge senden, ist diese Transparenz der Unterschied zwischen Raten und Wissen.',
          'Download-Analysen, optionaler Passwortschutz, Ablaufdaten und Einmal-Download-Links — alles ohne App-Installation verfügbar. Sie haben mehr Kontrolle über Ihre Dateien von einem Browser-Tab aus als jede Dateiübertragungs-App für Android oder iOS je geboten hat.',
        ],
        bullets: [
          'Echtzeit-Download-Analysen — wer, wann, von wo',
          'Passwortgeschützte Links für sensible Dateien',
          'Automatischer Ablauf: Dateien löschen sich nach einem von Ihnen festgelegten Zeitplan',
          'Einmal-Download-Links — Datei nach dem ersten Zugriff vernichtet',
          'Funktioniert von jedem Gerät, jedem Betriebssystem, jedem Browser',
        ],
      },
    ],
    relatedTitle: 'Mehr lesen:',
    linkFeatures: 'Alle Funktionen →',
    linkPricing: 'Preise →',
  },
  fr: {
    eyebrow: 'Fonctionne dans n\'importe quel navigateur — sans app',
    h1: 'La meilleure app de partage de fichiers est celle que vous avez déjà — votre navigateur',
    intro: 'Arrêtez de chercher la bonne app de partage pour Android ou iPhone. Filesterr fonctionne entièrement dans votre navigateur — plus rapide, plus légère et plus performante que n\'importe quelle app native sur l\'App Store.',
    cta: 'Uploader un fichier gratuitement',
    ctaSub: 'Fonctionne sur Android, iPhone, Mac, Windows — dans n\'importe quel navigateur',
    sections: [
      {
        h2: 'L\'app de transfert de fichiers pour Android, iPhone, iOS et Windows — qui n\'est pas une app',
        paragraphs: [
          'Vous cherchez la meilleure app de transfert de fichiers pour Android ? Vous n\'en avez pas besoin. Une app de transfert pour iPhone ou une app de partage pour iOS ? Même réponse. Filesterr fonctionne dans Safari, Chrome, Firefox et tous les autres navigateurs mobiles — aucune installation, aucune permission, aucun espace de stockage consommé sur votre appareil.',
          'C\'est la même chose sur iOS. Une app de partage de fichiers que les utilisateurs iOS trouvent sur l\'App Store veut généralement accéder à vos photos, vos contacts et parfois votre localisation. Filesterr fonctionne comme l\'app de transfert que les utilisateurs iPhone ont déjà : Safari. Ouvrez le navigateur, uploadez le fichier, copiez le lien, envoyez-le. Aucune permission demandée, aucun stockage utilisé, aucun compte créé. L\'argument pour une app de partage de fichiers sous Windows est identique — chaque machine Windows est livrée avec un navigateur, donc l\'app dédiée que les utilisateurs installent est souvent inutile.',
          'Les meilleures apps de partage de fichiers recommandées sur les forums Reddit sont en grande partie des apps mobiles qui font exactement ce que votre navigateur fait déjà. La différence, c\'est que l\'approche web de Filesterr signifie que votre destinataire n\'a jamais besoin d\'installer quoi que ce soit non plus. Vous partagez un lien. Il clique. Le fichier se télécharge. Aucune friction du type "vous devez installer X pour voir ce fichier".',
        ],
        bullets: [
          'Aucun téléchargement d\'app pour l\'expéditeur ou le destinataire',
          'Fonctionne sur Chrome, Safari, Firefox, Edge — tout navigateur moderne',
          'Aucune permission caméra, contacts ou stockage demandée',
          'Upload instantané depuis Android ou iPhone',
          'Partagez le lien via WhatsApp, iMessage, e-mail ou n\'importe où',
        ],
      },
      {
        h2: 'Pourquoi le navigateur surpasse toutes les apps de partage de fichiers',
        paragraphs: [
          'Toutes les apps de partage de fichiers du marché ont le même problème : elles exigent que l\'autre personne ait aussi l\'app. AirDrop ne fonctionne qu\'entre appareils Apple. Le transfert Bluetooth coince au-delà de quelques Mo. La plupart des apps de transfert exigent que les deux appareils soient sur le même réseau ou activement connectés pendant le transfert.',
          'Filesterr fonctionne de manière asynchrone et multiplateforme. Uploadez depuis votre Android à midi, votre destinataire télécharge depuis son Mac à minuit dans un autre pays. Le fichier qui attend entre les deux, c\'est tout l\'intérêt. Aucune connexion active requise, aucune proximité nécessaire, aucun écosystème d\'apps commun.',
          'Pour les professionnels qui envoient des fichiers à des clients et prestataires, une app de partage de fichiers est le mauvais outil — car les clients ne veulent rien installer. Les liens Filesterr fonctionnent dans n\'importe quel navigateur. C\'est la différence entre une solution et un obstacle.',
        ],
        bullets: [
          'Multiplateforme : Android vers Mac, iPhone vers Windows, tout vers tout',
          'Aucune proximité requise — fonctionne entre pays et fuseaux horaires',
          'Pas de jumelage, pas de handshake, pas d\'attente pour la détection Bluetooth',
          'Les fichiers restent disponibles des heures ou des jours, pas seulement pendant le transfert',
          'Les destinataires n\'installent jamais rien — ils ouvrent simplement un lien',
        ],
      },
      {
        h2: 'Ce que Filesterr vous offre qu\'aucune app de partage de fichiers ne peut égaler',
        paragraphs: [
          'Les apps de partage de fichiers natives vous disent que le fichier a été envoyé. Filesterr vous dit s\'il a été téléchargé, depuis quel appareil et depuis quel endroit. Pour quiconque envoie des propositions, des livrables ou des contrats, cette visibilité est la différence entre supposer et savoir.',
          'Analytique de téléchargement, protection par mot de passe optionnelle, dates d\'expiration et liens de téléchargement à usage unique — tout disponible sans aucune installation d\'app. Vous avez plus de contrôle sur vos fichiers depuis un onglet de navigateur que n\'importe quelle app de transfert Android ou iOS n\'en a jamais offert.',
        ],
        bullets: [
          'Analytique de téléchargement en temps réel — qui, quand, depuis où',
          'Liens protégés par mot de passe pour les fichiers sensibles',
          'Expiration automatique : les fichiers se suppriment selon le calendrier que vous définissez',
          'Liens à usage unique — fichier détruit après le premier accès',
          'Fonctionne depuis n\'importe quel appareil, n\'importe quel OS, n\'importe quel navigateur',
        ],
      },
    ],
    relatedTitle: 'En savoir plus :',
    linkFeatures: 'Toutes les fonctionnalités →',
    linkPricing: 'Tarifs →',
  },
  es: {
    eyebrow: 'Funciona en cualquier navegador — sin app',
    h1: 'La mejor app para compartir archivos es la que ya tienes — tu navegador',
    intro: 'Deja de buscar la app correcta para Android o iPhone. Filesterr funciona completamente en tu navegador — más rápida, más liviana y más potente que cualquier app nativa en la tienda.',
    cta: 'Subir un archivo gratis',
    ctaSub: 'Funciona en Android, iPhone, Mac, Windows — cualquier navegador',
    sections: [
      {
        h2: 'La app de transferencia de archivos para Android, iPhone, iOS y Windows — que no es una app',
        paragraphs: [
          '¿Buscas la mejor app de transferencia de archivos para Android? No la necesitas. ¿Una app de transferencia para iPhone o una app para compartir archivos en iOS? Misma respuesta. Filesterr funciona en Safari, Chrome, Firefox y cualquier otro navegador móvil — sin instalación, sin permisos, sin consumir almacenamiento de tu dispositivo.',
          'Lo mismo aplica en iOS. Una app para compartir archivos que los usuarios de iOS encuentran en el App Store generalmente quiere acceso a tus fotos, contactos y a veces ubicación. Filesterr funciona como la app de transferencia que los usuarios de iPhone ya tienen: Safari. Abre el navegador, sube el archivo, copia el enlace, envíalo. Sin permisos solicitados, sin almacenamiento utilizado, sin cuenta creada. El argumento para una app de archivos en Windows es idéntico — cada computadora Windows viene con un navegador, así que la app dedicada que los usuarios instalan suele ser innecesaria.',
          'Las mejores apps para compartir archivos que recomiendan los hilos de Reddit son en su mayoría apps móviles que hacen exactamente lo que tu navegador ya hace. La diferencia es que el enfoque web de Filesterr significa que tu destinatario tampoco tiene que instalar nada. Tú compartes un enlace. Ellos hacen clic. El archivo se descarga. Sin la fricción de "necesitas instalar X para ver este archivo".',
        ],
        bullets: [
          'Sin descarga de app para el remitente ni el destinatario',
          'Funciona en Chrome, Safari, Firefox, Edge — cualquier navegador moderno',
          'Sin permisos de cámara, contactos ni almacenamiento',
          'Subida instantánea desde el carrete de Android o iPhone',
          'Comparte el enlace por WhatsApp, iMessage, correo o donde quieras',
        ],
      },
      {
        h2: 'Por qué el navegador supera a todas las apps de compartición de archivos',
        paragraphs: [
          'Todas las apps fáciles para compartir archivos en el mercado tienen el mismo problema: requieren que la otra persona también tenga la app. AirDrop solo funciona de Apple a Apple. La transferencia por Bluetooth se traba por encima de unos pocos MB. La mayoría de las apps de transferencia requieren que ambos dispositivos estén en la misma red o conectados activamente durante la transferencia.',
          'Filesterr funciona de forma asíncrona y multiplataforma. Sube desde tu Android al mediodía, tu destinatario descarga desde su Mac a medianoche en otro país. El archivo esperando en el medio es exactamente el propósito. Sin conexión activa requerida, sin necesidad de proximidad, sin ecosistema de apps coincidente.',
          'Para profesionales que envían archivos a clientes y contratistas, una app fácil para compartir archivos es la herramienta equivocada — porque los clientes no quieren instalar nada. Los enlaces de Filesterr funcionan en cualquier navegador. Esa es la diferencia entre una solución y un obstáculo.',
        ],
        bullets: [
          'Multiplataforma: Android a Mac, iPhone a Windows, cualquier cosa a cualquier cosa',
          'Sin necesidad de proximidad — funciona entre países y zonas horarias',
          'Sin emparejamiento, sin handshake, sin esperar el descubrimiento Bluetooth',
          'Los archivos permanecen disponibles horas o días, no solo durante la transferencia',
          'Los destinatarios nunca instalan nada — solo abren un enlace',
        ],
      },
      {
        h2: 'Lo que Filesterr te da que ninguna app puede igualar',
        paragraphs: [
          'Las apps nativas para compartir archivos te dicen que el archivo fue enviado. Filesterr te dice si fue descargado, desde qué dispositivo y desde qué ubicación. Para quienes envían propuestas, entregables o contratos, esta visibilidad es la diferencia entre adivinar y saber.',
          'Analíticas de descarga, protección con contraseña opcional, fechas de vencimiento y enlaces de descarga de un solo uso — todo disponible sin ninguna instalación de app. Tienes más control sobre tus archivos desde una pestaña del navegador de lo que cualquier app de transferencia para Android o iOS haya ofrecido.',
        ],
        bullets: [
          'Analíticas de descarga en tiempo real — quién, cuándo, desde dónde',
          'Enlaces protegidos con contraseña para archivos sensibles',
          'Vencimiento automático: los archivos se eliminan según el horario que configures',
          'Enlaces de descarga de un solo uso — archivo destruido tras el primer acceso',
          'Funciona desde cualquier dispositivo, cualquier SO, cualquier navegador',
        ],
      },
    ],
    relatedTitle: 'Leer más:',
    linkFeatures: 'Todas las funciones →',
    linkPricing: 'Precios →',
  },
  ar: {
    eyebrow: 'يعمل في أي متصفح — لا يحتاج تطبيق',
    h1: 'أفضل تطبيق مشاركة ملفات هو ما تملكه بالفعل — متصفحك',
    intro: 'توقف عن البحث عن تطبيق مشاركة الملفات المناسب لـ Android أو iPhone. Filesterr يعمل بالكامل في متصفحك — أسرع وأخف وأكثر قدرة من أي تطبيق محلي في المتجر.',
    cta: 'رفع ملف مجاناً',
    ctaSub: 'يعمل على Android وiPhone وMac وWindows — في أي متصفح',
    sections: [
      {
        h2: 'تطبيق نقل الملفات لـ Android وiPhone وiOS وWindows — الذي ليس تطبيقاً',
        paragraphs: [
          'تبحث عن أفضل تطبيق لنقل الملفات على Android؟ لست بحاجة إليه. تطبيق نقل لـ iPhone أو تطبيق مشاركة لـ iOS؟ الإجابة ذاتها. يعمل Filesterr في Safari وChrome وFirefox وكل متصفح موبايل آخر — بلا تثبيت، بلا أذونات، بلا استهلاك لمساحة تخزين جهازك.',
          'الأمر ذاته ينطبق على iOS. تطبيق مشاركة الملفات الذي يجده مستخدمو iOS في App Store عادةً ما يطلب الوصول إلى صورك وجهات اتصالك وأحياناً موقعك. Filesterr يعمل كأداة نقل الملفات التي يمتلكها مستخدمو iPhone بالفعل: Safari. افتح المتصفح، ارفع الملف، انسخ الرابط، أرسله. لا أذونات مطلوبة، لا تخزين مُستخدم، لا حساب مُنشأ. الحجة ذاتها تنطبق على Windows — كل جهاز Windows يأتي مزوداً بمتصفح، لذا فالتطبيق المخصص الذي يثبته المستخدمون غالباً ما يكون غير ضروري.',
          'أفضل تطبيقات مشاركة الملفات التي توصي بها مواضيع Reddit هي في معظمها تطبيقات موبايل تفعل تماماً ما يفعله متصفحك بالفعل. الفرق هو أن نهج Filesterr المعتمد على الويب يعني أن المستلم لا يحتاج هو الآخر إلى تثبيت أي شيء. تشارك رابطاً. يضغط عليه. الملف يُنزَّل. لا احتكاك من نوع "تحتاج إلى تثبيت X لعرض هذا الملف".',
        ],
        bullets: [
          'لا تنزيل تطبيق للمرسل أو المستلم',
          'يعمل على Chrome وSafari وFirefox وEdge — أي متصفح حديث',
          'لا أذونات للكاميرا أو جهات الاتصال أو التخزين',
          'رفع فوري من كاميرا Android أو iPhone',
          'شارك الرابط عبر WhatsApp أو iMessage أو البريد الإلكتروني أو أي مكان',
        ],
      },
      {
        h2: 'لماذا النهج المعتمد على المتصفح يتفوق على كل تطبيقات مشاركة الملفات',
        paragraphs: [
          'كل تطبيق سهل لمشاركة الملفات في السوق يعاني من المشكلة ذاتها: يتطلب أن يمتلك الطرف الآخر التطبيق أيضاً. AirDrop لا يعمل إلا من Apple إلى Apple. نقل Bluetooth يتعثر فوق بضعة ميغابايت. معظم تطبيقات النقل تستلزم أن يكون الجهازان على الشبكة ذاتها أو متصلين بنشاط أثناء النقل.',
          'يعمل Filesterr بشكل غير متزامن ومتعدد المنصات. ارفع من Android الخاص بك ظهراً، ويُنزِّل المستلم من Mac الخاص به في منتصف الليل في بلد مختلف. الملف المنتظر في المنتصف هو الهدف بالكامل. لا اتصال نشط مطلوب، لا قرب ضروري، لا حاجة لنظام بيئي مطابق من التطبيقات.',
          'بالنسبة للمحترفين الذين يرسلون ملفات إلى عملاء ومقاولين، فإن تطبيق مشاركة الملفات هو الأداة الخاطئة — لأن العملاء لا يريدون تثبيت أي شيء. روابط Filesterr تعمل في أي متصفح. هذا هو الفرق بين الحل والعائق.',
        ],
        bullets: [
          'متعدد المنصات: من Android إلى Mac، من iPhone إلى Windows، من أي شيء إلى أي شيء',
          'لا حاجة للقرب — يعمل عبر البلدان والمناطق الزمنية',
          'لا إقران، لا مصافحة، لا انتظار لاكتشاف Bluetooth',
          'تظل الملفات متاحة لساعات أو أيام، وليس فقط أثناء النقل',
          'المستلمون لا يثبتون شيئاً أبداً — يفتحون رابطاً فحسب',
        ],
      },
      {
        h2: 'ما يمنحك إياه Filesterr ولا يستطيع أي تطبيق مجاراته',
        paragraphs: [
          'تطبيقات مشاركة الملفات الأصلية تُخبرك بأن الملف قد أُرسل. Filesterr يُخبرك بما إذا كان قد نُزِّل، ومن أي جهاز، ومن أي موقع. لكل من يرسل مقترحات أو مُسلَّمات أو عقوداً، هذه الرؤية هي الفرق بين التخمين واليقين.',
          'تحليلات التنزيل، وحماية اختيارية بكلمة مرور، وتواريخ انتهاء صلاحية، وروابط تنزيل للاستخدام مرة واحدة — كل ذلك متاح دون تثبيت أي تطبيق. تحصل على تحكم أكبر في ملفاتك من تبويب متصفح مما قدمه أي تطبيق نقل ملفات على Android أو iOS.',
        ],
        bullets: [
          'تحليلات تنزيل في الوقت الفعلي — من، متى، من أين',
          'روابط محمية بكلمة مرور للملفات الحساسة',
          'انتهاء صلاحية تلقائي: تحذف الملفات وفق الجدول الذي تحدده',
          'روابط تنزيل لمرة واحدة — الملف يُدمَّر بعد أول وصول',
          'يعمل من أي جهاز، أي نظام تشغيل، أي متصفح',
        ],
      },
    ],
    relatedTitle: 'اقرأ المزيد:',
    linkFeatures: 'كل الميزات →',
    linkPricing: 'الأسعار →',
  },
  zh: {
    eyebrow: '在任何浏览器中运行 — 无需应用',
    h1: '最好的文件共享应用就是你已经拥有的 — 你的浏览器',
    intro: '停止为Android或iPhone寻找合适的文件共享应用。Filesterr完全在你的浏览器中运行 — 比应用商店里任何原生应用都更快、更轻量、更强大。',
    cta: '免费上传文件',
    ctaSub: '在Android、iPhone、Mac、Windows上运行 — 任何浏览器',
    sections: [
      {
        h2: '适用于Android、iPhone、iOS和Windows的文件传输应用 — 却不是应用',
        paragraphs: [
          '在寻找Android最佳文件传输应用？你不需要。寻找iPhone文件传输应用或iOS文件共享应用？答案相同。Filesterr在Safari、Chrome、Firefox及其他所有移动浏览器中运行 — 无需安装、无需权限、不消耗设备存储空间。',
          'iOS也是如此。用户在App Store找到的文件共享应用通常会要求访问你的照片、联系人，有时甚至是位置。Filesterr就像iPhone用户已经拥有的文件传输工具：Safari。打开浏览器，上传文件，复制链接，发送。无需任何权限，不占用存储，不创建账户。Windows文件共享应用的逻辑完全相同 — 每台Windows电脑都自带浏览器，专门安装的文件共享应用往往多余。',
          'Reddit帖子推荐的最佳文件共享应用大多只是移动应用，做的正是你的浏览器已经能做的事。不同之处在于，Filesterr基于网页的方式意味着你的接收方也无需安装任何东西。你分享一个链接，对方点击，文件下载完成。没有"你需要安装X才能查看此文件"的摩擦。',
        ],
        bullets: [
          '发送方和接收方均无需下载应用',
          '在Chrome、Safari、Firefox、Edge上运行 — 任何现代浏览器',
          '无需相机、联系人或存储权限',
          '从Android或iPhone相册即时上传',
          '通过WhatsApp、iMessage、邮件或任何渠道分享链接',
        ],
      },
      {
        h2: '为什么基于浏览器的方式胜过所有便捷文件共享应用',
        paragraphs: [
          '市面上每一款便捷文件共享应用都有同一个问题：它要求对方也安装同一款应用。AirDrop只在Apple设备间工作。蓝牙传输在几MB以上就会卡顿。大多数传输应用要求两台设备在同一网络，或在传输过程中保持主动连接。',
          'Filesterr支持异步和跨平台操作。正午从你的Android上传，接收方在另一个国家的午夜从他们的Mac下载。文件在中间等待，这正是关键所在。无需主动连接，无需近距离，无需匹配的应用生态系统。',
          '对于向客户和承包商发送文件的专业人士来说，便捷文件共享应用是错误的工具 — 因为客户不想安装任何东西。Filesterr链接在任何浏览器中都能使用。这就是解决方案与障碍之间的区别。',
        ],
        bullets: [
          '跨平台：Android到Mac，iPhone到Windows，任意设备之间',
          '无需近距离 — 跨国家和时区均可使用',
          '无需配对、握手或等待蓝牙发现',
          '文件可用数小时或数天，而不仅仅是传输期间',
          '接收方无需安装任何东西 — 只需打开链接',
        ],
      },
      {
        h2: 'Filesterr提供的功能是任何文件共享应用都无法匹敌的',
        paragraphs: [
          '原生文件共享应用告诉你文件已发送。Filesterr告诉你文件是否被下载、从哪台设备下载、从哪个位置下载。对于发送提案、交付物或合同的人来说，这种可见性是猜测与确知之间的区别。',
          '下载分析、可选密码保护、过期日期和一次性下载链接 — 所有这些无需安装任何应用即可使用。你从浏览器标签页获得的文件控制权，超过任何Android或iOS文件传输应用所曾提供的。',
        ],
        bullets: [
          '实时下载分析 — 谁下载、何时下载、从何处下载',
          '为敏感文件设置密码保护链接',
          '自动过期：文件按你设定的时间表自动删除',
          '一次性下载链接 — 首次访问后文件即销毁',
          '适用于任何设备、任何操作系统、任何浏览器',
        ],
      },
    ],
    relatedTitle: '了解更多：',
    linkFeatures: '所有功能 →',
    linkPricing: '价格 →',
  },
  pt: {
    eyebrow: 'Funciona em qualquer navegador — sem app',
    h1: 'O Melhor App para Compartilhar Arquivos é o Que Você Já Tem — Seu Navegador',
    intro: 'Pare de procurar o app certo para Android ou iPhone. O Filesterr funciona completamente no seu navegador — mais rápido, mais leve e mais capaz do que qualquer app nativo na loja.',
    cta: 'Upload de Arquivo Grátis',
    ctaSub: 'Funciona em Android, iPhone, Mac, Windows — qualquer navegador',
    sections: [
      {
        h2: 'O app de transferência de arquivos para Android, iPhone, iOS e Windows — que não é um app',
        paragraphs: [
          'Procurando o melhor app de transferência de arquivos para Android? Você não precisa de um. Um app de transferência para iPhone ou um app de compartilhamento para iOS? Mesma resposta. O Filesterr funciona no Safari, Chrome, Firefox e em qualquer outro navegador mobile — sem instalação, sem permissões, sem consumir armazenamento do seu dispositivo.',
          'O mesmo vale para iOS. Um app de compartilhamento de arquivos que usuários iOS encontram na App Store normalmente quer acesso às suas fotos, contatos e às vezes localização. O Filesterr funciona como o app de transferência que usuários de iPhone já têm: Safari. Abra o navegador, faça o upload do arquivo, copie o link, envie. Sem permissões solicitadas, sem armazenamento utilizado, sem conta criada. O argumento para um app de compartilhamento no Windows é idêntico — todo computador Windows vem com um navegador, então o app dedicado que os usuários instalam muitas vezes é desnecessário.',
          'Os melhores apps de compartilhamento de arquivos recomendados em tópicos do Reddit são em sua maioria apps mobile que fazem exatamente o que seu navegador já faz. A diferença é que a abordagem baseada na web do Filesterr significa que seu destinatário também nunca precisa instalar nada. Você compartilha um link. Ele clica. O arquivo baixa. Sem o atrito de "você precisa instalar X para ver este arquivo".',
        ],
        bullets: [
          'Sem download de app para remetente ou destinatário',
          'Funciona no Chrome, Safari, Firefox, Edge — qualquer navegador moderno',
          'Sem permissões de câmera, contatos ou armazenamento',
          'Upload instantâneo do rolo de câmera do Android ou iPhone',
          'Compartilhe o link via WhatsApp, iMessage, e-mail ou qualquer lugar',
        ],
      },
      {
        h2: 'Por que o navegador supera todos os apps de compartilhamento de arquivos',
        paragraphs: [
          'Todo app fácil de compartilhamento de arquivos no mercado tem o mesmo problema: exige que a outra pessoa também tenha o app. AirDrop só funciona de Apple para Apple. A transferência via Bluetooth trava acima de alguns MB. A maioria dos apps de transferência exige que ambos os dispositivos estejam na mesma rede ou conectados ativamente durante a transferência.',
          'O Filesterr funciona de forma assíncrona e multiplataforma. Faça upload do seu Android ao meio-dia, seu destinatário baixa do Mac à meia-noite em outro país. O arquivo esperando no meio é exatamente o ponto. Nenhuma conexão ativa necessária, nenhuma proximidade exigida, nenhum ecossistema de apps coincidente.',
          'Para profissionais que enviam arquivos a clientes e prestadores de serviços, um app fácil de compartilhamento é a ferramenta errada — porque clientes não querem instalar nada. Os links do Filesterr funcionam em qualquer navegador. Essa é a diferença entre uma solução e um obstáculo.',
        ],
        bullets: [
          'Multiplataforma: Android para Mac, iPhone para Windows, qualquer coisa para qualquer coisa',
          'Sem necessidade de proximidade — funciona entre países e fusos horários',
          'Sem pareamento, sem handshake, sem aguardar descoberta Bluetooth',
          'Arquivos ficam disponíveis por horas ou dias, não apenas durante a transferência',
          'Destinatários nunca instalam nada — apenas abrem um link',
        ],
      },
      {
        h2: 'O que o Filesterr oferece que nenhum app de compartilhamento consegue igualar',
        paragraphs: [
          'Apps nativos de compartilhamento de arquivos dizem que o arquivo foi enviado. O Filesterr diz se foi baixado, de qual dispositivo e de qual localização. Para quem envia propostas, entregas ou contratos, essa visibilidade é a diferença entre adivinhar e saber.',
          'Análise de downloads, proteção opcional por senha, datas de expiração e links de download de uso único — tudo disponível sem nenhuma instalação de app. Você tem mais controle sobre seus arquivos a partir de uma aba do navegador do que qualquer app de transferência para Android ou iOS jamais ofereceu.',
        ],
        bullets: [
          'Análise de downloads em tempo real — quem, quando, de onde',
          'Links protegidos por senha para arquivos sensíveis',
          'Expiração automática: arquivos se excluem conforme o prazo que você definir',
          'Links de download de uso único — arquivo destruído após o primeiro acesso',
          'Funciona em qualquer dispositivo, qualquer SO, qualquer navegador',
        ],
      },
    ],
    relatedTitle: 'Leia mais:',
    linkFeatures: 'Todos os Recursos →',
    linkPricing: 'Preços →',
  },
  ja: {
    eyebrow: 'どのブラウザでも動作 — アプリ不要',
    h1: '最高のファイル共有アプリはすでに持っているもの — あなたのブラウザ',
    intro: 'AndroidやiPhone用の正しいファイル共有アプリを探すのをやめてください。Filesterrは完全にブラウザで動作します — アプリストアにあるどのネイティブアプリよりも高速で、軽量で、高機能です。',
    cta: 'ファイルを無料でアップロード',
    ctaSub: 'Android、iPhone、Mac、Windowsで動作 — どのブラウザでも',
    sections: [
      {
        h2: 'Android、iPhone、iOS、Windows向けのファイル転送アプリ — アプリではないもの',
        paragraphs: [
          'Android向けの最高のファイル転送アプリをお探しですか？必要ありません。iPhone向けのファイル転送アプリやiOS向けのファイル共有アプリも？答えは同じです。FilesterrはSafari、Chrome、Firefox、その他すべてのモバイルブラウザで動作します — インストール不要、権限不要、デバイスのストレージも消費しません。',
          'iOSでも同様です。App StoreでiOSユーザーが見つけるファイル共有アプリは、通常、写真、連絡先、場合によっては位置情報へのアクセスを求めます。FilesterrはiPhoneユーザーがすでに持っているファイル転送ツールとして機能します：Safariです。ブラウザを開き、ファイルをアップロードし、リンクをコピーして送信します。権限は一切不要、ストレージも使用しない、アカウントも作成しない。Windows向けのファイル共有アプリの議論も同様です — すべてのWindowsマシンにはブラウザが標準搭載されているため、専用アプリのインストールは多くの場合不要です。',
          'Redditのスレッドで推奨される最高のファイル共有アプリは、ほとんどがブラウザですでにできることと全く同じことをするモバイルアプリです。違いは、Filesterrのウェブベースのアプローチにより、受信者もまた何もインストールする必要がないということです。リンクを共有します。相手がクリックします。ファイルがダウンロードされます。「このファイルを表示するにはXをインストールしてください」という摩擦は一切ありません。',
        ],
        bullets: [
          '送信者も受信者もアプリのダウンロード不要',
          'Chrome、Safari、Firefox、Edgeで動作 — あらゆる最新ブラウザ',
          'カメラ、連絡先、ストレージの権限を一切要求しない',
          'AndroidまたはiPhoneのカメラロールから即座にアップロード',
          'WhatsApp、iMessage、メール、またはどこからでもリンクを共有',
        ],
      },
      {
        h2: 'ブラウザベースのアプローチがすべてのファイル共有アプリを上回る理由',
        paragraphs: [
          '市場にあるすべての手軽なファイル共有アプリには同じ問題があります：相手も同じアプリを持っている必要があります。AirDropはApple同士でしか機能しません。Bluetooth転送は数MBを超えると止まります。ほとんどの転送アプリは、両方のデバイスが同じネットワーク上にあるか、転送中にアクティブに接続されている必要があります。',
          'Filesterrは非同期かつクロスプラットフォームで動作します。昼にAndroidからアップロードし、受信者は別の国で真夜中にMacからダウンロードします。その間にファイルが待機していること自体が重要です。アクティブな接続は不要、近距離も必要なし、同じアプリのエコシステムも不要です。',
          'クライアントや請負業者にファイルを送る専門家にとって、手軽なファイル共有アプリは間違ったツールです — クライアントは何もインストールしたくないからです。Filesterrのリンクはどのブラウザでも機能します。それが解決策と障害の違いです。',
        ],
        bullets: [
          'クロスプラットフォーム：AndroidからMac、iPhoneからWindows、何でも何でも',
          '近距離不要 — 国をまたいで、タイムゾーンを越えて機能',
          'ペアリング不要、ハンドシェイク不要、Bluetoothの検出待ち不要',
          'ファイルは転送中だけでなく、数時間から数日間利用可能',
          '受信者は何もインストールしない — リンクを開くだけ',
        ],
      },
      {
        h2: 'いかなるファイル共有アプリも敵わないFilesterrの機能',
        paragraphs: [
          'ネイティブのファイル共有アプリはファイルが送信されたことを教えてくれます。Filesterrはダウンロードされたかどうか、どのデバイスから、どの場所からかを教えてくれます。提案書、成果物、契約書を送る人にとって、この可視性は推測と確信の違いです。',
          'ダウンロード分析、オプションのパスワード保護、有効期限、ワンタイムダウンロードリンク — これらすべてがアプリのインストールなしで利用できます。ブラウザのタブからファイルをより細かくコントロールできます。AndroidやiOSのどのファイル転送アプリも提供したことのないレベルです。',
        ],
        bullets: [
          'リアルタイムのダウンロード分析 — 誰が、いつ、どこから',
          '機密ファイル向けのパスワード保護リンク',
          '自動期限切れ：設定したスケジュールでファイルが自動削除',
          'ワンタイムダウンロードリンク — 初回アクセス後にファイルを破棄',
          'あらゆるデバイス、あらゆるOS、あらゆるブラウザから利用可能',
        ],
      },
    ],
    relatedTitle: 'さらに読む:',
    linkFeatures: 'すべての機能 →',
    linkPricing: '料金 →',
  },
  ru: {
    eyebrow: 'Работает в любом браузере — без приложения',
    h1: 'Лучшее приложение для обмена файлами — то, что у вас уже есть: браузер',
    intro: 'Перестаньте искать подходящее приложение для Android или iPhone. Filesterr работает полностью в браузере — быстрее, легче и мощнее любого нативного приложения из магазина.',
    cta: 'Загрузить файл бесплатно',
    ctaSub: 'Работает на Android, iPhone, Mac, Windows — в любом браузере',
    sections: [
      {
        h2: 'Приложение для передачи файлов на Android, iPhone, iOS и Windows — которое не является приложением',
        paragraphs: [
          'Ищете лучшее приложение для передачи файлов на Android? Оно вам не нужно. Приложение для передачи файлов на iPhone или обмена файлами на iOS? Ответ тот же. Filesterr работает в Safari, Chrome, Firefox и любом другом мобильном браузере — без установки, без разрешений, без потребления памяти устройства.',
          'То же самое верно для iOS. Приложение для обмена файлами, которое пользователи iOS находят в App Store, как правило, запрашивает доступ к фотографиям, контактам, а иногда и к геолокации. Filesterr работает как инструмент передачи файлов, который у пользователей iPhone уже есть: Safari. Откройте браузер, загрузите файл, скопируйте ссылку, отправьте. Никаких запросов разрешений, никакого расхода памяти, никакого создания аккаунта. Аргумент для приложения обмена файлами на Windows идентичен — каждый компьютер с Windows поставляется с браузером, поэтому специальное приложение, которое устанавливают пользователи, зачастую излишне.',
          'Лучшие приложения для обмена файлами, которые рекомендуют на Reddit, — это в основном мобильные приложения, делающие ровно то, что ваш браузер уже умеет. Разница в том, что веб-подход Filesterr означает: вашему получателю тоже не нужно ничего устанавливать. Вы делитесь ссылкой. Он нажимает. Файл скачивается. Никаких барьеров в духе «для просмотра этого файла нужно установить X».',
        ],
        bullets: [
          'Не нужно скачивать приложение ни отправителю, ни получателю',
          'Работает в Chrome, Safari, Firefox, Edge — любом современном браузере',
          'Никаких запросов разрешений на камеру, контакты или хранилище',
          'Мгновенная загрузка из галереи Android или iPhone',
          'Поделитесь ссылкой через WhatsApp, iMessage, почту или где угодно',
        ],
      },
      {
        h2: 'Почему браузерный подход превосходит все удобные приложения для обмена файлами',
        paragraphs: [
          'У каждого удобного приложения для обмена файлами на рынке одна и та же проблема: оно требует, чтобы у второй стороны тоже было это приложение. AirDrop работает только между устройствами Apple. Передача по Bluetooth тормозит на нескольких мегабайтах. Большинство приложений для передачи требуют, чтобы оба устройства находились в одной сети или были активно подключены во время передачи.',
          'Filesterr работает асинхронно и между разными платформами. Загрузите с Android в полдень — получатель скачает с Mac в полночь в другой стране. Файл, ожидающий в промежутке, и есть главная ценность. Никакого активного подключения, никакой близости, никакого совпадения экосистем приложений.',
          'Для специалистов, отправляющих файлы клиентам и подрядчикам, удобное приложение для обмена файлами — неправильный инструмент: клиенты не хотят ничего устанавливать. Ссылки Filesterr работают в любом браузере. Вот в чём разница между решением и препятствием.',
        ],
        bullets: [
          'Кроссплатформенность: Android на Mac, iPhone на Windows, что угодно на что угодно',
          'Близость не нужна — работает между странами и часовыми поясами',
          'Никакого сопряжения, рукопожатия, ожидания обнаружения Bluetooth',
          'Файлы остаются доступными часами или днями, а не только в процессе передачи',
          'Получателям никогда не нужно ничего устанавливать — просто открыть ссылку',
        ],
      },
      {
        h2: 'Что даёт Filesterr и чего не достигнет ни одно приложение для обмена файлами',
        paragraphs: [
          'Нативные приложения для обмена файлами сообщают вам, что файл отправлен. Filesterr сообщает, был ли он скачан, с какого устройства и из какого места. Для тех, кто отправляет коммерческие предложения, результаты работы или договоры, эта прозрачность — разница между догадкой и знанием.',
          'Аналитика загрузок, опциональная защита паролем, сроки действия и одноразовые ссылки для скачивания — всё это доступно без установки каких-либо приложений. Из вкладки браузера вы получаете больший контроль над своими файлами, чем когда-либо предлагало любое приложение для передачи файлов на Android или iOS.',
        ],
        bullets: [
          'Аналитика загрузок в реальном времени — кто, когда, откуда',
          'Ссылки с защитой паролем для конфиденциальных файлов',
          'Автоудаление: файлы удаляются по заданному вами расписанию',
          'Одноразовые ссылки — файл уничтожается после первого доступа',
          'Работает с любого устройства, любой ОС, любого браузера',
        ],
      },
    ],
    relatedTitle: 'Читать далее:',
    linkFeatures: 'Все функции →',
    linkPricing: 'Цены →',
  },
}

const c = computed(() => content[locale.value] || content.en)

const metaContent = {
  en: { title: 'File Sharing App — No Install Needed, Works in Any Browser | Filesterr', description: 'No app download needed. Filesterr is the best file sharing tool for Android & iPhone — works in your browser. Share files cross-device instantly, no account required.' },
  tr: { title: 'Dosya Paylaşım Uygulaması — Kurulum Gerekmez | Filesterr', description: 'Uygulama indirmeye gerek yok. Filesterr, Android ve iPhone için en iyi dosya paylaşım aracı — tarayıcınızda çalışır.' },
  de: { title: 'Dateifreigabe-App — Kein Install nötig, funktioniert im Browser | Filesterr', description: 'Kein App-Download nötig. Filesterr ist das beste Dateifreigabe-Tool für Android & iPhone — funktioniert in Ihrem Browser.' },
  fr: { title: 'App partage de fichiers — Sans installation, fonctionne dans le navigateur | Filesterr', description: 'Pas besoin de télécharger une app. Filesterr fonctionne dans votre navigateur sur Android et iPhone.' },
  es: { title: 'App para compartir archivos — Sin instalación, funciona en el navegador | Filesterr', description: 'No necesitas descargar ninguna app. Filesterr es la mejor herramienta para compartir archivos en Android e iPhone — funciona en tu navegador.' },
  ar: { title: 'تطبيق مشاركة الملفات — لا تثبيت، يعمل في المتصفح | Filesterr', description: 'لا حاجة لتنزيل تطبيق. Filesterr هو أفضل أداة لمشاركة الملفات على Android وiPhone — يعمل في متصفحك.' },
  zh: { title: '文件共享应用 — 无需安装，在浏览器中运行 | Filesterr', description: '无需下载应用。Filesterr是Android和iPhone最佳文件共享工具 — 在浏览器中运行，无需账户。' },
  pt: { title: 'App para Compartilhar Arquivos — Sem Instalação, Funciona no Navegador | Filesterr', description: 'Sem download de app. O Filesterr é a melhor ferramenta para compartilhar arquivos no Android e iPhone — funciona no navegador.' },
  ja: { title: 'ファイル共有アプリ — インストール不要、どのブラウザでも動作 | Filesterr', description: 'アプリのダウンロード不要。FilesterrはAndroidとiPhoneで最高のファイル共有ツール — ブラウザで動作。' },
  ru: { title: 'Приложение для обмена файлами — без установки, работает в браузере | Filesterr', description: 'Без загрузки приложения. Filesterr — лучший инструмент обмена файлами для Android и iPhone, работает в браузере.' },
}

const meta = computed(() => metaContent[locale.value] || metaContent.en)
const canonicalLocale = computed(() => locale.value && locale.value !== 'en' ? `/${locale.value}/file-sharing-app` : '/file-sharing-app')

useHead({
  title: computed(() => meta.value.title),
  meta: [
    { name: 'description', content: computed(() => meta.value.description) },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: computed(() => `https://filesterr.com${canonicalLocale.value}`) }],
})
</script>
