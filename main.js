import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  // app.config.globalProperties
  return {
    app,
  }
}
