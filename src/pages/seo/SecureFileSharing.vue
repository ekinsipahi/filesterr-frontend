<template>
  <main class="min-h-screen bg-white dark:bg-zinc-950">
    <div class="bg-gradient-to-b from-green-50/50 to-transparent dark:from-green-950/20 dark:to-transparent pt-20 pb-12">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-500/15 border border-green-200 dark:border-green-500/25 text-green-700 dark:text-green-400 text-xs font-semibold mb-6">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
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

      <!-- Security badges -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div v-for="badge in c.badges" :key="badge.title" class="flex flex-col items-center text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
          <div class="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <p class="text-xs font-bold text-zinc-900 dark:text-zinc-100">{{ badge.title }}</p>
          <p class="text-xs text-zinc-500 mt-0.5">{{ badge.sub }}</p>
        </div>
      </div>

      <section v-for="section in c.sections" :key="section.h2">
        <h2 class="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-4">{{ section.h2 }}</h2>
        <div class="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p v-for="p in section.paragraphs" :key="p">{{ p }}</p>
        </div>
        <ul v-if="section.bullets" class="mt-4 space-y-2">
          <li v-for="b in section.bullets" :key="b" class="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 text-sm">
            <svg class="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
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
    eyebrow: 'AES-256 encrypted · Zero logs · Anonymous uploads',
    h1: 'Secure File Sharing That Actually Protects Your Privacy',
    intro: 'Not "we take security seriously." Actual security: AES-256 encryption at rest, anonymous uploads with no identity logging, auto-delete on expiry, and zero-knowledge storage. This is what a genuine encrypted file sharing app looks like.',
    cta: 'Share a File Securely',
    ctaSub: 'Anonymous · Encrypted · No account needed',
    badges: [
      { title: 'AES-256 Encrypted', sub: 'At rest and in transit' },
      { title: 'Zero IP Logs', sub: 'We never log your identity' },
      { title: 'Anonymous Uploads', sub: 'No account, no trace' },
      { title: 'Auto-Delete', sub: 'Set expiry, files vanish' },
      { title: 'GDPR Compliant', sub: 'EU-region infrastructure' },
      { title: 'One-Time Links', sub: 'File deleted after download' },
    ],
    sections: [
      {
        h2: 'What "secure file sharing" actually means',
        paragraphs: [
          'Most file hosts say they\'re secure. Few of them mean it. "Secure" means: your file is encrypted so no one at the host can read it, your identity isn\'t logged when you upload anonymously, and the file can be automatically destroyed after it\'s been accessed.',
          'Filesterr implements all three. Files are encrypted with AES-256 at rest — the same standard used by banks and government agencies. Anonymous uploads generate no identity record. We never log your identity, IP, or access patterns. Expiry dates cause permanent deletion on a schedule you control.',
          'No account means no identity trail. When you upload anonymously, there is no user profile, no email address, no phone number, no payment detail tied to your upload. The file exists. The link exists. Nothing else does. This is what it means to be a genuinely anonymous encrypted file sharing app — not just "optional login" wrapped in marketing language.',
        ],
        bullets: [
          'AES-256 encryption at rest — industry standard, bank-level',
          'Anonymous uploads — we never log your identity, IP, or access patterns',
          'No IP logs shared with third parties',
          'Auto-delete: set expiry dates to erase files automatically',
          'Zero-knowledge: we can\'t read your files, only serve them',
          'One-time download links: file destroyed after first download',
        ],
      },
      {
        h2: 'Secure file sharing platforms for business: what to actually look for',
        paragraphs: [
          'Businesses sharing contracts, financial documents, or client deliverables need more than "no account required." They need password-protected links for business use, expiry controls, audit trails, and confidence that the file can\'t be accessed by the wrong person at the wrong time.',
          'Unlike enterprise file sharing platforms that require IT setup, procurement processes, per-seat licensing negotiations, and weeks of onboarding, Filesterr is production-ready on day one. Log in, upload, set a password, set an expiry date, send the link. Your recipient receives a clean download page — no account required on their end, no platform they need to join.',
          'Filesterr functions as a best file sharing platform for business for teams that need to share externally without forcing recipients into an ecosystem. Client-facing links, contractor asset delivery, supplier document sharing — all of these benefit from a file sharing and collaboration platform that doesn\'t require the other side to be a paying customer.',
        ],
        bullets: [
          'Password-protected download links (Premium+)',
          'One-time download links — file self-destructs after access',
          'Expiry dates — files auto-delete at a time you choose',
          'Download analytics — know exactly who, when, and from where',
          'No 30-second countdown ads exposing your recipient to third-party trackers',
        ],
      },
      {
        h2: 'Why Filesterr beats enterprise file sharing platforms for external sharing',
        paragraphs: [
          'Enterprise file sharing platforms are excellent for internal use. SharePoint, Google Workspace, Confluence — powerful tools for teams that all exist within the same IT perimeter. The problem is external sharing. When you need to send a file to someone outside your organization, these platforms typically require the recipient to create an account, accept terms of service, and navigate an unfamiliar interface.',
          'Filesterr sits in the gap that enterprise file sharing platforms don\'t serve well: fast, secure, anonymous external sharing with no recipient friction. Your client doesn\'t need a Filesterr account. Your contractor doesn\'t need to install anything. The link works in any browser.',
          'For teams evaluating secure file sharing platforms for business, the comparison often comes down to internal collaboration vs. external delivery. Filesterr is purpose-built for the latter. It\'s not trying to replace your Slack or your SharePoint. It\'s the tool you reach for when someone outside your organization needs a file, securely, right now.',
        ],
      },
      {
        h2: 'Encrypted file sharing vs. regular cloud storage',
        paragraphs: [
          'Cloud storage platforms like Google Drive and Dropbox are not designed for confidential sharing with external parties. They require the recipient to have an account, they log access in detail, and your files are indexed and searchable by the provider. That\'s fine for internal team files. It\'s a privacy concern for sensitive external sharing.',
          'Filesterr is designed for sharing outside your ecosystem. No recipient account. No platform lock-in. Files that expire. Links that work once and never again. AES-256 encryption at rest. A zero-log policy covering your identity, IP, and access patterns. That\'s what genuine secure external file sharing actually looks like.',
        ],
      },
    ],
    relatedTitle: 'Learn more:',
    linkFeatures: 'Full Feature List →',
    linkPricing: 'See Security Features by Plan →',
  },
  tr: {
    eyebrow: 'AES-256 şifreli · Sıfır log · Anonim yüklemeler',
    h1: 'Gerçekten Gizliliğinizi Koruyan Güvenli Dosya Paylaşımı',
    intro: '"Güvenliği ciddiye alıyoruz" değil. Gerçek güvenlik: AES-256 şifreleme, anonim yüklemeler, otomatik silme ve sıfır bilgi depolama.',
    cta: 'Güvenli Dosya Paylaş',
    ctaSub: 'Anonim · Şifreli · Hesap gerekmez',
    badges: [
      { title: 'AES-256 Şifreli', sub: 'Depolamada ve aktarımda' },
      { title: 'Sıfır IP Kaydı', sub: 'Kimliğinizi asla kaydetmiyoruz' },
      { title: 'Anonim Yüklemeler', sub: 'Hesap yok, iz yok' },
      { title: 'Otomatik Silme', sub: 'Son kullanma tarihi belirle' },
      { title: 'GDPR Uyumlu', sub: 'AB bölgesi altyapısı' },
      { title: 'Tek Kullanımlık Bağlantılar', sub: 'İndirmeden sonra dosya silinir' },
    ],
    sections: [
      {
        h2: '"Güvenli dosya paylaşımı" gerçekte ne anlama gelir',
        paragraphs: [
          'Çoğu dosya barındırma hizmeti güvenli olduğunu söyler. Ama çok azı bunu gerçekten uygular. "Güvenli" şu anlama gelir: dosyanız şifrelenir ve barındırma tarafında hiç kimse okuyamaz, anonim yükleme yaptığınızda kimliğiniz kayıt altına alınmaz ve dosya erişildikten sonra otomatik olarak imha edilebilir.',
          'Filesterr bu üçünü de uygular. Dosyalar AES-256 ile depolamada şifrelenir — bu, bankalar ve devlet kurumları tarafından kullanılan standarttır. Anonim yüklemeler hiçbir kimlik kaydı oluşturmaz. Kimliğinizi, IP adresinizi veya erişim kalıplarınızı asla kaydetmiyoruz. Son kullanma tarihleri, belirlediğiniz takvime göre kalıcı silme işlemi gerçekleştirir.',
          'Hesap yoksa kimlik izi de yoktur. Anonim yükleme yaptığınızda, yüklemenize bağlı kullanıcı profili, e-posta adresi, telefon numarası veya ödeme bilgisi bulunmaz. Dosya var. Bağlantı var. Başka hiçbir şey yok. Gerçek anlamda anonim şifreli dosya paylaşım uygulaması olmak budur — yalnızca pazarlama diliyle süslenmiş "isteğe bağlı giriş" değil.',
        ],
        bullets: [
          'AES-256 depolama şifrelemesi — endüstri standardı, banka seviyesi',
          'Anonim yüklemeler — kimliğinizi, IP\'nizi veya erişim kalıplarınızı asla kaydetmiyoruz',
          'Üçüncü taraflarla IP kaydı paylaşılmaz',
          'Otomatik silme: dosyaları otomatik silmek için son kullanma tarihleri belirleyin',
          'Sıfır bilgi: dosyalarınızı okuyamayız, yalnızca sunabiliriz',
          'Tek seferlik indirme bağlantıları: ilk indirmeden sonra dosya imha edilir',
        ],
      },
      {
        h2: 'İşletmeler için güvenli dosya paylaşım platformları: gerçekte nelere bakmalı',
        paragraphs: [
          'Sözleşme, finansal belge veya müşteri teslimatı paylaşan işletmelerin "hesap gerekmez"den fazlasına ihtiyacı vardır. İş kullanımı için şifre korumalı bağlantılara, son kullanma denetimlerine, denetim izlerine ve dosyanın yanlış kişinin eline geçmeyeceğine dair güvenceye ihtiyaç duyarlar.',
          'BT kurulumu, tedarik süreçleri, koltuk başına lisans müzakereleri ve haftalarca süren oryantasyon gerektiren kurumsal dosya paylaşım platformlarının aksine, Filesterr ilk günden itibaren üretime hazırdır. Giriş yapın, yükleyin, şifre belirleyin, son kullanma tarihi ayarlayın, bağlantıyı gönderin. Alıcınız temiz bir indirme sayfasıyla karşılaşır — onların hesap oluşturmasına veya herhangi bir platforma katılmasına gerek yoktur.',
          'Filesterr, alıcıları bir ekosisteme dahil etmeden dışarıya paylaşım yapması gereken ekipler için en iyi iş dosya paylaşım platformu işlevi görür. Müşteriye yönelik bağlantılar, müteahhit varlık teslimatı, tedarikçi belge paylaşımı — bunların tümü, karşı tarafın ödeme yapan müşteri olmasını gerektirmeyen bir dosya paylaşım ve işbirliği platformundan yararlanır.',
        ],
        bullets: [
          'Şifre korumalı indirme bağlantıları (Premium+)',
          'Tek seferlik indirme bağlantıları — erişimden sonra dosya kendiliğinden imha olur',
          'Son kullanma tarihleri — dosyalar seçtiğiniz zamanda otomatik silinir',
          'İndirme analitiği — tam olarak kim, ne zaman ve nereden indirdiğini bilin',
          '30 saniyelik geri sayım reklamı yok; alıcınız üçüncü taraf takipçilere maruz kalmaz',
        ],
      },
      {
        h2: 'Filesterr\'ın dış paylaşımda kurumsal platformları neden geride bıraktığı',
        paragraphs: [
          'Kurumsal dosya paylaşım platformları iç kullanım için mükemmeldir. SharePoint, Google Workspace, Confluence — aynı BT çevresi içinde var olan ekipler için güçlü araçlar. Sorun dış paylaşımda ortaya çıkar. Kuruluşunuz dışındaki birine dosya göndermeniz gerektiğinde, bu platformlar genellikle alıcının hesap oluşturmasını, hizmet şartlarını kabul etmesini ve alışık olmadığı bir arayüzde gezinmesini zorunlu kılar.',
          'Filesterr, kurumsal dosya paylaşım platformlarının iyi hizmet veremediği boşlukta yer alır: alıcı açısından sürtüşme olmaksızın hızlı, güvenli ve anonim dış paylaşım. Müşterinizin Filesterr hesabına ihtiyacı yoktur. Müteahhidinizin hiçbir şey yüklemesi gerekmez. Bağlantı her tarayıcıda çalışır.',
          'İşletmeler için güvenli dosya paylaşım platformlarını değerlendiren ekipler için karşılaştırma çoğunlukla iç işbirliği ile dış teslimat arasına gelir. Filesterr ikincisi için özel olarak tasarlanmıştır. Slack\'inizin veya SharePoint\'inizin yerini almaya çalışmaz. Kuruluşunuz dışındaki birinin şu an hemen ve güvenli bir şekilde bir dosyaya ihtiyacı olduğunda başvurduğunuz araçtır.',
        ],
      },
      {
        h2: 'Şifreli dosya paylaşımı ile normal bulut depolama arasındaki fark',
        paragraphs: [
          'Google Drive ve Dropbox gibi bulut depolama platformları, harici taraflarla gizli paylaşım için tasarlanmamıştır. Alıcının hesaba sahip olmasını gerektirirler, erişimi ayrıntılı biçimde kaydederler ve dosyalarınız sağlayıcı tarafından dizinlenir ve aranabilir hale getirilir. Bu durum dahili ekip dosyaları için sorun teşkil etmez; ancak hassas dış paylaşımlar için gizlilik kaygısı doğurur.',
          'Filesterr, ekosistemin dışına paylaşım yapmak için tasarlanmıştır. Alıcı hesabı gerekmez. Platform bağımlılığı yoktur. Süresi dolan dosyalar. Bir kez çalışıp bir daha asla çalışmayan bağlantılar. AES-256 depolama şifrelemesi. Kimliğinizi, IP adresinizi ve erişim kalıplarınızı kapsayan sıfır log politikası. Gerçek anlamda güvenli dış dosya paylaşımı tam olarak budur.',
        ],
      },
    ],
    relatedTitle: 'Daha fazla öğren:',
    linkFeatures: 'Tüm Özellikler →',
    linkPricing: 'Plana Göre Güvenlik Özellikleri →',
  },
  de: {
    eyebrow: 'AES-256 verschlüsselt · Keine Logs · Anonyme Uploads',
    h1: 'Sicherer Datenaustausch, der Ihre Privatsphäre tatsächlich schützt',
    intro: 'Nicht "wir nehmen Sicherheit ernst." Echte Sicherheit: AES-256-Verschlüsselung, anonyme Uploads ohne Identitätsprotokoll, automatisches Löschen bei Ablauf.',
    cta: 'Datei sicher teilen',
    ctaSub: 'Anonym · Verschlüsselt · Kein Konto nötig',
    badges: [
      { title: 'AES-256 verschlüsselt', sub: 'Im Ruhezustand und bei der Übertragung' },
      { title: 'Null IP-Protokolle', sub: 'Wir protokollieren Ihre Identität nie' },
      { title: 'Anonyme Uploads', sub: 'Kein Konto, keine Spur' },
      { title: 'Auto-Löschen', sub: 'Ablaufdatum setzen, Datei verschwindet' },
      { title: 'DSGVO-konform', sub: 'EU-Infrastruktur' },
      { title: 'Einmalige Links', sub: 'Datei nach Download gelöscht' },
    ],
    sections: [
      {
        h2: 'Was "sicherer Datenaustausch" wirklich bedeutet',
        paragraphs: [
          'Die meisten Datei-Hoster bezeichnen sich als sicher. Nur wenige meinen es ernst. "Sicher" bedeutet: Ihre Datei ist so verschlüsselt, dass niemand beim Anbieter sie lesen kann, Ihre Identität wird beim anonymen Upload nicht protokolliert, und die Datei kann nach dem Zugriff automatisch vernichtet werden.',
          'Filesterr setzt alle drei Punkte um. Dateien werden im Ruhezustand mit AES-256 verschlüsselt — demselben Standard, den Banken und Behörden verwenden. Anonyme Uploads erzeugen keinerlei Identitätsdatensatz. Wir protokollieren weder Ihre Identität noch Ihre IP-Adresse noch Ihre Zugriffsmuster. Ablaufdaten bewirken eine dauerhafte Löschung nach einem von Ihnen kontrollierten Zeitplan.',
          'Kein Konto bedeutet keine Identitätsspur. Beim anonymen Upload gibt es kein Nutzerprofil, keine E-Mail-Adresse, keine Telefonnummer, keine Zahlungsdaten, die mit Ihrem Upload verknüpft sind. Die Datei existiert. Der Link existiert. Sonst nichts. Das ist es, was es bedeutet, eine wirklich anonyme verschlüsselte Datei-Sharing-App zu sein — nicht nur ein "optionaler Login" in Marketingsprache.',
        ],
        bullets: [
          'AES-256-Verschlüsselung im Ruhezustand — Industriestandard, Bankniveau',
          'Anonyme Uploads — wir protokollieren nie Ihre Identität, IP oder Zugriffsmuster',
          'Keine IP-Protokolle werden an Dritte weitergegeben',
          'Auto-Löschen: Ablaufdaten setzen, um Dateien automatisch zu löschen',
          'Zero-Knowledge: wir können Ihre Dateien nicht lesen, nur ausliefern',
          'Einmalige Download-Links: Datei nach dem ersten Download vernichtet',
        ],
      },
      {
        h2: 'Sichere Datei-Sharing-Plattformen für Unternehmen: worauf Sie wirklich achten sollten',
        paragraphs: [
          'Unternehmen, die Verträge, Finanzdokumente oder Kundenergebnisse teilen, benötigen mehr als "kein Konto erforderlich." Sie brauchen passwortgeschützte Links für den Geschäftseinsatz, Ablaufsteuerungen, Prüfprotokolle und die Gewissheit, dass die Datei nicht zum falschen Zeitpunkt in falsche Hände gerät.',
          'Im Gegensatz zu Enterprise-Datei-Sharing-Plattformen, die IT-Einrichtung, Beschaffungsprozesse, Lizenzverhandlungen pro Benutzer und wochenlange Einarbeitung erfordern, ist Filesterr ab dem ersten Tag produktionsbereit. Einloggen, hochladen, Passwort setzen, Ablaufdatum festlegen, Link senden. Ihr Empfänger erhält eine übersichtliche Download-Seite — kein Konto auf seiner Seite erforderlich, keine Plattform, der er beitreten muss.',
          'Filesterr fungiert als beste Datei-Sharing-Plattform für Unternehmen, die extern teilen müssen, ohne Empfänger in ein Ökosystem zu zwingen. Kundengerichtete Links, Lieferung von Auftragnehmer-Assets, Lieferantendokumenten-Sharing — all dies profitiert von einer Datei-Sharing- und Kollaborationsplattform, die nicht verlangt, dass die Gegenseite ein zahlender Kunde ist.',
        ],
        bullets: [
          'Passwortgeschützte Download-Links (Premium+)',
          'Einmalige Download-Links — Datei vernichtet sich selbst nach dem Zugriff',
          'Ablaufdaten — Dateien werden automatisch zur gewählten Zeit gelöscht',
          'Download-Analytik — erfahren Sie genau wer, wann und woher',
          'Keine 30-Sekunden-Countdown-Werbung, die Ihren Empfänger Drittanbieter-Trackern aussetzt',
        ],
      },
      {
        h2: 'Warum Filesterr Enterprise-Plattformen beim externen Datenaustausch übertrifft',
        paragraphs: [
          'Enterprise-Datei-Sharing-Plattformen eignen sich hervorragend für den internen Einsatz. SharePoint, Google Workspace, Confluence — leistungsstarke Werkzeuge für Teams innerhalb desselben IT-Perimeters. Das Problem liegt beim externen Austausch. Wenn Sie jemandem außerhalb Ihrer Organisation eine Datei schicken müssen, verlangen diese Plattformen in der Regel, dass der Empfänger ein Konto erstellt, Nutzungsbedingungen akzeptiert und eine unbekannte Oberfläche navigiert.',
          'Filesterr füllt die Lücke, die Enterprise-Datei-Sharing-Plattformen nicht gut bedienen: schneller, sicherer, anonymer externer Austausch ohne Reibungsverluste beim Empfänger. Ihr Kunde braucht kein Filesterr-Konto. Ihr Auftragnehmer muss nichts installieren. Der Link funktioniert in jedem Browser.',
          'Für Teams, die sichere Datei-Sharing-Plattformen für den Geschäftseinsatz bewerten, läuft der Vergleich oft auf interne Zusammenarbeit vs. externe Lieferung hinaus. Filesterr ist speziell für Letzteres entwickelt. Es versucht nicht, Ihr Slack oder SharePoint zu ersetzen. Es ist das Werkzeug, das Sie einsetzen, wenn jemand außerhalb Ihrer Organisation sofort und sicher eine Datei benötigt.',
        ],
      },
      {
        h2: 'Verschlüsselter Datenaustausch vs. reguläre Cloud-Speicher',
        paragraphs: [
          'Cloud-Speicher-Plattformen wie Google Drive und Dropbox sind nicht für die vertrauliche Weitergabe an externe Parteien konzipiert. Sie erfordern ein Konto beim Empfänger, protokollieren den Zugriff detailliert, und Ihre Dateien werden vom Anbieter indexiert und durchsuchbar gemacht. Das ist für interne Team-Dateien in Ordnung. Für sensiblen externen Austausch ist es ein Datenschutzproblem.',
          'Filesterr ist für den Austausch außerhalb Ihres Ökosystems konzipiert. Kein Empfängerkonto. Keine Plattformabhängigkeit. Dateien, die ablaufen. Links, die einmal funktionieren und danach nie wieder. AES-256-Verschlüsselung im Ruhezustand. Eine Zero-Log-Richtlinie, die Ihre Identität, IP und Zugriffsmuster abdeckt. So sieht echter sicherer externer Datenaustausch tatsächlich aus.',
        ],
      },
    ],
    relatedTitle: 'Mehr erfahren:',
    linkFeatures: 'Alle Funktionen →',
    linkPricing: 'Sicherheitsfunktionen nach Plan →',
  },
  fr: {
    eyebrow: 'Chiffré AES-256 · Zéro log · Uploads anonymes',
    h1: 'Partage de fichiers sécurisé qui protège vraiment votre vie privée',
    intro: 'Pas "nous prenons la sécurité au sérieux." Une vraie sécurité : chiffrement AES-256, uploads anonymes sans journal d\'identité, suppression automatique à l\'expiration.',
    cta: 'Partager un fichier en sécurité',
    ctaSub: 'Anonyme · Chiffré · Sans compte',
    badges: [
      { title: 'Chiffré AES-256', sub: 'Au repos et en transit' },
      { title: 'Zéro log IP', sub: 'Votre identité n\'est jamais enregistrée' },
      { title: 'Uploads anonymes', sub: 'Sans compte, sans trace' },
      { title: 'Suppression auto', sub: 'Définissez une expiration' },
      { title: 'Conforme RGPD', sub: 'Infrastructure région UE' },
      { title: 'Liens uniques', sub: 'Fichier supprimé après téléchargement' },
    ],
    sections: [
      {
        h2: 'Ce que signifie vraiment "partage de fichiers sécurisé"',
        paragraphs: [
          'La plupart des hébergeurs de fichiers affirment être sécurisés. Peu d\'entre eux le sont réellement. "Sécurisé" signifie : votre fichier est chiffré pour que personne chez l\'hébergeur ne puisse le lire, votre identité n\'est pas enregistrée lorsque vous uploadez anonymement, et le fichier peut être automatiquement détruit après y avoir accédé.',
          'Filesterr met en œuvre ces trois points. Les fichiers sont chiffrés avec AES-256 au repos — la même norme utilisée par les banques et les administrations. Les uploads anonymes ne génèrent aucun enregistrement d\'identité. Nous n\'enregistrons jamais votre identité, votre IP ou vos habitudes d\'accès. Les dates d\'expiration provoquent une suppression définitive selon un calendrier que vous contrôlez.',
          'Pas de compte signifie pas de trace d\'identité. Lorsque vous uploadez anonymement, il n\'y a aucun profil utilisateur, aucune adresse e-mail, aucun numéro de téléphone, aucun détail de paiement lié à votre upload. Le fichier existe. Le lien existe. Rien d\'autre. C\'est ce que signifie être une véritable application de partage de fichiers chiffrés et anonymes — pas simplement une "connexion optionnelle" habillée en discours marketing.',
        ],
        bullets: [
          'Chiffrement AES-256 au repos — standard industriel, niveau bancaire',
          'Uploads anonymes — nous n\'enregistrons jamais votre identité, IP ou habitudes d\'accès',
          'Aucun log IP partagé avec des tiers',
          'Suppression automatique : définissez des dates d\'expiration pour effacer les fichiers',
          'Zéro connaissance : nous ne pouvons pas lire vos fichiers, seulement les servir',
          'Liens de téléchargement uniques : fichier détruit après le premier téléchargement',
        ],
      },
      {
        h2: 'Plateformes de partage de fichiers sécurisé pour les entreprises : ce qu\'il faut vraiment rechercher',
        paragraphs: [
          'Les entreprises partageant des contrats, des documents financiers ou des livrables clients ont besoin de plus que "aucun compte requis." Elles ont besoin de liens protégés par mot de passe pour un usage professionnel, de contrôles d\'expiration, de pistes d\'audit et de la certitude que le fichier ne peut pas être consulté par la mauvaise personne au mauvais moment.',
          'Contrairement aux plateformes de partage de fichiers d\'entreprise qui nécessitent une configuration IT, des processus d\'approvisionnement, des négociations de licences par utilisateur et des semaines d\'intégration, Filesterr est prêt en production dès le premier jour. Connectez-vous, uploadez, définissez un mot de passe, une date d\'expiration, envoyez le lien. Votre destinataire reçoit une page de téléchargement sobre — aucun compte requis de son côté, aucune plateforme à rejoindre.',
          'Filesterr fonctionne comme la meilleure plateforme de partage de fichiers pour les équipes qui doivent partager en externe sans forcer les destinataires dans un écosystème. Liens destinés aux clients, livraison d\'assets à des prestataires, partage de documents fournisseurs — tout cela bénéficie d\'une plateforme de partage et de collaboration qui n\'exige pas que l\'autre partie soit un client payant.',
        ],
        bullets: [
          'Liens de téléchargement protégés par mot de passe (Premium+)',
          'Liens de téléchargement uniques — le fichier s\'autodétruit après l\'accès',
          'Dates d\'expiration — les fichiers se suppriment automatiquement à l\'heure choisie',
          'Analytiques de téléchargement — sachez exactement qui, quand et depuis où',
          'Aucune publicité avec compte à rebours de 30 secondes exposant votre destinataire à des trackers tiers',
        ],
      },
      {
        h2: 'Pourquoi Filesterr surpasse les plateformes d\'entreprise pour le partage externe',
        paragraphs: [
          'Les plateformes de partage de fichiers d\'entreprise sont excellentes pour un usage interne. SharePoint, Google Workspace, Confluence — des outils puissants pour les équipes évoluant dans le même périmètre IT. Le problème, c\'est le partage externe. Lorsque vous devez envoyer un fichier à quelqu\'un hors de votre organisation, ces plateformes exigent généralement que le destinataire crée un compte, accepte des conditions d\'utilisation et navigue dans une interface inconnue.',
          'Filesterr comble le vide que les plateformes d\'entreprise ne servent pas bien : partage externe rapide, sécurisé et anonyme sans friction pour le destinataire. Votre client n\'a pas besoin d\'un compte Filesterr. Votre prestataire n\'a rien à installer. Le lien fonctionne dans n\'importe quel navigateur.',
          'Pour les équipes évaluant des plateformes de partage de fichiers sécurisé pour les entreprises, la comparaison se résume souvent à collaboration interne vs. livraison externe. Filesterr est conçu spécifiquement pour cette dernière. Il ne cherche pas à remplacer votre Slack ou votre SharePoint. C\'est l\'outil que vous utilisez quand quelqu\'un hors de votre organisation a besoin d\'un fichier, en toute sécurité, maintenant.',
        ],
      },
      {
        h2: 'Partage de fichiers chiffré vs. stockage cloud classique',
        paragraphs: [
          'Les plateformes de stockage cloud comme Google Drive et Dropbox ne sont pas conçues pour le partage confidentiel avec des parties externes. Elles nécessitent que le destinataire dispose d\'un compte, elles journalisent les accès en détail et vos fichiers sont indexés et consultables par le fournisseur. C\'est acceptable pour les fichiers d\'équipe internes. C\'est un problème de confidentialité pour les partages externes sensibles.',
          'Filesterr est conçu pour le partage en dehors de votre écosystème. Pas de compte destinataire. Pas de dépendance à une plateforme. Des fichiers qui expirent. Des liens qui fonctionnent une fois et jamais plus. Chiffrement AES-256 au repos. Une politique zéro log couvrant votre identité, votre IP et vos habitudes d\'accès. Voilà ce à quoi ressemble un vrai partage externe de fichiers sécurisé.',
        ],
      },
    ],
    relatedTitle: 'En savoir plus:',
    linkFeatures: 'Toutes les fonctionnalités →',
    linkPricing: 'Fonctionnalités de sécurité par plan →',
  },
  es: {
    eyebrow: 'Cifrado AES-256 · Cero logs · Subidas anónimas',
    h1: 'Compartir Archivos de Forma Segura que Realmente Protege tu Privacidad',
    intro: 'No "tomamos la seguridad en serio." Seguridad real: cifrado AES-256, subidas anónimas sin registro de identidad, eliminación automática al expirar.',
    cta: 'Compartir un archivo de forma segura',
    ctaSub: 'Anónimo · Cifrado · Sin cuenta',
    badges: [
      { title: 'Cifrado AES-256', sub: 'En reposo y en tránsito' },
      { title: 'Cero logs IP', sub: 'Nunca registramos tu identidad' },
      { title: 'Subidas anónimas', sub: 'Sin cuenta, sin rastro' },
      { title: 'Eliminación auto', sub: 'Establece expiración' },
      { title: 'Cumple RGPD', sub: 'Infraestructura región UE' },
      { title: 'Links únicos', sub: 'Archivo eliminado tras descarga' },
    ],
    sections: [
      {
        h2: 'Qué significa realmente "compartir archivos de forma segura"',
        paragraphs: [
          'La mayoría de los servicios de alojamiento de archivos dicen ser seguros. Pocos lo son de verdad. "Seguro" significa: tu archivo está cifrado para que nadie en el servidor pueda leerlo, tu identidad no queda registrada cuando subes de forma anónima, y el archivo puede destruirse automáticamente después de ser accedido.',
          'Filesterr implementa los tres puntos. Los archivos se cifran con AES-256 en reposo — el mismo estándar que usan bancos y organismos gubernamentales. Las subidas anónimas no generan ningún registro de identidad. Nunca registramos tu identidad, IP ni patrones de acceso. Las fechas de expiración provocan una eliminación permanente según el calendario que tú controlas.',
          'Sin cuenta no hay rastro de identidad. Cuando subes de forma anónima, no existe perfil de usuario, dirección de correo, número de teléfono ni dato de pago vinculado a tu subida. El archivo existe. El enlace existe. Nada más. Esto es lo que significa ser una aplicación genuinamente anónima de compartir archivos cifrados — no solo un "login opcional" envuelto en lenguaje de marketing.',
        ],
        bullets: [
          'Cifrado AES-256 en reposo — estándar de la industria, nivel bancario',
          'Subidas anónimas — nunca registramos tu identidad, IP ni patrones de acceso',
          'Sin logs IP compartidos con terceros',
          'Eliminación automática: establece fechas de expiración para borrar archivos automáticamente',
          'Conocimiento cero: no podemos leer tus archivos, solo servirlos',
          'Links de descarga únicos: archivo destruido tras la primera descarga',
        ],
      },
      {
        h2: 'Plataformas de compartir archivos seguros para empresas: qué buscar realmente',
        paragraphs: [
          'Las empresas que comparten contratos, documentos financieros o entregables para clientes necesitan más que "sin cuenta requerida." Necesitan enlaces protegidos con contraseña para uso empresarial, controles de expiración, registros de auditoría y la certeza de que el archivo no puede ser accedido por la persona equivocada en el momento equivocado.',
          'A diferencia de las plataformas empresariales de intercambio de archivos que requieren configuración de TI, procesos de adquisición, negociaciones de licencias por puesto y semanas de integración, Filesterr está listo para producción desde el primer día. Inicia sesión, sube, establece una contraseña, fija una fecha de expiración, envía el enlace. Tu destinatario recibe una página de descarga limpia — sin necesidad de cuenta de su parte, sin plataforma a la que unirse.',
          'Filesterr funciona como la mejor plataforma de intercambio de archivos para empresas que necesitan compartir externamente sin forzar a los destinatarios a un ecosistema. Enlaces para clientes, entrega de activos a contratistas, intercambio de documentos con proveedores — todo esto se beneficia de una plataforma que no exige que la otra parte sea un cliente de pago.',
        ],
        bullets: [
          'Enlaces de descarga protegidos con contraseña (Premium+)',
          'Links de descarga únicos — el archivo se autodestruye tras el acceso',
          'Fechas de expiración — los archivos se eliminan automáticamente en el momento que elijas',
          'Analíticas de descarga — sabe exactamente quién, cuándo y desde dónde',
          'Sin anuncios de cuenta regresiva de 30 segundos que expongan a tu destinatario a rastreadores de terceros',
        ],
      },
      {
        h2: 'Por qué Filesterr supera a las plataformas empresariales en el intercambio externo',
        paragraphs: [
          'Las plataformas empresariales de intercambio de archivos son excelentes para uso interno. SharePoint, Google Workspace, Confluence — herramientas poderosas para equipos dentro del mismo perímetro de TI. El problema es el intercambio externo. Cuando necesitas enviar un archivo a alguien fuera de tu organización, estas plataformas generalmente exigen que el destinatario cree una cuenta, acepte términos de servicio y navegue por una interfaz desconocida.',
          'Filesterr ocupa el espacio que las plataformas empresariales no cubren bien: intercambio externo rápido, seguro y anónimo sin fricción para el destinatario. Tu cliente no necesita una cuenta en Filesterr. Tu contratista no necesita instalar nada. El enlace funciona en cualquier navegador.',
          'Para los equipos que evalúan plataformas de intercambio de archivos seguros para empresas, la comparación generalmente se reduce a colaboración interna vs. entrega externa. Filesterr está construido específicamente para lo segundo. No busca reemplazar tu Slack ni tu SharePoint. Es la herramienta a la que recurres cuando alguien fuera de tu organización necesita un archivo, de forma segura, ahora mismo.',
        ],
      },
      {
        h2: 'Intercambio de archivos cifrado vs. almacenamiento en la nube convencional',
        paragraphs: [
          'Las plataformas de almacenamiento en la nube como Google Drive y Dropbox no están diseñadas para compartir información confidencial con partes externas. Requieren que el destinatario tenga una cuenta, registran el acceso en detalle y tus archivos son indexados y consultables por el proveedor. Eso es aceptable para archivos internos del equipo. Es una preocupación de privacidad para el intercambio externo de información sensible.',
          'Filesterr está diseñado para compartir fuera de tu ecosistema. Sin cuenta del destinatario. Sin dependencia de plataforma. Archivos que expiran. Enlaces que funcionan una vez y nunca más. Cifrado AES-256 en reposo. Una política de cero logs que cubre tu identidad, IP y patrones de acceso. Así es como se ve realmente el intercambio externo seguro de archivos.',
        ],
      },
    ],
    relatedTitle: 'Más información:',
    linkFeatures: 'Todas las funciones →',
    linkPricing: 'Funciones de seguridad por plan →',
  },
  ar: {
    eyebrow: 'مشفر بـ AES-256 · سجلات صفرية · رفع مجهول',
    h1: 'مشاركة الملفات الآمنة التي تحمي خصوصيتك فعلاً',
    intro: 'ليس "نحن نأخذ الأمان على محمل الجد." أمان حقيقي: تشفير AES-256، رفع مجهول بدون سجل هوية، حذف تلقائي عند انتهاء الصلاحية.',
    cta: 'شارك ملفاً بأمان',
    ctaSub: 'مجهول · مشفر · لا يلزم حساب',
    badges: [
      { title: 'مشفر بـ AES-256', sub: 'في الراحة وأثناء النقل' },
      { title: 'سجلات IP صفرية', sub: 'لا نسجل هويتك أبداً' },
      { title: 'رفع مجهول', sub: 'لا حساب، لا أثر' },
      { title: 'حذف تلقائي', sub: 'حدد تاريخ انتهاء الصلاحية' },
      { title: 'متوافق مع GDPR', sub: 'بنية تحتية في منطقة الاتحاد الأوروبي' },
      { title: 'روابط لمرة واحدة', sub: 'الملف يُحذف بعد التنزيل' },
    ],
    sections: [
      {
        h2: 'ماذا يعني "مشاركة الملفات الآمنة" حقاً',
        paragraphs: [
          'تدّعي معظم خدمات استضافة الملفات أنها آمنة. غير أن قلّة منها تعني ذلك فعلاً. كلمة "آمن" تعني: تشفير ملفك حتى لا يستطيع أحد في جانب المضيف قراءته، وعدم تسجيل هويتك عند الرفع المجهول، وإمكانية إتلاف الملف تلقائياً بعد الوصول إليه.',
          'تطبّق Filesterr هذه النقاط الثلاث جميعها. يتم تشفير الملفات بـ AES-256 في حالة الراحة — المعيار ذاته الذي تستخدمه البنوك والوكالات الحكومية. لا تُنشئ عمليات الرفع المجهولة أي سجل هوية. لا نسجل هويتك أو عنوان IP الخاص بك أو أنماط وصولك. تؤدي تواريخ انتهاء الصلاحية إلى الحذف الدائم وفق جدول زمني تتحكم فيه أنت.',
          'لا حساب يعني لا أثر للهوية. عند الرفع بصورة مجهولة، لا يوجد ملف شخصي للمستخدم، ولا عنوان بريد إلكتروني، ولا رقم هاتف، ولا تفاصيل دفع مرتبطة برفعك. الملف موجود. الرابط موجود. لا شيء آخر. هذا هو معنى أن تكون تطبيق مشاركة ملفات مشفّرة مجهولة الهوية حقيقياً — لا مجرد "تسجيل دخول اختياري" مغلّف بلغة تسويقية.',
        ],
        bullets: [
          'تشفير AES-256 في حالة الراحة — معيار صناعي بمستوى بنكي',
          'رفع مجهول — لا نسجل هويتك أو IP أو أنماط وصولك أبداً',
          'لا تُشارَك سجلات IP مع أطراف ثالثة',
          'حذف تلقائي: حدد تواريخ انتهاء الصلاحية لمسح الملفات آلياً',
          'معرفة صفرية: لا يمكننا قراءة ملفاتك، بل نخدمها فحسب',
          'روابط تنزيل لمرة واحدة: يُتلف الملف بعد أول تنزيل',
        ],
      },
      {
        h2: 'منصات مشاركة الملفات الآمنة للأعمال: ما الذي تبحث عنه فعلاً',
        paragraphs: [
          'تحتاج الشركات التي تشارك العقود والوثائق المالية وتسليمات العملاء إلى أكثر من "لا يلزم حساب." تحتاج إلى روابط محمية بكلمة مرور للاستخدام التجاري، وضوابط انتهاء الصلاحية، ومسارات تدقيق، والثقة بأن الملف لا يمكن الوصول إليه من قِبل الشخص الخطأ في الوقت الخطأ.',
          'على النقيض من منصات مشاركة الملفات المؤسسية التي تتطلب إعداداً من قِبل فريق تقنية المعلومات وعمليات شراء وتفاوضات على تراخيص لكل مستخدم وأسابيع من الإعداد، فإن Filesterr جاهز للإنتاج من اليوم الأول. سجّل الدخول، ارفع الملف، حدد كلمة مرور، اضبط تاريخ انتهاء الصلاحية، أرسل الرابط. يصل المستلم إلى صفحة تنزيل نظيفة — دون حاجة منه لحساب أو للانضمام إلى أي منصة.',
          'تعمل Filesterr بوصفها أفضل منصة لمشاركة الملفات للأعمال، للفرق التي تحتاج إلى المشاركة الخارجية دون إجبار المستلمين على الانضمام إلى نظام بيئي. الروابط الموجهة للعملاء، وتسليم أصول المقاولين، ومشاركة وثائق الموردين — كل هذا يستفيد من منصة مشاركة ملفات وتعاون لا تشترط أن يكون الطرف الآخر عميلاً يدفع.',
        ],
        bullets: [
          'روابط تنزيل محمية بكلمة مرور (Premium+)',
          'روابط تنزيل لمرة واحدة — الملف يتلف ذاتياً بعد الوصول',
          'تواريخ انتهاء الصلاحية — تُحذف الملفات تلقائياً في الوقت الذي تختاره',
          'تحليلات التنزيل — اعرف بالضبط من نزّل وأين ومتى',
          'لا إعلانات عدّ تنازلي لمدة 30 ثانية تعرّض مستلمك لمتتبعي أطراف ثالثة',
        ],
      },
      {
        h2: 'لماذا تتفوق Filesterr على منصات المؤسسات في المشاركة الخارجية',
        paragraphs: [
          'منصات مشاركة الملفات المؤسسية ممتازة للاستخدام الداخلي. SharePoint وGoogle Workspace وConfluence — أدوات قوية للفرق التي تعمل ضمن المحيط التقني ذاته. المشكلة تكمن في المشاركة الخارجية. حين تحتاج إلى إرسال ملف لشخص خارج مؤسستك، تشترط هذه المنصات عادةً أن ينشئ المستلم حساباً ويقبل شروط الخدمة ويتنقل في واجهة غير مألوفة.',
          'تشغل Filesterr الفجوة التي لا تخدمها منصات المؤسسات بشكل جيد: مشاركة خارجية سريعة وآمنة ومجهولة دون أي احتكاك من جانب المستلم. لا يحتاج عميلك إلى حساب في Filesterr. لا يحتاج المقاول الخاص بك إلى تثبيت أي شيء. يعمل الرابط في أي متصفح.',
          'بالنسبة للفرق التي تقيّم منصات مشاركة الملفات الآمنة للأعمال، كثيراً ما يعود المقارنة إلى التعاون الداخلي مقابل التسليم الخارجي. Filesterr مصمّمة خصيصاً للحالة الثانية. إنها لا تسعى لاستبدال تطبيقات الدردشة الداخلية أو منصات إدارة المحتوى لديك. إنها الأداة التي تلجأ إليها حين يحتاج شخص خارج مؤسستك إلى ملف الآن وبشكل آمن.',
        ],
      },
      {
        h2: 'مشاركة الملفات المشفّرة مقابل التخزين السحابي العادي',
        paragraphs: [
          'منصات التخزين السحابي مثل Google Drive وDropbox لم تُصمَّم للمشاركة السرية مع أطراف خارجية. فهي تشترط أن يمتلك المستلم حساباً، وتسجّل الوصول بالتفصيل، وتُفهرس ملفاتك وتجعلها قابلة للبحث من قِبل مزود الخدمة. هذا مقبول لملفات الفريق الداخلية، لكنه يُشكّل مصدر قلق من حيث الخصوصية في المشاركة الخارجية الحساسة.',
          'صُمِّمت Filesterr للمشاركة خارج نظامك البيئي. لا حساب للمستلم. لا اعتماد على منصة بعينها. ملفات تنتهي صلاحيتها. روابط تعمل مرة واحدة فقط ولا تعمل بعد ذلك. تشفير AES-256 في حالة الراحة. سياسة سجلات صفرية تشمل هويتك وعنوان IP وأنماط وصولك. هذا هو الشكل الحقيقي لمشاركة الملفات الخارجية الآمنة.',
        ],
      },
    ],
    relatedTitle: 'اعرف المزيد:',
    linkFeatures: 'كل الميزات →',
    linkPricing: 'ميزات الأمان حسب الخطة →',
  },
  zh: {
    eyebrow: 'AES-256加密 · 零日志 · 匿名上传',
    h1: '真正保护您隐私的安全文件共享',
    intro: '不是"我们重视安全"。是真正的安全：AES-256静态加密、不记录身份的匿名上传、到期自动删除和零知识存储。',
    cta: '安全分享文件',
    ctaSub: '匿名 · 加密 · 无需账户',
    badges: [
      { title: 'AES-256加密', sub: '静态和传输中均加密' },
      { title: '零IP日志', sub: '从不记录您的身份' },
      { title: '匿名上传', sub: '无账户，无痕迹' },
      { title: '自动删除', sub: '设置过期时间' },
      { title: 'GDPR合规', sub: '欧盟区域基础设施' },
      { title: '一次性链接', sub: '下载后文件自动删除' },
    ],
    sections: [
      {
        h2: '"安全文件共享"真正意味着什么',
        paragraphs: [
          '大多数文件托管服务都声称安全。但真正做到的寥寥无几。"安全"意味着：您的文件经过加密，托管方任何人都无法读取；匿名上传时不记录您的身份；文件在被访问后可以自动销毁。',
          'Filesterr 三点全部实现。文件在静态存储时使用 AES-256 加密——与银行和政府机构采用的标准相同。匿名上传不生成任何身份记录。我们从不记录您的身份、IP 地址或访问模式。到期日期会按您设定的时间表触发永久删除。',
          '没有账户意味着没有身份痕迹。匿名上传时，不存在与您的上传绑定的用户档案、电子邮件地址、手机号码或付款信息。文件存在。链接存在。仅此而已。这就是真正意义上的匿名加密文件共享应用——而不是用营销语言包装的"可选登录"。',
        ],
        bullets: [
          'AES-256静态加密——行业标准，银行级别',
          '匿名上传——从不记录您的身份、IP或访问模式',
          '不向第三方共享IP日志',
          '自动删除：设置到期日期，文件自动清除',
          '零知识：我们无法读取您的文件，仅能提供服务',
          '一次性下载链接：首次下载后文件即销毁',
        ],
      },
      {
        h2: '企业安全文件共享平台：真正需要关注什么',
        paragraphs: [
          '共享合同、财务文件或客户交付物的企业需要的不仅仅是"无需账户"。他们需要用于业务的密码保护链接、到期控制、审计追踪，以及确保文件不会在错误时间落入错误人手的保障。',
          '与需要IT部署、采购流程、按席位许可谈判和数周入职培训的企业文件共享平台不同，Filesterr 第一天就可投入生产使用。登录、上传、设置密码、设置到期日期、发送链接。您的接收方看到的是一个简洁的下载页面——他们无需账户，无需加入任何平台。',
          'Filesterr 是需要对外共享而又不想强迫接收方加入某个生态系统的团队的最佳文件共享平台。面向客户的链接、向承包商交付资产、与供应商共享文件——所有这些都得益于一个不要求对方成为付费客户的文件共享与协作平台。',
        ],
        bullets: [
          '密码保护的下载链接（Premium+）',
          '一次性下载链接——访问后文件自动销毁',
          '到期日期——文件在您选择的时间自动删除',
          '下载分析——精确了解谁在何时何地下载',
          '无30秒倒计时广告，不让您的接收方暴露于第三方追踪器',
        ],
      },
      {
        h2: 'Filesterr 为何在外部共享方面优于企业平台',
        paragraphs: [
          '企业文件共享平台在内部使用方面表现出色。SharePoint、Google Workspace、Confluence——对于同处一个IT边界的团队而言，这些都是强大的工具。问题在于外部共享。当您需要向组织外的人发送文件时，这些平台通常要求接收方创建账户、接受服务条款并熟悉陌生的界面。',
          'Filesterr 填补了企业文件共享平台服务不到位的空白：快速、安全、匿名的外部共享，接收方零摩擦。您的客户不需要 Filesterr 账户。您的承包商不需要安装任何东西。链接在任何浏览器中均可使用。',
          '对于评估企业安全文件共享平台的团队而言，比较往往归结为内部协作与外部交付之间的取舍。Filesterr 专为后者而生。它不试图取代您的即时通讯工具或内容管理系统。当组织外的人现在需要安全地获取一个文件时，它就是您的首选工具。',
        ],
      },
      {
        h2: '加密文件共享与常规云存储的区别',
        paragraphs: [
          '像 Google Drive 和 Dropbox 这样的云存储平台并非为与外部方进行机密共享而设计。它们要求接收方拥有账户，详细记录访问日志，而且您的文件会被服务商索引并变得可搜索。这对团队内部文件无妨，但对敏感的外部共享而言则是隐私隐患。',
          'Filesterr 专为在您的生态系统之外进行共享而设计。无需接收方账户。无平台锁定。文件会过期。链接只能使用一次，之后永久失效。AES-256静态加密。覆盖您的身份、IP和访问模式的零日志政策。这才是真正安全的外部文件共享的实际面貌。',
        ],
      },
    ],
    relatedTitle: '了解更多：',
    linkFeatures: '完整功能列表 →',
    linkPricing: '按方案查看安全功能 →',
  },
  pt: {
    eyebrow: 'Criptografado AES-256 · Zero logs · Uploads anônimos',
    h1: 'Compartilhamento Seguro de Arquivos que Realmente Protege sua Privacidade',
    intro: 'Não "levamos a segurança a sério." Segurança real: criptografia AES-256, uploads anônimos sem registro de identidade, exclusão automática ao expirar.',
    cta: 'Compartilhar um arquivo com segurança',
    ctaSub: 'Anônimo · Criptografado · Sem conta',
    badges: [
      { title: 'Criptografado AES-256', sub: 'Em repouso e em trânsito' },
      { title: 'Zero logs de IP', sub: 'Nunca registramos sua identidade' },
      { title: 'Uploads anônimos', sub: 'Sem conta, sem rastro' },
      { title: 'Exclusão automática', sub: 'Defina expiração' },
      { title: 'Conformidade LGPD/GDPR', sub: 'Infraestrutura na região da UE' },
      { title: 'Links únicos', sub: 'Arquivo excluído após download' },
    ],
    sections: [
      {
        h2: 'O que realmente significa "compartilhamento seguro de arquivos"',
        paragraphs: [
          'A maioria dos serviços de hospedagem de arquivos diz que é segura. Poucos de fato são. "Seguro" significa: seu arquivo é criptografado para que ninguém no servidor possa lê-lo, sua identidade não é registrada quando você faz upload de forma anônima, e o arquivo pode ser destruído automaticamente após ser acessado.',
          'O Filesterr implementa os três pontos. Os arquivos são criptografados com AES-256 em repouso — o mesmo padrão usado por bancos e órgãos governamentais. Uploads anônimos não geram nenhum registro de identidade. Nunca registramos sua identidade, IP ou padrões de acesso. As datas de expiração causam exclusão permanente conforme um cronograma que você controla.',
          'Sem conta, não há rastro de identidade. Quando você faz upload de forma anônima, não existe perfil de usuário, endereço de e-mail, número de telefone ou dados de pagamento vinculados ao seu upload. O arquivo existe. O link existe. Mais nada. É isso que significa ser um aplicativo genuinamente anônimo de compartilhamento de arquivos criptografados — não apenas um "login opcional" embrulhado em linguagem de marketing. Isso está em total conformidade com a LGPD.',
        ],
        bullets: [
          'Criptografia AES-256 em repouso — padrão da indústria, nível bancário',
          'Uploads anônimos — nunca registramos sua identidade, IP ou padrões de acesso',
          'Nenhum log de IP compartilhado com terceiros',
          'Exclusão automática: defina datas de expiração para apagar arquivos automaticamente',
          'Conhecimento zero: não podemos ler seus arquivos, apenas servi-los',
          'Links de download únicos: arquivo destruído após o primeiro download',
        ],
      },
      {
        h2: 'Plataformas de compartilhamento seguro de arquivos para empresas: o que realmente procurar',
        paragraphs: [
          'Empresas que compartilham contratos, documentos financeiros ou entregas para clientes precisam de mais do que "nenhuma conta necessária." Precisam de links protegidos por senha para uso corporativo, controles de expiração, trilhas de auditoria e a certeza de que o arquivo não pode ser acessado pela pessoa errada no momento errado.',
          'Diferentemente das plataformas empresariais de compartilhamento de arquivos que exigem configuração de TI, processos de aquisição, negociações de licença por usuário e semanas de integração, o Filesterr está pronto para produção no primeiro dia. Faça login, faça upload, defina uma senha, configure uma data de expiração, envie o link. Seu destinatário recebe uma página de download limpa — sem necessidade de conta do lado dele, sem plataforma para aderir.',
          'O Filesterr funciona como a melhor plataforma de compartilhamento de arquivos para empresas que precisam compartilhar externamente sem forçar os destinatários a um ecossistema. Links voltados para clientes, entrega de ativos a prestadores de serviço, compartilhamento de documentos com fornecedores — tudo isso se beneficia de uma plataforma que não exige que a outra parte seja um cliente pagante.',
        ],
        bullets: [
          'Links de download protegidos por senha (Premium+)',
          'Links de download únicos — o arquivo se autodestrói após o acesso',
          'Datas de expiração — arquivos excluídos automaticamente no horário que você escolher',
          'Análises de download — saiba exatamente quem, quando e de onde',
          'Sem anúncios de contagem regressiva de 30 segundos expondo seu destinatário a rastreadores de terceiros',
        ],
      },
      {
        h2: 'Por que o Filesterr supera as plataformas empresariais no compartilhamento externo',
        paragraphs: [
          'As plataformas empresariais de compartilhamento de arquivos são excelentes para uso interno. SharePoint, Google Workspace, Confluence — ferramentas poderosas para equipes dentro do mesmo perímetro de TI. O problema é o compartilhamento externo. Quando você precisa enviar um arquivo para alguém fora da sua organização, essas plataformas geralmente exigem que o destinatário crie uma conta, aceite termos de serviço e navegue em uma interface desconhecida.',
          'O Filesterr ocupa o espaço que as plataformas empresariais não atendem bem: compartilhamento externo rápido, seguro e anônimo sem fricção para o destinatário. Seu cliente não precisa de uma conta no Filesterr. Seu prestador de serviço não precisa instalar nada. O link funciona em qualquer navegador.',
          'Para equipes que avaliam plataformas seguras de compartilhamento de arquivos para empresas, a comparação frequentemente se resume a colaboração interna vs. entrega externa. O Filesterr é construído especificamente para o segundo caso. Ele não tenta substituir seu Slack ou SharePoint. É a ferramenta que você usa quando alguém fora da sua organização precisa de um arquivo, com segurança, agora.',
        ],
      },
      {
        h2: 'Compartilhamento de arquivos criptografado vs. armazenamento em nuvem comum',
        paragraphs: [
          'Plataformas de armazenamento em nuvem como Google Drive e Dropbox não foram projetadas para compartilhamento confidencial com partes externas. Elas exigem que o destinatário tenha uma conta, registram o acesso em detalhes e seus arquivos são indexados e pesquisáveis pelo provedor. Isso é aceitável para arquivos internos da equipe. É uma preocupação de privacidade — e potencialmente um problema de conformidade com a LGPD — para compartilhamentos externos sensíveis.',
          'O Filesterr foi projetado para compartilhamento fora do seu ecossistema. Sem conta do destinatário. Sem dependência de plataforma. Arquivos que expiram. Links que funcionam uma vez e nunca mais. Criptografia AES-256 em repouso. Uma política de zero logs cobrindo sua identidade, IP e padrões de acesso. É assim que parece o compartilhamento externo de arquivos genuinamente seguro.',
        ],
      },
    ],
    relatedTitle: 'Saiba mais:',
    linkFeatures: 'Todos os Recursos →',
    linkPricing: 'Recursos de Segurança por Plano →',
  },
  ja: {
    eyebrow: 'AES-256暗号化 · ゼロログ · 匿名アップロード',
    h1: 'あなたのプライバシーを本当に守る安全なファイル共有',
    intro: '「セキュリティを真剣に考えています」ではなく。本物のセキュリティ：AES-256静的暗号化、身元ログなしの匿名アップロード、期限切れ時の自動削除。',
    cta: 'ファイルを安全に共有',
    ctaSub: '匿名 · 暗号化済み · アカウント不要',
    badges: [
      { title: 'AES-256暗号化', sub: '静的および転送中' },
      { title: 'ゼロIPログ', sub: '身元を記録しない' },
      { title: '匿名アップロード', sub: 'アカウント不要、痕跡なし' },
      { title: '自動削除', sub: '有効期限を設定' },
      { title: 'GDPR準拠', sub: 'EUリージョンインフラ' },
      { title: 'ワンタイムリンク', sub: 'ダウンロード後ファイル削除' },
    ],
    sections: [
      {
        h2: '「安全なファイル共有」が実際に意味すること',
        paragraphs: [
          'ほとんどのファイルホスティングサービスは安全だと主張しています。しかし実際にそれを実現しているものは少数です。「安全」とは、ホスト側の誰もファイルを読めないよう暗号化されていること、匿名アップロード時に身元が記録されないこと、そしてアクセス後にファイルが自動的に破棄できることを意味します。',
          'Filesterr はこの三点すべてを実装しています。ファイルは保存時に AES-256 で暗号化されます——銀行や政府機関が使用するのと同じ標準です。匿名アップロードは一切の身元記録を生成しません。お客様の身元、IPアドレス、アクセスパターンをログに記録することはありません。有効期限を設定すると、お客様が管理するスケジュールに従って永久削除が実行されます。',
          'アカウントがなければ身元の痕跡もありません。匿名でアップロードする場合、ユーザープロフィール、メールアドレス、電話番号、支払い情報のいずれもアップロードに紐付けられません。ファイルが存在します。リンクが存在します。それ以外は何もありません。これが本物の匿名暗号化ファイル共有アプリの意味するところです——マーケティング言語で包まれた「任意ログイン」ではありません。',
        ],
        bullets: [
          'AES-256静的暗号化——業界標準、銀行レベル',
          '匿名アップロード——身元、IP、アクセスパターンを一切記録しません',
          'サードパーティへのIPログの共有なし',
          '自動削除：有効期限を設定してファイルを自動消去',
          'ゼロ知識：お客様のファイルを読むことはできず、提供のみ行います',
          'ワンタイムダウンロードリンク：初回ダウンロード後にファイルが破棄されます',
        ],
      },
      {
        h2: 'ビジネス向け安全なファイル共有プラットフォーム：本当に確認すべきポイント',
        paragraphs: [
          '契約書、財務書類、クライアントへの成果物を共有する企業には「アカウント不要」以上のものが必要です。ビジネス用途のパスワード保護リンク、有効期限の管理、監査証跡、そしてファイルが誤った人物に誤ったタイミングでアクセスされないという確信が求められます。',
          'IT部門のセットアップ、調達プロセス、シート単位のライセンス交渉、数週間のオンボーディングを必要とするエンタープライズファイル共有プラットフォームとは異なり、Filesterr は初日から本番環境に対応しています。ログインし、アップロードし、パスワードを設定し、有効期限を設定し、リンクを送信するだけです。受信者はシンプルなダウンロードページを受け取ります——相手側にアカウントは不要で、参加すべきプラットフォームもありません。',
          'Filesterr は、受信者をエコシステムに強制せずに外部共有が必要なチームにとって最良のビジネス向けファイル共有プラットフォームとして機能します。クライアント向けリンク、コントラクターへのアセット納品、サプライヤーとの文書共有——これらすべては、相手が有料顧客である必要がないファイル共有・コラボレーションプラットフォームから恩恵を受けます。',
        ],
        bullets: [
          'パスワード保護ダウンロードリンク（Premium+）',
          'ワンタイムダウンロードリンク——アクセス後にファイルが自動消去',
          '有効期限——お客様が選択した日時にファイルが自動削除',
          'ダウンロード分析——誰がいつどこからダウンロードしたかを正確に把握',
          '30秒カウントダウン広告なし——受信者がサードパーティのトラッカーにさらされません',
        ],
      },
      {
        h2: 'Filesterr が外部共有においてエンタープライズプラットフォームを上回る理由',
        paragraphs: [
          'エンタープライズファイル共有プラットフォームは社内利用に優れています。SharePoint、Google Workspace、Confluence——同じITペリメーター内に存在するチームにとって強力なツールです。問題は外部共有です。組織外の誰かにファイルを送る必要がある場合、これらのプラットフォームは通常、受信者にアカウントの作成、利用規約への同意、見慣れないインターフェースの操作を求めます。',
          'Filesterr は、エンタープライズファイル共有プラットフォームが十分に対応できていない隙間を埋めます：受信者側の摩擦がない、迅速で安全な匿名外部共有です。お客様のクライアントは Filesterr のアカウントを必要としません。コントラクターは何もインストールする必要がありません。リンクはどのブラウザでも動作します。',
          'ビジネス向けの安全なファイル共有プラットフォームを評価しているチームにとって、比較はしばしば社内コラボレーションと外部デリバリーのどちらかという選択に集約されます。Filesterr は後者のために特化して設計されています。SlackやSharePointを置き換えようとするものではありません。組織外の誰かが今すぐ安全にファイルを必要としている場面で活躍するツールです。',
        ],
      },
      {
        h2: '暗号化ファイル共有と通常のクラウドストレージの違い',
        paragraphs: [
          'Google Drive や Dropbox のようなクラウドストレージプラットフォームは、外部関係者との機密共有を目的として設計されていません。受信者のアカウントを必要とし、アクセスを詳細にログに記録し、ファイルはプロバイダーによってインデックス化・検索可能な状態になります。社内チームのファイルには問題ありませんが、機密性の高い外部共有ではプライバシー上の懸念となります。',
          'Filesterr はエコシステムの外部への共有のために設計されています。受信者アカウント不要。プラットフォームロックインなし。有効期限のあるファイル。一度しか機能しないリンク。AES-256静的暗号化。身元、IP、アクセスパターンをカバーするゼロログポリシー。これが本物の安全な外部ファイル共有の実際の姿です。',
        ],
      },
    ],
    relatedTitle: 'さらに詳しく:',
    linkFeatures: 'すべての機能 →',
    linkPricing: 'プラン別セキュリティ機能 →',
  },
  ru: {
    eyebrow: 'AES-256 шифрование · Нулевые логи · Анонимные загрузки',
    h1: 'Безопасный обмен файлами, который действительно защищает вашу приватность',
    intro: 'Не "мы серьёзно относимся к безопасности." Реальная безопасность: AES-256 шифрование, анонимные загрузки без записи личности, автоудаление при истечении срока.',
    cta: 'Поделиться файлом безопасно',
    ctaSub: 'Анонимно · Зашифровано · Без аккаунта',
    badges: [
      { title: 'AES-256 шифрование', sub: 'В покое и при передаче' },
      { title: 'Нулевые IP-логи', sub: 'Никогда не записываем личность' },
      { title: 'Анонимные загрузки', sub: 'Без аккаунта, без следов' },
      { title: 'Автоудаление', sub: 'Установите срок действия' },
      { title: 'Соответствие GDPR', sub: 'Инфраструктура ЕС' },
      { title: 'Одноразовые ссылки', sub: 'Файл удалён после загрузки' },
    ],
    sections: [
      {
        h2: 'Что на самом деле означает "безопасный обмен файлами"',
        paragraphs: [
          'Большинство файловых хостингов называют себя безопасными. Немногие из них это действительно обеспечивают. «Безопасно» означает: ваш файл зашифрован так, что никто на стороне хостинга не может его прочитать, ваша личность не фиксируется при анонимной загрузке, и файл может быть автоматически уничтожен после того, как к нему получили доступ.',
          'Filesterr реализует все три пункта. Файлы шифруются с помощью AES-256 в состоянии покоя — того же стандарта, который используют банки и государственные ведомства. Анонимные загрузки не создают никаких записей о личности. Мы никогда не фиксируем вашу личность, IP-адрес или паттерны доступа. Даты истечения срока действия запускают постоянное удаление по расписанию, которое контролируете вы.',
          'Нет аккаунта — нет следа вашей личности. При анонимной загрузке не существует ни профиля пользователя, ни адреса электронной почты, ни номера телефона, ни платёжных данных, привязанных к вашей загрузке. Файл существует. Ссылка существует. Больше ничего. Именно это и означает быть по-настоящему анонимным приложением для обмена зашифрованными файлами — а не просто «необязательный вход» в обёртке маркетингового языка.',
        ],
        bullets: [
          'AES-256 шифрование в покое — промышленный стандарт, банковский уровень',
          'Анонимные загрузки — никогда не записываем вашу личность, IP или паттерны доступа',
          'Никакие IP-логи не передаются третьим лицам',
          'Автоудаление: устанавливайте даты истечения для автоматического стирания файлов',
          'Нулевые знания: мы не можем читать ваши файлы, только передавать их',
          'Одноразовые ссылки для скачивания: файл уничтожается после первой загрузки',
        ],
      },
      {
        h2: 'Безопасные платформы для обмена файлами в бизнесе: на что реально обращать внимание',
        paragraphs: [
          'Компаниям, которые обмениваются договорами, финансовыми документами или результатами работ для клиентов, нужно больше, чем «аккаунт не требуется». Им нужны ссылки с защитой паролем для делового использования, контроль сроков действия, журналы аудита и уверенность в том, что файл не попадёт не в те руки в не то время.',
          'В отличие от корпоративных платформ для обмена файлами, требующих настройки IT-инфраструктуры, закупочных процессов, переговоров о лицензировании на каждое рабочее место и недель онбординга, Filesterr готов к работе с первого дня. Войдите, загрузите, установите пароль, задайте дату истечения, отправьте ссылку. Получатель видит чистую страницу загрузки — аккаунт с его стороны не требуется, присоединяться к какой-либо платформе не нужно.',
          'Filesterr выступает лучшей платформой для обмена файлами в бизнесе для команд, которым нужно делиться данными с внешними сторонами, не принуждая получателей вступать в экосистему. Ссылки для клиентов, передача ресурсов подрядчикам, обмен документами с поставщиками — всё это выигрывает от платформы, которая не требует от другой стороны быть платным клиентом.',
        ],
        bullets: [
          'Защищённые паролем ссылки для скачивания (Premium+)',
          'Одноразовые ссылки для скачивания — файл самоуничтожается после доступа',
          'Даты истечения — файлы автоматически удаляются в выбранное вами время',
          'Аналитика загрузок — знайте точно кто, когда и откуда скачал',
          'Никаких 30-секундных рекламных обратных отсчётов, подвергающих получателя сторонним трекерам',
        ],
      },
      {
        h2: 'Почему Filesterr превосходит корпоративные платформы для внешнего обмена',
        paragraphs: [
          'Корпоративные платформы для обмена файлами отлично подходят для внутреннего использования. SharePoint, Google Workspace, Confluence — мощные инструменты для команд, работающих в рамках одного IT-периметра. Проблема возникает при внешнем обмене. Когда вам нужно отправить файл кому-то за пределами вашей организации, эти платформы, как правило, требуют от получателя создания аккаунта, принятия условий использования и навигации в незнакомом интерфейсе.',
          'Filesterr занимает нишу, которую корпоративные платформы не обслуживают должным образом: быстрый, безопасный, анонимный внешний обмен без каких-либо трудностей для получателя. Вашему клиенту не нужен аккаунт в Filesterr. Вашему подрядчику не нужно ничего устанавливать. Ссылка работает в любом браузере.',
          'Для команд, оценивающих безопасные платформы для обмена файлами в бизнесе, сравнение нередко сводится к выбору между внутренней совместной работой и внешней доставкой. Filesterr создан специально для второго случая. Он не претендует заменить ваш мессенджер или корпоративную вики. Это инструмент, к которому вы обращаетесь, когда кому-то за пределами вашей организации прямо сейчас нужен файл — безопасно и без лишних сложностей.',
        ],
      },
      {
        h2: 'Зашифрованный обмен файлами vs. обычное облачное хранилище',
        paragraphs: [
          'Облачные хранилища вроде Google Drive и Dropbox не предназначены для конфиденциального обмена с внешними сторонами. Они требуют, чтобы получатель имел аккаунт, детально фиксируют доступ, а ваши файлы индексируются и доступны для поиска со стороны провайдера. Для внутрикомандных файлов это приемлемо. Для конфиденциального внешнего обмена — это угроза приватности.',
          'Filesterr создан для обмена за пределами вашей экосистемы. Без аккаунта у получателя. Без привязки к платформе. Файлы с истекающим сроком действия. Ссылки, работающие один раз и никогда больше. AES-256 шифрование в покое. Политика нулевых логов, охватывающая вашу личность, IP и паттерны доступа. Вот как на самом деле выглядит подлинный безопасный внешний обмен файлами.',
        ],
      },
    ],
    relatedTitle: 'Узнать больше:',
    linkFeatures: 'Все функции →',
    linkPricing: 'Функции безопасности по планам →',
  },
}

const c = computed(() => content[locale.value] || content.en)

const metaContent = {
  en: { title: 'Secure File Sharing — AES-256 Encrypted, Anonymous, Zero Logs | Filesterr', description: 'Share files securely with AES-256 encryption, anonymous uploads, and auto-delete. No IP logs, no identity tracking. Password-protected and one-time links available.' },
  tr: { title: 'Güvenli Dosya Paylaşımı — AES-256 Şifreli, Anonim, Sıfır Log | Filesterr', description: 'AES-256 şifreleme, anonim yüklemeler ve otomatik silme ile güvenli dosya paylaşımı. IP kaydı yok, kimlik takibi yok.' },
  de: { title: 'Sicherer Datenaustausch — AES-256 verschlüsselt, anonym, keine Logs | Filesterr', description: 'Sicher Dateien teilen mit AES-256, anonymen Uploads und Auto-Löschen. Keine IP-Protokolle, keine Identitätsverfolgung.' },
  fr: { title: 'Partage sécurisé de fichiers — AES-256, anonyme, zéro log | Filesterr', description: 'Partagez des fichiers en toute sécurité avec chiffrement AES-256, uploads anonymes et suppression auto. Aucun log IP, aucun suivi d\'identité.' },
  es: { title: 'Compartir archivos de forma segura — AES-256, anónimo, sin logs | Filesterr', description: 'Comparte archivos de forma segura con cifrado AES-256, subidas anónimas y eliminación automática. Sin logs IP, sin seguimiento de identidad.' },
  ar: { title: 'مشاركة الملفات الآمنة — AES-256، مجهول، سجلات صفرية | Filesterr', description: 'شارك الملفات بأمان مع تشفير AES-256، رفع مجهول، وحذف تلقائي. بدون سجلات IP، بدون تتبع الهوية.' },
  zh: { title: '安全文件共享 — AES-256加密、匿名、零日志 | Filesterr', description: '通过AES-256加密、匿名上传和自动删除安全共享文件。无IP日志，无身份追踪。' },
  pt: { title: 'Compartilhamento Seguro de Arquivos — AES-256, Anônimo, Zero Logs | Filesterr', description: 'Compartilhe arquivos com segurança usando criptografia AES-256, uploads anônimos e exclusão automática. Sem logs de IP, sem rastreamento de identidade.' },
  ja: { title: '安全なファイル共有 — AES-256暗号化、匿名、ゼロログ | Filesterr', description: 'AES-256暗号化、匿名アップロード、自動削除で安全にファイルを共有。IPログなし、身元追跡なし。' },
  ru: { title: 'Безопасный обмен файлами — AES-256, анонимно, нулевые логи | Filesterr', description: 'Делитесь файлами безопасно с AES-256 шифрованием, анонимными загрузками и автоудалением. Без IP-логов, без отслеживания личности.' },
}

const meta = computed(() => metaContent[locale.value] || metaContent.en)
const canonicalLocale = computed(() => locale.value && locale.value !== 'en' ? `/${locale.value}/secure-file-sharing` : '/secure-file-sharing')

useHead({
  title: computed(() => meta.value.title),
  meta: [
    { name: 'description', content: computed(() => meta.value.description) },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: computed(() => `https://filesterr.com${canonicalLocale.value}`) }],
})
</script>
