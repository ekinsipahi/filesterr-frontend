<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-brand-50/60 to-transparent dark:from-brand-950/30 dark:to-transparent pt-20 pb-12">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/25 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          {{ c.eyebrow }}
        </div>
        <h1 class="text-4xl sm:text-5xl font-display font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-4 leading-tight">
          {{ c.h1 }}
        </h1>
        <p class="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
          {{ c.intro }}
        </p>
        <a href="/upload"
           class="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-base transition-colors shadow-lg shadow-brand-500/25">
          {{ c.cta }} →
        </a>
        <p class="mt-3 text-xs text-zinc-400">{{ c.ctaSub }}</p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-3xl mx-auto px-6 py-12 space-y-14">

      <section v-for="section in c.sections" :key="section.h2">
        <h2 class="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-4">{{ section.h2 }}</h2>
        <div class="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p v-for="p in section.paragraphs" :key="p">{{ p }}</p>
        </div>
        <ul v-if="section.bullets" class="mt-4 space-y-2">
          <li v-for="b in section.bullets" :key="b" class="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 text-sm">
            <svg class="w-4 h-4 text-brand-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            {{ b }}
          </li>
        </ul>
      </section>

      <!-- Internal links -->
      <div class="rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
        <p class="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">{{ c.relatedTitle }}</p>
        <div class="flex flex-wrap gap-3">
          <a href="/features" class="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">{{ c.linkFeatures }}</a>
          <a href="/pricing" class="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">{{ c.linkPricing }}</a>
          <a href="/upload" class="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">{{ c.linkUpload }}</a>
        </div>
      </div>

      <!-- CTA bottom -->
      <div class="text-center py-6">
        <a href="/upload"
           class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg transition-colors shadow-xl shadow-brand-500/20">
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
    eyebrow: 'Share files in 3 seconds — no account, no friction',
    h1: 'The Fastest Way to Share Files Online — No Signup, No Wait',
    intro: 'Stop emailing yourself. Stop fumbling with USB sticks. Drop a file on Filesterr, get a link in under 3 seconds, and share it anywhere. This is what a genuine online file sharing platform without login looks like.',
    cta: 'Upload a File Free',
    ctaSub: 'No account needed · 1GB free · Link ready instantly',
    sections: [
      {
        h2: 'Quick file share: from upload to link in under 3 seconds',
        paragraphs: [
          'Most file sharing tools make you wait — for compression, for processing, for ads to finish. Filesterr doesn\'t. The moment your file lands on our servers, you have a link. Copy it, send it, done. That\'s the essence of a quick file share: zero lag between decision and delivery.',
          'Share file without login — that\'s not a workaround here, it\'s the default. No account. No email verification. No app to install. The only thing standing between your files to share and the person who needs them is a drag-and-drop.',
          'Need to share zip file archives, multi-part projects, or a folder full of assets? Upload the ZIP, get the link, and your recipient downloads the whole package in one click. No file-by-file nonsense, no compression on their end.',
          'Whether you need to share small files online between colleagues — quick screenshots, short voice memos, single-page PDFs — or send a 1GB video to a client, the process is identical. Drop it, copy the link, send it. Three seconds. Every time.',
        ],
        bullets: [
          'Upload any file type — PDFs, ZIPs, videos, executables, whatever',
          'Instant CDN delivery — your recipient gets the file fast, anywhere in the world',
          'Every upload includes a private delete link so you stay in control',
          'Anonymous uploads get 1GB free, registered accounts get 10GB',
        ],
      },
      {
        h2: 'The file sharing site no login philosophy — why it matters',
        paragraphs: [
          'Every other file sharing site no login option on the web eventually adds a friction wall — a "just create a free account" nudge, a countdown timer, a pop-up asking you to sign up. Filesterr\'s position is different: anonymous sharing is a feature, not a fallback. You should never need an account to share a file with someone who also doesn\'t have one.',
          'This isn\'t just about convenience. It\'s a privacy stance. When you use a file sharing site no account requirement, there\'s no identity tied to the upload — no email address, no phone number, no payment method. Your file exists. Your link works. That\'s all.',
          'Among free file sharing sites no registration required, Filesterr stands apart because it doesn\'t punish you for staying anonymous. No ads on the sender side, a small non-intrusive banner on the free download page — and paid plans remove that entirely. File sharing sites without registration don\'t have to mean slow or unreliable.',
          'Filesterr belongs in the same conversation as the best temporary file sharing websites — platforms where files are ephemeral by design, links expire when you want them to, and nothing persists longer than it should. And unlike file sharing sites without registration that sacrifice features for anonymity, Filesterr offers password protection, download analytics, and expiry controls even on anonymous uploads.',
        ],
        bullets: [
          'No account needed — sender or recipient',
          'No registration wall, ever',
          'Files available for hours, days, or weeks — you control the expiry',
          'Private delete link included with every upload',
          'Anonymous uploads leave no identity trail',
        ],
      },
      {
        h2: 'Share online files: what happens after you hit send',
        paragraphs: [
          'Unlike anonymous file dumps that tell you nothing, Filesterr shows you what happens to every file you share online. Free accounts get basic download counts. Upgrade for real-time download analytics — see who downloaded, what device they used, and where they are. For anyone sharing files professionally, this is the difference between guessing and knowing.',
          'Most file transfer online websites stop at the link. Filesterr continues the story. Did your client download the proposal? Did the contractor actually receive the assets? Did anyone download the file at all? Now you know.',
          'Share small files online with confidence that nothing gets lost in a spam folder. Share large files with confidence that the CDN delivers them fast no matter where the recipient is. The link is the delivery confirmation.',
        ],
        bullets: [
          'Real-time download notifications',
          'Download count, device type, and location data',
          'Optional password protection for sensitive files',
          'Set expiry dates to auto-delete after sharing',
          'One-time download links: file self-destructs after first access',
        ],
      },
      {
        h2: 'Filesterr vs. WeTransfer vs. email: a honest comparison for files to share',
        paragraphs: [
          'Email attachments fail above 25MB. WeTransfer forces your recipient through a 30-second ad countdown and gives you zero insight into whether they actually downloaded. Google Drive requires both ends to have Google accounts. Filesterr is built as a true share online files platform — no ecosystem lock-in, no countdown, no account required on either side.',
          'If you\'ve been searching for a file sharing site no account needed that works for real-world use cases — clients, contractors, freelancers, family — Filesterr is the answer. It\'s not a temporary workaround; it\'s a purpose-built online file sharing platform without login that treats anonymity as a feature.',
        ],
        bullets: [
          'Filesterr: no account required either side, instant link, 1GB free anonymous',
          'WeTransfer: 2GB free, but 30-second ad countdown, no analytics',
          'Email: 25MB attachment limit, no tracking, no large file support',
          'Google Drive: 15GB but requires Google account for recipient on some file types',
          'Filesterr paid: removes ads, adds analytics, password protection, up to 50GB',
        ],
      },
    ],
    relatedTitle: 'Explore more:',
    linkFeatures: 'All Features →',
    linkPricing: 'Pricing & Plans →',
    linkUpload: 'Upload a File Now →',
  },
  tr: {
    eyebrow: '3 saniyede dosya paylaş — hesap yok, engel yok',
    h1: 'Dosyaları Online Paylaşmanın En Hızlı Yolu — Kayıt Yok, Bekleme Yok',
    intro: 'Kendinize e-posta atmayı bırakın. USB belleklerle uğraşmayı bırakın. Filesterr\'a bir dosya bırakın, 3 saniyeden kısa sürede bir bağlantı alın ve her yerde paylaşın. Gerçek bir giriş gerektirmeyen dosya paylaşım platformu budur.',
    cta: 'Ücretsiz Dosya Yükle',
    ctaSub: 'Hesap gerekmez · 1 GB ücretsiz · Bağlantı anında hazır',
    sections: [
      {
        h2: 'Hızlı dosya paylaşımı: yüklemeden bağlantıya 3 saniyede',
        paragraphs: [
          'Çoğu dosya paylaşım aracı sizi bekletir — sıkıştırma için, işleme için, reklamların bitmesi için. Filesterr bekletmez. Dosyanız sunucularımıza ulaştığı an bağlantınız hazır. Kopyalayın, gönderin, bitti. Hızlı dosya paylaşımının özü budur: karar ile teslimat arasında sıfır gecikme.',
          'Giriş yapmadan dosya paylaşımı — bu burada geçici bir çözüm değil, varsayılan seçenektir. Hesap yok. E-posta doğrulaması yok. Kurulacak uygulama yok. Paylaşmak istediğiniz dosyalar ile onlara ihtiyaç duyan kişi arasındaki tek şey sürükle-bırak.',
          'ZIP arşivleri, çok parçalı projeler veya varlıklarla dolu bir klasörü paylaşmanız mı gerekiyor? ZIP\'i yükleyin, bağlantıyı alın; alıcınız tüm paketi tek tıklamayla indirir. Dosya dosya uğraş yok, alıcı tarafında sıkıştırma yok.',
          'İster meslektaşlarınızla hızlı ekran görüntüleri, kısa ses notları, tek sayfalık PDF\'ler gibi küçük dosyalar paylaşın, ister bir müşteriye 1 GB\'lık video gönderin — süreç aynıdır. Bırakın, bağlantıyı kopyalayın, gönderin. Üç saniye. Her seferinde.',
        ],
        bullets: [
          'Her dosya türünü yükle — PDF, ZIP, video, yürütülebilir dosya, ne olursa olsun',
          'Anında CDN teslimatı — alıcınız dosyaya dünyanın her yerinde hızla ulaşır',
          'Her yükleme, kontrolü elinizde tutmanız için özel silme bağlantısı içerir',
          'Anonim yüklemeler 1 GB ücretsiz, kayıtlı hesaplar 10 GB alır',
        ],
      },
      {
        h2: 'Hesapsız dosya paylaşım felsefesi — neden önemli',
        paragraphs: [
          'Webdeki diğer tüm hesapsız dosya paylaşım seçenekleri eninde sonunda bir engel duvarı ekler — "sadece ücretsiz hesap oluştur" yönlendirmesi, geri sayım sayacı, kayıt olmanızı isteyen açılır pencere. Filesterr\'ın tutumu farklıdır: anonim paylaşım bir özellik, son çare değil. Hesabı olmayan biriyle dosya paylaşmak için hiçbir zaman hesaba ihtiyaç duymamalısınız.',
          'Bu sadece kolaylık meselesi değil. Bu bir gizlilik tutumudur. Hesap gerektirmeyen bir dosya paylaşım sitesi kullandığınızda, yüklemeye bağlı hiçbir kimlik yok — e-posta adresi yok, telefon numarası yok, ödeme yöntemi yok. Dosyanız var. Bağlantınız çalışıyor. Hepsi bu.',
          'Kayıt gerektirmeyen ücretsiz dosya paylaşım siteleri arasında Filesterr öne çıkar çünkü anonim kalmanız nedeniyle sizi cezalandırmaz. Gönderen tarafında reklam yok, ücretsiz indirme sayfasında küçük, göze batmayan bir banner var — ücretli planlar onu da tamamen kaldırır. Kayıtsız dosya paylaşım siteleri yavaş veya güvenilmez olmak zorunda değildir.',
          'Filesterr, en iyi geçici dosya paylaşım web siteleriyle aynı kategoride yer alır — dosyaların tasarım gereği geçici olduğu, bağlantıların istediğinizde sona erdiği ve hiçbir şeyin gereğinden uzun süre kalmadığı platformlar. Ayrıca anonimlik için özelliklerden taviz veren kayıtsız dosya paylaşım sitelerinin aksine Filesterr, anonim yüklemelerde bile şifre koruması, indirme analitiği ve son kullanma tarihi kontrolleri sunar.',
        ],
        bullets: [
          'Hesap gerekmez — gönderen veya alıcı için',
          'Hiçbir zaman kayıt duvarı yok',
          'Dosyalar saatler, günler veya haftalarca kullanılabilir — son tarihi siz belirlersiniz',
          'Her yüklemeye özel silme bağlantısı dahildir',
          'Anonim yüklemeler kimlik izi bırakmaz',
        ],
      },
      {
        h2: 'Online dosya paylaşımı: gönder tuşuna bastıktan sonra ne olur',
        paragraphs: [
          'Size hiçbir şey söylemeyen anonim dosya depolarının aksine Filesterr, online paylaştığınız her dosyaya ne olduğunu gösterir. Ücretsiz hesaplar temel indirme sayımı alır. Gerçek zamanlı indirme analitiği için yükseltin — kimin indirdiğini, hangi cihazı kullandıklarını ve nerede olduklarını görün. Dosyaları profesyonel olarak paylaşan herkes için bu, tahmin etmek ile bilmek arasındaki farktır.',
          'Çoğu online dosya transfer sitesi bağlantıda durur. Filesterr hikayeyi sürdürür. Müşteriniz teklifi indirdi mi? Yüklenici varlıkları gerçekten aldı mı? Dosyayı kimse indirdi mi? Artık biliyorsunuz.',
          'Küçük dosyaları online paylaşırken hiçbir şeyin spam klasörüne düşmeyeceğine güvenerek paylaşın. Büyük dosyaları CDN\'in alıcının bulunduğu yer her neresi olursa olsun hızla teslim edeceğine güvenerek gönderin. Bağlantı, teslim onayıdır.',
        ],
        bullets: [
          'Gerçek zamanlı indirme bildirimleri',
          'İndirme sayısı, cihaz türü ve konum verisi',
          'Hassas dosyalar için isteğe bağlı şifre koruması',
          'Paylaşımdan sonra otomatik silme için son kullanma tarihleri ayarlayın',
          'Tek kullanımlık indirme bağlantıları: dosya ilk erişimden sonra kendiliğinden silinir',
        ],
      },
      {
        h2: 'Filesterr vs. WeTransfer vs. e-posta: paylaşılacak dosyalar için dürüst bir karşılaştırma',
        paragraphs: [
          'E-posta ekleri 25 MB\'ın üzerinde başarısız olur. WeTransfer, alıcınızı 30 saniyelik reklam geri sayımından geçirmek zorunda bırakır ve gerçekten indirip indirmedikleri hakkında size sıfır bilgi verir. Google Drive, her iki tarafın da Google hesabı gerektirmesini zorunlu kılar. Filesterr, gerçek bir online dosya paylaşım platformu olarak inşa edilmiştir — ekosistem kilidi yok, geri sayım yok, her iki tarafta da hesap gerekmiyor.',
          'Gerçek dünya kullanım senaryoları için işe yarayan hesap gerektirmeyen bir dosya paylaşım sitesi arıyorsanız — müşteriler, yükleniciler, serbest çalışanlar, aile — Filesterr cevaptır. Bu geçici bir çözüm değil; anonimliği bir özellik olarak ele alan, amaca yönelik inşa edilmiş, girişsiz online dosya paylaşım platformudur.',
        ],
        bullets: [
          'Filesterr: her iki tarafta da hesap gerekmez, anında bağlantı, anonim 1 GB ücretsiz',
          'WeTransfer: 2 GB ücretsiz, ancak 30 saniyelik reklam geri sayımı, analitik yok',
          'E-posta: 25 MB ek limiti, izleme yok, büyük dosya desteği yok',
          'Google Drive: 15 GB ancak bazı dosya türleri için alıcıdan Google hesabı gerektirir',
          'Filesterr ücretli: reklamları kaldırır, analitik, şifre koruması ve 50 GB\'a kadar ekler',
        ],
      },
    ],
    relatedTitle: 'Daha fazlasını keşfedin:',
    linkFeatures: 'Tüm Özellikler →',
    linkPricing: 'Fiyatlandırma →',
    linkUpload: 'Şimdi Dosya Yükle →',
  },
  de: {
    eyebrow: 'Dateien in 3 Sekunden teilen — kein Konto, keine Hürden',
    h1: 'Der schnellste Weg, Dateien online zu teilen — Ohne Anmeldung, Ohne Warten',
    intro: 'Hören Sie auf, sich selbst E-Mails zu schicken. Hören Sie auf, mit USB-Sticks zu hantieren. Legen Sie eine Datei bei Filesterr ab, erhalten Sie in unter 3 Sekunden einen Link und teilen Sie ihn überall. So sieht eine echte Online-Dateifreigabe-Plattform ohne Login aus.',
    cta: 'Datei kostenlos hochladen',
    ctaSub: 'Kein Konto nötig · 1 GB gratis · Link sofort bereit',
    sections: [
      {
        h2: 'Schnelles Teilen: vom Upload zum Link in unter 3 Sekunden',
        paragraphs: [
          'Die meisten Dateifreigabe-Tools lassen Sie warten — auf Komprimierung, auf Verarbeitung, auf das Ende von Werbeanzeigen. Filesterr nicht. In dem Moment, in dem Ihre Datei auf unseren Servern ankommt, haben Sie einen Link. Kopieren, senden, fertig. Das ist das Wesen eines schnellen Dateitransfers: null Verzögerung zwischen Entscheidung und Zustellung.',
          'Dateien ohne Login teilen — das ist hier keine Behelfslösung, sondern der Standard. Kein Konto. Keine E-Mail-Verifizierung. Keine App zu installieren. Das Einzige, was zwischen Ihren zu teilenden Dateien und der Person, die sie benötigt, steht, ist ein Drag-and-Drop.',
          'Müssen Sie ZIP-Archivdateien, mehrteilige Projekte oder einen ganzen Ordner mit Ressourcen teilen? Laden Sie das ZIP hoch, erhalten Sie den Link, und Ihr Empfänger lädt das gesamte Paket mit einem Klick herunter. Kein dateiweises Herumhantieren, keine Komprimierung auf seiner Seite.',
          'Ob Sie kleine Dateien online zwischen Kollegen teilen möchten — schnelle Screenshots, kurze Sprachnotizen, einseitige PDFs — oder einem Kunden ein 1-GB-Video senden, der Prozess ist identisch. Ablegen, Link kopieren, senden. Drei Sekunden. Jedes Mal.',
        ],
        bullets: [
          'Jeden Dateityp hochladen — PDFs, ZIPs, Videos, ausführbare Dateien, alles',
          'Sofortige CDN-Lieferung — Ihr Empfänger erhält die Datei schnell, überall auf der Welt',
          'Jeder Upload enthält einen privaten Löschlink, damit Sie die Kontrolle behalten',
          'Anonyme Uploads erhalten 1 GB gratis, registrierte Konten erhalten 10 GB',
        ],
      },
      {
        h2: 'Die Philosophie des Dateifreigabe-Dienstes ohne Login — warum es wichtig ist',
        paragraphs: [
          'Jede andere Dateifreigabe-Option ohne Login im Web fügt irgendwann eine Hürde ein — einen „Erstellen Sie einfach ein kostenloses Konto"-Hinweis, einen Countdown-Timer, ein Pop-up, das Sie zur Anmeldung auffordert. Filesterrs Standpunkt ist anders: Anonymes Teilen ist eine Funktion, kein Notbehelf. Sie sollten niemals ein Konto benötigen, um eine Datei mit jemandem zu teilen, der auch keines hat.',
          'Das ist nicht nur eine Frage der Bequemlichkeit. Es ist eine Datenschutzhaltung. Wenn Sie einen Dateifreigabe-Dienst ohne Kontoanforderung nutzen, ist keine Identität mit dem Upload verknüpft — keine E-Mail-Adresse, keine Telefonnummer, keine Zahlungsmethode. Ihre Datei existiert. Ihr Link funktioniert. Das ist alles.',
          'Unter den kostenlosen Dateifreigabe-Seiten ohne Registrierung hebt sich Filesterr ab, weil es Sie nicht für das Verbleiben als anonymer Nutzer bestraft. Keine Werbung auf der Absenderseite, ein kleines, unaufdringliches Banner auf der kostenlosen Download-Seite — und bezahlte Pläne entfernen das vollständig. Dateifreigabe-Seiten ohne Registrierung müssen nicht langsam oder unzuverlässig sein.',
          'Filesterr gehört in dieselbe Kategorie wie die besten temporären Dateifreigabe-Websites — Plattformen, auf denen Dateien von Natur aus kurzlebig sind, Links ablaufen, wann Sie es möchten, und nichts länger als nötig bestehen bleibt. Und anders als Dateifreigabe-Seiten ohne Registrierung, die Funktionen für Anonymität opfern, bietet Filesterr Passwortschutz, Download-Analysen und Ablaufsteuerungen auch bei anonymen Uploads.',
        ],
        bullets: [
          'Kein Konto erforderlich — für Absender oder Empfänger',
          'Niemals eine Registrierungsschranke',
          'Dateien stunden-, tage- oder wochenlang verfügbar — Sie kontrollieren den Ablauf',
          'Privater Löschlink bei jedem Upload inklusive',
          'Anonyme Uploads hinterlassen keine Identitätsspur',
        ],
      },
      {
        h2: 'Online-Dateien teilen: was nach dem Absenden passiert',
        paragraphs: [
          'Anders als anonyme Datei-Ablagen, die Ihnen nichts verraten, zeigt Filesterr Ihnen, was mit jeder online geteilten Datei passiert. Kostenlose Konten erhalten grundlegende Download-Zählungen. Upgraden Sie für Echtzeit-Download-Analysen — sehen Sie, wer heruntergeladen hat, welches Gerät verwendet wurde und wo sich die Person befindet. Für alle, die Dateien professionell teilen, ist dies der Unterschied zwischen Raten und Wissen.',
          'Die meisten Online-Dateitransfer-Websites hören beim Link auf. Filesterr setzt die Geschichte fort. Hat Ihr Kunde das Angebot heruntergeladen? Hat der Auftragnehmer die Dateien tatsächlich erhalten? Hat überhaupt jemand die Datei heruntergeladen? Jetzt wissen Sie es.',
          'Teilen Sie kleine Dateien online mit der Gewissheit, dass nichts im Spam-Ordner verloren geht. Teilen Sie große Dateien mit der Gewissheit, dass das CDN sie schnell liefert, egal wo der Empfänger sich befindet. Der Link ist die Empfangsbestätigung.',
        ],
        bullets: [
          'Echtzeit-Download-Benachrichtigungen',
          'Download-Anzahl, Gerätetyp und Standortdaten',
          'Optionaler Passwortschutz für sensible Dateien',
          'Ablaufdaten für automatisches Löschen nach dem Teilen festlegen',
          'Einmalige Download-Links: Datei zerstört sich selbst nach dem ersten Zugriff',
        ],
      },
      {
        h2: 'Filesterr vs. WeTransfer vs. E-Mail: ein ehrlicher Vergleich für zu teilende Dateien',
        paragraphs: [
          'E-Mail-Anhänge scheitern oberhalb von 25 MB. WeTransfer zwingt Ihren Empfänger durch einen 30-sekündigen Werbe-Countdown und gibt Ihnen null Einblick, ob er tatsächlich heruntergeladen hat. Google Drive erfordert, dass beide Seiten Google-Konten haben. Filesterr ist als echte Online-Dateifreigabe-Plattform konzipiert — keine Ökosystem-Bindung, kein Countdown, kein Konto auf keiner Seite erforderlich.',
          'Wenn Sie nach einem Dateifreigabe-Dienst ohne Konto gesucht haben, der für reale Anwendungsfälle funktioniert — Kunden, Auftragnehmer, Freiberufler, Familie — ist Filesterr die Antwort. Es ist keine vorübergehende Lösung; es ist eine zweckgebundene Online-Dateifreigabe-Plattform ohne Login, die Anonymität als Funktion behandelt.',
        ],
        bullets: [
          'Filesterr: kein Konto auf beiden Seiten erforderlich, sofortiger Link, 1 GB gratis anonym',
          'WeTransfer: 2 GB gratis, aber 30-sekündiger Werbe-Countdown, keine Analysen',
          'E-Mail: 25-MB-Anhangslimit, kein Tracking, keine Unterstützung großer Dateien',
          'Google Drive: 15 GB, erfordert aber für manche Dateitypen ein Google-Konto des Empfängers',
          'Filesterr bezahlt: entfernt Werbung, fügt Analysen, Passwortschutz und bis zu 50 GB hinzu',
        ],
      },
    ],
    relatedTitle: 'Mehr entdecken:',
    linkFeatures: 'Alle Funktionen →',
    linkPricing: 'Preise & Pläne →',
    linkUpload: 'Jetzt Datei hochladen →',
  },
  fr: {
    eyebrow: 'Partagez en 3 secondes — sans compte, sans friction',
    h1: 'La façon la plus rapide de partager des fichiers en ligne — Sans inscription, sans attente',
    intro: 'Arrêtez de vous envoyer des e-mails. Arrêtez de vous battre avec des clés USB. Déposez un fichier sur Filesterr, obtenez un lien en moins de 3 secondes et partagez-le partout. Voilà ce qu\'est une vraie plateforme de partage de fichiers en ligne sans connexion.',
    cta: 'Uploader un fichier gratuitement',
    ctaSub: 'Aucun compte requis · 1 Go gratuit · Lien prêt instantanément',
    sections: [
      {
        h2: 'Partage rapide : de l\'upload au lien en moins de 3 secondes',
        paragraphs: [
          'La plupart des outils de partage de fichiers vous font attendre — la compression, le traitement, la fin des publicités. Filesterr non. Dès que votre fichier arrive sur nos serveurs, vous avez un lien. Copiez-le, envoyez-le, c\'est fait. C\'est l\'essence d\'un partage rapide : zéro délai entre la décision et la livraison.',
          'Partager un fichier sans connexion — ce n\'est pas un contournement ici, c\'est le comportement par défaut. Pas de compte. Pas de vérification par e-mail. Pas d\'application à installer. La seule chose qui sépare vos fichiers à partager de la personne qui en a besoin, c\'est un glisser-déposer.',
          'Besoin de partager des archives ZIP, des projets en plusieurs parties ou un dossier rempli de ressources ? Uploadez le ZIP, récupérez le lien, et votre destinataire télécharge l\'ensemble du package en un clic. Aucune complication fichier par fichier, aucune compression de son côté.',
          'Que vous ayez besoin de partager de petits fichiers en ligne entre collègues — captures d\'écran rapides, notes vocales courtes, PDFs d\'une page — ou d\'envoyer une vidéo de 1 Go à un client, le processus est identique. Déposez, copiez le lien, envoyez. Trois secondes. À chaque fois.',
        ],
        bullets: [
          'Uploadez n\'importe quel type de fichier — PDFs, ZIPs, vidéos, exécutables, tout',
          'Livraison CDN instantanée — votre destinataire reçoit le fichier rapidement, partout dans le monde',
          'Chaque upload inclut un lien de suppression privé pour garder le contrôle',
          'Les uploads anonymes obtiennent 1 Go gratuit, les comptes enregistrés obtiennent 10 Go',
        ],
      },
      {
        h2: 'La philosophie du partage sans connexion — pourquoi c\'est important',
        paragraphs: [
          'Chaque autre option de partage sans connexion sur le web finit par ajouter un mur de friction — une invitation à « créer juste un compte gratuit », un minuteur de compte à rebours, une fenêtre pop-up vous demandant de vous inscrire. La position de Filesterr est différente : le partage anonyme est une fonctionnalité, pas un repli. Vous ne devriez jamais avoir besoin d\'un compte pour partager un fichier avec quelqu\'un qui n\'en a pas non plus.',
          'Ce n\'est pas seulement une question de commodité. C\'est une position sur la vie privée. Lorsque vous utilisez un service de partage de fichiers sans exigence de compte, aucune identité n\'est liée à l\'upload — pas d\'adresse e-mail, pas de numéro de téléphone, pas de moyen de paiement. Votre fichier existe. Votre lien fonctionne. C\'est tout.',
          'Parmi les sites de partage de fichiers gratuits sans inscription, Filesterr se distingue car il ne vous pénalise pas pour rester anonyme. Pas de publicité côté expéditeur, une petite bannière discrète sur la page de téléchargement gratuite — et les plans payants la suppriment entièrement. Les sites de partage sans inscription ne doivent pas obligatoirement être lents ou peu fiables.',
          'Filesterr appartient à la même catégorie que les meilleurs sites de partage de fichiers temporaires — des plateformes où les fichiers sont éphémères par conception, où les liens expirent quand vous le souhaitez, et où rien ne persiste plus longtemps que nécessaire. Et contrairement aux sites de partage sans inscription qui sacrifient des fonctionnalités pour l\'anonymat, Filesterr offre la protection par mot de passe, les analyses de téléchargement et les contrôles d\'expiration même sur les uploads anonymes.',
        ],
        bullets: [
          'Aucun compte nécessaire — pour l\'expéditeur ou le destinataire',
          'Jamais de mur d\'inscription',
          'Fichiers disponibles pendant des heures, des jours ou des semaines — vous contrôlez l\'expiration',
          'Lien de suppression privé inclus avec chaque upload',
          'Les uploads anonymes ne laissent aucune trace d\'identité',
        ],
      },
      {
        h2: 'Partager des fichiers en ligne : ce qui se passe après avoir cliqué sur envoyer',
        paragraphs: [
          'Contrairement aux dépôts de fichiers anonymes qui ne vous disent rien, Filesterr vous montre ce qui arrive à chaque fichier que vous partagez en ligne. Les comptes gratuits obtiennent des comptages de téléchargements basiques. Passez au niveau supérieur pour des analyses de téléchargements en temps réel — voyez qui a téléchargé, quel appareil il a utilisé et où il se trouve. Pour quiconque partage des fichiers professionnellement, c\'est la différence entre deviner et savoir.',
          'La plupart des sites de transfert de fichiers en ligne s\'arrêtent au lien. Filesterr continue l\'histoire. Votre client a-t-il téléchargé la proposition ? Le prestataire a-t-il bien reçu les ressources ? Quelqu\'un a-t-il téléchargé le fichier du tout ? Maintenant vous savez.',
          'Partagez de petits fichiers en ligne avec la certitude que rien ne se perd dans un dossier de spam. Partagez de grands fichiers avec la certitude que le CDN les livre rapidement peu importe où se trouve le destinataire. Le lien est la confirmation de livraison.',
        ],
        bullets: [
          'Notifications de téléchargement en temps réel',
          'Nombre de téléchargements, type d\'appareil et données de localisation',
          'Protection par mot de passe optionnelle pour les fichiers sensibles',
          'Définissez des dates d\'expiration pour suppression automatique après partage',
          'Liens de téléchargement à usage unique : le fichier se détruit après le premier accès',
        ],
      },
      {
        h2: 'Filesterr vs. WeTransfer vs. e-mail : une comparaison honnête pour les fichiers à partager',
        paragraphs: [
          'Les pièces jointes par e-mail échouent au-dessus de 25 Mo. WeTransfer oblige votre destinataire à traverser un compte à rebours publicitaire de 30 secondes et vous donne zéro insight sur le fait qu\'il ait réellement téléchargé. Google Drive exige que les deux parties aient des comptes Google. Filesterr est construit comme une vraie plateforme de partage de fichiers en ligne — pas d\'enfermement dans un écosystème, pas de compte à rebours, aucun compte requis de part et d\'autre.',
          'Si vous avez cherché un service de partage de fichiers sans compte qui fonctionne pour des cas d\'usage réels — clients, prestataires, freelances, famille — Filesterr est la réponse. Ce n\'est pas une solution de contournement temporaire ; c\'est une plateforme de partage de fichiers en ligne sans connexion conçue à cet effet, qui traite l\'anonymat comme une fonctionnalité.',
        ],
        bullets: [
          'Filesterr : aucun compte requis de part et d\'autre, lien instantané, 1 Go gratuit anonyme',
          'WeTransfer : 2 Go gratuit, mais compte à rebours publicitaire de 30 secondes, pas d\'analyses',
          'E-mail : limite de pièce jointe à 25 Mo, pas de suivi, pas de support pour les grands fichiers',
          'Google Drive : 15 Go mais nécessite un compte Google pour le destinataire sur certains types de fichiers',
          'Filesterr payant : supprime les publicités, ajoute analyses, protection par mot de passe, jusqu\'à 50 Go',
        ],
      },
    ],
    relatedTitle: 'Explorer davantage :',
    linkFeatures: 'Toutes les fonctionnalités →',
    linkPricing: 'Tarifs & plans →',
    linkUpload: 'Uploader un fichier maintenant →',
  },
  es: {
    eyebrow: 'Comparte archivos en 3 segundos — sin cuenta, sin fricción',
    h1: 'La forma más rápida de compartir archivos online — Sin registro, sin esperar',
    intro: 'Deja de enviarte archivos por correo. Deja de lidiar con memorias USB. Sube un archivo a Filesterr, obtén un enlace en menos de 3 segundos y compártelo en cualquier lugar. Así es como se ve una verdadera plataforma de compartir archivos online sin inicio de sesión.',
    cta: 'Subir un archivo gratis',
    ctaSub: 'Sin cuenta · 1 GB gratis · Enlace listo al instante',
    sections: [
      {
        h2: 'Compartir rápido: de la subida al enlace en menos de 3 segundos',
        paragraphs: [
          'La mayoría de las herramientas para compartir archivos te hacen esperar — para la compresión, el procesamiento, que terminen los anuncios. Filesterr no. En el momento en que tu archivo llega a nuestros servidores, tienes un enlace. Cópialo, envíalo, listo. Esa es la esencia de compartir archivos rápido: cero demora entre la decisión y la entrega.',
          'Compartir archivos sin inicio de sesión — eso no es un truco aquí, es el comportamiento predeterminado. Sin cuenta. Sin verificación de correo. Sin app que instalar. Lo único que separa tus archivos a compartir de la persona que los necesita es un arrastrar y soltar.',
          '¿Necesitas compartir archivos ZIP, proyectos de varias partes o una carpeta llena de recursos? Sube el ZIP, obtén el enlace, y tu destinatario descarga el paquete completo en un clic. Sin el lío de archivo por archivo, sin compresión de su lado.',
          'Ya sea que necesites compartir archivos pequeños online entre colegas — capturas de pantalla rápidas, notas de voz cortas, PDFs de una página — o enviar un video de 1 GB a un cliente, el proceso es idéntico. Suéltalo, copia el enlace, envíalo. Tres segundos. Cada vez.',
        ],
        bullets: [
          'Sube cualquier tipo de archivo — PDFs, ZIPs, videos, ejecutables, lo que sea',
          'Entrega CDN instantánea — tu destinatario recibe el archivo rápido, en cualquier parte del mundo',
          'Cada subida incluye un enlace de eliminación privado para que mantengas el control',
          'Las subidas anónimas obtienen 1 GB gratis, las cuentas registradas obtienen 10 GB',
        ],
      },
      {
        h2: 'La filosofía de compartir archivos sin inicio de sesión — por qué importa',
        paragraphs: [
          'Todas las demás opciones de compartir archivos sin inicio de sesión en la web eventualmente agregan un muro de fricción — un "solo crea una cuenta gratuita", un temporizador de cuenta regresiva, una ventana emergente pidiéndote que te registres. La postura de Filesterr es diferente: el compartir anónimo es una función, no un plan de contingencia. Nunca deberías necesitar una cuenta para compartir un archivo con alguien que tampoco tiene una.',
          'Esto no es solo una cuestión de comodidad. Es una postura de privacidad. Cuando usas un servicio para compartir archivos sin requisito de cuenta, no hay identidad vinculada a la subida — sin dirección de correo, sin número de teléfono, sin método de pago. Tu archivo existe. Tu enlace funciona. Eso es todo.',
          'Entre los sitios gratuitos para compartir archivos sin registro, Filesterr se destaca porque no te penaliza por mantenerte anónimo. Sin anuncios del lado del remitente, un pequeño banner discreto en la página de descarga gratuita — y los planes de pago lo eliminan por completo. Los sitios para compartir archivos sin registro no tienen que ser lentos ni poco confiables.',
          'Filesterr pertenece a la misma conversación que los mejores sitios de compartir archivos temporales — plataformas donde los archivos son efímeros por diseño, los enlaces vencen cuando tú quieres, y nada persiste más de lo necesario. Y a diferencia de los sitios para compartir sin registro que sacrifican funciones por el anonimato, Filesterr ofrece protección con contraseña, análisis de descargas y controles de vencimiento incluso en subidas anónimas.',
        ],
        bullets: [
          'Sin cuenta necesaria — ni para el remitente ni para el destinatario',
          'Nunca un muro de registro',
          'Archivos disponibles por horas, días o semanas — tú controlas el vencimiento',
          'Enlace de eliminación privado incluido en cada subida',
          'Las subidas anónimas no dejan rastro de identidad',
        ],
      },
      {
        h2: 'Compartir archivos online: qué pasa después de darle enviar',
        paragraphs: [
          'A diferencia de los depósitos anónimos de archivos que no te dicen nada, Filesterr te muestra qué le pasa a cada archivo que compartes online. Las cuentas gratuitas obtienen conteos básicos de descargas. Actualiza para obtener análisis de descargas en tiempo real — ve quién descargó, qué dispositivo usó y dónde está. Para cualquiera que comparta archivos profesionalmente, esta es la diferencia entre adivinar y saber.',
          'La mayoría de los sitios de transferencia de archivos online se detienen en el enlace. Filesterr continúa la historia. ¿Tu cliente descargó la propuesta? ¿El contratista realmente recibió los recursos? ¿Alguien descargó el archivo siquiera? Ahora lo sabes.',
          'Comparte archivos pequeños online con la confianza de que nada se pierde en una carpeta de spam. Comparte archivos grandes con la confianza de que el CDN los entrega rápido sin importar dónde esté el destinatario. El enlace es la confirmación de entrega.',
        ],
        bullets: [
          'Notificaciones de descarga en tiempo real',
          'Conteo de descargas, tipo de dispositivo y datos de ubicación',
          'Protección opcional con contraseña para archivos sensibles',
          'Establece fechas de vencimiento para auto-eliminar después de compartir',
          'Enlaces de descarga de un solo uso: el archivo se autodestruye después del primer acceso',
        ],
      },
      {
        h2: 'Filesterr vs. WeTransfer vs. correo: una comparación honesta para archivos a compartir',
        paragraphs: [
          'Los adjuntos de correo fallan por encima de 25 MB. WeTransfer obliga a tu destinatario a pasar por una cuenta regresiva de 30 segundos de anuncios y no te da ningún dato sobre si realmente descargó. Google Drive requiere que ambos lados tengan cuentas de Google. Filesterr está construido como una verdadera plataforma para compartir archivos online — sin dependencia de ecosistema, sin cuenta regresiva, sin cuenta requerida en ninguno de los dos lados.',
          'Si has estado buscando un sitio para compartir archivos sin cuenta que funcione para casos de uso del mundo real — clientes, contratistas, freelancers, familia — Filesterr es la respuesta. No es un parche temporal; es una plataforma de compartir archivos online sin inicio de sesión, construida con un propósito, que trata el anonimato como una función.',
        ],
        bullets: [
          'Filesterr: sin cuenta requerida en ningún lado, enlace instantáneo, 1 GB gratis anónimo',
          'WeTransfer: 2 GB gratis, pero cuenta regresiva de 30 segundos de anuncios, sin análisis',
          'Correo: límite de adjunto de 25 MB, sin seguimiento, sin soporte para archivos grandes',
          'Google Drive: 15 GB pero requiere cuenta de Google para el destinatario en algunos tipos de archivo',
          'Filesterr de pago: elimina anuncios, agrega análisis, protección con contraseña y hasta 50 GB',
        ],
      },
    ],
    relatedTitle: 'Explorar más:',
    linkFeatures: 'Todas las funciones →',
    linkPricing: 'Precios →',
    linkUpload: 'Subir un archivo ahora →',
  },
  ar: {
    eyebrow: 'شارك الملفات في 3 ثوانٍ — بدون حساب، بدون عوائق',
    h1: 'أسرع طريقة لمشاركة الملفات عبر الإنترنت — بدون تسجيل، بدون انتظار',
    intro: 'توقف عن إرسال الملفات لنفسك بالبريد الإلكتروني. توقف عن التعامل مع ذاكرات USB. أفلت ملفاً على Filesterr، احصل على رابط في أقل من 3 ثوانٍ وشاركه في أي مكان. هذا ما تبدو عليه منصة مشاركة الملفات عبر الإنترنت بدون تسجيل دخول.',
    cta: 'رفع ملف مجاناً',
    ctaSub: 'لا يلزم حساب · 1 جيجابايت مجاناً · الرابط جاهز فوراً',
    sections: [
      {
        h2: 'مشاركة سريعة للملفات: من الرفع إلى الرابط في أقل من 3 ثوانٍ',
        paragraphs: [
          'معظم أدوات مشاركة الملفات تجعلك تنتظر — من أجل الضغط، المعالجة، وانتهاء الإعلانات. Filesterr لا يفعل ذلك. في اللحظة التي يصل فيها ملفك إلى خوادمنا، يكون لديك رابط. انسخه، أرسله، انتهى. هذا هو جوهر المشاركة السريعة للملفات: صفر تأخير بين القرار والتسليم.',
          'مشاركة الملفات بدون تسجيل دخول — هذا ليس حلاً مؤقتاً هنا، بل هو الوضع الافتراضي. لا حساب. لا تحقق بالبريد الإلكتروني. لا تطبيق للتثبيت. الشيء الوحيد الذي يقف بين ملفاتك والشخص الذي يحتاجها هو سحب وإفلات.',
          'هل تحتاج إلى مشاركة أرشيفات ZIP، أو مشاريع متعددة الأجزاء، أو مجلد مليء بالملفات؟ ارفع ملف ZIP، احصل على الرابط، ويقوم المستلم بتنزيل الحزمة كاملة بنقرة واحدة. لا متاعب ملف بملف، ولا ضغط من جانبه.',
          'سواء كنت بحاجة إلى مشاركة ملفات صغيرة عبر الإنترنت مع الزملاء — لقطات شاشة سريعة، مذكرات صوتية قصيرة، ملفات PDF من صفحة واحدة — أو إرسال فيديو بحجم 1 جيجابايت إلى عميل، العملية متطابقة. أفلته، انسخ الرابط، أرسله. ثلاث ثوانٍ. في كل مرة.',
        ],
        bullets: [
          'ارفع أي نوع ملف — PDFs، ZIPs، فيديو، ملفات تنفيذية، أي شيء',
          'تسليم CDN فوري — يحصل المستلم على الملف بسرعة في أي مكان في العالم',
          'كل رفع يتضمن رابط حذف خاص حتى تحتفظ بالتحكم',
          'الرفع المجهول يحصل على 1 جيجابايت مجاناً، الحسابات المسجلة تحصل على 10 جيجابايت',
        ],
      },
      {
        h2: 'فلسفة مشاركة الملفات بدون تسجيل دخول — لماذا يهم ذلك',
        paragraphs: [
          'كل خيار آخر لمشاركة الملفات بدون تسجيل دخول على الويب يضيف في نهاية المطاف جداراً من العوائق — نداء "أنشئ فقط حساباً مجانياً"، مؤقت عد تنازلي، نافذة منبثقة تطلب منك التسجيل. موقف Filesterr مختلف: المشاركة المجهولة ميزة وليست بديلاً احتياطياً. لا يجب أن تحتاج أبداً إلى حساب لمشاركة ملف مع شخص لا يملك حساباً أيضاً.',
          'هذا ليس مجرد مسألة راحة. إنه موقف من الخصوصية. عندما تستخدم موقع مشاركة ملفات لا يتطلب حساباً، لا توجد هوية مرتبطة بالرفع — لا عنوان بريد إلكتروني، ولا رقم هاتف، ولا طريقة دفع. ملفك موجود. رابطك يعمل. هذا كل شيء.',
          'بين مواقع مشاركة الملفات المجانية التي لا تتطلب تسجيلاً، يتميز Filesterr لأنه لا يعاقبك على البقاء مجهول الهوية. لا إعلانات على جانب المرسل، ولافتة صغيرة غير مزعجة على صفحة التنزيل المجانية — والخطط المدفوعة تزيلها تماماً. مواقع مشاركة الملفات بدون تسجيل لا يجب أن تعني بطيئة أو غير موثوقة.',
          'Filesterr ينتمي إلى نفس فئة أفضل مواقع مشاركة الملفات المؤقتة — المنصات التي تكون فيها الملفات مؤقتة بطبيعتها، وتنتهي صلاحية الروابط عندما تريد، ولا يبقى شيء لفترة أطول مما ينبغي. وعلى خلاف مواقع المشاركة بدون تسجيل التي تضحي بالميزات من أجل الخصوصية، يقدم Filesterr حماية بكلمة مرور وتحليلات تنزيل وضوابط انتهاء الصلاحية حتى على الرفعات المجهولة.',
        ],
        bullets: [
          'لا حساب مطلوب — للمرسل أو المستلم',
          'لا جدار تسجيل أبداً',
          'الملفات متاحة لساعات أو أيام أو أسابيع — أنت من يتحكم في وقت انتهاء الصلاحية',
          'رابط حذف خاص مضمن مع كل رفع',
          'الرفعات المجهولة لا تترك أثراً للهوية',
        ],
      },
      {
        h2: 'مشاركة الملفات عبر الإنترنت: ماذا يحدث بعد الضغط على إرسال',
        paragraphs: [
          'على عكس مستودعات الملفات المجهولة التي لا تخبرك بشيء، يُريك Filesterr ما يحدث لكل ملف تشاركه عبر الإنترنت. تحصل الحسابات المجانية على أعداد تنزيل أساسية. قم بالترقية للحصول على تحليلات تنزيل في الوقت الفعلي — انظر من قام بالتنزيل، وما الجهاز الذي استخدمه، وأين هو. لأي شخص يشارك الملفات باحتراف، هذا هو الفرق بين التخمين والمعرفة.',
          'معظم مواقع نقل الملفات عبر الإنترنت تتوقف عند الرابط. Filesterr يكمل القصة. هل نزّل عميلك العرض التقديمي؟ هل تلقى المقاول الملفات فعلاً؟ هل نزّل أحد الملف أصلاً؟ الآن تعرف.',
          'شارك الملفات الصغيرة عبر الإنترنت بثقة أنه لا شيء يضيع في مجلد البريد المزعج. شارك الملفات الكبيرة بثقة أن CDN يُسلمها بسرعة بغض النظر عن مكان المستلم. الرابط هو تأكيد التسليم.',
        ],
        bullets: [
          'إشعارات تنزيل في الوقت الفعلي',
          'عدد التنزيلات ونوع الجهاز وبيانات الموقع',
          'حماية اختيارية بكلمة مرور للملفات الحساسة',
          'تعيين تواريخ انتهاء صلاحية للحذف التلقائي بعد المشاركة',
          'روابط تنزيل لمرة واحدة: يتدمر الملف ذاتياً بعد أول وصول',
        ],
      },
      {
        h2: 'Filesterr مقابل WeTransfer مقابل البريد الإلكتروني: مقارنة صادقة للملفات المشتركة',
        paragraphs: [
          'تفشل مرفقات البريد الإلكتروني فوق 25 ميجابايت. يجبر WeTransfer المستلم على المرور بعد تنازلي للإعلانات لمدة 30 ثانية ولا يعطيك أي نظرة ثاقبة حول ما إذا كانوا قد نزّلوا فعلاً. يتطلب Google Drive أن يكون لدى الطرفين حسابات Google. تم بناء Filesterr كمنصة حقيقية لمشاركة الملفات عبر الإنترنت — بدون ارتباط بنظام بيئي، بدون عد تنازلي، بدون حساب مطلوب من أي من الجانبين.',
          'إذا كنت تبحث عن موقع مشاركة ملفات لا يتطلب حساباً ويعمل لحالات الاستخدام الواقعية — العملاء والمقاولون والمستقلون والعائلة — فإن Filesterr هو الجواب. إنه ليس حلاً مؤقتاً؛ بل هو منصة مشاركة ملفات عبر الإنترنت بدون تسجيل دخول، مبنية لغرض محدد، تعامل الخصوصية كميزة.',
        ],
        bullets: [
          'Filesterr: لا حساب مطلوب من أي جانب، رابط فوري، 1 جيجابايت مجاناً مجهولاً',
          'WeTransfer: 2 جيجابايت مجاناً، لكن عد تنازلي للإعلانات 30 ثانية، بدون تحليلات',
          'البريد الإلكتروني: حد مرفق 25 ميجابايت، بدون تتبع، بدون دعم للملفات الكبيرة',
          'Google Drive: 15 جيجابايت لكن يتطلب حساب Google للمستلم في بعض أنواع الملفات',
          'Filesterr المدفوع: يزيل الإعلانات، يضيف التحليلات وحماية كلمة المرور وحتى 50 جيجابايت',
        ],
      },
    ],
    relatedTitle: 'استكشف المزيد:',
    linkFeatures: 'كل الميزات →',
    linkPricing: 'الأسعار →',
    linkUpload: 'ارفع ملفاً الآن →',
  },
  zh: {
    eyebrow: '3秒内分享文件 — 无需账户，零阻碍',
    h1: '在线分享文件的最快方式 — 无需注册，无需等待',
    intro: '停止给自己发邮件。停止摆弄USB。将文件拖到Filesterr，3秒内获取链接，随处分享。这就是真正无需登录的在线文件共享平台的样子。',
    cta: '免费上传文件',
    ctaSub: '无需账户 · 1GB免费 · 链接即时就绪',
    sections: [
      {
        h2: '快速文件共享：从上传到链接不到3秒',
        paragraphs: [
          '大多数文件共享工具让你等待——等待压缩、等待处理、等待广告结束。Filesterr不会。你的文件一到达我们的服务器，链接就已就绪。复制、发送、完成。这就是快速文件共享的精髓：决策与送达之间零延迟。',
          '无需登录即可分享文件——这里不是临时方案，而是默认设置。无需账户。无需电子邮件验证。无需安装应用。你要分享的文件和需要它的人之间，唯一的步骤就是拖放。',
          '需要分享ZIP压缩包、多部分项目或整个资源文件夹？上传ZIP，获取链接，收件人一键下载整个包。不用一个个发文件，对方也无需自行解压。',
          '无论你需要在同事间分享小文件——快速截图、简短语音备忘、单页PDF——还是向客户发送1GB视频，流程完全相同。拖进去，复制链接，发送。三秒钟。每次都是。',
        ],
        bullets: [
          '上传任何文件类型 — PDF、ZIP、视频、可执行文件，随便什么',
          '即时CDN交付 — 收件人无论身处何地都能快速获取文件',
          '每次上传均包含私密删除链接，让你始终掌握控制权',
          '匿名上传享1GB免费空间，注册账户享10GB',
        ],
      },
      {
        h2: '无需登录的文件共享理念 — 为什么这很重要',
        paragraphs: [
          '网络上其他所有无需登录的文件共享选项，最终都会增设摩擦墙——"只需创建一个免费账户"的提示、倒计时器、要求你注册的弹窗。Filesterr的立场不同：匿名共享是一项功能，而非退而求其次的方案。与同样没有账户的人分享文件，你永远不应该需要账户。',
          '这不仅仅是便利问题，更是一种隐私立场。当你使用不需要账户的文件共享平台时，上传内容与任何身份无关——没有电子邮件地址，没有电话号码，没有支付方式。你的文件存在。你的链接有效。仅此而已。',
          '在无需注册的免费文件共享网站中，Filesterr脱颖而出，因为它不会因为你保持匿名而惩罚你。发送方无广告，免费下载页面只有一个小而不扰人的横幅——付费套餐则完全去除。无注册文件共享网站不必意味着缓慢或不可靠。',
          'Filesterr属于最佳临时文件共享网站之列——这类平台的文件本就设计为短暂存在，链接在你希望的时候过期，没有任何内容比应有的保留更长时间。与那些为匿名而牺牲功能的无注册文件共享网站不同，Filesterr即使对匿名上传也提供密码保护、下载分析和到期控制。',
        ],
        bullets: [
          '无需账户 — 发送方或接收方均不需要',
          '永远没有注册墙',
          '文件可用数小时、数天或数周 — 你控制到期时间',
          '每次上传均附带私密删除链接',
          '匿名上传不留任何身份痕迹',
        ],
      },
      {
        h2: '在线文件共享：点击发送后会发生什么',
        paragraphs: [
          '与什么都不告诉你的匿名文件存储不同，Filesterr让你看到每个在线分享文件的动态。免费账户可获得基本下载计数。升级可获得实时下载分析——查看谁下载了文件、使用了什么设备、身处何处。对于专业分享文件的人来说，这是猜测与知晓之间的差别。',
          '大多数在线文件传输网站止步于链接。Filesterr继续讲述故事。你的客户下载提案了吗？承包商真的收到资源文件了吗？有没有人下载过这个文件？现在你知道了。',
          '分享小文件时，你可以放心没有任何东西会丢失在垃圾邮件文件夹里。分享大文件时，你可以放心CDN无论收件人身在何处都能快速送达。链接就是投递确认。',
        ],
        bullets: [
          '实时下载通知',
          '下载次数、设备类型和位置数据',
          '敏感文件可选密码保护',
          '设置到期日期，分享后自动删除',
          '一次性下载链接：首次访问后文件自动销毁',
        ],
      },
      {
        h2: 'Filesterr vs. WeTransfer vs. 电子邮件：文件共享的真实对比',
        paragraphs: [
          '电子邮件附件在25MB以上就会失败。WeTransfer强迫收件人经历30秒广告倒计时，而你对他们是否真的下载了毫无了解。Google Drive要求双方都有Google账户。Filesterr作为真正的在线文件共享平台而构建——无生态系统锁定，无倒计时，任何一方都不需要账户。',
          '如果你一直在寻找适用于现实场景的无需账户文件共享网站——客户、承包商、自由职业者、家人——Filesterr就是答案。它不是临时解决方案；它是专为此目的构建的无需登录在线文件共享平台，将匿名视为一项功能。',
        ],
        bullets: [
          'Filesterr：双方均无需账户，即时链接，匿名1GB免费',
          'WeTransfer：2GB免费，但有30秒广告倒计时，无分析功能',
          '电子邮件：25MB附件限制，无追踪，不支持大文件',
          'Google Drive：15GB，但某些文件类型需要收件人有Google账户',
          'Filesterr付费版：去除广告，增加分析、密码保护和最高50GB空间',
        ],
      },
    ],
    relatedTitle: '了解更多：',
    linkFeatures: '所有功能 →',
    linkPricing: '价格方案 →',
    linkUpload: '立即上传文件 →',
  },
  pt: {
    eyebrow: 'Compartilhe em 3 segundos — sem conta, sem fricção',
    h1: 'A Forma Mais Rápida de Compartilhar Arquivos Online — Sem Cadastro, Sem Espera',
    intro: 'Pare de se enviar arquivos por e-mail. Pare de se preocupar com pen drives. Solte um arquivo no Filesterr, obtenha um link em menos de 3 segundos e compartilhe em qualquer lugar. É assim que uma plataforma genuína de compartilhamento de arquivos online sem login se parece.',
    cta: 'Upload de Arquivo Grátis',
    ctaSub: 'Sem conta · 1GB grátis · Link pronto instantaneamente',
    sections: [
      {
        h2: 'Compartilhamento rápido: do upload ao link em menos de 3 segundos',
        paragraphs: [
          'A maioria das ferramentas de compartilhamento de arquivos te faz esperar — pela compressão, pelo processamento, pelo fim dos anúncios. O Filesterr não. No momento em que seu arquivo chega aos nossos servidores, você já tem um link. Copie, envie, pronto. Essa é a essência do compartilhamento rápido: zero espera entre a decisão e a entrega.',
          'Compartilhar arquivo sem login — isso não é um jeitinho aqui, é o padrão. Sem conta. Sem verificação de e-mail. Sem app para instalar. A única coisa entre seus arquivos a compartilhar e a pessoa que precisa deles é um arrastar e soltar.',
          'Precisa compartilhar arquivos ZIP, projetos com várias partes ou uma pasta cheia de assets? Faça o upload do ZIP, pegue o link, e seu destinatário baixa o pacote inteiro em um clique. Sem a burocracia de arquivo por arquivo, sem compressão do lado deles.',
          'Seja para compartilhar arquivos pequenos online entre colegas — capturas de tela rápidas, notas de voz curtas, PDFs de uma página — ou enviar um vídeo de 1GB para um cliente, o processo é idêntico. Solte, copie o link, envie. Três segundos. Toda vez.',
        ],
        bullets: [
          'Faça upload de qualquer tipo de arquivo — PDFs, ZIPs, vídeos, executáveis, qualquer coisa',
          'Entrega CDN instantânea — seu destinatário recebe o arquivo rapidinho, em qualquer lugar do mundo',
          'Cada upload inclui um link de exclusão privado para você manter o controle',
          'Uploads anônimos têm 1GB grátis, contas registradas têm 10GB',
        ],
      },
      {
        h2: 'A filosofia de compartilhar sem login — por que isso importa',
        paragraphs: [
          'Toda outra opção de compartilhamento sem login na web eventualmente adiciona um muro de fricção — um "é só criar uma conta grátis", um contador regressivo, um pop-up pedindo para você se cadastrar. A posição do Filesterr é diferente: o compartilhamento anônimo é uma funcionalidade, não um plano B. Você nunca deveria precisar de uma conta para compartilhar um arquivo com alguém que também não tem.',
          'Não é só uma questão de praticidade. É uma postura de privacidade. Quando você usa um serviço de compartilhamento de arquivos sem exigência de conta, não há nenhuma identidade ligada ao upload — sem endereço de e-mail, sem número de telefone, sem método de pagamento. Seu arquivo existe. Seu link funciona. É isso.',
          'Entre os sites gratuitos de compartilhamento de arquivos sem cadastro, o Filesterr se destaca porque não te penaliza por continuar anônimo. Sem anúncios no lado do remetente, um pequeno banner discreto na página de download gratuito — e os planos pagos removem isso completamente. Sites de compartilhamento sem cadastro não precisam significar lento ou não confiável.',
          'O Filesterr está na mesma conversa dos melhores sites de compartilhamento de arquivos temporários — plataformas onde os arquivos são efêmeros por design, os links expiram quando você quiser, e nada fica mais tempo do que deveria. E diferente dos sites de compartilhamento sem cadastro que sacrificam funcionalidades pelo anonimato, o Filesterr oferece proteção por senha, análises de download e controles de expiração mesmo em uploads anônimos.',
        ],
        bullets: [
          'Sem conta necessária — para o remetente ou para o destinatário',
          'Nunca um muro de cadastro',
          'Arquivos disponíveis por horas, dias ou semanas — você controla a expiração',
          'Link de exclusão privado incluído em cada upload',
          'Uploads anônimos não deixam rastro de identidade',
        ],
      },
      {
        h2: 'Compartilhar arquivos online: o que acontece depois que você clica em enviar',
        paragraphs: [
          'Diferente de depósitos anônimos de arquivos que não te dizem nada, o Filesterr te mostra o que acontece com cada arquivo que você compartilha online. Contas gratuitas têm contagens básicas de downloads. Faça upgrade para análises de download em tempo real — veja quem baixou, que dispositivo usou e onde está. Para qualquer pessoa que compartilha arquivos profissionalmente, essa é a diferença entre adivinhar e saber.',
          'A maioria dos sites de transferência de arquivos online para no link. O Filesterr continua a história. Seu cliente baixou a proposta? O prestador realmente recebeu os assets? Alguém baixou o arquivo sequer? Agora você sabe.',
          'Compartilhe arquivos pequenos online com a confiança de que nada se perde em uma pasta de spam. Compartilhe arquivos grandes com a confiança de que o CDN os entrega rapidinho, não importa onde o destinatário esteja. O link é a confirmação de entrega.',
        ],
        bullets: [
          'Notificações de download em tempo real',
          'Contagem de downloads, tipo de dispositivo e dados de localização',
          'Proteção por senha opcional para arquivos sensíveis',
          'Defina datas de expiração para exclusão automática após compartilhar',
          'Links de download de uso único: o arquivo se autodestrói após o primeiro acesso',
        ],
      },
      {
        h2: 'Filesterr vs. WeTransfer vs. e-mail: uma comparação honesta para arquivos a compartilhar',
        paragraphs: [
          'Anexos de e-mail falham acima de 25MB. O WeTransfer obriga seu destinatário a passar por um contador regressivo de anúncios de 30 segundos e te dá zero informação sobre se ele realmente baixou. O Google Drive exige que os dois lados tenham contas Google. O Filesterr é construído como uma plataforma verdadeira de compartilhamento de arquivos online — sem dependência de ecossistema, sem contador, sem conta exigida em nenhum dos lados.',
          'Se você estava procurando um site de compartilhamento de arquivos sem conta que funcione para casos de uso do mundo real — clientes, prestadores, freelancers, família — o Filesterr é a resposta. Não é uma solução temporária; é uma plataforma de compartilhamento de arquivos online sem login construída com propósito, que trata o anonimato como uma funcionalidade.',
        ],
        bullets: [
          'Filesterr: sem conta exigida em nenhum lado, link instantâneo, 1GB grátis anônimo',
          'WeTransfer: 2GB grátis, mas contador de anúncios de 30 segundos, sem análises',
          'E-mail: limite de anexo de 25MB, sem rastreamento, sem suporte a arquivos grandes',
          'Google Drive: 15GB mas exige conta Google do destinatário em alguns tipos de arquivo',
          'Filesterr pago: remove anúncios, adiciona análises, proteção por senha e até 50GB',
        ],
      },
    ],
    relatedTitle: 'Explorar mais:',
    linkFeatures: 'Todos os Recursos →',
    linkPricing: 'Preços →',
    linkUpload: 'Fazer Upload Agora →',
  },
  ja: {
    eyebrow: '3秒でファイルを共有 — アカウント不要、ストレスなし',
    h1: 'オンラインでファイルを共有する最速の方法 — 登録不要、待機不要',
    intro: '自分へのメール送信をやめましょう。USBメモリとの格闘もやめましょう。Filesterrにファイルをドロップして、3秒以内にリンクを取得し、どこでも共有できます。これがログイン不要の本物のオンラインファイル共有プラットフォームです。',
    cta: 'ファイルを無料でアップロード',
    ctaSub: 'アカウント不要 · 1GB無料 · リンク即時準備完了',
    sections: [
      {
        h2: '素早いファイル共有：アップロードからリンクまで3秒以内',
        paragraphs: [
          'ほとんどのファイル共有ツールは待たせます — 圧縮のため、処理のため、広告が終わるまで。Filesterrは違います。ファイルがサーバーに届いた瞬間、リンクが生成されます。コピーして、送って、完了です。これが素早いファイル共有の本質です：決断から届けるまでゼロのタイムラグ。',
          'ログインなしでファイルを共有する — これは回避策ではなく、デフォルトです。アカウント不要。メール認証不要。アプリのインストール不要。共有したいファイルと必要としている人の間にあるのは、ドラッグ＆ドロップだけです。',
          'ZIPアーカイブ、複数パートのプロジェクト、またはアセットが詰まったフォルダを共有する必要がありますか？ZIPをアップロードしてリンクを取得すれば、受信者はワンクリックでパッケージ全体をダウンロードできます。ファイルを一つずつ送る手間も、相手側での解凍作業も不要です。',
          '同僚間で小さなファイルをオンライン共有する場合 — クイックスクリーンショット、短い音声メモ、1ページのPDF — でも、クライアントに1GBの動画を送る場合でも、プロセスは同じです。ドロップして、リンクをコピーして、送信する。3秒。毎回。',
        ],
        bullets: [
          'あらゆるファイル形式をアップロード — PDF、ZIP、動画、実行ファイル、何でも',
          '即時CDN配信 — 受信者は世界中どこでも素早くファイルを受け取れます',
          '各アップロードにはプライベート削除リンクが付属し、コントロールを維持できます',
          '匿名アップロードは1GB無料、登録アカウントは10GBが利用可能',
        ],
      },
      {
        h2: 'ログイン不要のファイル共有という考え方 — なぜ重要なのか',
        paragraphs: [
          'ウェブ上の他のすべてのログイン不要ファイル共有オプションは、最終的に摩擦の壁を追加します — 「無料アカウントを作成してください」という誘導、カウントダウンタイマー、登録を求めるポップアップ。Filesterrの立場は異なります：匿名での共有は機能であり、代替手段ではありません。アカウントを持っていない相手とファイルを共有するのにアカウントが必要になるべきではありません。',
          'これは単に利便性の問題ではありません。プライバシーに対する姿勢です。アカウント不要のファイル共有サービスを使用する場合、アップロードに紐付けられた個人情報はありません — メールアドレスも、電話番号も、支払い方法も。あなたのファイルが存在する。リンクが機能する。それだけです。',
          '登録不要の無料ファイル共有サイトの中で、Filesterrが際立っているのは、匿名を維持することでペナルティを受けないからです。送信側に広告なし、無料ダウンロードページには小さくて目立たないバナーのみ — 有料プランではそれも完全に削除されます。登録なしのファイル共有サイトが遅くて信頼性が低いという意味ではなくなります。',
          'Filesterrは最良の一時ファイル共有ウェブサイトと同じカテゴリに属します — ファイルが設計上一時的であり、リンクが希望する時に期限切れになり、必要以上に何も残らないプラットフォーム。そして匿名性のために機能を犠牲にする登録なしのファイル共有サイトとは異なり、Filesterrは匿名アップロードでもパスワード保護、ダウンロード分析、有効期限コントロールを提供します。',
        ],
        bullets: [
          'アカウント不要 — 送信者も受信者も',
          '登録の壁は一切なし',
          'ファイルは数時間、数日、または数週間利用可能 — 有効期限はあなたが管理',
          '各アップロードにプライベート削除リンクが付属',
          '匿名アップロードは身元の痕跡を残しません',
        ],
      },
      {
        h2: 'オンラインファイル共有：送信した後に何が起こるか',
        paragraphs: [
          '何も教えてくれない匿名ファイルダンプとは異なり、Filesterrはオンラインで共有したすべてのファイルに何が起こるかを表示します。無料アカウントは基本的なダウンロード数を取得できます。リアルタイムのダウンロード分析のためにアップグレードしましょう — 誰がダウンロードしたか、どのデバイスを使用したか、どこにいるかが分かります。ファイルをプロフェッショナルに共有する人にとって、これは推測と把握の違いです。',
          'ほとんどのオンラインファイル転送ウェブサイトはリンクで止まります。Filesterrは話を続けます。クライアントは提案書をダウンロードしましたか？業者は実際にアセットを受け取りましたか？そもそも誰かがファイルをダウンロードしましたか？これで分かります。',
          '小さなファイルをオンライン共有する際も、何もスパムフォルダに消えないという確信を持って共有できます。大きなファイルも、CDNが受信者の場所に関係なく素早く届けるという確信を持って共有できます。リンクが配達確認です。',
        ],
        bullets: [
          'リアルタイムダウンロード通知',
          'ダウンロード数、デバイスタイプ、位置情報データ',
          '機密ファイルのための任意のパスワード保護',
          '共有後の自動削除のための有効期限を設定',
          '使い捨てダウンロードリンク：初回アクセス後にファイルが自動削除',
        ],
      },
      {
        h2: 'Filesterr vs. WeTransfer vs. メール：共有ファイルの正直な比較',
        paragraphs: [
          'メールの添付ファイルは25MBを超えると失敗します。WeTransferは受信者に30秒の広告カウントダウンを強制し、実際にダウンロードしたかどうかのインサイトはゼロです。Google Driveは両端にGoogle アカウントが必要です。Filesterrは真のオンラインファイル共有プラットフォームとして構築されています — エコシステムのロックインなし、カウントダウンなし、どちらの側でもアカウント不要。',
          '実際のユースケースで機能するアカウント不要のファイル共有サービスを探していたなら — クライアント、業者、フリーランサー、家族 — Filesterrが答えです。これは一時的な回避策ではありません。匿名性を機能として扱う、ログイン不要のオンラインファイル共有プラットフォームです。',
        ],
        bullets: [
          'Filesterr：双方ともアカウント不要、即時リンク、匿名1GB無料',
          'WeTransfer：2GB無料、ただし30秒の広告カウントダウン、分析機能なし',
          'メール：25MB添付制限、追跡なし、大容量ファイルのサポートなし',
          'Google Drive：15GBだが、一部のファイルタイプで受信者にGoogle アカウントが必要',
          'Filesterr有料版：広告削除、分析・パスワード保護の追加、最大50GBまで対応',
        ],
      },
    ],
    relatedTitle: 'さらに探索:',
    linkFeatures: 'すべての機能 →',
    linkPricing: '料金プラン →',
    linkUpload: '今すぐアップロード →',
  },
  ru: {
    eyebrow: 'Поделитесь файлами за 3 секунды — без аккаунта, без лишних шагов',
    h1: 'Самый быстрый способ поделиться файлами онлайн — Без регистрации, без ожидания',
    intro: 'Перестаньте отправлять файлы самим себе. Перестаньте возиться с флешками. Бросьте файл на Filesterr, получите ссылку за 3 секунды и поделитесь где угодно. Вот как выглядит настоящая платформа для обмена файлами онлайн без входа в систему.',
    cta: 'Загрузить файл бесплатно',
    ctaSub: 'Без аккаунта · 1 ГБ бесплатно · Ссылка готова мгновенно',
    sections: [
      {
        h2: 'Быстрый обмен файлами: от загрузки до ссылки за 3 секунды',
        paragraphs: [
          'Большинство инструментов для обмена файлами заставляют ждать — сжатия, обработки, окончания рекламы. Filesterr — нет. Как только ваш файл попадает на наши серверы, ссылка готова. Скопируйте, отправьте, готово. Это суть быстрого обмена файлами: нулевая задержка между решением и доставкой.',
          'Поделиться файлом без входа в систему — это здесь не обходной путь, а поведение по умолчанию. Без аккаунта. Без подтверждения email. Без установки приложения. Единственное, что стоит между вашими файлами и человеком, которому они нужны, — это перетаскивание.',
          'Нужно поделиться ZIP-архивами, многочастными проектами или целой папкой с ресурсами? Загрузите ZIP, получите ссылку — и получатель скачает весь пакет в один клик. Никакой возни с файлами по одному, никакого сжатия с их стороны.',
          'Нужно ли вам поделиться маленькими файлами онлайн с коллегами — быстрыми скриншотами, короткими голосовыми заметками, одностраничными PDF — или отправить клиенту видео на 1 ГБ, процесс идентичен. Бросьте файл, скопируйте ссылку, отправьте. Три секунды. Каждый раз.',
        ],
        bullets: [
          'Загружайте любой тип файлов — PDF, ZIP, видео, исполняемые файлы, что угодно',
          'Мгновенная CDN-доставка — получатель получит файл быстро в любой точке мира',
          'Каждая загрузка включает приватную ссылку для удаления, чтобы вы сохраняли контроль',
          'Анонимная загрузка: 1 ГБ бесплатно, зарегистрированные аккаунты: 10 ГБ',
        ],
      },
      {
        h2: 'Философия обмена файлами без входа в систему — почему это важно',
        paragraphs: [
          'Каждый другой вариант обмена файлами без входа в систему в сети в итоге добавляет барьер — подсказку «просто создайте бесплатный аккаунт», таймер обратного отсчёта, всплывающее окно с просьбой зарегистрироваться. Позиция Filesterr иная: анонимный обмен — это функция, а не запасной вариант. Вам никогда не должен требоваться аккаунт, чтобы поделиться файлом с кем-то, у кого его тоже нет.',
          'Это не просто вопрос удобства. Это позиция в отношении конфиденциальности. Когда вы используете сервис обмена файлами без требования аккаунта, с загрузкой не связана никакая личность — ни адрес email, ни номер телефона, ни способ оплаты. Ваш файл существует. Ваша ссылка работает. Вот и всё.',
          'Среди бесплатных сайтов для обмена файлами без регистрации Filesterr выделяется тем, что не наказывает вас за сохранение анонимности. Никакой рекламы со стороны отправителя, небольшой ненавязчивый баннер на странице бесплатного скачивания — а платные тарифы убирают и его. Сайты для обмена файлами без регистрации не обязаны быть медленными или ненадёжными.',
          'Filesterr относится к той же категории, что и лучшие сайты для временного обмена файлами — платформы, где файлы по дизайну эфемерны, ссылки истекают когда вам нужно, и ничто не сохраняется дольше, чем должно. И в отличие от сайтов обмена без регистрации, жертвующих функциями ради анонимности, Filesterr предлагает защиту паролем, аналитику загрузок и управление сроком действия даже для анонимных загрузок.',
        ],
        bullets: [
          'Аккаунт не нужен — ни отправителю, ни получателю',
          'Никогда никаких стен регистрации',
          'Файлы доступны часами, днями или неделями — вы управляете сроком действия',
          'Приватная ссылка для удаления включена в каждую загрузку',
          'Анонимные загрузки не оставляют следов личности',
        ],
      },
      {
        h2: 'Онлайн-обмен файлами: что происходит после нажатия «Отправить»',
        paragraphs: [
          'В отличие от анонимных файловых свалок, которые ничего вам не говорят, Filesterr показывает, что происходит с каждым файлом, которым вы делитесь онлайн. Бесплатные аккаунты получают базальный счётчик скачиваний. Обновитесь для получения аналитики загрузок в реальном времени — смотрите, кто скачал, какое устройство использовал и где находится. Для всех, кто делится файлами профессионально, это разница между предположением и знанием.',
          'Большинство сайтов для онлайн-передачи файлов останавливаются на ссылке. Filesterr продолжает историю. Ваш клиент скачал коммерческое предложение? Подрядчик действительно получил ресурсы? Вообще кто-нибудь скачал файл? Теперь вы знаете.',
          'Делитесь маленькими файлами онлайн с уверенностью, что ничего не потеряется в папке со спамом. Делитесь большими файлами с уверенностью, что CDN доставит их быстро вне зависимости от того, где находится получатель. Ссылка — это подтверждение доставки.',
        ],
        bullets: [
          'Уведомления о загрузках в реальном времени',
          'Количество скачиваний, тип устройства и данные о местоположении',
          'Опциональная защита паролем для конфиденциальных файлов',
          'Установите дату истечения срока для автоудаления после публикации',
          'Одноразовые ссылки для скачивания: файл самоуничтожается после первого доступа',
        ],
      },
      {
        h2: 'Filesterr vs. WeTransfer vs. email: честное сравнение для обмена файлами',
        paragraphs: [
          'Вложения email не работают выше 25 МБ. WeTransfer заставляет вашего получателя проходить через 30-секундный рекламный обратный отсчёт и не даёт вам никакого понимания, скачали ли они файл на самом деле. Google Drive требует, чтобы обе стороны имели Google-аккаунты. Filesterr создан как настоящая платформа для обмена файлами онлайн — никакой привязки к экосистеме, никакого обратного отсчёта, аккаунт не требуется ни с одной стороны.',
          'Если вы искали сайт для обмена файлами без аккаунта, который работает для реальных сценариев использования — клиенты, подрядчики, фрилансеры, семья — Filesterr — это ответ. Это не временный обходной путь; это целенаправленно созданная платформа для обмена файлами онлайн без входа в систему, которая рассматривает анонимность как функцию.',
        ],
        bullets: [
          'Filesterr: аккаунт не нужен ни с одной стороны, мгновенная ссылка, 1 ГБ бесплатно анонимно',
          'WeTransfer: 2 ГБ бесплатно, но 30-секундный рекламный обратный отсчёт, нет аналитики',
          'Email: ограничение вложений 25 МБ, без отслеживания, без поддержки больших файлов',
          'Google Drive: 15 ГБ, но для некоторых типов файлов требует Google-аккаунт получателя',
          'Filesterr платный: убирает рекламу, добавляет аналитику, защиту паролем и до 50 ГБ',
        ],
      },
    ],
    relatedTitle: 'Узнайте больше:',
    linkFeatures: 'Все функции →',
    linkPricing: 'Цены и планы →',
    linkUpload: 'Загрузить файл сейчас →',
  },
}

const c = computed(() => content[locale.value] || content.en)

const metaContent = {
  en: {
    title: 'Share Files Online Free — No Signup, Share in 3 Seconds | Filesterr',
    description: 'Share files online instantly — no account, no app, no wait. Drop any file up to 1GB and get a shareable link in seconds. Free, fast, encrypted.',
  },
  tr: { title: 'Dosyaları Online Paylaş — Ücretsiz, Kayıt Yok | Filesterr', description: 'Dosyaları anında online paylaşın — hesap, uygulama veya bekleme yok. 1 GB\'a kadar dosyayı bırakın ve saniyeler içinde paylaşılabilir bir bağlantı alın.' },
  de: { title: 'Dateien online teilen — Kostenlos, Keine Anmeldung | Filesterr', description: 'Dateien sofort online teilen — kein Konto, keine App, kein Warten. Bis zu 1 GB ablegen und in Sekunden einen Link erhalten.' },
  fr: { title: 'Partager des fichiers en ligne — Gratuit, sans inscription | Filesterr', description: 'Partagez des fichiers en ligne instantanément — sans compte, sans app, sans attente. Jusqu\'à 1 Go et un lien en quelques secondes.' },
  es: { title: 'Compartir archivos online — Gratis, sin registro | Filesterr', description: 'Comparte archivos online al instante — sin cuenta, sin app, sin espera. Hasta 1 GB y enlace en segundos.' },
  ar: { title: 'مشاركة الملفات عبر الإنترنت — مجاناً، بدون تسجيل | Filesterr', description: 'شارك الملفات فوراً عبر الإنترنت — بدون حساب، بدون تطبيق، بدون انتظار. حتى 1 جيجابايت ورابط في ثوانٍ.' },
  zh: { title: '在线免费分享文件 — 无需注册，3秒内分享 | Filesterr', description: '即时在线分享文件 — 无账户、无应用、无等待。最多1GB，几秒内获取可分享链接。' },
  pt: { title: 'Compartilhar Arquivos Online Grátis — Sem Cadastro | Filesterr', description: 'Compartilhe arquivos online instantaneamente — sem conta, sem app, sem espera. Até 1GB e link em segundos.' },
  ja: { title: 'オンラインで無料ファイル共有 — 登録不要、3秒で共有 | Filesterr', description: 'ファイルをオンラインで即時共有 — アカウント不要、アプリ不要、待機不要。最大1GB、数秒でリンク取得。' },
  ru: { title: 'Поделиться файлами онлайн бесплатно — Без регистрации | Filesterr', description: 'Делитесь файлами онлайн мгновенно — без аккаунта, без приложения, без ожидания. До 1 ГБ, ссылка за секунды.' },
}

const meta = computed(() => metaContent[locale.value] || metaContent.en)
const canonicalLocale = computed(() => locale.value && locale.value !== 'en' ? `/${locale.value}/share-files` : '/share-files')

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
