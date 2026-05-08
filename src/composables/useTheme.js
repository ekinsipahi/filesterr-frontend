import { ref, watchEffect } from 'vue'

// Modül scope'unda tek instance — tüm component'lar aynı ref'i paylaşır
const isDark = ref(false)

export function useTheme() {
  function init() {
    if (typeof window === 'undefined') return

    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = stored === 'dark' || (!stored && prefersDark)

    // Sistem teması değişirse (kayıtlı tercih yoksa) reaktif güncelle
    if (!stored) {
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => { isDark.value = e.matches })
    }
  }

  function toggle() {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  // apply() kaldırıldı — watchEffect her değişimde DOM'u günceller,
  // manuel çağrıya gerek kalmaz
  watchEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('dark', isDark.value)
  })

  return { isDark, init, toggle }
}