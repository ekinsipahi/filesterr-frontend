/**
 * useVisitorTracking
 *
 * Client-side behavior collection for bot/visitor detection.
 * Collects: fingerprint, mouse behavior, scroll, headless signals,
 * referrer, timing — sends to backend for analysis.
 *
 * Uses a persistent cookie (vd_vid) as visitor ID so we can
 * recognize returning visitors without localStorage.
 */

// Cookie helpers — no dependency needed
function getCookie(name) {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : null
}

function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

function uuid() {
  return crypto.randomUUID ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
}

// Detect headless/bot signals
function getHeadlessSignals() {
  const signals = {}
  try {
    // WebDriver flag
    signals.webdriver = !!navigator.webdriver
    // Missing plugins (headless Chrome has 0)
    signals.noPlugins = navigator.plugins.length === 0
    // Chrome-specific: missing chrome object in headless
    signals.noChrome = typeof window.chrome === 'undefined'
    // Permissions API inconsistency (Puppeteer quirk)
    signals.permDenied = false
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'notifications' })
        .then(p => { signals.permDenied = Notification.permission === 'denied' && p.state === 'prompt' })
        .catch(() => {})
    }
    // Missing languages
    signals.noLanguages = !navigator.languages || navigator.languages.length === 0
    // Selenium detector
    signals.selenium = !!(window._selenium || window.__selenium_unwrapped || window.__webdriverFunc)
    // PhantomJS
    signals.phantom = !!(window.callPhantom || window._phantom)
  } catch {}
  return signals
}

// Collect static fingerprint data
function collectStatic() {
  return {
    ua: navigator.userAgent,
    lang: navigator.language,
    langs: Array.from(navigator.languages || []),
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${screen.width}x${screen.height}x${screen.colorDepth}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    dpr: window.devicePixelRatio,
    platform: navigator.platform,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory || null,
    connection: navigator.connection ? {
      type: navigator.connection.effectiveType,
      rtt: navigator.connection.rtt,
      downlink: navigator.connection.downlink,
    } : null,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    referrer: document.referrer || null,
    origin: window.location.origin,
    path: window.location.pathname,
    headless: getHeadlessSignals(),
    ts: Date.now(),
  }
}

// Behavior tracking state
const behavior = {
  mouseMoves: 0,
  mouseEvents: [],  // sample of {x,y,t} — last 20
  clicks: 0,
  scrollDepth: 0,
  keyPresses: 0,
  firstInteraction: null,
  timeOnPage: 0,
  pageStart: Date.now(),
  straightLines: 0,   // bot indicator: perfectly straight mouse paths
}

let behaviorListeners = []

function startBehaviorTracking() {
  if (typeof window === 'undefined') return

  const onMove = (e) => {
    behavior.mouseMoves++
    const now = Date.now()
    if (!behavior.firstInteraction) behavior.firstInteraction = now - behavior.pageStart

    // Sample every 10th move
    if (behavior.mouseMoves % 10 === 0) {
      const last = behavior.mouseEvents[behavior.mouseEvents.length - 1]
      const point = { x: e.clientX, y: e.clientY, t: now }
      behavior.mouseEvents.push(point)
      if (behavior.mouseEvents.length > 20) behavior.mouseEvents.shift()

      // Detect straight lines (bot behavior)
      if (last && behavior.mouseEvents.length >= 3) {
        const prev2 = behavior.mouseEvents[behavior.mouseEvents.length - 3]
        const prev1 = behavior.mouseEvents[behavior.mouseEvents.length - 2]
        const dx1 = prev1.x - prev2.x, dy1 = prev1.y - prev2.y
        const dx2 = point.x - prev1.x, dy2 = point.y - prev1.y
        // Cross product near 0 = straight line
        const cross = Math.abs(dx1 * dy2 - dy1 * dx2)
        if (cross < 5 && (Math.abs(dx1) + Math.abs(dy1)) > 10) behavior.straightLines++
      }
    }
  }

  const onClick = () => {
    behavior.clicks++
    if (!behavior.firstInteraction) behavior.firstInteraction = Date.now() - behavior.pageStart
  }

  const onScroll = () => {
    const scrolled = window.scrollY + window.innerHeight
    const total = document.documentElement.scrollHeight
    behavior.scrollDepth = Math.max(behavior.scrollDepth, Math.round((scrolled / total) * 100))
  }

  const onKey = () => { behavior.keyPresses++ }

  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('click', onClick, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey, { passive: true })

  behaviorListeners = [
    () => window.removeEventListener('mousemove', onMove),
    () => window.removeEventListener('click', onClick),
    () => window.removeEventListener('scroll', onScroll),
    () => window.removeEventListener('keydown', onKey),
  ]
}

function stopBehaviorTracking() {
  behaviorListeners.forEach(fn => fn())
  behaviorListeners = []
}

function getBehaviorSnapshot() {
  return {
    mouseMoves: behavior.mouseMoves,
    mousePathSample: behavior.mouseEvents.slice(-10),
    clicks: behavior.clicks,
    scrollDepth: behavior.scrollDepth,
    keyPresses: behavior.keyPresses,
    firstInteractionMs: behavior.firstInteraction,
    timeOnPageMs: Date.now() - behavior.pageStart,
    straightLineRatio: behavior.mouseMoves > 0
      ? behavior.straightLines / behavior.mouseMoves
      : 0,
    // Likely bot if: no mouse movement + no first interaction after 3s
    likelyBot: behavior.mouseMoves === 0 && behavior.clicks === 0,
  }
}

// Canvas fingerprint
async function canvasFingerprint() {
  try {
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = '#069'
    ctx.fillText('VaultDrop🔒', 2, 15)
    ctx.fillStyle = 'rgba(102,204,0,0.7)'
    ctx.fillText('VaultDrop🔒', 4, 17)
    return c.toDataURL().slice(-50) // last 50 chars = unique hash
  } catch { return null }
}

// WebGL fingerprint
function webglFingerprint() {
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl')
    if (!gl) return null
    const info = gl.getExtension('WEBGL_debug_renderer_info')
    return info ? {
      vendor: gl.getParameter(info.UNMASKED_VENDOR_WEBGL),
      renderer: gl.getParameter(info.UNMASKED_RENDERER_WEBGL),
    } : null
  } catch { return null }
}

// Main composable
export function useVisitorTracking() {
  let visitorId = null
  let sessionData = null
  let initialized = false

  async function init() {
    if (typeof window === 'undefined' || initialized) return
    initialized = true

    // 1. Get or create persistent visitor ID via cookie
    visitorId = getCookie('vd_vid')
    const isReturning = !!visitorId
    if (!visitorId) {
      visitorId = uuid()
      setCookie('vd_vid', visitorId)
    }

    // 2. Start behavior tracking
    startBehaviorTracking()

    // 3. Collect static data + fingerprints
    const [canvas, webgl] = await Promise.all([
      canvasFingerprint(),
      Promise.resolve(webglFingerprint()),
    ])

    sessionData = {
      visitorId,
      isReturning,
      ...collectStatic(),
      canvas,
      webgl,
    }

    // 4. Send initial signal to backend after 2s (behavior data will be richer)
    setTimeout(() => sendToBackend('pageview'), 2000)

    // 5. Send on page unload with full behavior data
    window.addEventListener('beforeunload', () => sendToBackend('unload'), { once: true })
  }

  async function sendToBackend(event) {
    if (!sessionData) return
    const payload = {
      event,
      ...sessionData,
      behavior: getBehaviorSnapshot(),
    }

    try {
      // Use sendBeacon for unload events (non-blocking)
      if (event === 'unload' && navigator.sendBeacon) {
        navigator.sendBeacon('/api/v1/visitor/', JSON.stringify(payload))
      } else {
        await fetch('/api/v1/visitor/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        })
      }
    } catch { /* fail silently */ }
  }

  function destroy() {
    stopBehaviorTracking()
  }

  return {
    init,
    destroy,
    getVisitorId: () => visitorId,
    getBehavior: getBehaviorSnapshot,
    isReturning: () => !!getCookie('vd_vid'),
  }
}