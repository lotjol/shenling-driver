import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { piniaPluginPersistedstate } from '@/stores/persist'
import { createNavigationGuardPlugin } from './vite-plugin-uni-middleware/runtime'
import App from './App'
import '@/utils'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  const guard = createNavigationGuardPlugin()

  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
  // app.use(guard);
  return { app }
}
