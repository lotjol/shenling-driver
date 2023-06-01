import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App'

const pinia = createPinia()
export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  return {
    app,
  }
}
