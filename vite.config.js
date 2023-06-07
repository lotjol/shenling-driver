import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniMiddleware from './vite-plugin-uni-middleware'
export default defineConfig({
  plugins: [
    Uni(),
    UniMiddleware({
      middlewareDir: './middleware',
      pagesJsonPath: './pages.json',
      programRoot: __dirname,
    }),
  ],
})
