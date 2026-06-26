<template>
  <div v-if="ready && ad" :class="containerClass" :data-ad-zone="ad.zone" :data-ad-network="ad.network">
    <!-- Adsterra Native: needs a named container div -->
    <div v-if="ad.tag_type === 'adsterra_native'" :id="ad.container_id" />
    <!-- All other types: script injection is handled in onMounted -->
    <div v-else :ref="el => { if (el) container = el }" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  zone:           { type: String, required: true },
  containerClass: { type: String, default: '' },
})

const ready     = ref(false)
const ad        = ref(null)
const container = ref(null)
const injected  = ref([])   // script elements we created, for cleanup

const ACLIB_SRC   = '//acscdn.com/script/aclib.js'
let   aclibLoaded = false

onMounted(async () => {
  if (typeof window === 'undefined') return
  try {
    const res = await fetch(`/api/v1/ads/zone/?slot=${encodeURIComponent(props.zone)}`)
    if (!res.ok) return
    const data = await res.json()
    if (!data.ad) return
    ad.value = data.ad
    ready.value = true

    // Give Vue a tick to render the container div
    await new Promise(r => setTimeout(r, 50))
    await injectTag(data.ad)
  } catch { /* network errors are silent — no ad shown */ }
})

onUnmounted(() => {
  // Clean up injected script nodes to avoid leaks on SPA navigation
  for (const el of injected.value) {
    el.parentNode?.removeChild(el)
  }
})

async function injectTag(cfg) {
  const { tag_type } = cfg

  if (tag_type === 'script_src') {
    loadScript(cfg.src)
  }
  else if (tag_type === 'adsterra_native') {
    loadScript(cfg.src)
  }
  else if (tag_type === 'adsterra_banner') {
    const s = document.createElement('script')
    s.text = `window.atOptions = { key: '${cfg.key}', format: 'iframe', height: ${cfg.height}, width: ${cfg.width}, params: {} };`
    document.head.appendChild(s)
    injected.value.push(s)
    loadScript(cfg.src)
  }
  else if (tag_type === 'aclib_pop') {
    await ensureAclib(cfg.aclib_src)
    const s = document.createElement('script')
    s.text = `if(window.aclib) aclib.runPop({ zoneId: '${cfg.zone_id}' });`
    document.body.appendChild(s)
    injected.value.push(s)
  }
  else if (tag_type === 'aclib_inpage') {
    await ensureAclib(cfg.aclib_src)
    const s = document.createElement('script')
    s.text = `if(window.aclib) aclib.runInPagePush({ zoneId: '${cfg.zone_id}', maxAds: ${cfg.max_ads || 2} });`
    document.body.appendChild(s)
    injected.value.push(s)
  }
  else if (tag_type === 'aclib_banner') {
    await ensureAclib(cfg.aclib_src)
    const wrapper = container.value || document.createElement('div')
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.text = `if(window.aclib) aclib.runBanner({ zoneId: '${cfg.zone_id}' });`
    wrapper.appendChild(s)
    injected.value.push(s)
  }
  else if (tag_type === 'monetag_script') {
    loadScript(cfg.src, (scriptEl) => {
      scriptEl.dataset.zone = cfg.zone_id
    })
  }
  else if (tag_type === 'hilltop_script') {
    loadScript(cfg.src, (scriptEl) => {
      scriptEl.referrerPolicy = 'no-referrer-when-downgrade'
    })
  }
}

function loadScript(src, mutate) {
  if (!src) return
  const s = document.createElement('script')
  s.src   = src
  s.async = true
  if (mutate) mutate(s)
  document.head.appendChild(s)
  injected.value.push(s)
}

function ensureAclib(src) {
  if (aclibLoaded || document.getElementById('aclib')) {
    aclibLoaded = true
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    const s  = document.createElement('script')
    s.id     = 'aclib'
    s.src    = src || ACLIB_SRC
    s.async  = true
    s.onload = () => { aclibLoaded = true; resolve() }
    s.onerror = resolve  // don't hang if aclib fails
    document.head.appendChild(s)
    injected.value.push(s)
  })
}
</script>
