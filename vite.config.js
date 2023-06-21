import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import uniMiddleware from './vite-plugin-uni-middleware'
export default defineConfig({
  plugins: [
    uni(),
    uniMiddleware({
      middlewareDir: './middleware',
      pagesJsonPath: './pages.json',
      programRoot: __dirname,
    }),
  ],
})
