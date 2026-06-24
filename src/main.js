import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import { useAuthStore } from './stores/auth.js'
import './style.css'   // mevcut Tailwind CSS dosyan

const app   = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Auth store'u başlat (token varsa user'ı yükle)
const auth = useAuthStore()
auth.init()

app.mount('#app')