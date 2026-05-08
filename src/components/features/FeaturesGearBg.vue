<template>
  <div class="gear-bg" aria-hidden="true">
    <!-- Zincir satırları -->
    <div class="chain-track row1"><div class="chain-inner" ref="ci1" /></div>
    <div class="chain-track row2"><div class="chain-inner rev" ref="ci2" /></div>

    <!-- Dişliler -->
    <svg class="gear-svg" viewBox="0 0 900 340" preserveAspectRatio="xMidYMid meet">
      <g ref="gearsEl" />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useTheme } from '../../composables/useTheme.js'

const { isDark } = useTheme()
const ci1 = ref(null)
const ci2 = ref(null)
const gearsEl = ref(null)

const THEMES = {
  dark:  { gFill: '#141414', gStroke: '#22a366', hub: '#0d0d0d', lc: '#22a366', lc2: '#15704a' },
  light: { gFill: '#e6f2ec', gStroke: '#1a8a56', hub: '#f4f4f2', lc: '#22a366', lc2: '#0e5c3c' },
}

const GEAR_DEFS = [
  { cx: 70,  cy: 82,  R: 55, teeth: 18, speed: 14, dir:  1 },
  { cx: 196, cy: 82,  R: 55, teeth: 18, speed: 14, dir: -1 },
  { cx: 710, cy: 82,  R: 55, teeth: 18, speed: 14, dir:  1 },
  { cx: 836, cy: 82,  R: 55, teeth: 18, speed: 14, dir: -1 },
  { cx: 453, cy: 170, R: 68, teeth: 22, speed: 20, dir:  1 },
  { cx: 110, cy: 260, R: 45, teeth: 14, speed: 12, dir: -1 },
  { cx: 224, cy: 260, R: 45, teeth: 14, speed: 12, dir:  1 },
  { cx: 676, cy: 260, R: 45, teeth: 14, speed: 12, dir:  1 },
  { cx: 790, cy: 260, R: 45, teeth: 14, speed: 12, dir: -1 },
]

function gearPath(cx, cy, R, teeth) {
  const inner = R - Math.round(R * 0.22)
  const step  = (Math.PI * 2) / teeth
  let d = ''
  for (let i = 0; i < teeth; i++) {
    const a  = i * step - Math.PI / 2
    const tw = step * 0.42
    const pt = (r, da) => [+(r * Math.cos(a + da) + cx).toFixed(2), +(r * Math.sin(a + da) + cy).toFixed(2)]
    const pts = [pt(inner, 0), pt(R, tw * 0.12), pt(R, tw * 0.88), pt(inner, step - tw * 0.12)]
    d += i === 0 ? `M${pts[0]}` : `L${pts[0]}`
    d += ` L${pts[1]} L${pts[2]} L${pts[3]}`
  }
  return d + 'Z'
}

function buildGears(th) {
  const ns = 'http://www.w3.org/2000/svg'
  const g  = gearsEl.value
  g.innerHTML = ''

  GEAR_DEFS.forEach(d => {
    const inner = d.R - Math.round(d.R * 0.22)
    const hubR  = Math.round(d.R * 0.18)
    const grp   = document.createElementNS(ns, 'g')

    const body  = document.createElementNS(ns, 'path')
    body.setAttribute('d', gearPath(d.cx, d.cy, d.R, d.teeth))
    body.setAttribute('fill', th.gFill)
    body.setAttribute('stroke', th.gStroke)
    body.setAttribute('stroke-width', '1.8')
    body.setAttribute('stroke-linejoin', 'round')
    grp.appendChild(body)

    for (let s = 0; s < 4; s++) {
      const ang = (s / 4) * Math.PI * 2
      const sp  = document.createElementNS(ns, 'line')
      sp.setAttribute('x1', (d.cx + Math.cos(ang) * hubR * 1.1).toFixed(1))
      sp.setAttribute('y1', (d.cy + Math.sin(ang) * hubR * 1.1).toFixed(1))
      sp.setAttribute('x2', (d.cx + Math.cos(ang) * (inner - 3)).toFixed(1))
      sp.setAttribute('y2', (d.cy + Math.sin(ang) * (inner - 3)).toFixed(1))
      sp.setAttribute('stroke', th.gStroke)
      sp.setAttribute('stroke-width', '1.5')
      grp.appendChild(sp)
    }

    const hub = document.createElementNS(ns, 'circle')
    hub.setAttribute('cx', d.cx); hub.setAttribute('cy', d.cy); hub.setAttribute('r', hubR)
    hub.setAttribute('fill', th.hub); hub.setAttribute('stroke', th.gStroke); hub.setAttribute('stroke-width', '2')

    const dot = document.createElementNS(ns, 'circle')
    dot.setAttribute('cx', d.cx); dot.setAttribute('cy', d.cy); dot.setAttribute('r', '3')
    dot.setAttribute('fill', th.gStroke)

    const anim = document.createElementNS(ns, 'animateTransform')
    anim.setAttribute('attributeName', 'transform')
    anim.setAttribute('type', 'rotate')
    anim.setAttribute('from', `0 ${d.cx} ${d.cy}`)
    anim.setAttribute('to', `${d.dir > 0 ? 360 : -360} ${d.cx} ${d.cy}`)
    anim.setAttribute('dur', d.speed + 's')
    anim.setAttribute('repeatCount', 'indefinite')

    grp.appendChild(hub); grp.appendChild(dot); grp.appendChild(anim)
    g.appendChild(grp)
  })
}

function buildChain(el, lc, lc2, count = 72) {
  let h = ''
  for (let i = 0; i < count * 2; i++) {
    const c    = i % 4 < 2 ? lc : lc2
    const type = i % 2 === 0 ? 'lk-r' : 'lk-h'
    h += `<span class="lk ${type}" style="border-color:${c}"></span>`
  }
  el.innerHTML = h
}

function applyTheme() {
  const th = isDark.value ? THEMES.dark : THEMES.light
  buildChain(ci1.value, th.lc, th.lc2)
  buildChain(ci2.value, th.lc2, th.lc)
  buildGears(th)
}

onMounted(applyTheme)
watch(isDark, applyTheme)
</script>

<style scoped>
.gear-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.45;
}

.chain-track {
  position: absolute;
  left: 0; right: 0;
  display: flex;
  align-items: center;
}
.row1 { top: 38px; }
.row2 { bottom: 38px; }

.chain-inner {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  animation: cscroll 40s linear infinite;
}
.chain-inner.rev {
  animation-direction: reverse;
  animation-duration: 52s;
}

@keyframes cscroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

:deep(.lk)   { display: inline-block; flex-shrink: 0; }
:deep(.lk-h) { width: 14px; height: 14px; border-radius: 50%;  border: 2px solid; }
:deep(.lk-r) { width: 26px; height: 14px; border-radius: 7px;  border: 2px solid; }

.gear-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>