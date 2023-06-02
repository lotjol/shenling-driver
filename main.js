import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { piniaPluginPersistedstate } from '@/stores/persist'
import App from './App'
import '@/utils'

const app = createSSRApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)

export function createApp() {
  return { app }
}
