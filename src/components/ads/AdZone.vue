<template>
  <!-- Loading skeleton -->
  <div v-if="fetching" :class="containerClass">
    <div class="animate-pulse rounded bg-zinc-100 dark:bg-zinc-800/60 min-h-[60px]" />
  </div>
  <!-- Ad loaded -->
  <div v-else-if="ready && ad" :class="containerClass" :data-ad-zone="ad.zone" :data-ad-network="ad.network">
    <div v-if="ad.tag_type === 'adsterra_native'" :id="ad.container_id" />
    <div v-else :ref="el => { if (el) container = el }" />
  </div>
  <!-- No ad — optional visible placeholder (label=true) -->
  <div v-else-if="label && !fetching" :class="containerClass">
    <div class="min-h-[60px] flex items-center justify-center text-[10px] font-medium uppercase tracking-widest text-zinc-300 dark:text-zinc-600 select-none">
      Advertisement
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  zone:           { type: String, required: true },
  containerClass: { type: String, default: '' },
  label:          { type: Boolean, default: false },
})

const ready     = ref(false)
const fetching  = ref(false)
const ad        = ref(null)
const container = ref(null)
const injected  = ref([])   // script elements we created, for cleanup

const ACLIB_SRC        = '//acscdn.com/script/aclib.js'
const AD_PROVIDER_SRC  = 'https://a.magsrv.com/ad-provider.js'
const EXOCLICK_POP_SRC = '//a.pemsrv.com/popunder1000.js'

let aclibLoaded       = false
let adProviderLoaded  = false

onMounted(async () => {
  if (typeof window === 'undefined') return
  fetching.value = true
  try {
    const res = await fetch(`/api/v1/ads/zone/?slot=${encodeURIComponent(props.zone)}`)
    if (!res.ok) { fetching.value = false; return }
    const data = await res.json()
    fetching.value = false
    if (!data.ad) return
    ad.value = data.ad
    ready.value = true

    await new Promise(r => setTimeout(r, 50))
    const ok = await injectTag(data.ad)
    // Script yüklenemedi → impression'ı başarısız say, bandit cezalandırsın
    if (!ok) reportAdFailure(data.ad.impression_id)
  } catch {
    fetching.value = false
  }
})

onUnmounted(() => {
  for (const el of injected.value) {
    el.parentNode?.removeChild(el)
  }
})

// Returns true if injection was successful, false if a required script failed to load.
async function injectTag(cfg) {
  const { tag_type } = cfg

  if (tag_type === 'script_src') {
    return loadScript(cfg.src)
  }
  if (tag_type === 'adsterra_native') {
    return loadScript(cfg.src)
  }
  if (tag_type === 'adsterra_banner') {
    const s = document.createElement('script')
    s.text = `window.atOptions = { key: '${cfg.key}', format: 'iframe', height: ${cfg.height}, width: ${cfg.width}, params: {} };`
    document.head.appendChild(s)
    injected.value.push(s)
    return loadScript(cfg.src)
  }
  if (tag_type === 'aclib_pop') {
    const ok = await ensureAclib(cfg.aclib_src)
    if (!ok) return false
    const s = document.createElement('script')
    s.text = `if(window.aclib) aclib.runPop({ zoneId: '${cfg.zone_id}' });`
    document.body.appendChild(s)
    injected.value.push(s)
    return true
  }
  if (tag_type === 'aclib_inpage') {
    const ok = await ensureAclib(cfg.aclib_src)
    if (!ok) return false
    const s = document.createElement('script')
    s.text = `if(window.aclib) aclib.runInPagePush({ zoneId: '${cfg.zone_id}', maxAds: ${cfg.max_ads || 2} });`
    document.body.appendChild(s)
    injected.value.push(s)
    return true
  }
  if (tag_type === 'aclib_banner') {
    const ok = await ensureAclib(cfg.aclib_src)
    if (!ok) return false
    const wrapper = container.value || document.createElement('div')
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.text = `if(window.aclib) aclib.runBanner({ zoneId: '${cfg.zone_id}' });`
    wrapper.appendChild(s)
    injected.value.push(s)
    return true
  }
  if (tag_type === 'monetag_script') {
    return loadScript(cfg.src, s => { s.dataset.zone = cfg.zone_id })
  }
  if (tag_type === 'hilltop_script') {
    return loadScript(cfg.src, s => { s.referrerPolicy = 'no-referrer-when-downgrade' })
  }
  if (tag_type === 'exoclick_ins') {
    const ok = await ensureAdProvider()
    if (!ok) return false
    const ins = document.createElement('ins')
    ins.className      = cfg.ins_class
    ins.dataset.zoneid = cfg.zone_id
    const wrapper = container.value
    if (wrapper) wrapper.appendChild(ins)
    ;(window.AdProvider = window.AdProvider || []).push({ serve: {} })
    return true
  }
  if (tag_type === 'exoclick_pop') {
    // Page-level singleton — not tracked in injected[] intentionally (see earlier comment)
    if (document.getElementById('exoclick-pop')) return true
    const s = document.createElement('script')
    s.type  = 'application/javascript'
    s.async = true
    s.src   = EXOCLICK_POP_SRC
    s.id    = 'exoclick-pop'
    const popCfg = {
      idzone: cfg.zone_id, ads_host: 'a.pemsrv.com', syndication_host: 's.pemsrv.com',
      popup_fallback: true, popup_force: false, chrome_enabled: true, new_tab: true,
      frequency_period: 720, frequency_count: 1, trigger_method: 3, trigger_delay: 0,
      capping_enabled: true, tcf_enabled: true, only_inline: false,
    }
    for (const [k, v] of Object.entries(popCfg)) s.setAttribute(`data-exo-${k}`, v)
    return new Promise(resolve => {
      s.onload  = () => resolve(true)
      s.onerror = () => resolve(false)
      document.body.insertBefore(s, document.body.firstChild)
    })
  }
  return true
}

// Returns true on success, false on script load error
function loadScript(src, mutate) {
  if (!src) return Promise.resolve(false)
  return new Promise(resolve => {
    const s = document.createElement('script')
    s.src   = src
    s.async = true
    if (mutate) mutate(s)
    s.onload  = () => resolve(true)
    s.onerror = () => resolve(false)
    document.head.appendChild(s)
    injected.value.push(s)
  })
}

// Returns true if aclib loaded (or was already loaded), false on error
function ensureAclib(src) {
  if (aclibLoaded) return Promise.resolve(true)
  const existing = document.getElementById('aclib')
  if (existing) { aclibLoaded = true; return Promise.resolve(true) }
  return new Promise(resolve => {
    const s  = document.createElement('script')
    s.id     = 'aclib'
    s.src    = src || ACLIB_SRC
    s.async  = true
    s.onload  = () => { aclibLoaded = true; resolve(true) }
    s.onerror = () => resolve(false)
    document.head.appendChild(s)
    injected.value.push(s)
  })
}

function ensureAdProvider() {
  if (adProviderLoaded) return Promise.resolve(true)
  const existing = document.getElementById('exoclick-ad-provider')
  if (existing) { adProviderLoaded = true; return Promise.resolve(true) }
  return new Promise(resolve => {
    const s  = document.createElement('script')
    s.id     = 'exoclick-ad-provider'
    s.src    = AD_PROVIDER_SRC
    s.async  = true
    s.onload  = () => { adProviderLoaded = true; resolve(true) }
    s.onerror = () => resolve(false)
    document.head.appendChild(s)
    injected.value.push(s)
  })
}

function reportAdFailure(impressionId) {
  if (!impressionId) return
  // fire-and-forget — stats puller won't overwrite once cpm is set
  fetch('/api/v1/ads/reward/', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ impression_id: impressionId, cpm_usd: 0, filled: false }),
  }).catch(() => {})
}
</script>
